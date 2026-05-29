/**
 * Classified entity tab panels — single page, no per-entity nav entries.
 * Hash routing: classified.html#arrangement | #con-779
 */
(function () {
  "use strict";

  var DEFAULT_TAB = "arrangement";

  function getTabFromHash() {
    var hash = (window.location.hash || "").replace(/^#/, "").toLowerCase();
    if (!hash) return DEFAULT_TAB;
    var panel = document.querySelector('[data-entity-panel="' + hash + '"]');
    return panel ? hash : DEFAULT_TAB;
  }

  function activateTab(tabId) {
    document.querySelectorAll("[data-entity-tab]").forEach(function (btn) {
      var active = btn.getAttribute("data-entity-tab") === tabId;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    document.querySelectorAll("[data-entity-panel]").forEach(function (panel) {
      var show = panel.getAttribute("data-entity-panel") === tabId;
      panel.hidden = !show;
    });

    if (window.location.hash !== "#" + tabId) {
      history.replaceState(null, "", "classified.html#" + tabId);
    }
  }

  function initClassifiedTabs() {
    var root = document.querySelector("[data-classified-tabs]");
    if (!root) return;

    root.querySelectorAll("[data-entity-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activateTab(btn.getAttribute("data-entity-tab"));
      });
    });

    root.querySelectorAll("[data-entity-jump]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        activateTab(link.getAttribute("data-entity-jump"));
      });
    });

    activateTab(getTabFromHash());

    window.addEventListener("hashchange", function () {
      activateTab(getTabFromHash());
    });
  }

  document.addEventListener("DOMContentLoaded", initClassifiedTabs);
})();
