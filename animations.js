// animations.js
// Handles all motion and interaction layers across the single-page site.

document.addEventListener("DOMContentLoaded", () => {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Inject CSS Styles for animations
  injectStyles();

  if (isReducedMotion) {
    handleReducedMotionFallback();
    return;
  }

  // Initialize all Effects
  initClipRevealAndWordReveal(); // EFFECT 1 & EFFECT 14
  initLetterScramble();         // EFFECT 2
  initGradientWipe();           // EFFECT 3
  initTypewriter();             // EFFECT 4
  initUnderlineSweep();         // EFFECT 5
  // initCharRollup();             // EFFECT 6
  initAboutAnimations();        // Unified About Animations (slot-machine roll, blur reveal, cascade badges, skew entrance, magnetic cards)
  initCurtainWipe();            // EFFECT 8
  initDrawBorderHover();        // EFFECT 9
  initCounterAnimation();       // EFFECT 10
  initAccordionExpand();        // EFFECT 11
  initFadeUpStagger();          // EFFECT 12
  initParallaxMarquee();        // EFFECT 13
});

// Helper to inject all effect CSS declarations
function injectStyles() {
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    /* ===== EFFECT 1: Word by Word Reveal ===== */
    .animate-word {
      display: inline-block;
      opacity: 0;
      transform: translateY(20px);
      animation: wordFadeIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
    }
    @keyframes wordFadeIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* ===== EFFECT 14: Clip Reveal wrapper ===== */
    .clip-reveal {
      clip-path: inset(0 100% 0 0);
      animation: clipRevealAnim 1.0s cubic-bezier(0.76, 0, 0.24, 1) 0.1s forwards;
    }
    @keyframes clipRevealAnim {
      to {
        clip-path: inset(0 0% 0 0);
      }
    }

    /* ===== EFFECT 3: Gradient Wipe ===== */
    .gradient-wipe {
      background: linear-gradient(120deg, var(--foreground), var(--foreground));
      background-size: 200% 100%;
      background-position: 100% 0;
      background-clip: text;
      -webkit-background-clip: text;
      transition: background 0.8s ease-in-out, -webkit-text-fill-color 0.8s ease-in-out;
    }
    .gradient-wipe.wipe-active {
      background: linear-gradient(120deg, #0d0d0c, #555550, #0d0d0c);
      background-size: 200% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-position: 0% 0;
    }
    .dark .gradient-wipe.wipe-active {
      /* Adapt gradient slightly for dark mode visibility while keeping the style transition */
      background: linear-gradient(120deg, #ffffff, #888880, #ffffff);
      background-size: 200% 100%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-position: 0% 0;
    }

    /* ===== EFFECT 4: Typewriter Cursor ===== */
    #typewriter-text {
      border-right: 2px solid currentColor;
      padding-right: 2px;
      animation: cursorBlink 1s step-end infinite;
    }
    @keyframes cursorBlink {
      from, to { border-color: transparent }
      50% { border-color: currentColor }
    }

    /* ===== EFFECT 5: Underline Sweep ===== */
    .underline-sweep-target {
      position: relative;
      display: inline-block;
    }
    .underline-sweep-target::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -4px;
      width: 100%;
      height: 1px;
      background-color: var(--border);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.9s ease-out;
    }
    .underline-sweep-target.sweep-active::after {
      transform: scaleX(1);
    }

    /* ===== EFFECT 6: Odometer Rollup ===== */
    .stat-roll-container {
      display: inline-flex;
      overflow: hidden;
      height: 1.2em;
      line-height: 1.2em;
      vertical-align: bottom;
    }
    .stat-roll-col {
      display: flex;
      flex-direction: column;
      transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .stat-roll-char {
      height: 1.2em;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ===== EFFECT 7: Blur to Focus ===== */
    .blur-focus-p {
      filter: blur(6px);
      opacity: 0;
      transition: filter 0.75s ease-out, opacity 0.75s ease-out;
    }
    .blur-focus-p.focus-active {
      filter: blur(0px);
      opacity: 1;
    }

    /* ===== EFFECT 8: Curtain Wipe ===== */
    .curtain-card {
      position: relative;
      overflow: hidden;
    }
    .curtain-overlay {
      position: absolute;
      inset: 0;
      background-color: color-mix(in oklab, var(--background) 95%, var(--primary));
      z-index: 20;
      transform: scaleY(1);
      transform-origin: bottom;
      transition: transform 0.7s cubic-bezier(0.76, 0, 0.24, 1);
      pointer-events: none;
    }
    .curtain-card.wipe-active .curtain-overlay {
      transform: scaleY(0);
    }

    /* ===== EFFECT 9: Clockwise Border Draw ===== */
    .draw-border-card {
      position: relative;
    }
    .draw-border-line {
      position: absolute;
      background-color: var(--primary);
      transition: all 0.5s ease-in-out;
    }
    .draw-border-top {
      top: 0; left: 0; width: 0; height: 1px;
    }
    .draw-border-right {
      top: 0; right: 0; width: 1px; height: 0;
      transition-delay: 0.125s;
    }
    .draw-border-bottom {
      bottom: 0; right: 0; width: 0; height: 1px;
      transition-delay: 0.25s;
    }
    .draw-border-left {
      bottom: 0; left: 0; width: 1px; height: 0;
      transition-delay: 0.375s;
    }

    /* Hover Clockwise Border Draw */
    .draw-border-card:hover .draw-border-top { width: 100%; }
    .draw-border-card:hover .draw-border-right { height: 100%; }
    .draw-border-card:hover .draw-border-bottom { width: 100%; }
    .draw-border-card:hover .draw-border-left { height: 100%; }

    /* Retract Counter-Clockwise Border */
    .draw-border-card .draw-border-top { transition-delay: 0.3s; }
    .draw-border-card .draw-border-right { transition-delay: 0.2s; }
    .draw-border-card .draw-border-bottom { transition-delay: 0.1s; }
    .draw-border-card .draw-border-left { transition-delay: 0s; }

    .draw-border-card:hover .draw-border-top { transition-delay: 0s; }
    .draw-border-card:hover .draw-border-right { transition-delay: 0.125s; }
    .draw-border-card:hover .draw-border-bottom { transition-delay: 0.25s; }
    .draw-border-card:hover .draw-border-left { transition-delay: 0.375s; }

    /* ===== EFFECT 11: FAQ Accordion heights ===== */
    .faq-answer {
      display: grid !important;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      padding-bottom: 0 !important;
    }
    .faq-answer:not(.hidden) {
      grid-template-rows: 1fr;
    }
    .faq-answer-inner {
      overflow: hidden;
      min-height: 0;
    }
    .faq-minus {
      display: none !important;
    }
    .faq-plus {
      display: inline-block !important;
      transform: rotate(0deg);
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    .faq-item:has(.faq-answer:not(.hidden)) .faq-plus {
      transform: rotate(45deg);
    }

    /* ===== EFFECT 12: Staggered Fade Up ===== */
    .fade-up-item {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-up-item.fade-up-active {
      opacity: 1;
      transform: translateY(0);
    }

    /* ===== EFFECT 13: Double Marquee Speed Control ===== */
    .marquee-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .marquee-row {
      display: flex;
      gap: 2.5rem;
      white-space: nowrap;
    }
    .marquee-left {
      animation: marqueeLeft 30s linear infinite;
    }
    .marquee-right {
      animation: marqueeRight 42s linear infinite;
    }
    @keyframes marqueeLeft {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    @keyframes marqueeRight {
      from { transform: translateX(-50%); }
      to { transform: translateX(0); }
    }
    .marquee-container:hover .marquee-left {
      animation-duration: 150s; /* 30s / 0.2 */
    }
    .marquee-container:hover .marquee-right {
      animation-duration: 210s; /* 42s / 0.2 */
    }

    /* ===== ABOUT SECTION UPGRADES ===== */
    .about-bio-p {
      filter: blur(8px);
      opacity: 0;
      transform: translateY(12px);
      transition: filter 0.8s ease-out, opacity 0.8s ease-out, transform 0.8s ease-out;
      will-change: filter, opacity, transform;
    }
    .about-bio-p.reveal-active {
      filter: blur(0px);
      opacity: 1;
      transform: translateY(0);
    }

    .about-badge-item {
      opacity: 0;
      transform: scale(0.85);
      transition: opacity 0.4s ease-out, transform 0.4s ease-out;
      will-change: opacity, transform;
    }
    .about-badge-item.reveal-active {
      opacity: 1;
      transform: scale(1);
    }

    #about-portrait {
      opacity: 0;
      transform: translateX(-20px) skewX(-4deg);
      transition: opacity 0.9s cubic-bezier(0.76, 0, 0.24, 1), transform 0.9s cubic-bezier(0.76, 0, 0.24, 1);
      will-change: opacity, transform;
    }
    #about-portrait.reveal-active {
      opacity: 1;
      transform: translateX(0) skewX(0deg);
    }

    #about-portrait .profile-image-el {
      filter: grayscale(100%) brightness(0.85);
      transition: filter 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    }    #about-portrait-wrapper:hover .profile-image-el,
    #about-portrait-wrapper:active .profile-image-el,
    #about-portrait-wrapper.touch-active .profile-image-el {
      filter: grayscale(0%) brightness(1.0);
    }

    #about-tagline-container {
      opacity: 0;
      transform: translateY(15px);
      transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
    }
    #about-tagline-container.reveal-active {
      opacity: 1;
      transform: translateY(0);
    }

    #about-portrait-wrapper:hover #about-tagline,
    #about-portrait-wrapper:active #about-tagline,
    #about-portrait-wrapper.touch-active #about-tagline {
      color: var(--primary);
    }
    #about-portrait-wrapper:hover #about-subtagline,
    #about-portrait-wrapper:active #about-subtagline,
    #about-portrait-wrapper.touch-active #about-subtagline {
      letter-spacing: 0.15em;
    }

    @keyframes portraitGlowBreath {
      0%, 100% {
        box-shadow: 0 0 0 0px color-mix(in oklab, var(--border) 30%, transparent);
      }
      50% {
        box-shadow: 0 0 0 12px color-mix(in oklab, var(--border) 30%, transparent);
      }
    }
    .portrait-pulse-active {
      animation: portraitGlowBreath 4.0s ease-in-out infinite;
    }

    .char-roll-container {
      display: inline-flex;
      overflow: hidden;
      height: 1.2em;
      line-height: 1.2em;
      vertical-align: bottom;
    }
    .char-roll-col {
      display: flex;
      flex-direction: column;
      transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .char-roll-char {
      height: 1.2em;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ===== PREFERS-REDUCED-MOTION FALLBACK ===== */
    @media (prefers-reduced-motion: reduce) {
      *, ::before, ::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0s !important;
        scroll-behavior: auto !important;
      }
      .animate-word {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      .clip-reveal {
        clip-path: none !important;
      }
      .gradient-wipe.wipe-active {
        background: none !important;
        color: inherit !important;
        -webkit-text-fill-color: initial !important;
      }
      .underline-sweep-target::after {
        transform: none !important;
        opacity: 0 !important;
      }
      .blur-focus-p, .about-bio-p {
        filter: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
      .about-badge-item {
        opacity: 1 !important;
        transform: none !important;
      }
      #about-portrait {
        opacity: 1 !important;
        transform: none !important;
        box-shadow: none !important;
      }
      .curtain-overlay {
        display: none !important;
      }
      .draw-border-line {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(styleEl);
}

// Fallback logic for systems with reduced motion
function handleReducedMotionFallback() {
  // Directly reveal stats numbers
  const stats = document.querySelectorAll("#hero dl dt");
  stats.forEach(stat => {
    stat.style.transform = "none";
  });

  // Reveal About section elements immediately
  const section = document.querySelector("#about");
  if (section) {
    const nameTargets = section.querySelectorAll(".char-rollup-target");
    nameTargets.forEach(t => t.style.transform = "none");
    const paragraphs = section.querySelectorAll(".space-y-6 > p");
    paragraphs.forEach(p => {
      p.style.filter = "none";
      p.style.opacity = "1";
      p.style.transform = "none";
    });
    const badges = section.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span");
    badges.forEach(b => {
      b.style.opacity = "1";
      b.style.transform = "none";
    });
    const portrait = document.getElementById("about-portrait");
    if (portrait) {
      portrait.style.opacity = "1";
      portrait.style.transform = "none";
    }
    const tagline = document.getElementById("about-tagline-container");
    if (tagline) {
      tagline.style.opacity = "1";
      tagline.style.transform = "none";
    }
  }
}

// EFFECT 1 & 14: Clip Reveal and Word by Word
function initClipRevealAndWordReveal() {
  const heroTitle = document.querySelector("#hero h1");
  if (!heroTitle) return;

  // Add the Clip Reveal mask class
  heroTitle.classList.add("clip-reveal");

  // Re-wrap words inside the title to apply stagger transition delays
  let wordIndex = 0;
  const staggerDelay = 0.06;

  function wrapTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue;
      const words = text.split(/(\s+)/); // Preserve whitespace
      const frag = document.createDocumentFragment();

      words.forEach(word => {
        if (word.trim().length > 0) {
          const span = document.createElement("span");
          span.className = "animate-word";
          span.textContent = word;
          span.style.animationDelay = `${wordIndex * staggerDelay}s`;
          frag.appendChild(span);
          wordIndex++;
        } else {
          frag.appendChild(document.createTextNode(word));
        }
      });
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "SVG") {
      Array.from(node.childNodes).forEach(wrapTextNodes);
    }
  }

  Array.from(heroTitle.childNodes).forEach(wrapTextNodes);
}

// EFFECT 2: Letter Scramble
function initLetterScramble() {
  const logo = document.querySelector('header a[href="#hero"]');
  if (!logo) return;

  const dotSpan = logo.querySelector('.bg-primary');
  const savvySpan = logo.querySelector('.text-primary');
  if (!savvySpan || !dotSpan) return;

  const text1 = "Nocode";
  const text2 = "Savvy";
  let isAnimating = false;

  logo.addEventListener("mouseenter", () => {
    if (isAnimating) return;
    isAnimating = true;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const startTime = performance.now();
    const duration = 600; // 600ms total Scramble duration
    const stagger = 30; // 30ms resolution stagger per character

    function animate(now) {
      const elapsed = now - startTime;

      // Text 1: Nocode
      let currentText1 = "";
      for (let i = 0; i < text1.length; i++) {
        const charResolveTime = i * stagger;
        if (elapsed >= duration || elapsed >= charResolveTime + (duration - text1.length * stagger)) {
          currentText1 += text1[i];
        } else {
          currentText1 += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      // Text 2: Savvy
      let currentText2 = "";
      for (let i = 0; i < text2.length; i++) {
        const charResolveTime = (text1.length + i) * stagger;
        if (elapsed >= duration || elapsed >= charResolveTime + (duration - (text1.length + text2.length) * stagger)) {
          currentText2 += text2[i];
        } else {
          currentText2 += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      let textNode = dotSpan.nextSibling;
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        textNode.nodeValue = currentText1;
      }
      savvySpan.textContent = currentText2;

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
          textNode.nodeValue = text1;
        }
        savvySpan.textContent = text2;
        isAnimating = false;
      }
    }

    requestAnimationFrame(animate);
  });
}

// EFFECT 3: Gradient Text Wipe (1-3 words section headings)
function initGradientWipe() {
  const headings = document.querySelectorAll("h1, h2, h3");
  const targets = [];

  headings.forEach(heading => {
    const textContent = heading.textContent.trim();
    const words = textContent.split(/\s+/);
    // Identify 1-3 word headings or emphasis titles
    if (words.length <= 3) {
      heading.classList.add("gradient-wipe");
      heading.setAttribute("data-text", textContent);
      targets.push(heading);
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("wipe-active");
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, { threshold: 0.5 });

  targets.forEach(t => observer.observe(t));
}

// EFFECT 4: Typewriter Loop sub-heading
function initTypewriter() {
  const target = document.getElementById("typewriter-text");
  if (!target) return;

  const strings = [
    "SaaS platforms that scale.",
    "Bubble apps that don't break.",
    "AI integrations that actually work.",
    "Payment systems wired right.",
    "MVPs shipped in 3 weeks.",
    "The thing your business actually needs."
  ];

  let currentStringIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  // Trigger after Hero anim completes
  setTimeout(() => {
    runTypewriter();
  }, 1400);

  function runTypewriter() {
    const currentString = strings[currentStringIndex];

    if (isDeleting) {
      target.textContent = currentString.substring(0, currentCharIndex - 1);
      currentCharIndex--;

      if (currentCharIndex === 0) {
        isDeleting = false;
        currentStringIndex = (currentStringIndex + 1) % strings.length;
        setTimeout(runTypewriter, 550); // Pause before next typing
      } else {
        setTimeout(runTypewriter, 30); // Deleting duration
      }
    } else {
      target.textContent = currentString.substring(0, currentCharIndex + 1);
      currentCharIndex++;

      if (currentCharIndex === currentString.length) {
        isDeleting = true;
        setTimeout(runTypewriter, 1600); // 1.6s pause
      } else {
        setTimeout(runTypewriter, 55); // Typing speed
      }
    }
  }
}

// EFFECT 5: Underline Sweep
function initUnderlineSweep() {
  const targets = document.querySelectorAll(".underline-sweep-target");
  if (targets.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("sweep-active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  targets.forEach(t => observer.observe(t));
}

// EFFECT 6: Stats Digit Rollup (Odometer)
function initCharRollup() {
  const stats = document.querySelectorAll("#hero dl dt");
  if (stats.length === 0) return;

  const rollData = [];

  stats.forEach((stat, index) => {
    const originalText = stat.textContent.trim();
    stat.innerHTML = ""; // Clear
    stat.classList.add("stat-roll-container");

    const columns = [];
    for (let char of originalText) {
      if (/\d/.test(char)) {
        const num = parseInt(char, 10);
        const col = document.createElement("span");
        col.className = "stat-roll-col";

        // Stack digits from 0 to target value
        for (let i = 0; i <= num; i++) {
          const digit = document.createElement("span");
          digit.className = "stat-roll-char";
          digit.textContent = i;
          col.appendChild(digit);
        }
        stat.appendChild(col);
        columns.push({ col, num });
      } else {
        const symbol = document.createElement("span");
        symbol.className = "stat-roll-char";
        symbol.textContent = char;
        stat.appendChild(symbol);
      }
    }
    rollData.push({ columns, index });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger rollups
        rollData.forEach(({ columns, index }) => {
          setTimeout(() => {
            columns.forEach(({ col, num }) => {
              col.style.transform = `translateY(-${num * 1.2}em)`;
            });
          }, index * 150); // 0.15s stagger
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  const statsRow = document.querySelector("#hero dl");
  if (statsRow) observer.observe(statsRow);
}

// Unified About Animations (slot-machine roll, blur reveal, cascade badges, skew entrance, magnetic cards)
function initAboutAnimations() {
  const section = document.querySelector("#about");
  if (!section) return;

  // A. Name reveal — Char Roll-up Setup
  const nameTargets = section.querySelectorAll(".char-rollup-target");
  const nameRollData = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  nameTargets.forEach((target) => {
    const originalText = target.textContent.trim();
    target.innerHTML = "";
    target.classList.add("char-roll-container");

    const columns = [];
    for (let i = 0; i < originalText.length; i++) {
      const char = originalText[i];
      if (char === " ") {
        const space = document.createElement("span");
        space.className = "char-roll-char";
        space.innerHTML = "&nbsp;";
        target.appendChild(space);
      } else {
        const col = document.createElement("span");
        col.className = "char-roll-col";
        
        // Generate a stack of 10 random characters + target character
        const rollCount = 10;
        for (let r = 0; r < rollCount; r++) {
          const randChar = document.createElement("span");
          randChar.className = "char-roll-char";
          randChar.textContent = alphabet[Math.floor(Math.random() * alphabet.length)];
          col.appendChild(randChar);
        }

        const finalChar = document.createElement("span");
        finalChar.className = "char-roll-char";
        finalChar.textContent = char;
        col.appendChild(finalChar);
        target.appendChild(col);
        
        columns.push({ col, index: i });
      }
    }
    nameRollData.push({ columns, target });
  });

  // B. Bio paragraphs sequential reveal Setup
  const paragraphs = section.querySelectorAll(".space-y-6 > p");
  paragraphs.forEach(p => p.classList.add("about-bio-p"));

  // D. Badge cascade Setup
  const badges = section.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span");
  badges.forEach(badge => badge.classList.add("about-badge-item"));

  // E. Portrait entrance Setup
  const portrait = document.getElementById("about-portrait");

  // Intersection Observer to trigger entrance animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 1. Trigger Char Roll-up for Name
        nameRollData.forEach(({ columns }) => {
          columns.forEach(({ col, index }) => {
            setTimeout(() => {
              col.style.transform = `translateY(-${10 * 1.2}em)`; // Translate to the 11th character (index 10)
            }, index * 35); // 35ms stagger per character
          });
        });

        // 2. Trigger Bio paragraphs sequential reveal
        paragraphs.forEach((p, index) => {
          setTimeout(() => {
            p.classList.add("reveal-active");
          }, index * 180); // 0.18s stagger
        });

        // 3. Trigger Tech badges cascade
        badges.forEach((badge, index) => {
          setTimeout(() => {
            badge.classList.add("reveal-active");
          }, index * 120); // 0.12s stagger
        });

        // 4. Trigger Portrait skew entrance & Tagline reveal
        if (portrait) {
          portrait.classList.add("reveal-active");
          const tagline = document.getElementById("about-tagline-container");
          if (tagline) tagline.classList.add("reveal-active");

          // F. Portrait ambient pulse breathing
          setTimeout(() => {
            portrait.classList.add("portrait-pulse-active");
          }, 900); // 0.9s duration
        }

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(section);

  // C. Magnetic cards Setup
  const magneticCards = section.querySelectorAll(".about-magnetic-card");
  magneticCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const dx = mouseX - cardX;
      const dy = mouseY - cardY;
      
      // Magnetic pull up to 8px max
      const pullX = (dx / rect.width) * 16;
      const pullY = (dy / rect.height) * 16;
      const mag = Math.sqrt(pullX * pullX + pullY * pullY);
      const maxPull = 8;
      
      let finalX = pullX;
      let finalY = pullY;
      if (mag > maxPull) {
        finalX = (pullX / mag) * maxPull;
        finalY = (pullY / mag) * maxPull;
      }
      
      card.style.transition = "none";
      card.style.transform = `translate(${finalX}px, ${finalY}px)`;
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      card.style.transform = "translate(0px, 0px)";
    });
  });
}

// EFFECT 8: Curtain Wipe cards
function initCurtainWipe() {
  const cards = document.querySelectorAll("#work .grid a");
  if (cards.length === 0) return;

  cards.forEach(card => {
    card.classList.add("curtain-card");
    const overlay = document.createElement("div");
    overlay.className = "curtain-overlay";
    card.appendChild(overlay);
  });

  const observer = new IntersectionObserver((entries) => {
    let cardCount = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        setTimeout(() => {
          card.classList.add("wipe-active");
        }, cardCount * 120); // 0.12s stagger
        cardCount++;
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(c => observer.observe(c));
}

// EFFECT 9: Clockwise border draw hover
function initDrawBorderHover() {
  const problemCards = document.querySelectorAll("#problem .grid > div");
  const offeringsCards = document.querySelectorAll("#what-i-build .grid > div");
  const allCards = [...problemCards, ...offeringsCards];

  allCards.forEach(card => {
    card.classList.add("draw-border-card");

    const top = document.createElement("span");
    top.className = "draw-border-line draw-border-top";
    const right = document.createElement("span");
    right.className = "draw-border-line draw-border-right";
    const bottom = document.createElement("span");
    bottom.className = "draw-border-line draw-border-bottom";
    const left = document.createElement("span");
    left.className = "draw-border-line draw-border-left";

    card.appendChild(top);
    card.appendChild(right);
    card.appendChild(bottom);
    card.appendChild(left);
  });
}

// EFFECT 10: Counter Animation for ROI Calculator
function initCounterAnimation() {
  const drainOutput = document.querySelector(".font-display.text-5xl");
  const recoverableOutput = document.querySelector(".font-display.text-3xl.text-primary");
  const sliders = document.querySelectorAll("input[type='range']");

  if (!drainOutput || !recoverableOutput || sliders.length < 3) return;

  let lastDrainVal = 0;
  let lastRecoverableVal = 0;
  let isFirstReveal = true;

  function formatCurrency(val) {
    return "$" + Math.round(val).toLocaleString();
  }

  function getCalculatedValues() {
    const hours = parseInt(sliders[0].value, 10);
    const cost = parseInt(sliders[1].value, 10);
    const team = parseInt(sliders[2].value, 10);
    const drain = hours * cost * team * 52;
    const recoverable = drain * 0.78;
    return { drain, recoverable };
  }

  function runAnimatedRecalculate(duration = 400) {
    const { drain, recoverable } = getCalculatedValues();

    animateCount(drainOutput, lastDrainVal, drain, duration, formatCurrency, ' <span class="text-base text-muted-foreground">/ year</span>');
    animateCount(recoverableOutput, lastRecoverableVal, recoverable, duration, formatCurrency, ' <span class="text-base text-muted-foreground">/ year</span>');

    lastDrainVal = drain;
    lastRecoverableVal = recoverable;
  }

  function animateCount(el, start, end, duration, formatFn, suffix) {
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = start + (end - start) * ease;
      
      el.innerHTML = `${formatFn(currentVal)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.innerHTML = `${formatFn(end)}${suffix}`;
      }
    }
    requestAnimationFrame(update);
  }

  // Intercept slider updates
  sliders.forEach(slider => {
    slider.addEventListener("input", () => {
      runAnimatedRecalculate(400); // 0.4s for updates
    });
  });

  // IntersectionObserver for initial view
  const calculatorSection = document.querySelector("#roi-calc") || document.querySelector("section[data-section='services'] + section");
  if (calculatorSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && isFirstReveal) {
          isFirstReveal = false;
          // Initial count up from 0 to computed value over 1200ms
          const { drain, recoverable } = getCalculatedValues();
          lastDrainVal = drain;
          lastRecoverableVal = recoverable;
          animateCount(drainOutput, 0, drain, 1200, formatCurrency, ' <span class="text-base text-muted-foreground">/ year</span>');
          animateCount(recoverableOutput, 0, recoverable, 1200, formatCurrency, ' <span class="text-base text-muted-foreground">/ year</span>');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(calculatorSection);
  }
}

// EFFECT 11: Accordion expand via grid-template-rows
function initAccordionExpand() {
  const answers = document.querySelectorAll(".faq-answer");
  answers.forEach(answer => {
    // Wrap current FAQ answer contents in the inner wrapper to compute exact height
    const inner = document.createElement("div");
    inner.className = "faq-answer-inner";
    inner.innerHTML = answer.innerHTML;
    answer.innerHTML = "";
    answer.appendChild(inner);
  });
}

// EFFECT 12: Fade Up with Stagger (for sections not covered by other specific reveals)
function initFadeUpStagger() {
  const containers = [
    document.querySelector('#toolkit .grid'),
    document.querySelector('#services .space-y-4'),
    document.querySelector('#process .rounded-2xl'),
    document.querySelector('#work-list tbody'),
    document.querySelector('#faq .space-y-4') || document.querySelector('#faq .border-t.hairline'),
    document.querySelector('#contact .grid')
  ].filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target;
        const items = container.querySelectorAll(".fade-up-item");
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("fade-up-active");
          }, index * 80); // 0.08s stagger
        });
        observer.unobserve(container);
      }
    });
  }, { threshold: 0.1 });

  containers.forEach(container => {
    Array.from(container.children).forEach(child => {
      child.classList.add("fade-up-item");
    });
    observer.observe(container);
  });
}

// EFFECT 13: Parallax scrolling single logo marquee
function initParallaxMarquee() {
  const section = document.querySelector("section.border-y.hairline");
  if (!section) return;

  const firstRow = section.querySelector(".flex");
  if (!firstRow) return;

  // Add marquee styling classes
  firstRow.classList.remove("animate-[marquee_40s_linear_infinite]");
  firstRow.classList.add("marquee-row", "marquee-left");

  section.classList.add("marquee-container");
}
