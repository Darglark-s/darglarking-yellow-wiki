/**
 * Case Studies tab panels — directory + case file views.
 * Hash routing: case-studies.html#index | #case-01 | #case-02 | #case-03
 */
(function () {
  "use strict";

  var DEFAULT_TAB = "index";
  var PAGE = "case-studies.html";

  function getTabFromHash() {
    var hash = (window.location.hash || "").replace(/^#/, "").toLowerCase();
    if (!hash) return DEFAULT_TAB;
    var panel = document.querySelector('[data-case-panel="' + hash + '"]');
    return panel ? hash : DEFAULT_TAB;
  }

  function activateTab(tabId) {
    document.querySelectorAll("[data-case-tab]").forEach(function (btn) {
      var active = btn.getAttribute("data-case-tab") === tabId;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    document.querySelectorAll("[data-case-panel]").forEach(function (panel) {
      var show = panel.getAttribute("data-case-panel") === tabId;
      panel.hidden = !show;
    });

    if (window.location.hash !== "#" + tabId) {
      history.replaceState(null, "", PAGE + "#" + tabId);
    }
  }

  function initCaseTabs() {
    var root = document.querySelector("[data-case-tabs]");
    if (!root) return;

    root.querySelectorAll("[data-case-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activateTab(btn.getAttribute("data-case-tab"));
      });
    });

    root.querySelectorAll("[data-case-jump]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        activateTab(link.getAttribute("data-case-jump"));
      });
    });

    activateTab(getTabFromHash());

    window.addEventListener("hashchange", function () {
      activateTab(getTabFromHash());
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCaseTabs);
  } else {
    initCaseTabs();
  }
})();
