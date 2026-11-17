/**
 * KZR Consulting - Hero Luxury Golden Ambient Particle System
 * Pure Vanilla JavaScript Canvas animation with zero external dependencies.
 * Creates a subtle, high-end floating golden dust effect in the Hero section.
 * Automatically pauses when out of view (IntersectionObserver) or when the tab is blurred.
 */

(function () {
  'use strict';

  /**
   * Configuration constants for ambient particles
   */
  const PARTICLE_CONFIG = {
    canvasId: 'kzr-hero-canvas',
    heroSelector: '.kzr-hero',
    baseCountDesktop: 50,
    baseCountMobile: 22,
    colors: [
      'rgba(212, 175, 55, ',   // Classic Moroccan Gold #D4AF37
      'rgba(235, 200, 95, ',   // Warm Sun Gold #EBC85F
      'rgba(243, 229, 171, ',  // Champagne Gold #F3E5AB
      'rgba(255, 215, 0, ',    // Bright Luxury Gold #FFD700
      'rgba(197, 155, 39, '    // Deep Antique Gold #C59B27
    ],
    maxSpeedY: 0.35,
    minSpeedY: 0.08,
    mouseRadius: 130,
    mousePushFactor: 0.04
  };

  class HeroParticleSystem {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.hero = null;
      this.particles = [];
      this.animationFrameId = null;
      this.isRunning = false;
      this.isVisible = true;
      this.width = 0;
      this.height = 0;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.mouse = {
        x: -9999,
        y: -9999,
        active: false
      };

      this.init();
    }

    /**
     * Initialize canvas, listeners, and start the animation loop
     */
    init() {
      this.hero = document.querySelector(PARTICLE_CONFIG.heroSelector);
      if (!this.hero) {
        return;
      }

      this.canvas = document.getElementById(PARTICLE_CONFIG.canvasId);

      // If canvas is not yet present in HTML, create and inject it gracefully
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = PARTICLE_CONFIG.canvasId;
        this.canvas.setAttribute('aria-hidden', 'true');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.85';
        this.hero.style.position = 'relative';
        this.hero.insertBefore(this.canvas, this.hero.firstChild);
      }

      this.ctx = this.canvas.getContext('2d', { alpha: true });
      if (!this.ctx) {
        console.warn('[particles] Canvas 2D context not supported');
        return;
      }

      this.handleResize();
      this.createParticles();
      this.bindEvents();
      this.setupVisibilityObserver();
      this.start();
    }

    /**
     * Setup resize and mouse event listeners
     */
    bindEvents() {
      // Debounced resize handler
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.handleResize();
          this.createParticles();
        }, 150);
      }, { passive: true });

      // Interactive mouse hover micro-movement
      if (this.hero) {
        this.hero.addEventListener('mousemove', (e) => {
          const rect = this.hero.getBoundingClientRect();
          this.mouse.x = e.clientX - rect.left;
          this.mouse.y = e.clientY - rect.top;
          this.mouse.active = true;
        }, { passive: true });

        this.hero.addEventListener('mouseleave', () => {
          this.mouse.active = false;
          this.mouse.x = -9999;
          this.mouse.y = -9999;
        }, { passive: true });
      }

      // Page visibility change (tab switch)
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else if (this.isVisible) {
          this.start();
        }
      });
    }

    /**
     * Pause particle simulation when Hero is scrolled out of viewport
     */
    setupVisibilityObserver() {
      if (!('IntersectionObserver' in window)) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible) {
            this.start();
          } else {
            this.stop();
          }
        });
      }, { threshold: 0.05 });

      observer.observe(this.hero);
    }

    /**
     * Adjust canvas pixel dimensions according to screen size and pixel density
     */
    handleResize() {
      if (!this.canvas || !this.hero) return;

      const rect = this.hero.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;

      // Handle high DPI screens for razor-sharp rendering
      this.canvas.width = Math.floor(this.width * this.dpr);
      this.canvas.height = Math.floor(this.height * this.dpr);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    }

    /**
     * Generate particle collection with random sizes, gold shades, and kinematics
     */
    createParticles() {
      this.particles = [];
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? PARTICLE_CONFIG.baseCountMobile : PARTICLE_CONFIG.baseCountDesktop;

      for (let i = 0; i < count; i++) {
        const isBokeh = Math.random() < 0.12; // 12% are larger soft glowing bokeh discs
        const radius = isBokeh
          ? Math.random() * 3.5 + 2.5
          : Math.random() * 1.8 + 0.6;

        const baseAlpha = isBokeh
          ? Math.random() * 0.18 + 0.08
          : Math.random() * 0.45 + 0.15;

        const colorPrefix = PARTICLE_CONFIG.colors[Math.floor(Math.random() * PARTICLE_CONFIG.colors.length)];

        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: radius,
          baseRadius: radius,
          colorPrefix: colorPrefix,
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          vy: -(Math.random() * (PARTICLE_CONFIG.maxSpeedY - PARTICLE_CONFIG.minSpeedY) + PARTICLE_CONFIG.minSpeedY),
          swaySpeed: Math.random() * 0.015 + 0.005,
          swayAmp: Math.random() * 0.4 + 0.2,
          swayOffset: Math.random() * Math.PI * 2,
          isBokeh: isBokeh
        });
      }
    }

    /**
     * Main animation frame loop
     */
    tick(time) {
      if (!this.isRunning) return;

      this.ctx.clearRect(0, 0, this.width, this.height);

      const particleCount = this.particles.length;
      for (let i = 0; i < particleCount; i++) {
        const p = this.particles[i];

        // Kinematics: vertical upward drift with sinusoidal horizontal float
        p.y += p.vy;
        p.x += Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayAmp;

        // Subtle twinkle opacity effect
        const currentAlpha = Math.max(
          0.04,
          p.baseAlpha + Math.sin(time * p.twinkleSpeed + p.twinkleOffset) * (p.baseAlpha * 0.35)
        );

        // Interactive cursor repulsion micro-interaction
        if (this.mouse.active) {
          const dx = p.x - this.mouse.x;
          const dy = p.y - this.mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < PARTICLE_CONFIG.mouseRadius && dist > 0) {
            const force = (PARTICLE_CONFIG.mouseRadius - dist) / PARTICLE_CONFIG.mouseRadius;
            p.x += (dx / dist) * force * PARTICLE_CONFIG.mousePushFactor * 80;
            p.y += (dy / dist) * force * PARTICLE_CONFIG.mousePushFactor * 80;
          }
        }

        // Loop boundaries: respawn particles at bottom or opposite edge
        if (p.y < -15) {
          p.y = this.height + 10;
          p.x = Math.random() * this.width;
        } else if (p.y > this.height + 15) {
          p.y = -10;
        }
        if (p.x < -15) {
          p.x = this.width + 10;
        } else if (p.x > this.width + 15) {
          p.x = -10;
        }

        // Render particle
        this.ctx.beginPath();
        if (p.isBokeh) {
          // Soft radial glow for bokeh particles
          const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
          gradient.addColorStop(0, `${p.colorPrefix}${currentAlpha * 1.5})`);
          gradient.addColorStop(0.5, `${p.colorPrefix}${currentAlpha * 0.7})`);
          gradient.addColorStop(1, `${p.colorPrefix}0)`);
          this.ctx.fillStyle = gradient;
          this.ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        } else {
          // Crisp golden dust particle with soft edge
          this.ctx.fillStyle = `${p.colorPrefix}${currentAlpha})`;
          this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
        this.ctx.fill();
      }

      this.animationFrameId = requestAnimationFrame((t) => this.tick(t));
    }

    /**
     * Start animation loop
     */
    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.animationFrameId = requestAnimationFrame((t) => this.tick(t));
    }

    /**
     * Stop animation loop to preserve CPU and battery
     */
    stop() {
      this.isRunning = false;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
  }

  // Auto-init when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.kzrHeroParticles = new HeroParticleSystem();
    });
  } else {
    window.kzrHeroParticles = new HeroParticleSystem();
  }

  // Expose constructor to window for programmatic control
  window.HeroParticleSystem = HeroParticleSystem;
})();
