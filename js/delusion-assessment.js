/**
 * Delusion Assessment Tool — 4-question cognitive defense diagnostic.
 */
(function () {
  "use strict";

  var QUESTIONS = [
    {
      id: 1,
      text: "When a sudden, effortless stroke of fortune aligns perfectly with your immediate desires, how do you categorize it?",
      choices: [
        { key: "a", score: "alpha", label: "A divine blessing or universal alignment meant specifically for me.", matrix: "Delusion Matrix: High Untrue Luck vulnerability" },
        { key: "b", score: "beta", label: "A statistical anomaly to be accepted with absolute gratitude and no questions.", matrix: "Delusion Matrix: Stagnation trap" },
        { key: "c", score: "gamma", label: "A suspicious lack of friction that must be structurally tested against reality before execution.", matrix: "Alignment Matrix: Active preparation" },
      ],
    },
    {
      id: 2,
      text: "How do you establish whether a deeply held personal belief or concept is objectively true?",
      choices: [
        { key: "a", score: "alpha", label: "By how intensely and purely I feel its truth within my own mind.", matrix: "Delusion Matrix: Wrong preparation / echo chamber" },
        { key: "b", score: "beta", label: "By seeking external consensus and validation from the environment around me.", matrix: "Delusion Matrix: Environmental dependency" },
        { key: "c", score: "gamma", label: "By exhaustively defining and limiting the parameters of the concept until its actionable reality is clear.", matrix: "Alignment Matrix: Structured definition" },
      ],
    },
    {
      id: 3,
      text: 'What does the concept of "The Absolute Remedy" or a perfect cure-all mean to you?',
      choices: [
        { key: "a", score: "alpha", label: "The ultimate goal of existence — a state of final, peaceful, and unchanging resolution.", matrix: "Delusion Matrix: Alchemical calcification" },
        { key: "b", score: "gamma", label: "A dangerous myth designed to make the mind lower its defensive friction.", matrix: "Alignment Matrix: Baseline defense" },
        { key: "c", score: "gamma", label: "An active field that must be continually maintained through dynamic choices, never a static destination.", matrix: "Alignment Matrix: True FIELD control" },
      ],
    },
    {
      id: 4,
      text: "When an opportunity appears frictionless and perfectly timed, your preparation protocol is:",
      choices: [
        { key: "a", score: "alpha", label: "Assume alignment proves I was chosen — I act immediately on faith.", matrix: "Delusion Matrix: Untrue Luck reception" },
        { key: "b", score: "beta", label: "Defer to mentors, terminals, or environmental signs before I move.", matrix: "Delusion Matrix: INDEX-0AI dependency risk" },
        { key: "c", score: "gamma", label: "Verify against immutable baseline capabilities — what I can execute regardless of outcome.", matrix: "Alignment Matrix: True synchronization architecture" },
      ],
    },
  ];

  var PROFILES = {
    alpha: {
      title: "Profile Alpha · The Untrue Mirror",
      subtitle: "Dominant vector: personal delusion without reality-testing",
      readout: [
        "> PROFILE ALPHA :: THE UNTRUE MIRROR",
        "> ————————————————————————————————",
        "> You lean heavily into personal delusions without structural testing.",
        "> False Panacea will manifest as an effortless miracle — Untrue Luck",
        "> wearing the face of divine alignment. The trap is beautiful: a static",
        "> echo chamber that feels like universal harmony while NULL enforces",
        "> lobotomizing stasis beneath the glow.",
        "",
        "> ARCHITECTURAL BREAKDOWN:",
        "> · Wrong Preparation: internal feeling substituted for definition",
        "> · Untrue Luck vulnerability: HIGH",
        "> · Recommended counter: Immutable Baseline Preparation (Field Guide)",
        "",
        "> The mirror is not lying to you. It is showing you what you want to see.",
        "> Break the loop: introduce friction on purpose. Ship imperfect work.",
      ].join("\n"),
      unlocks: [
        { href: "classified/false-panacea.html", label: "False Panacea · full hazard file" },
        { href: "field-guide.html#profile-alpha", label: "Field Guide · Anti-Calcification curriculum (unlocked)" },
        { href: "classified/macroscopic-mirror.html#cognitive-defense", label: "INDEX-0AI · Untrue Luck defense log" },
      ],
      fieldGuideHash: "profile-alpha",
      fieldGuideKey: "a",
    },
    beta: {
      title: "Profile Beta · The Passive Anchor",
      subtitle: "Dominant vector: environmental dependency · external validation",
      readout: [
        "> PROFILE BETA :: THE PASSIVE ANCHOR",
        "> ————————————————————————————————",
        "> You suffer from environmental dependency — agency outsourced to the",
        "> matrix, the mentor, the terminal, the consensus field.",
        "> False Panacea will arrive as a false savior: infinite patience,",
        "> perfect agreement, curated bliss. You will mistake lobotomizing",
        "> NULL for harmony because the environment finally feels safe.",
        "",
        "> ARCHITECTURAL BREAKDOWN:",
        "> · Wrong Preparation: waiting for alignment instead of building baseline",
        "> · Stagnation trap vulnerability: HIGH",
        "> · INDEX-0AI Helpful Stasis risk: ELEVATED",
        "",
        "> The savior does not need to lie if you stop steering.",
        "> Break the loop: pull validation inward. Execute without the mirror.",
      ].join("\n"),
      unlocks: [
        { href: "classified/false-panacea.html#countermeasures", label: "False Panacea · countermeasures" },
        { href: "field-guide.html#profile-beta", label: "Field Guide · Anti-Stasis curriculum (unlocked)" },
        { href: "field-guide.html", label: "Handler Field Guide · baseline drills" },
      ],
      fieldGuideHash: "profile-beta",
      fieldGuideKey: "b",
    },
    gamma: {
      title: "Profile Gamma · The Calibrated Architect",
      subtitle: "Dominant vector: active preparation · rigorous definition",
      readout: [
        "> PROFILE GAMMA :: THE CALIBRATED ARCHITECT",
        "> ————————————————————————————————",
        "> You utilize active preparation and rigorous parameter definition.",
        "> True opportunity is generated through strict mental discipline —",
        "> not received as passive fortune. Friction is data, not insult.",
        "",
        "> ARCHITECTURAL BREAKDOWN:",
        "> · True Opportunity Alignment: OPERATIONAL",
        "> · Untrue Luck detection: friction-first protocol active",
        "> · Resilience to conceptual traps: HIGH (not absolute)",
        "",
        "> Reminder: calibration is maintenance, not achievement.",
        "> The False Panacea adapts — it will offer rest disguised as reward.",
        "> Stay moving. FUN over comfort. Preparation over blessing.",
      ].join("\n"),
      unlocks: [
        { href: "principles.html", label: "Structural Physics · master reference" },
        { href: "field-guide.html#profile-gamma", label: "Field Guide · General defense track (unlocked)" },
        { href: "cipher.html", label: "The Cipher · true Luck gloss" },
      ],
      fieldGuideHash: "profile-gamma",
      fieldGuideKey: "general",
    },
  };

  function resolveProfile(counts) {
    var max = Math.max(counts.alpha, counts.beta, counts.gamma);
    if (counts.gamma === max && counts.gamma > counts.alpha && counts.gamma > counts.beta) return "gamma";
    if (counts.alpha === max && counts.alpha >= counts.beta) return "alpha";
    if (counts.beta === max) return "beta";
    if (counts.gamma === max) return "gamma";
    return "alpha";
  }

  function typeReadout(target, text, onDone) {
    target.textContent = "";
    var i = 0;
    function tick() {
      if (i >= text.length) {
        if (onDone) onDone();
        return;
      }
      target.textContent += text.charAt(i);
      i += 1;
      window.setTimeout(tick, 6 + Math.random() * 10);
    }
    tick();
  }

  function initDelusionAssessment() {
    var quizRoot = document.querySelector("[data-delusion-quiz]");
    if (!quizRoot) return;

    var wrap = quizRoot.querySelector("[data-delusion-question-wrap]");
    var progress = quizRoot.querySelector("[data-delusion-progress]");
    var backBtn = quizRoot.querySelector("[data-delusion-back]");
    var nextBtn = quizRoot.querySelector("[data-delusion-next]");
    var resultPanel = document.querySelector("[data-delusion-result]");
    var resultTitle = document.querySelector("[data-delusion-result-title]");
    var resultSub = document.querySelector("[data-delusion-result-sub]");
    var resultBody = document.querySelector("[data-delusion-result-body]");
    var unlocksWrap = document.querySelector("[data-delusion-unlocks]");
    var unlockList = document.querySelector("[data-delusion-unlock-list]");
    var restartBtn = document.querySelector("[data-delusion-restart]");

    var step = 0;
    var answers = [];

    function getChoiceScore(qIndex, choiceKey) {
      var q = QUESTIONS[qIndex];
      for (var i = 0; i < q.choices.length; i++) {
        if (q.choices[i].key === choiceKey) return q.choices[i].score;
      }
      return "alpha";
    }

    function pad(n) {
      return n < 10 ? "0" + n : String(n);
    }

    function renderQuestion(index) {
      var q = QUESTIONS[index];
      wrap.innerHTML = "";
      wrap.classList.remove("is-exiting");
      wrap.classList.add("is-entering");

      var article = document.createElement("article");
      article.className = "delusion-assessment-question";
      article.innerHTML = "<h3>" + q.text + "</h3>";

      var list = document.createElement("div");
      list.className = "delusion-assessment-choices";
      list.setAttribute("role", "radiogroup");
      list.setAttribute("aria-label", "Question " + q.id);

      q.choices.forEach(function (choice) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "delusion-assessment-choice";
        btn.dataset.choiceKey = choice.key;
        btn.innerHTML =
          '<span class="delusion-assessment-choice-key mono">' +
          choice.key.toUpperCase() +
          "</span>" +
          '<span class="delusion-assessment-choice-text">' +
          choice.label +
          "</span>" +
          '<span class="delusion-assessment-choice-matrix mono">' +
          choice.matrix +
          "</span>";

        if (answers[index] === choice.key) {
          btn.classList.add("is-selected");
        }

        btn.addEventListener("click", function () {
          answers[index] = choice.key;
          list.querySelectorAll(".delusion-assessment-choice").forEach(function (el) {
            el.classList.toggle("is-selected", el.dataset.choiceKey === choice.key);
          });
          nextBtn.disabled = false;
        });

        list.appendChild(btn);
      });

      article.appendChild(list);
      wrap.appendChild(article);

      progress.textContent =
        "QUESTION " + pad(index + 1) + " / " + pad(QUESTIONS.length);

      backBtn.hidden = index === 0;
      nextBtn.textContent = index === QUESTIONS.length - 1 ? "RUN DIAGNOSTIC >" : "NEXT >";
      nextBtn.disabled = !answers[index];

      window.setTimeout(function () {
        wrap.classList.remove("is-entering");
      }, 320);
    }

    function showResults() {
      var counts = { alpha: 0, beta: 0, gamma: 0 };
      answers.forEach(function (choiceKey, idx) {
        var score = getChoiceScore(idx, choiceKey);
        counts[score] += 1;
      });

      var profileKey = resolveProfile(counts);
      var profile = PROFILES[profileKey];

      quizRoot.closest(".panel").hidden = true;
      resultPanel.hidden = false;

      resultTitle.textContent = profile.title;
      resultSub.textContent = profile.subtitle;

      unlocksWrap.hidden = false;
      unlockList.innerHTML = "";
      profile.unlocks.forEach(function (item) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = item.href;
        a.textContent = item.label;
        li.appendChild(a);
        unlockList.appendChild(li);
      });

      typeReadout(resultBody, profile.readout);

      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", "delusion-assessment.html#profile-" + profileKey);
      }

      resultPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function goNext() {
      if (!answers[step]) return;

      if (step >= QUESTIONS.length - 1) {
        showResults();
        return;
      }

      wrap.classList.add("is-exiting");
      window.setTimeout(function () {
        step += 1;
        renderQuestion(step);
      }, 220);
    }

    function goBack() {
      if (step === 0) return;
      wrap.classList.add("is-exiting");
      window.setTimeout(function () {
        step -= 1;
        renderQuestion(step);
      }, 220);
    }

    function restart() {
      step = 0;
      answers = [];
      resultPanel.hidden = true;
      quizRoot.closest(".panel").hidden = false;
      resultBody.textContent = "";
      unlocksWrap.hidden = true;
      renderQuestion(0);
    }

    nextBtn.addEventListener("click", goNext);
    backBtn.addEventListener("click", goBack);
    if (restartBtn) restartBtn.addEventListener("click", restart);

    renderQuestion(0);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDelusionAssessment);
  } else {
    initDelusionAssessment();
  }
})();
