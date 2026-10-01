// Bharat Animated Mannequin / Mascot Generator
// Richly animated Apple-grade 3D vector mannequins with floating, waving, breathing, and aura animations

export function getMascotSVG(category, citizenId) {
  // 1. Farmer Mannequins (Wheat, Paddy, Spices, Dairy)
  if (category === 'farmer' || citizenId.includes('farmer') || citizenId.includes('saffron') || citizenId.includes('tea') || citizenId.includes('paddy')) {
    return `
      <div class="relative w-48 h-52 sm:w-56 sm:h-60 mx-auto animate-mannequin-float transition-all duration-500 filter drop-shadow-[0_20px_35px_rgba(255,107,0,0.25)]">
        <!-- Glowing Ambient Chakra Behind Head -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="w-36 h-36 rounded-full bg-gradient-to-tr from-amber-400/30 to-orange-500/20 blur-xl animate-pulse"></div>
        </div>

        <svg viewBox="0 0 200 220" class="w-full h-full relative z-10">
          <defs>
            <linearGradient id="turbanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF9933" />
              <stop offset="100%" stop-color="#E65100" />
            </linearGradient>
            <linearGradient id="kurtaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="100%" stop-color="#FFF8E1" />
            </linearGradient>
            <filter id="goldenShine">
              <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#FFB300" flood-opacity="0.6"/>
            </filter>
          </defs>

          <!-- Head & Stylized Face -->
          <g class="animate-mannequin-bob">
            <ellipse cx="100" cy="85" rx="26" ry="30" fill="#FFE0B2" />
            <!-- Friendly Eyes & Smile -->
            <circle cx="91" cy="82" r="2.5" fill="#4E342E" />
            <circle cx="109" cy="82" r="2.5" fill="#4E342E" />
            <path d="M 88 88 Q 100 97 112 88" stroke="#D7CCC8" stroke-width="2.5" fill="none" stroke-linecap="round" />

            <!-- Saffron Majestic Turban -->
            <path d="M 70 74 Q 100 44 130 74 Q 136 58 122 46 Q 100 38 78 48 Z" fill="url(#turbanGrad)" />
            <path d="M 74 68 Q 100 56 126 68" stroke="#FFD54F" stroke-width="2" fill="none" opacity="0.85" />
            <circle cx="100" cy="48" r="5" fill="#FFD54F" />
          </g>

          <!-- Torso / Kurta -->
          <g class="animate-mannequin-breathe origin-bottom">
            <rect x="94" y="112" width="12" height="14" fill="#FFE0B2" />
            <path d="M 64 125 L 136 125 L 148 200 L 52 200 Z" fill="url(#kurtaGrad)" stroke="#FFE082" stroke-width="1.8" />
            <path d="M 100 125 L 100 175" stroke="#FFB74D" stroke-width="2" stroke-dasharray="2,2" />
            <circle cx="100" cy="138" r="2" fill="#E65100" />
            <circle cx="100" cy="150" r="2" fill="#E65100" />
            <circle cx="100" cy="162" r="2" fill="#E65100" />
          </g>

          <!-- Golden Wheat / Stalk Prop in Hand (Animated Sway) -->
          <g class="animate-stalk-sway origin-bottom-left" transform="translate(132, 92) rotate(-10)">
            <path d="M 10 90 Q 5 40 25 10" stroke="#8D6E63" stroke-width="3" fill="none" stroke-linecap="round" />
            <!-- Wheat Grains with Golden Sparkle -->
            <ellipse cx="23" cy="14" rx="5" ry="8" fill="#FFD54F" filter="url(#goldenShine)" transform="rotate(30 23 14)" />
            <ellipse cx="28" cy="24" rx="5" ry="8" fill="#FFC107" transform="rotate(20 28 24)" />
            <ellipse cx="20" cy="34" rx="5" ry="8" fill="#FFB300" transform="rotate(35 20 34)" />
            <ellipse cx="16" cy="46" rx="5" ry="8" fill="#FFA000" transform="rotate(25 16 46)" />
          </g>

          <!-- Friendly Waving Hand -->
          <g class="animate-hand-wave origin-top-left" transform="translate(56, 126)">
            <circle cx="-6" cy="0" r="7" fill="#FFE0B2" />
          </g>

          <!-- Pedestal Base Shadow -->
          <ellipse cx="100" cy="206" rx="52" ry="9" fill="#003366" opacity="0.12" />
        </svg>
      </div>
    `;
  }

  // 2. Educator / Scholar / Teacher Mannequin (Literature, Books, Arts)
  if (category === 'teacher' || citizenId.includes('teacher') || citizenId.includes('student') || citizenId.includes('tutor') || citizenId.includes('baul')) {
    return `
      <div class="relative w-48 h-52 sm:w-56 sm:h-60 mx-auto animate-mannequin-float transition-all duration-500 filter drop-shadow-[0_20px_35px_rgba(0,51,102,0.25)]">
        <!-- Glowing Wisdom Aura -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="w-36 h-36 rounded-full bg-gradient-to-tr from-blue-400/25 to-indigo-500/20 blur-xl animate-pulse"></div>
        </div>

        <svg viewBox="0 0 200 220" class="w-full h-full relative z-10">
          <defs>
            <linearGradient id="sariGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FF5622" />
              <stop offset="100%" stop-color="#D84315" />
            </linearGradient>
            <linearGradient id="bookGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFD54F" />
              <stop offset="100%" stop-color="#FF9800" />
            </linearGradient>
          </defs>

          <!-- Head, Traditional Bun & Bindi -->
          <g class="animate-mannequin-bob">
            <circle cx="100" cy="62" r="15" fill="#3E2723" />
            <ellipse cx="100" cy="84" rx="25" ry="28" fill="#FFE0B2" />
            <!-- Traditional Bindi -->
            <circle cx="100" cy="74" r="2.5" fill="#D32F2F" />
            <!-- Spectacles -->
            <circle cx="92" cy="80" r="6" stroke="#455A64" stroke-width="1.8" fill="none" />
            <circle cx="108" cy="80" r="6" stroke="#455A64" stroke-width="1.8" fill="none" />
            <line x1="98" y1="80" x2="102" y2="80" stroke="#455A64" stroke-width="1.8" />
            <circle cx="92" cy="80" r="2" fill="#37474F" />
            <circle cx="108" cy="80" r="2" fill="#37474F" />
            <path d="M 88 88 Q 100 96 112 88" stroke="#D7CCC8" stroke-width="2.5" fill="none" stroke-linecap="round" />
          </g>

          <!-- Classical Saree & Stole -->
          <g class="animate-mannequin-breathe origin-bottom">
            <path d="M 64 122 L 136 122 L 146 198 L 54 198 Z" fill="#FFF3E0" stroke="#FFE0B2" stroke-width="1.5" />
            <path d="M 68 122 Q 100 135 132 198 L 112 198 Q 90 145 68 122 Z" fill="url(#sariGrad)" />
          </g>

          <!-- Open Book of Knowledge Prop with Floating Light Orbs -->
          <g transform="translate(68, 142)">
            <path d="M 32 10 Q 15 5 0 10 L 0 36 Q 15 31 32 36 Z" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="1.2" />
            <path d="M 32 10 Q 49 5 64 10 L 64 36 Q 49 31 32 36 Z" fill="#FAFAFA" stroke="#B0BEC5" stroke-width="1.2" />
            <line x1="32" y1="10" x2="32" y2="36" stroke="#FF5722" stroke-width="2.5" />
            <!-- Wisdom light beam -->
            <circle cx="32" cy="6" r="5" fill="url(#bookGlow)" class="animate-ping" opacity="0.75" />
            <circle cx="32" cy="6" r="3.5" fill="#FFC107" />
          </g>

          <!-- Pedestal Base Shadow -->
          <ellipse cx="100" cy="205" rx="50" ry="9" fill="#003366" opacity="0.12" />
        </svg>
      </div>
    `;
  }

  // 3. Businessman / Trader Mannequin (Mumbai, Gujarat, Indore)
  if (category === 'trader' || citizenId.includes('trader') || citizenId.includes('business') || citizenId.includes('msme') || citizenId.includes('food')) {
    return `
      <div class="relative w-48 h-52 sm:w-56 sm:h-60 mx-auto animate-mannequin-float transition-all duration-500 filter drop-shadow-[0_20px_35px_rgba(0,100,200,0.25)]">
        <!-- Prosperity Halo -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="w-36 h-36 rounded-full bg-gradient-to-tr from-emerald-400/25 to-blue-500/20 blur-xl animate-pulse"></div>
        </div>

        <svg viewBox="0 0 200 220" class="w-full h-full relative z-10">
          <defs>
            <linearGradient id="blazerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#002244" />
              <stop offset="100%" stop-color="#003366" />
            </linearGradient>
          </defs>

          <!-- Head -->
          <g class="animate-mannequin-bob">
            <ellipse cx="100" cy="82" rx="25" ry="29" fill="#FFE0B2" />
            <path d="M 75 66 Q 100 48 125 66" fill="#37474F" />
            <circle cx="91" cy="80" r="2.5" fill="#37474F" />
            <circle cx="109" cy="80" r="2.5" fill="#37474F" />
            <path d="M 88 88 Q 100 97 112 88" stroke="#D7CCC8" stroke-width="2.5" fill="none" stroke-linecap="round" />
          </g>

          <!-- Nehru Jacket / Blazer Body -->
          <g class="animate-mannequin-breathe origin-bottom">
            <path d="M 64 122 L 136 122 L 146 198 L 54 198 Z" fill="url(#blazerGrad)" />
            <polygon points="100,122 88,140 100,165 112,140" fill="#FFFFFF" />
            <circle cx="100" cy="172" r="2.5" fill="#FFD700" />
            <circle cx="100" cy="182" r="2.5" fill="#FFD700" />
          </g>

          <!-- Transparent Ledger / Digital Growth Tablet Prop -->
          <g transform="translate(124, 126) rotate(-8)">
            <rect x="0" y="0" width="36" height="50" rx="7" fill="#0F172A" stroke="#10B981" stroke-width="2" />
            <path d="M 6 38 L 14 26 L 22 30 L 30 14" stroke="#10B981" stroke-width="3" fill="none" stroke-linecap="round" />
            <circle cx="30" cy="14" r="3.5" fill="#34D399" class="animate-ping" />
            <circle cx="30" cy="14" r="2.5" fill="#10B981" />
          </g>

          <ellipse cx="100" cy="205" rx="50" ry="9" fill="#003366" opacity="0.12" />
        </svg>
      </div>
    `;
  }

  // 4. Artisan / Craftsman Mannequin (Weavers, Sculptors, Painters, Potters)
  if (category === 'artisan' || citizenId.includes('artisan') || citizenId.includes('weaver') || citizenId.includes('sculptor') || citizenId.includes('potter') || citizenId.includes('craft')) {
    return `
      <div class="relative w-48 h-52 sm:w-56 sm:h-60 mx-auto animate-mannequin-float transition-all duration-500 filter drop-shadow-[0_20px_35px_rgba(233,30,99,0.25)]">
        <!-- Creative Aura -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="w-36 h-36 rounded-full bg-gradient-to-tr from-rose-400/25 to-amber-500/20 blur-xl animate-pulse"></div>
        </div>

        <svg viewBox="0 0 200 220" class="w-full h-full relative z-10">
          <defs>
            <linearGradient id="artisanApron" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#E91E63" />
              <stop offset="100%" stop-color="#C2185B" />
            </linearGradient>
            <linearGradient id="vaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00BCD4" />
              <stop offset="100%" stop-color="#00838F" />
            </linearGradient>
          </defs>

          <!-- Head -->
          <g class="animate-mannequin-bob">
            <ellipse cx="100" cy="84" rx="25" ry="29" fill="#FFCCBC" />
            <path d="M 76 72 Q 100 56 124 72" fill="#4E342E" />
            <circle cx="92" cy="82" r="2.5" fill="#3E2723" />
            <circle cx="108" cy="82" r="2.5" fill="#3E2723" />
            <path d="M 89 90 Q 100 97 111 90" stroke="#D7CCC8" stroke-width="2.5" fill="none" stroke-linecap="round" />
          </g>

          <!-- Handloom Kurta & Apron -->
          <g class="animate-mannequin-breathe origin-bottom">
            <path d="M 64 122 L 136 122 L 146 198 L 54 198 Z" fill="#FFF8E1" stroke="#FFE082" stroke-width="1.5" />
            <path d="M 78 135 L 122 135 L 128 198 L 72 198 Z" fill="url(#artisanApron)" />
          </g>

          <!-- Blue Pottery Vase / Art Prop with Floating Paint Sparkles -->
          <g transform="translate(122, 122)">
            <path d="M 12 10 Q 0 25 12 45 L 28 45 Q 40 25 28 10 Z" fill="url(#vaseGrad)" stroke="#B2EBF2" stroke-width="2" />
            <circle cx="20" cy="28" r="5" fill="#FFD54F" />
            <line x1="8" y1="5" x2="35" y2="40" stroke="#FF5722" stroke-width="2.5" stroke-linecap="round" />
            <!-- Floating Sparkle -->
            <polygon points="20,2 22,7 27,8 23,12 24,17 20,14 16,17 17,12 13,8 18,7" fill="#FFC107" class="animate-spin origin-center" />
          </g>

          <ellipse cx="100" cy="205" rx="50" ry="9" fill="#003366" opacity="0.12" />
        </svg>
      </div>
    `;
  }

  // 5. Tech / Builder / Engineer Mannequin (Bengaluru, Hyderabad, Coimbatore)
  if (category === 'tech' || citizenId.includes('dev') || citizenId.includes('engineer') || citizenId.includes('tech') || citizenId.includes('machinist')) {
    return `
      <div class="relative w-48 h-52 sm:w-56 sm:h-60 mx-auto animate-mannequin-float transition-all duration-500 filter drop-shadow-[0_20px_35px_rgba(0,229,255,0.25)]">
        <!-- Tech Matrix Aura -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="w-36 h-36 rounded-full bg-gradient-to-tr from-cyan-400/25 to-blue-600/20 blur-xl animate-pulse"></div>
        </div>

        <svg viewBox="0 0 200 220" class="w-full h-full relative z-10">
          <defs>
            <linearGradient id="techOrbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00E5FF" />
              <stop offset="100%" stop-color="#0288D1" />
            </linearGradient>
          </defs>

          <!-- Head & Futuristic Headset -->
          <g class="animate-mannequin-bob">
            <ellipse cx="100" cy="84" rx="25" ry="29" fill="#FFE0B2" />
            <path d="M 74 70 Q 100 52 126 70" fill="#263238" />
            <!-- Headset -->
            <path d="M 73 80 A 28 28 0 0 1 127 80" stroke="#00E5FF" stroke-width="3" fill="none" />
            <rect x="70" y="78" width="6" height="14" rx="3" fill="#00B0FF" />
            <rect x="124" y="78" width="6" height="14" rx="3" fill="#00B0FF" />
            <circle cx="92" cy="84" r="2.5" fill="#263238" />
            <circle cx="108" cy="84" r="2.5" fill="#263238" />
            <path d="M 90 92 Q 100 98 110 92" stroke="#B0BEC5" stroke-width="2" fill="none" stroke-linecap="round" />
          </g>

          <!-- Minimalist Sovereign Hoodie -->
          <g class="animate-mannequin-breathe origin-bottom">
            <path d="M 62 122 L 138 122 L 148 198 L 52 198 Z" fill="#1E293B" />
            <!-- Indian Flag Minimalist Patch -->
            <rect x="74" y="132" width="12" height="6.5" rx="1.5" fill="#FF9933" />
            <rect x="74" y="138.5" width="12" height="6.5" rx="1.5" fill="#138808" />
          </g>

          <!-- Holographic Rotating AI Code Orb Prop -->
          <g transform="translate(120, 124)">
            <circle cx="20" cy="20" r="16" fill="url(#techOrbGrad)" opacity="0.35" class="animate-pulse" />
            <circle cx="20" cy="20" r="11" stroke="#00E5FF" stroke-width="2.2" fill="none" stroke-dasharray="3,2" class="animate-spin origin-center" />
            <text x="13" y="24" font-size="10" fill="#00E5FF" font-family="monospace" font-weight="900">&lt;/&gt;</text>
          </g>

          <ellipse cx="100" cy="205" rx="50" ry="9" fill="#003366" opacity="0.12" />
        </svg>
      </div>
    `;
  }

  // 6. Healthcare / Doctor / ASHA Worker Mannequin
  if (category === 'health' || citizenId.includes('health') || citizenId.includes('doctor') || citizenId.includes('vaidyan')) {
    return `
      <div class="relative w-48 h-52 sm:w-56 sm:h-60 mx-auto animate-mannequin-float transition-all duration-500 filter drop-shadow-[0_20px_35px_rgba(16,185,129,0.25)]">
        <!-- Healing Green Aura -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="w-36 h-36 rounded-full bg-gradient-to-tr from-emerald-400/25 to-teal-500/20 blur-xl animate-pulse"></div>
        </div>

        <svg viewBox="0 0 200 220" class="w-full h-full relative z-10">
          <defs>
            <linearGradient id="healthCross" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#E53935" />
              <stop offset="100%" stop-color="#C62828" />
            </linearGradient>
          </defs>

          <!-- Head -->
          <g class="animate-mannequin-bob">
            <ellipse cx="100" cy="84" rx="25" ry="29" fill="#FFE0B2" />
            <path d="M 75 70 Q 100 54 125 70" fill="#37474F" />
            <circle cx="92" cy="82" r="2.5" fill="#37474F" />
            <circle cx="108" cy="82" r="2.5" fill="#37474F" />
            <path d="M 90 91 Q 100 97 110 91" stroke="#D7CCC8" stroke-width="2.5" fill="none" stroke-linecap="round" />
          </g>

          <!-- White Clinical Coat & Stethoscope -->
          <g class="animate-mannequin-breathe origin-bottom">
            <path d="M 64 122 L 136 122 L 146 198 L 54 198 Z" fill="#FFFFFF" stroke="#CFD8DC" stroke-width="1.8" />
            <polygon points="100,122 86,145 100,165 114,145" fill="#00897B" />
            <!-- Stethoscope -->
            <path d="M 84 125 Q 84 155 100 162 Q 116 155 116 125" stroke="#455A64" stroke-width="2.5" fill="none" />
            <circle cx="100" cy="166" r="4.5" fill="#90A4AE" stroke="#37474F" stroke-width="1.5" />
          </g>

          <!-- Medical Emblem Badge -->
          <g transform="translate(72, 134)">
            <circle cx="6" cy="6" r="8" fill="#FFEBEE" />
            <rect x="5" y="2" width="2" height="8" fill="url(#healthCross)" />
            <rect x="2" y="5" width="8" height="2" fill="url(#healthCross)" />
          </g>

          <ellipse cx="100" cy="205" rx="50" ry="9" fill="#003366" opacity="0.12" />
        </svg>
      </div>
    `;
  }

  // 7. Everyday Hero / Civic / Sanitation / Eco Sentinel (Default fallback)
  return `
    <div class="relative w-48 h-52 sm:w-56 sm:h-60 mx-auto animate-mannequin-float transition-all duration-500 filter drop-shadow-[0_20px_35px_rgba(46,125,50,0.25)]">
      <!-- National Tricolor Aura -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-36 h-36 rounded-full bg-gradient-to-tr from-orange-400/20 via-white/10 to-emerald-500/20 blur-xl animate-pulse"></div>
      </div>

      <svg viewBox="0 0 200 220" class="w-full h-full relative z-10">
        <!-- Head -->
        <g class="animate-mannequin-bob">
          <ellipse cx="100" cy="84" rx="25" ry="29" fill="#FFE0B2" />
          <path d="M 75 70 Q 100 52 125 70" fill="#2E7D32" />
          <circle cx="92" cy="82" r="2.5" fill="#263238" />
          <circle cx="108" cy="82" r="2.5" fill="#263238" />
          <path d="M 90 91 Q 100 97 110 91" stroke="#D7CCC8" stroke-width="2.5" fill="none" stroke-linecap="round" />
        </g>

        <!-- Civic Guardian Uniform -->
        <g class="animate-mannequin-breathe origin-bottom">
          <path d="M 64 122 L 136 122 L 146 198 L 54 198 Z" fill="#2E7D32" />
          <!-- Reflective Stripe -->
          <rect x="60" y="145" width="80" height="7" fill="#EEEEEE" stroke="#BDBDBD" stroke-width="1" />
          <!-- Sovereign Shield Badge -->
          <g transform="translate(90, 160)">
            <path d="M 10 0 L 20 5 L 20 18 Q 10 24 10 24 Q 0 18 0 18 L 0 5 Z" fill="#FF9933" stroke="#FFFFFF" stroke-width="1.5" />
            <circle cx="10" cy="11" r="3" fill="#003366" />
          </g>
        </g>

        <ellipse cx="100" cy="205" rx="50" ry="9" fill="#003366" opacity="0.12" />
      </svg>
    </div>
  `;
}
