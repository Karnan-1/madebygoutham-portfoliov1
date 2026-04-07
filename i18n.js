(function () {
  const SUPPORTED = ['en', 'it', 'fr', 'de', 'es', 'ja'];
  const FALLBACK = 'en';
  const LS_KEY = 'gs_lang';
  const SPEECH_LANGS = {
    en: 'en-US', it: 'it-IT', fr: 'fr-FR',
    de: 'de-DE', es: 'es-ES', ja: 'ja-JP'
  };

  const T = {
    en: {
      'nav.feed': 'Feed',
      'nav.overview': 'Overview',
      'nav.brief': 'Brief',
      'idx.hero.tag': 'Brand & Product Designer',
      'idx.hero.title': 'Work',
      'idx.cta.overview': 'View Overview',
      'idx.cta.brief': 'Start a Brief ✦',
      'ov.hero.tag': 'Overview',
      'ov.hero.title': 'About',
      'ov.intro': 'Brand strategist and product designer based in Italy.',
      'ov.about': 'About',
      'ov.brands': 'Brands worked with',
      'ov.philosophy': 'Design Philosophy',
      'ov.tools': 'Tool Stack',
      'ov.clients': 'Brands & Clients',
      'ov.kind_words': 'Kind Words',
      'ov.testi_title': 'What clients say',
      'ov.jams': 'Favourite Jams',
      'ov.listening': 'Currently listening to',
      'ov.view_work': 'View Work ↗',
      'ov.get_touch': 'Get in Touch',
      'br.hero.tag': 'Client Onboarding · Brand Brief',
      'br.hero.title.1': "Let's decode",
      'br.hero.title.2': 'your brand',
      'br.hero.sub': 'Answer five short sections — speak freely or type. This gives me everything I need to start building your brand strategy. Takes about 5 minutes.',
      'br.hero.cta': 'Start Brief ✦',
      'br.progress': 'Step {n} of 5',
      'br.s1.num': 'Step 01 — Brand Story',
      'br.s1.title.1': 'Tell me about',
      'br.s1.title.2': 'your brand',
      'br.s1.hint': "Start with the story — why it exists, what it does, how it's different. Use the mic to speak your answer, or just type.",
      'br.s1.l.name': 'Brand / Project Name',
      'br.s1.p.name': 'e.g. Adrenaline Dish',
      'br.s1.l.story': 'The Brand Story',
      'br.s1.speak': 'speak or type',
      'br.s1.p.story': "What's the story behind the brand? How did it start?",
      'br.s1.l.diff': 'What makes it different?',
      'br.s1.p.diff': 'What sets you apart from competitors?',
      'br.s1.l.vision': '5-Year Vision',
      'br.s1.p.vision': 'Where do you see this brand in 5 years?',
      'br.s1.voice.note': '🎙 Voice recording works best in Chrome or Edge on desktop. You can always just type!',
      'br.s1.next': 'Values →',
      'br.s2.num': 'Step 02 — Brand Values',
      'br.s2.title.1': 'What does your',
      'br.s2.title.2': 'brand stand for?',
      'br.s2.hint': 'Pick the words that feel true to your brand. Select as many as apply.',
      'br.s2.l.custom': 'Add your own values',
      'br.s2.p.custom': 'e.g. Disruptive, Raw, Joyful…',
      'br.s2.back': '← Back',
      'br.s2.next': 'Ecosystem →',
      'br.s3.num': 'Step 03 — Ecosystem',
      'br.s3.title.1': "Who's in the",
      'br.s3.title.2': 'room with you?',
      'br.s3.hint': "Help me understand your competitive landscape and who you're trying to reach.",
      'br.s3.l.comp': 'Competitors / Brands you admire',
      'br.s3.p.comp': 'e.g. Aesop, Patagonia, Oatly…',
      'br.s3.l.audience': 'Target Audience',
      'br.s3.p.audience': 'Who is your ideal customer?',
      'br.s3.l.email': 'Your Email (so I can follow up)',
      'br.s3.p.email': 'hello@yourbrand.com',
      'br.s3.back': '← Back',
      'br.s3.next': 'Archetype →',
      'br.s4.num': 'Step 04 — Brand Archetype',
      'br.s4.title.1': 'Which character',
      'br.s4.title.2': 'is your brand?',
      'br.s4.hint': 'Every strong brand embodies a personality. Pick the one that resonates most.',
      'br.s4.back': '← Back',
      'br.s4.next': 'Tone →',
      'br.s5.num': 'Step 05 — Tone of Voice',
      'br.s5.title.1': 'How does your',
      'br.s5.title.2': 'brand speak?',
      'br.s5.hint': "Drag each slider to describe your brand's communication style.",
      'br.s5.l.notes': 'Any final notes?',
      'br.s5.p.notes': 'Anything else I should know?',
      'br.s5.back': '← Back',
      'br.s5.submit': 'Submit Brief ✦',
      'br.success.title': 'Brief received.',
      'br.success.sub': "I'll review your brief and reach out within 24 hours to kick off the ideation. Talk soon.",
      'br.success.back': '← Back to Portfolio',
      'tone.0.l': 'Corporate & Professional', 'tone.0.r': 'Personable & Friendly',
      'tone.1.l': 'Careful & Planned', 'tone.1.r': 'Spontaneous & High Energy',
      'tone.2.l': 'Classic & Traditional', 'tone.2.r': 'Modern & High Tech',
      'tone.3.l': 'Serious', 'tone.3.r': 'Playful',
      'tone.4.l': 'Bold', 'tone.4.r': 'Subtle',
      'arch.eg': 'eg.',
      'left.disciplines': 'Disciplines',
      'left.experience': 'Experience',
      'left.recognition': 'Recognition',
      'left.contact': 'Contact',
    },
    it: {
      'nav.feed': 'Lavori',
      'nav.overview': 'Chi Sono',
      'left.disciplines': 'Discipline',
                'left.experience': 'Esperienza',
                'left.recognition': 'Riconoscimenti',
                'left.contact': 'Contatti',
      'nav.brief': 'Brief',
      'idx.hero.tag': 'Brand & Product Designer',
      'idx.hero.title': 'Lavori',
      'idx.cta.overview': 'Vedi Panoramica',
      'idx.cta.brief': 'Inizia un Brief ✦',
      'ov.hero.tag': 'Panoramica',
      'ov.hero.title': 'Chi Sono',
      'ov.intro': 'Brand strategist e product designer con base in Italia.',
      'ov.about': 'Informazioni',
      'ov.brands': 'Brand con cui ho lavorato',
      'ov.philosophy': 'Filosofia del Design',
      'ov.tools': 'Strumenti',
      'ov.clients': 'Brand e Clienti',
      'ov.kind_words': 'Dicono di me',
      'ov.testi_title': 'Cosa dicono i clienti',
      'ov.jams': 'Preferiti',
      'ov.listening': 'In ascolto ora',
      'ov.view_work': 'Vedi Lavori ↗',
      'ov.get_touch': 'Contattami',
      'br.hero.tag': 'Onboarding Cliente · Brand Brief',
      'br.hero.title.1': 'Decodifichiamo',
      'br.hero.title.2': 'il tuo brand',
      'br.hero.sub': 'Rispondi a cinque brevi sezioni — parla liberamente o scrivi. Mi darà tutto il necessario per costruire la tua strategia di brand. Circa 5 minuti.',
      'br.hero.cta': 'Inizia il Brief ✦',
      'br.progress': 'Passaggio {n} di 5',
      'br.s1.num': 'Passaggio 01 — Storia del Brand',
      'br.s1.title.1': 'Parlami del',
      'br.s1.title.2': 'tuo brand',
      'br.s1.hint': 'Inizia dalla storia — perché esiste, cosa fa, cosa lo rende diverso. Usa il microfono o scrivi.',
      'br.s1.l.name': 'Nome del Brand / Progetto',
      'br.s1.p.name': 'es. Adrenaline Dish',
      'br.s1.l.story': 'La Storia del Brand',
      'br.s1.speak': 'parla o scrivi',
      'br.s1.p.story': "Qual è la storia dietro il brand? Com'è iniziato?",
      'br.s1.l.diff': 'Cosa lo rende diverso?',
      'br.s1.p.diff': 'Cosa ti distingue dalla concorrenza?',
      'br.s1.l.vision': 'Visione a 5 Anni',
      'br.s1.p.vision': 'Dove vedi questo brand tra 5 anni?',
      'br.s1.voice.note': '🎙 La registrazione vocale funziona meglio su Chrome o Edge su desktop. Puoi sempre scrivere!',
      'br.s1.next': 'Valori →',
      'br.s2.num': 'Passaggio 02 — Valori del Brand',
      'br.s2.title.1': 'Per cosa si',
      'br.s2.title.2': 'batte il tuo brand?',
      'br.s2.hint': 'Scegli le parole più vicine al tuo brand. Seleziona tutto ciò che si applica.',
      'br.s2.l.custom': 'Aggiungi i tuoi valori',
      'br.s2.p.custom': 'es. Dirompente, Autentico, Gioioso…',
      'br.s2.back': '← Indietro',
      'br.s2.next': 'Ecosistema →',
      'br.s3.num': 'Passaggio 03 — Ecosistema',
      'br.s3.title.1': 'Chi è con te',
      'br.s3.title.2': 'nella stanza?',
      'br.s3.hint': 'Aiutami a capire il tuo panorama competitivo e il tuo pubblico target.',
      'br.s3.l.comp': 'Competitor / Brand che ammiri',
      'br.s3.p.comp': 'es. Aesop, Patagonia, Oatly…',
      'br.s3.l.audience': 'Pubblico Target',
      'br.s3.p.audience': 'Chi è il tuo cliente ideale?',
      'br.s3.l.email': 'La tua Email (per ricontattarti)',
      'br.s3.p.email': 'ciao@tuobrand.com',
      'br.s3.back': '← Indietro',
      'br.s3.next': 'Archetipo →',
      'br.s4.num': 'Passaggio 04 — Archetipo del Brand',
      'br.s4.title.1': 'Quale personaggio',
      'br.s4.title.2': 'è il tuo brand?',
      'br.s4.hint': 'Ogni brand forte incarna una personalità. Scegli quella che risuona di più.',
      'br.s4.back': '← Indietro',
      'br.s4.next': 'Tono →',
      'br.s5.num': 'Passaggio 05 — Tono di Voce',
      'br.s5.title.1': 'Come parla',
      'br.s5.title.2': 'il tuo brand?',
      'br.s5.hint': 'Trascina ogni slider per descrivere lo stile comunicativo del tuo brand.',
      'br.s5.l.notes': 'Note finali?',
      'br.s5.p.notes': "C'è altro che dovrei sapere?",
      'br.s5.back': '← Indietro',
      'br.s5.submit': 'Invia il Brief ✦',
      'br.success.title': 'Brief ricevuto.',
      'br.success.sub': "Analizzerò il tuo brief e ti contatterò entro 24 ore per avviare l'ideazione. A presto.",
      'br.success.back': '← Torna al Portfolio',
      'tone.0.l': 'Formale & Professionale', 'tone.0.r': 'Personable & Amichevole',
      'tone.1.l': 'Attento & Pianificato', 'tone.1.r': 'Spontaneo & Energico',
      'tone.2.l': 'Classico & Tradizionale', 'tone.2.r': 'Moderno & High Tech',
      'tone.3.l': 'Serio', 'tone.3.r': 'Giocoso',
      'tone.4.l': 'Audace', 'tone.4.r': 'Sottile',
      'arch.eg': 'es.',
    },
  };

  function detectLang() {
    const saved = localStorage.getItem(LS_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
    const browser = (navigator.language || 'en').toLowerCase().split('-')[0];
    return SUPPORTED.includes(browser) ? browser : FALLBACK;
  }

  function t(key, lang) {
    const langData = T[lang] || T[FALLBACK];
    return langData[key] !== undefined ? langData[key] : (T[FALLBACK][key] || key);
  }

  function applyLang(lang, silent = false) {
    if (!SUPPORTED.includes(lang)) lang = FALLBACK;
    const root = T[lang] ? lang : FALLBACK;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key, root);
      if (val !== key) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = t(key, root);
      if (val !== key) el.innerHTML = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key, root);
      if (val !== key) el.placeholder = val;
    });

    if (window.location.pathname.includes('overview')) {
      document.title = t('ov.hero.tag', root) + ' — Goutham Shibulal';
    } else if (window.location.pathname.includes('brief')) {
      document.title = 'Brand Brief — Goutham Shibulal';
    }

    const badge = document.getElementById('lang-badge');
    if (badge) badge.textContent = lang.toUpperCase();

    window.__speechLang = SPEECH_LANGS[lang] || 'en-US';
    localStorage.setItem(LS_KEY, lang);
    window.__currentLang = lang;

    const dd = document.getElementById('lang-dd');
    if (dd) dd.style.display = 'none';
    if (!silent) window.dispatchEvent(new CustomEvent('langChanged', { detail: lang }));
  }

  function injectSwitcher() {
    const navR = document.querySelector('#nav');
    const _ob = document.getElementById('lang-btn'); if (_ob) _ob.remove();
    if (!navR || document.getElementById('lang-switcher')) return;

    const current = detectLang();
    const wrapper = document.createElement('div');
    wrapper.id = 'lang-switcher';
    wrapper.style.cssText = 'position:relative;display:inline-flex;align-items:center';

    const btn = document.createElement('button');
    btn.className = 'dm-btn';
    btn.style.cssText = 'font-family:var(--mono);font-size:9px;letter-spacing:.06em;width:34px;font-weight:600;cursor:pointer;margin-left:8px';
    btn.innerHTML = `<span id="lang-badge">${current.toUpperCase()}</span>`;

    const dd = document.createElement('div');
    dd.id = 'lang-dd';
    dd.style.cssText = 'display:none;position:absolute;top:calc(100% + 8px);right:0;background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:5px;min-width:140px;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,.12)';

    const LANGS = [
      { code: 'en', label: '🇬🇧 English' },
      { code: 'it', label: '🇮🇹 Italiano' }
    ];

    LANGS.forEach(l => {
      const item = document.createElement('button');
      item.textContent = l.label;
      item.style.cssText = 'display:block;width:100%;text-align:left;padding:8px 10px;font-family:var(--mono);font-size:10px;background:transparent;border:none;color:var(--fg);cursor:pointer;border-radius:6px';
      item.onclick = (e) => { e.stopPropagation(); applyLang(l.code); };
      dd.appendChild(item);
   });

    btn.onclick = (e) => { e.stopPropagation(); dd.style.display = dd.style.display === 'none' ? 'block' : 'none'; };
    document.addEventListener('click', () => { if (dd) dd.style.display = 'none'; });

    wrapper.appendChild(btn);
    wrapper.appendChild(dd);

    const dmBtn = document.getElementById('dm-btn') || document.getElementById('dm-btn-mob');
    if (dmBtn) {
      dmBtn.parentNode.insertBefore(wrapper, dmBtn);
    } else {
      navR.appendChild(wrapper);
    }
  }

  function init() {
    applyLang(detectLang(), true);
    let tries = 0;
    function tryInject() {
      if (document.getElementById('dm-btn') || document.getElementById('lang-switcher')) {
        injectSwitcher();
        applyLang(detectLang());
      } else if (tries++ < 100) {
                  setTimeout(tryInject, 200);
      }
    }
    tryInject();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.i18n = { setLang: applyLang, getLang: detectLang, t, applyLang };
})();
