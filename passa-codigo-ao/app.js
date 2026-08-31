(() => {
  "use strict";
  const QUESTIONS = window.PASSA_CODIGO_QUESTIONS || [];
  const ACCESS_HASHES = window.PASSA_CODIGO_ACCESS_HASHES || new Set();
  const DEMO_IDS = [1,5,9,12,17,21,25,34,38,44];
  const STORAGE_UNLOCK = "passaCodigoAO.unlocked.v1";
  const STORAGE_HISTORY = "passaCodigoAO.history.v1";
  const WHATSAPP = "244944819923";
  const PRICE = "2 500 Kz";

  const $ = (id) => document.getElementById(id);
  const els = {
    welcome: $("welcomePanel"), quiz: $("quizPanel"), result: $("resultPanel"),
    modeBadge: $("modeBadge"), progressText: $("progressText"), timer: $("timer"),
    progressBar: $("progressBar"), category: $("category"), scoreLive: $("scoreLive"),
    question: $("questionText"), options: $("options"), feedback: $("feedback"),
    next: $("nextQuestion"), resultScore: $("resultScore"), resultTitle: $("resultTitle"),
    resultMessage: $("resultMessage"), resultBreakdown: $("resultBreakdown"),
    fullAccess: $("fullAccess"), categories: $("categoryButtons"), history: $("historyList"),
    dialog: $("unlockDialog"), code: $("accessCode"), error: $("unlockError")
  };

  let session = null;
  let timerId = null;

  function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function isUnlocked() {
    return localStorage.getItem(STORAGE_UNLOCK) === "yes";
  }

  function whatsappUrl(context) {
    const params = new URLSearchParams(location.search);
    const campaign = params.get("utm_campaign");
    const source = params.get("utm_source");
    let text = `Olá. Quero comprar o acesso completo ao Passa Código AO por ${PRICE}.`;
    if (context === "help") text = "Olá. Preciso de ajuda para obter um código do Passa Código AO.";
    if (source || campaign) text += ` Origem: ${source || "direto"}${campaign ? ` / ${campaign}` : ""}.`;
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  }

  function configureLinks() {
    $("buyWhatsapp").href = whatsappUrl("buy");
    $("unlockWhatsapp").href = whatsappUrl("help");
    $("year").textContent = new Date().getFullYear();
  }

  function getDemoQuestions() {
    return DEMO_IDS.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean);
  }

  function startSession(items, mode, minutes = null) {
    clearInterval(timerId);
    session = {
      items: shuffle(items),
      mode,
      index: 0,
      correct: 0,
      answered: false,
      answers: [],
      secondsLeft: minutes ? minutes * 60 : null
    };
    els.welcome.classList.add("hidden");
    els.result.classList.add("hidden");
    els.quiz.classList.remove("hidden");
    els.modeBadge.textContent = mode === "full" ? "SIMULADO" : mode === "demo" ? "DEMO" : "TREINO";
    els.modeBadge.classList.toggle("full", mode !== "demo");
    if (session.secondsLeft !== null) startTimer();
    else els.timer.textContent = "sem limite";
    renderQuestion();
    els.quiz.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function startTimer() {
    updateTimer();
    timerId = setInterval(() => {
      session.secondsLeft -= 1;
      updateTimer();
      if (session.secondsLeft <= 0) {
        clearInterval(timerId);
        finishSession(true);
      }
    }, 1000);
  }

  function updateTimer() {
    const min = Math.floor(session.secondsLeft / 60).toString().padStart(2,"0");
    const sec = (session.secondsLeft % 60).toString().padStart(2,"0");
    els.timer.textContent = `${min}:${sec}`;
    els.timer.classList.toggle("warning", session.secondsLeft <= 300);
  }

  function renderQuestion() {
    session.answered = false;
    const q = session.items[session.index];
    els.progressText.textContent = `Pergunta ${session.index + 1} de ${session.items.length}`;
    els.progressBar.style.width = `${((session.index + 1) / session.items.length) * 100}%`;
    els.category.textContent = q.category;
    els.scoreLive.textContent = `${session.correct} certas`;
    els.question.textContent = q.question;
    els.feedback.className = "feedback hidden";
    els.feedback.innerHTML = "";
    els.next.classList.add("hidden");
    els.options.innerHTML = "";
    const letters = ["A","B","C","D"];
    q.options.forEach((option, idx) => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.innerHTML = `<b>${letters[idx]}</b><span></span>`;
      btn.querySelector("span").textContent = option;
      btn.addEventListener("click", () => answerQuestion(idx));
      els.options.appendChild(btn);
    });
  }

  function answerQuestion(selected) {
    if (session.answered) return;
    session.answered = true;
    const q = session.items[session.index];
    const correct = selected === q.answer;
    if (correct) session.correct += 1;
    session.answers.push({id:q.id, selected, correct, category:q.category});
    [...els.options.children].forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answer) btn.classList.add("correct");
      if (idx === selected && !correct) btn.classList.add("wrong");
    });
    els.feedback.className = `feedback${correct ? "" : " wrong"}`;
    const label = correct ? "Resposta certa." : "Resposta incorreta.";
    els.feedback.innerHTML = `<strong>${label}</strong><span></span><small></small>`;
    els.feedback.querySelector("span").textContent = q.explanation;
    els.feedback.querySelector("small").textContent = `Referência: ${q.source}`;
    els.scoreLive.textContent = `${session.correct} certas`;
    els.next.textContent = session.index === session.items.length - 1 ? "Ver resultado" : "Próxima";
    els.next.classList.remove("hidden");
  }

  function nextQuestion() {
    if (!session || !session.answered) return;
    if (session.index >= session.items.length - 1) finishSession(false);
    else {
      session.index += 1;
      renderQuestion();
    }
  }

  function finishSession(timeout) {
    clearInterval(timerId);
    if (!session) return;
    const total = session.items.length;
    const unanswered = total - session.answers.length;
    const pct = Math.round((session.correct / total) * 100);
    els.quiz.classList.add("hidden");
    els.result.classList.remove("hidden");
    els.resultScore.textContent = `${session.correct}/${total}`;
    els.resultRing.style.background = `conic-gradient(var(--accent) 0 ${pct}%, #e2e8f0 ${pct}% 100%)`;

    if (session.mode === "full") {
      const passed = session.correct >= 27;
      els.resultTitle.textContent = passed ? "Meta atingida." : "Ainda não chegou aos 27.";
      els.resultMessage.textContent = timeout
        ? `O tempo terminou. Fez ${session.correct} respostas corretas e deixou ${unanswered} sem resposta.`
        : passed
          ? "Neste simulado atingiu a referência regulamentar de 27 respostas corretas."
          : `Faltaram ${Math.max(0, 27 - session.correct)} respostas corretas para atingir a meta de 27.`;
      saveHistory(session.correct, total, passed);
    } else if (session.mode === "demo") {
      els.resultTitle.textContent = pct >= 80 ? "Bom começo." : "Já encontrou pontos para rever.";
      els.resultMessage.textContent = `Acertou ${session.correct} de ${total}. No acesso completo, o desafio passa para 30 perguntas em 30 minutos.`;
    } else {
      els.resultTitle.textContent = `${pct}% nesta categoria.`;
      els.resultMessage.textContent = `Acertou ${session.correct} de ${total} perguntas neste treino.`;
    }

    const byCat = {};
    session.answers.forEach(a => {
      byCat[a.category] ||= {correct:0,total:0};
      byCat[a.category].total += 1;
      if (a.correct) byCat[a.category].correct += 1;
    });
    els.resultBreakdown.innerHTML = "";
    Object.entries(byCat).forEach(([cat, data]) => {
      const row = document.createElement("div");
      row.className = "breakdown-item";
      row.innerHTML = `<span></span><strong>${data.correct}/${data.total}</strong>`;
      row.querySelector("span").textContent = cat;
      els.resultBreakdown.appendChild(row);
    });
    $("openPremiumFromResult").textContent = isUnlocked() ? "Voltar à área de treino" : "Desbloquear simulados completos";
    els.result.scrollIntoView({behavior:"smooth",block:"center"});
    renderHistory();
  }

  function saveHistory(correct, total, passed) {
    const history = getHistory();
    history.unshift({date:new Date().toISOString(),correct,total,passed});
    localStorage.setItem(STORAGE_HISTORY, JSON.stringify(history.slice(0,8)));
  }
  function getHistory() {
    try { return JSON.parse(localStorage.getItem(STORAGE_HISTORY) || "[]"); }
    catch { return []; }
  }
  function renderHistory() {
    const history = getHistory();
    if (!history.length) {
      els.history.innerHTML = '<p class="muted">Ainda sem simulados completos.</p>';
      return;
    }
    els.history.innerHTML = "";
    history.forEach(item => {
      const d = new Date(item.date);
      const row = document.createElement("div");
      row.className = "history-item";
      row.innerHTML = `<span>${d.toLocaleDateString("pt-AO")}</span><strong class="${item.passed ? "pass":"fail"}">${item.correct}/${item.total}</strong>`;
      els.history.appendChild(row);
    });
  }

  function renderCategories() {
    const grouped = QUESTIONS.reduce((acc,q) => {
      (acc[q.category] ||= []).push(q); return acc;
    },{});
    els.categories.innerHTML = "";
    Object.entries(grouped)
      .filter(([name, items]) => name !== "Formato do exame" && items.length >= 2)
      .sort((a,b) => a[0].localeCompare(b[0],"pt"))
      .forEach(([name, items]) => {
        const btn = document.createElement("button");
        btn.className = "category-btn";
        btn.innerHTML = `<strong></strong><span>${items.length} perguntas</span>`;
        btn.querySelector("strong").textContent = name;
        btn.addEventListener("click", () => startSession(items,"category",null));
        els.categories.appendChild(btn);
      });
  }

  function showUnlockedArea(scroll = false) {
    if (!isUnlocked()) return;
    els.fullAccess.classList.remove("hidden");
    renderCategories();
    renderHistory();
    if (scroll) els.fullAccess.scrollIntoView({behavior:"smooth",block:"start"});
  }

  async function sha256(text) {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2,"0")).join("");
  }

  async function unlock(event) {
    event.preventDefault();
    const normalized = els.code.value.trim().toUpperCase();
    els.error.classList.add("hidden");
    $("unlockButton").disabled = true;
    $("unlockButton").textContent = "A verificar…";
    try {
      const hash = await sha256(normalized);
      if (!ACCESS_HASHES.has(hash)) throw new Error("invalid");
      localStorage.setItem(STORAGE_UNLOCK,"yes");
      els.dialog.close();
      showUnlockedArea(true);
    } catch {
      els.error.classList.remove("hidden");
    } finally {
      $("unlockButton").disabled = false;
      $("unlockButton").textContent = "Desbloquear";
    }
  }

  function openUnlock() {
    if (isUnlocked()) return showUnlockedArea(true);
    els.code.value = "";
    els.error.classList.add("hidden");
    els.dialog.showModal();
    setTimeout(() => els.code.focus(),100);
  }

  function fullExam() {
    if (!isUnlocked()) return openUnlock();
    startSession(shuffle(QUESTIONS).slice(0,30),"full",30);
  }

  function quitQuiz() {
    clearInterval(timerId);
    session = null;
    els.quiz.classList.add("hidden");
    els.result.classList.add("hidden");
    els.welcome.classList.remove("hidden");
    $("treinar").scrollIntoView({behavior:"smooth"});
  }

  $("startDemo").addEventListener("click", () => startSession(getDemoQuestions(),"demo",null));
  $("startDemoTop").addEventListener("click", () => startSession(getDemoQuestions(),"demo",null));
  $("nextQuestion").addEventListener("click", nextQuestion);
  $("quitQuiz").addEventListener("click", quitQuiz);
  $("retryQuiz").addEventListener("click", () => {
    if (session?.mode === "full") fullExam();
    else if (session?.mode === "category") startSession(session.items, "category", null);
    else startSession(getDemoQuestions(),"demo",null);
  });
  $("openPremiumFromResult").addEventListener("click", () => isUnlocked() ? showUnlockedArea(true) : $("premium").scrollIntoView({behavior:"smooth"}));
  $("haveCode").addEventListener("click", openUnlock);
  $("unlockForm").addEventListener("submit", unlock);
  $("startFullExam").addEventListener("click", fullExam);
  els.code.addEventListener("input", () => {
    let v = els.code.value.toUpperCase().replace(/[^A-Z0-9]/g,"");
    if (v.startsWith("PCAO")) v = v.slice(4);
    const groups = v.slice(0,12).match(/.{1,4}/g) || [];
    els.code.value = "PCAO-" + groups.join("-");
    if (v.length === 0) els.code.value = "";
  });

  configureLinks();
  showUnlockedArea(false);
})();
