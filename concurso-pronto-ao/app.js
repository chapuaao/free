(() => {
  "use strict";

  const WHATSAPP = "244944819923";
  const PRICE = "75 000 Kz";
  const WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const $ = (id) => document.getElementById(id);

  const els = {
    file: $("tenderFile"), text: $("tenderText"), dropzone: $("dropzone"),
    analyse: $("analyseButton"), loadSample: $("loadSample"), loadSampleTop: $("loadSampleTop"),
    loading: $("loadingPanel"), loadingText: $("loadingText"), error: $("errorPanel"),
    results: $("resultsSection"), title: $("resultTitle"), subtitle: $("resultSubtitle"), ref: $("analysisRef"),
    metricType: $("metricType"), metricRequirements: $("metricRequirements"), metricDates: $("metricDates"), metricAmounts: $("metricAmounts"),
    requirements: $("requirementsList"), dates: $("datesList"), amounts: $("amountsList"), excerpts: $("criticalExcerpts"),
    scoreRing: $("scoreRing"), scoreValue: $("scoreValue"), scoreTitle: $("scoreTitle"), scoreMessage: $("scoreMessage"), riskSummary: $("riskSummary"),
    print: $("printReport"), copy: $("copySummary"), buy: $("buyWhatsapp")
  };

  const REQUIREMENTS = [
    {id:"identity", label:"Identificação fiscal / NIF", terms:[/\bnif\b/i,/identifica(?:ção|cao) fiscal/i,/contribuinte/i]},
    {id:"commercial", label:"Registo ou certidão comercial", terms:[/certid[aã]o comercial/i,/registo comercial/i,/conservat[oó]ria/i,/matr[ií]cula comercial/i]},
    {id:"tax", label:"Regularidade tributária / AGT", terms:[/regularidade tribut[aá]ria/i,/situa(?:ção|cao) tribut[aá]ria/i,/certid[aã]o.*tribut/i,/administra(?:ção|cao) geral tribut[aá]ria/i,/\bagt\b/i]},
    {id:"inss", label:"Regularidade perante o INSS", terms:[/\binss\b/i,/seguran(?:ça|ca) social/i,/regularidade.*social/i]},
    {id:"license", label:"Alvará, licença ou autorização sectorial", terms:[/alvar[aá]/i,/licen[çc]a/i,/autoriza(?:ção|cao).*actividade/i,/habilita.*actividade/i]},
    {id:"experience", label:"Experiência, referências ou contratos anteriores", terms:[/experi[eê]ncia/i,/refer[eê]ncias/i,/contratos? anteriores/i,/servi[çc]os similares/i,/fornecimentos? similares/i]},
    {id:"team", label:"Equipa, currículos ou qualificações", terms:[/curr[ií]cul/i,/\bcv\b/i,/equipa t[eé]cnica/i,/qualifica(?:ção|cao)/i,/t[eé]cnicos? propostos/i]},
    {id:"financialCapacity", label:"Capacidade financeira / demonstrações", terms:[/capacidade financeira/i,/demonstra(?:ções|coes) financeiras/i,/balan[çc]o/i,/volume de neg[oó]cios/i,/declara(?:ção|cao) banc[aá]ria/i]},
    {id:"guarantee", label:"Caução, garantia bancária ou seguro-caução", terms:[/cau[çc][aã]o/i,/garantia banc[aá]ria/i,/seguro[- ]cau[çc][aã]o/i,/garantia provis[oó]ria/i,/garantia definitiva/i]},
    {id:"technical", label:"Proposta técnica / metodologia", terms:[/proposta t[eé]cnica/i,/metodologia/i,/mem[oó]ria descritiva/i,/plano de trabalhos/i,/abordagem t[eé]cnica/i]},
    {id:"financial", label:"Proposta financeira / preço", terms:[/proposta financeira/i,/pre[çc]o inicial/i,/pre[çc]o global/i,/mapa de pre[çc]os/i,/or[çc]amento/i,/pre[çc]os? unit[aá]rios/i]},
    {id:"deadline", label:"Prazo ou data limite de submissão", terms:[/data limite/i,/prazo.*propost/i,/apresenta(?:ção|cao).*propost/i,/submiss[aã]o.*propost/i,/dias para apresenta(?:ção|cao)/i]},
    {id:"delivery", label:"Prazo/local de execução ou fornecimento", terms:[/prazo de execu(?:ção|cao)/i,/prazo de entrega/i,/local de execu(?:ção|cao)/i,/local do fornecimento/i,/local da presta(?:ção|cao)/i]},
    {id:"samples", label:"Amostras, fichas técnicas ou catálogos", terms:[/amostras?/i,/fichas? t[eé]cnicas?/i,/cat[aá]logos?/i,/brochuras?/i]},
    {id:"declarations", label:"Declarações, modelos ou anexos obrigatórios", terms:[/declara(?:ção|cao).*anexo/i,/modelo.*anexo/i,/anexos? obrigat[oó]rios/i,/formul[aá]rio.*proposta/i,/documentos? de habilita(?:ção|cao)/i,/documentos? de capacita(?:ção|cao)/i]},
    {id:"lots", label:"Lotes / itens de participação", terms:[/\blotes?\b/i,/itens?\/lotes?/i,/incluir itens/i]},
  ];

  const CRITICAL_TERMS = [
    {label:"Exclusão / conformidade", re:/exclu|desqualific|n[aã]o ser[aã]o admitid|desconform|sob pena/i},
    {label:"Submissão", re:/submiss|apresenta(?:ção|cao).*propost|enviar proposta|carregar documentos/i},
    {label:"Garantia / caução", re:/cau[çc][aã]o|garantia banc[aá]ria|seguro[- ]cau[çc][aã]o/i},
    {label:"Critério de adjudicação", re:/crit[eé]rio de adjudica(?:ção|cao)|pre[çc]o mais baixo|proposta economicamente/i},
    {label:"Prazo", re:/data limite|prazo|dias para apresenta(?:ção|cao)/i},
    {label:"Documentação", re:/documentos? de habilita(?:ção|cao)|documentos? de capacita(?:ção|cao)|certid[aã]o|alvar[aá]|nif|inss/i}
  ];

  const SAMPLE = `CONCURSO / PEDIDO DE PROPOSTA — EXEMPLO DEMONSTRATIVO

Objecto: aquisição e instalação de equipamentos informáticos para três unidades.
A entidade pretende receber proposta técnica e proposta financeira, com indicação de preços unitários e preço global em Kwanzas.
Os concorrentes devem apresentar NIF, certidão do registo comercial, comprovativo de regularidade tributária, comprovativo de regularidade perante o INSS e alvará compatível com a actividade.
A proposta técnica deve apresentar metodologia de instalação, prazo de entrega, equipa técnica e pelo menos duas referências de fornecimentos similares.
Devem ser anexadas fichas técnicas dos equipamentos propostos.
A entidade poderá solicitar garantia bancária ou seguro-caução ao adjudicatário.
Critério de adjudicação: melhor relação entre conformidade técnica, prazo e preço.
Data limite para apresentação das propostas: 18/09/2026.
Valor estimado do fornecimento: Kz 48 500 000,00.
Prazo máximo de execução: 30 dias após adjudicação.
Propostas que não incluam os documentos obrigatórios podem ser excluídas.
Este texto é apenas um exemplo criado para demonstrar o funcionamento da ferramenta.`;

  let state = {analysis:null, statuses:{}};

  function normalizeText(text){
    return String(text || "").replace(/\u0000/g," ").replace(/[ \t]+/g," ").replace(/\r/g,"\n").replace(/\n{3,}/g,"\n\n").trim();
  }

  function splitSentences(text){
    return text.replace(/\n+/g,"\n").split(/(?<=[.!?;:])\s+|\n+/).map(s=>s.trim()).filter(s=>s.length>18);
  }

  function escapeHtml(str){
    return String(str).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  }

  function unique(values){
    const seen = new Set();
    return values.filter(v=>{const k=v.toLowerCase().replace(/\s+/g," "); if(seen.has(k)) return false; seen.add(k); return true;});
  }

  function extractDates(text){
    const months = "janeiro|fevereiro|março|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro";
    const a = text.match(/\b(?:0?[1-9]|[12]\d|3[01])[\/\-.](?:0?[1-9]|1[0-2])[\/\-.](?:20)?\d{2}\b/g) || [];
    const b = text.match(new RegExp(`\\b(?:0?[1-9]|[12]\\d|3[01])\\s+de\\s+(?:${months})\\s+de\\s+20\\d{2}\\b`,"gi")) || [];
    return unique([...a,...b]).slice(0,12);
  }

  function extractAmounts(text){
    const patterns = [/(?:Kz|AOA)\s*[:\-]?\s*\d[\d.\s]*(?:,\d{2})?/gi,/\b\d[\d.\s]*(?:,\d{2})?\s*(?:Kz|AOA)\b/gi];
    const found = patterns.flatMap(r=>text.match(r)||[]).map(v=>v.replace(/\s+/g," ").trim()).filter(v=>/\d/.test(v));
    return unique(found).slice(0,12);
  }

  function classify(text){
    const t=text.toLowerCase();
    const scores={"Aquisição de bens":0,"Serviços":0,"Consultoria":0,"Obras":0,"RFQ / Proposta comercial":0};
    const add=(key,terms)=>terms.forEach(term=>{if(t.includes(term)) scores[key]++;});
    add("Aquisição de bens",["aquisição de","fornecimento de","equipamentos","material","bens móveis","mercadoria"]);
    add("Serviços",["prestação de serviços","serviços de","assistência técnica","manutenção","outsourcing"]);
    add("Consultoria",["consultoria","estudo técnico","assistência técnica especializada","parecer","diagnóstico"]);
    add("Obras",["empreitada","obra pública","construção","reabilitação","fiscalização de obra"]);
    add("RFQ / Proposta comercial",["rfq","request for quotation","pedido de cotação","pedido de proposta","proposta comercial"]);
    const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
    return sorted[0][1] ? sorted[0][0] : "Não determinado";
  }

  function requirementMatches(text, sentences){
    return REQUIREMENTS.map(req=>{
      const hits=sentences.filter(sentence=>req.terms.some(re=>re.test(sentence))).slice(0,2);
      return {...req, detected:hits.length>0, excerpts:hits};
    }).filter(r=>r.detected);
  }

  function criticalExcerpts(sentences){
    const out=[];
    CRITICAL_TERMS.forEach(group=>{
      const match=sentences.find(s=>group.re.test(s));
      if(match) out.push({label:group.label,text:match});
    });
    return out.slice(0,8);
  }

  function createRef(text){
    let h=2166136261;
    for(let i=0;i<Math.min(text.length,5000);i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}
    return `CP-${(h>>>0).toString(36).toUpperCase().slice(0,6).padStart(6,"0")}`;
  }

  function analyseText(raw){
    const text=normalizeText(raw);
    if(text.length<120) throw new Error("O texto é demasiado curto para um raio-X útil. Cole mais conteúdo ou carregue o documento completo.");
    const sentences=splitSentences(text);
    const requirements=requirementMatches(text,sentences);
    return {
      ref:createRef(text),
      type:classify(text),
      requirements,
      dates:extractDates(text),
      amounts:extractAmounts(text),
      excerpts:criticalExcerpts(sentences),
      chars:text.length,
      words:text.split(/\s+/).length
    };
  }

  async function readPdf(file){
    if(!window.pdfjsLib) throw new Error("O leitor de PDF não carregou. Cole o texto do documento ou tente novamente com ligação à internet.");
    window.pdfjsLib.GlobalWorkerOptions.workerSrc=WORKER;
    const buffer=await file.arrayBuffer();
    const pdf=await window.pdfjsLib.getDocument({data:buffer}).promise;
    const parts=[];
    for(let pageNo=1;pageNo<=pdf.numPages;pageNo++){
      els.loadingText.textContent=`A extrair texto da página ${pageNo} de ${pdf.numPages}.`;
      const page=await pdf.getPage(pageNo);
      const content=await page.getTextContent();
      parts.push(content.items.map(i=>i.str).join(" "));
    }
    return parts.join("\n");
  }

  async function readFile(file){
    if(!file) return "";
    if(file.type==="application/pdf" || file.name.toLowerCase().endsWith(".pdf")) return readPdf(file);
    return file.text();
  }

  function showError(message){els.error.textContent=message;els.error.classList.remove("hidden");}
  function clearError(){els.error.classList.add("hidden");els.error.textContent="";}
  function setLoading(on){els.loading.classList.toggle("hidden",!on);els.analyse.disabled=on;}

  async function runAnalysis(){
    clearError();setLoading(true);els.loadingText.textContent="A extrair o texto e a procurar requisitos.";
    try{
      let text=els.text.value.trim();
      if(els.file.files[0]) text=await readFile(els.file.files[0]);
      const analysis=analyseText(text);
      state={analysis,statuses:{}};
      analysis.requirements.forEach(r=>state.statuses[r.id]="unknown");
      renderAnalysis();
      els.results.classList.remove("hidden");
      els.results.scrollIntoView({behavior:"smooth",block:"start"});
    }catch(err){showError(err && err.message ? err.message : "Não foi possível analisar este documento.");}
    finally{setLoading(false);}
  }

  function renderAnalysis(){
    const a=state.analysis;if(!a)return;
    els.title.textContent=`${a.type} — raio-X concluído`;
    els.subtitle.textContent=`Foram lidas aproximadamente ${a.words.toLocaleString("pt-PT")} palavras. Confirme abaixo cada requisito detectado antes de preparar a proposta.`;
    els.ref.textContent=a.ref;els.metricType.textContent=a.type;els.metricRequirements.textContent=a.requirements.length;els.metricDates.textContent=a.dates.length;els.metricAmounts.textContent=a.amounts.length;
    renderRequirements();renderChips(els.dates,a.dates,"Nenhuma data explícita detectada");renderChips(els.amounts,a.amounts,"Nenhum valor explícito detectado");renderExcerpts();updateScore();configureWhatsapp();
  }

  function renderRequirements(){
    const list=state.analysis.requirements;
    if(!list.length){els.requirements.innerHTML='<div class="excerpt">Nenhum requisito padrão foi detectado automaticamente. Leia o documento manualmente antes de concluir que não existem exigências.</div>';return;}
    els.requirements.innerHTML=list.map(r=>{
      const excerpt=r.excerpts[0] ? r.excerpts[0].slice(0,220) : "Detectado por palavra-chave.";
      return `<div class="req-row"><div><strong>${escapeHtml(r.label)}</strong><small>${escapeHtml(excerpt)}</small></div><select data-req="${r.id}" class="unknown" aria-label="Situação: ${escapeHtml(r.label)}"><option value="unknown">Preciso confirmar</option><option value="yes">Tenho / cumpro</option><option value="no">Não tenho / não cumpro</option></select></div>`;
    }).join("");
    els.requirements.querySelectorAll("select").forEach(select=>select.addEventListener("change",()=>{state.statuses[select.dataset.req]=select.value;select.className=select.value;updateScore();configureWhatsapp();}));
  }

  function renderChips(container,values,empty){
    container.innerHTML=values.length?values.map(v=>`<span class="chip">${escapeHtml(v)}</span>`).join(""):`<span class="chip empty">${empty}</span>`;
  }

  function renderExcerpts(){
    const items=state.analysis.excerpts;
    els.excerpts.innerHTML=items.length?items.map(x=>`<div class="excerpt"><b>${escapeHtml(x.label)}</b>${escapeHtml(x.text.slice(0,360))}</div>`).join(""):'<div class="excerpt">Nenhum trecho crítico padrão foi isolado. Faça leitura integral do documento.</div>';
  }

  function updateScore(){
    const ids=state.analysis.requirements.map(r=>r.id);const total=ids.length||1;
    const yes=ids.filter(id=>state.statuses[id]==="yes").length;const no=ids.filter(id=>state.statuses[id]==="no").length;const unknown=ids.filter(id=>state.statuses[id]==="unknown").length;
    const score=Math.round((yes/total)*100);
    els.scoreValue.textContent=`${score}%`;els.scoreRing.style.background=`conic-gradient(var(--accent) ${score*3.6}deg,#1b3048 0deg)`;
    if(!ids.length){els.scoreTitle.textContent="Sem score automático.";els.scoreMessage.textContent="O motor não encontrou requisitos padrão suficientes.";}
    else if(no>0){els.scoreTitle.textContent="Há impedimentos declarados.";els.scoreMessage.textContent="Resolva ou esclareça os itens marcados como não cumpridos antes de investir na proposta.";}
    else if(unknown>0){els.scoreTitle.textContent="A prontidão ainda não está confirmada.";els.scoreMessage.textContent="Verifique os elementos pendentes no documento e na sua empresa.";}
    else{els.scoreTitle.textContent="Checklist declarado como coberto.";els.scoreMessage.textContent="Faça revisão manual final: o score não substitui os critérios oficiais nem mede hipótese de adjudicação.";}
    const risks=[];
    if(no) risks.push(`<div class="risk-item bad">${no} requisito(s) marcado(s) como não cumprido(s).</div>`);
    if(unknown) risks.push(`<div class="risk-item wait">${unknown} requisito(s) ainda por confirmar.</div>`);
    if(yes) risks.push(`<div class="risk-item good">${yes} requisito(s) declarados como cobertos.</div>`);
    if(!ids.length) risks.push('<div class="risk-item wait">Leitura manual obrigatória.</div>');
    els.riskSummary.innerHTML=risks.join("");
  }

  function buildSummary(){
    if(!state.analysis)return "";const a=state.analysis;
    const no=a.requirements.filter(r=>state.statuses[r.id]==="no").map(r=>r.label);
    const unknown=a.requirements.filter(r=>state.statuses[r.id]==="unknown").map(r=>r.label);
    const yes=a.requirements.filter(r=>state.statuses[r.id]==="yes").map(r=>r.label);
    return [`CONCURSO PRONTO AO — ${a.ref}`,`Tipo provável: ${a.type}`,`Requisitos detectados: ${a.requirements.length}`,`Datas: ${a.dates.join(" | ")||"não detectadas"}`,`Valores: ${a.amounts.join(" | ")||"não detectados"}`,`Confirmados: ${yes.length}`,`Não cumpridos: ${no.join("; ")||"nenhum marcado"}`,`Por confirmar: ${unknown.join("; ")||"nenhum"}`,"Nota: triagem automática; validar sempre o documento original."].join("\n");
  }

  function configureWhatsapp(){
    const params=new URLSearchParams(location.search);const source=params.get("utm_source")||"direto";const campaign=params.get("utm_campaign")||"";
    const ref=state.analysis?state.analysis.ref:"sem análise";const type=state.analysis?state.analysis.type:"não analisado";
    const text=`Olá. Quero pedir o Dossier Concurso Pronto AO por ${PRICE}. Referência: ${ref}. Tipo: ${type}. Origem: ${source}${campaign?` / ${campaign}`:""}. Posso enviar o caderno de encargos?`;
    els.buy.href=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  }

  function loadSample(){els.file.value="";els.text.value=SAMPLE;clearError();$("analisar").scrollIntoView({behavior:"smooth",block:"start"});setTimeout(runAnalysis,250);}

  async function copySummary(){
    const text=buildSummary();if(!text)return;
    try{await navigator.clipboard.writeText(text);els.copy.textContent="Resumo copiado";setTimeout(()=>els.copy.textContent="Copiar resumo",1800);}catch{showError("Não foi possível copiar automaticamente. Use Imprimir / Guardar PDF.");}
  }

  els.analyse.addEventListener("click",runAnalysis);els.loadSample.addEventListener("click",loadSample);els.loadSampleTop.addEventListener("click",loadSample);els.print.addEventListener("click",()=>window.print());els.copy.addEventListener("click",copySummary);
  els.file.addEventListener("change",()=>{if(els.file.files[0]){els.text.value="";els.dropzone.querySelector("strong").textContent=els.file.files[0].name;}});
  ["dragenter","dragover"].forEach(evt=>els.dropzone.addEventListener(evt,e=>{e.preventDefault();els.dropzone.classList.add("drag");}));
  ["dragleave","drop"].forEach(evt=>els.dropzone.addEventListener(evt,e=>{e.preventDefault();els.dropzone.classList.remove("drag");}));
  els.dropzone.addEventListener("drop",e=>{const f=e.dataTransfer.files[0];if(!f)return;const dt=new DataTransfer();dt.items.add(f);els.file.files=dt.files;els.text.value="";els.dropzone.querySelector("strong").textContent=f.name;});
  $("year").textContent=new Date().getFullYear();configureWhatsapp();
})();
