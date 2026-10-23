'use strict';
const assert = require('node:assert/strict');
const test = require('node:test');
const M = require('./model.js');
const close = (actual, expected, tol = 1e-8) => assert.ok(Math.abs(actual - expected) <= tol, `${actual} ≠ ${expected} (±${tol})`);

test('polygon clipping preserves analytical area and centroid', () => {
  const shape = M.rectangle(-2, 0, 4, 3);
  const clipped = M.polygonStats(M.clip(shape, 1));
  close(clipped.area, 4); close(clipped.x, 0); close(clipped.y, .5);
  close(M.polygonStats(M.clip(shape, -1)).area, 0);
  close(M.polygonStats(shape.slice().reverse()).area, 12);
});
test('rectangular barge matches exact draft, buoyancy and small-angle GM', () => {
  const B = .24, L = .3, H = .08, mass = .4, kg = .045;
  const geom = {bodies:[{poly:M.rectangle(-B/2,0,B,H),length:L}],mass,kg,capacity:B*L*H,open:false};
  const draft = mass / M.RHO / (B * L), upright = M.hydro(geom,0);
  close(upright.waterline, draft, 1e-11); close(upright.buoyancy[1], draft/2, 1e-11);
  close(M.hydro(geom,1e-5).gz/1e-5, B*B/(12*draft)+draft/2-kg, 1e-7);
});
test('displaced volume, symmetry and CG shift obey hydrostatic identities', () => {
  for (const d of M.designs) {
    const g = M.geometry(d,M.defaults);
    for (const deg of [0,5,20,45,70,90]) {
      const a = deg*Math.PI/180, h = M.hydro(g,a), opposite = M.hydro(g,-a);
      close(h.volume, g.mass/M.RHO, 1e-12); close(h.gz,-opposite.gz,1e-10);
      const lower = M.hydro({...g,kg:g.kg-.01},a);
      close(lower.moment-h.moment,g.mass*M.G*.01*Math.sin(a),1e-10);
    }
  }
});
test('64-sided circle has less than 0.2% area error', () => {
  const a = M.polygonStats(M.circle(.2,.1,.03));
  close(a.x,.2); close(a.y,.1);
  assert.ok(Math.abs(a.area/(Math.PI*.03**2)-1)<.002);
});
test('one-degree sampling converges against quarter-degree sampling', () => {
  for (const d of M.designs) {
    const coarse=M.stability(d,M.defaults), fine=M.stability(d,M.defaults,.25);
    assert.ok(Math.abs(coarse.peak/fine.peak-1)<.02, d.id);
    assert.ok(Math.abs(coarse.limitAngle-fine.limitAngle)<1, d.id);
  }
});
test('open tray ends at rim immersion, closed hull curves retain geometry', () => {
  const tray=M.stability(M.designs.find(d=>d.id==='print'),M.defaults);
  assert.equal(tray.limitType,'borda na água');
  assert.ok(tray.curve.at(-1).deg<tray.limitAngle);
  const cat=M.stability(M.designs.find(d=>d.id==='cat'),M.defaults);
  assert.equal(cat.limitType,'GZ = 0'); assert.ok(cat.curve.at(-1).moment<0);
});
test('frictionless ramp recovers v² = 2gH and ramp energy balance', () => {
  const p={...M.defaults,mu:0,retention:1,thrust:0,speed:2};
  const r=M.ramp(.25,p);
  close(r.vmin,Math.sqrt(2*M.G*p.height/1000));
  close(.5*.25*r.exit**2, .5*.25*p.speed**2-.25*M.G*p.height/1000);
  const a=p.angle*Math.PI/180;
  close(p.height/1000+r.exit*Math.sin(a)*r.time-.5*M.G*r.time**2,0);
  assert.ok(M.ramp(.25,{...p,mu:.2}).vmin>r.vmin);
  assert.ok(M.ramp(.25,{...p,thrust:.2}).vmin<r.vmin);
  assert.equal(M.ramp(.25,{...p,speed:.1}).clears,false);
});
test('budget includes ESP and consumed filament and responds to prices', () => {
  const d=M.designs.find(d=>d.id==='cat');
  close(M.budget(d,M.defaults).total,83.95);
  close(M.budget(d,{...M.defaults,filament:150}).total-M.budget(d,M.defaults).total,1.5);
});
test('extreme allowed scenarios remain finite and report instability', () => {
  for (const payload of [100,500]) for (const widthScale of [.75,1.25]) for(const cgOffset of [-20,40]) {
    for (const r of M.evaluate({...M.defaults,payload,widthScale,cgOffset})) {
      assert.ok(Number.isFinite(r.stability.peak)); assert.ok(Number.isFinite(r.ramp.vmin));
      if(r.stability.gm<=0) assert.equal(r.stability.limitType,'instável na origem');
    }
  }
});
