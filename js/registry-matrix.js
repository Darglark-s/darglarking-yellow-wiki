/**
 * Registry Matrix UI — Lazy / Active / Lucky paths + Volatility Paradox timeline.
 */

import {
  useAudioTimeline,
  TOTAL_BARS,
  principleSpans,
} from "./audio-timeline.js";

function pad(n) {
  return String(n).padStart(2, "0");
}

function initStolenFeedClock() {
  var el = document.getElementById("feed-clock");
  if (!el) return;

  function tick() {
    var now = new Date();
    el.textContent =
      now.getUTCFullYear() +
      "-" +
      pad(now.getUTCMonth() + 1) +
      "-" +
      pad(now.getUTCDate()) +
      "T" +
      pad(now.getUTCHours()) +
      ":" +
      pad(now.getUTCMinutes()) +
      ":" +
      pad(now.getUTCSeconds()) +
      "Z · MIRROR";
  }

  tick();
  setInterval(tick, 1000);
}

function initRedactedLore() {
  document.querySelectorAll(".redacted-lore").forEach(function (el) {
    var revealed = el.dataset.reveal || el.textContent.trim();
    var hidden = el.dataset.mask || "████████ ████████ ████████";
    el.textContent = hidden;
    el.setAttribute("aria-label", "Classified lore — activate to reveal");

    function toggle() {
      var open = el.classList.toggle("is-revealed");
      el.textContent = open ? revealed : hidden;
      el.setAttribute("aria-expanded", open ? "true" : "false");
    }

    el.addEventListener("click", toggle);
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });
}

function renderVolatilityTimeline(root) {
  var timeline = useAudioTimeline();
  root.innerHTML = "";

  var header = document.createElement("div");
  header.className = "timeline-header mono";
  header.innerHTML =
    "<span>90 BPM calm</span><span class='timeline-breach-mark'>→ 130 BPM breach @ bar 5</span><span>32 bars</span>";
  root.appendChild(header);

  var track = document.createElement("div");
  track.className = "volatility-track";
  track.setAttribute("role", "img");
  track.setAttribute(
    "aria-label",
    "Volatility Paradox timeline: FIELD bars 1-16, VOID 17-24, CHAOS 25-32"
  );

  for (var bar = 1; bar <= TOTAL_BARS; bar += 1) {
    var span = principleSpans.find(function (p) {
      return bar >= p.startBar && bar <= p.endBar;
    });
    var frame = timeline.getFrameForBar(bar);
    var cell = document.createElement("button");
    cell.type = "button";
    cell.className = "timeline-bar bar-" + (span ? span.principle : "field");
    cell.style.setProperty("--frame-color", frame.themeColor || "#ffd700");
    cell.dataset.bar = String(bar);
    cell.dataset.frameId = frame.id;
    cell.title = "Bar " + bar + " · " + frame.label + " · " + frame.bpm + " BPM";
    cell.innerHTML = "<span class='bar-num'>" + bar + "</span>";
    if (frame.startsAtBar === bar) {
      cell.classList.add("frame-marker");
    }
    if (bar === timeline.tempoChange.breachStartsAtBar) {
      cell.classList.add("breach-start");
    }
    track.appendChild(cell);
  }

  root.appendChild(track);

  var detail = document.createElement("div");
  detail.className = "timeline-detail mono";
  detail.id = "timeline-detail";
  detail.textContent = "Hover or focus a bar for frame telemetry.";
  root.appendChild(detail);

  track.addEventListener("mouseover", function (e) {
    var btn = e.target.closest(".timeline-bar");
    if (!btn) return;
    updateTimelineDetail(detail, Number(btn.dataset.bar));
  });

  track.addEventListener("focusin", function (e) {
    var btn = e.target.closest(".timeline-bar");
    if (!btn) return;
    updateTimelineDetail(detail, Number(btn.dataset.bar));
  });

  var legend = document.createElement("div");
  legend.className = "timeline-principle-legend";
  principleSpans.forEach(function (p) {
    var item = document.createElement("span");
    item.className = "legend-item legend-" + p.principle;
    item.textContent = p.label;
    legend.appendChild(item);
  });
  root.appendChild(legend);
}

function updateTimelineDetail(el, bar) {
  var timeline = useAudioTimeline();
  var frame = timeline.getFrameForBar(bar);
  var principle = principleSpans.find(function (p) {
    return bar >= p.startBar && bar <= p.endBar;
  });
  el.innerHTML =
    "BAR " +
    bar +
    " · " +
    (principle ? principle.label.toUpperCase() : "") +
    "<br>" +
    frame.label +
    " · Track " +
    frame.track +
    " · " +
    frame.bpm +
    " BPM" +
    (frame.codename ? "<br>CODENAME: " + frame.codename : "") +
    "<br><span class='source-tag'>" +
    (frame.themeSource || "") +
    "</span>";
}

function initMatrixTabs() {
  var tabs = document.querySelectorAll(".matrix-tab");
  var cols = document.querySelectorAll(".matrix-col");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var path = tab.dataset.path;
      tabs.forEach(function (t) {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", t === tab ? "true" : "false");
      });
      cols.forEach(function (col) {
        var match = col.dataset.path === path;
        col.classList.toggle("is-focused", match);
        col.hidden = window.matchMedia("(max-width: 720px)").matches && !match;
      });
    });
  });
}

export function initRegistryMatrix() {
  initStolenFeedClock();
  initRedactedLore();
  initMatrixTabs();

  var timelineRoot = document.getElementById("volatility-timeline");
  if (timelineRoot) {
    renderVolatilityTimeline(timelineRoot);
  }
}

document.addEventListener("DOMContentLoaded", initRegistryMatrix);
