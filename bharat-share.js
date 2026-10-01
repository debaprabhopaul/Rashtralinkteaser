// RashtraLink (Ralync) - Hometown Voice Share & Snapshot Generator
// Renders client-side PNG images for WhatsApp, Instagram Stories, and X/Twitter

export function generateHometownCardImage(citizen) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');

    // 1. Premium Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    bgGradient.addColorStop(0, '#001933');
    bgGradient.addColorStop(0.5, '#002B5B');
    bgGradient.addColorStop(1, '#001428');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1080, 1350);

    // 2. Ambient Tricolor Glow
    const orangeGlow = ctx.createRadialGradient(200, 200, 50, 200, 200, 600);
    orangeGlow.addColorStop(0, 'rgba(255, 107, 0, 0.25)');
    orangeGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = orangeGlow;
    ctx.fillRect(0, 0, 1080, 1350);

    const greenGlow = ctx.createRadialGradient(880, 1150, 50, 880, 1150, 600);
    greenGlow.addColorStop(0, 'rgba(19, 136, 8, 0.25)');
    greenGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = greenGlow;
    ctx.fillRect(0, 0, 1080, 1350);

    // 3. Tricolor Top Border Ribbon
    ctx.fillStyle = '#FF9933';
    ctx.fillRect(0, 0, 1080, 18);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 18, 1080, 10);
    ctx.fillStyle = '#138808';
    ctx.fillRect(0, 28, 1080, 18);

    // 4. Header: RashtraLink (Ralync) Logo & Badge
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('RASHTRALINK', 80, 120);

    ctx.fillStyle = '#FF9933';
    ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('VOICES OF BHARAT (भारत की आवाज़)', 80, 165);

    // 5. Card Container Box (Pristine Frosted White Card)
    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, 80, 220, 920, 960, 48);
    ctx.fill();

    // 6. City & Language Ribbon inside Card
    ctx.fillStyle = '#FF5622';
    ctx.font = '900 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`${citizen.city.toUpperCase()}, ${citizen.state.toUpperCase()}`, 130, 310);

    ctx.fillStyle = '#003366';
    ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Language: ${citizen.language}`, 130, 350);

    // Divider Line
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(130, 385);
    ctx.lineTo(950, 385);
    ctx.stroke();

    // 7. Large Authentic Mother-Tongue Greeting (Bold Hero)
    ctx.fillStyle = '#0F172A';
    ctx.font = '900 58px "Plus Jakarta Sans", sans-serif';
    const shortGreeting = citizen.shortGreeting || (citizen.vernacularWelcome.split('—')[0].trim());
    wrapText(ctx, `"${shortGreeting}"`, 130, 470, 820, 72);

    // 8. Meaning / Subtitle
    ctx.fillStyle = '#64748B';
    ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Built for India • Useful to people, not the hype.', 130, 610);

    // 9. Citizen Profile Strip Box
    ctx.fillStyle = '#F8FAFC';
    roundRect(ctx, 130, 670, 820, 300, 32);
    ctx.fill();
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Citizen Name & Role
    ctx.fillStyle = '#003366';
    ctx.font = '900 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(citizen.name, 170, 745);

    ctx.fillStyle = '#FF5622';
    ctx.font = '800 26px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(citizen.role, 170, 790);

    // Citizen Quote
    ctx.fillStyle = '#334155';
    ctx.font = 'italic 500 26px "Plus Jakarta Sans", sans-serif';
    wrapText(ctx, `"${citizen.punchline || citizen.quote}"`, 170, 850, 740, 38);

    // 10. Card Footer inside White Card
    ctx.fillStyle = '#0F172A';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Sovereign Social Media Built for Bharat', 130, 1120);

    ctx.fillStyle = '#10B981';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Zero Ad Exploitation • Zero Outrage Algorithms', 130, 1150);

    // 11. Bottom Banner URL
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Join at rashtralink.in/bharat', 80, 1260);

    ctx.fillStyle = '#FF9933';
    ctx.fillText('Claim Your City Voice 🇮🇳', 690, 1260);

    resolve(canvas.toDataURL('image/png'));
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

export function openHometownShareModal(citizen) {
  let modal = document.getElementById('hometown-share-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'hometown-share-modal';
    document.body.appendChild(modal);
  }

  const shortGreeting = citizen.shortGreeting || (citizen.vernacularWelcome.split('—')[0].trim());
  const shareText = encodeURIComponent(`🇮🇳 Discover the sovereign voice of ${citizen.city}, ${citizen.state} on RashtraLink (Ralync)! "${shortGreeting}" — Built for India, not for the hype. Check your hometown: https://rashtralink.in/bharat`);

  modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md transition-all animate-fadeIn overflow-y-auto';
  modal.style.display = 'flex';
  
  // Close on backdrop click
  modal.onclick = function(e) {
    if (e.target === modal) {
      window.closeHometownShareModal();
    }
  };

  modal.innerHTML = `
    <div class="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-[2rem] bg-white p-5 sm:p-7 shadow-2xl border border-slate-100 text-left space-y-4 animate-scaleUp">
      
      <!-- Big, Clear Cross Close Button (Top Right) -->
      <button 
        onclick="window.closeHometownShareModal()" 
        type="button"
        class="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 hover:text-slate-900 flex items-center justify-center font-black text-lg transition-all active:scale-90 border border-slate-200 shadow-sm"
        title="Close dialog (Esc)"
      >
        ✕
      </button>

      <!-- Modal Header -->
      <div class="pr-10">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-rashtraOrange text-[11px] font-black uppercase tracking-wider mb-1.5">
          <span>🇮🇳 Share Your Hometown Voice</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
          Represent ${citizen.city} on RashtraLink
        </h3>
        <p class="text-xs text-slate-500 font-medium mt-1">
          Share your mother-tongue greeting with friends on WhatsApp, X, and Instagram.
        </p>
      </div>

      <!-- Live Generated Image Preview Box -->
      <div id="share-card-preview-box" class="w-full aspect-[4/5] max-h-[380px] rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-200 shadow-inner relative">
        <div class="flex flex-col items-center justify-center text-slate-400 gap-2">
          <i data-lucide="loader-2" class="w-6 h-6 animate-spin text-orange-400"></i>
          <span class="text-xs font-bold">Rendering High-Res Story Card...</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <a 
          href="https://api.whatsapp.com/send?text=${shareText}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all text-center"
        >
          <i data-lucide="message-circle" class="w-4 h-4"></i>
          <span>Share to WhatsApp</span>
        </a>

        <a 
          href="https://twitter.com/intent/tweet?text=${shareText}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all text-center"
        >
          <i data-lucide="twitter" class="w-4 h-4"></i>
          <span>Share to X (Twitter)</span>
        </a>

        <button 
          id="btn-download-share-card" 
          class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rashtraOrange to-indiaSaffron text-white font-black text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 transition-all sm:col-span-2"
        >
          <i data-lucide="download" class="w-4 h-4"></i>
          <span>Download High-Res Story Card (PNG)</span>
        </button>

        <!-- Dedicated Close Window Button -->
        <button 
          onclick="window.closeHometownShareModal()" 
          type="button"
          class="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 sm:col-span-2 border border-slate-200"
        >
          <span>✕ Close Window</span>
        </button>
      </div>

      <!-- Link Copy Feedback -->
      <div class="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
        <span class="text-slate-400 font-medium">Link: rashtralink.in/bharat</span>
        <button onclick="window.copyShareLinkToClipboard()" class="text-rashtraOrange font-black hover:underline flex items-center gap-1">
          <i data-lucide="copy" class="w-3.5 h-3.5"></i>
          <span id="copy-link-text">Copy Link</span>
        </button>
      </div>

    </div>
  `;

  modal.classList.remove('hidden');
  if (window.lucide && lucide.createIcons) lucide.createIcons();

  // Generate Image and attach to download
  generateHometownCardImage(citizen).then(dataUrl => {
    const previewBox = document.getElementById('share-card-preview-box');
    if (previewBox) {
      previewBox.innerHTML = `
        <img src="${dataUrl}" alt="${citizen.city} Voice Card" class="w-full h-full object-contain" />
      `;
    }

    const downloadBtn = document.getElementById('btn-download-share-card');
    if (downloadBtn) {
      downloadBtn.onclick = () => {
        const link = document.createElement('a');
        link.download = `RashtraLink-${citizen.city.replace(/[^a-zA-Z0-9]/g, '')}-Voice.png`;
        link.href = dataUrl;
        link.click();
      };
    }
  });
}

export function closeHometownShareModal() {
  const modal = document.getElementById('hometown-share-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
}

// Global escape key handler to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeHometownShareModal();
  }
});

window.copyShareLinkToClipboard = function() {
  const url = `${window.location.origin}/bharat`;
  navigator.clipboard.writeText(url).then(() => {
    const txt = document.getElementById('copy-link-text');
    if (txt) {
      txt.textContent = 'Copied to Clipboard! ✓';
      setTimeout(() => { txt.textContent = 'Copy Link'; }, 2000);
    }
  });
};

window.openHometownShareModal = openHometownShareModal;
window.closeHometownShareModal = closeHometownShareModal;
