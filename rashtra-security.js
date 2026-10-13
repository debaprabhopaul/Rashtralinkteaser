/**
 * RashtraLink Sovereign Security Shield
 * Enterprise frontend protection, inspection deterrents, and asset integrity enforcement.
 * Enforces anti-scraping and intellectual property protection under Indian Law.
 */

class RashtraSecurityShield {
  constructor() {
    this.hudElement = null;
    this.hudTimer = null;
    this.init();
  }

  init() {
    this.renderConsoleWatermark();
    this.bindInspectDeterrents();
    this.bindAssetProtections();
  }

  renderConsoleWatermark() {
    const titleStyle = 'color: #FF5622; font-size: 20px; font-weight: 900; background: #001A33; padding: 6px 14px; border-radius: 6px;';
    const bodyStyle = 'color: #0F172A; font-size: 12px; font-weight: bold; line-height: 1.6;';
    const alertStyle = 'color: #16A34A; font-size: 11px; font-weight: 800;';

    console.log('%c🇮🇳 RASHTRALINK // SOVEREIGN IP GUARD', titleStyle);
    console.log(
      '%cThis application, its visual components, algorithmic priorities, and citizen models are the proprietary intellectual property of RashtraLink Technologies Private Limited (Kolkata, Bharat).\nProtected under the Copyright Act, 1957 and Information Technology Act, 2000.\nReverse-engineering, automated cloning, or unauthorized scraping is strictly prohibited.',
      bodyStyle
    );
    console.log('%c✓ Data Residency: Tier-4 Data Centres (Mumbai, Bengaluru, Noida) • DPDP Act 2023 Compliant', alertStyle);
  }

  showSecurityHUD(triggerReason = 'inspection') {
    if (!this.hudElement) {
      this.createHUD();
    }

    const reasonMap = {
      'contextmenu': 'Right-click asset extraction is disabled to protect sovereign design assets.',
      'devtools': 'Developer inspection shortcut intercepted. Source architecture is proprietary.',
      'source': 'Direct source-viewing is restricted under platform safe harbor protocols.',
      'drag': 'Direct media dragging is restricted to safeguard regional citizen assets.'
    };

    const messageEl = this.hudElement.querySelector('#security-hud-message');
    if (messageEl) {
      messageEl.textContent = reasonMap[triggerReason] || 'Sovereign platform inspection deterrent active.';
    }

    this.hudElement.classList.remove('hidden', 'opacity-0', 'translate-y-4');
    this.hudElement.classList.add('opacity-100', 'translate-y-0');

    if (window.sfx && sfx.enabled) {
      sfx.playClick();
    }

    if (this.hudTimer) clearTimeout(this.hudTimer);
    this.hudTimer = setTimeout(() => {
      this.hideHUD();
    }, 4500);
  }

  hideHUD() {
    if (!this.hudElement) return;
    this.hudElement.classList.remove('opacity-100', 'translate-y-0');
    this.hudElement.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => {
      if (this.hudElement) this.hudElement.classList.add('hidden');
    }, 300);
  }

  createHUD() {
    const hud = document.createElement('div');
    hud.id = 'sovereign-security-hud';
    hud.className = 'fixed bottom-6 right-6 z-[99999] max-w-sm w-full mx-4 sm:mx-0 p-4 rounded-2xl bg-slate-950/90 text-white backdrop-blur-xl border border-orange-500/30 shadow-2xl transition-all duration-300 transform opacity-0 translate-y-4 hidden flex flex-col gap-3';

    hud.innerHTML = `
      <div class="flex items-center justify-between pb-2 border-b border-slate-800">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-black">
            🛡️
          </div>
          <div>
            <h4 class="text-xs font-black tracking-wide text-white">Sovereign IP Guard</h4>
            <p class="text-[9px] text-orange-400 font-bold uppercase tracking-wider">RashtraLink Security Shield</p>
          </div>
        </div>
        <button id="close-security-hud" class="w-6 h-6 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs transition-colors">
          ✕
        </button>
      </div>

      <p id="security-hud-message" class="text-xs text-slate-300 leading-relaxed font-medium">
        Right-click asset extraction is disabled to protect sovereign design assets.
      </p>

      <div class="flex items-center justify-between pt-1 text-[10px] text-slate-400 font-bold">
        <span>Protected under Copyright Act, 1957</span>
        <span class="text-emerald-400 flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Active
        </span>
      </div>
    `;

    document.body.appendChild(hud);
    this.hudElement = hud;

    const closeBtn = hud.querySelector('#close-security-hud');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hideHUD());
    }
  }

  bindInspectDeterrents() {
    // Intercept right-click context menu (allow standard inputs/textareas to work for typing)
    document.addEventListener('contextmenu', (e) => {
      const target = e.target;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      if (!isInput) {
        e.preventDefault();
        this.showSecurityHUD('contextmenu');
      }
    });

    // Intercept keyboard inspection shortcuts
    document.addEventListener('keydown', (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      // F12 key
      if (e.key === 'F12') {
        e.preventDefault();
        this.showSecurityHUD('devtools');
        return;
      }

      // Ctrl+Shift+I / Cmd+Opt+I (Inspect)
      if (ctrlOrCmd && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        this.showSecurityHUD('devtools');
        return;
      }

      // Ctrl+Shift+J / Cmd+Opt+J (Console)
      if (ctrlOrCmd && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        this.showSecurityHUD('devtools');
        return;
      }

      // Ctrl+Shift+C / Cmd+Opt+C (Inspect Element)
      if (ctrlOrCmd && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        this.showSecurityHUD('devtools');
        return;
      }

      // Ctrl+U (View Source)
      if (ctrlOrCmd && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        this.showSecurityHUD('source');
        return;
      }

      // Ctrl+S (Save Page)
      if (ctrlOrCmd && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        this.showSecurityHUD('source');
        return;
      }
    });
  }

  bindAssetProtections() {
    // Prevent dragging images, videos, and canvas elements
    document.addEventListener('dragstart', (e) => {
      const target = e.target;
      if (['IMG', 'CANVAS', 'SVG', 'VIDEO'].includes(target.tagName) || target.closest('img, canvas, svg')) {
        e.preventDefault();
        this.showSecurityHUD('drag');
      }
    });
  }
}

// Auto-initialize when client boots
if (typeof window !== 'undefined') {
  window.rashtraSecurity = new RashtraSecurityShield();
}

export default RashtraSecurityShield;
