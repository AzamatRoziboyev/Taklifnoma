const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggleBtn');

// Konvertni ochish va musiqani boshlash
function openEnvelope() {
  const envelope = document.getElementById('envelope');
  
  if (envelope) {
    const flap = envelope.querySelector('.flap');
    if (flap) {
      flap.style.transform = 'rotateX(180deg)';
    }
  }

  setTimeout(() => {
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainScreen = document.getElementById('main-screen');

    if (envelopeScreen) envelopeScreen.classList.add('hidden');
    if (mainScreen) mainScreen.classList.remove('hidden');

    if (bgMusic) {
      bgMusic.play().then(() => {
        if (musicBtn) musicBtn.innerText = "⏸";
      }).catch(err => {
        console.log("Audio ijro etishda xatolik:", err);
      });
    }
  }, 600);
}

// Musiqani to'xtatish yoki qayta yoqish
function toggleMusic() {
  if (!bgMusic) return;

  if (bgMusic.paused) {
    bgMusic.play();
    if (musicBtn) musicBtn.innerText = "⏸";
  } else {
    bgMusic.pause();
    if (musicBtn) musicBtn.innerText = "▶";
  }
}

// Sanani ko'rsatish
let clickedCoins = new Set();

function revealDate(id) {
  const coins = document.querySelectorAll('.scratch-coins .coin');
  if (coins[id - 1]) {
    coins[id - 1].style.visibility = 'hidden';
  }
  
  clickedCoins.add(id);

  if (clickedCoins.size >= 3) {
    setTimeout(() => {
      const scratchCoinsContainer = document.querySelector('.scratch-coins');
      if (scratchCoinsContainer) scratchCoinsContainer.style.display = 'none';
      
      const revealedDate = document.getElementById('revealed-date');
      if (revealedDate) revealedDate.classList.remove('hidden');
    }, 300);
  }
}

// Karta raqamini nusxalash
function copyCard() {
  const cardNumEl = document.getElementById('cardNumber');
  if (!cardNumEl) return;
  
  const cardNum = cardNumEl.innerText;
  navigator.clipboard.writeText(cardNum.replace(/\s+/g, '')).then(() => {
    alert("Karta raqami nusxalandi!");
  }).catch(err => {
    console.error("Nusxalashda xatolik:", err);
  });
}

// Taymer mantiqi (20-oktabr 2026-yil, 18:00)
const targetDate = new Date("October 20, 2026 18:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    daysEl.innerText = days < 10 ? '0' + days : days;
    hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
  } else {
    daysEl.innerText = "00";
    hoursEl.innerText = "00";
    minutesEl.innerText = "00";
    secondsEl.innerText = "00";
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();