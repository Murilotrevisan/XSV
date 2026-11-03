'use strict';

// Prints the hydrostatic comparison of the hull concepts as a Markdown table.
// Usage (Node.js, no dependencies):  node run.js
// All dimensions and masses are nominal estimates; see README.md.

const { circle, rect, analyse } = require('./hydrostatics');

// Nominal containers: outer diameter and enclosed volume (mm, mL).
// Values are typical retail figures and must be measured on real parts.
const CONTAINERS = {
    bottle300: { d: 56, ml: 310 },
    bottle500: { d: 64, ml: 520 },
    bottle1500: { d: 90, ml: 1550 },
    bottle2000: { d: 104, ml: 2100 },
    jar500g: { d: 77, ml: 620 }, // wide-mouth 500 g mayonnaise jar, envelope
};

function container(name, cx, cz = 0) {
    const c = CONTAINERS[name];
    const area = Math.PI * (c.d / 2) ** 2;
    return { points: circle(cx, cz, c.d / 2), length: c.ml * 1000 / area };
}

// Printed planing V-hull section: 120 mm beam, 55 mm depth, 220 mm effective length.
const V_HULL = { points: [[0, 0], [60, 30], [60, 55], [-60, 55], [-60, 30]], length: 220 };

const CONCEPTS = [
    {
        id: 'P1', name: 'Flip-Cat, 2 x 500 mL at +/-75 mm, with ballast', mass: 400, cg: [0, 0],
        shapes: [container('bottle500', -75), container('bottle500', 75)],
        propulsor: { kind: 'water propeller D48 on mid-plane', z: 0, r: 24 },
    },
    {
        id: 'P1-dry', name: 'Flip-Cat without ballast', mass: 210, cg: [0, 0],
        shapes: [container('bottle500', -75), container('bottle500', 75)],
        propulsor: { kind: 'water propeller D48 on mid-plane', z: 0, r: 24 },
    },
    {
        id: 'P1-wide', name: 'Flip-Cat at +/-100 mm', mass: 420, cg: [0, 0],
        shapes: [container('bottle500', -100), container('bottle500', 100)],
        propulsor: { kind: 'water propeller D48 on mid-plane', z: 0, r: 24 },
    },
    {
        id: 'P2', name: 'Air-Cat, 2 x 2 L at +/-95 mm', mass: 250, cg: [0, 0],
        shapes: [container('bottle2000', -95), container('bottle2000', 95)],
        propulsor: { kind: 'air propeller D55 on mid-plane', z: 0, r: 27.5 },
    },
    {
        id: 'P3', name: 'Roly-poly bottle, 1.5 L, G 28 mm below axis', mass: 195, cg: [0, -28],
        shapes: [container('bottle1500', 0)],
        propulsor: { kind: 'water propeller D35 below hull', z: -52, r: 17.5 },
    },
    {
        id: 'P3-bulb', name: 'Roly-poly bottle with keel bulb', mass: 260, cg: [0, -40],
        shapes: [container('bottle1500', 0)],
        propulsor: { kind: 'water propeller D35 below hull', z: -52, r: 17.5 },
    },
    {
        id: 'P4', name: 'Lifeboat, V-hull + 500 mL bottle dome, KG 38', mass: 290, cg: [0, 38],
        shapes: [V_HULL, container('bottle500', 0, 87)],
        propulsor: { kind: 'water propeller D35 below hull', z: -8, r: 17.5 },
    },
    {
        id: 'P5', name: 'Tri-Flip, 2 x 500 mL at +/-110 + 300 mL centre', mass: 480, cg: [0, 0],
        shapes: [container('bottle500', -110), container('bottle300', 0), container('bottle500', 110)],
        propulsor: { kind: 'water propeller D48 on mid-plane', z: 0, r: 24 },
    },
    {
        id: 'P5-jar', name: 'Tri-Flip with 500 g jar centre', mass: 480, cg: [0, 0],
        shapes: [container('bottle500', -110), container('jar500g', 0), container('bottle500', 110)],
        propulsor: { kind: 'water propeller D48 on mid-plane', z: 0, r: 24 },
    },
    {
        id: 'P5-jar-ballast', name: 'Tri-Flip with 500 g jar centre, more ballast', mass: 600, cg: [0, 0],
        shapes: [container('bottle500', -110), container('jar500g', 0), container('bottle500', 110)],
        propulsor: { kind: 'water propeller D48 on mid-plane', z: 0, r: 24 },
    },
    {
        id: 'P6', name: 'Paddle raft, 2 x 500 mL at +/-60 mm', mass: 360, cg: [0, 0],
        shapes: [container('bottle500', -60), container('bottle500', 60)],
        propulsor: { kind: 'paddle wheel D110 on mid-plane', z: 0, r: 55 },
    },
    {
        id: 'ref-cat', name: 'Conventional catamaran, pod on deck', mass: 420, cg: [0, 25],
        shapes: [container('bottle1500', -85), container('bottle1500', 85), { points: rect(0, 70, 80, 40), length: 110 }],
    },
    {
        id: 'ref-V', name: 'Same V-hull without dome', mass: 290, cg: [0, 38],
        shapes: [V_HULL],
    },
];

const f = (v, digits = 0) => (v === null || Number.isNaN(v) ? '-' : v.toFixed(digits));

const header = [
    'Id', 'Mass (g)', 'Volume immersed (%)', 'Waterline z (mm)', 'Propulsor immersed, upright / inverted (%)',
    'GM (mm)', 'GZ max (mm @ deg)', 'Vanishing angle (deg)', 'After capsize', 'Max righting moment (N*mm)',
    'Energy to point of no return (J)', 'Energy to right from inverted (J)',
];
console.log('| ' + header.join(' | ') + ' |');
console.log('|' + header.map(() => ' --- ').join('|') + '|');
for (const concept of CONCEPTS) {
    const r = analyse(concept);
    const p = r.propulsor;
    const propulsor = p ? `${f(p.uprightPct)} / ${f(p.invertedPct)}` : '-';
    console.log('| ' + [
        concept.id, concept.mass, f(r.immersionPct, 1), f(r.waterlineZ, 1), propulsor,
        f(r.gm), `${f(r.gzMax, 1)} @ ${r.gzMaxAngle}`, r.vanishingAngle === null ? 'none' : r.vanishingAngle,
        r.staysInverted ? 'stays inverted' : 'rights itself', f(r.maxRightingMomentNmm), f(r.capsizeEnergyJ, 2),
        f(r.rightingEnergyJ, 2),
    ].join(' | ') + ' |');
}
console.log('');
for (const concept of CONCEPTS) {
    const r = analyse(concept);
    if (concept.propulsor && concept.propulsor.kind.startsWith('air')) {
        console.log(`${concept.id}: air propeller tip clearance above water = ${f(r.propulsor.tipClearanceMm, 1)} mm`);
    }
}
