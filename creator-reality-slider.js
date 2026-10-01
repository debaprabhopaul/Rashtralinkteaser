// RashtraLink (Ralync) - Creator Reality Slider Engine
// Simulates real-world metrics: Foreign Big Tech vs. RashtraLink Sovereign Guild

class CreatorRealitySimulator {
  constructor() {
    this.followers = 25000;
    this.grossRevenue = 50000;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    const followerSlider = document.getElementById('slider-followers');
    const revenueSlider = document.getElementById('slider-revenue');

    if (followerSlider) {
      followerSlider.addEventListener('input', (e) => {
        this.followers = parseInt(e.target.value, 10);
        this.updateUI();
      });
    }

    if (revenueSlider) {
      revenueSlider.addEventListener('input', (e) => {
        this.grossRevenue = parseInt(e.target.value, 10);
        this.updateUI();
      });
    }

    this.updateUI();
  }

  setPreset(followers, revenue) {
    this.followers = followers;
    this.grossRevenue = revenue;

    const fSlider = document.getElementById('slider-followers');
    const rSlider = document.getElementById('slider-revenue');
    if (fSlider) fSlider.value = followers;
    if (rSlider) rSlider.value = revenue;

    this.updateUI();

    if (window.sfx && sfx.enabled) sfx.playClick();
  }

  updateUI() {
    // 1. Calculations for Foreign Big Tech (Instagram / YouTube / X / Meta)
    const bigTechReachPercent = 3.2; // 3.2% average organic feed reach
    const bigTechReach = Math.round(this.followers * (bigTechReachPercent / 100));
    const bigTechLocked = this.followers - bigTechReach;
    const bigTechBoostCost = Math.round((bigTechLocked / 1000) * 150); // ₹150 CPM to reach own followers
    const bigTechTakeRate = 0.45; // 45% platform cut + forex fees
    const bigTechNetRevenue = Math.round(this.grossRevenue * (1 - bigTechTakeRate));
    const bigTechLostRevenue = this.grossRevenue - bigTechNetRevenue;

    // 2. Calculations for RashtraLink Sovereign Guild
    const rashtraReach = this.followers; // 100% chronological delivery
    const rashtraInfraFeeRate = 0.04; // 4% transparent UPI / infra fee
    const rashtraNetRevenue = Math.round(this.grossRevenue * (1 - rashtraInfraFeeRate));
    const extraCreatorEarnings = rashtraNetRevenue - bigTechNetRevenue;

    // 3. Update DOM Labels & Displays
    this.setText('display-followers-count', this.formatNumber(this.followers));
    this.setText('display-revenue-amount', `₹${this.formatNumber(this.grossRevenue)}`);

    // Big Tech Panel
    this.setText('val-bigtech-reach', `${this.formatNumber(bigTechReach)} (${bigTechReachPercent}%)`);
    this.setText('val-bigtech-locked', `${this.formatNumber(bigTechLocked)} followers`);
    this.setText('val-bigtech-boost', `₹${this.formatNumber(bigTechBoostCost)}`);
    this.setText('val-bigtech-take', `45% platform cut (-₹${this.formatNumber(bigTechLostRevenue)})`);
    this.setText('val-bigtech-net', `₹${this.formatNumber(bigTechNetRevenue)}`);

    // RashtraLink Panel
    this.setText('val-rashtra-reach', `${this.formatNumber(rashtraReach)} (100% Full Audience)`);
    this.setText('val-rashtra-boost', `₹0 (Never Pay to Reach Followers)`);
    this.setText('val-rashtra-take', `Direct UPI (Keeps 96%+)`);
    this.setText('val-rashtra-net', `₹${this.formatNumber(rashtraNetRevenue)}`);

    // Benefit Summary Pill
    this.setText('val-creator-extra', `+₹${this.formatNumber(extraCreatorEarnings)} extra`);
    this.setText('val-reach-multiplier', `${Math.round(100 / bigTechReachPercent)}x more reach`);

    // Visual Progress Bars
    const bigTechBar = document.getElementById('bar-bigtech-reach');
    if (bigTechBar) {
      bigTechBar.style.width = `${bigTechReachPercent}%`;
    }
    const rashtraBar = document.getElementById('bar-rashtra-reach');
    if (rashtraBar) {
      rashtraBar.style.width = `100%`;
    }
  }

  setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  formatNumber(num) {
    return new Intl.NumberFormat('en-IN').format(num);
  }
}

export const creatorSimulator = new CreatorRealitySimulator();
window.creatorSimulator = creatorSimulator;

// Auto initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  creatorSimulator.init();
});
