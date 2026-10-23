(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.XSV=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const G=9.81,RHO=1000;
  const defaults={payload:180,cgOffset:0,widthScale:1,lever:50,angle:20,height:100,mu:.15,retention:.75,speed:2,thrust:.30,filament:100,extras:45,selected:'cat',heel:15,stop:20};
  const designs=[
    {id:'flat',name:'Prancha plana',short:'Prancha',color:'#176b80',length:.30,le:.24,beam:.24,depth:.032,hullMass:.035,hullCG:.016,payloadCG:.055,printG:15,materials:4,kind:'rect',tag:'Mais simples',build:'Espuma de embalagem, fundo liso e proa arredondada. Dois suportes pequenos impressos.',pro:'Um corpo, poucas juntas e superfície contínua para deslizar.',con:'Contato amplo na reentrada; espuma precisa de acabamento local onde raspa.',ramp:'Frente com curva suave. A lâmina inferior deve acompanhar a curva, sem uma ponta solta.',parts:'Espuma reaproveitada; 15 g de filamento (meta); fita e plástico fino.',adjust:'Começar com a eletrônica baixa e no centro. Não adicionar lastro.',time:'Pouco corte e montagem',status:'Candidata ao primeiro protótipo'},
    {id:'cat',name:'Catamarã de patins',short:'Catamarã',color:'#d15e32',length:.30,le:.26,beam:.24,depth:.04,pontoon:.045,hullMass:.040,hullCG:.025,payloadCG:.065,printG:30,materials:5,kind:'cat',tag:'Apoio lateral',build:'Dois patins de espuma com travessas curtas e a PET ao centro. Sem simetria vertical.',pro:'Permite ajustar a largura sem refazer os flutuadores.',con:'Uma aterrissagem de lado torce as travessas; a ponte não pode pegar na rampa.',ramp:'Dois fundos lisos e proas curvas. Checar a folga da travessa na mudança de inclinação.',parts:'Dois retalhos de espuma; 30 g de filamento (meta); fixações.',adjust:'Aumentar a separação dos patins só enquanto couber na rampa.',time:'Mais fixações que a prancha',status:'Candidata para estabilidade lateral'},
    {id:'vee',name:'Monocasco V raso',short:'V raso',color:'#7b55a3',length:.30,le:.24,beam:.24,depth:.055,vee:.028,hullMass:.040,hullCG:.033,payloadCG:.060,printG:15,materials:5,kind:'vee',tag:'Comparar reentrada',build:'Espuma recortada em V pouco profundo, sem quilha; PET fixada sobre o casco.',pro:'Permite estudar uma entrada na água mais progressiva.',con:'O benefício de impacto não é calculado aqui; a aresta central concentra o contato na rampa.',ramp:'V suave, sem lâmina pendurada. Reforçar apenas a faixa de desgaste.',parts:'Espuma; 15 g de filamento (meta); fita e faixa de plástico.',adjust:'Manter o V raso. Uma quilha voltaria a criar o problema de passagem.',time:'Mais trabalho de corte',status:'Alternativa para comparar o pouso'},
    {id:'pet',name:'Catamarã de PET',short:'Duas PET',color:'#39835e',length:.30,le:.18,beam:.24,depth:.06,radius:.03,hullMass:.065,hullCG:.035,payloadCG:.085,printG:35,materials:5,kind:'pet',tag:'Reaproveitamento',build:'Duas garrafas iguais fechadas e travessas leves. Uma terceira embalagem recebe a eletrônica.',pro:'Flutuadores prontos; o material principal pode ser gratuito.',con:'Nervuras, tampas e a altura da montagem prejudicam a rampa e elevam o centro de massa.',ramp:'Precisa de superfície lisa por baixo se a garrafa tiver relevos que prendam.',parts:'Duas PET; 35 g de filamento (meta); tiras lisas e fixações.',adjust:'Escolher garrafas pequenas iguais; prender contra rotação.',time:'Montagem rápida, fundo exige adaptação',status:'Opção para material já disponível'},
    {id:'tri',name:'Trimaran compacto',short:'Trimaran',color:'#b08a24',length:.30,le:.26,beam:.24,depth:.04,hullMass:.050,hullCG:.025,payloadCG:.062,printG:40,materials:6,kind:'tri',tag:'Apoio progressivo',build:'Casco central de espuma e dois flutuadores menores com braços curtos.',pro:'Permite aproveitar uma base estreita e acrescentar apoio lateral.',con:'Os flutuadores podem começar fora da água: estabilidade inicial e estabilidade a maior inclinação diferem.',ramp:'Três superfícies de contato; braços precisam passar sem raspar.',parts:'Três retalhos; 40 g de filamento (meta); fixações.',adjust:'A altura dos flutuadores importa tanto quanto a distância lateral.',time:'Mais peças e alinhamento',status:'Prioridade menor ao partir do zero'},
    {id:'print',name:'Bandeja impressa',short:'Impresso',color:'#555d6c',length:.30,le:.24,beam:.24,depth:.04,hullMass:.080,hullCG:.018,payloadCG:.050,printG:80,materials:3,kind:'open',tag:'Forma reproduzível',build:'Monocasco raso aberto em cima, com proa curva e suportes integrados. Eletrônica permanece na PET.',pro:'Reproduz o desenho e facilita pequenas alterações no CAD.',con:'O modelo para quando a borda mergulha; depois disso a bandeja pode encher.',ramp:'Fundo liso e curva de entrada; orientação da impressão afeta a resistência real.',parts:'80 g de filamento como hipótese, ainda sem STL fatiado; PET e fixações.',adjust:'Conferir massa no fatiador. Não gastar tempo criando uma tampa impressa estanque.',time:'Impressão e verificação do casco',status:'Comparar peso antes de imprimir'}
  ];
  function rectangle(x0,y0,w,h){return [[x0,y0],[x0+w,y0],[x0+w,y0+h],[x0,y0+h]];}
  function circle(cx,cy,r,n=64){return Array.from({length:n},(_,i)=>{let a=i*2*Math.PI/n;return[cx+r*Math.cos(a),cy+r*Math.sin(a)];});}
  function polygonStats(p){if(p.length<3)return{area:0,x:0,y:0};let a=0,x=0,y=0;for(let i=0;i<p.length;i++){let u=p[i],v=p[(i+1)%p.length],c=u[0]*v[1]-v[0]*u[1];a+=c;x+=(u[0]+v[0])*c;y+=(u[1]+v[1])*c;}if(Math.abs(a)<1e-16)return{area:0,x:0,y:0};return{area:Math.abs(a/2),x:x/(3*a),y:y/(3*a)};}
  function clip(p,h){let out=[];for(let i=0;i<p.length;i++){let a=p[i],b=p[(i+1)%p.length],ia=a[1]<=h,ib=b[1]<=h;if(ia)out.push(a);if(ia!==ib){let t=(h-a[1])/(b[1]-a[1]);out.push([a[0]+t*(b[0]-a[0]),h]);}}return out;}
  function rotate(p,phi){let c=Math.cos(phi),s=Math.sin(phi);return p.map(([x,y])=>[x*c+y*s,-x*s+y*c]);}
  function geometry(d,p){let b=d.beam*p.widthScale,L=d.le,h=d.depth,bodies=[];let add=(poly,length=L,type='hull')=>bodies.push({poly,length,type});
    if(d.kind==='rect'||d.kind==='open')add(rectangle(-b/2,0,b,h));
    if(d.kind==='vee')add([[-b/2,d.vee],[0,0],[b/2,d.vee],[b/2,h],[-b/2,h]]);
    if(d.kind==='cat'){let w=d.pontoon;add(rectangle(-b/2,0,w,h));add(rectangle(b/2-w,0,w,h));}
    if(d.kind==='pet'){add(circle(-b/2+d.radius,d.radius,d.radius));add(circle(b/2-d.radius,d.radius,d.radius));}
    if(d.kind==='tri'){add(rectangle(-.04,0,.08,h));add(rectangle(-b/2,.008,.03,.03),.18);add(rectangle(b/2-.03,.008,.03,.03),.18);}
    add(circle(0,h+.028,.025),.10,'capsule');
    let foamVolume=bodies.filter(v=>v.type==='hull').reduce((sum,v)=>sum+polygonStats(v.poly).area*v.length,0);
    let structuralMass=(d.kind==='pet'?.04:d.kind==='open'?0:foamVolume*20)+d.printG/1000+.01;
    let m=structuralMass+p.payload/1000,kg=(structuralMass*d.hullCG+(p.payload/1000)*(d.payloadCG+p.cgOffset/1000))/m;
    return{bodies,mass:m,structuralMass,kg,beam:b,depth:h,open:d.kind==='open',rim:[[-b/2,h],[b/2,h]],capacity:bodies.reduce((s,v)=>s+polygonStats(v.poly).area*v.length,0)};
  }
  function hydro(geom,phi){let bodies=geom.bodies.map(v=>({...v,poly:rotate(v.poly,phi)})),target=geom.mass/RHO;
    if(target>=geom.capacity)return{valid:false,overloaded:true};
    let ys=bodies.flatMap(b=>b.poly.map(v=>v[1])),lo=Math.min(...ys)-.01,hi=Math.max(...ys)+.01;
    const sub=(h,details=false)=>{let volume=0,x=0,y=0,parts=[];for(let body of bodies){let poly=clip(body.poly,h),a=polygonStats(poly),v=a.area*body.length;volume+=v;x+=v*a.x;y+=v*a.y;if(details)parts.push({...body,sub:poly});}return{volume,x:volume?x/volume:0,y:volume?y/volume:0,parts};};
    for(let j=0;j<42;j++){let mid=(lo+hi)/2;if(sub(mid).volume<target)lo=mid;else hi=mid;}
    let waterline=(lo+hi)/2,r=sub(waterline,true),cg=[geom.kg*Math.sin(phi),geom.kg*Math.cos(phi)],gz=r.x-cg[0];
    let flooded=geom.open&&rotate(geom.rim,phi).some(v=>v[1]<=waterline+1e-10);
    return{valid:!flooded,flooded,waterline,gz,moment:geom.mass*G*gz,buoyancy:[r.x,r.y],cg,parts:r.parts,volume:r.volume};
  }
  function stability(d,p,step=1){let geom=geometry(d,p),upright=hydro(geom,0);if(!upright.valid)return{geom,upright,valid:false,curve:[],peak:0,force:0,gm:NaN,limitAngle:0,limitType:'sem equilíbrio'};
    let small=hydro(geom,1e-4),gm=small.gz/1e-4,curve=[],peak=0,peakAngle=0,limitAngle=null,limitType='sem zero até 100°',energy=0,firstLimit=false,prev=null;
    for(let deg=0;deg<=100;deg+=step){let r=hydro(geom,deg*Math.PI/180);
      if(!r.valid){if(!firstLimit){limitAngle=deg;limitType='borda na água';firstLimit=true;}break;}
      if(!firstLimit&&deg>0&&r.gz<=0&&prev&&prev.gz>0){let f=prev.gz/(prev.gz-r.gz);limitAngle=prev.deg+f*(deg-prev.deg);limitType='GZ = 0';energy+=(prev.moment)*.5*(limitAngle-prev.deg)*Math.PI/180;firstLimit=true;}
      if(!firstLimit&&deg>0&&gm<=0){limitAngle=0;limitType='instável na origem';firstLimit=true;}
      if(!firstLimit){if(r.moment>peak){peak=r.moment;peakAngle=deg;}if(prev)energy+=(prev.moment+r.moment)/2*(deg-prev.deg)*Math.PI/180;}
      curve.push({deg,gz:r.gz,moment:r.moment});prev={deg,gz:r.gz,moment:r.moment};
    }
    return{geom,upright,valid:true,curve,peak,peakAngle,gm,force:peak/(p.lever/1000),limitAngle,limitType,energy,draft:upright.waterline,freeboard:geom.depth-upright.waterline};
  }
  function ramp(mass,p){let a=p.angle*Math.PI/180,h=p.height/1000,s=h/Math.sin(a),normal=mass*G*Math.cos(a),friction=p.mu*normal,gravity=mass*G*h,frictionWork=friction*s,thrustWork=p.thrust*s,entry=.5*mass*p.speed*p.speed*p.retention,net=entry+thrustWork-gravity-frictionWork;
    let required=mass*G*Math.sin(a)+friction,vmin=Math.sqrt(Math.max(0,2*(gravity+frictionWork-thrustWork)/(mass*p.retention))),exit=net>0?Math.sqrt(2*net/mass):0,clears=net>1e-10;
    let time=clears?(exit*Math.sin(a)+Math.sqrt((exit*Math.sin(a))**2+2*G*h))/G:0,range=clears?exit*Math.cos(a)*time:0,impactVy=clears?Math.sqrt((exit*Math.sin(a))**2+2*G*h):0;
    return{length:s,required,vmin,exit,clears,range,time,gravity,frictionWork,thrustWork,entry,net,normal,verticalImpactEnergy:.5*mass*impactVy**2,averageVerticalContact:clears?mass*G+.5*mass*impactVy**2/(p.stop/1000):0};
  }
  function idealAirPower(thrust,diameter=.06,count=2){let A=count*Math.PI*(diameter/2)**2;return Math.sqrt(thrust**3/(2*1.225*A));}
  function budget(d,p){let confirmed=13+12+5.95,common=confirmed+p.extras,hull=d.printG*p.filament/1000+d.materials;return{confirmed,common,hull,total:common+hull,remaining:100-common-hull,printCost:d.printG*p.filament/1000};}
  function evaluate(p=defaults){return designs.map(d=>({design:d,stability:stability(d,p),budget:budget(d,p),ramp:ramp(geometry(d,p).mass,p)}));}
  function csv(p=defaults,results=evaluate(p)){
    const rows=[['tipo','casco_ou_parametros','angulo_deg','GZ_m','momento_Nm','massa_kg','custo_estimado_BRL','v_entrada_min_m_s'],['premissas',JSON.stringify(p),'','','','','','']];
    for(const r of results)for(const c of r.stability.curve)rows.push(['curva',r.design.id,c.deg,c.gz,c.moment,r.stability.geom.mass,r.budget.total,r.ramp.vmin]);
    return '\ufeff'+rows.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(';')).join('\r\n');
  }
  return{G,RHO,defaults,designs,rectangle,circle,polygonStats,clip,rotate,geometry,hydro,stability,ramp,idealAirPower,budget,evaluate,csv};
});
