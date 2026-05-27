/**
 * Mock SaveManager telemetry — mirrors godot/shared/SaveManager.gd hook registry.
 * Static snapshot + slow-scrolling log for wiki Registry HUD.
 */
(function () {
  "use strict";

  var HOOKS = [
    {
      id: "rtd.tiles_defended_7654",
      milestone: "ACH_RTD_7654",
      title: "GroveGrownGuardians",
      status: "wired",
      sample: { tiles_defended: 7654, waves_cleared: 42, run_id: "rtd-20260527-a" },
    },
    {
      id: "rtd.backup_restore",
      milestone: "ACH_RTD_RECOVERY",
      title: "Any",
      status: "wired",
      sample: { recovery_index: 3, slot: "recovery_03", action: "recover_save" },
    },
    {
      id: "acc.overclock_60s",
      milestone: "ACH_ACC_OVERCLOCK",
      title: "Accuclicker",
      status: "wired",
      sample: { multiplier: 8.5, duration_s: 60, clicks: 12400 },
    },
    {
      id: "acc.total_clicks_1m",
      milestone: "ACH_ACC_LOOP",
      title: "Accuclicker",
      status: "wired",
      sample: { total_clicks: 1000042, session_min: 47 },
    },
    {
      id: "acc.stego_dgy1",
      milestone: "ACH_ACC_STEGO",
      title: "Accuclicker",
      status: "wired",
      sample: { payload: "DGY1://pp/financial-yellow/e8c547", asset: "darglarking_field_asset.png" },
    },
    {
      id: "ele.all_eight_active",
      milestone: "ACH_ELE_OCTAVE",
      title: "Elemenko",
      status: "wired",
      sample: { elements: 8, overlap: false, dominant: "Fire" },
    },
    {
      id: "ele.ninth_element",
      milestone: "ACH_ELE_ABSOLUTION",
      title: "Elemenko",
      status: "pending",
      sample: null,
    },
    {
      id: "fau.narrative_complete",
      milestone: "ACH_FAU_ESCAPE",
      title: "WhatsThisGameButcher",
      status: "pending",
      sample: null,
    },
  ];

  var LOG_TEMPLATES = [
    function () {
      return "> SaveManager :: report_game_hook(\"rtd.tiles_defended_7654\") → ACH_RTD_7654 unlocked";
    },
    function () {
      return "> StatDisplay :: tiles_defended=7654 waves_cleared=42 [FIELD telemetry]";
    },
    function () {
      return "> NullPreventionMonitor :: probe idle · shelf slots 7/10 · pathway-back armed";
    },
    function () {
      return "> DarglarkingStegoBridge :: payload DGY1://pp/financial-yellow/e8c547 → acc.stego_dgy1";
    },
    function () {
      return "> SaveManager :: soft_delete → recovery_08 · move-never-wipe confirmed";
    },
    function () {
      return "> ClickMatrix :: overclock 60s @ mult 8.5 · acc.overclock_60s hook fired";
    },
    function () {
      return "> ChitonGrid :: lens 94% @ 90 BPM · calm frame bars 1–4 holding";
    },
  ];

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function utcStamp() {
    var d = new Date();
    return (
      d.getUTCFullYear() +
      "-" +
      pad(d.getUTCMonth() + 1) +
      "-" +
      pad(d.getUTCDate()) +
      "T" +
      pad(d.getUTCHours()) +
      ":" +
      pad(d.getUTCMinutes()) +
      ":" +
      pad(d.getUTCSeconds()) +
      "Z"
    );
  }

  function renderHookTable(tbody) {
    tbody.innerHTML = "";
    HOOKS.forEach(function (hook) {
      var tr = document.createElement("tr");
      var sample = hook.sample
        ? JSON.stringify(hook.sample).replace(/"/g, "")
        : "—";
      tr.innerHTML =
        "<td class=\"mono\">" +
        hook.id +
        "</td><td class=\"mono\">" +
        hook.milestone +
        "</td><td>" +
        hook.title +
        "</td><td>" +
        hook.status +
        "</td><td class=\"mono telemetry-sample\">" +
        sample +
        "</td>";
      tbody.appendChild(tr);
    });
  }

  function appendLogLine(logEl) {
    var line = document.createElement("p");
    line.className = "telemetry-log-line";
    var tpl = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
    line.textContent = utcStamp() + " " + tpl();
    logEl.insertBefore(line, logEl.firstChild);
    while (logEl.children.length > 12) {
      logEl.removeChild(logEl.lastChild);
    }
  }

  function initTelemetryMock() {
    var root = document.querySelector("[data-save-telemetry]");
    if (!root) return;

    var tbody = root.querySelector(".telemetry-hooks tbody");
    var logEl = root.querySelector(".telemetry-log");
    var stampEl = root.querySelector(".telemetry-stamp");

    if (tbody) renderHookTable(tbody);
    if (stampEl) stampEl.textContent = "Snapshot · " + utcStamp() + " · mock · SaveManager.gd";

    if (logEl) {
      for (var i = 0; i < 4; i += 1) {
        appendLogLine(logEl);
      }
      window.setInterval(function () {
        appendLogLine(logEl);
      }, 5200);
    }
  }

  document.addEventListener("DOMContentLoaded", initTelemetryMock);
})();
