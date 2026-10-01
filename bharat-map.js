// RashtraLink (Ralync) - Apple-Grade Interactive Map of Bharat
// Powered by 100% Free OpenStreetMap (NO API KEYS REQUIRED)
import { BHARAT_CITIZENS } from './bharat-citizens.js';
import { getMascotSVG } from './bharat-mascots.js';

let leafletMap = null;
let markersMap = {};
let activeCitizen = BHARAT_CITIZENS.find(c => c.city === 'Kolkata') || BHARAT_CITIZENS[0];

export function initBharatMap() {
  const mapContainer = document.getElementById('bharat-leaflet-map');
  if (!mapContainer) return;

  // Initialize or invalidate Leaflet map
  if (!leafletMap) {
    // Center of Bharat [Latitude, Longitude]
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
    BHARAT_CITIZENS.forEach(citizen => {
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
      
      marker.on('click', () => {
        selectCitizen(citizen, true);
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
  selectCitizen(activeCitizen, false);
}

function selectCitizen(citizen, flyTo = true) {
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
  }

  // Highlight active beacon
  document.querySelectorAll('.beacon-pin-wrapper').forEach(b => {
    b.classList.remove('active-beacon');
  });
  const activePin = document.getElementById(`beacon-${citizen.id}`);
  if (activePin) {
    activePin.classList.add('active-beacon');
  }

  // Render Apple-grade Floating Card with 3D Animated Mannequin + Short Punchy White Screen
  renderAppleDiscoveryCard(citizen);

  if (window.sfx && sfx.enabled) sfx.playClick();
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
    <!-- Top Animated Mannequin Stage -->
    <div id="active-mannequin-container" class="relative z-20 -mb-5 flex justify-center pointer-events-none">
      ${mascotHtml}
    </div>

    <!-- The Apple-style Pristine White Card -->
    <div class="relative z-10 rounded-[2.2rem] bg-white p-5 sm:p-7 shadow-2xl border border-slate-100 text-left overflow-hidden">
      
      <!-- Ambient Tricolor Top Border -->
      <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rashtraOrange via-white to-indiaGreen"></div>

      <!-- City, State & Language Tag -->
      <div class="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span class="text-xs font-black tracking-widest uppercase text-slate-800">${citizen.city}, ${citizen.state}</span>
        </div>
        <span class="px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-rashtraOrange text-[10px] font-black tracking-wide">
          ${citizen.language}
        </span>
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
      <div class="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 text-xs">
        <button onclick="window.surpriseBharatCitizen()" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-md">
          <i data-lucide="sparkles" class="w-3.5 h-3.5 text-orange-400 animate-spin"></i>
          <span>Surprise Another City</span>
        </button>

        <button onclick="window.switchPage('early-access')" class="text-xs font-black text-rashtraOrange hover:underline flex items-center gap-1">
          <span>Join Early Access →</span>
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

  selectCitizen(closest, true);
}

window.selectHometownCity = function(cityName) {
  const citizen = BHARAT_CITIZENS.find(c => c.city.toLowerCase().includes(cityName.toLowerCase()));
  if (citizen) {
    selectCitizen(citizen, true);
  }
};

window.surpriseBharatCitizen = function() {
  const randomIndex = Math.floor(Math.random() * BHARAT_CITIZENS.length);
  selectCitizen(BHARAT_CITIZENS[randomIndex], true);
};

window.initBharatMap = initBharatMap;

// Auto-boot if container is visible
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('bharat-leaflet-map')) {
    initBharatMap();
  }
});
