/**
 * Minimal Chiton calm-frame preview — Track 3 @ 90 BPM (4 bars).
 * Full MIDI: assets/midi/volatility_paradox_output.mid
 */
(function () {
  "use strict";

  var BPM = 90;
  var BARS = 4;
  var BEATS = BARS * 4;

  function initChitonPlayer() {
    var root = document.querySelector("[data-chiton-player]");
    if (!root) return;

    var audio = root.querySelector("audio");
    var playBtn = root.querySelector(".chiton-play");
    var status = root.querySelector(".chiton-status");
    var bpmEl = root.querySelector(".chiton-bpm-readout");
    if (!audio || !playBtn || !status) return;

    if (bpmEl) {
      bpmEl.textContent = BPM + " BPM · " + BARS + " bars · FIELD / Chiton";
    }

    function setStatus(text) {
      status.textContent = text;
    }

    playBtn.addEventListener("click", function () {
      if (audio.paused) {
        audio.play().then(function () {
          playBtn.textContent = "Pause Chiton Grid";
          setStatus("Track 3 calm frame active — breach deferred until bar 5.");
        }).catch(function () {
          setStatus("Playback blocked — interact with the page first.");
        });
      } else {
        audio.pause();
        playBtn.textContent = "Play Chiton Grid";
        setStatus("Calm frame suspended.");
      }
    });

    audio.addEventListener("ended", function () {
      playBtn.textContent = "Play Chiton Grid";
      setStatus("Calm loop complete · " + BEATS + " beats @ " + BPM + " BPM.");
    });

    audio.addEventListener("play", function () {
      root.classList.add("is-playing");
    });

    audio.addEventListener("pause", function () {
      root.classList.remove("is-playing");
    });

    setStatus("Ready — unyielding clock baseline @ " + BPM + " BPM.");
  }

  document.addEventListener("DOMContentLoaded", initChitonPlayer);
})();
