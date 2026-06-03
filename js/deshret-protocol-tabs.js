/**
 * Deshret Protocol — stage tabs + hash routing.
 * deshret-protocol.html#overview | #stage-1 | #stage-2 | #stage-3 | #stage-4 | #system-logic
 */
(function () {
  "use strict";

  var DEFAULT_TAB = "overview";
  var PAGE = "deshret-protocol.html";

  function getTabFromHash() {
    var hash = (window.location.hash || "").replace(/^#/, "").toLowerCase();
    if (!hash) return DEFAULT_TAB;
    var panel = document.querySelector('[data-deshret-panel="' + hash + '"]');
    return panel ? hash : DEFAULT_TAB;
  }

  function activateTab(tabId) {
    document.querySelectorAll("[data-deshret-tab]").forEach(function (btn) {
      var active = btn.getAttribute("data-deshret-tab") === tabId;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    document.querySelectorAll("[data-deshret-panel]").forEach(function (panel) {
      var show = panel.getAttribute("data-deshret-panel") === tabId;
      panel.hidden = !show;
    });

    if (window.location.hash !== "#" + tabId) {
      history.replaceState(null, "", PAGE + "#" + tabId);
    }
  }

  function initDeshretTabs() {
    var root = document.querySelector("[data-deshret-tabs]");
    if (!root) return;

    root.querySelectorAll("[data-deshret-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activateTab(btn.getAttribute("data-deshret-tab"));
      });
    });

    document.querySelectorAll("[data-deshret-jump]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        activateTab(link.getAttribute("data-deshret-jump"));
      });
    });

    activateTab(getTabFromHash());

    window.addEventListener("hashchange", function () {
      activateTab(getTabFromHash());
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDeshretTabs);
  } else {
    initDeshretTabs();
  }
})();
