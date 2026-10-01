// RashtraLink Knowledge Engine & Sovereign Response Generator
// Provides instantaneous, intelligent, grounded responses for RashtraLink queries
// Used both as primary knowledge provider and resilient backup during upstream API spikes (503/429)

export function getRashtraLinkKnowledgeReply(query) {
  const q = (query || '').toLowerCase().trim();

  if (q.includes('founder') || q.includes('who built') || q.includes('who made') || q.includes('ceo') || q.includes('cbo') || q.includes('owner') || q.includes('debaprabho') || q.includes('mainak') || q.includes('pathak') || q.includes('paul') || q.includes('team') || q.includes('leadership')) {
    return `### 🇮🇳 RashtraLink Founding & Executive Leadership:

1. **Debaprabho Paul — Founder & CEO**
   * Visionary technologist and founder behind RashtraLink and the Rashtra Group.
   * Spearheading India's technological self-reliance (*Atmanirbhar Bharat*) and deterministic algorithms for **Viksit Bharat 2047**.

2. **Mainak Pathak — Co-Founder & CBO (Chief Business Officer)**
   * Executive leader guiding RashtraLink's business development, strategic partnerships, and creator ecosystem growth.
   * Dedicated to establishing true economic sovereignty and sustainable monetization for Indian creators and businesses.`;
  }

  if (q.includes('what is') || q.includes('rashtralink') || q.includes('ralync') || q.includes('about') || q.includes('kya hai') || q.includes('kya h')) {
    return `**RashtraLink**, also widely known as **Ralync**, is India’s Sovereign Social Network, founded by **Debaprabho Paul** (Founder & CEO) alongside **Mainak Pathak** (Co-Founder & CBO) under the **Rashtra Group**.

Built for 1.4 billion Indians, RashtraLink (Ralync) replaces foreign algorithms and addictive rage loops with user control, genuine data privacy, and civilized public discourse:

* **User Controlled Feed**: Powered by transparent sliders where you choose what enters your feed instead of an opaque black box.
* **100% Indian Cloud**: Full compliance with the Digital Personal Data Protection (DPDP) Act. All data is kept strictly inside India and never sold to foreign ad brokers.
* **Charcha Arena**: Evidence-backed discussions where facts and citations matter more than noisy arguments.
* **A Better Creator Economy**: Direct community support and tipping through UPI, ensuring significantly higher payouts and lower, honest platform fees.

You can claim your **Founding Citizen Badge** and join the early access community right here on this site!`;
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
