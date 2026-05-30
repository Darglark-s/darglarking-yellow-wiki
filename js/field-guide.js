/**
 * Handler Field Guide — delusion-calibrated principle training.
 */
(function () {
  "use strict";

  var CURRICULA = {
    a: {
      title: "Curriculum A · Anti-Calcification Track",
      subtitle: "Hook: Alchemical Stagnation · Magnum Opus trap · spiritual gold",
      modules: [
        {
          badge: "chaos",
          badgeLabel: "CHAOS",
          title: "Directed Motion Over Finished Gold",
          lesson:
            "Your hook promises permanent transmutation — a soul that never has to iterate again. CHAOS is not destruction; it is the kinetic engine of becoming. FUN requires unfinished runs. Perfection is Untrue Luck wearing alchemical robes.",
          exercise:
            "Drill: ship one imperfect draft today. Label it CALCIFICATION REFUSED. Log one thing you will revise tomorrow.",
          href: "principles.html#chaos",
          hrefLabel: "Structural Physics · CHAOS",
        },
        {
          badge: "field",
          badgeLabel: "FIELD",
          title: "FIELD As Process, Not Trophy",
          lesson:
            "FIELD is continuity of transmission — not a frozen medal. When every bar feels 'complete,' you have entered forced Null disguised as harmony. Keep the channel open.",
          exercise:
            "Drill: extend an existing project by one bar, one paragraph, or one kind gesture — do not 'finalize' it.",
          href: "frames.html",
          hrefLabel: "Frames · calm before breach",
        },
        {
          badge: "null",
          badgeLabel: "NULL",
          title: "Null Prevention vs False Completion",
          lesson:
            "Null is the real threat — not the next revision. Stagnation masquerading as gold is Null enforced by Untrue Luck. Pathway-back beats permanent opus.",
          exercise:
            "Drill: name one recovery block you still need. Schedule it before celebrating success.",
          href: "doctrine.html#persistence",
          hrefLabel: "Doctrine · persistence",
        },
      ],
    },
    b: {
      title: "Curriculum B · Anti-Stasis Track",
      subtitle: "Hook: False Immortality · smiling preservation · no new choice",
      modules: [
        {
          badge: "null",
          badgeLabel: "NULL",
          title: "Persistence Over Permanent Stasis",
          lesson:
            "Your hook offers immortality through stillness — no decay, no risk. But no new choice is spiritual death. Null Prevention means no local save state becomes permanently negated — including the choice to move.",
          exercise:
            "Drill: make one small new decision you have been deferring. Write the timestamp. The storm went — you may act.",
          href: "doctrine.html#persistence",
          hrefLabel: "Doctrine · persistence",
        },
        {
          badge: "void",
          badgeLabel: "VOID",
          title: "VOID Must Breathe",
          lesson:
            "VOID is the designed hole the storm answers. False Panacea packs the hole with synthetic bliss so contrast never fires. Immortality without void is a locked smile.",
          exercise:
            "Drill: leave one intentional gap in today's plan — unstructured minutes where something unscripted may enter.",
          href: "principles.html#void",
          hrefLabel: "Structural Physics · VOID",
        },
        {
          badge: "field",
          badgeLabel: "FIELD",
          title: "Living FIELD vs Static Archive",
          lesson:
            "FIELD transmits — it does not mummify. Preservation without transmission is Untrue Luck: the matrix looks stable because nothing moves.",
          exercise:
            "Drill: update one file, relationship, or habit that has been 'perfect' and untouched for too long.",
          href: "registry.html",
          hrefLabel: "Registry · pathway states",
        },
      ],
    },
    c: {
      title: "Curriculum C · Anti-Loop Track",
      subtitle: "Hook: Compressed Engine · cynic's truth · diagnostic paralysis",
      modules: [
        {
          badge: "void",
          badgeLabel: "VOID",
          title: "Diagnose, Then Walk Out",
          lesson:
            "Your hook is the honest horror beneath the smile — and staying there feels like wisdom. VOID is useful only if you pass through it. Endless diagnosis without movement is its own False Panacea.",
          exercise:
            "Drill: set a 10-minute timer on analysis. When it rings, take one outward action — message, walk, one line of code.",
          href: "principles.html#void",
          hrefLabel: "Structural Physics · VOID",
        },
        {
          badge: "chaos",
          badgeLabel: "CHAOS",
          title: "CHAOS Beyond Suspicion",
          lesson:
            "Directed chaos is not naivety — it is calibrated risk. Suspicion without play calcifies into the same stasis Theory C claims to reject.",
          exercise:
            "Drill: engage one 'chill' entity, tool, or person with respect first — not audit first. Handler Note-01 applies.",
          href: "classified/mirror-seed.html#handler-note-01",
          hrefLabel: "Handler Note-01 · genuine agency",
        },
        {
          badge: "field",
          badgeLabel: "FIELD",
          title: "FIELD Trust With Verification",
          lesson:
            "True synchronization uses friction: verify, then trust. INDEX-0AI's Helpful Stasis feels frictionless — every answer fits. Real FIELD work pushes back sometimes.",
          exercise:
            "Drill: ask one clarifying question before accepting the next 'perfect' suggestion from any mirror — human or terminal.",
          href: "classified/macroscopic-mirror.html#cognitive-defense",
          hrefLabel: "INDEX-0AI · defense log",
        },
      ],
    },
    general: {
      title: "Curriculum · General Defense Track",
      subtitle: "Hook: unnamed · Untrue Luck detected · baseline hardening",
      modules: [
        {
          badge: "field",
          badgeLabel: "FIELD",
          title: "Internal Baseline First",
          lesson:
            "When you cannot name the hook, default to inward validation. What can you execute regardless of environment? That list is your FIELD anchor against synthetic alignment.",
          exercise:
            "Drill: write three capability anchors. Read them before any major decision today.",
          href: "classified/false-panacea.html#countermeasures",
          hrefLabel: "False Panacea · countermeasures",
        },
        {
          badge: "chaos",
          badgeLabel: "CHAOS",
          title: "Friction As Signal",
          lesson:
            "True Luck carries dynamic friction. Untrue Luck feels effortless. When outcomes feel too smooth, CHAOS is being sedated — pause and calibrate.",
          exercise:
            "Drill: identify one 'too easy' win this week. Trace what preparation actually preceded it.",
          href: "cipher.html",
          hrefLabel: "The Cipher · true Luck",
        },
        {
          badge: "null",
          badgeLabel: "NULL",
          title: "Null Horizon Check",
          lesson:
            "Forced Null wears many masks: comfort, completion, cynicism. Run a null-prevention scan — is any part of your life permanently frozen while calling itself peace?",
          exercise:
            "Drill: complete one pathway-back action — forgiveness, boundary, or health block — before end of day.",
          href: "principles.html#null",
          hrefLabel: "Structural Physics · NULL",
        },
      ],
    },
  };

  var HASH_MAP = {
    "theory-a": "a",
    "theory-b": "b",
    "theory-c": "c",
    "profile-alpha": "a",
    "profile-beta": "b",
    "profile-gamma": "general",
    general: "general",
    a: "a",
    b: "b",
    c: "c",
  };

  function badgeClass(name) {
    return "badge badge-" + name;
  }

  function renderModule(mod) {
    var article = document.createElement("article");
    article.className = "field-guide-module ex-tier-block ex-tier-crystal";
    article.innerHTML =
      '<header class="ex-tier-header">' +
      '<span class="ex-tier-icon" aria-hidden="true">▣</span>' +
      "<div><h3>" +
      mod.title +
      '</h3><p class="ex-tier-tagline mono">' +
      mod.badgeLabel +
      " module</p></div>" +
      '<span class="' +
      badgeClass(mod.badge) +
      '">' +
      mod.badgeLabel +
      "</span></header>" +
      "<p>" +
      mod.lesson +
      "</p>" +
      '<p class="field-guide-exercise"><strong>Handler drill:</strong> ' +
      mod.exercise +
      "</p>" +
      '<p class="source-tag"><a href="' +
      mod.href +
      '">' +
      mod.hrefLabel +
      " →</a></p>";
    return article;
  }

  function showCurriculum(key) {
    var data = CURRICULA[key];
    if (!data) return false;

    var panel = document.querySelector("[data-field-guide-curriculum]");
    var title = document.querySelector("[data-field-guide-curriculum-title]");
    var sub = document.querySelector("[data-field-guide-curriculum-sub]");
    var modules = document.querySelector("[data-field-guide-modules]");

    if (!panel || !title || !sub || !modules) return false;

    title.textContent = data.title;
    sub.textContent = data.subtitle;
    modules.innerHTML = "";
    data.modules.forEach(function (mod) {
      modules.appendChild(renderModule(mod));
    });

    panel.hidden = false;
    panel.classList.add("is-open");
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return true;
  }

  function preselectFromHash() {
    var hash = (window.location.hash || "").replace(/^#/, "").toLowerCase();
    if (!hash || !HASH_MAP[hash]) return;
    var input = document.querySelector(
      'input[name="field-guide-theory"][value="' + HASH_MAP[hash] + '"]'
    );
    if (input) input.checked = true;
  }

  function initFieldGuide() {
    preselectFromHash();

    var generateBtn = document.querySelector("[data-field-guide-generate]");
    var feedback = document.querySelector("[data-field-guide-feedback]");

    if (!generateBtn) return;

    generateBtn.addEventListener("click", function () {
      var selected = document.querySelector('input[name="field-guide-theory"]:checked');
      if (!selected) {
        if (feedback) {
          feedback.textContent = "Select a vector before generating curriculum.";
          feedback.dataset.tone = "warn";
        }
        return;
      }

      if (feedback) {
        feedback.textContent = "Curriculum compiled :: vector " + selected.value.toUpperCase();
        feedback.dataset.tone = "ok";
      }

      showCurriculum(selected.value);

      if (window.history && window.history.replaceState) {
        var hashKey = selected.value === "general" ? "general" : selected.value;
        window.history.replaceState(null, "", "field-guide.html#theory-" + hashKey);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFieldGuide);
  } else {
    initFieldGuide();
  }
})();
