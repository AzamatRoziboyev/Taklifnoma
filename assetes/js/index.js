document.addEventListener('DOMContentLoaded', () => {

  // TRANSLATIONS DICTIONARY
  const translations = {
    uz: {
      open_invitation: "TAKLIFNOMANI OCHISH",
      hero_welcome: "Biz bilan baxtimizni baham ko'ring",
      countdown_title: "Sana va Vaqt",
      date_text: "19 Sentabr 2026",
      days_label: "KUN",
      hours_label: "SOAT",
      minutes_label: "DAQIQA",
      seconds_label: "SONIYA",
      invitation_header: "To'yimizga",
      invitation_body: "Aziz va qadrli mehmonimiz! Sizni hayotimizdagi eng quvonchli va unutilmas kunimiz — nikoh to'yimizda faxriy mehmonimiz bo'lishga lutfan taklif etamiz.",
      venue_title: "To'y Manzili",
      venue_address: "Xorazm viloyati, Hazorasp tumani, Markaziy ko'chasi 15-uy",
      time_label: "Boshlanish vaqti:",
      view_map_btn: "XARITADA KO'RISH",
      gift_title: "To'yona",
      gift_text: "Agar istasangiz, to'yona va ezgu tilaklaringizni havola qilingan karta raqamiga yuborishingiz mumkin.",
      card_recipient: "QABUL QILUVCHI:",
      card_number: "KARTA RAQAMI:",
      copy_btn: "RAQAMNI NUSXALASH",
      copied_notice: "Raqam nusxalandi ✓",
      gallery_title: "Foto Galereya",
      footer_love: "Sevgi bilan yaratilgan"
    },
    en: {
      open_invitation: "OPEN INVITATION",
      hero_welcome: "Share our happiness with us",
      countdown_title: "Date & Time",
      date_text: "September 19, 2026",
      days_label: "DAYS",
      hours_label: "HOURS",
      minutes_label: "MINS",
      seconds_label: "SECS",
      invitation_header: "Our Wedding",
      invitation_body: "Dear guest! We cordially invite you to be our honored guest on the most joyful and unforgettable day of our lives — our wedding day.",
      venue_title: "Wedding Venue",
      venue_address: "Khorezm region, Khazorasp district, Central Street 15",
      time_label: "Start Time:",
      view_map_btn: "VIEW ON MAP",
      gift_title: "Wedding Gift",
      gift_text: "If you wish, you can send your gift and warm wishes to the card number provided below.",
      card_recipient: "RECIPIENT:",
      card_number: "CARD NUMBER:",
      copy_btn: "COPY NUMBER",
      copied_notice: "Number copied ✓",
      gallery_title: "Photo Gallery",
      footer_love: "Created with love"
    },
    ru: {
      open_invitation: "OTKRYT' PRIGLASHENIE",
      hero_welcome: "Razdelite s nami nashe schast'ye",
      countdown_title: "Data i Vremya",
      date_text: "19 Sentyabrya 2026",
      days_label: "DNEJ",
      hours_label: "CHASOV",
      minutes_label: "MINUT",
      seconds_label: "SEKUND",
      invitation_header: "Na svad'bu",
      invitation_body: "Dorogoy gost'! Serdechno priglashaem vas stat' pochetnym gostem v samyj radostnyj i nezabyvaemyj den' nashey zhizni — den' nashey svad'by.",
      venue_title: "Mesto Provedeniya",
      venue_address: "Khorezmskaya oblast', Khazaraspskij rayon, Tsentral'naya ulitsa 15",
      time_label: "Vremya nachala:",
      view_map_btn: "POKAZAT' NA KARTE",
      gift_title: "Podarok",
      gift_text: "Esli khotite, mozhete otpravit' podarok i nailuchshie pozhelaniya na kartatsevoy nomer.",
      card_recipient: "POLUCHATEL':",
      card_number: "NOMER KARTY:",
      copy_btn: "SKOPIROVAT'",
      copied_notice: "Nomer skopirovan ✓",
      gallery_title: "Foto Galereya",
      footer_love: "Sdelano s lyubov'yu"
    }
  };

  // 1. ENVELOPE OPENING & MUSIC START
  const openBtn = document.getElementById('openBtn');
  const envelope = document.getElementById('envelope');
  const envelopeScreen = document.getElementById('envelopeScreen');
  const bgMusic = document.getElementById('bg-music');
  const musicIcon = document.getElementById('musicIcon');
  let isPlaying = false;

  openBtn.addEventListener('click', () => {
    envelope.classList.add('open');
    
    // Play audio
    bgMusic.play().then(() => {
      isPlaying = true;
      musicIcon.textContent = '🔊';
    }).catch(err => {
      console.log("Autoplay blocked:", err);
    });

    setTimeout(() => {
      envelopeScreen.classList.add('opened');
    }, 1200);
  });

  // 4. MUSIC CONTROLLER
  const musicBtn = document.getElementById('musicBtn');
  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicIcon.textContent = '🔇';
      isPlaying = false;
    } else {
      bgMusic.play();
      musicIcon.textContent = '🔊';
      isPlaying = true;
    }
  });

  // 3. LANGUAGE SWITCHER
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      langBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const lang = e.target.getAttribute('data-lang');
      updateLanguage(lang);
    });
  });

  function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  // 5. COUNTDOWN TIMER (Target: 19 Sept 2026, 18:00)
  const targetDate = new Date('2026-09-19T18:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = String(days).padStart(2, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // 7. COPY CARD NUMBER TO CLIPBOARD
  const copyBtn = document.getElementById('copyBtn');
  const copyNotice = document.getElementById('copyNotice');

  copyBtn.addEventListener('click', () => {
    const cardNumber = "8600000000000000";
    navigator.clipboard.writeText(cardNumber).then(() => {
      copyNotice.classList.add('show');
      setTimeout(() => {
        copyNotice.classList.remove('show');
      }, 2500);
    });
  });

  // 9. GALLERY FULLSCREEN MODAL
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');
  const galleryImgs = document.querySelectorAll('.gallery-img');

  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
    });
  });

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // 11. SCROLL REVEAL (INTERSECTION OBSERVER)
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach(reveal => observer.observe(reveal));
});