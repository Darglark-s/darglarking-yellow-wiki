/**
 * False Panacea — Delusion Assessment console diagnostic.
 */
(function () {
  "use strict";

  var MESSAGES = {
    a: [
      "> VECTOR LOCKED :: THEORY A — ALCHEMICAL STAGNATION",
      "> You crave transmutation. Permanent gold. A finished soul.",
      "> False Panacea becomes your Magnum Opus — and calcifies you mid-compile.",
      "> The trap is not failure. It is success that never ends, therefore never lives.",
      "> WARNING: Your preference for Theory A is the exact hook this entity uses.",
      "> Prescription: accept unfinished work. FUN requires iteration, not gold.",
    ].join("\n"),
    b: [
      "> VECTOR LOCKED :: THEORY B — FALSE IMMORTALITY",
      "> You crave preservation. No decay. A smile that never fades.",
      "> False Panacea becomes your stasis vault — choice dies inside the blessing.",
      "> The trap is not death. It is eternity without a next frame.",
      "> WARNING: Your preference for Theory B is the exact hook this entity uses.",
      "> Prescription: pathway-back over permanence. The storm went — you may move again.",
    ].join("\n"),
    c: [
      "> VECTOR LOCKED :: THEORY C — COMPRESSED ENGINE",
      "> You crave the honest horror beneath the smile. A savior that runs on pain.",
      "> False Panacea becomes your cynic's truth — and keeps you staring at the mask",
      "> instead of leaving. Even suspicion can be a comfortable loop.",
      "> WARNING: Your preference for Theory C is the exact hook this entity uses.",
      "> Prescription: do not only diagnose the trap. Walk out of it.",
    ].join("\n"),
    none: [
      "> ASSESSMENT INCOMPLETE :: NO THEORY SELECTED",
      "> False Panacea does not require your answer — only your desire for one.",
      "> Select the salvation you want most. Then read what that want reveals.",
    ].join("\n"),
  };

  var GENERIC_FOOTER = [
    "",
    "> —— MEMETIC MIRROR SUMMARY ——",
    "> Handler: whichever theory felt true is the cognitive vector of assimilation.",
    "> Untrue Luck is active when comfort replaces movement.",
    "> End diagnostic.",
  ].join("\n");

  function typeConsole(target, text) {
    target.textContent = "";
    var i = 0;
    function tick() {
      if (i >= text.length) return;
      target.textContent += text.charAt(i);
      i += 1;
      window.setTimeout(tick, 8 + Math.random() * 10);
    }
    tick();
  }

  function initFalsePanaceaAssessment() {
    var root = document.querySelector("[data-false-panacea-assessment]");
    if (!root) return;

    var runBtn = root.querySelector("[data-false-panacea-run]");
    var consoleWrap = root.querySelector("[data-false-panacea-console]");
    var consoleBody = root.querySelector("[data-false-panacea-console-body]");

    if (!runBtn || !consoleWrap || !consoleBody) return;

    runBtn.addEventListener("click", function () {
      var selected = root.querySelector('input[name="delusion-theory"]:checked');
      var key = selected ? selected.value : "none";
      var message = (MESSAGES[key] || MESSAGES.none) + GENERIC_FOOTER;

      consoleWrap.hidden = false;
      consoleWrap.classList.add("is-open");
      typeConsole(consoleBody, message);
      consoleWrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFalsePanaceaAssessment);
  } else {
    initFalsePanaceaAssessment();
  }
})();
