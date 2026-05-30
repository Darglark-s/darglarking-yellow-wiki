/**
 * The Cipher — wind riddle gate (case-insensitive Ka / Fate / Karma / Luck).
 */
(function () {
  "use strict";

  var VALID = {
    ka: { label: "Ka", title: "Vital Signature" },
    fate: { label: "Fate", title: "Settling Pattern" },
    karma: { label: "Karma", title: "Action Ledger" },
    luck: { label: "Luck", title: "Wind-Borne Favor" },
  };

  function normalize(raw) {
    return (raw || "").trim().toLowerCase();
  }

  function initCipherGate() {
    var form = document.querySelector("[data-cipher-gate]");
    if (!form) return;

    var input = form.querySelector("#cipher-answer");
    var feedback = form.querySelector("[data-cipher-feedback]");
    var revealWrap = document.querySelector("[data-cipher-reveal-wrap]");
    var revealLabel = document.querySelector("[data-cipher-answer-label]");
    var revealBody = document.querySelector("[data-cipher-reveal-body]");

    function hideReveal() {
      if (!revealWrap) return;
      revealWrap.hidden = true;
      revealWrap.classList.remove("is-open");
    }

    function showReveal(key) {
      var meta = VALID[key];
      var explain = document.querySelector('[data-cipher-explain="' + key + '"]');
      if (!meta || !explain || !revealWrap || !revealBody) return;

      revealLabel.textContent = meta.label + " · " + meta.title;
      revealBody.innerHTML = explain.innerHTML;
      revealWrap.hidden = false;
      revealWrap.classList.add("is-open");
      revealWrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function setFeedback(message, tone) {
      if (!feedback) return;
      feedback.textContent = message;
      feedback.dataset.tone = tone || "";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var guess = normalize(input.value);

      if (!guess) {
        setFeedback("The wind waits. Speak a name.", "warn");
        hideReveal();
        return;
      }

      if (VALID[guess]) {
        setFeedback("Resonance lock confirmed :: " + VALID[guess].label.toUpperCase(), "ok");
        showReveal(guess);
        return;
      }

      setFeedback("No lock. The name is close to the wind — try again.", "neutral");
      hideReveal();
    });
  }

  document.addEventListener("DOMContentLoaded", initCipherGate);
})();
