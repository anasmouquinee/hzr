/**
 * KZR Consulting - Main JavaScript
 * Handles navigation, mobile menu, scroll effects, and general UX.
 * Built with vanilla modern JavaScript - lightweight and fast.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initBackToTop();
  initScrollAnimations();
});

/**
 * 1. Sticky Header elevation and styling on scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.kzr-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * 2. Mobile Off-Canvas Drawer Menu & Submenu Toggles
 */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.kzr-menu-toggle');
  const drawer = document.querySelector('.kzr-mobile-drawer');
  const backdrop = document.querySelector('.kzr-drawer-backdrop');
  const closeBtn = document.querySelector('.kzr-drawer-close');
  const serviceToggle = document.querySelector('.kzr-drawer-submenu-toggle');
  const serviceSublist = document.querySelector('.kzr-drawer-sublist');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Services accordion in drawer
  if (serviceToggle && serviceSublist) {
    serviceToggle.addEventListener('click', (e) => {
      e.preventDefault();
      serviceSublist.classList.toggle('open');
      const icon = serviceToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-chevron-up');
        icon.classList.toggle('fa-chevron-down');
      }
    });
  }
}

/**
 * 3. Back to Top Button
 */
function initBackToTop() {
  const btn = document.querySelector('.kzr-back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * 4. Lightweight Scroll Reveal Animations
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}
