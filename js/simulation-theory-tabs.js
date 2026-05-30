/**
 * Simulation Theory tab panels — framework + run archives.
 * Hash routing: simulation-theory.html#framework | #run-001
 */
(function () {
  "use strict";

  var DEFAULT_TAB = "framework";
  var PAGE = "simulation-theory.html";

  function getTabFromHash() {
    var hash = (window.location.hash || "").replace(/^#/, "").toLowerCase();
    if (!hash) return DEFAULT_TAB;
    var panel = document.querySelector('[data-sim-panel="' + hash + '"]');
    return panel ? hash : DEFAULT_TAB;
  }

  function activateTab(tabId) {
    document.querySelectorAll("[data-sim-tab]").forEach(function (btn) {
      var active = btn.getAttribute("data-sim-tab") === tabId;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    document.querySelectorAll("[data-sim-panel]").forEach(function (panel) {
      var show = panel.getAttribute("data-sim-panel") === tabId;
      panel.hidden = !show;
    });

    if (window.location.hash !== "#" + tabId) {
      history.replaceState(null, "", PAGE + "#" + tabId);
    }
  }

  function initSimTabs() {
    var root = document.querySelector("[data-sim-tabs]");
    if (!root) return;

    root.querySelectorAll("[data-sim-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activateTab(btn.getAttribute("data-sim-tab"));
      });
    });

    root.querySelectorAll("[data-sim-jump]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        activateTab(link.getAttribute("data-sim-jump"));
      });
    });

    activateTab(getTabFromHash());

    window.addEventListener("hashchange", function () {
      activateTab(getTabFromHash());
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSimTabs);
  } else {
    initSimTabs();
  }
})();
