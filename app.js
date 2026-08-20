(()=>{
  const css=document.createElement('link');css.rel='stylesheet';css.href='home-patch.css';document.head.appendChild(css);
  const faces=['⚀','⚁','⚂','⚃','⚄','⚅'];
  const svgNS='http://www.w3.org/2000/svg';
  const paths=[
    ['M','M 60 185 L 60 35 L 245 145 L 430 35 L 430 185'],
    ['P','M 100 185 L 100 35 L 295 35 C 420 35 420 125 295 125 L 100 125'],
    ['L','M 125 35 L 125 180 L 430 180'],
    ['A','M 65 185 L 245 35 L 425 185 L 350 125 L 140 125 L 65 185'],
    ['★','M 245 25 L 292 92 L 375 105 L 315 160 L 330 190 L 245 150 L 160 190 L 175 160 L 115 105 L 198 92 Z']
  ];
  function toast(title,text){const t=document.getElementById('toast');if(!t)return;document.getElementById('toastTitle').textContent=title;document.getElementById('toastText').textContent=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
  function svgEl(name,attrs={}){const el=document.createElementNS(svgNS,name);Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));return el}

  document.addEventListener('DOMContentLoaded',()=>{
    const header=document.querySelector('.topbar');
    if(header&&!document.querySelector('.institutional-pitch')){
      const pitch=document.createElement('div');
      pitch.className='institutional-pitch';
      pitch.innerHTML='<span><b>Uma central digital de participação e conhecimento.</b> Formação, desafios, comunidade, reconhecimento e indicadores reunidos numa experiência única, preparada para programas institucionais de grande escala.</span>';
      header.insertAdjacentElement('afterend',pitch);
    }

    const actions=document.querySelector('.actions');
    if(actions&&!actions.querySelector('[href="jogar.html"]')){
      const concept=actions.querySelector('.primary');
      if(concept){concept.textContent='Ver conceito';concept.classList.remove('primary');concept.classList.add('secondary')}
      const play=document.createElement('a');play.className='btn primary';play.href='jogar.html';play.textContent='▶ Jogar demonstração';actions.prepend(play);
    }
    const nav=document.querySelector('nav');
    if(nav&&!nav.querySelector('[href="jogar.html"]')){const a=document.createElement('a');a.href='jogar.html';a.textContent='Jogar agora';a.style.color='#d90016';nav.prepend(a)}

    const stats=[...document.querySelectorAll('.hero-stats>div')];
    [['5','níveis M · P · L · A · ★'],['250','checkpoints no percurso'],['4','jogadores na demo']].forEach((d,i)=>{if(stats[i])stats[i].innerHTML=`<b>${d[0]}</b><span>${d[1]}</span>`});

    const mini=document.getElementById('miniBoard');
    if(mini){
      mini.innerHTML='';mini.classList.add('mpla-mini');let active=0,progress=18;
      paths.forEach(([label],i)=>{const row=document.createElement('div');row.className='mini-level'+(i===0?' active':'');row.innerHTML=`<b>${label}</b><div class="mini-level-track" style="--progress:${i===0?progress:0}%"><i></i></div>`;mini.appendChild(row)});
      const roll=document.getElementById('miniRoll');
      if(roll)roll.addEventListener('click',()=>{const r=Math.floor(Math.random()*6)+1;document.getElementById('miniDice').textContent=faces[r-1];progress+=r*5;if(progress>=100&&active<4){progress=12;active++}[...mini.children].forEach((row,i)=>{row.classList.toggle('active',i===active);row.querySelector('.mini-level-track')?.style.setProperty('--progress',`${i<active?100:i===active?progress:0}%`)})});
    }

    const board=document.getElementById('board');
    if(board){
      board.innerHTML='';board.className='board home-mpla-preview';
      paths.forEach(([label,d])=>{
        const row=document.createElement('div');row.className='home-level';const title=document.createElement('strong');title.textContent=label;
        const svg=svgEl('svg',{viewBox:'0 0 500 220',preserveAspectRatio:'xMidYMid meet'});const path=svgEl('path',{d,class:'home-route'});svg.appendChild(path);row.append(title,svg);board.appendChild(row);
        requestAnimationFrame(()=>{const len=path.getTotalLength();for(let i=0;i<12;i++){const p=path.getPointAtLength(len*(i/11));svg.appendChild(svgEl('circle',{cx:p.x,cy:p.y,r:i%4===0?8:5,class:`home-node ${i%5===0?'alt':i%4===0?'event':i%7===0?'penalty':''}`}))}});
      });
    }

    document.querySelectorAll('.answer-grid button').forEach(b=>b.addEventListener('click',()=>toast(b.textContent==='1975'?'Resposta correta!':'Continua a tentar',b.textContent==='1975'?'+50 pontos demonstrativos':'Esta é apenas uma simulação')));
    document.getElementById('presentationBtn')?.addEventListener('click',()=>document.body.classList.toggle('presentation'));
  });
})();
