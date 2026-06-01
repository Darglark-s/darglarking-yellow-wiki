/**
 * Gateway lattice — polarity pairs unlock directory routes.
 * No standard nav: deduction required.
 */
(function () {
  "use strict";

  var PAIRS = {
    field: { opposite: "void", href: "principles.html", label: "Structural Physics · four poles" },
    void: { opposite: "field", href: "principles.html", label: "Structural Physics · four poles" },
    chaos: { opposite: "null", href: "doctrine.html#storm-cycle", label: "Storm cycle · rhythm of breach" },
    null: { opposite: "chaos", href: "doctrine.html#persistence", label: "Persistence · Null Prevention" },
    macrocosm: {
      opposite: "microcosm",
      href: "simulation-theory.html",
      label: "Simulation Theory · bones archaeology",
    },
    microcosm: {
      opposite: "macrocosm",
      href: "simulation-theory.html",
      label: "Simulation Theory · bones archaeology",
    },
    parasite: {
      opposite: "matrix",
      href: "classified/false-panacea.html",
      label: "False Panacea · frictionless assertion",
    },
    matrix: {
      opposite: "parasite",
      href: "registry.html",
      label: "Registry Matrix · path classification",
    },
    rhythm: { opposite: "stillness", href: "frames.html", label: "Frame Encyclopedia · tempo law" },
    stillness: { opposite: "rhythm", href: "frames.html", label: "Frame Encyclopedia · tempo law" },
    assertion: {
      opposite: "byproduct",
      href: "magic.html#refinement-protocol",
      label: "Magic · refinery waste stream",
    },
    byproduct: {
      opposite: "assertion",
      href: "magic.html#conservation-truth",
      label: "Conservation of Truth · amber soot",
    },
  };

  var STORAGE_KEY = "dgy-gateway-unlocked";

  function loadUnlocked() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function saveUnlocked(list) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      /* ignore */
    }
  }

  function unlockPair(id) {
    var list = loadUnlocked();
    if (list.indexOf(id) === -1) {
      list.push(id);
      saveUnlocked(list);
    }
    renderDirectory(list);
  }

  function pairId(a, b) {
    return [a, b].sort().join("+");
  }

  function renderDirectory(unlocked) {
    var directory = document.querySelector(".gateway-directory");
    var status = document.querySelector(".gateway-status");
    if (!directory) return;

    var seen = {};
    var html = "";

    unlocked.forEach(function (id) {
      var parts = id.split("+");
      if (parts.length !== 2) return;
      var pole = parts[0];
      var meta = PAIRS[pole];
      if (!meta || seen[meta.href]) return;
      seen[meta.href] = true;
      html +=
        '<li class="gateway-route is-unlocked">' +
        '<a href="' +
        meta.href +
        '">' +
        meta.label +
        "</a></li>";
    });

    var count = Object.keys(seen).length;
    directory.innerHTML = html || '<li class="gateway-route is-locked">No routes resolved.</li>';

    if (status) {
      status.textContent =
        count >= 4
          ? "Lattice saturated · directory open · the filter admits you"
          : count + " / 4 minimum syntheses · continue pairing opposites";
    }

    if (count >= 4) {
      directory.setAttribute("aria-hidden", "false");
      document.body.classList.add("gateway-lattice-open");
    }
  }

  function initLattice() {
    var nodes = document.querySelectorAll(".gateway-node");
    var focusPole = null;

    nodes.forEach(function (node) {
      var pole = node.getAttribute("data-pole");
      if (!pole || !PAIRS[pole]) return;

      function handleFocus() {
        nodes.forEach(function (n) {
          n.classList.remove("is-focus", "is-bridge");
        });
        node.classList.add("is-focus");

        if (focusPole && PAIRS[focusPole].opposite === pole) {
          node.classList.add("is-bridge");
          var focused = document.querySelector('.gateway-node[data-pole="' + focusPole + '"]');
          if (focused) focused.classList.add("is-bridge");
          unlockPair(pairId(focusPole, pole));
          focusPole = null;
          return;
        }

        focusPole = pole;
      }

      node.addEventListener("mouseenter", handleFocus);
      node.addEventListener("click", function (e) {
        e.preventDefault();
        handleFocus();
      });
    });

    document.querySelector(".gateway-lattice")?.addEventListener("mouseleave", function () {
      focusPole = null;
      nodes.forEach(function (n) {
        n.classList.remove("is-focus", "is-bridge");
      });
    });

    renderDirectory(loadUnlocked());
  }

  document.addEventListener("DOMContentLoaded", initLattice);
})();
