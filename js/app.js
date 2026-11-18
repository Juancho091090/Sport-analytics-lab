/* Sport Analytics Lab · motor del ODC (JavaScript sin dependencias) */
(function () {
  "use strict";
  var C = window.ODC, P = C.pantallas, M = C.modulos;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ic = function (n) { return '<svg class="i" viewBox="0 0 24 24" aria-hidden="true">' + (window.ICONS[n] || "") + "</svg>"; };
  var esc = function (s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };

  /* ---------------- estado ---------------- */
  var st = { i: 0, v: [], d: [], q: null, mute: false };
  function save() { SCORM.saveState({ i: st.i, v: st.v, d: st.d, q: st.q }); SCORM.location(P[st.i].id); }
  function visit(i) { if (st.v.indexOf(i) < 0) st.v.push(i); }
  function markDone(id) { if (st.d.indexOf(id) < 0) { st.d.push(id); save(); paintSide(); } }
  function needs(p) { return !!(p.actividad || p.simulador || p.preguntas); }
  function modDone(k) {
    var list = P.filter(function (p) { return p.mod === k && needs(p); });
    return list.length > 0 && list.every(function (p) { return st.d.indexOf(p.id) >= 0; });
  }
  function firstOfMod(k) { for (var i = 0; i < P.length; i++) if (P[i].mod === k) return i; return 0; }
  function idx(id) { for (var i = 0; i < P.length; i++) if (P[i].id === id) return i; return 0; }

  /* ---------------- avatar ---------------- */
  function avatar(size) {
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 120 120" aria-hidden="true"><defs><clipPath id="ac' + size + '"><circle cx="60" cy="60" r="58"/></clipPath></defs>' +
      '<circle cx="60" cy="60" r="58" fill="#E6F4EA"/><g clip-path="url(#ac' + size + ')">' +
      '<path d="M14 124 C16 92 34 82 60 82 C86 82 104 92 106 124 Z" fill="#0F5132"/>' +
      '<path d="M44 84 L60 104 L76 84" fill="none" stroke="#F2B705" stroke-width="5" stroke-linejoin="round"/>' +
      '<rect x="52" y="70" width="16" height="16" rx="6" fill="#C98B62"/><ellipse cx="60" cy="52" rx="23" ry="26" fill="#D9A07A"/>' +
      '<path d="M36 50 C34 28 50 20 62 21 C78 22 88 32 85 50 C80 40 72 35 60 35 C49 35 41 40 36 50 Z" fill="#2B1B12"/>' +
      '<circle cx="51" cy="54" r="3" fill="#2B1B12"/><circle cx="69" cy="54" r="3" fill="#2B1B12"/>' +
      '<path d="M51 65 Q60 72 69 65" fill="none" stroke="#7A3E22" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="M34 52 C34 36 46 27 60 27 C74 27 86 36 86 52" fill="none" stroke="#1F2937" stroke-width="4"/>' +
      '<rect x="29" y="47" width="9" height="15" rx="4" fill="#1F2937"/><rect x="82" y="47" width="9" height="15" rx="4" fill="#1F2937"/>' +
      '<path d="M33 61 C35 70 42 72 50 70" fill="none" stroke="#1F2937" stroke-width="2.5"/><circle cx="51" cy="70" r="3" fill="#F2B705"/>' +
      '<text x="60" y="114" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="13" fill="#fff">K</text></g></svg>';
  }
  function wave() { return '<span class="wave">' + [8, 14, 20, 12, 18, 24, 10, 16, 22, 12, 8, 14].map(function (h, k) { return '<i style="height:' + h + "px;animation-delay:" + (k * 0.07) + 's"></i>'; }).join("") + "</span>"; }

  /* ---------------- audio ---------------- */
  var audio = null, audioMissing = false;
  function stopAudio() { if (audio) { audio.pause(); } setPlaying(false); }
  function setPlaying(on) { var b = $(".pb"); if (b) b.innerHTML = ic(on ? "pause" : "play"); var w = $(".coach .wave"); if (w) w.classList.toggle("on", on); }
  function toggleAudio() {
    var p = P[st.i];
    if (!p.audio) return;
    if (audioMissing) { showTranscript(true); return; }
    if (!audio) {
      audio = new Audio("assets/audio/" + p.audio);
      audio.addEventListener("ended", function () { setPlaying(false); });
      audio.addEventListener("error", function () { audioMissing = true; setPlaying(false); var m = $(".audio-msg"); if (m) m.style.display = "block"; showTranscript(true); });
    }
    if (audio.paused) { var pr = audio.play(); if (pr && pr.catch) pr.catch(function () {}); setPlaying(true); } else { audio.pause(); setPlaying(false); }
  }
  function showTranscript(force) { var t = $(".transcript"); if (!t) return; t.style.display = force === true || t.style.display === "none" ? "block" : "none"; }

  /* ---------------- shell ---------------- */
  function sideHTML() {
    var p = P[st.i], h = "<h6>CONTENIDO</h6>";
    M.forEach(function (m, k) {
      var on = p.mod === k, done = modDone(k);
      h += '<button class="mi' + (on ? " on" : "") + '" data-mod="' + k + '"><span class="n">' + ic(m.icono) + "</span>" + m.id + " · " + esc(m.nombre) + (done ? '<span class="ck">' + ic("circle-check") + "</span>" : "") + "</button>";
      if (m.sub && on) m.sub.forEach(function (s, j) {
        var sid = "p10_" + (j + 1), si = idx(sid);
        h += '<button class="si' + (st.i === si ? " on" : st.d.indexOf(sid) >= 0 ? " done" : "") + '" data-go="' + si + '">' + (st.d.indexOf(sid) >= 0 ? "✓ " : "") + esc(s) + "</button>";
      });
    });
    h += '<button class="mi foot-link" data-go="' + idx("p3") + '"><span class="n">' + ic("layout-grid") + "</span>Menú principal</button>";
    h += '<button class="mi" data-go="' + idx("p16") + '"><span class="n">' + ic("library") + '</span>Referencias · Créditos</button>';
    return h;
  }
  function paintSide() { var s = $(".side"); if (s) s.innerHTML = sideHTML(); }
  function chipHTML(p) { if (p.chip) return p.chip; var m = M[p.mod]; return ic(m.icono) + " " + m.id + " · " + esc(m.nombre); }
  function progress() { return Math.round((st.v.length / P.length) * 100); }

  function shell(p, body) {
    var dots = M.map(function (m, k) { return '<i class="' + (p.mod === k ? "on" : "") + '"></i>'; }).join("");
    var coach = p.voz ? '<div class="coach" id="coach"><div class="bubble" role="region" aria-label="Coach Kai"><button class="x" data-act="min" title="Minimizar">' + ic("x") + "</button><b>Coach Kai</b><br>" + esc(p.burbuja || "") +
      '<div class="play"><button class="pb" data-act="audio" aria-label="Reproducir audio">' + ic("play") + "</button>" + wave() + '<button class="tr-btn" data-act="tr">' + ic("captions") + " Transcripción</button></div>" +
      '<div class="audio-msg" style="display:none">Audio en producción: mientras tanto, lee la transcripción.</div>' +
      '<div class="transcript" style="display:none">' + esc(p.voz) + '</div></div><div class="av" data-act="min" title="Coach Kai">' + avatar(104) + "</div></div>" : "";
    return '<div class="app"><header class="top"><button class="tb mobile-menu" data-act="side" aria-label="Menú lateral">' + ic("panel-left") + '</button><div class="logo">' + ic("chart-no-axes-combined") + '</div><div class="brand"><b>' + esc(C.titulo) + "</b><span>" + esc(C.institucion) + '</span></div><div class="chip">' + chipHTML(p) +
      '</div><div class="prog"><span class="txt">Progreso</span><div class="bar"><i style="width:' + progress() + '%"></i></div>' + progress() + '%<button class="tb" data-go="' + idx("p3") + '" title="Menú principal">' + ic("menu") + "</button></div></header>" +
      '<div class="body"><nav class="side" aria-label="Contenido">' + sideHTML() + '</nav><main class="main"><div class="scroll" id="scroll"><div class="kicker">' + esc(p.kicker || "") + "</div><h1>" + esc(p.titulo || "") + "</h1>" + body + "</div>" +
      '<footer class="foot"><button class="btn g" data-act="prev"' + (st.i === 0 ? " disabled" : "") + ">" + ic("arrow-left") + ' Atrás</button><div class="dots">' + dots + '</div><span class="pn">Pantalla ' + p.n + '</span><button class="btn p" data-act="next"' + (st.i === P.length - 1 ? " disabled" : "") + ">Siguiente " + ic("arrow-right") + "</button></footer>" + coach + "</main></div></div>";
  }
  function lead(p) {
    if (!p.texto) return "";
    return '<div class="lead">' + p.texto.map(function (t) { return "<p" + (/^¿|\?$/.test(t.trim()) && t.length < 140 ? ' class="ask"' : "") + ">" + esc(t) + "</p>"; }).join("") + "</div>";
  }

  /* ---------------- componentes de actividad ---------------- */
  var inits = [];
  function A(p) { return p.id; }

  function actVF(p) {
    var a = p.actividad, id = "vf_" + p.id;
    inits.push(function () {
      var answered = 0;
      $$("#" + id + " .opt").forEach(function (b) {
        b.addEventListener("click", function () {
          var k = +b.dataset.k, val = b.dataset.v === "1", it = a.items[k], row = b.closest(".vf");
          $$(".opt", row).forEach(function (x) { x.disabled = true; });
          var right = val === it.r; b.classList.add(right ? "ok" : "bad");
          if (!right) $$(".opt", row).forEach(function (x) { if ((x.dataset.v === "1") === it.r) x.classList.add("ok"); });
          row.insertAdjacentHTML("beforeend", '<div class="fb' + (right ? "" : " bad") + '">' + ic(right ? "lightbulb" : "info") + "<div><b>" + (right ? "¡Correcto! " : "Revisa: ") + "</b>" + esc(it.fb) + "</div></div>");
          if (++answered === a.items.length) markDone(p.id);
        });
      });
    });
    return '<div class="card act" id="' + id + '"><span class="tag">' + ic("list-checks") + " " + esc(a.titulo) + "</span>" + a.items.map(function (it, k) {
      return '<div class="vf"><div class="q">' + (k + 1) + ". " + esc(it.q) + '</div><div class="row"><button class="opt" data-k="' + k + '" data-v="1">Verdadero</button><button class="opt" data-k="' + k + '" data-v="0">Falso</button></div></div>';
    }).join("") + "</div>";
  }

  function actSel(p) {
    var a = p.actividad, id = "sel_" + p.id, L = "ABCD";
    inits.push(function () {
      $$("#" + id + " .opt").forEach(function (b) {
        b.addEventListener("click", function () {
          var o = a.ops[+b.dataset.k], box = $("#" + id + " .fbx");
          b.classList.add(o.ok ? "ok" : "bad"); b.disabled = true;
          if (o.ok) $$("#" + id + " .opt").forEach(function (x) { x.disabled = true; });
          box.innerHTML = '<div class="fb' + (o.ok ? "" : " bad") + '">' + ic(o.ok ? "lightbulb" : "info") + "<div>" + esc(o.fb) + (o.ok ? "" : " <i>Intenta con otra opción.</i>") + "</div></div>";
          markDone(p.id);
        });
      });
    });
    return '<div class="card act" id="' + id + '"><span class="tag">' + ic("circle-dot") + " " + esc(a.titulo) + "</span>" + (a.q ? '<div class="act-q">' + esc(a.q) + "</div>" : "") +
      a.ops.map(function (o, k) { return '<button class="opt" data-k="' + k + '"><span class="l">' + L[k] + "</span>" + esc(o.t) + "</button>"; }).join("") + '<div class="fbx"></div></div>';
  }

  function actClass(p, cols) {
    var a = p.actividad, id = "cl_" + p.id;
    var order = shuffle(a.items.map(function (_, k) { return k; }));
    inits.push(function () {
      var root = $("#" + id), sel = null;
      function chips() { return $$(".chipd", root); }
      function place(chip, bin) { if (!chip || chip.classList.contains("ok")) return; chip.classList.remove("sel", "bad"); (bin ? $(".drop", bin) : $(".pool", root)).appendChild(chip); sel = null; update(); }
      function update() { $(".check", root).disabled = $(".pool", root).children.length > 0; }
      chips().forEach(function (c) {
        c.addEventListener("dragstart", function (e) { e.dataTransfer.setData("text/plain", c.dataset.k); });
        c.addEventListener("click", function (e) { e.stopPropagation(); if (c.classList.contains("ok")) return; if (sel === c) { c.classList.remove("sel"); sel = null; return; } chips().forEach(function (x) { x.classList.remove("sel"); }); c.classList.add("sel"); sel = c; });
      });
      $$(".bin", root).concat([$(".pool", root)]).forEach(function (bin) {
        bin.addEventListener("dragover", function (e) { e.preventDefault(); bin.classList.add("over"); });
        bin.addEventListener("dragleave", function () { bin.classList.remove("over"); });
        bin.addEventListener("drop", function (e) { e.preventDefault(); bin.classList.remove("over"); var c = $('.chipd[data-k="' + e.dataTransfer.getData("text/plain") + '"]', root); place(c, bin.classList.contains("bin") ? bin : null); });
        bin.addEventListener("click", function () { if (sel) place(sel, bin.classList.contains("bin") ? bin : null); });
      });
      $(".check", root).addEventListener("click", function () {
        var allOk = true, fbh = "";
        chips().forEach(function (c) {
          var bin = c.closest(".bin"), k = +c.dataset.k, it = a.items[k];
          var ok = bin && +bin.dataset.c === it.c; if (!ok) allOk = false;
          c.classList.toggle("ok", !!ok); c.classList.toggle("bad", !ok); c.draggable = !ok;
          if (ok) fbh += "<div>" + ic("check") + " <b>" + esc(it.t) + ":</b> " + esc(it.fb) + "</div>";
        });
        $(".fbx", root).innerHTML = (allOk ? '<div class="fb">' + ic("lightbulb") + "<div><b>¡Todo en su lugar!</b></div></div>" : '<div class="fb bad">' + ic("info") + "<div>Algunas tarjetas (en rojo) no están en el lugar correcto. Muévelas e inténtalo de nuevo.</div></div>") + '<div class="fblist">' + fbh + "</div>";
        if (allOk) { markDone(p.id); $(".check", root).disabled = true; }
      });
      update();
    });
    return '<div class="card act" id="' + id + '"><span class="tag">' + ic("move") + " " + esc(a.titulo) + '</span><div class="pool" aria-label="Tarjetas por ubicar">' +
      order.map(function (k) { return '<span class="chipd" draggable="true" tabindex="0" data-k="' + k + '">' + ic("grip-vertical") + esc(a.items[k].t) + "</span>"; }).join("") +
      '</div><div class="bins" style="--cols:' + (cols || a.categorias.length) + '">' +
      a.categorias.map(function (c, k) { return '<div class="bin" data-c="' + k + '"><h5>' + esc(c) + '</h5><div class="drop"></div></div>'; }).join("") +
      '</div><p class="hint">Arrastra cada tarjeta o tócala y luego toca su destino.</p><div class="row" style="margin-top:10px"><button class="btn p check">Comprobar</button></div><div class="fbx"></div></div>';
  }

  function actOrder(p) {
    var a = p.actividad, id = "or_" + p.id, cur = shuffle(a.correcto);
    if (cur.join() === a.correcto.join()) cur.reverse();
    function list() { return cur.map(function (t, k) { return '<div class="ord" data-t="' + esc(t) + '"><span class="l">' + (k + 1) + "</span>" + esc(t) + '<span class="mv"><button data-up="' + k + '" aria-label="Subir">' + ic("chevron-up") + '</button><button data-dn="' + k + '" aria-label="Bajar">' + ic("chevron-down") + "</button></span></div>"; }).join(""); }
    inits.push(function () {
      var root = $("#" + id);
      function bind() {
        $$("[data-up]", root).forEach(function (b) { b.onclick = function () { var k = +b.dataset.up; if (k > 0) { var t = cur[k]; cur[k] = cur[k - 1]; cur[k - 1] = t; $(".olist", root).innerHTML = list(); bind(); } }; });
        $$("[data-dn]", root).forEach(function (b) { b.onclick = function () { var k = +b.dataset.dn; if (k < cur.length - 1) { var t = cur[k]; cur[k] = cur[k + 1]; cur[k + 1] = t; $(".olist", root).innerHTML = list(); bind(); } }; });
      }
      bind();
      $(".check", root).addEventListener("click", function () {
        var all = true;
        $$(".ord", root).forEach(function (r, k) { var ok = cur[k] === a.correcto[k]; if (!ok) all = false; r.classList.toggle("ok", ok); r.classList.toggle("bad", !ok); });
        $(".fbx", root).innerHTML = '<div class="fb' + (all ? "" : " bad") + '">' + ic(all ? "lightbulb" : "info") + "<div>" + (all ? "<b>¡Orden correcto!</b> " + esc(a.fb) : "Algunas fases (en rojo) no están en su lugar. Usa las flechas para corregirlas.") + "</div></div>";
        if (all) markDone(p.id);
      });
    });
    return '<div class="card act" id="' + id + '"><span class="tag">' + ic("arrow-down-up") + " " + esc(a.titulo) + '</span><div class="olist">' + list() + '</div><div class="row" style="margin-top:12px"><button class="btn p check">Comprobar</button></div><div class="fbx"></div></div>';
  }

  function actFill(p) {
    var a = p.actividad, id = "fi_" + p.id, n = a.correctas.length;
    inits.push(function () {
      var root = $("#" + id), vals = new Array(n).fill(null), active = 0;
      function paint() {
        $$(".slot", root).forEach(function (s, k) { s.textContent = vals[k] || "______"; s.classList.toggle("empty", !vals[k]); s.classList.remove("ok", "bad"); s.style.outline = k === active ? "2px solid #F2B705" : ""; });
        $(".check", root).disabled = vals.some(function (v) { return !v; });
      }
      $$(".slot", root).forEach(function (s, k) { s.addEventListener("click", function () { vals[k] = null; active = k; paint(); }); });
      $$(".word", root).forEach(function (w) { w.addEventListener("click", function () { vals[active] = w.dataset.w; var nx = vals.indexOf(null); active = nx < 0 ? active : nx; paint(); }); });
      $(".check", root).addEventListener("click", function () {
        var all = true; $$(".slot", root).forEach(function (s, k) { var ok = vals[k] === a.correctas[k]; if (!ok) all = false; s.classList.add(ok ? "ok" : "bad"); });
        $(".fbx", root).innerHTML = '<div class="fb' + (all ? "" : " bad") + '">' + ic(all ? "lightbulb" : "info") + "<div>" + (all ? "<b>¡Correcto!</b> " + esc(a.fb) : "Revisa las palabras en rojo: toca el espacio para cambiarla.") + "</div></div>";
        if (all) markDone(p.id);
      });
      paint();
    });
    var s = "";
    a.partes.forEach(function (t, k) { s += esc(t); if (k < n) s += '<button class="slot empty" data-k="' + k + '">______</button>'; });
    return '<div class="card act" id="' + id + '"><span class="tag">' + ic("pencil-line") + " " + esc(a.titulo) + '</span><div class="fill" style="margin-top:8px">«' + s + '»</div><div class="row" style="margin-top:6px">' +
      shuffle(a.banco).map(function (w) { return '<button class="chipd word" data-w="' + esc(w) + '">' + esc(w) + "</button>"; }).join("") +
      '</div><p class="hint">Toca una palabra para ubicarla en el espacio resaltado.</p><div class="row" style="margin-top:10px"><button class="btn p check">Comprobar</button></div><div class="fbx"></div></div>';
  }

  /* ---------------- pantallas ---------------- */
  var R = {};

  R.portada = function (p) {
    var bars = [0, 1, 2, 3, 4, 5, 6].map(function (i) { return '<rect x="' + (60 + i * 85) + '" y="' + (640 - (30 + i * 18)) + '" width="46" height="' + (30 + i * 18) + '" rx="6"/>'; }).join("");
    return '<div class="cover"><svg class="art" viewBox="0 0 760 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g stroke="rgba(242,183,5,.18)" fill="none" stroke-width="2"><rect x="20" y="170" width="640" height="420" rx="6"/><line x1="340" y1="170" x2="340" y2="590"/><circle cx="340" cy="380" r="70"/><rect x="20" y="290" width="90" height="180"/><rect x="570" y="290" width="90" height="180"/></g>' +
      '<polyline points="40,540 120,500 200,515 280,450 360,470 440,400 520,420 600,340 650,350" fill="none" stroke="#F2B705" stroke-width="4"/>' + [[120, 500], [280, 450], [440, 400], [600, 340]].map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="7" fill="#F2B705"/>'; }).join("") +
      '<g fill="rgba(255,255,255,.14)">' + bars + "</g></svg>" +
      '<div class="cv-head"><div class="logo">' + ic("chart-no-axes-combined") + '</div><div class="brand"><b>Universidad de Cundinamarca</b><span>Objeto Digital de Conocimiento · CAI CTI</span></div></div>' +
      '<div class="wrap"><span class="tag" style="background:rgba(242,183,5,.18);color:#F2B705">' + ic("sparkles") + " Analítica · IA · Gestión deportiva</span><h2>Sport<br>Analytics Lab</h2><div class=\"sub\">" + esc(C.subtitulo) + '</div><div class="desc">' + esc(p.texto[0]) + " Construido a partir de una revisión sistemática PRISMA de 30 estudios científicos.</div>" +
      '<div class="row" style="margin-top:34px;gap:14px"><button class="btn y" data-act="next" style="height:54px;padding:0 30px;font-size:16px">' + ic("play") + ' Comenzar</button><button class="btn" data-act="tr" style="border:1.5px solid rgba(255,255,255,.4);color:#fff;height:54px">' + ic("info") + " Cómo navegar</button></div>" +
      '<div class="transcript" style="display:none;max-width:560px;margin-top:16px;color:#14261C">Usa <b>Siguiente</b> y <b>Atrás</b> para avanzar, el menú lateral para saltar entre módulos y el botón amarillo del Coach Kai para escuchar cada pantalla. Tu progreso se guarda automáticamente.</div></div>' +
      '<div class="foot2">' + esc(p.pie) + "</div>" +
      '<div class="coach cv-coach"><div class="bubble" style="color:#14261C"><b>Coach Kai</b><br>' + esc(p.burbuja) + '<div class="play"><button class="pb" data-act="audio" aria-label="Reproducir audio">' + ic("play") + "</button>" + wave() + '</div><div class="audio-msg" style="display:none">Audio en producción.</div></div><div class="av">' + avatar(140) + "</div></div></div>";
  };

  R.bienvenida = function (p) {
    return '<div class="grid g2"><div class="card" style="padding:26px"><div class="row"><div class="tb" style="background:#F2B705;width:52px;height:52px;border-radius:14px;color:#0B3B24;font-size:26px">' + ic("trophy") + '</div><div><div class="kicker">Resultado esperado</div><div style="font-size:21px;font-weight:700;color:#0B3B24">¿Qué vas a lograr?</div></div></div>' +
      '<p style="font-size:15.5px;color:#33463A;margin-top:16px">' + esc(p.rea) + '</p><div class="row" style="margin-top:16px"><span class="tag">Verbo: analizar</span><span class="tag">Criterio: ≥ 80 %</span></div></div>' +
      '<div class="card" style="padding:26px"><div class="row"><div class="tb" style="background:#0F5132;width:52px;height:52px;border-radius:14px;font-size:26px">' + ic("users") + '</div><div><div class="kicker">Población objetivo</div><div style="font-size:21px;font-weight:700;color:#0B3B24">¿Para quién es?</div></div></div>' +
      p.poblacion.map(function (t, k) { return '<div class="row" style="margin-top:14px;font-size:15px;color:#33463A"><span style="color:#2E9E5B;font-size:22px">' + ic(["graduation-cap", "briefcase", "building-2"][k]) + "</span>" + esc(t) + "</div>"; }).join("") +
      '<div style="margin-top:18px"><span class="tag">' + ic("gauge") + " Nivel intermedio · 60 min aprox.</span></div></div></div>";
  };

  R.menu = function (p) {
    var next = -1; for (var k = 0; k < M.length; k++) if (!modDone(k)) { next = k; break; }
    return lead(p) + '<div class="mgrid">' + M.map(function (m, k) {
      var d = modDone(k), cls = d ? " done" : k === next ? " next" : "";
      return '<button class="card mcard' + cls + '" data-mod="' + k + '"><div class="mi2">' + ic(m.icono) + '</div><div style="font-size:12px;font-weight:700;color:#2E9E5B;margin-top:14px;letter-spacing:.1em">' + m.id + (k >= 3 && k <= 7 ? " · HALLAZGO " + (k - 2) : "") + '</div><div style="font-size:15.5px;font-weight:600;color:#0B3B24;line-height:1.25;margin-top:2px">' + esc(m.nombre) + '</div><span class="st">' + ic(d ? "circle-check" : "circle") + "</span>" + (k === next ? '<div class="tag" style="margin-top:10px;background:#FFF5D1;color:#8A6400">Continuar aquí</div>' : "") + "</button>";
    }).join("") + '</div><div class="row" style="margin-top:20px"><button class="btn g" data-go="' + idx("p16") + '">' + ic("library") + ' Referencias</button><button class="btn g" data-go="' + idx("p15") + '">' + ic("award") + " Créditos</button></div>";
  };

  R.p4 = function (p) {
    return lead(p) + '<div class="grid g12"><div style="display:flex;flex-direction:column;gap:14px"><div class="grid g2" style="margin:0">' +
      '<div class="card" style="padding:20px;background:#FFF8F1;border-color:#F5DCC4"><span style="color:#C2410C;font-size:30px">' + ic("heart-pulse") + '</span><div style="font-weight:700;font-size:17px;margin-top:8px">Club A · Corazonada</div><div style="font-size:13.5px;color:#6B5444;margin-top:4px">Decide fichajes, precios e inversión según la experiencia del directivo.</div></div>' +
      '<div class="card" style="padding:20px;background:#F0FAF3;border-color:#BFE3CB"><span style="color:#136F3E;font-size:30px">' + ic("chart-column") + '</span><div style="font-weight:700;font-size:17px;margin-top:8px">Club B · Datos + criterio</div><div style="font-size:13.5px;color:#3B5A45;margin-top:4px">Combina la experiencia con evidencia, indicadores y modelos.</div></div></div>' +
      '<div class="card" style="padding:22px;background:#0B3B24;color:#fff;display:flex;gap:20px;align-items:center"><div class="stat">43,2 %</div><div style="font-size:14px;opacity:.9">de 569 organizaciones deportivas europeas no usa tecnologías de análisis de datos <span style="opacity:.6">(Magaz-González et al., 2024)</span></div></div></div>' + actVF(p) + "</div>";
  };

  R.p5 = function (p) {
    inits.push(function () { $$(".flip").forEach(function (f) { f.addEventListener("click", function () { f.classList.toggle("f"); }); }); });
    return lead(p) + '<div class="flips" style="margin-top:16px;max-width:1240px">' + p.tarjetas.map(function (t) {
      return '<button class="flip" aria-label="Girar tarjeta ' + esc(t.t) + '"><div class="in"><div class="fa"><div class="ic">' + ic(t.i) + '</div><div style="font-weight:700;font-size:15px;color:#0B3B24">' + esc(t.t) + '</div><div class="muted">' + ic("rotate-cw") + ' Toca para girar</div></div><div class="fb2"><div style="font-size:11px;letter-spacing:.12em;color:#F2B705;font-weight:700">DEFINICIÓN</div><div style="font-weight:700;font-size:14.5px;margin:6px 0">' + esc(t.t) + '</div><div style="font-size:12.5px;opacity:.92;text-align:left">' + esc(t.d) + '</div><div style="font-size:12px;margin-top:auto;background:rgba(255,255,255,.12);padding:8px;border-radius:8px;text-align:left">Ej.: ' + esc(t.e) + "</div></div></div></button>";
    }).join("") + '</div><div class="grid" style="grid-template-columns:1fr">' + actClass(p, 5) + "</div>";
  };

  R.p6 = function (p) {
    var box = function (t, n, dark) { return '<div style="background:' + (dark ? "#0F5132" : "#fff") + ";border:1.5px solid " + (dark ? "#0F5132" : "#CFE0D5") + ";border-radius:14px;padding:11px 14px;color:" + (dark ? "#fff" : "#4A5D51") + '"><div style="font-size:12.5px">' + t + '</div><div style="font-size:' + (dark ? 32 : 27) + "px;font-weight:700;color:" + (dark ? "#F2B705" : "#0F5132") + ';line-height:1.1">' + n + "</div></div>"; };
    var ex = function (t, n) { return '<div style="background:#FFF6F3;border:1.5px solid #F3D1C6;border-radius:14px;padding:9px 14px"><div style="font-size:12px;color:#7A4A3A">' + t + '</div><div style="font-size:21px;font-weight:700;color:#B4442A">' + n + "</div></div>"; };
    var stg = ["IDENTIFICACIÓN", "CRIBADO", "ELEGIBILIDAD", "INCLUSIÓN"];
    var rows = [[box("Registros identificados en bases académicas", "74"), ex("Duplicados eliminados", "− 14")], [box("Registros cribados (sin duplicados)", "60"), ex("Fuentes no académicas", "− 18")], [box("Artículos evaluados a texto completo", "42"), ex("Razones metodológicas y temáticas", "− 12")], [box("Estudios incluidos en la síntesis", "30", true), ""]];
    var flow = '<div class="card" style="padding:18px">' + rows.map(function (r, k) {
      return '<div class="prow" style="margin-top:' + (k ? 10 : 0) + 'px"><div class="pstage">' + stg[k] + "</div>" + r[0] + '<div style="color:#9FC2AC;font-size:20px;text-align:center">' + (r[1] ? ic("arrow-right") : "") + "</div>" + r[1] + "</div>";
    }).join("") + "</div>";
    return lead(p) + '<div class="grid g21">' + flow + actOrder(p) + "</div>";
  };

  R.p7 = function (p) {
    var nodes = [["Dato", 195, 40], ["Análisis", 330, 140], ["Decisión", 290, 295], ["Resultado", 100, 295], ["Nuevo dato", 60, 140]];
    var svg = '<svg viewBox="0 0 390 350" style="width:100%;max-width:400px" role="img" aria-label="Ciclo de decisión"><circle cx="195" cy="175" r="120" fill="none" stroke="#E1E9E3" stroke-width="22"/><circle cx="195" cy="175" r="120" fill="none" stroke="#2E9E5B" stroke-width="22" stroke-dasharray="560 754" stroke-linecap="round" transform="rotate(-90 195 175)"/>' +
      '<text x="195" y="168" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="21" fill="#0B3B24">Ciclo de</text><text x="195" y="194" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="21" fill="#0B3B24">decisión</text>' +
      nodes.map(function (n, i) { return '<circle cx="' + n[1] + '" cy="' + n[2] + '" r="36" fill="' + (i === 2 ? "#F2B705" : "#0F5132") + '"/><text x="' + n[1] + '" y="' + (n[2] + 5) + '" text-anchor="middle" font-family="Poppins" font-weight="600" font-size="12" fill="' + (i === 2 ? "#0B3B24" : "#fff") + '">' + n[0] + "</text>"; }).join("") + "</svg>";
    return lead(p) + '<div class="grid g12"><div class="card" style="padding:16px;display:flex;align-items:center;justify-content:center">' + svg + "</div>" + actSel(p) + "</div>";
  };

  R.p8 = function (p) {
    var lv = [["Nivel 1", "Papel y hojas de cálculo sueltas", "file-spreadsheet", 90], ["Nivel 2", "Datos digitalizados por área", "folder-open", 130], ["Nivel 3", "Tableros integrados de gestión", "layout-dashboard", 175], ["Nivel 4", "Organización guiada por datos", "brain-circuit", 220]];
    var col = ["#DCE9E0", "#A9D2B6", "#2E9E5B", "#0F5132"];
    return lead(p) + '<div class="grid" style="grid-template-columns:1fr"><div class="card" style="padding:22px"><div class="row" style="justify-content:space-between"><span class="tag">' + ic("chart-no-axes-column-increasing") + ' Escala de madurez digital</span><span class="muted">¿En qué nivel está el club de tu ciudad?</span></div><div class="ladder">' +
      lv.map(function (l, k) { return '<div style="flex:1;min-height:' + l[3] + "px;border-radius:14px 14px 6px 6px;background:" + col[k] + ";padding:14px;color:" + (k > 1 ? "#fff" : "#0B3B24") + ';position:relative"><span style="font-size:24px">' + ic(l[2]) + '</span><div style="font-weight:700;font-size:14px;margin-top:4px">' + l[0] + '</div><div style="font-size:12.5px;opacity:.9">' + l[1] + "</div>" + (k === 1 ? '<div style="position:absolute;top:-34px;left:50%;transform:translateX(-50%);background:#F2B705;color:#0B3B24;font-size:11px;font-weight:700;padding:5px 10px;border-radius:999px;white-space:nowrap">Club Andes</div>' : "") + "</div>"; }).join("") +
      "</div></div>" + actFill(p) + "</div>";
  };

  R.p9 = function (p) {
    var k4 = [["Ocupación del estadio", "78 %", "+6 pts", "armchair"], ["Ingreso por aficionado", "$ 42 mil", "+9 %", "wallet"], ["Renovación de abonos", "71 %", "−3 pts", "repeat"], ["Seguidores digitales", "1,2 M", "+15 %", "smartphone"]];
    var bars = [62, 74, 58, 81, 88, 70, 92];
    var chart = '<svg viewBox="0 0 560 170" style="width:100%" role="img" aria-label="Asistencia por partido">' + bars.map(function (b, i) { return '<rect x="' + (20 + i * 76) + '" y="' + (150 - b * 1.35) + '" width="44" height="' + (b * 1.35) + '" rx="6" fill="' + (i === 6 ? "#F2B705" : "#2E9E5B") + '"/><text x="' + (42 + i * 76) + '" y="' + (144 - b * 1.35) + '" text-anchor="middle" font-size="11" font-family="Poppins" fill="#4A5D51">' + b + "</text>"; }).join("") + '<line x1="10" y1="150" x2="550" y2="150" stroke="#DCE5DF"/></svg>';
    return lead(p) + '<div class="grid g4">' + k4.map(function (k) { return '<div class="card kpi"><div class="row" style="justify-content:space-between;color:#6B7F72;font-size:12.5px">' + k[0] + '<span style="color:#2E9E5B">' + ic(k[3]) + '</span></div><div class="v">' + k[1] + '</div><div style="font-size:12px;font-weight:600;color:' + (k[2][0] === "−" ? "#B4442A" : "#2E9E5B") + '">' + k[2] + " vs. temporada anterior</div></div>"; }).join("") + "</div>" +
      '<div class="grid g2"><div class="card" style="padding:16px"><div style="font-weight:600;font-size:14px;color:#0B3B24">Asistencia por partido (%)</div>' + chart + '<div class="muted">Datos ficticios con fines didácticos.</div></div>' + actClass(p, 3) + "</div>";
  };

  R.p10 = function (p) {
    var svg = '<svg viewBox="0 0 540 270" style="width:100%" role="img" aria-label="Asistencia histórica y pronóstico"><g stroke="#EEF3F0">' + [0, 1, 2, 3, 4].map(function (i) { return '<line x1="30" x2="530" y1="' + (30 + i * 50) + '" y2="' + (30 + i * 50) + '"/>'; }).join("") + "</g>" +
      '<path d="M340,120 L390,95 L440,105 L490,70 L530,60 L530,140 L490,140 L440,155 L390,140 L340,130 Z" fill="rgba(242,183,5,.22)"/><polyline points="30,200 80,185 130,195 180,160 230,170 280,140 340,125" fill="none" stroke="#0F5132" stroke-width="3.5"/><polyline points="340,125 390,118 440,130 490,105 530,100" fill="none" stroke="#C99700" stroke-width="3.5" stroke-dasharray="8 6"/>' +
      '<line x1="340" y1="20" x2="340" y2="235" stroke="#9FC2AC" stroke-dasharray="4 4"/><text x="346" y="34" font-size="11" font-family="Poppins" fill="#6B7F72">Hoy</text><text x="30" y="258" font-size="11" font-family="Poppins" fill="#6B7F72">Fechas pasadas</text><text x="430" y="258" font-size="11" font-family="Poppins" fill="#B48700">Pronóstico</text></svg>';
    return lead(p) + '<div class="grid g12"><div class="card" style="padding:18px"><div class="row" style="justify-content:space-between"><div style="font-weight:600;font-size:14px;color:#0B3B24">Asistencia histórica y pronóstico</div><span class="tag">Series de tiempo</span></div>' + svg + '<div class="muted">Gráfica ilustrativa.</div></div>' + actClass(p, 3) + "</div>";
  };

  R.p10_1 = function (p) {
    var rows = [[6, "85", "$ 1,2 M", "Alta", 4, "Sí"], [1, "30", "$ 0,3 M", "Baja", 22, "No"], [3, "62", "$ 0,8 M", "Media", 9, "Sí"], [2, "25", "$ 0,2 M", "Nula", 31, "No"], [8, "90", "$ 1,5 M", "Alta", 6, "Sí"]];
    var t = '<table class="data"><tr>' + ["Antigüedad (años)", "Asistencia (%)", "Gasto anual", "Uso de la app", "Distancia (km)"].map(function (h) { return "<th>" + h + "</th>"; }).join("") + '<th class="y">¿Renovó?</th></tr>' +
      rows.map(function (r) { return "<tr>" + r.map(function (c, j) { return "<td" + (j === 5 ? ' style="font-weight:700;background:#FFFBEA;color:' + (c === "Sí" ? "#136F3E" : "#B4442A") + '"' : "") + ">" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table>";
    return lead(p) + '<div class="grid g21"><div class="card" style="padding:18px"><div class="row" style="justify-content:space-between"><div style="font-weight:600;font-size:14px;color:#0B3B24">Base de socios del Club Deportivo Andes</div><span class="muted">Datos ficticios</span></div><div style="overflow-x:auto;margin-top:10px">' + t + '</div><div class="row" style="margin-top:12px"><div style="flex:5;border-radius:10px;background:#E6F4EA;padding:8px 12px;font-size:12.5px;color:#0F5132;font-weight:600">' + ic("arrow-right-left") + ' X · Variables predictoras</div><div style="flex:2;border-radius:10px;background:#FFF5D1;padding:8px 12px;font-size:12.5px;color:#7A5A00;font-weight:600">' + ic("target") + " Y · Variable objetivo</div></div></div>" + actClass(p, 3) + "</div>";
  };

  R.p10_2 = function (p) {
    var tr = [70, 52, 40, 31, 24, 18, 13, 9, 6, 4], va = [72, 56, 45, 38, 34, 33, 36, 42, 50, 58];
    var X = function (i) { return 40 + i * 52; }, Y = function (v) { return 240 - v * 2.6; };
    var path = function (a) { return a.map(function (v, i) { return (i ? "L" : "M") + X(i) + "," + Y(v); }).join(" "); };
    var svg = '<svg viewBox="0 0 560 285" style="width:100%" role="img" aria-label="Error frente a complejidad"><rect x="' + X(5.5) + '" y="20" width="' + (X(9) - X(5.5) + 10) + '" height="222" fill="rgba(180,68,42,.08)"/><text x="' + X(6.2) + '" y="40" font-family="Poppins" font-size="12" font-weight="600" fill="#B4442A">Zona de sobreajuste</text>' +
      '<line x1="40" y1="242" x2="530" y2="242" stroke="#DCE5DF"/><line x1="40" y1="20" x2="40" y2="242" stroke="#DCE5DF"/><path d="' + path(tr) + '" fill="none" stroke="#0F5132" stroke-width="3.5"/><path d="' + path(va) + '" fill="none" stroke="#C99700" stroke-width="3.5" stroke-dasharray="8 5"/>' +
      '<circle cx="' + X(5) + '" cy="' + Y(33) + '" r="7" fill="#F2B705" stroke="#0B3B24" stroke-width="2"/><text x="' + (X(5) - 40) + '" y="' + (Y(33) + 26) + '" font-family="Poppins" font-size="11.5" font-weight="600" fill="#0B3B24">Punto óptimo</text>' +
      '<text x="44" y="268" font-family="Poppins" font-size="11.5" fill="#6B7F72">Simple</text><text x="470" y="268" font-family="Poppins" font-size="11.5" fill="#6B7F72">Complejo</text><g font-family="Poppins" font-size="12"><rect x="300" y="64" width="12" height="4" fill="#0F5132"/><text x="318" y="70" fill="#33463A">Error en entrenamiento</text><rect x="300" y="84" width="12" height="4" fill="#C99700"/><text x="318" y="90" fill="#33463A">Error en validación</text></g></svg>';
    return lead(p) + '<div class="grid g12"><div style="display:flex;flex-direction:column;gap:14px"><div class="card" style="padding:18px"><div style="font-weight:600;font-size:14px;color:#0B3B24">1 · Dividir los datos</div><div style="display:flex;height:46px;border-radius:12px;overflow:hidden;margin-top:12px;font-size:13px;font-weight:700"><div style="flex:7;background:#0F5132;color:#fff;display:flex;align-items:center;justify-content:center">70 % Entrenamiento</div><div style="flex:3;background:#F2B705;color:#0B3B24;display:flex;align-items:center;justify-content:center">30 % Validación</div></div><div class="muted" style="margin-top:10px">El modelo aprende con el 70 % y se evalúa con el 30 % que nunca vio.</div></div>' + actSel(p) + '</div><div class="card" style="padding:18px"><div class="row" style="justify-content:space-between"><div style="font-weight:600;font-size:14px;color:#0B3B24">2 · Error vs. complejidad del modelo</div><span class="muted">Ilustrativo</span></div>' + svg + "</div></div>";
  };

  R.p10_3 = function (p) {
    var imp = [["Asistencia a partidos", 88], ["Uso de la app", 64], ["Antigüedad", 47], ["Gasto anual", 35], ["Distancia al estadio", 18]];
    return lead(p) + '<div class="grid g3x"><div class="card" style="padding:18px;text-align:center"><div style="font-size:12px;letter-spacing:.12em;color:#6B7F72;font-weight:600">SOCIO #2045</div><svg viewBox="0 0 220 130" style="width:100%;max-width:220px;margin-top:6px" role="img" aria-label="Probabilidad 0,72"><path d="M20,115 A90,90 0 0 1 200,115" fill="none" stroke="#EEF3F0" stroke-width="20" stroke-linecap="round"/><path d="M20,115 A90,90 0 0 1 177,55" fill="none" stroke="#B4442A" stroke-width="20" stroke-linecap="round"/><text x="110" y="105" text-anchor="middle" font-family="Poppins" font-weight="700" font-size="34" fill="#0B3B24">0,72</text></svg>' +
      '<div style="font-size:14px;font-weight:700;color:#B4442A">Riesgo alto de no renovar</div><div class="muted">Umbral de alerta: 0,60</div><div class="btn p" style="margin-top:14px;height:40px;font-size:13px;justify-content:center;width:100%">' + ic("phone") + " Priorizar contacto</div></div>" +
      '<div class="card" style="padding:18px"><div style="font-weight:600;font-size:14px;color:#0B3B24">¿Qué variables pesan más?</div><div class="muted">Importancia relativa · datos ficticios</div>' + imp.map(function (v) { return '<div style="margin-top:12px;font-size:13px;color:#33463A">' + v[0] + '<div class="mbar"><i style="width:' + v[1] + '%"></i></div></div>'; }).join("") +
      '<div style="margin-top:14px;font-size:12px;color:#7A5A00;background:#FFF8E1;border-radius:10px;padding:8px 10px">' + ic("triangle-alert") + " Importancia no es causalidad</div></div>" + actSel(p) + "</div>";
  };

  R.p11 = function (p) {
    var seg = [["Fiel", "heart", "Abonado hace 5+ años", "Asiste 90 %", "#0F5132"], ["Ocasional", "calendar-days", "Va a clásicos", "Asiste 20 %", "#2E9E5B"], ["Digital", "smartphone", "Sigue en redes", "Compra online", "#136F3E"], ["Familiar", "baby", "Va en grupo", "Sensible al precio", "#C99700"]];
    return lead(p) + '<div class="grid g4">' + seg.map(function (s) { return '<div class="card" style="overflow:hidden"><div style="background:' + s[4] + ';height:84px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:38px">' + ic(s[1]) + '</div><div style="padding:14px"><div style="font-size:11px;font-weight:700;letter-spacing:.12em;color:#6B7F72">SEGMENTO</div><div style="font-size:19px;font-weight:700;color:#0B3B24">' + s[0] + '</div><div style="font-size:12.5px;color:#4A5D51;margin-top:4px">' + s[2] + "<br>" + s[3] + "</div></div></div>"; }).join("") + '</div><div class="grid" style="grid-template-columns:1fr">' + actSel(p) + "</div>";
  };

  /* ---- simulador ---- */
  R.p12 = function (p) {
    var S = p.simulador, id = "sim";
    inits.push(function () {
      var root = $("#" + id), step = 0, v = JSON.parse(JSON.stringify(S.inicial)), log = [];
      function inds() {
        return [["Madurez digital", v.madurez, "#2E9E5B"], ["Finanzas", v.finanzas, "#F2B705"], ["Satisfacción de socios", v.socios, "#136F3E"]].map(function (x) {
          return '<div class="card ind"><div class="t">' + x[0] + "<span>" + x[1] + '</span></div><div class="mbar"><i style="width:' + Math.max(0, Math.min(100, x[1])) + "%;background:" + x[2] + '"></i></div></div>';
        }).join("") + '<div class="card ind muted" style="display:flex;gap:10px">' + ic("git-branch") + "Escenario ramificado: 3 decisiones, 8 finales posibles.</div>";
      }
      function paint(chosen) {
        if (step >= S.decisiones.length) return result();
        var d = S.decisiones[step];
        $(".simmain", root).innerHTML = '<div class="row"><span class="tag" style="background:rgba(242,183,5,.2);color:#F2B705">Decisión ' + (step + 1) + " de " + S.decisiones.length + '</span><span style="font-size:13px;opacity:.7">' + esc(d.contexto) + '</span></div><div style="font-size:21px;font-weight:600;margin:14px 0 16px;line-height:1.35">' + esc(d.q) + '</div><div class="grid g2" style="margin:0">' +
          d.ops.map(function (o, k) { return '<button class="simop' + (chosen != null ? (k === 1 ? " ok" : k === chosen ? " bad" : "") : "") + '" data-k="' + k + '"' + (chosen != null ? " disabled" : "") + '><span style="font-size:26px">' + ic(o.i) + "</span><b>" + esc(o.t) + "</b>" + esc(o.d) + "</button>"; }).join("") + "</div>" +
          (chosen != null ? '<div class="fb' + (chosen === 1 ? "" : " bad") + '" style="color:#14261C">' + ic(chosen === 1 ? "lightbulb" : "info") + "<div><b>" + (chosen === 1 ? "Decisión recomendada. " : "Decisión débil. ") + "</b>" + esc(d.ops[chosen].fb) + ' <span style="opacity:.75">(' + efTxt(d.ops[chosen].ef) + ')</span></div></div><div class="row" style="margin-top:14px"><button class="btn y nextd">' + (step === S.decisiones.length - 1 ? "Ver resultado" : "Siguiente decisión") + " " + ic("arrow-right") + "</button></div>" : "");
        $(".siminds", root).innerHTML = inds();
        $$(".simop", root).forEach(function (b) { b.addEventListener("click", function () { var k = +b.dataset.k, ef = d.ops[k].ef; Object.keys(ef).forEach(function (x) { v[x] += ef[x]; }); log.push(k === 1); paint(k); }); });
        var nx = $(".nextd", root); if (nx) nx.addEventListener("click", function () { step++; paint(); });
      }
      function efTxt(ef) { var n = { madurez: "Madurez", finanzas: "Finanzas", socios: "Socios" }; return Object.keys(ef).map(function (k) { return n[k] + " " + (ef[k] >= 0 ? "+" : "−") + Math.abs(ef[k]); }).join(" · "); }
      function result() {
        var score = Math.max(0, Math.min(100, v.madurez)), lv = S.niveles.filter(function (n) { return score >= n.min; })[0];
        $(".simmain", root).innerHTML = '<span class="tag" style="background:rgba(242,183,5,.2);color:#F2B705">Resultado final</span><div style="display:flex;align-items:baseline;gap:14px;margin-top:12px"><div class="stat" style="font-size:64px">' + score + '</div><div style="font-size:22px;font-weight:700">' + esc(lv.t) + '</div></div><p style="opacity:.9;margin-top:6px">' + esc(lv.d) + "</p>" +
          '<div style="margin-top:16px;font-size:13px">Tu club<div class="mbar" style="background:rgba(255,255,255,.15)"><i style="width:' + score + '%;background:#F2B705"></i></div></div><div style="margin-top:10px;font-size:13px">Organización de alta madurez digital<div class="mbar" style="background:rgba(255,255,255,.15)"><i style="width:' + S.referencia + '%;background:#2E9E5B"></i></div></div>' +
          '<div style="margin-top:12px;font-size:13px;opacity:.85">Decisiones recomendadas: ' + log.filter(Boolean).length + " de " + log.length + '</div><div class="row" style="margin-top:16px"><button class="btn y again">' + ic("rotate-ccw") + " Volver a intentarlo</button></div>";
        $(".siminds", root).innerHTML = inds();
        $(".again", root).addEventListener("click", function () { step = 0; v = JSON.parse(JSON.stringify(S.inicial)); log = []; paint(); });
        markDone(p.id);
      }
      paint();
    });
    return lead(p) + '<div class="grid gside" id="' + id + '"><div class="card sim-dark simmain"></div><div class="siminds" style="display:flex;flex-direction:column;gap:12px"></div></div>';
  };

  /* ---- evaluación ---- */
  R.p13 = function (p) {
    var Q = p.preguntas, id = "quiz";
    inits.push(function () {
      var root = $("#" + id), k = 0, res = [], order = Q.map(function (_, i) { return i; });
      function board() {
        var okN = res.filter(Boolean).length;
        $(".board", root).innerHTML = '<div style="font-size:12px;letter-spacing:.14em;opacity:.7">MARCADOR</div><div class="big">' + okN + '<span style="color:#fff;opacity:.5"> / ' + Q.length + '</span></div><div style="font-size:13px;opacity:.8">Meta: ' + Math.ceil(Q.length * C.aprobacion / 100) + ' respuestas correctas</div><div class="qdots">' + Q.map(function (_, i) { return '<i class="' + (i < res.length ? (res[i] ? "ok" : "bad") : "") + '"></i>'; }).join("") + '</div><div style="margin-top:22px;color:#F2B705;font-size:54px">' + ic("trophy") + "</div>" +
          (st.q != null ? '<div style="font-size:12px;opacity:.75;margin-top:6px">Mejor puntaje: ' + st.q + " %</div>" : "");
      }
      function paint(ans) {
        var q = Q[order[k]];
        var L = "ABC";
        $(".qmain", root).innerHTML = '<div class="row" style="justify-content:space-between"><span class="tag"' + (q.tipo === "Caso" ? ' style="background:#FFF5D1;color:#8A6400"' : "") + ">" + q.tipo + " · Pregunta " + (k + 1) + " de " + Q.length + '</span><span class="muted">' + ic("timer") + ' Sin límite de tiempo</span></div><div class="mbar" style="margin-top:12px"><i style="width:' + (k / Q.length * 100) + '%"></i></div>' +
          '<div class="act-q" style="font-size:17px;margin-top:16px">' + esc(q.q) + "</div>" +
          q.ops.map(function (o, j) { var cls = ans == null ? "" : j === q.ok ? " ok" : j === ans ? " bad" : ""; return '<button class="opt' + cls + '" data-j="' + j + '"' + (ans != null ? " disabled" : "") + '><span class="l">' + L[j] + "</span>" + esc(o) + "</button>"; }).join("") +
          (ans != null ? '<div class="fb' + (ans === q.ok ? "" : " bad") + '">' + ic(ans === q.ok ? "lightbulb" : "info") + "<div><b>" + (ans === q.ok ? "¡Correcto! " : "Incorrecto. ") + "</b>" + esc(q.exp) + (ans === q.ok ? "" : " <b>Repasa: " + esc(q.rep) + ".</b>") + '</div></div><div class="row" style="margin-top:14px"><button class="btn p nq">' + (k === Q.length - 1 ? "Ver resultado" : "Siguiente pregunta") + " " + ic("arrow-right") + "</button></div>" : "");
        $$(".opt", root).forEach(function (b) { b.addEventListener("click", function () { var j = +b.dataset.j; res.push(j === q.ok); board(); paint(j); }); });
        var nq = $(".nq", root); if (nq) nq.addEventListener("click", function () { k++; if (k >= Q.length) end(); else paint(); });
      }
      function end() {
        var okN = res.filter(Boolean).length, pct = Math.round(okN / Q.length * 100), pass = pct >= C.aprobacion;
        st.q = Math.max(st.q || 0, pct); markDone(p.id); save();
        SCORM.score(st.q, st.q >= C.aprobacion);
        var wrong = []; res.forEach(function (r, i) { if (!r) wrong.push(Q[order[i]].rep); });
        $(".qmain", root).innerHTML = '<span class="tag">' + ic(pass ? "trophy" : "rotate-ccw") + " Resultado</span><div style=\"font-size:46px;font-weight:700;color:" + (pass ? "#136F3E" : "#B4442A") + ';margin-top:10px">' + okN + " de " + Q.length + " · " + pct + ' %</div><div class="fb' + (pass ? "" : " bad") + '">' + ic(pass ? "lightbulb" : "info") + "<div>" + (pass ? "<b>¡Lograste el objetivo!</b> Superaste el 80 % de la evaluación final." : "<b>Aún no alcanzas el 80 %.</b> Repasa: " + esc(wrong.filter(function (x, i, a) { return a.indexOf(x) === i; }).join(", ")) + " y vuelve a intentarlo.") + '</div></div><div class="row" style="margin-top:16px"><button class="btn p again">' + ic("rotate-ccw") + ' Intentar de nuevo</button><button class="btn g" data-go="' + idx("p14") + '">Ir a conclusiones ' + ic("arrow-right") + "</button></div>";
        $(".again", root).addEventListener("click", function () { k = 0; res = []; board(); paint(); });
        board();
      }
      board(); paint();
    });
    return lead(p) + '<div class="grid gside" id="' + id + '"><div class="card act qmain" style="padding:22px"></div><div class="card score board"></div></div>';
  };

  R.cierre = function (p) {
    var f = [["Decisiones estratégicas", 8, 10], ["Transformación digital", 55, 10], ["BI y conocimiento", 31, 42], ["Analítica predictiva", 8, 74], ["Marketing con datos", 55, 74]];
    var pitch = '<div class="card pitch"><svg viewBox="0 0 580 340" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%"><g stroke="rgba(255,255,255,.18)" stroke-width="2" fill="none"><rect x="18" y="18" width="544" height="304" rx="6"/><line x1="290" y1="18" x2="290" y2="322"/><circle cx="290" cy="170" r="50"/></g></svg>' +
      f.map(function (x, i) { return '<div class="pchip" style="left:' + x[1] + "%;top:" + x[2] + '%;display:flex;align-items:center;gap:10px;background:#fff;border-radius:999px;padding:6px 14px 6px 6px;box-shadow:0 6px 16px rgba(0,0,0,.2)"><span style="width:32px;height:32px;border-radius:32px;background:#F2B705;display:flex;align-items:center;justify-content:center;font-weight:700;color:#0B3B24">' + (i + 1) + '</span><span style="font-size:13px;font-weight:600;color:#0B3B24">' + x[0] + "</span></div>"; }).join("") + "</div>";
    return lead(p) + '<div class="grid g21">' + pitch + '<div style="display:flex;flex-direction:column;gap:14px"><div class="card" style="padding:18px"><div class="row" style="font-weight:700;color:#0B3B24"><span style="color:#2E9E5B">' + ic("trending-up") + '</span> Tendencias</div><div style="font-size:13.5px;color:#4A5D51;margin-top:6px">' + esc(p.tendencias) + '</div></div><div class="card" style="padding:18px;background:#FFF8E1;border-color:#F5E1A4"><div class="row" style="font-weight:700;color:#7A5A00">' + ic("search") + ' Vacíos</div><div style="font-size:13.5px;color:#6B5A2A;margin-top:6px">' + esc(p.vacios) + '</div></div><button class="btn p" data-go="' + idx("p14_1") + '" style="justify-content:center">Ver la zona de oportunidad ' + ic("arrow-right") + "</button></div></div>";
  };

  R.oportunidad = function (p) {
    var id = "refl";
    inits.push(function () {
      var root = $("#" + id);
      $(".send", root).addEventListener("click", function () {
        var t = $("textarea", root).value.trim();
        $(".fbx", root).innerHTML = t.length < 10 ? '<div class="fb bad">' + ic("info") + "<div>Escribe tu pregunta antes de enviarla.</div></div>" : '<div class="fb">' + ic("lightbulb") + "<div>" + esc(p.reflexion.fb) + "</div></div>";
      });
    });
    return lead(p) + '<div class="grid g21"><div class="card" style="padding:18px"><div class="row" style="justify-content:space-between"><div style="font-weight:600;font-size:14px;color:#0B3B24">Los 30 estudios de la revisión, por categoría</div><span class="tag">Matriz PRISMA</span></div>' +
      p.categorias.map(function (c) { return '<div class="row" style="margin-top:12px;flex-wrap:nowrap"><div style="width:44%;font-size:12.5px;color:#33463A">' + esc(c[0]) + '</div><div style="flex:1;height:20px;background:#F2F5F3;border-radius:6px"><div style="height:100%;width:' + (c[1] / 16 * 100) + "%;background:" + (c[2] ? "#2E9E5B" : "#B4B4B4") + ';border-radius:6px"></div></div><b style="width:24px;color:#0B3B24">' + c[1] + "</b></div>"; }).join("") +
      '<div class="grid g3s"><div style="border-radius:12px;background:#F2F5F3;padding:12px"><div style="font-size:28px;font-weight:700;color:#6B6B6B">16</div><div class="muted">estudios en empresas de otros sectores</div></div><div style="border-radius:12px;background:#E6F4EA;padding:12px"><div style="font-size:28px;font-weight:700;color:#0F5132">14</div><div class="muted">estudios centrados en el deporte</div></div><div style="border-radius:12px;background:#FFF5D1;padding:12px"><div style="font-size:28px;font-weight:700;color:#8A6400">1</div><div class="muted">en organizaciones deportivas de Latinoamérica</div></div></div></div>' +
      '<div style="display:flex;flex-direction:column;gap:12px"><div class="card" style="padding:16px;background:#0B3B24;color:#fff;border:none"><div style="font-size:12px;letter-spacing:.12em;color:#F2B705;font-weight:700">PREGUNTAS ABIERTAS PARA LA REGIÓN</div>' + p.preguntasAbiertas.map(function (q) { return '<div class="row" style="margin-top:10px;font-size:13px;flex-wrap:nowrap;align-items:flex-start"><span style="color:#F2B705;font-size:18px">' + ic("lightbulb") + "</span>" + esc(q) + "</div>"; }).join("") + "</div>" +
      '<div class="card act" id="' + id + '"><span class="tag">' + ic("pencil-line") + ' Tu turno · Reflexión</span><div class="act-q">' + esc(p.reflexion.q) + '</div><textarea placeholder="Escribe aquí…" aria-label="Tu pregunta de investigación"></textarea><div class="row" style="margin-top:10px"><button class="btn p send">' + ic("send") + ' Enviar</button><span class="muted">Actividad no calificable.</span></div><div class="fbx"></div></div></div></div>';
  };

  R.creditos = function (p) {
    return '<div class="grid g21"><div class="card" style="padding:24px"><div class="md">' + p.metadatos.map(function (m) { return '<div class="k">' + esc(m[0]) + "</div><div>" + esc(m[1]) + "</div>"; }).join("") + '</div></div><div style="display:flex;flex-direction:column;gap:14px"><div class="card" style="padding:24px;background:#000;color:#fff;border:none"><div style="font-size:26px;font-weight:700">CC BY-NC-SA</div><div style="font-size:13px;opacity:.85">Atribución · No comercial · Compartir igual</div><div style="font-size:12.5px;opacity:.65;margin-top:10px">Los ODC de los creadores de oportunidades cuentan con esta licencia.</div></div><div class="card" style="padding:20px;background:#FFF8E1;border-color:#F2DE9B;font-size:13.5px;color:#3D3A2A"><b style="color:#8A6400">Licenciamiento.</b> Todo recurso externo (imágenes, audios, videos) tiene licencia Creative Commons o Copyleft y se referencia en APA 7. Infografías y gráficos: elaboración propia.</div></div></div>';
  };

  R.referencias = function (p) { return '<div class="refs">' + p.referencias.map(function (r) { return "<p>" + esc(r) + "</p>"; }).join("") + "</div>"; };

  /* ---------------- render ---------------- */
  function render() {
    stopAudio(); audio = null; audioMissing = false; inits = [];
    var p = P[st.i]; visit(st.i); save();
    var key = R[p.id] ? p.id : p.tipo;
    var html = key === "portada" ? R.portada(p) : shell(p, R[key](p));
    document.getElementById("root").innerHTML = html;
    inits.forEach(function (f) { f(); });
    var sc = $("#scroll"); if (sc) sc.scrollTop = 0;
    // El Coach se minimiza cuando el usuario empieza a leer o a interactuar; tocar el avatar lo vuelve a abrir.
    var minimize = function () { var c = $("#coach"); if (c && !c.dataset.keep) c.classList.add("min"); };
    if (sc) { sc.addEventListener("scroll", function () { if (sc.scrollTop > 60) minimize(); }, { passive: true }); $$(".act, .simmain, .qmain", sc).forEach(function (a) { a.addEventListener("click", minimize, true); }); }
    var h = $("h1") || $(".cover h2"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }
  function go(i) { if (i < 0 || i >= P.length) return; st.i = i; render(); }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-act],[data-go],[data-mod]");
    if (!t) return;
    if (t.dataset.go != null) return go(+t.dataset.go);
    if (t.dataset.mod != null) return go(firstOfMod(+t.dataset.mod));
    var a = t.dataset.act;
    if (a === "next") go(st.i + 1);
    else if (a === "prev") go(st.i - 1);
    else if (a === "audio") toggleAudio();
    else if (a === "tr") showTranscript();
    else if (a === "min") { var c = $("#coach"); if (c) { c.classList.toggle("min"); c.dataset.keep = c.classList.contains("min") ? "" : "1"; } }
    else if (a === "side") { var s = $(".side"); if (s) s.classList.toggle("open"); }
  });
  document.addEventListener("keydown", function (e) {
    if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (e.key === "ArrowRight" && e.altKey) go(st.i + 1);
    if (e.key === "ArrowLeft" && e.altKey) go(st.i - 1);
  });

  /* ---------------- inicio ---------------- */
  SCORM.init();
  var saved = SCORM.loadState();
  if (saved) { st.i = saved.i || 0; st.v = saved.v || []; st.d = saved.d || []; st.q = saved.q != null ? saved.q : null; }
  render();
})();
