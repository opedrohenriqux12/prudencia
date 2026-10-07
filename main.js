/* =========================================================
   PRUDÊNCIA — motor da apresentação
   - Ao avançar na cena das 5 áreas, percorre área 1 -> 5 e depois passa para a próxima cena
   - Ao avançar na cena do Master, percorre Ato 1 -> 2 -> 3 e depois passa para a próxima cena
   - Removida a seção Alpha Comércio
   ========================================================= */
(() => {
  const C = window.CONTENT;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmt = n => Math.round(n).toLocaleString("pt-BR");

  const scenes = $$(".scene");
  let idx = -1, timers = [], lock = false;
  let currentAreaIdx = 0;
  let currentActIdx = 0;

  const later = (fn, ms) => timers.push(setTimeout(fn, reduce ? 0 : ms));

  /* ---------- Divide textos em caracteres/letras para efeito Typewriter suave e fluido ---------- */
  function applyTypewriter(root = document) {
    $$(".words", root).forEach(el => {
      if (el.dataset.twDone) return;
      el.dataset.twDone = "true";
      let globalCharIndex = 0;
      const walk = node => [...node.childNodes].forEach(n => {
        if (n.nodeType !== 3) return walk(n);
        const text = n.textContent;
        const frag = document.createDocumentFragment();
        const words = text.split(/(\s+)/);
        words.forEach(w => {
          if (!w.trim()) {
            frag.append(document.createTextNode(w));
            return;
          }
          const wordSpan = document.createElement("span");
          wordSpan.className = "w";
          [...w].forEach(char => {
            const charSpan = document.createElement("span");
            charSpan.className = "ch";
            charSpan.textContent = char;
            charSpan.style.setProperty("--ci", globalCharIndex++);
            wordSpan.append(charSpan);
          });
          frag.append(wordSpan);
        });
        n.replaceWith(frag);
      });
      walk(el);

      // Se for inserido dinamicamente (ex: nos atos ou áreas) enquanto a cena já está ativa (.on)
      if (el.closest(".scene.on")) {
        el.classList.add("tw-live");
        requestAnimationFrame(() => {
          $$(".ch", el).forEach(ch => {
            ch.style.animation = `typeChar 0.95s cubic-bezier(0.16, 1, 0.3, 1) both`;
            ch.style.animationDelay = `calc(${ch.style.getPropertyValue("--ci")} * 32ms + 220ms)`;
          });
        });
      }
    });
  }

  applyTypewriter(document);

  const indexScene = s => {
    $$(".gl > span", s).forEach((e, i) => e.style.setProperty("--i", i));
    $$(".a", s).forEach((e, i) => e.style.setProperty("--i", i + 1));
  };
  scenes.forEach(indexScene);

  const POSES = [
    [[55,-20,1],[-10,60,1],[40,40,1]],     // 0 hero
    [[-20,-25,.9],[70,55,1.1],[20,60,.8]],  // 1 conceito
    [[30,30,1.3],[-15,-10,.8],[75,10,1]],   // 2 gigante
    [[-25,10,1],[60,-15,1],[45,65,1.1]],    // 3 órbita (5 áreas)
    [[50,-30,1],[0,50,1.3],[70,60,.8]],     // 4 master atos (3 atos)
    [[15,35,1.1],[75,-15,1.2],[-20,10,1]],  // 5 master notícias
    [[20,40,1.1],[65,-10,1],[-10,0,1]],     // 6 fluxo
    [[-20,-20,1],[55,45,1.2],[30,10,.8]],   // 7 balão
    [[20,-20,1.1],[70,40,.9],[-10,60,1]],   // 8 dinâmica 1
    [[45,10,1],[-15,50,1.1],[60,-20,.9]],   // 9 dinâmica 2
    [[10,25,1.2],[65,65,.9],[-15,-15,1]],   // 10 gabarito
    [[25,10,1.4],[-10,-10,.8],[70,70,1]]    // 11 final
  ];
  const morphs = $$(".morph");
  const pose = i => POSES[i % POSES.length].forEach(([x, y, s], k) => {
    morphs[k].style.transform = `translate(${x}vw,${y}vh) scale(${s}) rotate(${i * 35 + k * 28}deg)`;
    morphs[k].style.borderRadius = ["50%", "42% 58% 63% 37%", "60% 40% 35% 65%"][(i + k) % 3];
  });

  /* ---------- Barra de navegação ---------- */
  const track = $(".track"), counter = $(".counter"), chapter = $(".chapter");
  scenes.forEach((s, i) => {
    const b = document.createElement("button");
    b.className = "seg"; b.setAttribute("aria-label", `Ir para cena ${i + 1}: ${s.dataset.ch}`);
    b.innerHTML = "<i></i>"; b.onclick = () => goTo(i);
    track.append(b);
  });
  const segs = $$(".seg");
  $(".next").onclick = () => advanceNext();
  $(".prev").onclick = () => retreatPrev();

  /* ---------- Navegação contextual inteligente ---------- */
  function advanceNext() {
    const s = scenes[idx];
    if (s && s.classList.contains("s-apply")) {
      if (currentAreaIdx < C.areas.length - 1) {
        showArea(currentAreaIdx + 1);
        return;
      }
    }
    if (s && s.classList.contains("s-master")) {
      if (currentActIdx < C.atos.length - 1) {
        showAct(currentActIdx + 1);
        return;
      }
    }
    if (s && s.classList.contains("s-case")) {
      const caseIdx = parseInt(s.dataset.caseIdx, 10);
      const st = caseStates[caseIdx];
      if (st && !st.gabaritoRevealed) {
        revealGabarito(caseIdx);
        return;
      }
    }
    goTo(idx + 1);
  }

  function retreatPrev() {
    const s = scenes[idx];
    if (s && s.classList.contains("s-apply")) {
      if (currentAreaIdx > 0) {
        showArea(currentAreaIdx - 1);
        return;
      }
    }
    if (s && s.classList.contains("s-master")) {
      if (currentActIdx > 0) {
        showAct(currentActIdx - 1);
        return;
      }
    }
    if (s && s.classList.contains("s-case")) {
      const caseIdx = parseInt(s.dataset.caseIdx, 10);
      const st = caseStates[caseIdx];
      if (st && st.gabaritoRevealed) {
        hideGabarito(caseIdx);
        return;
      }
    }
    goTo(idx - 1);
  }

  /* ---------- Troca suave e deslizante de cena ---------- */
  function goTo(i, initialSubIndex = 0) {
    i = Math.max(0, Math.min(scenes.length - 1, i));
    if (i === idx || lock) return;
    lock = true; setTimeout(() => (lock = false), 750);
    timers.forEach(clearTimeout); timers = [];
    document.body.classList.toggle("back", i < idx);
    if (idx >= 0) {
      scenes[idx].classList.remove("on");
      scenes[idx].setAttribute("aria-hidden", "true");
    }
    idx = i;
    const s = scenes[i];
    s.classList.add("on");
    s.removeAttribute("aria-hidden");
    segs.forEach((b, k) => {
      b.classList.toggle("done", k <= i);
      b.toggleAttribute("aria-current", k === i);
    });
    counter.textContent = `${String(i + 1).padStart(2, "0")} / ${scenes.length}`;
    chapter.textContent = s.dataset.ch;
    $(".prev").disabled = (i === 0 && currentAreaIdx === 0 && currentActIdx === 0);
    $(".next").disabled = (i === scenes.length - 1);
    document.body.classList.toggle("alert-mode", s.dataset.ch.includes("Master") || s.classList.contains("s-news"));
    pose(i);

    // Reseta índices internos se estiver entrando na cena
    if (s.classList.contains("s-apply")) {
      buildOrbit();
      showArea(initialSubIndex || 0);
    } else if (s.classList.contains("s-master")) {
      showAct(initialSubIndex || 0);
    } else {
      (HOOKS[s.classList[1]] || (() => {}))(s);
    }
  }

  /* ---------- Ações de cada cena ---------- */
  const HOOKS = {
    "s-master-intro"(s) { applyTypewriter(s); },
    "s-news"() { renderNews(); },
    "s-flow"(s) { runFlow(s); },
    "s-balloon"() { toggleBalloon(false); later(() => toggleBalloon(true), 2000); },
    "s-duelo"(s) { applyTypewriter(s); },
    "s-case"(s) { applyTypewriter(s); }
  };

  /* ---------- Sorteador de Grupos: Duelo Prudente ou não prudente ---------- */
  let dueloMembers = [
    "Amanda", "Arthur", "Denise", "Heloisa", "Isaias",
    "Joao", "Kemilyn", "Melissa", "Rebeca", "Ruan", "Samuel"
  ];

  function initDueloSection() {
    const section = $(".s-duelo");
    if (!section) return;

    const input = $("#new-member-input", section);
    const addBtn = $("#btn-add-member", section);
    const sortearBtn = $("#btn-sortear-teams", section);
    const tagsGrid = $("#members-tags-grid", section);
    const countSpan = $("#members-count", section);

    function renderTags() {
      if (countSpan) countSpan.textContent = dueloMembers.length;
      if (!tagsGrid) return;
      tagsGrid.innerHTML = dueloMembers.map((name, idx) => `
        <span class="member-tag">
          ${name}
          <button class="btn-del-tag" data-idx="${idx}" aria-label="Remover ${name}">&times;</button>
        </span>
      `).join("");

      $$(".btn-del-tag", tagsGrid).forEach(b => {
        b.onclick = (e) => {
          e.stopPropagation();
          const removeIdx = parseInt(b.dataset.idx, 10);
          dueloMembers.splice(removeIdx, 1);
          renderTags();
        };
      });
    }

    function addMember() {
      if (!input) return;
      const val = input.value.trim();
      if (val) {
        dueloMembers.push(val);
        input.value = "";
        renderTags();
      }
    }

    if (addBtn) addBtn.onclick = addMember;
    if (input) {
      input.onkeydown = (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addMember();
        }
      };
    }

    if (sortearBtn) {
      sortearBtn.onclick = () => {
        if (dueloMembers.length < 2) {
          alert("Adicione pelo menos 2 participantes para sortear os times!");
          return;
        }

        const shuffled = [...dueloMembers].sort(() => Math.random() - 0.5);
        const mid = Math.ceil(shuffled.length / 2);
        const teamA = shuffled.slice(0, mid);
        const teamB = shuffled.slice(mid);

        const resultGrid = $("#teams-result-grid", section);
        const teamAList = $("#team-a-list", section);
        const teamBList = $("#team-b-list", section);

        if (teamAList) {
          teamAList.innerHTML = teamA.map(m => `<li>${m}</li>`).join("");
        }
        if (teamBList) {
          teamBList.innerHTML = teamB.map(m => `<li>${m}</li>`).join("");
        }
        if (resultGrid) {
          resultGrid.style.display = "grid";
          resultGrid.classList.remove("swap");
          void resultGrid.offsetWidth;
          resultGrid.classList.add("swap");
        }
      };
    }

    renderTags();
  }

  initDueloSection();

  /* ---------- Gerenciamento das 10 Situações com Timer & Gabarito ---------- */
  const situacoesList = C.situacoes || [...(C.situacoesParte1 || []), ...(C.situacoesParte2 || [])];
  const caseStates = situacoesList.map(() => ({
    secondsLeft: 25,
    intervalId: null,
    isRunning: false,
    isFinished: false,
    gabaritoRevealed: false
  }));

  function renderAllCases() {
    const caseScenes = $$(".scene.s-case");

    caseScenes.forEach((s, i) => {
      const item = situacoesList[i];
      if (!item) return;

      const clsAnswer = item.resposta.toLowerCase();

      s.innerHTML = `
        <div class="case-page-wrap">
          <div class="case-card-container" id="case-container-${i}">
            <div class="case-card-single glass">
              <div class="case-card-header">
                <span class="case-badge">${item.titulo} de 10</span>
                <div class="timer-widget">
                  <button class="timer-start-btn" id="timer-btn-${i}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                    <span>Iniciar Timer (25s)</span>
                  </button>
                  <div class="timer-display" id="timer-disp-${i}" style="display:none;">
                    <span class="timer-countdown" id="timer-count-${i}">25s</span>
                  </div>
                </div>
              </div>

              <p class="cenario-text">${item.cenario}</p>

              <div class="case-question-box">
                <p>${item.pergunta}</p>
              </div>

              <div class="case-card-hint">
                <button class="btn-reveal-gabarito" id="btn-reveal-${i}">
                  <span>Ver Gabarito (ou passe pro lado →)</span>
                </button>
              </div>
            </div>
          </div>

          <div class="gabarito-card-single glass ${clsAnswer}" id="gabarito-${i}" style="display:none;">
            <div class="ans-top">
              <span class="gabarito-title">Gabarito Oficial · ${item.titulo}</span>
              <span class="gabarito-tag ${clsAnswer}">${item.resposta}</span>
            </div>
            <p class="gabarito-exp"><b>Por que:</b> ${item.explicacao}</p>
          </div>
        </div>
      `;

      const timerBtn = $(`#timer-btn-${i}`, s);
      if (timerBtn) {
        timerBtn.onclick = (e) => {
          e.stopPropagation();
          startTimer(i);
        };
      }

      const revealBtn = $(`#btn-reveal-${i}`, s);
      if (revealBtn) {
        revealBtn.onclick = (e) => {
          e.stopPropagation();
          revealGabarito(i);
        };
      }
    });
  }

  function startTimer(caseIdx) {
    const st = caseStates[caseIdx];
    if (st.isRunning) return;

    st.isRunning = true;
    st.secondsLeft = 25;

    const s = scenes.find(sc => sc.dataset.caseIdx === String(caseIdx));
    const container = $(`#case-container-${caseIdx}`, s);
    const timerBtn = $(`#timer-btn-${caseIdx}`, s);
    const timerDisp = $(`#timer-disp-${caseIdx}`, s);
    const timerCount = $(`#timer-count-${caseIdx}`, s);

    if (container) {
      container.classList.add("timer-active");
      container.classList.remove("timer-warning", "timer-finished");
    }
    if (timerBtn) timerBtn.style.display = "none";
    if (timerDisp) timerDisp.style.display = "inline-flex";
    if (timerCount) timerCount.textContent = "25s";

    const DURATION = 25000;
    const startTime = performance.now();

    function updateFrame(now) {
      if (!st.isRunning) return;

      const elapsed = Math.min(DURATION, now - startTime);
      const progress = elapsed / DURATION;
      const remainingSeconds = Math.ceil((DURATION - elapsed) / 1000);

      st.secondsLeft = Math.max(0, remainingSeconds);

      if (timerCount) {
        timerCount.textContent = `${st.secondsLeft}s`;
      }

      if (st.secondsLeft <= 10 && st.secondsLeft > 0) {
        if (container && !container.classList.contains("timer-warning")) {
          container.classList.add("timer-warning");
        }
      }

      if (progress < 1.0) {
        st.animFrameId = requestAnimationFrame(updateFrame);
      } else {
        st.isRunning = false;
        st.isFinished = true;
        if (container) {
          container.classList.remove("timer-warning");
          container.classList.add("timer-finished");
        }
        if (timerCount) {
          timerCount.textContent = "0s · Tempo Esgotado!";
        }
      }
    }

    st.animFrameId = requestAnimationFrame(updateFrame);
  }

  function revealGabarito(caseIdx) {
    const st = caseStates[caseIdx];
    st.gabaritoRevealed = true;

    const s = scenes.find(sc => sc.dataset.caseIdx === String(caseIdx));
    const gabaritoEl = $(`#gabarito-${caseIdx}`, s);
    const revealBtn = $(`#btn-reveal-${caseIdx}`, s);

    if (gabaritoEl) {
      gabaritoEl.style.display = "flex";
      applyTypewriter(gabaritoEl);
    }
    if (revealBtn) {
      revealBtn.style.display = "none";
    }
  }

  function hideGabarito(caseIdx) {
    const st = caseStates[caseIdx];
    st.gabaritoRevealed = false;

    const s = scenes.find(sc => sc.dataset.caseIdx === String(caseIdx));
    const gabaritoEl = $(`#gabarito-${caseIdx}`, s);
    const revealBtn = $(`#btn-reveal-${caseIdx}`, s);

    if (gabaritoEl) {
      gabaritoEl.style.display = "none";
    }
    if (revealBtn) {
      revealBtn.style.display = "inline-flex";
    }
  }

  renderAllCases();

  /* ---------- Áreas em órbita ---------- */
  const orbit = $(".orbit"), card = $(".area-card");
  function buildOrbit() {
    if (!orbit.children.length) C.areas.forEach((a, k) => {
      const b = document.createElement("button");
      b.className = "o-item"; b.setAttribute("aria-label", a.nome);
      b.style.setProperty("--d", `${k * 80 + 260}ms`);
      b.innerHTML = a.icon; b.onclick = () => showArea(k);
      orbit.append(b);
    });
    placeOrbit();
  }
  function placeOrbit() {
    const r = orbit.offsetWidth / 2;
    $$(".o-item", orbit).forEach((b, k) => {
      const ang = (k / C.areas.length) * Math.PI * 2 - Math.PI / 2;
      b.style.setProperty("--x", `${Math.cos(ang) * r}px`);
      b.style.setProperty("--y", `${Math.sin(ang) * r}px`);
    });
  }
  addEventListener("resize", placeOrbit);

  function showArea(k) {
    currentAreaIdx = k;
    const a = C.areas[k], n = C.areas.length;
    $$(".o-item").forEach((b, j) => b.setAttribute("aria-pressed", j === k));
    const nextLabel = k < n - 1 ? "próxima área (ou clique →)" : "avançar para o Caso Master →";
    card.innerHTML = `<div class="swap">
      <span class="idx">0${k + 1} / 0${n}</span>
      <h3 class="words">${a.titulo}</h3>
      <span class="nm">${a.nome}</span>
      <p>${a.texto}</p>
      <p class="ex"><b>Exemplo:</b> ${a.exemplo}</p>
      <div class="mini-nav">
        <button class="link btn-area-prev" ${k === 0 && idx === 0 ? "disabled" : ""}>← ${k === 0 ? "cena anterior" : "área anterior"}</button>
        <button class="link btn-area-next">${nextLabel}</button>
      </div>
    </div>`;
    applyTypewriter(card);
    $(".btn-area-prev", card).onclick = () => retreatPrev();
    $(".btn-area-next", card).onclick = () => advanceNext();
  }

  /* ---------- Banco Master: atos ---------- */
  const actsNav = $(".acts-nav"), actStage = $(".act-stage");
  if (actsNav && actStage) {
    actsNav.innerHTML = C.atos.map((a, k) => `<button class="act-dot" data-k="${k}">${a.n}</button>`).join("");
    $$(".act-dot").forEach(b => b.onclick = () => showAct(+b.dataset.k));
  }

  function showAct(k) {
    if (!actStage) return;
    currentActIdx = k;
    const a = C.atos[k];
    const n = C.atos.length;
    $$(".act-dot").forEach((b, j) => b.toggleAttribute("aria-current", j === k));
    const nextActLabel = k < n - 1 ? `Avançar para ${C.atos[k + 1].n} →` : `Avançar para Mágica com Fundos →`;

    actStage.innerHTML = `
      <span class="act-num act-item" style="--i:0" aria-hidden="true">${k + 1}</span>
      <div class="act-mid">
        <h3 class="words act-item" style="--i:1">${a.titulo}</h3>
        <p class="act-item" style="--i:2">${a.texto}</p>
      </div>
      <div class="act-right">
        <p class="licao act-item" style="--i:3">${a.licao}</p>
        <button class="link btn-act-next act-item" style="--i:4;margin-top:1.2rem;display:inline-block;font-weight:700">${nextActLabel}</button>
      </div>
    `;
    applyTypewriter(actStage);
    $(".btn-act-next", actStage).onclick = () => advanceNext();
  }

  /* ---------- Banco Master: Mural de notícias ---------- */
  function renderNews() {
    const grid = $(".news-grid");
    if (!grid) return;
    if (grid.children.length && grid.dataset.rendered) return;
    grid.dataset.rendered = "true";
    grid.innerHTML = C.noticiasMaster.map((n, i) => `
      <article class="news-card a" style="--i:${i + 2}">
        <div class="news-meta">
          <span>${n.veiculo}</span>
          <span class="news-badge">${n.data}</span>
        </div>
        <h3 class="words">${n.manchete}</h3>
        <p>${n.trecho}</p>
        <div class="news-infracao">${n.infracao}</div>
      </article>
    `).join("");
    applyTypewriter(grid);
  }

  /* ---------- Fluxo com fundos ---------- */
  function runFlow(s) {
    const p1 = $(".f1", s), p2 = $(".f2", s), coin = $(".coin", s), junk = $(".junk", s);
    s.classList.remove("drawn");
    [p1, p2].forEach(p => p.style.setProperty("--len", p.getTotalLength()));
    void s.offsetWidth;
    later(() => s.classList.add("drawn"), 300);
    const place = (el, p, v) => { const pt = p.getPointAtLength(v * p.getTotalLength()); el.setAttribute("transform", `translate(${pt.x},${pt.y})`); };
    place(coin, p1, 1); place(junk, p2, 1);
    if (reduce) return;
    const cycle = (n) => {
      if (n === 0 || !s.classList.contains("on")) return;
      const t0 = performance.now(), D = 1600;
      const frame = t => {
        if (!s.classList.contains("on")) return;
        const p = Math.min(1, (t - t0) / (D * 2));
        if (p < .5) place(coin, p1, p * 2); else place(junk, p2, (p - .5) * 2);
        p < 1 ? requestAnimationFrame(frame) : cycle(n - 1);
      };
      requestAnimationFrame(frame);
    };
    later(() => cycle(2), 2000);
  }

  /* ---------- Balão ---------- */
  const bb = $(".balloon-btn");
  function toggleBalloon(on) {
    bb.classList.toggle("on", on); bb.setAttribute("aria-pressed", on);
    $(".b-val b").textContent = on ? "R$ 45" : "R$ 100";
  }
  bb.onclick = () => { timers.forEach(clearTimeout); toggleBalloon(!bb.classList.contains("on")); };



  /* ---------- Final ---------- */
  $(".sources ol").innerHTML = C.fontes.map(f => `<li><a href="${f.url}" target="_blank" rel="noopener">${f.nome}</a></li>`).join("");
  $(".restart").onclick = () => goTo(0);

  /* ---------- Modo Tela Cheia (Fullscreen API) ---------- */
  const fsBtn = $("#fs-btn");
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    }
  }
  if (fsBtn) fsBtn.onclick = toggleFullscreen;
  document.addEventListener("fullscreenchange", () => {
    document.body.classList.toggle("is-fullscreen", !!document.fullscreenElement);
  });

  /* ---------- Navegação por Teclado e Toque ---------- */
  addEventListener("keydown", e => {
    // Tecla F alterna tela cheia sem risco de desativar F11 nativo
    if ((e.key === "f" || e.key === "F") && !e.target.closest("input,textarea")) {
      e.preventDefault();
      toggleFullscreen();
      return;
    }
    if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); advanceNext(); }
    if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); retreatPrev(); }
  });
  let tx = 0, ty = 0;
  addEventListener("touchstart", e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  addEventListener("touchend", e => {
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) advanceNext(); else retreatPrev();
    }
  }, { passive: true });

  /* ---------- Cursor suave ---------- */
  if (fine && !reduce) {
    const c = $(".cursor");
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
    (function loop() { cx += (x - cx) * .22; cy += (y - cy) * .22; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener("mouseover", e => c.classList.toggle("big", !!e.target.closest("button,summary,a,.case-card,.news-card")));
  }

  goTo(0);
})();
