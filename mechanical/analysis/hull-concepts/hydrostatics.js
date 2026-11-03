'use strict';

// Two-dimensional prismatic hydrostatics for comparing hull concepts.
//
// Each buoyant volume is a closed cross-section polygon extruded over an
// effective length. The model finds the waterline for a given mass and heel
// angle, then reports the righting lever GZ. It ignores trim, bow and stern
// shape, waves, dynamics, trapped water, and free-surface effects.
//
// Units: millimetres and grams. Fresh water, 1.0 g/cm^3.
// Body frame: x is transverse (positive to starboard), z is vertical
// (positive up). A positive heel angle rotates the body counter-clockwise
// when viewed from astern. Positive GZ pushes the vessel back towards 0 deg.

const WATER_DENSITY = 1e-3; // g/mm^3
const GRAVITY = 9.81e-3; // N/g

function circle(cx, cz, r, segments = 120) {
    const points = [];
    for (let i = 0; i < segments; i++) {
        const a = 2 * Math.PI * i / segments;
        points.push([cx + r * Math.cos(a), cz + r * Math.sin(a)]);
    }
    return points;
}

function rect(cx, cz, width, height) {
    return [
        [cx - width / 2, cz - height / 2],
        [cx + width / 2, cz - height / 2],
        [cx + width / 2, cz + height / 2],
        [cx - width / 2, cz + height / 2],
    ];
}

function rotate(point, phi) {
    const c = Math.cos(phi);
    const s = Math.sin(phi);
    return [c * point[0] - s * point[1], s * point[0] + c * point[1]];
}

// Sutherland-Hodgman clip against the half-plane z <= h. The result may be
// degenerate for non-convex input, but its area and centroid remain correct.
function clipBelow(points, h) {
    const out = [];
    for (let i = 0; i < points.length; i++) {
        const a = points[i];
        const b = points[(i + 1) % points.length];
        const aIn = a[1] <= h;
        const bIn = b[1] <= h;
        if (aIn) out.push(a);
        if (aIn !== bIn) {
            const t = (h - a[1]) / (b[1] - a[1]);
            out.push([a[0] + t * (b[0] - a[0]), h]);
        }
    }
    return out;
}

function areaCentroid(points) {
    let area = 0;
    let cx = 0;
    let cz = 0;
    for (let i = 0; i < points.length; i++) {
        const [x0, z0] = points[i];
        const [x1, z1] = points[(i + 1) % points.length];
        const cross = x0 * z1 - x1 * z0;
        area += cross;
        cx += (x0 + x1) * cross;
        cz += (z0 + z1) * cross;
    }
    area /= 2;
    if (Math.abs(area) < 1e-12) return { area: 0, cx: 0, cz: 0 };
    return { area: Math.abs(area), cx: cx / (6 * area), cz: cz / (6 * area) };
}

function submerged(shapes, h) {
    let volume = 0;
    let momentX = 0;
    for (const shape of shapes) {
        const clipped = clipBelow(shape.points, h);
        if (clipped.length < 3) continue;
        const ac = areaCentroid(clipped);
        volume += ac.area * shape.length;
        momentX += ac.area * shape.length * ac.cx;
    }
    return { volume, xB: volume > 0 ? momentX / volume : 0 };
}

// Waterline height (world frame) and GZ for one heel angle in radians.
function equilibrium(concept, phi) {
    const shapes = concept.shapes.map(s => ({
        length: s.length,
        points: s.points.map(p => rotate(p, phi)),
    }));
    const required = concept.mass / WATER_DENSITY;
    let lo = Infinity;
    let hi = -Infinity;
    for (const s of shapes) {
        for (const p of s.points) {
            lo = Math.min(lo, p[1]);
            hi = Math.max(hi, p[1]);
        }
    }
    if (submerged(shapes, hi + 1).volume < required) return { sinks: true };
    for (let i = 0; i < 80; i++) {
        const mid = (lo + hi) / 2;
        if (submerged(shapes, mid).volume < required) lo = mid;
        else hi = mid;
    }
    const h = (lo + hi) / 2;
    const xB = submerged(shapes, h).xB;
    const g = rotate(concept.cg, phi);
    return { sinks: false, h, gz: g[0] - xB };
}

// Fraction of a propeller or wheel disc below the waterline h.
function discImmersion(h, zCentre, r) {
    const depth = h - (zCentre - r);
    if (depth <= 0) return 0;
    if (depth >= 2 * r) return 1;
    const y = depth - r;
    return (r * r * Math.acos(-y / r) + y * Math.sqrt(r * r - y * y)) / (Math.PI * r * r);
}

function analyse(concept) {
    const curve = [];
    for (let deg = 0; deg <= 180; deg++) {
        const e = equilibrium(concept, deg * Math.PI / 180);
        curve.push({ deg, gz: e.sinks ? NaN : e.gz });
    }
    const weight = concept.mass * GRAVITY;
    let gzMax = -Infinity;
    let gzMaxAngle = 0;
    let vanishingAngle = null;
    let positiveArea = 0;
    let negativeArea = 0;
    for (let i = 1; i < curve.length; i++) {
        const g0 = curve[i - 1].gz;
        const g1 = curve[i].gz;
        if (g1 > gzMax) {
            gzMax = g1;
            gzMaxAngle = curve[i].deg;
        }
        if (vanishingAngle === null && g0 > 0 && g1 <= 0 && i > 2 && i < 180) vanishingAngle = curve[i].deg;
        const area = (Math.PI / 180) * (g0 + g1) / 2 / 1000; // m * rad
        if (area > 0) positiveArea += area;
        else negativeArea -= area;
    }
    const totalVolume = concept.shapes.reduce((sum, s) => sum + areaCentroid(s.points).area * s.length, 0);
    const displaced = concept.mass / WATER_DENSITY;
    const upright = equilibrium(concept, 0);
    const inverted = equilibrium(concept, Math.PI);
    const propulsor = concept.propulsor || null;
    return {
        curve,
        immersionPct: 100 * displaced / totalVolume,
        reserveBuoyancyPct: 100 * (totalVolume - displaced) / displaced,
        waterlineZ: upright.h,
        gm: (curve[1].gz - curve[0].gz) / (Math.PI / 180),
        gzMax,
        gzMaxAngle,
        vanishingAngle,
        staysInverted: curve[179].gz < 0,
        maxRightingMomentNmm: weight * gzMax,
        // Work needed to reach the point of no return: the vanishing angle
        // for concepts that stay inverted, 180 deg for self-righting ones.
        capsizeEnergyJ: weight * positiveArea,
        // Work needed to bring an inverted vessel back upright (0 if it rights itself).
        rightingEnergyJ: weight * negativeArea,
        propulsor: propulsor && {
            uprightPct: 100 * discImmersion(upright.h, propulsor.z, propulsor.r),
            invertedPct: 100 * discImmersion(inverted.h, -propulsor.z, propulsor.r),
            tipClearanceMm: (propulsor.z - propulsor.r) - upright.h,
        },
    };
}

module.exports = { circle, rect, analyse, equilibrium, discImmersion };
