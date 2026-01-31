// ===== ELEMENTS =====
const startBtn = document.getElementById("startBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");

const weddingMusic = document.getElementById("weddingMusic");

// ===== START BUTTON =====
startBtn.addEventListener("click", async () => {
  try {
    // allow sound (user gesture)
    video1.muted = false;
    video1.volume = 1;

    await video1.play();

    // after 10 seconds → shrink video & show buttons
    setTimeout(() => {
      video1.classList.add("shrink");
      yesBtn.style.display = "inline-block";
      noBtn.style.display = "inline-block";
    }, 10000);

  } catch (err) {
    console.error("Video 1 play failed:", err);
  }
});

// ===== NO BUTTON BEHAVIOR =====
let noCount = 0;

noBtn.addEventListener("click", () => {
  noCount++;

  // move button randomly
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * 80 + "%";
  noBtn.style.top = Math.random() * 80 + "%";

  // shrink No button
  noBtn.style.transform = `scale(${1 - noCount * 0.1})`;

  // grow Yes button
  yesBtn.style.transform = `scale(${1 + noCount * 0.15})`;

  // change text
  const texts = [
    "Are you sure?",
    "Think again 😭",
    "Last chance!",
    "Pleaseee 🥺",
    "You can’t escape 😈"
  ];

  noBtn.innerText = texts[Math.min(noCount - 1, texts.length - 1)];
});

// ===== YES BUTTON =====
yesBtn.addEventListener("click", async () => {
  try {
    // confetti (if you already have it)
    if (window.confetti) {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // stop first video
    video1.pause();

    // play wedding music at 20%
    weddingMusic.volume = 0.2;
    weddingMusic.play();

    // play second video with sound
    video2.volume = 1;
    await video2.play();

  } catch (err) {
    console.error("Yes action failed:", err);
  }
});
