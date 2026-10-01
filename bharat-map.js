// RashtraLink (Ralync) - Apple-Grade Interactive Map of Bharat
// Powered by 100% Free OpenStreetMap with Vernacular Audio, Interactive Mascots & Snapshot Sharing
import { BHARAT_CITIZENS } from './bharat-citizens.js';
import { getMascotSVG } from './bharat-mascots.js';
import { bharatAudio } from './bharat-audio.js';
import { openHometownShareModal } from './bharat-share.js';

let leafletMap = null;
let markersMap = {};
let activeCitizen = BHARAT_CITIZENS.find(c => c.city === 'Kolkata') || BHARAT_CITIZENS[0];

export function initBharatMap() {
  const mapContainer = document.getElementById('bharat-leaflet-map');
  if (!mapContainer) return;

  // Initialize or invalidate Leaflet map
  if (!leafletMap) {
    const isMobile = window.innerWidth < 768;
    leafletMap = L.map('bharat-leaflet-map', {
      center: [22.8, 80.0],
      zoom: isMobile ? 4.5 : 5,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      touchZoom: true,
      dragging: true
    });

    // Add zoom control top-right
    L.control.zoom({ position: 'topright' }).addTo(leafletMap);

    // 100% FREE OpenStreetMap Tiles - ABSOLUTELY ZERO API KEYS NEEDED!
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 4,
      crossOrigin: true
    }).addTo(leafletMap);

    // Plot real city discovery beacons
    BHARAT_CITIZENS.forEach((citizen, index) => {
      if (!citizen.lat || !citizen.lng) return;

      const markerHtml = `
        <div class="beacon-pin-wrapper group" id="beacon-${citizen.id}">
          <span class="beacon-ring"></span>
          <span class="beacon-core"></span>
          <div class="beacon-label">${citizen.city}</div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-beacon-icon',
        html: markerHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker([citizen.lat, citizen.lng], { icon: customIcon }).addTo(leafletMap);
      
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        selectCitizen(citizen, true, index);
      });

      markersMap[citizen.id] = marker;
    });

    // Allow clicking anywhere on the map to discover the closest hometown
    leafletMap.on('click', (e) => {
      findClosestHometown(e.latlng.lat, e.latlng.lng);
    });

    // Trigger multiple invalidations to fix mobile rendering
    [100, 250, 500, 1000].forEach(delay => {
      setTimeout(() => {
        if (leafletMap) leafletMap.invalidateSize();
      }, delay);
    });
  } else {
    // Invalidate existing map on tab switch
    [50, 200, 400].forEach(delay => {
      setTimeout(() => {
        if (leafletMap) leafletMap.invalidateSize();
      }, delay);
    });
  }

  // Initial reveal of default citizen
  selectCitizen(activeCitizen, false, 0);
}

function selectCitizen(citizen, flyTo = true, index = 0) {
  if (!citizen) return;
  activeCitizen = citizen;

  // Cinematic map glide
  if (flyTo && leafletMap && citizen.lat && citizen.lng) {
    const isMobile = window.innerWidth < 768;
    const targetZoom = isMobile ? 7 : 8.5;
    leafletMap.flyTo([citizen.lat, citizen.lng], targetZoom, {
      duration: 1.2,
      easeLinearity: 0.25
    });

    // Trigger Tricolor Ripple Shockwave at city coordinate
    triggerMapShockwave(citizen.lat, citizen.lng);
  }

  // Highlight active beacon
  document.querySelectorAll('.beacon-pin-wrapper').forEach(b => {
    b.classList.remove('active-beacon');
  });
  const activePin = document.getElementById(`beacon-${citizen.id}`);
  if (activePin) {
    activePin.classList.add('active-beacon');
  }

  // Play Authentic Indian String Chime (Sitar resonance)
  if (flyTo) {
    const noteIdx = index || BHARAT_CITIZENS.findIndex(c => c.id === citizen.id);
    bharatAudio.playSitarChime(noteIdx);
  }

  // Render Apple-grade Floating Card with 3D Animated Mannequin + Short Punchy White Screen
  renderAppleDiscoveryCard(citizen);

  if (window.sfx && sfx.enabled) sfx.playClick();
}

// Tricolor Particle Ripple & Shockwave on Map
function triggerMapShockwave(lat, lng) {
  if (!leafletMap) return;
  const container = document.getElementById('bharat-leaflet-map');
  if (!container) return;

  const point = leafletMap.latLngToContainerPoint([lat, lng]);

  const shockwave = document.createElement('div');
  shockwave.className = 'absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center';
  shockwave.style.left = `${point.x}px`;
  shockwave.style.top = `${point.y}px`;

  shockwave.innerHTML = `
    <div class="shockwave-ring ring-saffron"></div>
    <div class="shockwave-ring ring-white"></div>
    <div class="shockwave-ring ring-green"></div>
  `;

  container.appendChild(shockwave);
  setTimeout(() => shockwave.remove(), 1200);
}

function renderAppleDiscoveryCard(citizen) {
  const cardContainer = document.getElementById('bharat-apple-card');
  if (!cardContainer) return;

  const mascotHtml = getMascotSVG(citizen.category, citizen.id);

  // Short, punchy text: NO WALLS OF TEXT!
  const shortGreeting = citizen.shortGreeting || (citizen.vernacularWelcome.split('—')[0].trim());
  const subGreeting = citizen.subGreeting || 'Built for India • Useful to people, not the hype.';
  const punchline = citizen.punchline || citizen.quote;

  cardContainer.innerHTML = `
    <!-- Top Animated Mannequin Stage (Interactive On Touch/Click) -->
    <div class="relative group flex justify-center">
      <div 
        id="active-mannequin-container" 
        onclick="window.interactWithMascot()"
        class="relative z-20 -mb-5 flex justify-center cursor-pointer select-none transition-transform hover:scale-105 active:scale-95"
        title="Tap me for a hometown blessing!"
      >
        ${mascotHtml}
      </div>

      <!-- Floating Touch Prompt Hint -->
      <div class="absolute -top-2 px-3 py-1 rounded-full bg-slate-900/90 text-white text-[10px] font-bold shadow-lg border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-30">
        <span>✨ Tap me to interact!</span>
      </div>

      <!-- Container for Floating Micro-Particles -->
      <div id="mascot-particles-overlay" class="absolute inset-0 pointer-events-none z-40 overflow-hidden"></div>
    </div>

    <!-- The Apple-style Pristine White Card -->
    <div class="relative z-10 rounded-[2.2rem] bg-white p-5 sm:p-7 shadow-2xl border border-slate-100 text-left overflow-hidden">
      
      <!-- Ambient Tricolor Top Border -->
      <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rashtraOrange via-white to-indiaGreen"></div>

      <!-- City, State & Audio Toggle -->
      <div class="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span class="text-xs font-black tracking-widest uppercase text-slate-800">${citizen.city}, ${citizen.state}</span>
        </div>
        
        <div class="flex items-center gap-2">
          <!-- Audio Toggle Button -->
          <button 
            onclick="window.toggleBharatAudio()" 
            id="btn-bharat-audio"
            class="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-rashtraOrange transition-all flex items-center gap-1"
            title="${bharatAudio.enabled ? 'Sitar Chime: Enabled' : 'Sitar Chime: Muted'}"
          >
            <i data-lucide="${bharatAudio.enabled ? 'volume-2' : 'volume-x'}" class="w-4 h-4 ${bharatAudio.enabled ? 'text-rashtraOrange' : 'text-slate-400'}"></i>
          </button>

          <span class="px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-rashtraOrange text-[10px] font-black tracking-wide">
            ${citizen.language}
          </span>
        </div>
      </div>

      <!-- 1. The Short, Crisp Greeting (Apple "hello"-style fluid typography) -->
      <div class="space-y-1 mb-4 text-center sm:text-left">
        <h2 id="vernacular-greeting-text" class="text-2xl sm:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          "${shortGreeting}"
        </h2>
        <p class="text-xs text-slate-400 font-bold tracking-wide">
          ${subGreeting}
        </p>
      </div>

      <!-- 2. The Surprise Hometown Voice Card (Short & Punchy) -->
      <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5">
            <span class="px-2 py-0.5 rounded-md bg-rashtraBlue text-white text-[9px] font-black uppercase tracking-wider">
              Local Voice
            </span>
            <h4 class="text-xs sm:text-sm font-black text-slate-900 truncate">${citizen.name}</h4>
          </div>
          <span class="text-[10px] font-bold text-rashtraOrange shrink-0">${citizen.role}</span>
        </div>
        <p class="text-xs text-slate-600 font-medium leading-relaxed italic bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-xs">
          "${punchline}"
        </p>
      </div>

      <!-- Interactive Quick Action Buttons -->
      <div class="flex flex-wrap items-center justify-between gap-2.5 mt-4 pt-3 border-t border-slate-100 text-xs">
        
        <div class="flex items-center gap-2">
          <button onclick="window.surpriseBharatCitizen()" class="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-md">
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-orange-400"></i>
            <span>Surprise City</span>
          </button>

          <!-- Feature 4: Share Hometown Voice Button -->
          <button onclick="window.triggerShareCard()" class="px-3 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-rashtraOrange font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 border border-orange-200 shadow-xs">
            <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
            <span>Share My Voice</span>
          </button>
        </div>

        <button onclick="window.switchPage('early-access')" class="text-xs font-black text-rashtraOrange hover:underline flex items-center gap-1">
          <span>Early Access →</span>
        </button>

      </div>

    </div>
  `;

  // GSAP Spring & Fluid Entrance Animation
  if (window.gsap) {
    gsap.fromTo('#active-mannequin-container', 
      { y: 35, opacity: 0, scale: 0.8 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.8)' }
    );
    gsap.fromTo('#vernacular-greeting-text',
      { y: 18, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.1, ease: 'power2.out' }
    );
  }

  if (window.lucide && lucide.createIcons) lucide.createIcons();
}

// Mascot Interactive Micro-Gestures on Touch/Click
window.interactWithMascot = function() {
  if (!activeCitizen) return;

  // 1. Play Sparkle Audio Chime
  bharatAudio.playMascotSparkle();

  // 2. Spring Wobble Animation
  if (window.gsap) {
    gsap.to('#active-mannequin-container', {
      scale: 1.15,
      rotation: (Math.random() - 0.5) * 14,
      duration: 0.18,
      yoyo: true,
      repeat: 1,
      ease: 'back.out(2)'
    });
  }

  // 3. Spawn Floating Micro-Glyphs/Particles based on Category
  spawnCelebratoryParticles(activeCitizen);
};

function spawnCelebratoryParticles(citizen) {
  const overlay = document.getElementById('mascot-particles-overlay');
  if (!overlay) return;

  let particleSet = ['✨', '🌟', '🇮🇳', '❤️'];

  if (citizen.category === 'farmer') {
    particleSet = ['🌾', '✨', '☀️', '🌱', '🌾'];
  } else if (citizen.category === 'teacher') {
    // Floating vernacular letters based on language
    if (citizen.language.includes('Bengali')) particleSet = ['ক', 'খ', 'অ', 'আ', '📖', '✨'];
    else if (citizen.language.includes('Tamil')) particleSet = ['அ', 'ஆ', 'க', 'த', '📖', '✨'];
    else if (citizen.language.includes('Punjabi')) particleSet = ['ੳ', 'ਅ', 'ਸ', 'ਕ', '📖', '✨'];
    else particleSet = ['अ', 'आ', 'क', 'ख', '📖', '✨'];
  } else if (citizen.category === 'tech') {
    particleSet = ['01', '</>', '{ }', '🚀', '⚡', '💻'];
  } else if (citizen.category === 'trader') {
    particleSet = ['₹', '📈', '✨', '💎', '🤝'];
  } else if (citizen.category === 'health') {
    particleSet = ['✚', '🍃', '❤️', '🩺', '✨'];
  } else if (citizen.category === 'artisan') {
    particleSet = ['🎨', '🧵', '🏺', '✨', '🌺'];
  }

  for (let i = 0; i < 7; i++) {
    const span = document.createElement('span');
    span.textContent = particleSet[Math.floor(Math.random() * particleSet.length)];
    span.className = 'absolute text-base sm:text-lg font-black select-none pointer-events-none';
    span.style.left = `${30 + Math.random() * 40}%`;
    span.style.bottom = `${20 + Math.random() * 20}%`;
    span.style.color = '#FF9933';
    overlay.appendChild(span);

    if (window.gsap) {
      gsap.to(span, {
        y: -90 - Math.random() * 60,
        x: (Math.random() - 0.5) * 80,
        opacity: 0,
        scale: 1.4,
        duration: 0.9 + Math.random() * 0.4,
        ease: 'power2.out',
        onComplete: () => span.remove()
      });
    } else {
      setTimeout(() => span.remove(), 1000);
    }
  }
}

window.toggleBharatAudio = function() {
  const isEnabled = bharatAudio.toggleSound();
  const btn = document.getElementById('btn-bharat-audio');
  if (btn) {
    btn.innerHTML = `<i data-lucide="${isEnabled ? 'volume-2' : 'volume-x'}" class="w-4 h-4 ${isEnabled ? 'text-rashtraOrange' : 'text-slate-400'}"></i>`;
    if (window.lucide && lucide.createIcons) lucide.createIcons();
  }
  if (isEnabled) {
    bharatAudio.playSitarChime(0);
  }
};

window.triggerShareCard = function() {
  if (activeCitizen) {
    openHometownShareModal(activeCitizen);
  }
};

function findClosestHometown(lat, lng) {
  let closest = BHARAT_CITIZENS[0];
  let minDistance = Infinity;

  BHARAT_CITIZENS.forEach(c => {
    if (!c.lat || !c.lng) return;
    const d = Math.hypot(c.lat - lat, c.lng - lng);
    if (d < minDistance) {
      minDistance = d;
      closest = c;
    }
  });

  const idx = BHARAT_CITIZENS.findIndex(c => c.id === closest.id);
  selectCitizen(closest, true, idx);
}

window.selectHometownCity = function(cityName) {
  const idx = BHARAT_CITIZENS.findIndex(c => c.city.toLowerCase().includes(cityName.toLowerCase()));
  if (idx !== -1) {
    selectCitizen(BHARAT_CITIZENS[idx], true, idx);
  }
};

window.surpriseBharatCitizen = function() {
  const randomIndex = Math.floor(Math.random() * BHARAT_CITIZENS.length);
  selectCitizen(BHARAT_CITIZENS[randomIndex], true, randomIndex);
};

window.initBharatMap = initBharatMap;

// Auto-boot if container is visible
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('bharat-leaflet-map')) {
    initBharatMap();
  }
});
