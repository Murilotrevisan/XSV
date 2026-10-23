(function(){
  'use strict';
  const M=window.XSV,$=id=>document.getElementById(id),p={...M.defaults};let results=[],pending,resizeTimer;
  const f=(n,d=1)=>Number.isFinite(n)?n.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d}):'—';
  const brl=n=>'R$'+f(n,2),nsvg=(tag,a={},children='')=>'<'+tag+' '+Object.entries(a).map(([k,v])=>k+'="'+v+'"').join(' ')+'>'+children+'</'+tag+'>';
  const svg=(w,h,title,body)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" role="img" aria-label="'+title+'"><title>'+title+'</title>'+body+'</svg>';
  const text=(x,y,t,a={})=>nsvg('text',{x,y,fill:'#52646c','font-size':11,'font-family':'system-ui, sans-serif',...a},t);
  const line=(x1,y1,x2,y2,a={})=>nsvg('line',{x1,y1,x2,y2,stroke:'#d8e0df','stroke-width':1,...a});
  const path=(d,a={})=>nsvg('path',{d,fill:'none',stroke:'#142d39','stroke-width':1.5,...a});
  const selected=()=>results.find(r=>r.design.id===p.selected)||results[0];
  function sketch(d){
    const scale=390,project=([x,y,z])=>[158+(x-y)*scale,101+(x+y)*scale*.38-z*scale*.8];
    let body='';
    const face=(poly,col,alpha=.18)=>{body+=nsvg('polygon',{points:poly.map(v=>project(v).join(',')).join(' '),fill:col,'fill-opacity':alpha,stroke:col,'stroke-width':1.1});};
    const extrude=(section,L,col)=>{const end=section.map(([y,z])=>[L/2,y,z]),start=section.map(([y,z])=>[-L/2,y,z]);
      for(let i=0;i<section.length;i++){const j=(i+1)%section.length;face([start[i],end[i],end[j],start[j]],col,.10);}face(end,col,.25);face(start,col,.13);};
    const geom=M.geometry(d,{...p,widthScale:1});
    for(const part of geom.bodies.filter(v=>v.type==='hull'))extrude(part.poly.filter((_,i)=>d.kind!=='pet'||i%4===0),d.kind==='pet'?.25:part.length,d.color);
    if(['cat','pet','tri'].includes(d.kind)){for(const x of [-.075,.07])face([[x,-.12,d.depth+.007],[x+.016,-.12,d.depth+.007],[x+.016,.12,d.depth+.007],[x,.12,d.depth+.007]],'#7c8d93',.8);}
    if(d.kind==='open')face([[-.10,-.105,d.depth],[.10,-.105,d.depth],[.10,.105,d.depth],[-.10,.105,d.depth]],'#f4f5f0',1);
    extrude(M.circle(0,d.depth+.028,.025,20),.10,'#52646c');
    for(const y of [-.07,.07]){
      const z=d.depth+.064,a=project([.07,y,d.depth]),b=project([.07,y,z]);body+=line(...a,...b,{stroke:'#52646c','stroke-width':2});
      const rotor=Array.from({length:33},(_,i)=>{let a=i*Math.PI/16;return project([.07,y+.03*Math.cos(a),z+.03*Math.sin(a)]);});
      body+=path(rotor.map((v,i)=>(i?'L':'M')+v.join(',')).join(' '),{stroke:'#52646c','stroke-dasharray':'2 2',opacity:.65});
      body+=line(...project([.07,y-.022,z-.014]),...project([.07,y+.022,z+.014]),{stroke:'#142d39','stroke-width':2.3});
    }
    body+=text(158,157,'PET central · dois motores aéreos',{'font-size':10,'text-anchor':'middle'});
    return svg(315,168,'Esquema conceitual: '+d.name,body);
  }
  function planDrawing(r){let d=r.design,w=$('plan-sketch').clientWidth||480,s=(w-74)/.30,b=r.stability.geom.beam,planH=b*s,top=43,left=36,profileY=top+planH+54,h=profileY+77;
    let out=text(15,18,'VISTA SUPERIOR · proa à esquerda',{'font-size':11});
    function shape(y,width,L=.30){let x=left+(.30-L)*s/2,ww=L*s,yy=top+y*s;out+=path(`M${x+ww},${yy} H${x+25} Q${x},${yy+width*s/2} ${x+25},${yy+width*s} H${x+ww} Z`,{fill:d.color,'fill-opacity':.10,stroke:d.color});}
    if(d.kind==='cat'){shape(0,.045);shape(b-.045,.045);}
    else if(d.kind==='pet'){shape(0,.06,.26);shape(b-.06,.06,.26);}
    else if(d.kind==='tri'){shape(b/2-.04,.08);shape(0,.03,.20);shape(b-.03,.03,.20);}
    else shape(0,b);
    if(['cat','pet','tri'].includes(d.kind)){[.11,.22].forEach(x=>{out+=nsvg('rect',{x:left+x*s,y:top+8,width:6,height:planH-16,fill:'#9eacb1'});});}
    out+=nsvg('rect',{x:left+.12*s,y:top+planH/2-14,width:.10*s,height:28,rx:13,fill:'#e1e9e9',stroke:'#52646c'});
    out+=text(left+.17*s,top+planH/2+4,'PET',{fill:'#142d39','text-anchor':'middle'});
    out+=line(left,top-12,left+.30*s,top-12,{stroke:'#52646c'});out+=text(left+.15*s,top-18,'300 mm',{'text-anchor':'middle'});
    out+=text(left+6,top+planH+18,'Largura: '+f(b*1000,0)+' mm');
    out+=text(15,profileY-8,'PERFIL · curva de entrada proposta',{'font-size':11});
    out+=path(`M${left},${profileY+8} Q${left+12},${profileY+39} ${left+55},${profileY+39} H${left+.30*s} V${profileY} H${left}Z`,{fill:d.color,'fill-opacity':.10,stroke:d.color});
    out+=nsvg('rect',{x:left+.12*s,y:profileY-18,width:.10*s,height:22,rx:10,fill:'#e1e9e9',stroke:'#52646c'});
    out+=text(left,profileY+62,'Sem quilha · sem propulsor abaixo da área de apoio');
    $('plan-sketch').innerHTML=svg(w,h,'Planta e perfil conceituais de '+d.name,out);
  }
  function lineChart(id,series,opts){let el=$(id),w=el.clientWidth||600,h=opts.height||280,ml=w<400?51:61,mr=19,mt=16,mb=53,pw=w-ml-mr,ph=h-mt-mb;
    let xs=series.flatMap(s=>s.values.map(v=>v.x)),ys=series.flatMap(s=>s.values.map(v=>v.y)).filter(Number.isFinite);if(!xs.length||!ys.length){el.innerHTML='<p>Sem dados válidos neste cenário.</p>';return;}
    let xmin=opts.xmin??Math.min(...xs),xmax=opts.xmax??Math.max(...xs),ymin=Math.min(0,...ys),ymax=Math.max(...ys,opts.reference||0);if(ymax-ymin<1e-9)ymax=ymin+1;ymax+=(ymax-ymin)*.1;
    const X=x=>ml+(x-xmin)/(xmax-xmin)*pw,Y=y=>mt+(ymax-y)/(ymax-ymin)*ph;
    let out='';
    for(let i=0;i<=4;i++){let v=ymin+(ymax-ymin)*i/4,y=Y(v);out+=line(ml,y,w-mr,y,{stroke:i===0?'#a9b8bd':'#e3e9e8'});out+=text(ml-9,y+4,f(v,opts.decimals??1),{'text-anchor':'end'});}
    let nt=w<400?2:5;for(let i=0;i<=nt;i++){let v=xmin+(xmax-xmin)*i/nt;out+=text(X(v),h-30,f(v,0),{'text-anchor':i===0?'start':i===nt?'end':'middle'});}
    out+=text(ml+pw/2,h-8,opts.xLabel,{'text-anchor':'middle'});out+=text(14,mt+ph/2,opts.yLabel,{transform:`rotate(-90 14 ${mt+ph/2})`,'text-anchor':'middle'});
    out+=nsvg('defs',{},nsvg('clipPath',{id:id+'-clip'},nsvg('rect',{x:ml,y:mt,width:pw,height:ph})));
    if(opts.reference!==undefined){let y=Y(opts.reference);out+=line(ml,y,w-mr,y,{stroke:'#142d39','stroke-dasharray':'5 4'});out+=text(w-mr-3,y-6,opts.referenceLabel||'',{'text-anchor':'end',fill:'#142d39'});}
    for(let seriesItem of series){let d=seriesItem.values.map((v,i)=>(i?'L':'M')+X(v.x).toFixed(2)+','+Y(v.y).toFixed(2)).join(' ');out+=path(d,{stroke:seriesItem.color,'stroke-width':seriesItem.id===p.selected?3:1.6,opacity:seriesItem.id===p.selected?1:.65,'clip-path':`url(#${id}-clip)`});}
    out+=line(ml,Y(0),w-mr,Y(0),{stroke:'#aab9be'});
    out+=nsvg('line',{id:id+'-guide',x1:0,x2:0,y1:mt,y2:h-mb,stroke:'#52646c','stroke-dasharray':'3 3',visibility:'hidden'});
    out+=nsvg('rect',{x:ml,y:mt,width:pw,height:ph,fill:'transparent','data-chart-hit':'true'});
    el.innerHTML=svg(w,h,opts.title,out)+'<div class="chart-tooltip" hidden></div>';
    let hit=el.querySelector('[data-chart-hit]'),tip=el.querySelector('.chart-tooltip'),guide=$(id+'-guide');
    function hover(e){let rect=el.getBoundingClientRect(),px=Math.max(ml,Math.min(w-mr,e.clientX-rect.left)),x=xmin+(px-ml)/pw*(xmax-xmin);let rows=series.map(s=>{let a=s.values;if(x<a[0].x||x>a[a.length-1].x)return null;let j=a.findIndex(v=>v.x>=x);if(j<0)j=a.length-1;let hi=a[j],lo=a[Math.max(0,j-1)],t=hi.x===lo.x?0:(x-lo.x)/(hi.x-lo.x),y=lo.y+t*(hi.y-lo.y);return`<div><span>${s.name}</span><span>${f(y,2)} ${opts.unit}</span></div>`;}).filter(Boolean).join('');tip.innerHTML='<strong>'+f(x,1)+'°</strong>'+rows;tip.hidden=false;guide.setAttribute('x1',px);guide.setAttribute('x2',px);guide.setAttribute('visibility','visible');tip.style.left=Math.max(0,Math.min(w-tip.offsetWidth,px+12))+'px';tip.style.top='20px';}
    hit.addEventListener('pointermove',hover);hit.addEventListener('pointerdown',hover);hit.addEventListener('pointerleave',()=>{tip.hidden=true;guide.setAttribute('visibility','hidden');});
  }
  function barChart(id,rows,opts={}){let el=$(id),w=el.clientWidth||470,h=rows.length*39+42,ml=w<380?88:100,mr=opts.money?67:72,pw=w-ml-mr,max=Math.max(...rows.map(v=>v.value),opts.reference||0)*1.08||1;
    let X=v=>ml+v/max*pw,out='';
    if(opts.reference){let x=X(opts.reference);out+=line(x,8,x,h-22,{stroke:'#142d39','stroke-dasharray':'4 4'});out+=text(x,8,opts.money?'R$100':String(opts.reference),{'text-anchor':'middle','font-size':10});}
    rows.forEach((r,i)=>{let y=24+i*39;out+=text(ml-9,y+5,r.name,{'text-anchor':'end','font-size':11});out+=nsvg('rect',{x:ml,y:y-8,width:pw,height:16,rx:3,fill:'#eef2f1'});
      if(r.parts){let left=ml;r.parts.forEach(part=>{let wid=part.value/max*pw;out+=nsvg('rect',{x:left,y:y-8,width:Math.max(0,wid),height:16,fill:part.color});left+=wid;});}
      else out+=nsvg('rect',{x:ml,y:y-8,width:Math.max(0,r.value/max*pw),height:16,rx:3,fill:r.color,opacity:r.id===p.selected?1:.65});
      out+=text(w-1,y+5,opts.money?brl(r.value):f(r.value,2)+' N',{'text-anchor':'end',fill:'#142d39','font-family':'Consolas,monospace','font-size':11});});
    out+=text(w/2,h-5,opts.money?'Referências + metas + casco estimado':'Capacidade de torque / braço efetivo',{'font-size':10,'text-anchor':'middle'});el.innerHTML=svg(w,h,opts.money?'Orçamento estimado dos seis cascos':'Força estática equivalente dos seis cascos',out);
  }
  function legends(id){$(id).innerHTML=M.designs.map(d=>`<button type="button" class="${d.id===p.selected?'active':''}" data-select="${d.id}" aria-pressed="${d.id===p.selected}"><i style="background:${d.color}"></i>${d.short}</button>`).join('');}
  function heelDrawing(r){let geom=r.stability.geom,angle=p.heel*Math.PI/180,state=M.hydro(geom,angle),el=$('heel-sketch'),w=el.clientWidth||480,h=263;if(state.overloaded){el.innerHTML='<p>Massa maior que o deslocamento disponível.</p>';return;}
    let scale=(w-76)/(.36*p.widthScale),cx=w/2,waterY=130;
    let X=x=>cx+x*scale,Y=y=>waterY-(y-state.waterline)*scale;
    let out=nsvg('rect',{x:0,y:waterY,width:w,height:h-waterY,fill:'#e8f1f2'});out+=line(0,waterY,w,waterY,{stroke:'#6f9ca9','stroke-width':1.4});out+=text(8,waterY-7,'água',{'font-size':10});
    state.parts.forEach(part=>{out+=nsvg('polygon',{points:part.poly.map(v=>[X(v[0]),Y(v[1])].join(',')).join(' '),fill:part.type==='capsule'?'#d8e1e3':r.design.color,'fill-opacity':.14,stroke:part.type==='capsule'?'#52646c':r.design.color,'stroke-width':1.5});if(part.sub.length>2)out+=nsvg('polygon',{points:part.sub.map(v=>[X(v[0]),Y(v[1])].join(',')).join(' '),fill:r.design.color,'fill-opacity':.21});});
    let [bx,by]=state.buoyancy,[gx,gy]=state.cg;
    out+=line(X(bx),Y(by),X(bx),Y(by)-39,{stroke:'#176b80','stroke-width':2});out+=path(`M${X(bx)-4},${Y(by)-32}L${X(bx)},${Y(by)-40}L${X(bx)+4},${Y(by)-32}`,{stroke:'#176b80'});
    out+=line(X(gx),Y(gy),X(gx),Y(gy)+36,{stroke:'#cf5c32','stroke-width':2});out+=path(`M${X(gx)-4},${Y(gy)+29}L${X(gx)},${Y(gy)+37}L${X(gx)+4},${Y(gy)+29}`,{stroke:'#cf5c32'});
    out+=nsvg('circle',{cx:X(bx),cy:Y(by),r:4,fill:'#176b80'});out+=text(X(bx)+8,Y(by)-7,'B',{fill:'#176b80','font-size':12});out+=nsvg('circle',{cx:X(gx),cy:Y(gy),r:4,fill:'#cf5c32'});out+=text(X(gx)-12,Y(gy)-8,'G',{fill:'#cf5c32','font-size':12});
    out+=line(X(bx),h-28,X(gx),h-28,{stroke:'#142d39'});out+=text((X(bx)+X(gx))/2,h-9,'GZ = '+f(state.gz*1000,1)+' mm',{'text-anchor':'middle',fill:'#142d39'});el.innerHTML=svg(w,h,'Seção inclinada com centro de empuxo e massa',out);
    $('heel-values').innerHTML=`<div>Momento nesta posição<b>${f(state.moment*100,1)} N·cm</b></div><div>Centro de massa, KG<b>${f(geom.kg*1000,1)} mm</b></div>`;
    $('heel-warning').textContent=state.flooded?'Borda submersa: o desenho mostra a geometria, mas o equilíbrio estanque deixa de valer para a bandeja aberta.':state.gz<0?'Momento negativo nesta posição: o casco idealizado não tende a retornar para 0°.':'';
  }
  function rampDrawing(r){let el=$('ramp-sketch'),w=el.clientWidth||480,h=255,a=p.angle*Math.PI/180,H=p.height/1000,run=H/Math.tan(a),range=r.ramp.range,xmax=Math.max(run+range,.35)*1.08,ymax=Math.max(H+(r.ramp.exit*Math.sin(a))**2/(2*M.G),H)*1.4;
    const X=x=>35+x/xmax*(w-58),Y=y=>h-42-y/ymax*(h-72);let out=nsvg('rect',{x:0,y:Y(0),width:w,height:h-Y(0),fill:'#e8f1f2'});
    out+=path(`M${X(0)},${Y(0)} L${X(run)},${Y(H)} L${X(run)},${Y(0)}Z`,{fill:'#e4e8e3',stroke:'#86928a'});
    out+=line(13,Y(0),w-5,Y(0),{stroke:'#78a2ad'});out+=text(X(run)+5,Y(H)-10,'H = '+f(p.height,0)+' mm',{'font-size':11});out+=text(X(0)+12,Y(0)-10,f(p.angle,0)+'°');
    if(r.ramp.clears){let vals=Array.from({length:61},(_,i)=>{let t=r.ramp.time*i/60;return[X(run+r.ramp.exit*Math.cos(a)*t),Y(H+r.ramp.exit*Math.sin(a)*t-.5*M.G*t*t)];});out+=path(vals.map((v,i)=>(i?'L':'M')+v.join(',')).join(' '),{stroke:r.design.color,'stroke-width':2.5,'stroke-dasharray':'5 3'});out+=nsvg('circle',{cx:X(run+range),cy:Y(0),r:4,fill:r.design.color});out+=text(w-12,h-11,'Alcance além do topo: '+f(range*100,1)+' cm',{'text-anchor':'end',fill:'#142d39'});}
    else out+=text(w/2,35,'Não chega ao topo neste cenário',{'text-anchor':'middle',fill:'#954926'});
    let bx=X(run*.5),by=Y(H*.5);out+=nsvg('g',{transform:`translate(${bx},${by-5}) rotate(${-p.angle})`},nsvg('rect',{x:-20,y:-8,width:40,height:9,rx:4,fill:r.design.color})+nsvg('rect',{x:-6,y:-16,width:15,height:8,rx:4,fill:'#52646c'}));
    out+=text(10,15,w<400?'Trajetória · escalas X e Y distintas':'Esquema de trajetória; escalas horizontal e vertical distintas',{'font-size':10});el.innerHTML=svg(w,h,'Rampa e trajetória balística simplificada',out);
  }
  function energyDrawing(r){let vals=[['Entrada retida',r.ramp.entry,'#176b80'],['Trabalho do motor',r.ramp.thrustWork,'#39835e'],['Elevação',-r.ramp.gravity,'#cf5c32'],['Atrito',-r.ramp.frictionWork,'#b08a24'],['Energia final',r.ramp.net,'#142d39']],el=$('energy-chart'),w=el.clientWidth||480,h=245,left=127,right=65,max=Math.max(...vals.map(v=>Math.abs(v[1])))*1.08,pw=w-left-right;
    let out='';vals.forEach((v,i)=>{let y=25+i*42;out+=text(left-10,y+5,v[0],{'text-anchor':'end'});out+=nsvg('rect',{x:left,y:y-9,width:Math.abs(v[1])/max*pw,height:19,rx:3,fill:v[2]});out+=text(w-3,y+5,(v[1]>=0?'+':'−')+f(Math.abs(v[1]),3)+' J',{'text-anchor':'end',fill:'#142d39','font-family':'Consolas,monospace','font-size':11});});el.innerHTML=svg(w,h,'Trabalho e energia na rampa',out);
  }
  function outputs(){let v={payload:f(p.payload,0)+' g',cgOffset:(p.cgOffset>=0?'+':'')+f(p.cgOffset,0)+' mm',widthScale:f(240*p.widthScale,0)+' mm',lever:f(p.lever,0)+' mm',heel:f(p.heel,0)+'°',angle:f(p.angle,0)+'°',height:f(p.height,0)+' mm',mu:f(p.mu,2),retention:f(p.retention*100,0)+'%',speed:f(p.speed,1)+' m/s',thrust:f(p.thrust,2)+' N',filament:brl(p.filament)+'/kg',extras:brl(p.extras)};Object.entries(v).forEach(([k,val])=>$(k+'-out').textContent=val);}
  function render(recalc=true){outputs();if(recalc)results=M.evaluate(p);let r=selected(),d=r.design,s=r.stability,b=r.budget,q=r.ramp,flat=results.find(x=>x.design.id==='flat'),cat=results.find(x=>x.design.id==='cat');
    $('summary').innerHTML=[['Casco em foco',d.short,'Compare as seis construções abaixo'],['Massa estimada',f(s.geom.mass*1000,0)+' g',f(p.payload,0)+' g comuns + estrutura'],['Momento limite',f(s.peak*100,1)+' N·cm',s.limitType==='borda na água'?'Limitado pela borda aberta':'Pico antes da primeira perda de estabilidade'],['Custo estimado',brl(b.total),brl(b.remaining)+' até o teto de R$100']].map(x=>`<div><div class="metric-label">${x[0]}</div><div class="metric-value">${x[1]}</div><div class="metric-detail">${x[2]}</div></div>`).join('');
    $('hull-cards').innerHTML=results.map((v,i)=>`<article class="hull-card ${v.design.id===p.selected?'active':''}"><div class="card-top"><span class="num">0${i+1}</span><span>${v.design.tag}</span></div><h3>${v.design.name}</h3><div class="sketch">${sketch(v.design)}</div><p>${v.design.build}</p><div class="card-stats"><div><b>${f(v.stability.geom.mass*1000,0)} g</b><span>massa estimada</span></div><div><b>${f(v.stability.peak*100,1)}</b><span>momento / N·cm</span></div><div><b>${brl(v.budget.total)}</b><span>total estimado</span></div></div><button class="button" type="button" data-select="${v.design.id}" aria-pressed="${v.design.id===p.selected}">${v.design.id===p.selected?'Em análise':'Analisar esta proposta'}</button></article>`).join('');
    $('detail-title').textContent=d.name;planDrawing(r);
    $('dimensions').innerHTML=[['Envelope','300 × '+f(s.geom.beam*1000,0)+' mm'],['Altura do casco',f(d.depth*1000,0)+' mm'],['Comprimento equivalente',f(d.le*1000,0)+' mm'],['Estrutura estimada',f(s.geom.structuralMass*1000,0)+' g'],['Impressão, meta',d.printG+' g'],['KG do conjunto',f(s.geom.kg*1000,1)+' mm']].map(v=>`<div>${v[0]}<b>${v[1]}</b></div>`).join('');
    $('detail-copy').innerHTML=`<p class="kicker">Construção e compromisso</p><h3>${d.status}</h3><div class="details-grid">${[['Materiais',d.parts],['Vantagem',d.pro],['Limitação',d.con],['Na rampa',d.ramp],['Primeiro ajuste',d.adjust],['Esforço de construção',d.time]].map(v=>`<div class="detail-block"><h4>${v[0]}</h4><p>${v[1]}</p></div>`).join('')}</div>`;
    lineChart('moment-chart',results.map(v=>({id:v.design.id,name:v.design.short,color:v.design.color,values:v.stability.curve.map(a=>({x:a.deg,y:a.moment*100}))})),{title:'Momento restaurador por inclinação nos seis cascos',xLabel:'Inclinação lateral / graus',yLabel:'Momento restaurador / N·cm',unit:'N·cm',xmin:0,xmax:100,height:320,decimals:0});legends('moment-legend');heelDrawing(r);
    barChart('force-chart',results.map(v=>({id:v.design.id,name:v.design.short,value:v.stability.force,color:v.design.color})));
    $('comparison-body').innerHTML=results.map(v=>`<tr class="${v.design.id===p.selected?'active':''}"><td>${v.design.short}${v.design.kind==='open'?' *':''}</td><td>${f(v.stability.geom.mass*1000,0)}</td><td>${f(v.stability.draft*1000,1)}</td><td>${f(v.stability.gm*1000,0)}</td><td>${f(v.stability.peak*100,1)}</td><td>${f(v.stability.force,2)}</td><td>${f(v.stability.limitAngle,1)}${v.design.kind==='open'?' *':''}</td></tr>`).join('');
    let diff=(cat.stability.peak/flat.stability.peak-1)*100;
    $('stability-insight').innerHTML=`<p><strong>Catamarã versus prancha:</strong> neste cenário, ${f(cat.stability.peak*100,1)} contra ${f(flat.stability.peak*100,1)} N·cm (${diff>=0?'+':''}${f(diff,0)}%). A diferença estimada de custo é ${brl(cat.budget.total-flat.budget.total)}. Isso favorece testar o catamarã quando a resistência à inclinação pesar mais que a simplicidade. <strong>Não é uma previsão da força de colisão.</strong></p>`;
    $('ramp-title').textContent=d.short+' na rampa';rampDrawing(r);
    $('ramp-values').innerHTML=[['Empuxo para manter subida',f(q.required,2)+' N'],['Velocidade mínima',f(q.vmin,2)+' m/s'],['Saída do topo',q.clears?f(q.exit,2)+' m/s':'Não vence'],['Energia vertical ao pousar',q.clears?f(q.verticalImpactEnergy,3)+' J':'—']].map(v=>`<div>${v[0]}<b>${v[1]}</b></div>`).join('');
    lineChart('ramp-chart',results.map(v=>({id:v.design.id,name:v.design.short,color:v.design.color,values:Array.from({length:41},(_,i)=>({x:i+5,y:M.ramp(v.stability.geom.mass,{...p,angle:i+5}).vmin}))})),{title:'Velocidade mínima para vencer a rampa por inclinação',xLabel:'Inclinação da rampa / graus',yLabel:'Velocidade de entrada / m/s',unit:'m/s',reference:p.speed,referenceLabel:'Entrada atual',height:285,decimals:1});legends('ramp-legend');energyDrawing(r);
    $('ramp-insight').innerHTML=`<p><strong>${q.clears?'Passagem possível no modelo de energia.':'Energia insuficiente neste cenário.'}</strong> Com ${f(p.speed,1)} m/s, ${f(p.height,0)} mm de elevação e μ = ${f(p.mu,2)}, ${d.short.toLowerCase()} ${q.clears?'sai do topo a '+f(q.exit,2)+' m/s':'precisa de pelo menos '+f(q.vmin,2)+' m/s na entrada'}. Manter a subida sem depender do embalo exige ${f(q.required,2)} N, ${q.required>p.thrust?'acima':'abaixo'} dos ${f(p.thrust,2)} N assumidos. O contato geométrico e a velocidade real ainda precisam ser verificados.</p>`;
    $('propulsion-copy').innerHTML=`<div class="small-data"><div>Empuxo assumido<b>${f(p.thrust,2)} N ≈ ${f(p.thrust/M.G*1000,0)} gf</b></div><div>Para manter a subida<b>${f(q.required/M.G*1000,0)} gf</b></div><div>Potência ideal mínima, T atual<b>${f(M.idealAirPower(p.thrust),1)} W</b></div><div>Potência ideal mínima, manter<b>${f(M.idealAirPower(q.required),1)} W</b></div></div><p class="budget-facts">A proposta de hélice aérea deixa o fundo livre, mas um preço baixo de motor não prova empuxo suficiente. Meça o conjunto antes de fixar a geometria final. O controle diferencial com dois motores evita comprar um servo; a montagem continua sujeita a contato e água na batalha.</p>`;
    barChart('budget-chart',results.map(v=>({id:v.design.id,name:v.design.short,value:v.budget.total,color:v.design.color,parts:[{value:v.budget.confirmed,color:'#142d39'},{value:p.extras,color:'#b8cbd0'},{value:v.budget.hull,color:v.design.color}]})),{money:true,reference:100});
    $('budget-insight').innerHTML=`<p><strong>${d.short}: ${brl(b.total)} estimados.</strong> ${brl(b.confirmed)} vêm do valor informado e das duas referências de anúncio; ${brl(p.extras)} são metas de itens comuns, e ${brl(b.hull)} são casco/acabamento e impressão. ${b.remaining>=0?'Restariam '+brl(b.remaining)+'.':'O teto seria ultrapassado em '+brl(-b.remaining)+'.'} O orçamento só fecha depois de cotar bateria, hélices, alimentação, frete e confirmar o filamento no fatiador.</p>`;
    $('recommendation-title').textContent='Construir primeiro: prancha ou catamarã de patins.';
    $('recommendation-copy').textContent=`A prancha reduz montagem e peças. O catamarã oferece ${f(diff,0)}% mais momento limite neste cenário, com ${brl(cat.budget.total-flat.budget.total)} adicionais estimados. Como o ganho calculado depende da montagem e a rampa ainda é hipotética, usar o mesmo conjunto elétrico em dois cascos de retalhos é a comparação de menor custo. A bandeja impressa fica condicionada à massa, à borda aberta e ao consumo real do fatiador.`;
    window.xsvStudy={parameters:{...p},results:results.map(v=>({id:v.design.id,mass:v.stability.geom.mass,moment:v.stability.peak,force:v.stability.force,limit:v.stability.limitAngle,ramp:v.ramp,total:v.budget.total}))};
  }
  document.addEventListener('click',e=>{let el=e.target.closest('[data-select]');if(el){p.selected=el.dataset.select;render(false);}});
  Object.keys(M.defaults).forEach(key=>{let el=$(key);if(el)el.addEventListener('input',()=>{p[key]=Number(el.value);outputs();clearTimeout(pending);pending=setTimeout(()=>{if(key==='heel'){heelDrawing(selected());return;}render(['payload','cgOffset','widthScale','lever','filament','extras','angle','height','mu','retention','speed','thrust'].includes(key));},60);});});
  $('reset').addEventListener('click',()=>{Object.assign(p,M.defaults);Object.keys(p).forEach(k=>{if($(k))$(k).value=p[k];});render();});
  $('print-page').addEventListener('click',()=>window.print());
  let csvURL;
  $('export').addEventListener('click',()=>{const csv=M.csv(p,results);$('csv-content').value=csv;$('export-panel').hidden=false;$('export-panel').open=true;if(csvURL)URL.revokeObjectURL(csvURL);csvURL=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));$('csv-download').href=csvURL;});
  window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>render(false),160);});
  try{render();}catch(err){console.error(err);document.querySelector('main').insertAdjacentHTML('afterbegin','<div class="error-banner">Falha no cálculo: '+err.message+'</div>');}
})();
