document.addEventListener('DOMContentLoaded', () => {

  // TRANSLATIONS
  const translations = {
    uz: {
      open_invitation: "OCHISH UCHUN BOSING",
      scroll_down: "pastga suring ➔",
      date_subtext: "Davom etish uchun ushbu tugmani bosing",
      open_date_title: "Sanani oching",
      click_to_reveal: "SANANI BILISH UCHUN QIRING",
      day_name: "Yakshanba",
      dear_guests: "Aziz yaqinlarimiz!",
      greeting_body: "Sizni oilaviy baxtimiz boshlanadigan eng quvonchli kunimizda biz bilan birga mehmondorchilikda taklif etamiz. Sizning tashrifingiz bu kunni yanada unutilmas qiladi.",
      when_where: "Qachon va qayerda",
      hall_location: "Toshkent — Chilonzor tumani",
      yandex_maps: "Yandex Xaritalar ↗",
      google_maps: "Google Xaritalar ↗",
      gift_title: "To'yona",
      gift_desc: "Agar istasangiz, to'yonani kuyov kartasiga yuborishingiz mumkin:",
      recipient: "QABUL QILUVCHI:",
      card_num: "KARTA RAQAMI:",
      copy_btn: "RAQAMNI NUSXALASH",
      copied_notice: "RAQAM NUSXALANDI ✓",
      until_wedding: "To'yimizgacha",
      lbl_days: "KUN",
      lbl_hours: "SOAT",
      lbl_mins: "DAQIQA",
      lbl_secs: "SONIYA",
      see_you_text: "Siz bilan uchrashuvni intizorlik bilan kutamiz!"
    },
    en: {
      open_invitation: "CLICK TO OPEN",
      scroll_down: "scroll down ➔",
      date_subtext: "Click below to proceed",
      open_date_title: "Reveal the date",
      click_to_reveal: "CLICK CARDS TO REVEAL",
      day_name: "Sunday",
      dear_guests: "Dear guests!",
      greeting_body: "We cordially invite you to celebrate our special day with us. Your presence will make it unforgettable.",
      when_where: "When & Where",
      hall_location: "Tashkent — Chilonzor district",
      yandex_maps: "Yandex Maps ↗",
      google_maps: "Google Maps ↗",
      gift_title: "Wedding Gift",
      gift_desc: "If you wish, you can send your gift to the groom's card:",
      recipient: "RECIPIENT:",
      card_num: "CARD NUMBER:",
      copy_btn: "COPY NUMBER",
      copied_notice: "NUMBER COPIED ✓",
      until_wedding: "Until Wedding",
      lbl_days: "DAYS",
      lbl_hours: "HOURS",
      lbl_mins: "MINS",
      lbl_secs: "SECS",
      see_you_text: "We look forward to seeing you!"
    },
    ru: {
      open_invitation: "NAZHMITYE CHTOBY OTKRYT'",
      scroll_down: "listaite vniz ➔",
      date_subtext: "Nazhmite knopku nizhe",
      open_date_title: "Otkroyte datu",
      click_to_reveal: "NAZHMITYE CHTOBY UZNAT'",
      day_name: "Voskresen'ye",
      dear_guests: "Dorogiye gosti!",
      greeting_body: "Priglashaem vas razdelit' s nami etot radostnyy den'. Vashe prisutstviye sdelaet ego nezabyvaemym.",
      when_where: "Gde i kogda",
      hall_location: "Tashkent — Chilonzarskiy rayon",
      yandex_maps: "Yandex Karty ↗",
      google_maps: "Google Karty ↗",
      gift_title: "Podarok",
      gift_desc: "Esli khotite, mozhete perevesti podarok na kartu zhenikha:",
      recipient: "POLUCHATEL':",
      card_num: "NOMER KARTY:",
      copy_btn: "SKOPIROVAT'",
      copied_notice: "NOMER SKOPIROVAN ✓",
      until_wedding: "Do svad'by",
      lbl_days: "DNEI",
      lbl_hours: "CHASOV",
      lbl_mins: "MINUT",
      lbl_secs: "SEKUND",
      see_you_text: "S terpeniyem zdem vstrechi s vami!"
    }
  };

  // 1. ENVELOPE & MUSIC
  const openBtn = document.getElementById('openBtn');
  const envelope = document.getElementById('envelope');
  const envelopeScreen = document.getElementById('envelopeScreen');
  const bgMusic = document.getElementById('bg-music');
  const musicIcon = document.getElementById('musicIcon');
  let isPlaying = false;

  function shootFlowers() {
    confetti({
      particleCount: 40,
      spread: 90,
      origin: { y: 0.5 },
      shapes: [confetti.shapeFromText({ text: '🌸', scalar: 2 }), confetti.shapeFromText({ text: '🌹', scalar: 2 })]
    });
  }

  openBtn.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(shootFlowers, 300);

    bgMusic.play().then(() => {
      isPlaying = true;
      musicIcon.textContent = '⏸';
    }).catch(e => console.log(e));

    setTimeout(() => {
      envelopeScreen.classList.add('opened');
    }, 1200);
  });

  // MUSIC TOGGLE
  const musicBtn = document.getElementById('musicBtn');
  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicIcon.textContent = '▶';
      isPlaying = false;
    } else {
      bgMusic.play();
      musicIcon.textContent = '⏸';
      isPlaying = true;
    }
  });

  // LANGUAGE SWITCH
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      langBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const lang = e.target.getAttribute('data-lang');
      
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
          el.textContent = translations[lang][key];
        }
      });
    });
  });

  // 3. SANANI OCHING SCRATCH CARDS
  const scratchCards = document.querySelectorAll('.scratch-card');
  const revealedDateBox = document.getElementById('revealedDateBox');
  let revealedCount = 0;

  scratchCards.forEach(card => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('revealed')) {
        card.classList.add('revealed');
        revealedCount++;
        if (revealedCount === 3) {
          revealedDateBox.classList.add('show');
        }
      }
    });
  });

  // 6. COPY CARD NUMBER
  const copyBtn = document.getElementById('copyBtn');
  const copyNotice = document.getElementById('copyNotice');

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText("8600000000000000").then(() => {
      copyNotice.classList.add('show');
      setTimeout(() => copyNotice.classList.remove('show'), 2000);
    });
  });

  // 7. COUNTDOWN TIMER
  const targetDate = new Date('2027-09-19T18:00:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
      document.getElementById('days').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
      document.getElementById('hours').textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      document.getElementById('minutes').textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      document.getElementById('seconds').textContent = Math.floor((diff % (1000 * 60)) / 1000);
    }
  }
  setInterval(updateTimer, 1000);
  updateTimer();

  // SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.1 });

  reveals.forEach(r => observer.observe(r));
});