'use strict';
const fs = require('node:fs');
const path = require('node:path');
const M = require('./model.js');
const read = name => fs.readFileSync(path.join(__dirname,name),'utf8');
let html = read('index.html').replace('<link rel="stylesheet" href="style.css">',()=>'<style>'+read('style.css')+'</style>');
for(const name of ['model.js','app.js']) html=html.replace(`<script src="${name}"></script>`,()=>'<script>'+read(name)+'</script>');
const destination = path.join(__dirname,'..','estudo-comparativo-xsv.html');
fs.writeFileSync(destination,html);
fs.writeFileSync(path.join(__dirname,'cenario-base.csv'),M.csv());
const report={date:'2026-09-27',status:'Hipóteses de concepção; não medições',units:'SI salvo nomes explícitos e parâmetros documentados na página',parameters:M.defaults,results:M.evaluate().map(r=>({
  id:r.design.id,name:r.design.name,mass_kg:r.stability.geom.mass,structure_kg:r.stability.geom.structuralMass,
  KG_m:r.stability.geom.kg,draft_m:r.stability.draft,GM_m:r.stability.gm,
  maximum_restoring_moment_Nm:r.stability.peak,peak_angle_deg:r.stability.peakAngle,
  equivalent_sustained_force_N:r.stability.force,limit_angle_deg:r.stability.limitAngle,limit_type:r.stability.limitType,
  budget_estimate_BRL:r.budget.total,ramp:r.ramp,stability_curve:r.stability.curve
}))};
fs.writeFileSync(path.join(__dirname,'cenario-base.json'),JSON.stringify(report,null,2)+'\n');
console.log(`HTML independente gerado: ${destination} (${Buffer.byteLength(html)} bytes)`);
