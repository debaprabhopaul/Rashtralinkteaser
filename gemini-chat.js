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
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    history: chatHistory.slice(-6)
                })
            });

            const data = await response.json();
            typingEl.remove();

            const replyText = data.reply || data.fallback || "I'm here to assist you with RashtraLink. Please ask another question!";
            appendBotMessage(replyText);
            chatHistory.push({ role: 'assistant', text: replyText });

            if (window.sfx && window.sfx.playSuccess) window.sfx.playSuccess();
        } catch (err) {
            console.error('Chat error:', err);
            typingEl.remove();
            appendBotMessage("Namaste! We had a temporary connection issue. Please feel free to try again.");
        } finally {
            isWaitingForResponse = false;
            if (sendBtn) sendBtn.disabled = false;
            if (chatInput) chatInput.focus();
            scrollToBottom();
        }
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
