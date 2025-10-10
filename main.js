document.documentElement.classList.add('js-enabled');

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('primary-navigation');
const navLinkItems = navLinks ? navLinks.querySelectorAll('a') : [];
const scrollTopButton = document.querySelector('.scroll-top');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Mobile menü aç/kapat
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// GSAP & ScrollTrigger animasyonları
const animateSections = () => {
  if (!(window.gsap && window.ScrollTrigger)) {
    document.querySelectorAll('.reveal').forEach((section) => section.classList.add('visible'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach((section) => section.classList.add('visible'));
    return;
  }

  const heroTimeline = gsap.timeline({
    defaults: { duration: 0.9, ease: 'power3.out' }
  });

  heroTimeline
    .from('.hero-pill', { y: 30, opacity: 0 })
    .from('.hero h1', { y: 40, opacity: 0 }, '-=0.4')
    .from('.hero p', { y: 30, opacity: 0 }, '-=0.3')
    .from('.hero-actions', { y: 30, opacity: 0 }, '-=0.2')
    .from('.hero-highlights li', {
      opacity: 0,
      y: 24,
      stagger: 0.12
    }, '-=0.1');

  document.querySelectorAll('[data-animate]').forEach((section) => {
    const animationType = section.getAttribute('data-animate');

    const opts = {
      opacity: 0,
      ease: 'power3.out',
      duration: 0.9,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true
      }
    };

    if (animationType === 'tilt') {
      gsap.from(section, { ...opts, y: 60, rotationX: 8 });
    } else if (animationType === 'rise') {
      gsap.from(section, { ...opts, y: 70 });
    } else {
      gsap.from(section, { ...opts, y: 50 });
    }
  });

  document.querySelectorAll('.feature-card').forEach((card) => {
    gsap.from(card, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true
      }
    });
  });

  document.querySelectorAll('.team-card').forEach((card) => {
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true
      }
    });
  });

  document.querySelectorAll('.roadmap-item').forEach((item) => {
    gsap.from(item, {
      x: -40,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        once: true
      }
    });
  });
};

animateSections();

const initMetricCounters = () => {
  const metricElements = Array.from(document.querySelectorAll('.metric-value'));
  if (!metricElements.length) {
    return;
  }

  const toNumber = (value) => {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  const toDuration = (value) => {
    const parsed = parseInt(value || '', 10);
    if (Number.isNaN(parsed)) {
      return 1600;
    }
    return Math.max(parsed, 600);
  };

  const toDecimals = (value) => {
    const parsed = parseInt(value || '', 10);
    if (Number.isNaN(parsed)) {
      return 0;
    }
    return Math.max(parsed, 0);
  };

  const formatNumber = (num, decimals) => num.toLocaleString('tr-TR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const setInitialValue = (element) => {
    const decimals = toDecimals(element.dataset.decimals);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    element.textContent = `${prefix}${formatNumber(0, decimals)}${suffix}`;
  };

  const animateMetric = (element) => {
    const target = toNumber(element.dataset.target);
    const duration = toDuration(element.dataset.duration);
    const decimals = toDecimals(element.dataset.decimals);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const currentValue = target * eased;
      element.textContent = `${prefix}${formatNumber(currentValue, decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = `${prefix}${formatNumber(target, decimals)}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    metricElements.forEach((element) => {
      setInitialValue(element);
      animateMetric(element);
    });
    return;
  }

  const observer = new IntersectionObserver((entries, observerRef) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateMetric(entry.target);
        observerRef.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  metricElements.forEach((element) => {
    setInitialValue(element);
    observer.observe(element);
  });
};

initMetricCounters();

const initFaqAccordion = () => {
  const faqButtons = Array.from(document.querySelectorAll('.faq-question'));
  if (!faqButtons.length) {
    return;
  }

  const closeButton = (button) => {
    const answer = button.nextElementSibling;
    button.setAttribute('aria-expanded', 'false');
    if (answer instanceof HTMLElement && answer.classList.contains('faq-answer')) {
      answer.hidden = true;
    }
  };

  faqButtons.forEach((button) => {
    const answer = button.nextElementSibling;
    if (answer instanceof HTMLElement && answer.classList.contains('faq-answer')) {
      answer.hidden = true;
    }
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      faqButtons.forEach((otherButton) => {
        if (otherButton !== button) {
          closeButton(otherButton);
        }
      });

      if (isExpanded) {
        closeButton(button);
      } else {
        button.setAttribute('aria-expanded', 'true');
        if (answer instanceof HTMLElement && answer.classList.contains('faq-answer')) {
          answer.hidden = false;
        }
      }
    });

    button.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
        return;
      }

      event.preventDefault();
      const currentIndex = faqButtons.indexOf(button);
      if (currentIndex === -1) {
        return;
      }

      const offset = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (currentIndex + offset + faqButtons.length) % faqButtons.length;
      faqButtons[nextIndex].focus();
    });
  });
};

initFaqAccordion();

// Scroll-to-top görünürlüğü
const handleScrollButton = () => {
  const showButton = window.scrollY > 320;
  if (scrollTopButton) {
    scrollTopButton.classList.toggle('visible', showButton);
  }
};

window.addEventListener('scroll', handleScrollButton, { passive: true });
handleScrollButton();

if (scrollTopButton) {
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Form doğrulaması
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    formStatus.textContent = '';

    let error = '';

    if (!name || !email || !message) {
      error = 'Lütfen tüm alanları doldurun.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      error = 'Lütfen geçerli bir e-posta adresi girin.';
    }

    if (error) {
      formStatus.textContent = error;
      formStatus.style.color = '#d84315';
      return;
    }

    formStatus.style.color = 'var(--color-primary)';
    formStatus.textContent = 'Teşekkürler! En kısa sürede sizinle iletişime geçeceğiz.';
    form.reset();
  });
}
