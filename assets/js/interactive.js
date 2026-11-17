/**
 * KZR Consulting - Interactive Utilities
 * Comprehensive module for luxury micro-interactions:
 * 1. Animated Metric Counters (IntersectionObserver with smooth cubic easing)
 * 2. Accessible FAQ Accordion (ARIA compliant with smooth height animation)
 * 3. Before/After Split Comparison Slider (touch & mouse draggable)
 * 4. Interactive 3D Tilt Micro-Interactions on Cards (.tilt-card, .kzr-pole-card, .kzr-pillar-card)
 * 5. Interactive Pole Category Filter (smooth animated pill filtering)
 * 6. Interactive Testimonial Carousel (auto-play with pause on hover/focus, prev/next buttons, and dot indicators)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initFaqAccordion();
  initBeforeAfterSlider();
  init3DTiltCards();
  initPoleCategoryFilter();
  initTestimonialCarousel();
});

/**
 * =========================================================================
 * 1. Animated Metric Counters
 * Solves the original website bug where counters remained at "0"
 * =========================================================================
 */
function initCounters() {
  const statNumbers = document.querySelectorAll('.kzr-stat-number[data-target]');
  if (!statNumbers.length) return;

  const countUp = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000; // ms
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);

      el.innerHTML = `${prefix}${current}<span class="highlight">${suffix}</span>`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.innerHTML = `${prefix}${target}<span class="highlight">${suffix}</span>`;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach(stat => observer.observe(stat));
}

/**
 * =========================================================================
 * 2. Accessible FAQ Accordion
 * =========================================================================
 */
function initFaqAccordion() {
  const items = document.querySelectorAll('.kzr-faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const trigger = item.querySelector('.kzr-faq-trigger');
    const content = item.querySelector('.kzr-faq-content');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for a clean single-open accordion UX
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherTrigger = other.querySelector('.kzr-faq-trigger');
          const otherContent = other.querySelector('.kzr-faq-content');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/**
 * =========================================================================
 * 3. Before / After Comparison Slider
 * =========================================================================
 */
function initBeforeAfterSlider() {
  const container = document.querySelector('.kzr-ba-container');
  if (!container) return;

  const handle = container.querySelector('.kzr-ba-handle');
  if (!handle) return;

  let isDragging = false;

  const updatePosition = (clientX) => {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    container.style.setProperty('--ba-pos', `${percent}%`);
  };

  const onStart = (e) => {
    isDragging = true;
    e.preventDefault();
  };
  const onEnd = () => { isDragging = false; };
  const onMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    updatePosition(clientX);
  };

  handle.addEventListener('mousedown', onStart);
  handle.addEventListener('touchstart', onStart, { passive: false });

  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);

  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: true });

  container.addEventListener('click', (e) => {
    updatePosition(e.clientX);
  });
}

/**
 * =========================================================================
 * 4. Interactive 3D Tilt Micro-Interaction on Cards
 * Applied to .kzr-pole-card, .kzr-pillar-card, .tilt-card
 * Provides smooth perspective tilt and subtle dynamic golden reflection
 * =========================================================================
 */
function init3DTiltCards() {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Disable on primary touch devices to avoid scroll lag
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  if (isTouch && window.innerWidth < 1024) {
    return;
  }

  const cards = document.querySelectorAll('.tilt-card, .kzr-pole-card, .kzr-pillar-card');
  if (!cards.length) return;

  const MAX_TILT = 7.5; // Max angle in degrees for refined luxury feel
  const PERSPECTIVE = 1000; // Depth perspective in px

  cards.forEach(card => {
    let bounds = null;
    let rafId = null;

    const onMouseEnter = () => {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease-out';
      card.style.transformStyle = 'preserve-3d';
      card.style.willChange = 'transform';
    };

    const onMouseMove = (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPercent = mouseX / bounds.width;  // 0.0 to 1.0
      const yPercent = mouseY / bounds.height; // 0.0 to 1.0

      // Calculate tilt angles relative to card center
      const tiltX = ((0.5 - yPercent) * MAX_TILT).toFixed(2);
      const tiltY = ((xPercent - 0.5) * MAX_TILT).toFixed(2);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px) scale3d(1.015, 1.015, 1.015)`;
        card.style.setProperty('--glare-x', `${(xPercent * 100).toFixed(1)}%`);
        card.style.setProperty('--glare-y', `${(yPercent * 100).toFixed(1)}%`);
      });
    };

    const onMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      bounds = null;
      card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
      card.style.transform = `perspective(${PERSPECTIVE}px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)`;
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}

/**
 * =========================================================================
 * 5. Interactive Category Filter for Poles
 * Smooth animated filter pills: Tous, Copropriétés, Entreprises, Particuliers
 * =========================================================================
 */
function initPoleCategoryFilter() {
  const filterBar = document.querySelector('.kzr-filter-bar');
  const poleCards = document.querySelectorAll('.kzr-pole-card');
  if (!poleCards.length) return;

  // Fallback category mapping if data-category is not already set on some cards
  const categoryFallbackMap = {
    syndic: 'copropriete',
    securite: 'copropriete entreprise particulier',
    nettoyage: 'copropriete entreprise particulier',
    renovation: 'copropriete entreprise particulier',
    amenagement: 'entreprise particulier copropriete',
    'espaces-verts': 'copropriete entreprise particulier'
  };

  // Ensure every card has a data-category
  poleCards.forEach(card => {
    if (!card.getAttribute('data-category')) {
      const poleId = card.getAttribute('data-pole') || card.getAttribute('data-pole-id') || '';
      const mapped = categoryFallbackMap[poleId] || 'copropriete entreprise particulier';
      card.setAttribute('data-category', mapped);
    }
  });

  // If filterBar already exists in markup, bind to buttons
  const pills = filterBar ? filterBar.querySelectorAll('.kzr-filter-pill') : [];
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const selectedFilter = pill.getAttribute('data-filter') || 'all';

      // Update active state and ARIA attributes
      pills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      // Filter cards with smooth opacity and scale animation
      poleCards.forEach(card => {
        const cardCategories = (card.getAttribute('data-category') || '').split(' ');
        const isMatch = (selectedFilter === 'all') || cardCategories.includes(selectedFilter);

        if (isMatch) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.classList.remove('is-hidden');
            card.classList.add('is-visible');
            card.style.opacity = '1';
            card.style.transform = '';
            card.style.pointerEvents = 'auto';
          });
        } else {
          card.classList.remove('is-visible');
          card.classList.add('is-hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          card.style.pointerEvents = 'none';

          // Hide completely after transition completes
          setTimeout(() => {
            if (card.classList.contains('is-hidden')) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}

/**
 * =========================================================================
 * 6. Interactive Testimonial Carousel
 * Auto-play with pause on hover/focus, next/prev navigation, and dot indicators
 * =========================================================================
 */
function initTestimonialCarousel() {
  let carousel = document.querySelector('.kzr-carousel, .kzr-testimonials-carousel');
  const staticGrid = document.querySelector('.kzr-testimonials-grid');

  // If carousel container doesn't exist yet but static grid does, wrap grid into carousel seamlessly
  if (!carousel && staticGrid) {
    const parent = staticGrid.parentElement;
    if (parent) {
      const carouselWrapper = document.createElement('div');
      carouselWrapper.className = 'kzr-carousel';
      carouselWrapper.setAttribute('role', 'region');
      carouselWrapper.setAttribute('aria-roledescription', 'carousel');
      carouselWrapper.setAttribute('aria-label', 'Témoignages clients KZR Consulting');

      // Controls Header or Footer
      const controlsBar = document.createElement('div');
      controlsBar.className = 'kzr-carousel-controls';
      controlsBar.innerHTML = `
        <button type="button" class="kzr-carousel-btn kzr-carousel-prev" aria-label="Témoignage précédent">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <div class="kzr-carousel-dots" role="tablist" aria-label="Sélectionner un témoignage"></div>
        <button type="button" class="kzr-carousel-btn kzr-carousel-next" aria-label="Témoignage suivant">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      `;

      // Move staticGrid inside carousel wrapper
      parent.insertBefore(carouselWrapper, staticGrid);
      carouselWrapper.appendChild(staticGrid);
      carouselWrapper.appendChild(controlsBar);
      carousel = carouselWrapper;
    }
  }

  if (!carousel) return;

  const track = carousel.querySelector('.kzr-carousel-track') || carousel.querySelector('.kzr-testimonials-grid');
  if (!track) return;

  const slides = Array.from(track.children).filter(el => el.classList.contains('kzr-testimonial-card') || el.classList.contains('kzr-carousel-slide'));
  if (slides.length <= 1) return;

  const prevBtn = carousel.querySelector('.kzr-carousel-prev');
  const nextBtn = carousel.querySelector('.kzr-carousel-next');
  const dotsContainer = carousel.querySelector('.kzr-carousel-dots');

  let currentIndex = 0;
  let autoPlayTimer = null;
  const AUTOPLAY_INTERVAL = 5500; // ms

  // Calculate items per view based on viewport width
  const getItemsPerView = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  // Generate dot buttons
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    const dotCount = slides.length;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `kzr-carousel-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Voir témoignage ${i + 1}`);
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => {
        goToSlide(i);
        restartAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  const updateDots = () => {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.kzr-carousel-dot');
    dots.forEach((dot, idx) => {
      const isActive = idx === currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  };

  const goToSlide = (index) => {
    const total = slides.length;
    // Wrap around smoothly
    if (index < 0) {
      currentIndex = total - 1;
    } else if (index >= total) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // On mobile or when track is styled as a flex row, apply translate
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      track.style.transition = 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)';
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    } else {
      // On desktop, highlight current slide or slide gracefully
      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add('kzr-slide-featured');
        } else {
          slide.classList.remove('kzr-slide-featured');
        }
      });
    }

    updateDots();
  };

  const nextSlide = () => goToSlide(currentIndex + 1);
  const prevSlide = () => goToSlide(currentIndex - 1);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoPlay();
    });
  }

  // Auto-play management
  const startAutoPlay = () => {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
  };

  const stopAutoPlay = () => {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  };

  const restartAutoPlay = () => {
    stopAutoPlay();
    startAutoPlay();
  };

  // Pause on hover & focus
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);
  carousel.addEventListener('focusin', stopAutoPlay);
  carousel.addEventListener('focusout', startAutoPlay);

  // Touch Swipe Gesture Support
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoPlay();
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide(); // Swiped left -> next
      } else {
        prevSlide(); // Swiped right -> prev
      }
    }
    startAutoPlay();
  }, { passive: true });

  // Handle window resize
  window.addEventListener('resize', () => {
    goToSlide(currentIndex);
  }, { passive: true });

  // Initialize first slide and start timer
  goToSlide(0);
  startAutoPlay();
}
