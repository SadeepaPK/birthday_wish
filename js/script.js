(() => {
  "use strict";

  const config = window.BIRTHDAY_CONFIG || {};
  const girlfriendName = config.girlfriendName || "Kavi";
  const senderName = config.senderName || "Sadeepa";
  const stages = [...document.querySelectorAll(".stage")];
  const progressFill = document.getElementById("progress-fill");
  const progressLabel = document.getElementById("progress-label");
  const progressCount = document.getElementById("progress-count");
  const backButton = document.getElementById("back-button");
  const navDots = [...document.querySelectorAll("#nav-dots i")];
  const toast = document.getElementById("toast");
  let currentStage = 0;
  let letterStarted = false;
  let toastTimer = null;

  // Two original instrumental tracks are embedded in this single HTML file.
  // Browsers require a visitor gesture before audio can begin.
  const romanticAudio = document.getElementById("love-audio");
  const birthdayAudio = document.getElementById("birthday-audio");
  const musicToggle = document.getElementById("music-toggle");
  const musicLabel = document.getElementById("music-label");
  let musicEnabled = false;
  let musicTouched = false;
  let activeAudio = null;
  let musicFadeTimer = null;

  function updateMusicButton(label, isPlaying) {
    musicLabel.textContent = label;
    musicToggle.classList.toggle("playing", isPlaying);
    musicToggle.setAttribute("aria-label", isPlaying ? "Pause music" : "Turn background music on");
  }

  function stopBirthdayMusic() {
    if (musicFadeTimer) {
      clearInterval(musicFadeTimer);
      musicFadeTimer = null;
    }
    romanticAudio.pause();
    birthdayAudio.pause();
    updateMusicButton("MUSIC OFF", false);
  }

  async function syncMusicForStage(stage) {
    if (!musicEnabled) return;

    const nextAudio = stage === 6 ? birthdayAudio : romanticAudio;
    const previousAudio = activeAudio;
    if (previousAudio === nextAudio && !nextAudio.paused) return;

    if (musicFadeTimer) {
      clearInterval(musicFadeTimer);
      musicFadeTimer = null;
    }

    const targetVolume = nextAudio === birthdayAudio ? 0.58 : 0.34;
    const previousVolume = previousAudio && previousAudio !== nextAudio
      ? previousAudio.volume : 0;

    nextAudio.volume = 0;
    if (previousAudio !== nextAudio) nextAudio.currentTime = 0;

    try {
      await nextAudio.play();
      activeAudio = nextAudio;
      updateMusicButton(nextAudio === birthdayAudio ? "BIRTHDAY" : "ROMANTIC", true);

      const startedAt = Date.now();
      const fadeDuration = 900;
      musicFadeTimer = setInterval(() => {
        const progress = Math.min(1, (Date.now() - startedAt) / fadeDuration);
        nextAudio.volume = targetVolume * progress;

        if (previousAudio && previousAudio !== nextAudio) {
          previousAudio.volume = previousVolume * (1 - progress);
        }

        if (progress >= 1) {
          clearInterval(musicFadeTimer);
          musicFadeTimer = null;
          if (previousAudio && previousAudio !== nextAudio) {
            previousAudio.pause();
            previousAudio.currentTime = 0;
            previousAudio.volume = 0;
          }
          nextAudio.volume = targetVolume;
        }
      }, 45);
    } catch (error) {
      musicEnabled = false;
      updateMusicButton("TAP TO PLAY", false);
      showToast("Tap the music button to start the birthday soundtrack. ♫");
    }
  }

  musicToggle.addEventListener("click", () => {
    musicTouched = true;
    if (musicEnabled) {
      musicEnabled = false;
      stopBirthdayMusic();
    } else {
      musicEnabled = true;
      syncMusicForStage(currentStage);
    }
  });


  const stageLabels = [
    "A LITTLE ADVENTURE", "A GAME FOR US", "YOUR LITTLE GIFT",
    "YOUR BIRTHDAY WISH", "OUR FAVOURITE MEMORIES", "WORDS FROM MY HEART",
    "ONE LAST SURPRISE"
  ];

  document.querySelectorAll("[data-girlfriend]").forEach(el => el.textContent = girlfriendName);
  document.querySelectorAll("[data-sender]").forEach(el => el.textContent = senderName);
  document.getElementById("birthday-message").textContent =
    config.birthdayMessage || "May your days be filled with happiness, love and beautiful surprises.";

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }

  function showStage(index) {
    currentStage = Math.max(0, Math.min(stages.length - 1, index));
    stages.forEach((stage, i) => {
      const active = i === currentStage;
      stage.hidden = !active;
      stage.classList.toggle("active", active);
    });
    progressFill.style.width = `${((currentStage + 1) / stages.length) * 100}%`;
    progressLabel.textContent = stageLabels[currentStage];
    progressCount.textContent = `${String(currentStage + 1).padStart(2, "0")} / 07`;
    navDots.forEach((dot, i) => dot.classList.toggle("current", i === currentStage));
    backButton.disabled = currentStage === 0;
    if (musicEnabled) syncMusicForStage(currentStage);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (currentStage === 3) celebrate();
    if (currentStage === 4) renderMemories();
    if (currentStage === 5 && letterStarted) return;
  }

  document.getElementById("start-journey").addEventListener("click", () => {
    if (!musicTouched) musicEnabled = true;
    showStage(1);
  });
  backButton.addEventListener("click", () => showStage(currentStage - 1));
  document.querySelectorAll(".next-stage").forEach(button => {
    button.addEventListener("click", () => showStage(Number(button.dataset.next)));
  });

  // Floating background details
  const heartLayer = document.getElementById("floating-hearts");
  const sparkleLayer = document.getElementById("sparkle-layer");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    for (let i = 0; i < 16; i++) {
      const heart = document.createElement("span");
      heart.className = "float-heart";
      heart.textContent = i % 3 === 0 ? "♥" : "♡";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.fontSize = `${10 + Math.random() * 17}px`;
      heart.style.animationDuration = `${13 + Math.random() * 16}s`;
      heart.style.animationDelay = `${Math.random() * 18}s`;
      heartLayer.appendChild(heart);
    }
    for (let i = 0; i < 22; i++) {
      const star = document.createElement("span");
      star.className = "sparkle";
      star.textContent = i % 2 ? "✦" : "·";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.fontSize = `${8 + Math.random() * 10}px`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      sparkleLayer.appendChild(star);
    }
  }

  // MEMORY MATCH: six cards made from its own three photos, separate from the gallery.
  const memoryMatchGrid = document.getElementById("memory-match-grid");
  const matchPairCount = document.getElementById("match-pair-count");
  const matchMoves = document.getElementById("match-moves");
  const matchProgress = document.getElementById("match-progress-fill");
  const matchFeedback = document.getElementById("match-feedback");
  const matchContinue = document.getElementById("match-continue");

  const matchPhotos = (Array.isArray(config.memoryGamePhotos) ? config.memoryGamePhotos : [])
    .filter(memory => memory && typeof memory.image === "string" && memory.image.trim())
    .slice(0, 3);

  let matchedPairs = 0;
  let movesMade = 0;
  let selectedMatchCards = [];
  let matchBoardLocked = false;
  let mismatchTimer = null;

  function shuffleDeck(deck) {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function updateMatchProgress() {
    matchPairCount.textContent = `MATCHES ${matchedPairs} / 3`;
    matchMoves.textContent = String(movesMade);
    matchProgress.style.width = `${(matchedPairs / 3) * 100}%`;
  }

  function renderMemoryMatch() {
    if (mismatchTimer) {
      clearTimeout(mismatchTimer);
      mismatchTimer = null;
    }

    matchedPairs = 0;
    movesMade = 0;
    selectedMatchCards = [];
    matchBoardLocked = false;
    memoryMatchGrid.innerHTML = "";
    matchContinue.hidden = true;
    matchContinue.disabled = true;

    if (matchPhotos.length < 3) {
      matchFeedback.textContent = "Add three separate photos to the Memory Match photo list to play this game. 💗";
      matchPairCount.textContent = `MATCHES 0 / 3`;
      matchMoves.textContent = "0";
      matchProgress.style.width = "0%";
      return;
    }

    matchFeedback.textContent = "Tap any two cards and see if you can find a matching memory. 💗";

    const deck = [];
    matchPhotos.forEach((memory, pairId) => {
      const label = memory.caption || memory.label || `Our memory ${pairId + 1}`;
      deck.push({ pairId, image: memory.image, label });
      deck.push({ pairId, image: memory.image, label });
    });

    shuffleDeck(deck).forEach((card, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "memory-match-card";
      button.dataset.pairId = String(card.pairId);
      button.setAttribute("aria-label", `Face-down memory card ${index + 1}`);
      button.setAttribute("aria-pressed", "false");
      button.innerHTML = `
        <span class="memory-match-inner">
          <span class="match-card-face match-card-cover">
            <span class="match-cover-heart">♥</span>
            <span class="match-cover-initials">K <i>♡</i> S</span>
            <span class="match-cover-hint">OUR MEMORY</span>
          </span>
          <span class="match-card-face match-card-photo-face">
            <img class="match-photo" alt="">
            <span class="match-photo-caption"></span>
            <span class="match-found-mark">♥</span>
          </span>
        </span>`;

      const image = button.querySelector(".match-photo");
      image.src = card.image;
      image.alt = card.label;
      image.loading = "lazy";
      image.onerror = () => {
        image.style.display = "none";
        button.querySelector(".match-photo-caption").textContent = "Add your separate game photo in assets/images";
      };
      button.querySelector(".match-photo-caption").textContent = card.label;

      button.addEventListener("click", () => {
        if (matchBoardLocked || button.classList.contains("flipped") || button.classList.contains("matched")) {
          return;
        }

        button.classList.add("flipped");
        button.setAttribute("aria-pressed", "true");
        button.setAttribute("aria-label", `Revealed: ${card.label}`);
        selectedMatchCards.push({ button, pairId: card.pairId });

        if (selectedMatchCards.length < 2) {
          matchFeedback.textContent = "Now choose one more card. Do they match? 💕";
          return;
        }

        movesMade += 1;
        updateMatchProgress();

        const [first, second] = selectedMatchCards;
        if (first.pairId === second.pairId) {
          first.button.classList.add("matched");
          second.button.classList.add("matched");
          first.button.disabled = true;
          second.button.disabled = true;
          matchedPairs += 1;
          selectedMatchCards = [];
          updateMatchProgress();

          if (matchedPairs === 3) {
            matchFeedback.textContent = "You found all three pairs! Every picture holds a little piece of our story. 💗";
            matchContinue.hidden = false;
            matchContinue.disabled = false;
          } else {
            matchFeedback.textContent = "It's a match! One more little memory found. ♥";
          }
        } else {
          matchBoardLocked = true;
          matchFeedback.textContent = "Not a match this time. Take another look and try again. 💞";
          mismatchTimer = setTimeout(() => {
            first.button.classList.remove("flipped");
            second.button.classList.remove("flipped");
            first.button.setAttribute("aria-pressed", "false");
            second.button.setAttribute("aria-pressed", "false");
            first.button.setAttribute("aria-label", "Face-down memory card");
            second.button.setAttribute("aria-label", "Face-down memory card");
            selectedMatchCards = [];
            matchBoardLocked = false;
            mismatchTimer = null;
          }, 900);
        }
      });

      memoryMatchGrid.appendChild(button);
    });

    updateMatchProgress();
  }

  matchContinue.addEventListener("click", () => showStage(2));
  renderMemoryMatch();

  // Gift opening
  const giftBox = document.getElementById("gift-box");
  const giftInstruction = document.getElementById("gift-instruction");
  const giftReveal = document.getElementById("gift-reveal");
  giftBox.addEventListener("click", () => {
    if (giftBox.classList.contains("open")) return;
    giftBox.classList.add("open");
    giftInstruction.textContent = "A LITTLE LOVE, WRAPPED JUST FOR YOU";
    setTimeout(() => {
      giftReveal.hidden = false;
      giftInstruction.hidden = true;
    }, 650);
  });
  document.getElementById("gift-continue").addEventListener("click", () => showStage(3));

  // Memories gallery
  function renderMemories() {
    const grid = document.getElementById("memory-grid");
    if (grid.dataset.rendered === "true") return;
    grid.dataset.rendered = "true";
    const memories = Array.isArray(config.memories) ? config.memories : [];
    memories.forEach((memory, index) => {
      const card = document.createElement("article");
      card.className = "memory-card";
      card.dataset.note = memory.note || "A little moment worth keeping. ♥";
      card.style.setProperty("--tilt", `${[-1.6, 1.2, -0.8, 1.5][index % 4]}deg`);
      const photo = document.createElement("div");
      photo.className = "memory-photo";
      const img = document.createElement("img");
      img.src = memory.image || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgOTAwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IlJlcGxhY2Ugd2l0aCB5b3VyIHBob3RvIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0MTEzMjYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYTUyYTUwIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJnbG93Ij4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjBhMmI1IiBzdG9wLW9wYWNpdHk9Ii4zMiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmMGEyYjUiIHN0b3Atb3BhY2l0eT0iMCIvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI5MDAiIGZpbGw9InVybCgjZykiLz4KICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSIzOTAiIHI9IjI5MCIgZmlsbD0idXJsKCNnbG93KSIvPgogIDxwYXRoIGQ9Ik00MDAgNjEwIEMzNTAgNTY1IDIwNSA0NzAgMjA1IDM1MCBDMjA1IDIyNSAzNjAgMTkwIDQwMCAzMDAgQzQ0MCAxOTAgNTk1IDIyNSA1OTUgMzUwIEM1OTUgNDcwIDQ1MCA1NjUgNDAwIDYxMFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YwZDlhNyIgc3Ryb2tlLW9wYWNpdHk9Ii43IiBzdHJva2Utd2lkdGg9IjUiLz4KICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSIzOTAiIHI9IjIzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjBkOWE3IiBzdHJva2Utb3BhY2l0eT0iLjE4IiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI0MDAiIHk9IjczMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2YwZDlhNyIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsc2VyaWYiIGZvbnQtc2l6ZT0iMjciIGxldHRlci1zcGFjaW5nPSI4Ij5BIExJVFRMRSBNT01FTlQ8L3RleHQ+CiAgPHRleHQgeD0iNDAwIiB5PSI3ODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmN2RmZTUiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBsZXR0ZXItc3BhY2luZz0iMiI+UmVwbGFjZSB3aXRoIHlvdXIgcGhvdG88L3RleHQ+CiAgPHRleHQgeD0iNDAwIiB5PSIxMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmMGQ5YTciIGZpbGwtb3BhY2l0eT0iLjgiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLHNlcmlmIiBmb250LXNpemU9IjQyIj7inKY8L3RleHQ+Cjwvc3ZnPg==";
      img.alt = memory.caption || `Memory ${index + 1}`;
      img.loading = "lazy";
      img.onerror = () => { img.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgOTAwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IlJlcGxhY2Ugd2l0aCB5b3VyIHBob3RvIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0MTEzMjYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjYTUyYTUwIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJnbG93Ij4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjBhMmI1IiBzdG9wLW9wYWNpdHk9Ii4zMiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmMGEyYjUiIHN0b3Atb3BhY2l0eT0iMCIvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI5MDAiIGZpbGw9InVybCgjZykiLz4KICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSIzOTAiIHI9IjI5MCIgZmlsbD0idXJsKCNnbG93KSIvPgogIDxwYXRoIGQ9Ik00MDAgNjEwIEMzNTAgNTY1IDIwNSA0NzAgMjA1IDM1MCBDMjA1IDIyNSAzNjAgMTkwIDQwMCAzMDAgQzQ0MCAxOTAgNTk1IDIyNSA1OTUgMzUwIEM1OTUgNDcwIDQ1MCA1NjUgNDAwIDYxMFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YwZDlhNyIgc3Ryb2tlLW9wYWNpdHk9Ii43IiBzdHJva2Utd2lkdGg9IjUiLz4KICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSIzOTAiIHI9IjIzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjBkOWE3IiBzdHJva2Utb3BhY2l0eT0iLjE4IiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI0MDAiIHk9IjczMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2YwZDlhNyIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsc2VyaWYiIGZvbnQtc2l6ZT0iMjciIGxldHRlci1zcGFjaW5nPSI4Ij5BIExJVFRMRSBNT01FTlQ8L3RleHQ+CiAgPHRleHQgeD0iNDAwIiB5PSI3ODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmN2RmZTUiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBsZXR0ZXItc3BhY2luZz0iMiI+UmVwbGFjZSB3aXRoIHlvdXIgcGhvdG88L3RleHQ+CiAgPHRleHQgeD0iNDAwIiB5PSIxMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmMGQ5YTciIGZpbGwtb3BhY2l0eT0iLjgiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLHNlcmlmIiBmb250LXNpemU9IjQyIj7inKY8L3RleHQ+Cjwvc3ZnPg=="; };
      photo.appendChild(img);
      const label = document.createElement("p");
      label.className = "memory-label";
      label.textContent = memory.label || `MEMORY NO. ${String(index + 1).padStart(2, "0")}`;
      const caption = document.createElement("p");
      caption.className = "memory-caption";
      caption.textContent = memory.caption || "A moment to remember";
      card.append(photo, label, caption);
      grid.appendChild(card);
    });
  }

  // Love letter typing reveal
  const letterContent = document.getElementById("letter-content");
  const revealLetter = document.getElementById("reveal-letter");
  const letterContinue = document.getElementById("letter-continue");
  const paragraphs = Array.isArray(config.letterParagraphs) ? config.letterParagraphs : [];
  function revealLetterNow() {
    if (letterStarted) return;
    letterStarted = true;
    revealLetter.disabled = true;
    revealLetter.textContent = "A LITTLE LOVE NOTE ♥";
    if (reduceMotion) {
      paragraphs.forEach((text, index) => {
        const p = document.createElement("p");
        if (index === 0) p.className = "letter-opening";
        p.textContent = text;
        letterContent.appendChild(p);
      });
      finishLetter();
      return;
    }
    let pIndex = 0;
    let charIndex = 0;
    let currentP = null;
    const type = () => {
      if (pIndex >= paragraphs.length) { finishLetter(); return; }
      if (!currentP) {
        currentP = document.createElement("p");
        if (pIndex === 0) currentP.className = "letter-opening";
        letterContent.appendChild(currentP);
      }
      const text = paragraphs[pIndex] || "";
      currentP.textContent = text.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex >= text.length) {
        pIndex++;
        charIndex = 0;
        currentP = null;
        setTimeout(type, 280);
      } else {
        setTimeout(type, pIndex === 0 ? 42 : 17);
      }
    };
    type();
  }
  function finishLetter() {
    revealLetter.disabled = false;
    revealLetter.hidden = true;
    letterContinue.hidden = false;
  }
  revealLetter.addEventListener("click", revealLetterNow);
  letterContinue.addEventListener("click", () => showStage(6));

  // Celebration confetti
  function celebrate() {
    if (reduceMotion) return;
    const pieces = 65;
    for (let i = 0; i < pieces; i++) {
      const bit = document.createElement("span");
      bit.className = "confetti";
      bit.style.left = `${Math.random() * 100}%`;
      bit.style.background = ["#d6b477", "#e33e62", "#f0a2b5", "#fff0d4"][i % 4];
      bit.style.setProperty("--drift", `${(Math.random() - .5) * 180}px`);
      bit.style.animationDelay = `${Math.random() * .8}s`;
      bit.style.animationDuration = `${2.5 + Math.random() * 1.8}s`;
      document.body.appendChild(bit);
      setTimeout(() => bit.remove(), 5000);
    }
  }
  document.getElementById("celebrate-again").addEventListener("click", celebrate);

  // Replay
  document.getElementById("replay-journey").addEventListener("click", () => {
    renderMemoryMatch();
    giftBox.classList.remove("open");
    giftReveal.hidden = true;
    giftInstruction.hidden = false;
    giftInstruction.textContent = "TAP THE GIFT TO OPEN YOUR SURPRISE";
    letterContent.innerHTML = "";
    letterStarted = false;
    revealLetter.hidden = false;
    revealLetter.disabled = false;
    revealLetter.textContent = "READ MY LETTER";
    letterContinue.hidden = true;
    showStage(0);
  });

  showStage(0);
})();


/* EXTRA INTERACTIONS: sticker dock, secret notes, candle wish and gift controls */
(() => {
  const toast = document.getElementById("toast");
  let toastTimer;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function say(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function pop(emoji, source) {
    if (reduceMotion) {
      say(emoji);
      return;
    }
    const rect = source && source.getBoundingClientRect ? source.getBoundingClientRect() : null;
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight - 80;
    const item = document.createElement("span");
    item.className = "sticker-pop";
    item.textContent = emoji;
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.setProperty("--dx", `${(Math.random() - .5) * 150}px`);
    item.style.setProperty("--dy", `${-120 - Math.random() * 100}px`);
    item.style.setProperty("--rot", `${(Math.random() - .5) * 90}deg`);
    document.body.appendChild(item);
    setTimeout(() => item.remove(), 2200);
  }

  function burstSticker(emoji, source) {
    if (reduceMotion) {
      say(emoji);
      return;
    }

    // Measure the actual emoji text, not the outer button, so every sticker
    // visibly starts at the exact emoji that was tapped.
    let origin = source.getBoundingClientRect();
    try {
      const range = document.createRange();
      range.selectNodeContents(source);
      const textRect = range.getBoundingClientRect();
      if (textRect.width && textRect.height) origin = textRect;
    } catch (error) {}

    const x = origin.left + origin.width / 2;
    const y = origin.top + origin.height / 2;
    const total = 20;

    for (let i = 0; i < total; i++) {
      const angle = (Math.PI * 2 * i / total) + (Math.random() - .5) * .22;
      const distance = 90 + Math.random() * 205;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      const clampedX = Math.max(18 - x, Math.min(window.innerWidth - 18 - x, dx));
      const clampedY = Math.max(18 - y, Math.min(window.innerHeight - 18 - y, dy));

      const item = document.createElement("span");
      item.className = "sticker-pop";
      item.textContent = emoji;
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      item.style.setProperty("--dx", `${clampedX}px`);
      item.style.setProperty("--dy", `${clampedY}px`);
      item.style.setProperty("--rot", `${(Math.random() - .5) * 120}deg`);
      item.style.setProperty("--delay", `${Math.random() * .12}s`);
      item.style.fontSize = `${22 + Math.random() * 15}px`;
      document.body.appendChild(item);
      setTimeout(() => item.remove(), 2300);
    }
  }

  document.getElementById("welcome-secret")?.addEventListener("click", () => {
    say("Secret number one: you make ordinary days feel special. ♥");
    pop("💌", document.getElementById("welcome-secret"));
  });

  document.getElementById("tap-heart")?.addEventListener("click", event => {
    say("This heart belongs to you, Kavi! 💗");
    pop("💗", event.currentTarget);
    pop("💕", event.currentTarget);
  });

  document.querySelectorAll(".sticker-button").forEach(button => {
    button.addEventListener("click", () => {
      burstSticker(button.dataset.sticker || "💗", button);
      say(button.dataset.message || "A little love for you!");
    });
  });

  document.getElementById("quiz-hint")?.addEventListener("click", () => {
    say("Hint: choose the answer that makes you smile. There are no wrong answers! 💕");
  });

  const gift = document.getElementById("gift-box");
  document.getElementById("shake-gift")?.addEventListener("click", () => {
    if (!gift) return;
    gift.classList.remove("shaking");
    void gift.offsetWidth;
    gift.classList.add("shaking");
    say("I wonder what could be inside... 🎁");
    setTimeout(() => gift.classList.remove("shaking"), 650);
  });
  document.getElementById("open-gift")?.addEventListener("click", () => {
    gift?.click();
  });

  document.getElementById("blow-candles")?.addEventListener("click", event => {
    const cake = document.querySelector(".mini-cake");
    if (!cake) return;
    if (cake.classList.contains("candles-out")) {
      say("Your birthday wish is already on its way! ✨");
      return;
    }
    cake.classList.add("candles-out");
    const wish = document.getElementById("cake-wish");
    if (wish) wish.hidden = false;
    event.currentTarget.textContent = "✨ WISH SENT!";
    say("Wish made! May it come true, Kavi. 💗");
    for (let i = 0; i < 16; i++) {
      setTimeout(() => pop(["✨", "💗", "🌸"][i % 3], cake), i * 65);
    }
  });

  // Flip a memory card to reveal its little hidden note.
  document.getElementById("memory-grid")?.addEventListener("click", event => {
    const card = event.target.closest(".memory-card");
    if (!card) return;
    card.classList.toggle("flipped");
    if (card.classList.contains("flipped")) pop("💞", card);
  });

  // The illustrated envelope opens the existing typewriter letter.
  document.getElementById("letter-envelope")?.addEventListener("click", event => {
    event.currentTarget.classList.add("open");
    const prompt = document.getElementById("envelope-prompt");
    if (prompt) prompt.textContent = "A LETTER, WRITTEN JUST FOR YOU";
    const card = document.querySelector(".letter-card");
    if (card) card.hidden = false;
    document.getElementById("reveal-letter")?.click();
  });

  document.getElementById("send-kiss")?.addEventListener("click", event => {
    say("A kiss is flying straight to you, Kavi! 😘");
    for (let i = 0; i < 7; i++) setTimeout(() => pop("😘", event.currentTarget), i * 100);
  });

  document.getElementById("heart-rain")?.addEventListener("click", event => {
    say("A whole sky full of hearts, just for you! 💗");
    for (let i = 0; i < 20; i++) {
      setTimeout(() => pop(["💗", "💖", "💕", "💘"][i % 4], event.currentTarget), i * 60);
    }
  });
})();


// Reset the extra birthday interactions when the visitor replays the journey.
document.getElementById("replay-journey")?.addEventListener("click", () => {
  document.querySelector(".mini-cake")?.classList.remove("candles-out");
  const wish = document.getElementById("cake-wish");
  if (wish) wish.hidden = true;
  const blowButton = document.getElementById("blow-candles");
  if (blowButton) blowButton.textContent = "💨 BLOW OUT THE CANDLES";
  document.getElementById("letter-envelope")?.classList.remove("open");
  const letterCard = document.querySelector(".letter-card");
  if (letterCard) letterCard.hidden = true;
  const prompt = document.getElementById("envelope-prompt");
  if (prompt) prompt.textContent = "TAP THE ENVELOPE TO OPEN MY LETTER";
}, false);
