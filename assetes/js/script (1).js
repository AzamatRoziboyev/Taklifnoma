/* ==========================================================
   TO'Y TAKLIFNOMASI — script.js
   Barcha interaktiv funksiyalar shu yerda
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     0. SOZLAMALAR — shu joyni o'zingizga moslab o'zgartiring
     --------------------------------------------------------- */
  const WEDDING_DATE = new Date('2026-12-20T17:00:00'); // to'y sanasi va vaqti
  const VENUE_ADDRESS = "Toshkent shahri, Chilonzor tumani, Bunyodkor shoh ko'chasi 12";
  const CARD_NUMBER = "8600 1234 5678 9012";

  /* ---------------------------------------------------------
     1. TARJIMALAR (UZ / EN / RU)
     --------------------------------------------------------- */
  const translations = {
    uz: {
      'hero.eyebrow': "Sizni to'yimizga taklif qilamiz",
      'hero.bride': "Malika",
      'hero.groom': "Aziz",
      'hero.date': "20 Dekabr, 2026",
      'hero.button': "Taklifnomani ochish",
      'welcome.text': "Sevgi ikki qalbni birlashtiradi, oila esa ularni abadiy bog'laydi. Ushbu maxsus kunda baxtimizni siz bilan baham ko'rishni istaymiz.",
      'welcome.names': "Malika va Aziz",
      'date.title': "To'y sanasi",
      'date.month': "Dekabr",
      'countdown.days': "kun",
      'countdown.hours': "soat",
      'countdown.minutes': "daqiqa",
      'countdown.seconds': "soniya",
      'venue.title': "To'y manzili",
      'venue.name': "\u201CSultan Palace\u201D to'yxonasi",
      'venue.address': VENUE_ADDRESS,
      'venue.button': "Xaritada ko'rish",
      'gift.title': "Tabriklar uchun",
      'gift.recipient': "Qabul qiluvchi: Aziz Karimov",
      'gift.copy': "Nusxalash",
      'gift.copied': "Nusxalandi ✓",
      'rsvp.title': "Tashrifingizni tasdiqlang",
      'rsvp.sub': "Sizni kutamiz",
      'rsvp.nameLabel': "Ismingiz",
      'rsvp.phoneLabel': "Telefon raqamingiz",
      'rsvp.button': "Men boraman ❤️",
      'rsvp.success': "Rahmat! Tashrifingiz tasdiqlandi ❤️",
      'rsvp.error': "Iltimos, barcha maydonlarni to'ldiring",
      'gallery.title': "Fotolavha",
      'footer.note': "Sizni kutamiz"
    },
    en: {
      'hero.eyebrow': "You are invited to our wedding",
      'hero.bride': "Malika",
      'hero.groom': "Aziz",
      'hero.date': "December 20, 2026",
      'hero.button': "Open the invitation",
      'welcome.text': "Love unites two hearts, and family binds them forever. On this special day we would love to share our happiness with you.",
      'welcome.names': "Malika & Aziz",
      'date.title': "Wedding date",
      'date.month': "December",
      'countdown.days': "days",
      'countdown.hours': "hours",
      'countdown.minutes': "minutes",
      'countdown.seconds': "seconds",
      'venue.title': "Wedding venue",
      'venue.name': "\u201CSultan Palace\u201D banquet hall",
      'venue.address': "Bunyodkor shoh Street 12, Chilonzor district, Tashkent",
      'venue.button': "View on map",
      'gift.title': "For congratulations",
      'gift.recipient': "Recipient: Aziz Karimov",
      'gift.copy': "Copy number",
      'gift.copied': "Copied ✓",
      'rsvp.title': "Confirm your attendance",
      'rsvp.sub': "We look forward to seeing you",
      'rsvp.nameLabel': "Your name",
      'rsvp.phoneLabel': "Your phone number",
      'rsvp.button': "I'll be there ❤️",
      'rsvp.success': "Thank you! Your RSVP is confirmed ❤️",
      'rsvp.error': "Please fill in all fields",
      'gallery.title': "Gallery",
      'footer.note': "We can't wait to see you"
    },
    ru: {
      'hero.eyebrow': "Приглашаем вас на нашу свадьбу",
      'hero.bride': "Малика",
      'hero.groom': "Азиз",
      'hero.date': "20 декабря, 2026",
      'hero.button': "Открыть приглашение",
      'welcome.text': "Любовь соединяет два сердца, а семья связывает их навсегда. В этот особенный день мы хотим разделить радость с вами.",
      'welcome.names': "Малика и Азиз",
      'date.title': "Дата свадьбы",
      'date.month': "Декабря",
      'countdown.days': "дней",
      'countdown.hours': "часов",
      'countdown.minutes': "минут",
      'countdown.seconds': "секунд",
      'venue.title': "Место проведения",
      'venue.name': "Банкетный зал \u00ABSultan Palace\u00BB",
      'venue.address': "г. Ташкент, Чиланзарский район, ул. Бунёдкор шох 12",
      'venue.button': "Смотреть на карте",
      'gift.title': "Для поздравлений",
      'gift.recipient': "Получатель: Азиз Каримов",
      'gift.copy': "Скопировать",
      'gift.copied': "Скопировано ✓",
      'rsvp.title': "Подтвердите присутствие",
      'rsvp.sub': "Будем рады вас видеть",
      'rsvp.nameLabel': "Ваше имя",
      'rsvp.phoneLabel': "Ваш номер телефона",
      'rsvp.button': "Я приду ❤️",
      'rsvp.success': "Спасибо! Ваше присутствие подтверждено ❤️",
      'rsvp.error': "Пожалуйста, заполните все поля",
      'gallery.title': "Галерея",
      'footer.note': "Ждём встречи с вами"
    }
  };

  let currentLang = 'uz';

  function applyTranslations(lang){
    currentLang = lang;
    document.documentElement.lang = lang;
    const dict = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update bigMonth text to match language
    const bigMonth = document.getElementById('bigMonth');
    if (bigMonth) bigMonth.textContent = dict['date.month'];
  }

  document.getElementById('langSwitch').addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    applyTranslations(btn.dataset.lang);
  });

  /* ---------------------------------------------------------
     2. TAKLIFNOMANI OCHISH
     --------------------------------------------------------- */
  const openBtn = document.getElementById('openInvitation');
  const invitation = document.getElementById('invitation');

  openBtn.addEventListener('click', () => {
    invitation.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Musiqani ham shu yerda avtomatik yoqishga urinib ko'ramiz
    tryPlayMusic();
  });

  /* ---------------------------------------------------------
     3. FON MUSIQASI
     --------------------------------------------------------- */
  const music = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicToggle');
  let musicPlaying = false;

  function tryPlayMusic(){
    if (musicPlaying) return;
    music.play().then(() => {
      musicPlaying = true;
      musicBtn.classList.add('playing');
    }).catch(() => {
      // Brauzer avtomatik ijroga ruxsat bermasa, tugma bosilganda ishga tushadi
    });
  }

  musicBtn.addEventListener('click', () => {
    if (musicPlaying){
      music.pause();
      musicPlaying = false;
      musicBtn.classList.remove('playing');
    } else {
      tryPlayMusic();
    }
  });

  /* ---------------------------------------------------------
     4. COUNTDOWN TIMER
     --------------------------------------------------------- */
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMinutes = document.getElementById('cdMinutes');
  const cdSeconds = document.getElementById('cdSeconds');

  function pad(n){ return String(n).padStart(2, '0'); }

  function updateCountdown(){
    const now = new Date();
    let diff = WEDDING_DATE - now;

    if (diff <= 0){
      cdDays.textContent = '00';
      cdHours.textContent = '00';
      cdMinutes.textContent = '00';
      cdSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    cdDays.textContent = pad(days);
    cdHours.textContent = pad(hours);
    cdMinutes.textContent = pad(minutes);
    cdSeconds.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Katta sana bo'limini WEDDING_DATE asosida to'ldirish
  document.getElementById('bigDay').textContent = WEDDING_DATE.getDate();
  document.getElementById('bigYear').textContent = WEDDING_DATE.getFullYear();

  /* ---------------------------------------------------------
     5. XARITA TUGMASI
     --------------------------------------------------------- */
  const mapBtn = document.getElementById('mapBtn');
  mapBtn.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(VENUE_ADDRESS);

  /* ---------------------------------------------------------
     6. KARTA RAQAMINI NUSXALASH
     --------------------------------------------------------- */
  const cardNumberEl = document.getElementById('cardNumber');
  const copyBtn = document.getElementById('copyBtn');
  cardNumberEl.textContent = CARD_NUMBER;

  copyBtn.addEventListener('click', async () => {
    const text = CARD_NUMBER;
    try {
      if (navigator.clipboard && window.isSecureContext){
        await navigator.clipboard.writeText(text);
      } else {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      copyBtn.classList.add('copied');
      const label = copyBtn.querySelector('span');
      const original = label.textContent;
      label.textContent = translations[currentLang]['gift.copied'];
      showToast(translations[currentLang]['gift.copied']);
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        label.textContent = original;
      }, 1800);
    } catch (err) {
      showToast('Xatolik yuz berdi');
    }
  });

  /* ---------------------------------------------------------
     7. RSVP FORM
     --------------------------------------------------------- */
  const rsvpForm = document.getElementById('rsvpForm');
  const nameInput = document.getElementById('guestName');
  const phoneInput = document.getElementById('guestPhone');

  // placeholder bo'sh bo'lsa ham label animatsiyasi to'g'ri ishlashi uchun
  [nameInput, phoneInput].forEach(inp => inp.setAttribute('placeholder', ' '));

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !phone){
      showToast(translations[currentLang]['rsvp.error']);
      return;
    }

    showToast(translations[currentLang]['rsvp.success']);
    rsvpForm.reset();
    [nameInput, phoneInput].forEach(inp => inp.classList.remove('has-value'));
  });

  /* ---------------------------------------------------------
     8. TOAST XABARNOMA
     --------------------------------------------------------- */
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message){
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  }

  /* ---------------------------------------------------------
     9. GALEREYA MODAL
     --------------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const bg = getComputedStyle(item).backgroundImage;
      modalImg.style.backgroundImage = bg;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------------------------------------------------------
     10. SCROLL ANIMATSIYALARI (fade-up)
     --------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => observer.observe(el));

  /* ---------------------------------------------------------
     11. BOSHLANG'ICH TARJIMANI QO'LLASH
     --------------------------------------------------------- */
  applyTranslations('uz');

});
