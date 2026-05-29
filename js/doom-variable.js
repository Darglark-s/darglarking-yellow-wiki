/**
 * CON-779 · Cascading Consequences — World Tension / Doom Variable demo
 */
(function () {
  "use strict";

  var THRESHOLD = 75;
  var ACTIONS = {
    quest: { delta: 8, log: "Minor quest flag set · narrative branch ++" },
    orc: { delta: 5, log: "Low-level entity neutralized · sandbox noise ++" },
    loot: { delta: 6, log: "Loot probe executed · economy flag ++" },
  };

  function initDoomSimulator() {
    var root = document.querySelector("[data-doom-simulator]");
    if (!root) return;

    var meter = root.querySelector(".doom-meter");
    var readout = root.querySelector("[data-doom-readout]");
    var status = root.querySelector("[data-doom-status]");
    var logEl = root.querySelector("[data-doom-log]");
    var overload = root.querySelector("[data-doom-overload]");
    var tension = 0;
    var locked = false;

    function stamp() {
      return new Date().toISOString().slice(11, 19) + "Z";
    }

    function appendLog(line) {
      if (!logEl) return;
      var p = document.createElement("p");
      p.textContent = stamp() + " · " + line;
      logEl.insertBefore(p, logEl.firstChild);
      while (logEl.children.length > 8) {
        logEl.removeChild(logEl.lastChild);
      }
    }

    function render() {
      if (meter) meter.value = tension;
      if (readout) readout.textContent = tension + " / 100";
      if (status && !locked) {
        if (tension >= 50) {
          status.textContent = "Elevated tension · EX signature detected at arena center.";
        } else if (tension >= 25) {
          status.textContent = "Caution · progression flags accumulating.";
        } else {
          status.textContent = "Simulation nominal · EX boss dormant at arena center.";
        }
      }
    }

    function triggerOverload() {
      locked = true;
      var isFailsafe = overload && overload.classList.contains("doom-failsafe");
      if (status) {
        status.textContent = isFailsafe
          ? "SAFE-ROOM FAIL-SAFE · lockdown · simulation reset."
          : "HARD DISCONNECT · simulation script terminated.";
      }
      if (overload) overload.hidden = false;
      appendLog(
        isFailsafe
          ? "DOOM_VAR exceeded · Safe-Room Fail-Safe · residents shielded"
          : "DOOM_VAR exceeded · EX Final Boss early spawn · SERVER-CRASH RISK"
      );
      root.querySelectorAll("[data-doom-action]").forEach(function (btn) {
        btn.disabled = true;
      });
    }

    root.querySelectorAll("[data-doom-action]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (locked) return;
        var key = btn.getAttribute("data-doom-action");
        var action = ACTIONS[key];
        if (!action) return;
        tension = Math.min(100, tension + action.delta);
        appendLog(action.log + " (+" + action.delta + ")");
        render();
        if (tension >= THRESHOLD) {
          triggerOverload();
        }
      });
    });

    var resetBtn = root.querySelector("[data-doom-reset]");
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        tension = 0;
        locked = false;
        if (overload) overload.hidden = true;
        if (logEl) logEl.innerHTML = "";
        root.querySelectorAll("[data-doom-action]").forEach(function (btn) {
          btn.disabled = false;
        });
        appendLog("Simulation reset · DOOM_VAR cleared");
        render();
      });
    }

    render();
  }

  document.addEventListener("DOMContentLoaded", initDoomSimulator);
})();
