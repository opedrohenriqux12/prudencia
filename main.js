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
  $$(".words").forEach(el => {
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
        // Quebra cada palavra em letras individuais para efeito de escrita letra a letra
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
  });

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
    "s-news"() { renderNews(); },
    "s-flow"(s) { runFlow(s); },
    "s-balloon"() { toggleBalloon(false); later(() => toggleBalloon(true), 2000); },
    "s-cases-1"() { renderCases1(); },
    "s-cases-2"() { renderCases2(); },
    "s-answers"() { renderAnswers(); }
  };

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
      <h3>${a.titulo}</h3>
      <span class="nm">${a.nome}</span>
      <p>${a.texto}</p>
      <p class="ex"><b>Exemplo:</b> ${a.exemplo}</p>
      <div class="mini-nav">
        <button class="link btn-area-prev" ${k === 0 && idx === 0 ? "disabled" : ""}>← ${k === 0 ? "cena anterior" : "área anterior"}</button>
        <button class="link btn-area-next">${nextLabel}</button>
      </div>
    </div>`;
    $(".btn-area-prev", card).onclick = () => retreatPrev();
    $(".btn-area-next", card).onclick = () => advanceNext();
  }

  /* ---------- Banco Master: atos ---------- */
  const actsNav = $(".acts-nav"), actStage = $(".act-stage");
  actsNav.innerHTML = C.atos.map((a, k) => `<button class="act-dot" data-k="${k}">${a.n}</button>`).join("");
  $$(".act-dot").forEach(b => b.onclick = () => showAct(+b.dataset.k));

  function showAct(k) {
    currentActIdx = k;
    const a = C.atos[k];
    const n = C.atos.length;
    $$(".act-dot").forEach((b, j) => b.toggleAttribute("aria-current", j === k));
    const nextActLabel = k < n - 1 ? `Avançar para ${C.atos[k + 1].n} →` : `Avançar para Notícias →`;

    actStage.innerHTML = `
      <span class="act-num swap" aria-hidden="true">${k + 1}</span>
      <div class="swap">
        <h3>${a.titulo}</h3>
        <p>${a.texto}</p>
      </div>
      <div class="act-right swap">
        <p class="licao">${a.licao}</p>
        <button class="link btn-act-next" style="margin-top:1rem;display:inline-block;font-weight:700">${nextActLabel}</button>
      </div>
    `;
    $(".btn-act-next", actStage).onclick = () => advanceNext();
  }

  /* ---------- Banco Master: Mural de notícias ---------- */
  function renderNews() {
    const grid = $(".news-grid");
    if (!grid || grid.children.length) return;
    grid.innerHTML = C.noticiasMaster.map(n => `
      <article class="news-card">
        <div class="news-meta">
          <span>${n.veiculo}</span>
          <span class="news-badge">${n.data}</span>
        </div>
        <h3>${n.manchete}</h3>
        <p>${n.trecho}</p>
        <div class="news-infracao">${n.infracao}</div>
      </article>
    `).join("");
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

  /* ---------- Dinâmica: Casos 1 a 5 ---------- */
  function renderCases1() {
    const grid = $("#cases-grid-1");
    if (!grid || grid.children.length) return;
    grid.innerHTML = C.situacoesParte1.map(item => `
      <div class="case-card">
        <span class="case-badge">${item.titulo}</span>
        <p class="cenario">${item.cenario}</p>
        <p class="case-question">${item.pergunta}</p>
      </div>
    `).join("");
  }

  /* ---------- Dinâmica: Casos 6 a 10 ---------- */
  function renderCases2() {
    const grid = $("#cases-grid-2");
    if (!grid || grid.children.length) return;
    grid.innerHTML = C.situacoesParte2.map(item => `
      <div class="case-card">
        <span class="case-badge">${item.titulo}</span>
        <p class="cenario">${item.cenario}</p>
        <p class="case-question">${item.pergunta}</p>
      </div>
    `).join("");
  }

  /* ---------- Gabarito Completo ---------- */
  function renderAnswers() {
    const col1 = $("#ans-col-1"), col2 = $("#ans-col-2");
    if (!col1 || col1.children.length) return;
    const renderList = list => list.map(item => {
      const cls = item.resposta.toLowerCase();
      return `
        <div class="ans-item ${cls}">
          <div class="ans-top">
            <span class="ans-num">${item.titulo}</span>
            <span class="ans-tag ${cls}">${item.resposta}</span>
          </div>
          <p class="ans-cenario">${item.cenario}</p>
          <p class="ans-exp"><b>Por que:</b> ${item.explicacao}</p>
        </div>
      `;
    }).join("");
    col1.innerHTML = renderList(C.situacoesParte1);
    col2.innerHTML = renderList(C.situacoesParte2);
  }

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
