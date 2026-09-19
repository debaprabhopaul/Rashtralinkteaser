// RashtraLink Knowledge Engine & Sovereign Response Generator
// Provides instantaneous, intelligent, grounded responses for RashtraLink queries
// Used both as primary knowledge provider and resilient backup during upstream API spikes (503/429)

export function getRashtraLinkKnowledgeReply(query) {
  const q = (query || '').toLowerCase().trim();

  if (q.includes('what is') || q.includes('rashtralink') || q.includes('about') || q.includes('kya hai') || q.includes('kya h')) {
    return `**RashtraLink** is India’s Sovereign AI Social Network, founded by visionary technologist **Debaprabho Paul** under the **Rashtra Group**.

Built for 1.4 billion Indians, RashtraLink reclaims digital sovereignty by replacing foreign surveillance capitalism and addictive rage-bait loops with transparency, data privacy, and civil discourse:

* **100% Data Sovereignty**: Full compliance with the Digital Personal Data Protection (DPDP) Act 2023. All Indian citizen data is stored strictly across Tier-4 regional hubs (Bengaluru, Delhi, Mumbai, Kolkata, Chennai, Hyderabad).
* **Transparent Sovereign Feed**: Powered by an open, deterministic 4-stage algorithm prioritizing verifiable accuracy, positive civic value, and healthy community connections over outrage.
* **Charcha Arena**: Evidence-backed civic debate across all 22 official Indian languages, where controversial assertions require verified citations.
* **10K-Zero Creator Economy**: Creators receive 70% direct revenue share at just 10,000 verified engagements with 0% platform penalty.

You can claim your **Founding Citizen Golden Badge** and early access directly on this page!`;
  }

  if (q.includes('founder') || q.includes('who built') || q.includes('who made') || q.includes('ceo') || q.includes('owner') || q.includes('debaprabho') || q.includes('paul')) {
    return `**Debaprabho Paul** is the visionary technologist and founder behind **RashtraLink** and the **Rashtra Group**.

His mission is to give India complete technological independence (*Atmanirbhar Bharat*), ensuring India's national discourse, intellectual property, and citizen data are governed sovereignly within our borders for **Viksit Bharat 2047**.`;
  }

  if (q.includes('algorithm') || q.includes('feed') || q.includes('formula') || q.includes('weights') || q.includes('how it works')) {
    return `The **RashtraLink Sovereign Feed Algorithm** is an open, deterministic ranking matrix designed to replace casino-style engagement loops with constructive value:

1. **Category Weighting (Wc)**: Positive score multipliers for Cultural Heritage, Science & Tech, Educational Discourse, and Verified Civic News over low-effort sensationalism.
2. **Recency Decay (λ)**: Fresh, informative content reaches your feed naturally without needing clickbait velocity.
3. **Network Affinity (Aff)**: Prioritizes verified local communities and authentic human interactions over bot farms.
4. **Factuality & Citation Multiplier (Vf)**: Content verified with credible sources receives a high boost, while flagged unverified claims are downranked.

Try our interactive **Sovereign Algorithm Simulator** on this page to test live category weighting calculations!`;
  }

  if (q.includes('early access') || q.includes('wishlist') || q.includes('join') || q.includes('apply') || q.includes('register') || q.includes('badge') || q.includes('founding citizen')) {
    return `Joining the **RashtraLink Early Access Wishlist** grants exclusive Founding Citizen privileges:

* 🥇 **Golden Founding Citizen Badge** permanently showcased on your profile.
*  **1-Year Verified Checkmark** upon public release.
* 🚀 **Priority Beta Access** to test new sovereign tools and vote on platform governance.

Click the **'Claim Early Access'** button or use the wishlist form on this page to enter your name and phone number to reserve your spot!`;
  }

  if (q.includes('charcha') || q.includes('debate') || q.includes('discussion') || q.includes('arena') || q.includes('forum')) {
    return `**Charcha Arena** is RashtraLink's dedicated civic debate forum designed for intellectual rigor and national unity:

* **Evidence-Based Discussions**: Bold or contentious claims require verifiable source links and citation badges.
* **22 Official Languages**: Real-time cross-linguistic translation enabling seamless civil debate across Hindi, Tamil, Bengali, Telugu, Marathi, and more.
* **Civil Moderation**: AI moderation prevents abusive harassment, trolling, and hate speech while vigorously protecting freedom of intellectual discourse.`;
  }

  if (q.includes('creator') || q.includes('monetization') || q.includes('money') || q.includes('earn') || q.includes('10k') || q.includes('zero') || q.includes('revenue')) {
    return `RashtraLink introduces the **10K-Zero Creator Economy**:

* **70% Direct Revenue Share**: Creators retain 70% of advertising and subscriber revenue with no hidden platform penalties.
* **10,000 Verified Engagements**: Monetization unlocks early at 10,000 verified human engagements, bypassing unrealistic multimillion follower barriers.
* **UPI Micro-Tipping**: Audiences can directly tip creators via UPI seamlessly without foreign payment processor cuts.`;
  }

  if (q.includes('data') || q.includes('privacy') || q.includes('dpdp') || q.includes('security') || q.includes('server') || q.includes('hosting')) {
    return `Under the **Digital Personal Data Protection (DPDP) Act 2023**, RashtraLink guarantees:

* **100% Indian Data Residency**: Server infrastructure hosted strictly across sovereign Tier-4 regional hubs in Bengaluru, Delhi, Mumbai, Hyderabad, Kolkata, and Chennai.
* **Zero Foreign Data Harvesting**: No foreign telemetry trackers, ad brokers, or overseas surveillance.
* **Complete User Ownership**: Transparent consent logs with the ability to export or wipe your digital footprint at any time.`;
  }

  if (q.includes('hi') || q.includes('hello') || q.includes('namaste') || q.includes('hey') || q.includes('pranam') || q.includes('greetings')) {
    return `Namaste! 🙏 Welcome to **RashtraLink AI**.

I am your guide to India's Sovereign AI Social Network. Ask me anything about our Sovereign Feed Algorithm, Charcha Arena, data residency under the DPDP Act 2023, or how to claim your Founding Citizen early access badge!`;
  }

  return `Namaste! 🙏 I am **RashtraLink AI**.

I am here to help you learn all about RashtraLink:
* 🇮🇳 **Sovereign Vision & Mission**: Building technological independence for 1.4 billion Indians.
* ⚙️ **The Sovereign Algorithm**: Transparent, verifiable 4-stage feed calculation.
* 🏛️ **Charcha Arena**: Evidence-backed civic discourse across 22 official languages.
* 🌟 **Founding Citizen Early Access**: Claiming your golden badge and verified status.
* 👤 **Founder**: Debaprabho Paul & Rashtra Group.

Feel free to ask any specific question or click a topic suggestion!`;
}
