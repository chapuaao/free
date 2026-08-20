const faces=['⚀','⚁','⚂','⚃','⚄','⚅'];
const mini=document.getElementById('miniBoard');
let miniPos=0;
for(let i=1;i<=30;i++){const c=document.createElement('div');c.className='mini-cell'+(i===1?' active':'');c.textContent=i;mini.appendChild(c)}
function miniRoll(){const r=Math.floor(Math.random()*6)+1;document.getElementById('miniDice').textContent=faces[r-1];mini.children[miniPos].classList.remove('active');miniPos=(miniPos+r)%30;mini.children[miniPos].classList.add('active')}
document.getElementById('miniRoll').addEventListener('click',miniRoll);
const board=document.getElementById('board');
const coords=[];
for(let c=0;c<10;c++)coords.push([1,c+1]);for(let r=1;r<7;r++)coords.push([r+1,10]);for(let c=8;c>=0;c--)coords.push([7,c+1]);for(let r=5;r>=1;r--)coords.push([r+1,1]);
let pos=0;
coords.forEach((rc,i)=>{const d=document.createElement('div');d.className='cell '+(i%9===0?'bonus':i%7===0?'quiz':i%11===0?'event':i%13===0?'penalty':'');if(i===0)d.classList.add('active');d.style.gridRow=rc[0];d.style.gridColumn=rc[1];d.textContent=i+1;board.appendChild(d)});
const cells=[...board.querySelectorAll('.cell')];
function toast(title,text){const t=document.getElementById('toast');document.getElementById('toastTitle').textContent=title;document.getElementById('toastText').textContent=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}
function roll(){const r=Math.floor(Math.random()*6)+1;document.getElementById('diceIcon').textContent=faces[r-1];cells[pos].classList.remove('active');pos=(pos+r)%cells.length;cells[pos].classList.add('active');document.getElementById('turnText').textContent=`Casa ${pos+1} · dado: ${r}`;const kind=cells[pos].className;if(kind.includes('bonus'))toast('Bónus!','Uma ação positiva faz-te avançar.');else if(kind.includes('quiz'))toast('Pergunta!','Desafio de conhecimento desbloqueado.');else if(kind.includes('event'))toast('Evento!','Missão relâmpago ativada.');else if(kind.includes('penalty'))toast('Sanção!','O percurso ficou mais difícil.');else toast('Boa jogada!',`Avançaste ${r} casas.`)}
document.getElementById('rollBtn').addEventListener('click',roll);
document.querySelectorAll('.answer-grid button').forEach(b=>b.addEventListener('click',()=>toast(b.textContent==='1975'?'Resposta correta!':'Continua a tentar',b.textContent==='1975'?'+50 pontos demonstrativos':'Esta é apenas uma simulação')));
document.getElementById('presentationBtn').addEventListener('click',()=>document.body.classList.toggle('presentation'));

// Entrada para a demonstração semi-funcional.
const actions=document.querySelector('.actions');
if(actions){
  const concept=actions.querySelector('.primary');
  if(concept){concept.textContent='Ver conceito';concept.classList.remove('primary');concept.classList.add('secondary')}
  const play=document.createElement('a');
  play.className='btn primary';
  play.href='jogar.html';
  play.textContent='▶ Jogar demonstração';
  actions.prepend(play);
}
const nav=document.querySelector('nav');
if(nav){
  const playNav=document.createElement('a');
  playNav.href='jogar.html';
  playNav.textContent='Jogar agora';
  playNav.style.color='#d90016';
  nav.prepend(playNav);
}
