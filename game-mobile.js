document.addEventListener('DOMContentLoaded',()=>{
  const mq=window.matchMedia('(max-width: 820px)');
  const gameScreen=document.getElementById('gameScreen');
  const controlDock=document.querySelector('.control-dock');
  if(!gameScreen||!controlDock)return;

  const targets=[
    document.querySelector('.turn-card'),
    document.querySelector('.score-card'),
    document.querySelector('.progress-card'),
    document.querySelector('.log-card'),
    document.getElementById('newGameBtn')
  ].filter(Boolean);

  const placeholders=new Map();
  targets.forEach((el,i)=>{
    const marker=document.createComment(`mobile-dock-${i}`);
    el.parentNode.insertBefore(marker,el);
    placeholders.set(el,marker);
  });

  const dock=document.createElement('div');
  dock.className='mobile-game-dock';
  dock.hidden=true;
  const drawer=document.createElement('div');
  drawer.className='mobile-stats-drawer';
  const toggle=document.createElement('button');
  toggle.className='mobile-stats-toggle';
  toggle.type='button';
  toggle.setAttribute('aria-label','Mostrar estatísticas');
  toggle.setAttribute('aria-expanded','false');
  toggle.textContent='⌃';
  dock.append(drawer,toggle);
  document.body.appendChild(dock);

  function mountMobile(){
    if(!mq.matches)return restoreDesktop();
    const turn=document.querySelector('.turn-card');
    const stats=[document.querySelector('.score-card'),document.querySelector('.progress-card'),document.querySelector('.log-card'),document.getElementById('newGameBtn')].filter(Boolean);
    stats.forEach(el=>drawer.appendChild(el));
    if(turn)dock.insertBefore(turn,drawer);
    syncVisibility();
  }

  function restoreDesktop(){
    dock.classList.remove('expanded');
    toggle.setAttribute('aria-expanded','false');
    toggle.textContent='⌃';
    targets.forEach(el=>{
      const marker=placeholders.get(el);
      if(marker?.parentNode)marker.parentNode.insertBefore(el,marker.nextSibling);
    });
    dock.hidden=true;
    document.body.classList.remove('mobile-game-active');
  }

  function syncVisibility(){
    const active=mq.matches&&!gameScreen.classList.contains('hidden');
    dock.hidden=!active;
    document.body.classList.toggle('mobile-game-active',active);
    if(!active){dock.classList.remove('expanded');toggle.setAttribute('aria-expanded','false');toggle.textContent='⌃';}
  }

  toggle.addEventListener('click',()=>{
    const expanded=dock.classList.toggle('expanded');
    toggle.setAttribute('aria-expanded',String(expanded));
    toggle.setAttribute('aria-label',expanded?'Ocultar estatísticas':'Mostrar estatísticas');
    toggle.textContent=expanded?'⌄':'⌃';
  });

  mq.addEventListener?.('change',mountMobile);
  new MutationObserver(syncVisibility).observe(gameScreen,{attributes:true,attributeFilter:['class']});
  mountMobile();
});
