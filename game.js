const FACES=['⚀','⚁','⚂','⚃','⚄','⚅'];
const COLORS=['#d80017','#2b7fff','#1da66b','#8e49e8'];
const DEMO_NAMES=['João Luís','Tomás','Ana','Carlos'];
const SVG_NS='http://www.w3.org/2000/svg';

const LEVELS=[
  {key:'M',name:'Origem',nodes:11,path:'M 75 160 L 75 35 L 220 125 L 365 35 L 365 160'},
  {key:'P',name:'História',nodes:11,path:'M 120 165 L 120 35 L 285 35 Q 390 35 390 98 Q 390 150 285 150 L 120 150'},
  {key:'L',name:'Organização',nodes:10,path:'M 145 35 L 145 165 L 405 165'},
  {key:'A',name:'Estatutos',nodes:11,path:'M 85 165 L 245 35 L 405 165 L 330 105 L 160 105 L 85 165'},
  {key:'★',name:'Conquista',nodes:12,path:'M 245 25 L 285 95 L 365 105 L 305 155 L 325 180 L 245 145 L 165 180 L 185 155 L 125 105 L 205 95 Z'}
];

const PATTERNS=[
  ['start','normal','quiz','bonus','challenge','normal','event','quiz','penalty','normal','finish'],
  ['start','quiz','normal','event','challenge','bonus','normal','quiz','penalty','bonus','finish'],
  ['start','normal','challenge','quiz','bonus','event','normal','quiz','penalty','finish'],
  ['start','quiz','bonus','normal','challenge','quiz','event','normal','penalty','bonus','finish'],
  ['start','quiz','challenge','bonus','event','quiz','penalty','bonus','challenge','quiz','normal','finish']
];

const QUIZZES=[
  {level:0,title:'Fundação do MPLA',question:'Qual é a data oficial da fundação do MPLA?',options:['10 de Dezembro de 1956','4 de Fevereiro de 1961','11 de Novembro de 1975','1 de Maio de 1958'],answer:0,source:'mpla.ao · O Partido / História',note:'A página oficial do MPLA identifica 10 de Dezembro de 1956 como a data oficial de fundação.'},
  {level:0,title:'Primeira liderança',question:'Segundo a biografia oficial do atual Presidente do MPLA, quem foi o primeiro Presidente do MPLA desde a fundação?',options:['Agostinho Neto','Mário Pinto de Andrade','Ilídio Machado','José Eduardo dos Santos'],answer:2,source:'mpla.ao · Biografia do Presidente',note:'A fonte oficial apresenta a sequência: Ilídio Machado, Mário Pinto de Andrade, Agostinho Neto, José Eduardo dos Santos e João Lourenço.'},
  {level:0,title:'Identidade',question:'O que significa a sigla MPLA?',options:['Movimento Popular de Libertação de Angola','Movimento Patriótico Livre de Angola','Movimento Popular Laboral Angolano','Movimento para a Paz e Liberdade de Angola'],answer:0,source:'mpla.ao · O Partido',note:'MPLA significa Movimento Popular de Libertação de Angola.'},
  {level:0,title:'Independência Nacional',question:'Quem proclamou a Independência Nacional de Angola em 11 de Novembro de 1975?',options:['Agostinho Neto','Ilídio Machado','Paulo Pombolo','Mário Pinto de Andrade'],answer:0,source:'mpla.ao · Tese “Da Independência aos Nossos Dias”',note:'A fonte oficial refere António Agostinho Neto, então Presidente do MPLA e Primeiro Presidente de Angola.'},
  {level:1,title:'Conferência de 1962',question:'Em que ano Agostinho Neto assumiu a presidência do MPLA na 1.ª Conferência Nacional?',options:['1956','1960','1962','1974'],answer:2,source:'mpla.ao · Tese histórica 2025',note:'A tese oficial refere a 1.ª Conferência Nacional de 1 a 3 de Dezembro de 1962.'},
  {level:1,title:'Memória Nacional',question:'Qual é a data da Independência Nacional de Angola?',options:['4 de Fevereiro','11 de Novembro','17 de Setembro','10 de Dezembro'],answer:1,source:'mpla.ao · História',note:'11 de Novembro de 1975.'},
  {level:1,title:'Hino do MPLA',question:'Segundo os Estatutos, como se chama o Hino do MPLA?',options:['Angola Avante','Com o povo heróico e generoso','Paz, Trabalho e Liberdade','Vitória é Certa'],answer:1,source:'Estatutos do MPLA 2025 · Artigo 7.º',note:'O Artigo 7.º dos Estatutos identifica o hino como “Com o povo heróico e generoso”.'},
  {level:1,title:'Lema no emblema',question:'Que inscrição aparece no emblema do MPLA?',options:['Paz, Trabalho e Liberdade','Unidade, Disciplina e Vitória','Povo, Nação e Progresso','Trabalho, Justiça e Futuro'],answer:0,source:'Estatutos do MPLA 2025 · Artigo 6.º',note:'O emblema contém a inscrição “Paz, Trabalho e Liberdade”.'},
  {level:2,title:'Organização local',question:'Qual é a principal organização local do MPLA?',options:['Comité de Acção do MPLA (CAP)','Assembleia Nacional','Bureau Provincial','Comissão Eleitoral'],answer:0,source:'Regulamento das Organizações de Base do MPLA · Artigo 10.º',note:'O regulamento define o Comité de Acção do MPLA como a principal organização local.'},
  {level:2,title:'Constituição de um CAP',question:'Qual é o número mínimo de militantes indicado para criar um Comité de Acção do MPLA?',options:['5','10','15','25'],answer:2,source:'Regulamento das Organizações de Base do MPLA · Artigo 10.º',note:'O regulamento estabelece um mínimo de 15 militantes.'},
  {level:2,title:'Estrutura territorial',question:'Qual destas sequências corresponde à organização territorial indicada nos Estatutos?',options:['Base → comunal/distrito urbano → municipal → provincial → nacional','Bairro → comuna → país','Municipal → nacional → provincial','Provincial → base → municipal'],answer:0,source:'Estatutos do MPLA · Organização territorial',note:'Os Estatutos organizam o Partido nos escalões de base, comunal ou distrito urbano, municipal, provincial e nacional.'},
  {level:2,title:'Liderança nacional',question:'Quem é o Secretário-Geral do MPLA?',options:['Paulo Pombolo','Mara Quiosa','Justino Capapinha','Luís Nunes'],answer:0,source:'mpla.ao · Biografia do Secretário-Geral · Atualizado: ago. 2026',note:'Paulo Pombolo é identificado como atual Secretário-Geral do MPLA.'},
  {level:3,title:'Natureza do Partido',question:'Segundo os Estatutos de 2025, o MPLA é definido como um partido:',options:['Nacional, independente, democrático, progressista e moderno','Regional e exclusivamente sindical','Confessional e local','Temporário e municipal'],answer:0,source:'Estatutos do MPLA 2025 · Artigo 8.º',note:'É esta a formulação constante do Artigo 8.º.'},
  {level:3,title:'Símbolos',question:'Segundo os Estatutos, o amarelo-vivo da bandeira representa:',options:['As riquezas do País','O continente africano','O sangue derramado','A organização de base'],answer:0,source:'Estatutos do MPLA · Símbolos',note:'O amarelo-vivo representa as riquezas do País.'},
  {level:3,title:'A estrela',question:'Quantas pontas tem a estrela descrita nos Estatutos do MPLA?',options:['4','5','6','8'],answer:1,source:'Estatutos do MPLA · Símbolos',note:'As cinco pontas são associadas a paz; unidade nacional; liberdade e democracia; justiça e progresso social; solidariedade.'},
  {level:3,title:'Presidência atual',question:'Quem é o Presidente do MPLA?',options:['João Lourenço','Paulo Pombolo','Mara Quiosa','Roberto de Almeida'],answer:0,source:'mpla.ao · Órgãos e Organismos · Atualizado: ago. 2026',note:'João Manuel Gonçalves Lourenço é identificado como Presidente do MPLA.'},
  {level:4,title:'Vice-Presidência',question:'Quem é a Vice-Presidente do MPLA?',options:['Mara Quiosa','Emília Dias','Ângela Bragança','Nádia Monteiro'],answer:0,source:'mpla.ao · Órgãos e Organismos · Atualizado: ago. 2026',note:'Mara Regina da Silva Baptista Domingos Quiosa é a Vice-Presidente do MPLA.'},
  {level:4,title:'JMPLA',question:'Quem é o Primeiro Secretário Nacional da JMPLA?',options:['Justino Capapinha','Paulo Pombolo','Luís Nunes','Pereira Alfredo'],answer:0,source:'mpla.ao · Órgãos e Organismos · Atualizado: ago. 2026',note:'A página oficial identifica Justino Capapinha como Primeiro Secretário Nacional da JMPLA.'},
  {level:4,title:'OMA',question:'Quem é a Secretária-Geral da OMA?',options:['Emília Carlota Dias','Mara Quiosa','Nádia Monteiro','Maria Idalina Valente'],answer:0,source:'mpla.ao · Notícias, 12 mar. 2026 · Atualizado: ago. 2026',note:'Emília Carlota Dias assumiu formalmente as funções em março de 2026.'},
  {level:4,title:'Luanda',question:'Quem é identificado em julho de 2026 como Primeiro Secretário Provincial do MPLA em Luanda?',options:['Luís Nunes','Pereira Alfredo','Eugénio Laborinho','Carla Cativa'],answer:0,source:'mpla.ao · Notícias, 16 jul. 2026',note:'Luís Manuel da Fonseca Nunes é identificado como Primeiro Secretário Provincial do MPLA em Luanda.'}
];

const CHALLENGES=[
  {title:'Memória Histórica',text:'Em 15 segundos, diga um acontecimento histórico ligado à independência de Angola.',success:70,skip:-10},
  {title:'Estrutura de Base',text:'Explique em uma frase qual pode ser a utilidade de uma organização local bem coordenada.',success:65,skip:-10},
  {title:'Símbolos',text:'Sem consultar o ecrã, diga uma das palavras da inscrição do emblema do MPLA.',success:60,skip:-10},
  {title:'Organização',text:'Diga três escalões territoriais do Partido referidos nos Estatutos.',success:70,skip:-10},
  {title:'Conhecimento Atual',text:'Diga o nome de um dos três dirigentes nacionais destacados no painel atual: Presidente, Vice-Presidente ou Secretário-Geral.',success:65,skip:-10}
];
const BONUSES=[
  {title:'Conhecimento premiado',text:'Resposta e preparação reconhecidas. Avance 2 casas e ganhe 45 pontos.',move:2,points:45},
  {title:'Espírito de equipa',text:'A equipa reconheceu o teu contributo. Ganhe 70 pontos.',move:0,points:70},
  {title:'Participação ativa',text:'Avance 1 casa e ganhe 50 pontos.',move:1,points:50}
];
const PENALTIES=[
  {title:'Falta de preparação',text:'A preparação ficou incompleta. Recue 2 casas e perca 20 pontos.',move:-2,points:-20},
  {title:'Atraso na atividade',text:'O atraso teve consequência. Fique uma ronda sem jogar.',move:0,points:-10,skip:1},
  {title:'Falha de coordenação',text:'A equipa perdeu ritmo. Recue 1 casa e perca 25 pontos.',move:-1,points:-25}
];
const EVENTS=[
  {title:'Encontro de equipa',text:'Todos os jogadores recebem 20 pontos pela participação coletiva.',allPoints:20},
  {title:'Ronda de conhecimento',text:'O jogador atual ganha 35 pontos e mantém a posição.',points:35},
  {title:'Ação comunitária',text:'Avance 2 casas e ganhe 30 pontos.',move:2,points:30}
];

const state={players:[],current:0,round:1,awaiting:false,rolling:false,sound:true,finishedOrder:[],playerCount:2,usedQuiz:new Set()};
const els={};
let audioCtx=null;

document.addEventListener('DOMContentLoaded',()=>{
  Object.assign(els,{setupScreen:document.getElementById('setupScreen'),gameScreen:document.getElementById('gameScreen'),playerCount:document.getElementById('playerCount'),playerInputs:document.getElementById('playerInputs'),startBtn:document.getElementById('startBtn'),quickDemoBtn:document.getElementById('quickDemoBtn'),mplaMap:document.getElementById('mplaMap'),dice:document.getElementById('dice'),rollBtn:document.getElementById('rollBtn'),turnName:document.getElementById('turnName'),turnToken:document.getElementById('turnToken'),turnLevel:document.getElementById('turnLevel'),roundLabel:document.getElementById('roundLabel'),turnHint:document.getElementById('turnHint'),centerMessage:document.getElementById('centerMessage'),scoreList:document.getElementById('scoreList'),gameLog:document.getElementById('gameLog'),playersAlive:document.getElementById('playersAlive'),newGameBtn:document.getElementById('newGameBtn'),soundBtn:document.getElementById('soundBtn'),fullscreenBtn:document.getElementById('fullscreenBtn'),eventModal:document.getElementById('eventModal'),eventBadge:document.getElementById('eventBadge'),eventKind:document.getElementById('eventKind'),eventTitle:document.getElementById('eventTitle'),eventText:document.getElementById('eventText'),sourceNote:document.getElementById('sourceNote'),answerArea:document.getElementById('answerArea'),eventResult:document.getElementById('eventResult'),continueBtn:document.getElementById('continueBtn'),winnerModal:document.getElementById('winnerModal'),winnerTitle:document.getElementById('winnerTitle'),winnerText:document.getElementById('winnerText'),finalRanking:document.getElementById('finalRanking'),playAgainBtn:document.getElementById('playAgainBtn'),toast:document.getElementById('toast')});
  bind();renderPlayerInputs(2);buildMap();
});

function bind(){
  els.playerCount.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{const count=Number(btn.dataset.count);state.playerCount=count;els.playerCount.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b===btn));renderPlayerInputs(count)}));
  els.startBtn.addEventListener('click',startGame);
  els.quickDemoBtn.addEventListener('click',()=>[...els.playerInputs.querySelectorAll('input')].forEach((input,i)=>input.value=DEMO_NAMES[i]||`Jogador ${i+1}`));
  els.rollBtn.addEventListener('click',rollDice);els.newGameBtn.addEventListener('click',resetToSetup);els.playAgainBtn.addEventListener('click',resetToSetup);
  els.soundBtn.addEventListener('click',()=>{state.sound=!state.sound;els.soundBtn.textContent=state.sound?'🔊':'🔇';if(state.sound)celebrateTone()});
  els.fullscreenBtn.addEventListener('click',()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.()});
}

function renderPlayerInputs(count){const previous=[...els.playerInputs.querySelectorAll('input')].map(i=>i.value);els.playerInputs.innerHTML='';for(let i=0;i<count;i++){const row=document.createElement('label');row.className='player-input-row';row.innerHTML=`<span class="player-swatch" style="background:${COLORS[i]}">P${i+1}</span><input maxlength="18" placeholder="Nome do jogador ${i+1}" value="${escapeHtml(previous[i]||'')}" />`;els.playerInputs.appendChild(row)}}

function startGame(){
  const names=[...els.playerInputs.querySelectorAll('input')].map((input,i)=>input.value.trim()||`Jogador ${i+1}`);
  if(new Set(names.map(n=>n.toLowerCase())).size!==names.length){showToast('Use nomes diferentes para os jogadores.');return}
  state.players=names.map((name,i)=>({id:i,name,color:COLORS[i],level:0,position:0,points:0,skip:0,finished:false,levelsWon:0}));
  state.current=0;state.round=1;state.awaiting=false;state.rolling=false;state.finishedOrder=[];state.usedQuiz=new Set();
  els.gameLog.innerHTML='';log(`<b>Partida iniciada.</b> ${names.map(escapeHtml).join(', ')} entram no nível M.`);
  els.setupScreen.classList.add('hidden');els.gameScreen.classList.remove('hidden');updateAll();celebrateTone();setTimeout(()=>els.gameScreen.scrollIntoView({behavior:'smooth'}),60);
}

function buildMap(){
  els.mplaMap.innerHTML='';
  LEVELS.forEach((level,levelIndex)=>{
    const card=document.createElement('section');card.className='level-card';card.dataset.level=levelIndex;
    const label=document.createElement('div');label.className='level-label';label.innerHTML=`<b>${level.key}</b><small>NÍVEL ${levelIndex+1}</small><em></em>`;
    const svg=document.createElementNS(SVG_NS,'svg');svg.setAttribute('viewBox','0 0 490 195');svg.setAttribute('preserveAspectRatio','xMidYMid meet');
    const path=document.createElementNS(SVG_NS,'path');path.setAttribute('d',level.path);path.setAttribute('class','level-path');svg.appendChild(path);
    card.append(label,svg);els.mplaMap.appendChild(card);
    requestAnimationFrame(()=>drawNodes(svg,path,levelIndex));
  });
}

function drawNodes(svg,path,levelIndex){
  [...svg.querySelectorAll('.node,.node-label,.player-token-svg,.token-text')].forEach(n=>n.remove());
  const total=path.getTotalLength();const level=LEVELS[levelIndex];
  for(let i=0;i<level.nodes;i++){
    const point=path.getPointAtLength(total*(i/(level.nodes-1)));const type=cellType(levelIndex,i);
    const circle=document.createElementNS(SVG_NS,'circle');circle.setAttribute('cx',point.x);circle.setAttribute('cy',point.y);circle.setAttribute('r','11');circle.setAttribute('class',`node ${type}`);circle.dataset.pos=i;svg.appendChild(circle);
    const text=document.createElementNS(SVG_NS,'text');text.setAttribute('x',point.x);text.setAttribute('y',point.y+.5);text.setAttribute('class','node-label');text.textContent=type==='quiz'?'?':type==='challenge'?'⚡':type==='bonus'?'★':type==='penalty'?'!':type==='event'?'◆':type==='finish'?'✓':type==='start'?'▶':i;svg.appendChild(text);
  }
  renderTokens();
}

function cellType(levelIndex,pos){return (PATTERNS[levelIndex]||[])[pos]||'normal'}

function rollDice(){
  if(state.rolling||state.awaiting)return;const p=currentPlayer();if(!p||p.finished){advanceTurn();return}
  if(p.skip>0){p.skip--;log(`<b>${escapeHtml(p.name)}</b> perde esta ronda devido a uma sanção.`);showToast(`${p.name} fica uma ronda sem jogar.`);tone(180,.18,.2);advanceTurn();return}
  state.rolling=true;els.rollBtn.disabled=true;els.dice.classList.add('rolling');let ticks=0;
  const spin=setInterval(()=>{els.dice.textContent=FACES[Math.floor(Math.random()*6)];if(++ticks>=9){clearInterval(spin);const value=Math.floor(Math.random()*6)+1;els.dice.textContent=FACES[value-1];els.dice.classList.remove('rolling');tone(760,.09,.22);movePlayer(p,value)}},65)
}

function movePlayer(p,value){
  const level=LEVELS[p.level],last=level.nodes-1,from=p.position;
  if(from+value>=last){p.position=last;log(`<b>${escapeHtml(p.name)}</b> lançou ${value} e alcançou o fim do nível ${level.key}.`);animateTokenMove(p,p.level,from,last,()=>{state.rolling=false;completeLevel(p)})}
  else{p.position=from+value;log(`<b>${escapeHtml(p.name)}</b> lançou ${value} e avançou no nível ${level.key}: ${from} → ${p.position}.`);animateTokenMove(p,p.level,from,p.position,()=>{state.rolling=false;resolveCell(p)})}
}

function animateTokenMove(p,levelIndex,from,to,done){let step=from;const timer=setInterval(()=>{if(step===to){clearInterval(timer);renderTokens();done();return}step++;const original=p.position;p.position=step;renderTokens();p.position=original;tone(390+step*18,.025,.06)},88)}

function completeLevel(p){
  const level=LEVELS[p.level];p.points+=120;p.levelsWon++;celebrateTone();
  log(`<b>${escapeHtml(p.name)}</b> conquistou o nível ${level.key} e recebeu +120 pontos.`);
  if(p.level===LEVELS.length-1){finishPlayer(p);return}
  state.awaiting=true;openEvent('NÍVEL CONCLUÍDO','🏅',`Vitória no nível ${level.key}`,`${p.name} completou o circuito ${level.key}. O próximo percurso é ${LEVELS[p.level+1].key}.`,'Percurso simbólico da demo MPLA');result('+120 pontos · novo nível desbloqueado',true);revealContinue();
  els.continueBtn.onclick=()=>{p.level++;p.position=0;closeEvent();updateAll();advanceTurn()};
}

function resolveCell(p){const type=cellType(p.level,p.position);if(type==='normal'||type==='start'){showToast(`${p.name}: casa neutra no nível ${LEVELS[p.level].key}.`);advanceTurn();return}if(type==='quiz')return showQuiz(p);if(type==='challenge')return showChallenge(p);if(type==='bonus')return showAutoEvent(p,'BÓNUS','★',randomOf(BONUSES),'bonus');if(type==='penalty')return showAutoEvent(p,'SANÇÃO','!',randomOf(PENALTIES),'penalty');if(type==='event')return showAutoEvent(p,'EVENTO','◆',randomOf(EVENTS),'event')}

function chooseQuiz(levelIndex){
  const pool=QUIZZES.map((q,i)=>({...q,_i:i})).filter(q=>q.level===levelIndex);
  let available=pool.filter(q=>!state.usedQuiz.has(q._i));if(!available.length){pool.forEach(q=>state.usedQuiz.delete(q._i));available=pool}
  const q=randomOf(available);state.usedQuiz.add(q._i);return q;
}

function showQuiz(p){
  state.awaiting=true;const q=chooseQuiz(p.level);openEvent('QUIZ','?',q.title,q.question,q.source);els.answerArea.className='answer-area';
  q.options.forEach((opt,i)=>{const btn=document.createElement('button');btn.className='answer-btn';btn.textContent=opt;btn.addEventListener('click',()=>{if(els.answerArea.dataset.locked==='1')return;els.answerArea.dataset.locked='1';[...els.answerArea.children].forEach((b,j)=>{if(j===q.answer)b.classList.add('correct');else if(j===i)b.classList.add('wrong');b.disabled=true});if(i===q.answer){p.points+=60;result(`Resposta correta. ${q.note} +60 pontos.`,true);log(`<b>${escapeHtml(p.name)}</b> acertou o quiz “${escapeHtml(q.title)}” e ganhou 60 pontos.`);successTone()}else{result(`Resposta incorreta. ${q.note}`,false);log(`<b>${escapeHtml(p.name)}</b> falhou o quiz “${escapeHtml(q.title)}”.`);tone(190,.18,.22)}updateScores();els.continueBtn.classList.remove('hidden');els.continueBtn.onclick=()=>{closeEvent();advanceTurn()}});els.answerArea.appendChild(btn)})
}

function showChallenge(p){state.awaiting=true;const c=randomOf(CHALLENGES);openEvent('DESAFIO','⚡',c.title,c.text,'Desafio demonstrativo · validação pelo grupo');els.answerArea.className='answer-area one-column';const done=actionButton('Cumpri o desafio',()=>{p.points+=c.success;result(`Desafio cumprido: +${c.success} pontos.`,true);log(`<b>${escapeHtml(p.name)}</b> cumpriu o desafio e ganhou ${c.success} pontos.`);updateScores();lockAnswers();successTone();revealContinue()});const pass=actionButton('Passar o desafio',()=>{p.points=Math.max(0,p.points+c.skip);result(`Desafio passado: ${c.skip} pontos.`,false);log(`<b>${escapeHtml(p.name)}</b> passou o desafio (${c.skip} pontos).`);updateScores();lockAnswers();tone(210,.15,.2);revealContinue()});els.answerArea.append(done,pass);els.continueBtn.onclick=()=>{closeEvent();advanceTurn()}}

function showAutoEvent(p,kind,badge,item,type){state.awaiting=true;openEvent(kind,badge,item.title,item.text,'Mecânica demonstrativa');applyEffect(p,item,type);els.answerArea.className='answer-area one-column';els.answerArea.innerHTML='';result(effectSummary(item,type),type!=='penalty');revealContinue()}

function applyEffect(p,item,type){
  if(item.allPoints){state.players.forEach(pl=>pl.points+=item.allPoints);log(`<b>Evento coletivo:</b> todos ganharam ${item.allPoints} pontos.`)}
  else{if(item.points)p.points=Math.max(0,p.points+item.points);if(item.skip)p.skip+=item.skip;if(item.move)moveWithinLevel(p,item.move);log(`<b>${escapeHtml(p.name)}</b> ativou: ${escapeHtml(item.title)}.`)}
  updateAll();if(type==='penalty')tone(170,.16,.22);else if(type==='bonus')successTone();else tone(620,.11,.16);
  const last=LEVELS[p.level].nodes-1;if(p.position>=last&&!p.finished)els.continueBtn.onclick=()=>{closeEvent();completeLevel(p)};else els.continueBtn.onclick=()=>{closeEvent();advanceTurn()}
}

function moveWithinLevel(p,delta){const last=LEVELS[p.level].nodes-1;const old=p.position;p.position=Math.max(0,Math.min(last,p.position+delta));log(`<b>${escapeHtml(p.name)}</b> teve movimento adicional no nível ${LEVELS[p.level].key}: ${old} → ${p.position}.`)}
function effectSummary(item,type){if(item.allPoints)return `Todos recebem +${item.allPoints} pontos.`;const parts=[];if(item.points)parts.push(`${item.points>0?'+':''}${item.points} pontos`);if(item.move)parts.push(`${item.move>0?'avança':'recua'} ${Math.abs(item.move)} ${Math.abs(item.move)===1?'casa':'casas'}`);if(item.skip)parts.push(`fica ${item.skip} ronda sem jogar`);return(type==='penalty'?'Consequência: ':'Efeito: ')+(parts.join(' · ')||'evento concluído')}

function finishPlayer(p){if(!p.finished){p.finished=true;p.points+=300;state.finishedOrder.push(p.id);log(`<b>${escapeHtml(p.name)}</b> concluiu M → P → L → A → ★ e recebeu +300 pontos.`);showToast(`${p.name} conquistou a estrela!`);victoryFanfare()}updateAll();setTimeout(showWinner,700)}
function advanceTurn(){state.awaiting=false;els.rollBtn.disabled=false;let attempts=0;do{state.current=(state.current+1)%state.players.length;if(state.current===0)state.round++;attempts++}while(state.players[state.current]?.finished&&attempts<=state.players.length);updateAll()}
function currentPlayer(){return state.players[state.current]}

function updateAll(){updateTurn();updateScores();renderTokens();markLevels();els.playersAlive.textContent=`${state.players.filter(p=>!p.finished).length}/${state.players.length}`}
function updateTurn(){const p=currentPlayer();if(!p)return;els.roundLabel.textContent=`Ronda ${state.round}`;els.turnName.textContent=p.name;els.turnToken.style.background=p.color;els.turnLevel.textContent=p.finished?'Concluído':`Nível ${LEVELS[p.level].key} · ${LEVELS[p.level].name}`;els.centerMessage.textContent=p.finished?'Percurso concluído':`${LEVELS[p.level].key} · ${LEVELS[p.level].name}`;els.turnHint.textContent=p.skip>0?'Sanção ativa: perderá a próxima ronda.':`Casa ${p.position+1} de ${LEVELS[p.level].nodes} no nível ${LEVELS[p.level].key}.`}
function updateScores(){const sorted=[...state.players].sort((a,b)=>b.levelsWon-a.levelsWon||b.level-a.level||b.position-a.position||b.points-a.points);els.scoreList.innerHTML='';sorted.forEach((p,i)=>{const row=document.createElement('div');row.className='score-row';row.innerHTML=`<span class="score-avatar" style="background:${p.color}">${initials(p.name)}</span><span class="score-copy"><b>${i+1}. ${escapeHtml(p.name)}</b><small>${p.finished?'Percurso concluído':`Nível ${LEVELS[p.level].key} · casa ${p.position+1}`}${p.skip>0?' · ⏸ sanção':''}</small></span><span class="score-points"><b>${p.points}</b><small>pontos</small></span>`;els.scoreList.appendChild(row)})}

function markLevels(){document.querySelectorAll('.level-card').forEach((card,i)=>{const active=state.players.some(p=>!p.finished&&p.level===i);const completed=state.players.length>0&&state.players.every(p=>p.finished||p.level>i);card.classList.toggle('active',active);card.classList.toggle('completed',completed);const em=card.querySelector('.level-label em');if(em)em.textContent=completed?'CONCLUÍDO':active?'EM JOGO':''})}

function renderTokens(){
  document.querySelectorAll('.level-card svg').forEach(svg=>[...svg.querySelectorAll('.player-token-svg,.token-text')].forEach(n=>n.remove()));
  state.players.forEach((p,playerIndex)=>{if(p.finished)return;const card=document.querySelector(`.level-card[data-level="${p.level}"]`);if(!card)return;const svg=card.querySelector('svg');const path=svg.querySelector('.level-path');if(!path)return;const level=LEVELS[p.level];const total=path.getTotalLength();const pt=path.getPointAtLength(total*(p.position/(level.nodes-1)));const offsets=[[-8,-8],[8,-8],[-8,8],[8,8]][playerIndex]||[0,0];const circle=document.createElementNS(SVG_NS,'circle');circle.setAttribute('cx',pt.x+offsets[0]);circle.setAttribute('cy',pt.y+offsets[1]);circle.setAttribute('r','8.5');circle.setAttribute('fill',p.color);circle.setAttribute('class','player-token-svg');svg.appendChild(circle);const text=document.createElementNS(SVG_NS,'text');text.setAttribute('x',pt.x+offsets[0]);text.setAttribute('y',pt.y+offsets[1]+.5);text.setAttribute('class','token-text');text.textContent=playerIndex+1;svg.appendChild(text)})
}

function openEvent(kind,badge,title,text,source=''){els.eventKind.textContent=kind;els.eventBadge.textContent=badge;els.eventTitle.textContent=title;els.eventText.textContent=text;els.answerArea.innerHTML='';els.answerArea.dataset.locked='0';els.eventResult.className='event-result hidden';els.eventResult.textContent='';els.continueBtn.classList.add('hidden');els.sourceNote.textContent=source?`Fonte/nota: ${source}`:'';els.sourceNote.classList.toggle('hidden',!source);els.eventModal.classList.remove('hidden')}
function closeEvent(){els.eventModal.classList.add('hidden');els.answerArea.dataset.locked='0'}
function result(text,good){els.eventResult.textContent=text;els.eventResult.className=`event-result ${good?'good':'bad'}`}
function revealContinue(){els.continueBtn.classList.remove('hidden')}
function lockAnswers(){els.answerArea.dataset.locked='1';[...els.answerArea.querySelectorAll('button')].forEach(b=>b.disabled=true)}
function actionButton(text,fn){const b=document.createElement('button');b.className='answer-btn';b.textContent=text;b.addEventListener('click',fn);return b}
function showWinner(){const ranked=[...state.players].sort((a,b)=>Number(b.finished)-Number(a.finished)||b.levelsWon-a.levelsWon||b.level-a.level||b.position-a.position||b.points-a.points);const winner=ranked[0];els.winnerTitle.textContent=`${winner.name} conquista a Gincana!`;els.winnerText.textContent='O percurso demonstrativo M → P → L → A → ★ foi concluído. A classificação considera progresso e pontuação.';els.finalRanking.innerHTML='';ranked.forEach((p,i)=>{const row=document.createElement('div');row.className='final-row';row.innerHTML=`<b>${i+1}º</b><span>${escapeHtml(p.name)} · ${p.finished?'★ concluída':`nível ${LEVELS[p.level].key}`}</span><b>${p.points} pts</b>`;els.finalRanking.appendChild(row)});els.winnerModal.classList.remove('hidden')}
function resetToSetup(){els.winnerModal.classList.add('hidden');els.eventModal.classList.add('hidden');els.gameScreen.classList.add('hidden');els.setupScreen.classList.remove('hidden');state.players=[];state.finishedOrder=[];state.current=0;state.round=1;state.awaiting=false;state.rolling=false;state.usedQuiz=new Set();buildMap();window.scrollTo({top:0,behavior:'smooth'})}
function log(html){const d=document.createElement('div');d.className='log-entry';d.innerHTML=html;els.gameLog.prepend(d);while(els.gameLog.children.length>18)els.gameLog.lastElementChild.remove()}
function showToast(text){els.toast.textContent=text;els.toast.classList.add('show');setTimeout(()=>els.toast.classList.remove('show'),2300)}
function randomOf(arr){return arr[Math.floor(Math.random()*arr.length)]}
function initials(name){return name.split(/\s+/).slice(0,2).map(s=>s[0]||'').join('').toUpperCase()}
function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]))}

function audio(){if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();return audioCtx}
function tone(freq,duration=.08,volume=.16,type='sine'){if(!state.sound)return;try{const ctx=audio();const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(0.0001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(Math.max(.001,volume),ctx.currentTime+.008);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+duration);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+duration+.02)}catch(e){}}
function successTone(){tone(660,.11,.2,'triangle');setTimeout(()=>tone(880,.13,.19,'triangle'),75)}
function celebrateTone(){tone(520,.12,.19,'triangle');setTimeout(()=>tone(660,.13,.2,'triangle'),85);setTimeout(()=>tone(820,.14,.21,'triangle'),170)}
function victoryFanfare(){celebrateTone();setTimeout(()=>tone(1040,.25,.23,'triangle'),260)}