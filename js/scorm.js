/* Conexión SCORM 1.2 · funciona también sin plataforma (modo local) */
(function () {
  var api = null, ok = false, finished = false;
  function find(win) {
    try {
      var tries = 0;
      while (win && !win.API && win.parent && win.parent !== win && tries < 500) { tries++; win = win.parent; }
      return win && win.API ? win.API : null;
    } catch (e) { return null; } // ventana de otro origen: se trabaja en modo local
  }
  function getAPI() {
    var a = find(window);
    if (!a && window.opener) a = find(window.opener);
    return a;
  }
  function ls(k, v) {
    try { if (v === undefined) return window.localStorage.getItem(k); window.localStorage.setItem(k, v); } catch (e) { return null; }
  }
  var SC = {
    init: function () {
      api = getAPI();
      if (api) {
        ok = String(api.LMSInitialize("")) === "true";
        if (ok) {
          var st = api.LMSGetValue("cmi.core.lesson_status");
          if (st === "not attempted" || st === "") api.LMSSetValue("cmi.core.lesson_status", "incomplete");
          api.LMSCommit("");
        }
      }
      return ok;
    },
    connected: function () { return ok; },
    get: function (k) { return ok ? api.LMSGetValue(k) : null; },
    set: function (k, v) { if (ok) api.LMSSetValue(k, String(v)); },
    commit: function () { if (ok) api.LMSCommit(""); },
    loadState: function () {
      var raw = ok ? api.LMSGetValue("cmi.suspend_data") : ls("sal_state");
      try { return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
    },
    saveState: function (obj) {
      var raw = JSON.stringify(obj);
      if (ok) { api.LMSSetValue("cmi.suspend_data", raw.slice(0, 4000)); api.LMSCommit(""); } else ls("sal_state", raw);
    },
    location: function (loc) { if (ok) { api.LMSSetValue("cmi.core.lesson_location", loc); } },
    score: function (raw, passed) {
      if (!ok) return;
      api.LMSSetValue("cmi.core.score.min", "0");
      api.LMSSetValue("cmi.core.score.max", "100");
      api.LMSSetValue("cmi.core.score.raw", String(raw));
      api.LMSSetValue("cmi.core.lesson_status", passed ? "passed" : "failed");
      api.LMSCommit("");
    },
    finish: function () {
      if (ok && !finished) { finished = true; api.LMSCommit(""); api.LMSFinish(""); }
    },
  };
  window.SCORM = SC;
  window.addEventListener("beforeunload", function () { SC.finish(); });
  window.addEventListener("pagehide", function () { SC.finish(); });
})();
