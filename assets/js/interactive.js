/**
 * KZR Consulting - Interactive Utilities
 * Counters, FAQ accordion, and Before/After slider.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initFaqAccordion();
  initBeforeAfterSlider();
});

/**
 * 1. Animated Metric Counters
 * Solves the original website bug where counters remained at "0"
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
 * 2. Accessible FAQ Accordion
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

      // Close all other items
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
 * 3. Before / After Comparison Slider
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
