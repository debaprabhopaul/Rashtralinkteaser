// RashtraLink Sovereign MVP Interactive Engine
// Developed for RashtraLink Teaser & MVP Demonstration

// --- Web Audio API Synth Effects (No external assets required) ---
class SoundFx {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }
    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) this.ctx = new AudioContext();
        }
    }
    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.05);
        } catch(e) {}
    }
    playSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.setValueAtTime(554.37, now + 0.08); // C#
            osc.frequency.setValueAtTime(659.25, now + 0.16); // E
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(now + 0.35);
        } catch(e) {}
    }
}
const sfx = new SoundFx();

// --- Vernacular Language Engine ---
const VERNACULAR_TRANSLATIONS = {
    en: {
        feed: "Feed",
        explore: "Explore",
        charcha: "Charcha Arena",
        profile: "Profile",
        tuneLevers: "Tune Levers",
        injectLever: "+ Inject Lever",
        sovereignTitle: "Sovereign Social Infrastructure",
        consensus: "Bharat Voice Consensus",
        inFavor: "In Favor",
        counter: "Counter",
        voteCounted: "Your vote counted",
        endorsed: "Endorsements"
    },
    hi: {
        feed: "फ़ीड",
        explore: "अन्वेषण",
        charcha: "चर्चा अखाड़ा",
        profile: "प्रोफ़ाइल",
        tuneLevers: "एल्गोरिदम लीवर",
        injectLever: "+ नया लीवर",
        sovereignTitle: "संप्रभु सामाजिक अवसंरचना",
        consensus: "भारत जनमत सर्वसम्मति",
        inFavor: "समर्थन में",
        counter: "विपक्ष में",
        voteCounted: "आपका मत दर्ज हुआ",
        endorsed: "समर्थन"
    },
    bn: {
        feed: "ফিড",
        explore: "অন্বেষণ",
        charcha: "চর্চা আখাড়া",
        profile: "প্রোফাইল",
        tuneLevers: "লিভার সমন্বয়",
        injectLever: "+ নতুন লিভার",
        sovereignTitle: "সার্বভৌম সামাজিক পরিকাঠামো",
        consensus: "ভারত ভয়েস ঐক্যমত",
        inFavor: "পক্ষে",
        counter: "বিপক্ষে",
        voteCounted: "আপনার ভোট গৃহীত হয়েছে",
        endorsed: "সমর্থন"
    },
    ta: {
        feed: "ஊட்டம்",
        explore: "ஆராய்க",
        charcha: "சர்ச்சை அரங்கம்",
        profile: "சுயவிவரம்",
        tuneLevers: "அல்காரிதம் அமைப்புகள்",
        injectLever: "+ புதிய நெம்புகோல்",
        sovereignTitle: "இறையாண்மை சமூக கட்டமைப்பு",
        consensus: "பாரத குரல் உடன்பாடு",
        inFavor: "ஆதரவாக",
        counter: "எதிராக",
        voteCounted: "உங்கள் வாக்கு பதிவானது",
        endorsed: "ஆதரவுகள்"
    },
    te: {
        feed: "ఫీడ్",
        explore: "అన్వేషించండి",
        charcha: "చర్చా అఖాడా",
        profile: "ప్రొఫైల్",
        tuneLevers: "లీవర్ సర్దుబాటు",
        injectLever: "+ కొత్త లీవర్",
        sovereignTitle: "సార్వభౌమ సామాజిక మౌలిక సదుపాయాలు",
        consensus: "భారత స్వర ఏకాభిప్రాయం",
        inFavor: "అనుకూలంగా",
        counter: "వ్యతిరేకంగా",
        voteCounted: "మీ ఓటు నమోదైంది",
        endorsed: "మద్దతులు"
    },
    mr: {
        feed: "फीड",
        explore: "अन्वेषण",
        charcha: "चर्चा आखाडा",
        profile: "प्रोफाइल",
        tuneLevers: "लीव्हर बदला",
        injectLever: "+ नवीन लीव्हर",
        sovereignTitle: "सार्वभौम सामाजिक पायाभूत सुविधा",
        consensus: "भारत जनमत सहमती",
        inFavor: "समर्थनात",
        counter: "विरोधात",
        voteCounted: "आपले मत नोंदवले गेले",
        endorsed: "समर्थन"
    },
    gu: {
        feed: "ફીડ",
        explore: "શોધો",
        charcha: "ચર્ચા અખાડા",
        profile: "પ્રોફાઇલ",
        tuneLevers: "લીવર સેટ કરો",
        injectLever: "+ નવું લીવર",
        sovereignTitle: "સાર્વભૌમ સામાજિક ઈન્ફ્રાસ્ટ્રક્ચર",
        consensus: "ભારત અવાજ સર્વસંમતિ",
        inFavor: "તરફેણમાં",
        counter: "વિરોધમાં",
        voteCounted: "તમારો મત ગણાઈ ગયો",
        endorsed: "સમર્થન"
    }
};

let currentLang = 'en';

// --- Feed Posts & Weights Data ---
const feedDatabase = [
    {
        id: 'post-1',
        author: 'Ananya Deshmukh',
        handle: '@ananya_tech',
        time: 'Sep 15',
        verified: true,
        score: 240,
        text: 'India needs sovereign AI infrastructure, not just API wrappers on foreign foundational models. If our national datasets and vernacular wisdom train models hosted abroad, we surrender algorithmic sovereignty. We should establish a National Compute Grid funded like our telecom towers in the 2000s.',
        tags: ['#tech', '#startups', '#geopolitics'],
        likes: 342,
        charchaCount: 24,
        liked: false,
        type: 'standard',
        category: 'tech'
    },
    {
        id: 'post-2',
        author: 'Bharat Fintech Observer',
        handle: '@fintech_bharat',
        time: '1h ago',
        verified: true,
        score: 235,
        text: 'UPI processed over 15 Billion transactions last month. With banks bearing infrastructure and fraud-prevention costs, how should the ecosystem sustain long-term infrastructure investment without burdening small merchants?',
        tags: ['#finance', '#tech', '#startups'],
        likes: 512,
        charchaCount: 48,
        liked: false,
        type: 'poll',
        pollTitle: 'How should India finance long-term UPI infrastructure costs?',
        pollOptions: [
            { text: 'Keep 0% MDR, fund via Government Sovereign Digital Grant', votes: 1122, pct: 61 },
            { text: 'Tiered micro-fee only on transactions > ₹2,000', votes: 533, pct: 29 },
            { text: 'Optional value-add services & credit lines for merchants', votes: 185, pct: 10 }
        ],
        totalVotes: 1840,
        votedIndex: -1,
        category: 'finance'
    },
    {
        id: 'post-3',
        author: 'Indie Bharat Capital',
        handle: '@startup_pulse',
        time: '3h ago',
        verified: true,
        score: 215,
        text: 'Tier-2 Bharat: The Hardware & Manufacturing Frontier. Lower operational overhead, direct proximity to industrial clusters, and sticky local talent pools give Tier-2 founders a 40% burn advantage.',
        tags: ['#startups', '#geopolitics', '#mobility'],
        likes: 198,
        charchaCount: 16,
        liked: false,
        type: 'oneshot',
        oneshotTitle: 'Tier-2 Bharat: The Hardware & Manufacturing Frontier',
        oneshotTag: 'STARTUPS & ECONOMY',
        category: 'startups'
    }
];

// --- Priority Levers ---
let activeLevers = {
    '#startups': 80,
    '#tech': 85,
    '#finance': 70,
    '#defence': 60,
    '#mobility': 50
};

// --- Charcha Arguments Data ---
let charchaArguments = [
    {
        id: 'arg-1',
        author: 'Citizen 8891',
        isIncognito: true,
        type: 'favor',
        endorsements: 98,
        endorsed: false,
        time: '12:29',
        text: 'We should adopt a hybrid Public-Private Partnership (PPP) model, similar to C-DAC and private hyperscalers. That ensures both sovereign data custody and rapid hardware refresh cycles.',
        source: 'https://pib.gov.in/cdac-supercomputing'
    },
    {
        id: 'arg-2',
        author: 'Dr. Ramesh Iyer',
        isIncognito: false,
        type: 'counter',
        endorsements: 67,
        endorsed: false,
        time: '12:36',
        text: 'Building silicon fabs and foundational weights from pure zero risks stranding Indian startups 3 years behind global velocity. We must leverage fine-tuning on open sovereign weights first.',
        source: 'https://meity.gov.in/india-ai'
    },
    {
        id: 'arg-3',
        author: 'Priya Sharma (AI Fellow)',
        isIncognito: false,
        type: 'favor',
        endorsements: 45,
        endorsed: false,
        time: '12:44',
        text: 'Language tokenizers in Western models charge 4x the compute cost for Indic scripts (Hindi, Tamil, Bengali). Sovereignty is an economic necessity, not just ideological.',
        source: 'https://bhashini.gov.in/research'
    }
];

// --- Toast System ---
function showToast(message, icon = 'check-circle') {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 z-[99999] flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-rashtraBlue text-white shadow-2xl border border-white/20 text-sm font-bold transform translate-y-10 opacity-0 transition-all duration-300 pointer-events-none';
    toast.innerHTML = `<i data-lucide="${icon}" class="text-rashtraOrange w-5 h-5 flex-shrink-0"></i> <span>${message}</span>`;
    document.body.appendChild(toast);
    lucide.createIcons();
    sfx.playClick();
    
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 400);
    }, 2800);
}

// --- Initialize Interactive Components ---
window.addEventListener('DOMContentLoaded', () => {
    initAppNavigation();
    initLeversEngine();
    initCharchaArena();
    initPolls();
    initFeedInteractions();
    initSettingsEngine();
    initWishlistPassGenerator();
    initStoriesViewer();
    initSoundToggle();
});

// --- Sound Toggle ---
function initSoundToggle() {
    const btn = document.getElementById('sound-toggle-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        sfx.enabled = !sfx.enabled;
        const icon = btn.querySelector('i');
        if (sfx.enabled) {
            btn.classList.remove('opacity-50');
            showToast('Interface Haptic Audio: Enabled', 'volume-2');
            sfx.playClick();
        } else {
            btn.classList.add('opacity-50');
            showToast('Interface Audio: Muted', 'volume-x');
        }
    });
}

// --- App Navigation Inside Device Simulator ---
function initAppNavigation() {
    const navItems = document.querySelectorAll('.mvp-tab-btn');
    const views = {
        'feed': document.getElementById('mvp-view-feed'),
        'explore': document.getElementById('mvp-view-explore'),
        'charcha': document.getElementById('mvp-view-charcha'),
        'profile': document.getElementById('mvp-view-settings')
    };

    navItems.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            if (!target) return;
            sfx.playClick();

            navItems.forEach(b => {
                b.classList.remove('text-rashtraOrange', 'font-black');
                b.classList.add('text-slate-400', 'font-medium');
            });
            btn.classList.add('text-rashtraOrange', 'font-black');
            btn.classList.remove('text-slate-400');

            // Switch view
            Object.keys(views).forEach(key => {
                if (views[key]) {
                    if (key === target) {
                        views[key].classList.remove('hidden');
                        views[key].classList.add('block');
                    } else {
                        views[key].classList.add('hidden');
                        views[key].classList.remove('block');
                    }
                }
            });
        });
    });

    // Create post button
    const createBtn = document.getElementById('mvp-create-btn');
    const createModal = document.getElementById('mvp-create-modal');
    const closeCreateBtn = document.getElementById('close-create-modal');
    const publishPostBtn = document.getElementById('publish-post-btn');

    if (createBtn && createModal) {
        createBtn.addEventListener('click', () => {
            sfx.playClick();
            createModal.classList.remove('hidden');
        });
    }
    if (closeCreateBtn && createModal) {
        closeCreateBtn.addEventListener('click', () => {
            sfx.playClick();
            createModal.classList.add('hidden');
        });
    }
    if (publishPostBtn && createModal) {
        publishPostBtn.addEventListener('click', () => {
            const input = document.getElementById('new-post-content');
            if (!input || !input.value.trim()) return;
            sfx.playSuccess();
            const content = input.value.trim();
            
            // Add post to feed
            const newPost = {
                id: 'post-' + Date.now(),
                author: 'You (Founding Citizen)',
                handle: '@citizen_bharat',
                time: 'Just now',
                verified: true,
                score: 280,
                text: content,
                tags: ['#startups', '#tech'],
                likes: 1,
                charchaCount: 0,
                liked: false,
                type: 'standard',
                category: 'tech'
            };
            feedDatabase.unshift(newPost);
            renderFeed();
            createModal.classList.add('hidden');
            input.value = '';
            showToast('Post published to Sovereign Bharat Feed!', 'send');
        });
    }

    // Modal Trigger: Priority Matrix from Feed Top
    const tuneLeversBtn = document.getElementById('btn-tune-levers');
    const matrixModal = document.getElementById('matrix-modal');
    const closeMatrixBtn = document.getElementById('close-matrix-modal');
    const cancelMatrixBtn = document.getElementById('cancel-matrix-modal');

    if (tuneLeversBtn && matrixModal) {
        tuneLeversBtn.addEventListener('click', () => {
            sfx.playClick();
            matrixModal.classList.remove('hidden');
        });
    }
    [closeMatrixBtn, cancelMatrixBtn].forEach(btn => {
        if (btn && matrixModal) {
            btn.addEventListener('click', () => {
                sfx.playClick();
                matrixModal.classList.add('hidden');
            });
        }
    });
}

// --- Levers Engine & Dynamic Feed Scoring ---
function initLeversEngine() {
    const matrixModal = document.getElementById('matrix-modal');
    const leversList = document.getElementById('active-levers-list');
    const applyBtn = document.getElementById('apply-rerank-btn');
    const resetBtn = document.getElementById('reset-levers-btn');
    const injectInput = document.getElementById('inject-lever-input');
    const injectBtn = document.getElementById('inject-lever-btn');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    // Suggestions click
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            sfx.playClick();
            const tag = chip.dataset.tag;
            if (!activeLevers[tag]) {
                activeLevers[tag] = 75;
                chip.classList.add('bg-rashtraOrange/10', 'text-rashtraOrange', 'border-rashtraOrange');
                renderMatrixSliders();
                renderFeedChips();
                showToast(`Lever ${tag} activated at 75%`, 'sliders');
            } else {
                delete activeLevers[tag];
                chip.classList.remove('bg-rashtraOrange/10', 'text-rashtraOrange', 'border-rashtraOrange');
                renderMatrixSliders();
                renderFeedChips();
                showToast(`Lever ${tag} removed`, 'trash-2');
            }
        });
    });

    // Custom inject
    if (injectBtn && injectInput) {
        const handleInject = () => {
            let val = injectInput.value.trim().toLowerCase();
            if (!val) return;
            if (!val.startsWith('#')) val = '#' + val;
            activeLevers[val] = 80;
            injectInput.value = '';
            sfx.playSuccess();
            renderMatrixSliders();
            renderFeedChips();
            showToast(`Custom Lever ${val} injected!`, 'plus-circle');
        };
        injectBtn.addEventListener('click', handleInject);
        injectInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleInject();
        });
    }

    // Reset defaults
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            sfx.playClick();
            activeLevers = {
                '#startups': 80,
                '#tech': 85,
                '#finance': 70,
                '#defence': 60,
                '#mobility': 50
            };
            renderMatrixSliders();
            renderFeedChips();
            showToast('Levers restored to Bharat Default', 'rotate-ccw');
        });
    }

    // Apply & Re-rank
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            sfx.playSuccess();
            if (matrixModal) matrixModal.classList.add('hidden');
            
            // Deterministic Bharat Feed Scoring
            feedDatabase.forEach(post => {
                let calculatedScore = 100;
                post.tags.forEach(tag => {
                    if (activeLevers[tag] !== undefined) {
                        calculatedScore += activeLevers[tag];
                    }
                });
                post.score = calculatedScore;
            });

            // Sort by score descending
            feedDatabase.sort((a, b) => b.score - a.score);
            renderFeed();
            showToast('Personalized Sovereign Feed Re-ranked!', 'sparkles');
        });
    }

    renderMatrixSliders();
    renderFeedChips();
}

function renderMatrixSliders() {
    const list = document.getElementById('active-levers-list');
    const countDisplay = document.getElementById('active-levers-count');
    if (!list) return;

    list.innerHTML = '';
    const entries = Object.entries(activeLevers);
    if (countDisplay) countDisplay.innerText = `Active Priority Levers (${entries.length}):`;

    entries.forEach(([tag, val]) => {
        const item = document.createElement('div');
        item.className = 'p-4 rounded-2xl bg-white border border-slate-200 shadow-sm';
        item.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="font-extrabold text-sm text-rashtraBlue">${tag}</span>
                <div class="flex items-center gap-3">
                    <span class="font-black text-xs text-rashtraOrange lever-val">${val}%</span>
                    <button class="text-slate-300 hover:text-red-500 delete-lever transition-colors p-1" data-tag="${tag}">
                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                </div>
            </div>
            <input type="range" min="0" max="100" value="${val}" class="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer lever-slider" data-tag="${tag}">
        `;
        list.appendChild(item);

        const slider = item.querySelector('.lever-slider');
        const valSpan = item.querySelector('.lever-val');
        slider.addEventListener('input', (e) => {
            const newVal = parseInt(e.target.value);
            activeLevers[tag] = newVal;
            valSpan.innerText = newVal + '%';
            renderFeedChips();
        });

        item.querySelector('.delete-lever').addEventListener('click', () => {
            sfx.playClick();
            delete activeLevers[tag];
            renderMatrixSliders();
            renderFeedChips();
        });
    });
    lucide.createIcons();
}

function renderFeedChips() {
    const container = document.getElementById('feed-active-chips');
    if (!container) return;
    container.innerHTML = '';

    Object.entries(activeLevers).slice(0, 4).forEach(([tag, val]) => {
        const chip = document.createElement('div');
        chip.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs text-[11px] font-bold text-slate-700 whitespace-nowrap cursor-pointer hover:border-rashtraOrange transition-colors';
        chip.innerHTML = `<span>${tag}</span> <span class="text-rashtraOrange font-black">${val}%</span>`;
        chip.addEventListener('click', () => {
            const modal = document.getElementById('matrix-modal');
            if (modal) modal.classList.remove('hidden');
        });
        container.appendChild(chip);
    });
}

// --- Feed Rendering & Interactions ---
function initFeedInteractions() {
    renderFeed();
}

function renderFeed() {
    const container = document.getElementById('mvp-posts-container');
    if (!container) return;
    container.innerHTML = '';

    feedDatabase.forEach(post => {
        const card = document.createElement('div');
        card.className = 'p-5 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md';
        
        let customContentHtml = '';

        if (post.type === 'poll') {
            customContentHtml = `
                <div class="mt-4 p-4 rounded-2xl bg-orange-50/50 border border-orange-100">
                    <p class="text-xs font-black text-rashtraBlue mb-3">${post.pollTitle}</p>
                    <div class="space-y-2 poll-options-wrapper" data-postid="${post.id}">
                        ${post.pollOptions.map((opt, idx) => `
                            <button class="w-full text-left p-3 rounded-xl border transition-all text-xs font-bold relative overflow-hidden poll-opt-btn ${post.votedIndex === idx ? 'border-rashtraOrange bg-orange-100/70 font-black' : 'border-orange-200/70 bg-white hover:bg-orange-50'}" data-index="${idx}">
                                <div class="absolute top-0 left-0 bottom-0 bg-orange-200/40 transition-all duration-500 rounded-xl" style="width: ${post.votedIndex !== -1 ? opt.pct : 0}%"></div>
                                <div class="relative z-10 flex justify-between items-center">
                                    <span class="truncate pr-2">${opt.text}</span>
                                    <span class="text-[11px] font-extrabold text-rashtraOrange flex-shrink-0">${opt.pct}%</span>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                    <div class="flex justify-between items-center mt-3 text-[10px] text-slate-500 font-bold">
                        <span>${post.totalVotes.toLocaleString()} total Bharat votes</span>
                        <span class="text-emerald-700 font-extrabold">${post.votedIndex !== -1 ? '✓ Your vote counted' : 'Tap to cast vote'}</span>
                    </div>
                </div>
            `;
        } else if (post.type === 'oneshot') {
            customContentHtml = `
                <div class="mt-4 p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-rashtraBlue text-white shadow-inner">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-[9px] uppercase tracking-widest font-black text-amber-400">${post.oneshotTag}</span>
                        <span class="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-bold">⚡ 15s Flash</span>
                    </div>
                    <h4 class="font-extrabold text-sm mb-2 leading-tight">${post.oneshotTitle}</h4>
                    <p class="text-[11px] text-slate-300 mb-4 leading-relaxed">${post.text}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-[10px] text-slate-400 font-bold">3 swipeable flash insights</span>
                        <button class="launch-oneshot-btn px-4 py-2 rounded-xl bg-rashtraOrange text-white font-black text-xs hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5 shadow-lg">
                            <span>▶ Launch OneShot</span>
                        </button>
                    </div>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-rashtraOrange to-indiaSaffron flex items-center justify-center text-white font-black text-sm shadow-md">
                        ${post.author.charAt(0)}
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5">
                            <h4 class="font-bold text-xs text-rashtraBlue leading-none">${post.author}</h4>
                            ${post.verified ? '<i data-lucide="badge-check" class="w-3.5 h-3.5 text-rashtraOrange fill-rashtraOrange text-white"></i>' : ''}
                            ${post.type === 'poll' ? '<span class="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[9px] font-black">Bharat Poll</span>' : ''}
                        </div>
                        <p class="text-[10px] text-slate-400 font-medium">${post.handle} • ${post.time}</p>
                    </div>
                </div>
                <div class="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500">
                    <i data-lucide="sliders-horizontal" class="w-3 h-3 text-rashtraOrange"></i>
                    <span>Score ${post.score}</span>
                </div>
            </div>

            ${post.type !== 'oneshot' ? `<p class="text-xs text-slate-700 leading-relaxed font-medium mb-3">${post.text}</p>` : ''}
            
            ${customContentHtml}

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 my-3">
                ${post.tags.map(t => `<span class="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-600">${t}</span>`).join('')}
            </div>

            <!-- Footer Actions -->
            <div class="flex items-center justify-between pt-3 border-t border-slate-100 text-slate-500 text-xs font-bold">
                <button class="like-post-btn flex items-center gap-1.5 hover:text-red-500 transition-colors ${post.liked ? 'text-red-500' : ''}" data-postid="${post.id}">
                    <i data-lucide="heart" class="w-4 h-4 ${post.liked ? 'fill-red-500' : ''}"></i>
                    <span>${post.likes}</span>
                </button>
                <button class="goto-charcha-btn flex items-center gap-1.5 hover:text-rashtraBlue transition-colors" data-postid="${post.id}">
                    <i data-lucide="message-square" class="w-4 h-4 text-rashtraOrange"></i>
                    <span>Charcha (${post.charchaCount})</span>
                </button>
                <button class="share-post-btn flex items-center gap-1.5 hover:text-rashtraBlue transition-colors">
                    <i data-lucide="share-2" class="w-4 h-4"></i>
                </button>
            </div>
        `;

        // Like button
        const likeBtn = card.querySelector('.like-post-btn');
        likeBtn.addEventListener('click', () => {
            sfx.playClick();
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            likeBtn.querySelector('span').innerText = post.likes;
            const icon = likeBtn.querySelector('i');
            if (post.liked) {
                likeBtn.classList.add('text-red-500');
                icon.classList.add('fill-red-500');
                showToast('Endorsed on Sovereign Chain', 'heart');
            } else {
                likeBtn.classList.remove('text-red-500');
                icon.classList.remove('fill-red-500');
            }
        });

        // Go to Charcha Arena button
        const charchaBtn = card.querySelector('.goto-charcha-btn');
        charchaBtn.addEventListener('click', () => {
            sfx.playClick();
            const charchaTab = document.querySelector('[data-target="charcha"]');
            if (charchaTab) charchaTab.click();
        });

        // Share button
        const shareBtn = card.querySelector('.share-post-btn');
        shareBtn.addEventListener('click', () => {
            sfx.playSuccess();
            showToast('Decentralized Post Link Copied to Clipboard!', 'share-2');
        });

        // Launch OneShot button
        const oneshotBtn = card.querySelector('.launch-oneshot-btn');
        if (oneshotBtn) {
            oneshotBtn.addEventListener('click', () => {
                sfx.playSuccess();
                showToast('Launching 15-second Bharat Insight reel...', 'zap');
            });
        }

        // Poll votes
        const pollOpts = card.querySelectorAll('.poll-opt-btn');
        pollOpts.forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                if (post.votedIndex === idx) return;
                sfx.playSuccess();
                post.votedIndex = idx;
                post.pollOptions[idx].votes += 1;
                post.totalVotes += 1;
                // Recalculate percentages
                post.pollOptions.forEach(opt => {
                    opt.pct = Math.round((opt.votes / post.totalVotes) * 100);
                });
                renderFeed();
                showToast('Your Bharat Vote has been verified & counted!', 'check-circle');
            });
        });

        container.appendChild(card);
    });

    lucide.createIcons();
}

function initPolls() {
    // Initialized within renderFeed
}

// --- Charcha Arena Logic ---
function initCharchaArena() {
    const tabAll = document.getElementById('charcha-tab-all');
    const tabFavor = document.getElementById('charcha-tab-favor');
    const tabCounter = document.getElementById('charcha-tab-counter');
    const filterTabs = [tabAll, tabFavor, tabCounter];

    let currentFilter = 'all';

    filterTabs.forEach(tab => {
        if (!tab) return;
        tab.addEventListener('click', () => {
            sfx.playClick();
            filterTabs.forEach(t => {
                if (t) {
                    t.classList.remove('bg-rashtraBlue', 'text-white', 'font-black');
                    t.classList.add('bg-slate-100', 'text-slate-600', 'font-bold');
                }
            });
            tab.classList.remove('bg-slate-100', 'text-slate-600');
            tab.classList.add('bg-rashtraBlue', 'text-white', 'font-black');
            currentFilter = tab.dataset.filter;
            renderCharchaArguments(currentFilter);
        });
    });

    // Argument Mode Toggle (In Favor vs Counter)
    let contributionType = 'favor';
    const btnFavor = document.getElementById('charcha-type-favor');
    const btnCounter = document.getElementById('charcha-type-counter');

    if (btnFavor && btnCounter) {
        btnFavor.addEventListener('click', () => {
            sfx.playClick();
            contributionType = 'favor';
            btnFavor.className = 'flex-1 py-2 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs';
            btnCounter.className = 'flex-1 py-2 px-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center gap-1.5';
        });
        btnCounter.addEventListener('click', () => {
            sfx.playClick();
            contributionType = 'counter';
            btnCounter.className = 'flex-1 py-2 px-3 rounded-xl bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs';
            btnFavor.className = 'flex-1 py-2 px-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center gap-1.5';
        });
    }

    // Incognito Toggle
    const incognitoBox = document.getElementById('charcha-incognito-check');

    // Add Citation Link Button
    const citationBtn = document.getElementById('add-citation-btn');
    if (citationBtn) {
        citationBtn.addEventListener('click', () => {
            sfx.playClick();
            const input = document.getElementById('citation-input-container');
            if (input) input.classList.toggle('hidden');
        });
    }

    // Submit Argument Button
    const submitBtn = document.getElementById('record-argument-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const textInput = document.getElementById('charcha-text-input');
            const citeInput = document.getElementById('charcha-cite-input');
            if (!textInput || !textInput.value.trim()) {
                if (textInput) textInput.focus();
                return;
            }

            sfx.playSuccess();
            const isIncognito = incognitoBox ? incognitoBox.checked : true;
            const newArg = {
                id: 'arg-' + Date.now(),
                author: isIncognito ? `Citizen ${Math.floor(1000 + Math.random() * 9000)}` : 'You (Debaprabho)',
                isIncognito: isIncognito,
                type: contributionType,
                endorsements: 1,
                endorsed: true,
                time: 'Just now',
                text: textInput.value.trim(),
                source: citeInput ? citeInput.value.trim() : ''
            };

            charchaArguments.unshift(newArg);
            textInput.value = '';
            if (citeInput) citeInput.value = '';

            updateConsensusEngine();
            renderCharchaArguments(currentFilter);
            showToast('Argument recorded! Consensus engine recalculated.', 'scale');
        });
    }

    updateConsensusEngine();
    renderCharchaArguments('all');
}

function updateConsensusEngine() {
    const favorCount = charchaArguments.filter(a => a.type === 'favor').length;
    const counterCount = charchaArguments.filter(a => a.type === 'counter').length;
    const total = favorCount + counterCount || 1;
    const favorPct = Math.round((favorCount / total) * 100);
    const counterPct = 100 - favorPct;

    const barFavor = document.getElementById('consensus-bar-favor');
    const barCounter = document.getElementById('consensus-bar-counter');
    const labelFavor = document.getElementById('consensus-label-favor');
    const labelCounter = document.getElementById('consensus-label-counter');
    const totalArgsSpan = document.getElementById('consensus-total-args');

    if (barFavor) barFavor.style.width = favorPct + '%';
    if (barCounter) barCounter.style.width = counterPct + '%';
    if (labelFavor) labelFavor.innerText = `In Favor: ${favorCount} (${favorPct}%)`;
    if (labelCounter) labelCounter.innerText = `Counter: ${counterCount} (${counterPct}%)`;
    if (totalArgsSpan) totalArgsSpan.innerText = `${charchaArguments.length} arguments`;

    const tabAllCount = document.getElementById('tab-count-all');
    const tabFavorCount = document.getElementById('tab-count-favor');
    const tabCounterCount = document.getElementById('tab-count-counter');
    if (tabAllCount) tabAllCount.innerText = `All Arguments (${charchaArguments.length})`;
    if (tabFavorCount) tabFavorCount.innerText = `✓ In Favor (${favorCount})`;
    if (tabCounterCount) tabCounterCount.innerText = `ⓘ Counter-Points (${counterCount})`;
}

function renderCharchaArguments(filter = 'all') {
    const container = document.getElementById('charcha-arguments-container');
    if (!container) return;
    container.innerHTML = '';

    const list = charchaArguments.filter(a => {
        if (filter === 'all') return true;
        return a.type === filter;
    });

    list.forEach(arg => {
        const item = document.createElement('div');
        const isFavor = arg.type === 'favor';
        item.className = `p-4 rounded-2xl border transition-all ${isFavor ? 'bg-emerald-50/40 border-emerald-200' : 'bg-amber-50/40 border-amber-200'}`;
        
        item.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-full ${isFavor ? 'bg-emerald-600' : 'bg-amber-600'} text-white flex items-center justify-center text-[10px] font-black">
                        ${arg.isIncognito ? '🛡️' : '👤'}
                    </div>
                    <div>
                        <div class="flex items-center gap-1.5">
                            <h5 class="text-xs font-black text-rashtraBlue leading-none">${arg.author}</h5>
                            ${arg.isIncognito ? '<span class="text-[9px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-bold">Incognito</span>' : ''}
                            <span class="text-[9px] px-1.5 py-0.5 rounded font-black ${isFavor ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                                ${isFavor ? '✓ IN FAVOR' : 'ⓘ COUNTER'}
                            </span>
                        </div>
                    </div>
                </div>
                <span class="text-[10px] text-slate-400 font-medium">${arg.time}</span>
            </div>

            <p class="text-xs text-slate-700 leading-relaxed font-medium mb-3">${arg.text}</p>

            ${arg.source ? `
                <div class="mb-3">
                    <a href="${arg.source}" target="_blank" class="inline-flex items-center gap-1 text-[10px] font-bold text-rashtraOrange hover:underline bg-white px-2 py-1 rounded-md border border-orange-100">
                        <i data-lucide="link-2" class="w-3 h-3"></i>
                        <span>${arg.source}</span>
                    </a>
                </div>
            ` : ''}

            <div class="flex items-center justify-between pt-2 border-t border-slate-200/50">
                <button class="endorse-arg-btn flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:border-rashtraOrange hover:text-rashtraOrange transition-all" data-argid="${arg.id}">
                    <i data-lucide="thumbs-up" class="w-3.5 h-3.5 ${arg.endorsed ? 'fill-rashtraOrange text-rashtraOrange' : ''}"></i>
                    <span>${arg.endorsements} Endorsements</span>
                </button>
                <span class="text-[10px] text-slate-400 font-medium">Evidence verified</span>
            </div>
        `;

        const endorseBtn = item.querySelector('.endorse-arg-btn');
        endorseBtn.addEventListener('click', () => {
            sfx.playClick();
            arg.endorsed = !arg.endorsed;
            arg.endorsements += arg.endorsed ? 1 : -1;
            endorseBtn.querySelector('span').innerText = `${arg.endorsements} Endorsements`;
            const icon = endorseBtn.querySelector('i');
            if (arg.endorsed) {
                icon.classList.add('fill-rashtraOrange', 'text-rashtraOrange');
                showToast('Endorsed on Sovereign Consensus Engine', 'thumbs-up');
            } else {
                icon.classList.remove('fill-rashtraOrange', 'text-rashtraOrange');
            }
        });

        container.appendChild(item);
    });

    lucide.createIcons();
}

// --- Settings & Vernacular Engine ---
function initSettingsEngine() {
    // Language buttons
    const langBtns = document.querySelectorAll('.lang-select-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sfx.playClick();
            langBtns.forEach(b => {
                b.classList.remove('border-rashtraOrange', 'bg-orange-50/50');
                b.classList.add('border-slate-200');
            });
            btn.classList.add('border-rashtraOrange', 'bg-orange-50/50');
            btn.classList.remove('border-slate-200');

            const lang = btn.dataset.lang;
            currentLang = lang;
            applyVernacular(lang);
            showToast(`Vernacular Language set to: ${btn.querySelector('h5').innerText}`, 'languages');
        });
    });

    // Theme selector
    const themeCream = document.getElementById('theme-warm-cream');
    const themeNavy = document.getElementById('theme-midnight-navy');
    if (themeCream && themeNavy) {
        themeCream.addEventListener('click', () => {
            sfx.playClick();
            themeCream.classList.add('border-rashtraOrange', 'text-rashtraOrange');
            themeNavy.classList.remove('border-rashtraOrange', 'text-rashtraOrange');
            document.getElementById('phone-screen-container').classList.remove('bg-slate-900', 'text-white');
            document.getElementById('phone-screen-container').classList.add('bg-bgSaffron', 'text-slate-900');
            showToast('Theme: Warm Cream (Bharat Light)', 'sun');
        });
        themeNavy.addEventListener('click', () => {
            sfx.playClick();
            themeNavy.classList.add('border-rashtraOrange', 'text-rashtraOrange');
            themeCream.classList.remove('border-rashtraOrange', 'text-rashtraOrange');
            document.getElementById('phone-screen-container').classList.add('bg-slate-900', 'text-white');
            document.getElementById('phone-screen-container').classList.remove('bg-bgSaffron', 'text-slate-900');
            showToast('Theme: Midnight Navy', 'moon');
        });
    }

    // Accent Color selector
    const accentSaffron = document.getElementById('accent-saffron');
    const accentGreen = document.getElementById('accent-green');
    if (accentSaffron && accentGreen) {
        accentSaffron.addEventListener('click', () => {
            sfx.playClick();
            accentSaffron.classList.add('border-rashtraOrange');
            accentGreen.classList.remove('border-emerald-600');
            showToast('Accent: Saffron Orange', 'palette');
        });
        accentGreen.addEventListener('click', () => {
            sfx.playClick();
            accentGreen.classList.add('border-emerald-600');
            accentSaffron.classList.remove('border-rashtraOrange');
            showToast('Accent: Viksit Green', 'palette');
        });
    }

    // Incognito toggle
    const incognitoSetting = document.getElementById('settings-incognito-check');
    if (incognitoSetting) {
        incognitoSetting.addEventListener('change', (e) => {
            sfx.playClick();
            showToast(e.target.checked ? 'Incognito Citizen Mode: ACTIVE' : 'Incognito Mode: DEACTIVATED', 'shield');
        });
    }

    // Compliance Modals
    const grievanceBtn = document.getElementById('btn-grievance');
    const dpdpBtn = document.getElementById('btn-dpdp');
    const complianceModal = document.getElementById('compliance-modal');
    const complianceTitle = document.getElementById('compliance-title');
    const complianceBody = document.getElementById('compliance-body');
    const closeCompliance = document.getElementById('close-compliance-modal');

    if (grievanceBtn) {
        grievanceBtn.addEventListener('click', () => {
            sfx.playClick();
            complianceTitle.innerText = "IT Rules 2021 Grievance Redressal Desk";
            complianceBody.innerHTML = `
                <p class="text-sm font-semibold text-slate-700 leading-relaxed mb-3">In strict compliance with Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021:</p>
                <ul class="text-xs space-y-2.5 text-slate-600 mb-4 list-disc pl-5 font-medium">
                    <li><strong>Chief Grievance Officer:</strong> Dedicated grievance mechanism for all citizens of Bharat.</li>
                    <li><strong>Statutory Acknowledgment:</strong> Grievance tickets acknowledged within 24 hours.</li>
                    <li><strong>Resolution SLA:</strong> Disciplinary redressal finalized within 15 days under sovereign Indian jurisdiction.</li>
                </ul>
                <button onclick="document.getElementById('close-compliance-modal').click(); window.openLegalModal('grievance');" class="w-full py-2.5 px-3 rounded-xl bg-rashtraOrange text-white font-black text-xs hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5 shadow-md">
                    <span>Lodge Formal Grievance Ticket</span>
                </button>
            `;
            complianceModal.classList.remove('hidden');
        });
    }

    if (dpdpBtn) {
        dpdpBtn.addEventListener('click', () => {
            sfx.playClick();
            complianceTitle.innerText = "Digital Personal Data Protection (DPDP) Act 2023";
            complianceBody.innerHTML = `
                <p class="text-sm font-semibold text-slate-700 leading-relaxed mb-3">RashtraLink operates under the highest standards of Indian Data Sovereignty (DPDP Act 2023):</p>
                <ul class="text-xs space-y-2.5 text-slate-600 mb-4 list-disc pl-5 font-medium">
                    <li><strong>100% On-Soil Residency:</strong> All citizen graphs, weights, and messages stay within Indian national borders. Zero foreign telemetry.</li>
                    <li><strong>Data Principal Rights:</strong> Absolute statutory right to access, rectify, and permanently erase your data and model weights at will.</li>
                    <li><strong>Consent Architecture:</strong> Transparent opt-in, non-deceptive design, and zero foreign ad-trackers.</li>
                </ul>
                <button onclick="document.getElementById('close-compliance-modal').click(); window.openLegalModal('dpdp');" class="w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5 shadow-md">
                    <span>View Full DPDP Statutory Charter</span>
                </button>
            `;
            complianceModal.classList.remove('hidden');
        });
    }

    if (closeCompliance) {
        closeCompliance.addEventListener('click', () => {
            sfx.playClick();
            complianceModal.classList.add('hidden');
        });
    }
}

function applyVernacular(lang) {
    const t = VERNACULAR_TRANSLATIONS[lang] || VERNACULAR_TRANSLATIONS.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) el.innerText = t[key];
    });
}

// --- Stories Viewer Logic ---
const storiesData = {
    'isro': {
        name: 'ISRO Official',
        handle: '@isro_official',
        mediaText: '🚀 Gaganyaan Human Spaceflight: Service Module Propulsion System test successfully completed at Mahendragiri facility. Indigenous cryo-stage performing beyond theoretical maximums.',
        tag: 'Space & Sovereignty'
    },
    'peak': {
        name: 'Peak Bengaluru',
        handle: '@peak_bengaluru',
        mediaText: '🇮🇳 India now hosts 118 unicorns and over 140,000 registered startups. The transition from software services to deep-tech hardware is officially underway in Koramangala & HSR.',
        tag: 'Bharat Founders'
    },
    'bharat': {
        name: 'Bharat Heritage',
        handle: '@bharat_history',
        mediaText: '🏛️ The Iron Pillar of Delhi: 1,600 years without corrosion. Proof that ancient Indian metallurgy led the civilized world centuries before the European industrial revolution.',
        tag: 'Civilizational Heritage'
    },
    'ev': {
        name: 'EV Bharat',
        handle: '@ev_bharat',
        mediaText: '⚡ Indigenous Sodium-Ion battery chemistry patented by Indian scientists achieves 200Wh/kg without cobalt or imported lithium.',
        tag: 'Energy Sovereignty'
    }
};

function initStoriesViewer() {
    const storyItems = document.querySelectorAll('.story-trigger');
    const viewerModal = document.getElementById('story-viewer-modal');
    const closeBtn = document.getElementById('close-story-viewer');
    const titleEl = document.getElementById('story-author-name');
    const handleEl = document.getElementById('story-author-handle');
    const tagEl = document.getElementById('story-tag');
    const textEl = document.getElementById('story-body-text');
    const progressEl = document.getElementById('story-progress-bar');

    storyItems.forEach(item => {
        item.addEventListener('click', () => {
            sfx.playClick();
            const id = item.dataset.storyid;
            const data = storiesData[id];
            if (!data) return;

            titleEl.innerText = data.name;
            handleEl.innerText = data.handle;
            tagEl.innerText = data.tag;
            textEl.innerText = data.mediaText;
            
            viewerModal.classList.remove('hidden');
            progressEl.style.width = '0%';
            setTimeout(() => {
                progressEl.style.width = '100%';
            }, 50);
        });
    });

    if (closeBtn && viewerModal) {
        closeBtn.addEventListener('click', () => {
            sfx.playClick();
            viewerModal.classList.add('hidden');
        });
    }
}

// --- Founding Citizen Wishlist Pass Generator ---
function initWishlistPassGenerator() {
    const handleInput = document.getElementById('pass-handle-input');
    const emailInput = document.getElementById('pass-email-input');
    const roleSelect = document.getElementById('pass-role-select');
    const submitBtn = document.getElementById('generate-pass-btn');
    const passResult = document.getElementById('founding-pass-result');

    if (!submitBtn) return;

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const handle = handleInput ? handleInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const role = roleSelect ? roleSelect.value : 'Citizen Thinker';

        if (!handle || !email) {
            showToast('Please enter both your handle and email', 'alert-circle');
            if (!handle && handleInput) handleInput.focus();
            else if (emailInput) emailInput.focus();
            return;
        }

        sfx.playSuccess();

        // Generate unique member number
        const memberNum = Math.floor(1000 + Math.random() * 9000);
        const passId = `BHARAT-2026-${memberNum}`;

        // Populate Pass details
        document.getElementById('result-pass-id').innerText = `#${passId}`;
        document.getElementById('result-pass-handle').innerText = handle.startsWith('@') ? handle : `@${handle}`;
        document.getElementById('result-pass-role').innerText = role;
        document.getElementById('result-pass-date').innerText = new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });

        passResult.classList.remove('hidden');
        passResult.scrollIntoView({ behavior: 'smooth', block: 'center' });

        showToast(`Congratulations! Founding Pass #${passId} reserved!`, 'award');
    });

    // Share & Copy Pass Buttons
    const copyPassBtn = document.getElementById('copy-pass-link-btn');
    if (copyPassBtn) {
        copyPassBtn.addEventListener('click', () => {
            sfx.playSuccess();
            showToast('Founding Citizen Pass link copied to clipboard!', 'clipboard');
        });
    }

    const sharePassBtn = document.getElementById('share-pass-x-btn');
    if (sharePassBtn) {
        sharePassBtn.addEventListener('click', () => {
            sfx.playClick();
            const handle = document.getElementById('result-pass-handle').innerText;
            const text = encodeURIComponent(`I just reserved my Founding Citizen Pass on @RashtraLink (${handle}) — India's Sovereign AI Social Network by Rashtra Group. Join the waitlist: https://rashtralink.netlify.app/ #ViksitBharat #RashtraLink`);
            window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
        });
    }

    // --- UNIVERSAL LEGAL & CONTACT MODALS ---
    window.closeLegalModal = function() {
        if (window.sfx && sfx.playClick) sfx.playClick();
        const modal = document.getElementById('universal-site-modal');
        if (modal) modal.classList.add('hidden');
    };

    window.openLegalModal = function(type) {
        if (window.sfx) sfx.playClick();
        const modal = document.getElementById('universal-site-modal');
        const title = document.getElementById('universal-modal-title');
        const content = document.getElementById('universal-modal-content');
        if (!modal || !title || !content) return;

        if (type === 'dpdp') {
            title.innerHTML = `<div class="flex items-center gap-2"><i data-lucide="shield-check" class="w-5 h-5 text-emerald-600"></i><span>DPDP Act 2023 Compliance Charter</span></div>`;
            content.innerHTML = `
                <div class="space-y-4 text-slate-700">
                    <div class="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-3">
                        <i data-lucide="award" class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"></i>
                        <div>
                            <h4 class="text-xs font-black text-emerald-950">Statutory Compliance Under Indian Law</h4>
                            <p class="text-[11px] text-emerald-800 font-medium">Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023) enacted by the Parliament of India.</p>
                        </div>
                    </div>

                    <div class="space-y-3 text-xs leading-relaxed">
                        <div class="p-3 rounded-xl border border-slate-200">
                            <h5 class="font-bold text-rashtraBlue mb-1 flex items-center gap-1.5"><i data-lucide="database" class="w-3.5 h-3.5 text-rashtraOrange"></i> 1. 100% On-Soil Sovereign Data Residency (Section 16)</h5>
                            <p class="text-slate-600">Every byte of user personal data, social connection graphs, algorithm lever preferences, and Charcha arguments is hosted on sovereign cloud servers physically situated within Indian territory. Zero foreign cross-border telemetry or clandestine metadata exports.</p>
                        </div>

                        <div class="p-3 rounded-xl border border-slate-200">
                            <h5 class="font-bold text-rashtraBlue mb-1 flex items-center gap-1.5"><i data-lucide="user-check" class="w-3.5 h-3.5 text-emerald-600"></i> 2. Complete Data Principal Rights (Sections 11, 12, 13)</h5>
                            <p class="text-slate-600">You retain the absolute statutory right to access a summary of your data, correct inaccurate personal information, revoke consent at any instant, and execute complete, immutable account erasure.</p>
                        </div>

                        <div class="p-3 rounded-xl border border-slate-200">
                            <h5 class="font-bold text-rashtraBlue mb-1 flex items-center gap-1.5"><i data-lucide="eye-off" class="w-3.5 h-3.5 text-blue-600"></i> 3. Non-Deceptive Consent Architecture (Section 6)</h5>
                            <p class="text-slate-600">RashtraLink rejects deceptive 'dark patterns'. No pre-ticked checkboxes, no hidden trackers, and no monetization through algorithmic surveillance advertising.</p>
                        </div>

                        <div class="p-3 rounded-xl border border-slate-200">
                            <h5 class="font-bold text-rashtraBlue mb-1 flex items-center gap-1.5"><i data-lucide="shield-check" class="w-3.5 h-3.5 text-rashtraOrange"></i> 4. Data Protection Officer (DPO)</h5>
                            <p class="text-slate-600">Office of the Data Protection Officer, RashtraLink Group. Dedicated statutory assistance is accessible via our official Contact Desk.</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'grievance') {
            title.innerHTML = `<div class="flex items-center gap-2"><i data-lucide="scale" class="w-5 h-5 text-rashtraOrange"></i><span>IT Rules 2021 Grievance Redressal Desk</span></div>`;
            content.innerHTML = `
                <div class="space-y-4 text-slate-700">
                    <div class="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-100">
                        <p class="text-xs font-bold text-slate-800 mb-1">Rule 3(2) Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</p>
                        <p class="text-[11px] text-slate-600">Our dedicated grievance redressal mechanism operates to protect citizen rights and ensure accountability across all discussions.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                            <p class="font-black text-slate-800 text-[11px] uppercase tracking-wider text-rashtraOrange">Chief Grievance Officer</p>
                            <p class="font-bold text-slate-800 mt-1">Grievance Redressal Officer, RashtraLink</p>
                            <p class="text-slate-500 text-[11px] mt-0.5">Sovereign Jurisdiction: Republic of India</p>
                        </div>
                        <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/50">
                            <p class="font-black text-slate-800 text-[11px] uppercase tracking-wider text-emerald-700">Resolution SLA</p>
                            <p class="font-bold text-slate-800 mt-1">24-Hour Acknowledgment</p>
                            <p class="text-slate-500 text-[11px] mt-0.5">Final Disciplinary Redressal within 15 Days</p>
                        </div>
                    </div>

                    <!-- Direct Grievance Ticket Submission -->
                    <form id="grievance-quick-form" class="space-y-3 pt-2 border-t border-slate-200">
                        <h5 class="text-xs font-black text-slate-800">File a Formal Redressal Ticket:</h5>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <input type="text" id="grievance-name" required placeholder="Your Legal Name" class="p-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-rashtraOrange">
                            <input type="email" id="grievance-email" required placeholder="Official Email (for ticket receipt)" class="p-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-rashtraOrange">
                        </div>
                        <select id="grievance-category" class="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-rashtraOrange text-slate-700 bg-white">
                            <option value="content">Content Grievance / Misinformation in Charcha</option>
                            <option value="data">Data Correction / DPDP Erasure Request</option>
                            <option value="impersonation">Identity Infringement / Handle Dispute</option>
                            <option value="security">Security Vulnerability / Bug Disclosure</option>
                        </select>
                        <textarea id="grievance-desc" rows="2" required placeholder="Explain your grievance with specific URLs or details..." class="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-rashtraOrange resize-none"></textarea>
                        <button type="submit" class="w-full py-2.5 rounded-xl bg-slate-900 text-white font-black text-xs hover:bg-black transition-all flex items-center justify-center gap-2">
                            <i data-lucide="send" class="w-3.5 h-3.5"></i>
                            <span>Submit Statutory Grievance Ticket</span>
                        </button>
                    </form>
                </div>
            `;
            setTimeout(() => {
                const gForm = document.getElementById('grievance-quick-form');
                if (gForm) {
                    gForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const submitBtn = gForm.querySelector('button[type="submit"]');
                        if (submitBtn) {
                            submitBtn.disabled = true;
                            submitBtn.innerHTML = `<span class="animate-spin mr-2">⏳</span> Submitting Statutory Ticket...`;
                        }

                        const name = document.getElementById('grievance-name')?.value || '';
                        const email = document.getElementById('grievance-email')?.value || '';
                        const categorySelect = document.getElementById('grievance-category');
                        const categoryText = categorySelect ? categorySelect.options[categorySelect.selectedIndex]?.text : 'General';
                        const details = document.getElementById('grievance-desc')?.value || '';
                        const ticketId = `GRV-2026-${Math.floor(100000 + Math.random() * 900000)}`;
                        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

                        const ticketPayload = {
                            type: 'grievance',
                            ticketId: ticketId,
                            timestamp: timestamp,
                            name: name,
                            email: email,
                            category: categoryText,
                            details: details
                        };

                        // 1. Submit to /api/grievance endpoint
                        fetch('/api/grievance', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(ticketPayload)
                        }).catch(err => {
                            console.warn('Grievance API fallback dispatch:', err);
                            // Fallback directly to Google Sheet webhook
                            fetch('https://script.google.com/macros/s/AKfycbxOxh07es6Tk5iNRK4bWl6IYwaKSHBfA5h8Up_iFMtUjYfIPT-Omrtgi3UnqWQvbM6CuQ/exec', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(ticketPayload),
                                mode: 'no-cors'
                            }).catch(e => console.error('Fallback grievance error:', e));
                        });

                        if (window.sfx) sfx.playSuccess();

                        // Render rich statutory acknowledgment view in modal
                        content.innerHTML = `
                            <div class="text-center py-6 space-y-4">
                                <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                                    <i data-lucide="shield-check" class="w-7 h-7"></i>
                                </div>
                                <h4 class="text-base font-black text-slate-900">Statutory Grievance Lodged Successfully</h4>
                                <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs font-medium">
                                    <div class="flex justify-between border-b border-slate-200/60 pb-1.5">
                                        <span class="text-slate-500">Statutory Ticket ID:</span>
                                        <span class="font-mono font-black text-rashtraOrange">${ticketId}</span>
                                    </div>
                                    <div class="flex justify-between border-b border-slate-200/60 pb-1.5">
                                        <span class="text-slate-500">Timestamp (IST):</span>
                                        <span class="font-bold text-slate-800">${timestamp}</span>
                                    </div>
                                    <div class="flex justify-between border-b border-slate-200/60 pb-1.5">
                                        <span class="text-slate-500">Complainant:</span>
                                        <span class="font-bold text-slate-800">${name} (${email})</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-slate-500">Compliance SLA:</span>
                                        <span class="font-bold text-emerald-700">24-Hr Acknowledgment • 15-Day Disciplinary Action</span>
                                    </div>
                                </div>
                                <p class="text-[11px] text-slate-500 leading-relaxed max-w-md mx-auto">
                                    Your grievance has been transmitted directly to the Chief Grievance Officer pursuant to Rule 3(2) of the Information Technology (Intermediary Guidelines) Rules, 2021.
                                </p>
                                <button onclick="window.closeLegalModal()" class="px-6 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-black transition-all">
                                    Close Window
                                </button>
                            </div>
                        `;
                        if (window.lucide && lucide.createIcons) lucide.createIcons();
                        if (typeof showToast === 'function') {
                            showToast(`Grievance Ticket #${ticketId} submitted`, 'shield-check');
                        }
                    });
                }
            }, 50);
        } else if (type === 'contact') {
            title.innerHTML = `<div class="flex items-center gap-2"><i data-lucide="mail" class="w-5 h-5 text-rashtraBlue"></i><span>Contact RashtraLink</span></div>`;
            content.innerHTML = `
                <div class="space-y-4 text-slate-700 text-xs">
                    <div class="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                        <h4 class="font-black text-rashtraBlue text-sm mb-1">Get in Touch with the Founding Team</h4>
                        <p class="text-slate-600 leading-relaxed">Whether you are an academic researcher, creator, founder, or citizen of Bharat — we welcome your thoughts, research, and partnerships.</p>
                    </div>

                    <div class="space-y-2">
                        <div class="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                            <div>
                                <p class="font-bold text-slate-800 text-[11px]">Official Email</p>
                                <p class="text-rashtraOrange font-mono font-black text-xs">rashtralink.in@gmail.com</p>
                            </div>
                            <a href="mailto:rashtralink.in@gmail.com" class="px-3 py-1.5 rounded-lg bg-rashtraBlue text-white text-[10px] font-black hover:scale-105 active:scale-95 transition-all">Send Email</a>
                        </div>

                        <div class="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                            <div>
                                <p class="font-bold text-slate-800 text-[11px]">Headquarters & Engineering Hub</p>
                                <p class="text-slate-600 font-bold text-xs">Kolkata, West Bengal, India</p>
                            </div>
                            <span class="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold text-slate-600">Bharat</span>
                        </div>

                        <div class="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                            <div>
                                <p class="font-bold text-slate-800 text-[11px]">Founding Community</p>
                                <p class="text-slate-600 font-bold text-xs">Private Sovereign WhatsApp Community</p>
                            </div>
                            <button onclick="document.getElementById('close-universal-modal').click(); window.switchPage('early-access');" class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[10px] font-black hover:scale-105 active:scale-95 transition-all">Apply to Join</button>
                        </div>
                    </div>
                </div>
            `;
        }

        modal.classList.remove('hidden');
        lucide.createIcons();
    };

    // Universal Modal Close
    const closeUnivModal = document.getElementById('close-universal-modal');
    const univModal = document.getElementById('universal-site-modal');
    if (closeUnivModal && univModal) {
        closeUnivModal.addEventListener('click', () => {
            if (window.sfx) sfx.playClick();
            univModal.classList.add('hidden');
        });
        univModal.addEventListener('click', (e) => {
            if (e.target === univModal) {
                univModal.classList.add('hidden');
            }
        });
    }

    // --- PAGE NAVIGATION: MAIN SITE <-> EARLY ACCESS / WISHLIST PAGE ---
    window.switchPage = function(pageName) {
        if (window.sfx) sfx.playClick();
        const mainSite = document.getElementById('view-main-site');
        const earlyAccessSite = document.getElementById('view-early-access');
        if (!mainSite || !earlyAccessSite) return;

        if (pageName === 'early-access') {
            mainSite.classList.add('hidden');
            earlyAccessSite.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.pushState({ page: 'early-access' }, '', '#early-access');
            if (window.gsap) {
                gsap.from('#early-access-card', { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' });
            }
        } else {
            earlyAccessSite.classList.add('hidden');
            mainSite.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.pushState({ page: 'home' }, '', '#');
        }
        lucide.createIcons();
    };

    // Check URL Hash on Load
    if (window.location.hash === '#early-access' || window.location.hash === '#wishlist' || window.location.hash === '#community') {
        window.switchPage('early-access');
    }

    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page === 'early-access') {
            window.switchPage('early-access');
        } else {
            window.switchPage('home');
        }
    });

    // --- EARLY ACCESS / WISHLIST COMMUNITY FORM SUBMISSION ---
    const eaForm = document.getElementById('early-access-application-form');
    if (eaForm) {
        eaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (window.sfx) sfx.playSuccess();

            const name = document.getElementById('ea-name-input').value.trim();
            const phone = document.getElementById('ea-phone-input').value.trim();
            const email = document.getElementById('ea-email-input').value.trim();
            const city = document.getElementById('ea-city-input').value.trim() || 'Kolkata, West Bengal';
            const role = document.getElementById('ea-role-input').value;
            const note = document.getElementById('ea-note-input').value.trim();

            const randomCode = Math.floor(1000 + Math.random() * 9000);
            const candidateId = `RL-KOL-2026-${randomCode}`;
            const timeString = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

            // Clean and format phone number for sheets
            const cleanPhone = phone.replace(/[^0-9]/g, '');
            const displayPhone = cleanPhone ? `'+91 ${cleanPhone}` : '';

            const applicationRecord = {
                id: candidateId,
                timestamp: timeString,
                name: name,
                phone: displayPhone,
                email: email,
                city: city,
                role: role,
                note: note
            };

            // Submit to serverless API, with direct browser webhook fallback if offline or serverless error
            fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(applicationRecord)
            }).then(res => {
                if (!res.ok) throw new Error('API status: ' + res.status);
            }).catch(err => {
                console.warn('Falling back to direct Google Sheet sync:', err);
                fetch('https://script.google.com/macros/s/AKfycbxOxh07es6Tk5iNRK4bWl6IYwaKSHBfA5h8Up_iFMtUjYfIPT-Omrtgi3UnqWQvbM6CuQ/exec', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(applicationRecord),
                    mode: 'no-cors'
                }).catch(e => console.error('Fallback sheet error:', e));
            });

            // Populate Success State
            document.getElementById('ea-form-container').classList.add('hidden');
            const successContainer = document.getElementById('ea-success-container');
            successContainer.classList.remove('hidden');

            document.getElementById('ea-res-id').innerText = candidateId;
            document.getElementById('ea-res-name').innerText = name;
            document.getElementById('ea-res-phone').innerText = `+91 ${phone}`;
            document.getElementById('ea-res-email').innerText = email;
            document.getElementById('ea-res-city').innerText = city;
            document.getElementById('ea-res-role').innerText = role;

            showToast(`Application #${candidateId} Lodged Successfully!`, 'award');
            lucide.createIcons();
        });
    }

    // Reset early access form
    const newAppBtn = document.getElementById('ea-new-app-btn');
    if (newAppBtn) {
        newAppBtn.addEventListener('click', () => {
            document.getElementById('ea-success-container').classList.add('hidden');
            document.getElementById('ea-form-container').classList.remove('hidden');
            if (eaForm) eaForm.reset();
        });
    }

    // Copy Application ID
    const copyEABtn = document.getElementById('ea-copy-id-btn');
    if (copyEABtn) {
        copyEABtn.addEventListener('click', () => {
            const id = document.getElementById('ea-res-id').innerText;
            navigator.clipboard.writeText(id).then(() => {
                if (window.sfx) sfx.playSuccess();
                showToast(`Application Reference ${id} copied!`, 'clipboard');
            });
        });
    }

    // Founder Note Tweet Interactive Buttons
    initFounderTweetButtons();
    initFounderAvatarUploader();
}

function initFounderAvatarUploader() {
    const wrapper = document.getElementById('founder-avatar-wrapper');
    const photoEl = document.getElementById('founder-photo');
    const fallbackEl = document.getElementById('founder-avatar-fallback');

    if (!wrapper || !photoEl) return;

    // Check localStorage
    const saved = localStorage.getItem('founder_custom_photo');
    if (saved) {
        photoEl.src = saved;
        photoEl.style.display = 'block';
        if (fallbackEl) fallbackEl.style.display = 'none';
    }

    // Hidden input for photo selection
    let fileInput = document.getElementById('founder-photo-file-input');
    if (!fileInput) {
        fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = 'founder-photo-file-input';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    const dataUrl = evt.target.result;
                    localStorage.setItem('founder_custom_photo', dataUrl);
                    photoEl.src = dataUrl;
                    photoEl.style.display = 'block';
                    if (fallbackEl) fallbackEl.style.display = 'none';
                    if (window.sfx) sfx.playSuccess();
                    showToast('Founder portrait updated successfully', 'camera');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    wrapper.addEventListener('click', () => {
        fileInput.click();
    });
}

function initFounderTweetButtons() {
    const likeBtn = document.getElementById('founder-like-btn');
    const repostBtn = document.getElementById('founder-repost-btn');
    const bookmarkBtn = document.getElementById('founder-bookmark-btn');

    let liked = false;
    let reposted = false;
    let bookmarked = false;

    let likes = 2841;
    let reposts = 489;
    let bookmarks = 612;

    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            liked = !liked;
            likes += liked ? 1 : -1;
            const countEl = document.getElementById('founder-like-count');
            if (countEl) countEl.innerText = likes.toLocaleString();

            const icon = likeBtn.querySelector('i');
            if (liked) {
                likeBtn.classList.remove('text-slate-500');
                likeBtn.classList.add('text-red-500');
                if (icon) {
                    icon.classList.add('fill-red-500', 'scale-125');
                    setTimeout(() => icon.classList.remove('scale-125'), 200);
                }
                if (window.sfx) sfx.playLike();
                showToast('Liked Founder & CEO\'s Dispatch', 'heart');
            } else {
                likeBtn.classList.add('text-slate-500');
                likeBtn.classList.remove('text-red-500');
                if (icon) icon.classList.remove('fill-red-500');
                if (window.sfx) sfx.playClick();
            }
        });
    }

    if (repostBtn) {
        repostBtn.addEventListener('click', () => {
            reposted = !reposted;
            reposts += reposted ? 1 : -1;
            const countEl = document.getElementById('founder-repost-count');
            if (countEl) countEl.innerText = reposts.toLocaleString();

            const icon = repostBtn.querySelector('i');
            if (reposted) {
                repostBtn.classList.remove('text-slate-500');
                repostBtn.classList.add('text-emerald-600');
                if (icon) {
                    icon.classList.add('rotate-180');
                    setTimeout(() => icon.classList.remove('rotate-180'), 300);
                }
                if (window.sfx) sfx.playSuccess();
                showToast('Reposted to Sovereign Feed', 'repeat-2');
            } else {
                repostBtn.classList.add('text-slate-500');
                repostBtn.classList.remove('text-emerald-600');
                if (window.sfx) sfx.playClick();
            }
        });
    }

    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', () => {
            bookmarked = !bookmarked;
            bookmarks += bookmarked ? 1 : -1;
            const countEl = document.getElementById('founder-bookmark-count');
            if (countEl) countEl.innerText = bookmarks.toLocaleString();

            const icon = bookmarkBtn.querySelector('i');
            if (bookmarked) {
                bookmarkBtn.classList.remove('text-slate-500');
                bookmarkBtn.classList.add('text-rashtraBlue');
                if (icon) icon.classList.add('fill-rashtraBlue');
                if (window.sfx) sfx.playSuccess();
                showToast('Saved to Sovereign Bookmarks', 'bookmark');
            } else {
                bookmarkBtn.classList.add('text-slate-500');
                bookmarkBtn.classList.remove('text-rashtraBlue');
                if (icon) icon.classList.remove('fill-rashtraBlue');
                if (window.sfx) sfx.playClick();
            }
        });
    }
}

// --- BHARAT PLEDGE BELL INTERACTION ---
let pledgeCount = 14289;
let hasPledged = false;

window.ringPledgeBell = function() {
    const display = document.getElementById('pledge-count-display');
    const btnText = document.getElementById('pledge-btn-text');
    const btn = document.getElementById('ring-pledge-btn');

    if (!hasPledged) {
        hasPledged = true;
        pledgeCount += 1;
        if (display) display.innerText = pledgeCount.toLocaleString('en-IN');
        if (btnText) btnText.innerText = 'Pledged! 🇮🇳';
        if (btn) {
            btn.classList.remove('from-orange-500', 'to-amber-600');
            btn.classList.add('from-emerald-600', 'to-teal-700');
        }
        if (window.sfx && sfx.playSuccess) sfx.playSuccess();
        if (typeof showToast === 'function') {
            showToast('Thank you, Founding Citizen! Your pledge is recorded.', 'award');
        }
    } else {
        if (typeof showToast === 'function') {
            showToast('You have already pledged your support for Bharat!', 'check');
        }
        if (window.sfx && sfx.playClick) sfx.playClick();
    }
};


