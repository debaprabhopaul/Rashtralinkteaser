/**
 * RashtraLink Kinetic Engine
 * Delivers hardware-accelerated 3D parallax tilt, pointer-reactive specular sheen,
 * and live spring physics for interactive glass displays, eliminating flat/AI template cards.
 */

class KineticCardEngine {
  constructor() {
    this.cards = new Set();
    this.rafId = null;
    this.mouse = { x: 0, y: 0 };
    this.init();
  }

  init() {
    // Scan and register cards with data-kinetic-card or .kinetic-card
    this.scan();

    // Re-scan when DOM changes dynamically (e.g. view switching, modal opens)
    const observer = new MutationObserver(() => this.scan());
    observer.observe(document.body, { childList: true, subtree: true });

    // Window resize handler to refresh bounds
    window.addEventListener('resize', () => {
      this.cards.forEach(card => this.updateBounds(card));
    }, { passive: true });
  }

  scan() {
    const elements = document.querySelectorAll('[data-kinetic-card], .kinetic-card');
    elements.forEach(el => {
      if (!this.cards.has(el)) {
        this.bindCard(el);
      }
    });
  }

  updateBounds(card) {
    if (card._kineticState) {
      const rect = card.getBoundingClientRect();
      card._kineticState.rect = rect;
    }
  }

  bindCard(el) {
    this.cards.add(el);

    // Ensure container styling for 3D perspective and relative clipping
    el.style.transformStyle = 'preserve-3d';
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }

    // Create or locate the specular sheen reflection overlay
    let sheen = el.querySelector('.kinetic-sheen');
    if (!sheen) {
      sheen = document.createElement('div');
      sheen.className = 'kinetic-sheen pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300';
      sheen.style.background = 'radial-gradient(circle 350px at 50% 50%, rgba(255, 255, 255, 0.22), transparent 75%)';
      el.appendChild(sheen);
    }

    // State object for spring interpolation
    const state = {
      el,
      sheen,
      rect: el.getBoundingClientRect(),
      targetRotateX: 0,
      targetRotateY: 0,
      currentRotateX: 0,
      currentRotateY: 0,
      sheenX: 50,
      sheenY: 50,
      isHovered: false,
      maxTilt: parseFloat(el.getAttribute('data-tilt-max') || '8.5')
    };
    el._kineticState = state;

    const onPointerMove = (e) => {
      state.isHovered = true;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) * 2 - 1; // -1 to +1
      const normY = (y / rect.height) * 2 - 1; // -1 to +1

      // Tilt calculations (invert Y for natural pitch)
      state.targetRotateX = -normY * state.maxTilt;
      state.targetRotateY = normX * state.maxTilt;

      // Position specular sheen
      state.sheenX = (x / rect.width) * 100;
      state.sheenY = (y / rect.height) * 100;

      if (!this.rafId) {
        this.rafId = requestAnimationFrame(() => this.tick());
      }
    };

    const onPointerEnter = () => {
      state.isHovered = true;
      state.rect = el.getBoundingClientRect();
      if (sheen) sheen.style.opacity = '1';
      if (!this.rafId) {
        this.rafId = requestAnimationFrame(() => this.tick());
      }
    };

    const onPointerLeave = () => {
      state.isHovered = false;
      state.targetRotateX = 0;
      state.targetRotateY = 0;
      if (sheen) sheen.style.opacity = '0';
    };

    el.addEventListener('pointerenter', onPointerEnter, { passive: true });
    el.addEventListener('pointermove', onPointerMove, { passive: true });
    el.addEventListener('pointerleave', onPointerLeave, { passive: true });
  }

  tick() {
    let hasActiveMotion = false;
    const springFactor = 0.14; // Snappy tactile spring
    const epsilon = 0.02;

    this.cards.forEach(card => {
      const s = card._kineticState;
      if (!s) return;

      const deltaX = s.targetRotateX - s.currentRotateX;
      const deltaY = s.targetRotateY - s.currentRotateY;

      if (Math.abs(deltaX) > epsilon || Math.abs(deltaY) > epsilon || s.isHovered) {
        hasActiveMotion = true;
        s.currentRotateX += deltaX * springFactor;
        s.currentRotateY += deltaY * springFactor;

        // Apply hardware-accelerated 3D transform
        card.style.transform = `perspective(1000px) rotateX(${s.currentRotateX.toFixed(2)}deg) rotateY(${s.currentRotateY.toFixed(2)}deg) translateZ(0)`;

        // Update specular sheen position
        if (s.sheen) {
          s.sheen.style.background = `radial-gradient(circle 350px at ${s.sheenX.toFixed(1)}% ${s.sheenY.toFixed(1)}%, rgba(255, 255, 255, 0.28), rgba(255, 86, 34, 0.05) 45%, transparent 75%)`;
        }

        // Parallax depth for internal floating elements with data-kinetic-depth
        const depthElements = card.querySelectorAll('[data-kinetic-depth]');
        depthElements.forEach(depthEl => {
          const depth = parseFloat(depthEl.getAttribute('data-kinetic-depth') || '12');
          const transX = (s.currentRotateY / s.maxTilt) * depth;
          const transY = (-s.currentRotateX / s.maxTilt) * depth;
          depthEl.style.transform = `translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, ${depth}px)`;
        });
      } else if (!s.isHovered && (Math.abs(s.currentRotateX) > 0 || Math.abs(s.currentRotateY) > 0)) {
        s.currentRotateX = 0;
        s.currentRotateY = 0;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
      }
    });

    if (hasActiveMotion) {
      this.rafId = requestAnimationFrame(() => this.tick());
    } else {
      this.rafId = null;
    }
  }
}

// Auto-instantiate globally on DOM readiness
if (typeof window !== 'undefined') {
  window.kineticEngine = new KineticCardEngine();
  document.addEventListener('DOMContentLoaded', () => {
    if (window.kineticEngine) {
      window.kineticEngine.scan();
    }
  });
}

export default KineticCardEngine;
