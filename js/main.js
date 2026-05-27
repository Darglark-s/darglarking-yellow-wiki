/**
 * The Darglarking Yellow — shared interaction layer
 */

(function () {
  "use strict";

  /** Invisible collapsible: whitespace-pixel trigger toggles sibling secret block */
  function initInvisibleCollapsibles() {
    document.querySelectorAll("[data-invisible-collapse]").forEach(function (root) {
      var trigger = root.querySelector(".invisible-trigger");
      var secret = root.querySelector(".collapsible-secret");
      if (!trigger || !secret) return;

      function toggle() {
        var open = secret.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
        secret.setAttribute("aria-hidden", open ? "false" : "true");
      }

      trigger.addEventListener("click", toggle);
      trigger.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  /** Optional: log highlight-reveal discovery (no spoilers in console) */
  function initHighlightReveal() {
    document.querySelectorAll(".secret-highlight").forEach(function (el) {
      el.addEventListener("mouseup", function () {
        var sel = window.getSelection();
        if (!sel || sel.isCollapsed) return;
        if (sel.toString().trim().length > 0 && el.contains(sel.anchorNode)) {
          el.dataset.discovered = "true";
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initInvisibleCollapsibles();
    initHighlightReveal();
  });
})();
