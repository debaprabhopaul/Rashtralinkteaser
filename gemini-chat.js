// RashtraLink Gemini Chatbot Client Engine
// Powered by Google Gemini 3.8 Flash

(function() {
    let chatHistory = [];
    let isWaitingForResponse = false;

    // DOM Elements
    let chatWidget = null;
    let chatTrigger = null;
    let messagesContainer = null;
    let chatInput = null;
    let sendBtn = null;
    let clearBtn = null;
    let closeBtn = null;

    function initChatbot() {
        chatWidget = document.getElementById('rashtralink-ai-widget');
        chatTrigger = document.getElementById('rashtralink-ai-trigger');
        messagesContainer = document.getElementById('ai-chat-messages');
        chatInput = document.getElementById('ai-chat-input');
        sendBtn = document.getElementById('ai-chat-send');
        clearBtn = document.getElementById('ai-chat-clear');
        closeBtn = document.getElementById('ai-chat-close');

        if (!chatWidget || !chatTrigger) return;

        // Toggle Widget
        chatTrigger.addEventListener('click', toggleChat);
        if (closeBtn) closeBtn.addEventListener('click', closeChat);

        if (window.lucide && window.lucide.createIcons) {
            window.lucide.createIcons();
        }

        // Clear Conversation
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (window.sfx && window.sfx.playClick) window.sfx.playClick();
                resetChat();
            });
        }

        // Send message on click or Enter key
        if (sendBtn) {
            sendBtn.addEventListener('click', handleSend);
        }

        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            });
        }

        // Quick prompt chips
        document.addEventListener('click', (e) => {
            const promptChip = e.target.closest('.ai-prompt-chip');
            if (promptChip) {
                const promptText = promptChip.getAttribute('data-prompt') || promptChip.textContent.trim();
                if (promptText) {
                    if (chatInput) chatInput.value = promptText;
                    handleSend();
                }
            }
        });
    }

    function toggleChat() {
        if (!chatWidget) return;
        if (window.sfx && window.sfx.playClick) window.sfx.playClick();

        const isHidden = chatWidget.classList.contains('hidden');
        if (isHidden) {
            openChat();
        } else {
            closeChat();
        }
    }

    function openChat() {
        if (!chatWidget) return;
        chatWidget.classList.remove('hidden');
        chatWidget.classList.add('flex');
        
        if (window.lucide && window.lucide.createIcons) {
            window.lucide.createIcons();
        }

        // Hide trigger notification dot if visible
        const badge = document.getElementById('ai-trigger-unread');
        if (badge) badge.classList.add('hidden');

        setTimeout(() => {
            if (chatInput) chatInput.focus();
            scrollToBottom();
        }, 150);
    }

    function closeChat() {
        if (!chatWidget) return;
        if (window.sfx && window.sfx.playClick) window.sfx.playClick();
        chatWidget.classList.add('hidden');
        chatWidget.classList.remove('flex');
    }

    function resetChat() {
        chatHistory = [];
        if (!messagesContainer) return;
        
        messagesContainer.innerHTML = `
            <div class="flex items-start gap-2.5">
                <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indiaSaffron to-rashtraOrange flex items-center justify-center text-white text-xs font-black shadow-xs flex-shrink-0">
                    RL
                </div>
                <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3.5 shadow-xs text-xs text-slate-800 space-y-2 max-w-[85%]">
                    <p class="font-semibold text-rashtraBlue">Namaste! 🙏 Welcome to RashtraLink.</p>
                    <p>I am your Gemini-powered assistant. Ask me anything about our Sovereign Feed Algorithm, Charcha Arena, data residency under DPDP Act 2023, or how to claim your Founding Citizen early access!</p>
                    
                    <div class="pt-2 border-t border-slate-100">
                        <p class="text-[11px] font-bold text-slate-500 mb-1.5">Quick questions:</p>
                        <div class="flex flex-wrap gap-1.5">
                            <button class="ai-prompt-chip px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-rashtraOrange text-[11px] font-semibold transition-colors text-left" data-prompt="What is RashtraLink?">
                                🇮🇳 What is RashtraLink?
                            </button>
                            <button class="ai-prompt-chip px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors text-left" data-prompt="How does the Sovereign Feed Algorithm work?">
                                ⚙️ Sovereign Feed
                            </button>
                            <button class="ai-prompt-chip px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors text-left" data-prompt="How do I get Early Access as a Founding Citizen?">
                                🌟 Early Access
                            </button>
                            <button class="ai-prompt-chip px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors text-left" data-prompt="Who is the founder of RashtraLink?">
                                👤 Founder Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async function handleSend() {
        if (isWaitingForResponse || !chatInput) return;
        const text = chatInput.value.trim();
        if (!text) return;

        chatInput.value = '';
        if (window.sfx && window.sfx.playClick) window.sfx.playClick();

        // Append User Message
        appendUserMessage(text);
        chatHistory.push({ role: 'user', text: text });

        // Show Typing Indicator
        isWaitingForResponse = true;
        if (sendBtn) sendBtn.disabled = true;
        const typingEl = appendTypingIndicator();
        scrollToBottom();

        try {
            let replyText = null;

            // Attempt to call server or Vercel serverless /api/chat
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: text,
                        history: chatHistory.slice(-6)
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.reply) {
                        replyText = data.reply;
                    }
                }
            } catch (netErr) {
                console.warn('Backend /api/chat endpoint not reachable (common on static GitHub Pages), switching to local knowledge engine.', netErr);
            }

            // If backend is not present (e.g. on GitHub Pages static host), use smart knowledge responder
            if (!replyText) {
                replyText = generateSmartClientReply(text, chatHistory);
            }

            typingEl.remove();
            appendBotMessage(replyText);
            chatHistory.push({ role: 'assistant', text: replyText });

            if (window.sfx && window.sfx.playSuccess) window.sfx.playSuccess();
        } catch (err) {
            console.error('Chat error:', err);
            typingEl.remove();
            const fallbackReply = generateSmartClientReply(text, chatHistory);
            appendBotMessage(fallbackReply);
            chatHistory.push({ role: 'assistant', text: fallbackReply });
        } finally {
            isWaitingForResponse = false;
            if (sendBtn) sendBtn.disabled = false;
            if (chatInput) chatInput.focus();
            scrollToBottom();
        }
    }

    function generateSmartClientReply(query, history) {
        const q = (query || '').toLowerCase().trim();

        if (q.includes('what is') || q.includes('rashtralink') || q.includes('kya hai') || q.includes('about') || q.includes('kya h')) {
            return "**RashtraLink** is India’s sovereign AI-powered social network, founded by **Debaprabho Paul** (Founder & CEO) and **Mainak Pathak** (Co-Founder & CBO) under the **Rashtra Group**.\n\n* **Mission**: Reclaiming digital sovereignty for 1.4 Billion Indians by replacing addictive black-box surveillance algorithms with a transparent, deterministic feed.\n* **Data Sovereignty**: 100% Indian data residency hosted strictly within Tier-4 regional hubs (Bengaluru, Delhi, Mumbai, Kolkata, Hyderabad, Chennai) under DPDP Act 2023.\n* **Charcha Arena**: Civil debates where claims require verified citations across all 22 official Indian languages.\n* **Early Access**: You can claim your Founding Citizen Golden Badge right here on this page!";
        }

        if (q.includes('founder') || q.includes('who made') || q.includes('who built') || q.includes('ceo') || q.includes('cbo') || q.includes('owner') || q.includes('debaprabho') || q.includes('mainak') || q.includes('pathak') || q.includes('paul') || q.includes('team')) {
            return "### 🇮🇳 RashtraLink Founding & Executive Leadership:\n\n1. **Debaprabho Paul — Founder & CEO**\n   * Visionary technologist and founder behind RashtraLink and Rashtra Group.\n   * Spearheading India's technological independence (*Atmanirbhar Bharat*) and deterministic sovereign algorithms for **Viksit Bharat 2047**.\n\n2. **Mainak Pathak — Co-Founder & CBO (Chief Business Officer)**\n   * Driving business architecture, strategic ecosystem partnerships, and creator economy expansion.\n   * Committed to empowering Indian creators, enterprises, and citizens with true economic autonomy and sustainable platform distribution.";
        }

        if (q.includes('algorithm') || q.includes('feed') || q.includes('sovereign') || q.includes('how it works') || q.includes('formula')) {
            return "The **RashtraLink Sovereign Feed Algorithm** is completely transparent and inspectable! It uses a 4-stage deterministic calculation:\n\n1. **Category Weighting (Wc)**: Cultural, Educational, Scientific, and Verified Civic categories get positive multipliers over sensationalism.\n2. **Recency Decay (λ)**: High-quality fresh posts rank higher without relying on rage-bait engagement.\n3. **Network Affinity (Aff)**: Prioritizes genuine connections and community trust over bot farms.\n4. **Factuality & Citation Multiplier (Vf)**: Verified facts and credible sources significantly boost visibility.\n\nYou can test and tweak the interactive weights in the **Sovereign Algorithm Simulator** section on this page!";
        }

        if (q.includes('early access') || q.includes('wishlist') || q.includes('join') || q.includes('apply') || q.includes('register') || q.includes('badge') || q.includes('founding citizen')) {
            return "Joining the **RashtraLink Early Access Wishlist** gives you exclusive Founding Citizen privileges:\n\n* 🥇 **Golden Founding Citizen Badge** permanently displayed on your profile\n*  **1-Year Verified Checkmark** upon public release\n* 🚀 **Priority Beta Access** to early test releases and platform governance voting\n\nClick the **'Claim Early Access'** button or scroll to the wishlist form on this page to enter your name and phone number!";
        }

        if (q.includes('charcha') || q.includes('debate') || q.includes('discussion') || q.includes('forum')) {
            return "**Charcha Arena** is RashtraLink's dedicated civic discourse arena:\n\n* **Evidence-Based Arguments**: Controversial assertions require verifiable sources and citation badges.\n* **22 Official Languages**: Real-time multi-lingual discourse across Hindi, Bengali, Tamil, Telugu, Marathi, and more.\n* **Constructive Civility**: AI moderation filters abusive ad-hominem attacks while preserving free, rigorous intellectual debate.";
        }

        if (q.includes('creator') || q.includes('monetization') || q.includes('money') || q.includes('earn') || q.includes('10k') || q.includes('zero')) {
            return "RashtraLink introduces the **10K-Zero Creator Economy**:\n\n* **70% Direct Revenue Share**: Creators keep 70% of ad and tipping revenues with zero platform penalties.\n* **10,000 Verified Engagements**: Monetization unlocks early at 10K verified real-human engagements, not millions.\n* **Direct Micro-Tipping**: UPI-integrated instantaneous tipping directly from audience to creator without intermediary cuts.";
        }

        if (q.includes('data') || q.includes('privacy') || q.includes('dpdp') || q.includes('security') || q.includes('server')) {
            return "Under the **Digital Personal Data Protection (DPDP) Act 2023**, RashtraLink guarantees:\n\n* **Zero Foreign Data Harvesting**: No foreign telemetry or ad-tracker sharing.\n* **Tier-4 Indian Regional Hubs**: Encrypted storage hosted across sovereign facilities in Bengaluru, Delhi, Mumbai, Kolkata, Chennai, and Hyderabad.\n* **Granular Consent Controls**: You own and can export or delete your digital footprint anytime.";
        }

        if (q.includes('hi') || q.includes('hello') || q.includes('namaste') || q.includes('hey') || q.includes('pranam')) {
            return "Namaste! 🙏 I am **RashtraLink AI**.\n\nWelcome to India's Sovereign AI Social Network. Ask me anything about our Sovereign Feed Algorithm, Charcha Arena, data sovereignty under DPDP Act 2023, or how to claim your Founding Citizen early access!";
        }

        return "Namaste! 🙏 I am **RashtraLink AI**.\n\nI can help you explore:\n* 🇮🇳 **RashtraLink's Sovereign Mission & Vision**\n* ⚙️ **The Transparent Sovereign Feed Algorithm**\n* 🏛️ **Charcha Arena & Multi-lingual civic discourse**\n* 🌟 **Claiming your Founding Citizen Golden Badge**\n* 👤 **Founder Debaprabho Paul & Rashtra Group**\n\nWhat would you like to explore today?";
    }

    function appendUserMessage(text) {
        if (!messagesContainer) return;
        const div = document.createElement('div');
        div.className = 'flex justify-end';
        div.innerHTML = `
            <div class="bg-rashtraBlue text-white rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-xs text-xs max-w-[85%] break-words">
                ${escapeHtml(text)}
            </div>
        `;
        messagesContainer.appendChild(div);
    }

    function appendBotMessage(text) {
        if (!messagesContainer) return;
        const div = document.createElement('div');
        div.className = 'flex items-start gap-2.5';
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indiaSaffron to-rashtraOrange flex items-center justify-center text-white text-xs font-black shadow-xs flex-shrink-0">
                RL
            </div>
            <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3.5 shadow-xs text-xs text-slate-800 space-y-1.5 max-w-[85%] break-words leading-relaxed">
                ${formatBotReply(text)}
            </div>
        `;
        messagesContainer.appendChild(div);
        
        // Re-run lucide icons if any were used
        if (window.lucide && window.lucide.createIcons) {
            window.lucide.createIcons();
        }
    }

    function appendTypingIndicator() {
        const div = document.createElement('div');
        div.id = 'ai-typing-indicator';
        div.className = 'flex items-start gap-2.5';
        div.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-indiaSaffron to-rashtraOrange flex items-center justify-center text-white text-xs font-black shadow-xs flex-shrink-0">
                RL
            </div>
            <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs text-xs text-slate-500 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-rashtraOrange animate-bounce" style="animation-delay: 0ms;"></span>
                <span class="w-2 h-2 rounded-full bg-indiaSaffron animate-bounce" style="animation-delay: 150ms;"></span>
                <span class="w-2 h-2 rounded-full bg-rashtraBlue animate-bounce" style="animation-delay: 300ms;"></span>
                <span class="text-[11px] font-medium text-slate-400 ml-1.5">Gemini is thinking...</span>
            </div>
        `;
        messagesContainer.appendChild(div);
        return div;
    }

    function formatBotReply(text) {
        if (!text) return '';
        // Basic Markdown Parser (bold, bullet points, line breaks)
        let formatted = escapeHtml(text);
        
        // Bold **text**
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-rashtraBlue">$1</strong>');
        
        // Bullet points
        const lines = formatted.split('\n');
        let inList = false;
        let htmlLines = [];

        for (let line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                if (!inList) {
                    htmlLines.push('<ul class="list-disc list-inside space-y-1 my-1 text-slate-700">');
                    inList = true;
                }
                htmlLines.push(`<li>${trimmed.substring(2)}</li>`);
            } else {
                if (inList) {
                    htmlLines.push('</ul>');
                    inList = false;
                }
                if (trimmed) {
                    htmlLines.push(`<p>${trimmed}</p>`);
                }
            }
        }
        if (inList) htmlLines.push('</ul>');

        return htmlLines.join('');
    }

    function escapeHtml(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function scrollToBottom() {
        if (!messagesContainer) return;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Attach to global window
    window.openRashtraLinkAIChat = function(prefillQuery) {
        openChat();
        if (prefillQuery && chatInput) {
            chatInput.value = prefillQuery;
            handleSend();
        }
    };

    // Auto-init once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatbot);
    } else {
        initChatbot();
    }
})();
