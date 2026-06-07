// main.js
import { initCanvas } from './background-canvas.js';

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initFaqAccordion();
  initRoiCalculator();
  initScrollHighlight();
  initChatbot();
  initScrollReveal();
  initStatsCounter();
  initHeroVideoObserver();
  initVideoPlayToggle();
  initVideoSoundToggle();
  initChatPopup();
  initBackToTop();
  initContactForm();
  initMobilePortraitTap();
});

// --- Theme Toggle ---
let userInteracted = false;
window.addEventListener("click", () => userInteracted = true, { once: true });
window.addEventListener("keydown", () => userInteracted = true, { once: true });
window.addEventListener("scroll", () => userInteracted = true, { once: true });
window.addEventListener("touchstart", () => userInteracted = true, { once: true });

function initThemeToggle() {
  const toggleBtns = document.querySelectorAll("#theme-toggle");
  const sunIcons = document.querySelectorAll("#theme-sun-icon");
  const moonIcons = document.querySelectorAll("#theme-moon-icon");

  if (toggleBtns.length === 0) return;

  function updateIcons(theme) {
    if (theme === "dark") {
      sunIcons.forEach(icon => icon.classList.remove("hidden"));
      moonIcons.forEach(icon => icon.classList.add("hidden"));
    } else {
      sunIcons.forEach(icon => icon.classList.add("hidden"));
      moonIcons.forEach(icon => icon.classList.remove("hidden"));
    }
  }

  // Get initial theme from data-theme or local storage
  let currentTheme = document.documentElement.getAttribute("data-theme");
  if (!currentTheme) {
    currentTheme = localStorage.getItem("ncs-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  document.documentElement.setAttribute("data-theme", currentTheme);
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(currentTheme);
  
  updateIcons(currentTheme);
  initCanvas(currentTheme);

  // Remove no-transition class after loading
  setTimeout(() => {
    document.documentElement.classList.remove("no-transition");
  }, 100);

  function fadeCanvasAndReinit(newTheme) {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) {
      initCanvas(newTheme);
      return;
    }
    
    // Fade out canvas opacity from 1 to 0 over 300ms
    canvas.style.transition = "opacity 300ms ease";
    canvas.style.opacity = "0";
    
    setTimeout(() => {
      // Reinitialize canvas with the new theme
      initCanvas(newTheme);
      
      // Fade canvas back in from 0 to 1 over 400ms
      canvas.style.transition = "opacity 400ms ease";
      canvas.style.opacity = "1";
    }, 300);
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      userInteracted = true;

      // Inject theme-transitioning class on HTML
      document.documentElement.classList.add("theme-transitioning");

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      
      document.documentElement.setAttribute("data-theme", newTheme);
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(newTheme);
      
      localStorage.setItem("ncs-theme", newTheme);
      updateIcons(newTheme);
      
      // Crossfade the canvas
      fadeCanvasAndReinit(newTheme);

      // Clean up theme-transitioning class after 600ms
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 600);
    });
  });
}

// --- FAQ Accordion ---
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  
  items.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isCurrentlyOpen = item.classList.contains("active");

      // Collapse all FAQs
      items.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });

      // Toggle current one
      if (!isCurrentlyOpen) {
        item.classList.add("active");
      }
    });
  });
}

// --- ROI Calculator ---
function initRoiCalculator() {
  const hoursSlider = document.getElementById("roi-hours");
  const costSlider = document.getElementById("roi-cost");
  const teamSlider = document.getElementById("roi-team");

  const hoursLabel = document.getElementById("roi-hours-label");
  const costLabel = document.getElementById("roi-cost-label");
  const teamLabel = document.getElementById("roi-team-label");

  const drainOutput = document.getElementById("roi-drain-value");
  const recoverableOutput = document.getElementById("roi-recoverable-value");

  if (!hoursSlider || !costSlider || !teamSlider) return;

  function formatCurrency(num) {
    return "$" + Math.round(num).toLocaleString();
  }

  function updateSliderPercent(slider) {
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = parseFloat(slider.value) || 0;
    const percent = ((val - min) / (max - min)) * 100;
    slider.style.setProperty('--percent', percent + '%');
  }

  function recalculate() {
    const hours = parseInt(hoursSlider.value, 10);
    const cost = parseInt(costSlider.value, 10);
    const team = parseInt(teamSlider.value, 10);

    // Update range labels
    if (hoursLabel) hoursLabel.textContent = hours + " hrs";
    if (costLabel) costLabel.textContent = "$" + cost + " / hr";
    if (teamLabel) teamLabel.textContent = team + (team === 1 ? " person" : " people");

    // Dynamic slider track fill
    updateSliderPercent(hoursSlider);
    updateSliderPercent(costSlider);
    updateSliderPercent(teamSlider);

    // Calculations
    const drain = hours * cost * team * 52;
    const recoverable = drain * 0.78;

    if (drainOutput) {
      drainOutput.innerHTML = `${formatCurrency(drain)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`;
    }
    if (recoverableOutput) {
      recoverableOutput.innerHTML = `${formatCurrency(recoverable)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`;
    }
  }

  [hoursSlider, costSlider, teamSlider].forEach(slider => {
    slider.addEventListener("input", recalculate);
  });

  // Run initial calculation
  recalculate();
}


// --- Scroll Highlighting & Indicator ---
function initScrollHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const indicator = document.getElementById("active-section-indicator");

  if (sections.length === 0) return;

  const sectionNameMap = {
    "hero": "Home",
    "problem": "Pain Points",
    "what-i-build": "Services",
    "toolkit": "Toolkit",
    "services": "Pricing",
    "process": "Process",
    "work": "Selected Work",
    "work-list": "Archive",
    "about": "About",
    "faq": "FAQ",
    "contact": "Contact"
  };

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px", // Trigger when section occupies core screen space
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        
        // Update Bottom Nav indicator text
        if (indicator) {
          const readableName = sectionNameMap[id] || id.charAt(0).toUpperCase() + id.slice(1);
          indicator.innerHTML = `Viewing ${readableName} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-3 w-3"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>`;
        }

        // Highlight active Bottom Nav button
        navLinks.forEach((link) => {
          const href = link.getAttribute("href");
          const isActive = (href === `#${id}` || (id === "work-list" && href === "#work") || (id === "what-i-build" && href === "#services"));
          if (isActive) {
            link.classList.add("bg-primary", "text-primary-foreground", "active");
            link.classList.remove("text-foreground/80");
          } else {
            link.classList.remove("bg-primary", "text-primary-foreground", "active");
            link.classList.add("text-foreground/80");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

// --- Chatbot Widget ---
function initChatbot() {
  const toggleBtn = document.getElementById("chatbot-toggle");
  const closeBtn = document.getElementById("chatbot-close");
  const chatWindow = document.getElementById("chatbot-window");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatForm = document.getElementById("chat-form");
  const chatLoading = document.getElementById("chat-loading");
  const sendBtn = chatForm?.querySelector("button[type='submit']");
  const pills = document.querySelectorAll(".chat-pill");

  if (!toggleBtn || !chatWindow) return;

  const instructions = [
    {
      topic: "Full-Stack + Bubble",
      answer: "I architect the data model first, then ship UI in Bubble for visual surfaces and Next.js for anything that demands custom code."
    },
    {
      topic: "UI/UX Design",
      answer: "Design is structural — I work in Figma, then prototype directly in code. Token-first, component-driven."
    },
    {
      topic: "Custom Dev",
      answer: "Next.js + Supabase, TypeScript everywhere, edge-deployed. I write the code I'd want to inherit."
    }
  ];

  const welcomeMessage = "Hey <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-hand inline-block mr-1 align-text-bottom text-primary'><path d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5'></path><path d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M6 15a4 4 0 0 0-4-4v0a2 2 0 0 0-2 2v6a8 8 0 0 0 8 8h5a6 6 0 0 0 6-6v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2'></path></svg> I'm the Emmanuel Twin. Ask me about how I build, what I charge, or anything else. Pick a starter or type a question.";

  // Initial welcome message
  addMessage("assistant", welcomeMessage);

  // Toggle chatbot open/close
  toggleBtn.addEventListener("click", () => {
    chatWindow.classList.remove("hidden");
    toggleBtn.classList.add("opacity-0", "pointer-events-none");
    scrollToBottom();
  });

  closeBtn.addEventListener("click", () => {
    chatWindow.classList.add("hidden");
    toggleBtn.classList.remove("opacity-0", "pointer-events-none");
  });

  // Enable/disable send button based on text
  chatInput.addEventListener("input", () => {
    const hasText = chatInput.value.trim().length > 0;
    sendBtn.disabled = !hasText;
  });

  // Form submit
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (query) {
      handleUserQuery(query);
    }
  });

  // Topic pill clicks
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      handleUserQuery(pill.textContent);
    });
  });

  function addMessage(role, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = role === "user" ? "flex justify-end" : "flex justify-start";
    
    const isUser = role === "user";
    const bgClass = isUser ? "bg-primary text-primary-foreground" : "bg-foreground/[0.04] text-foreground border hairline";
    const roundClass = isUser ? "rounded-2xl rounded-tr-none" : "rounded-2xl rounded-tl-none";

    msgDiv.innerHTML = `
      <div class="max-w-[82%] px-4 py-3 text-sm leading-relaxed ${bgClass} ${roundClass}">
        ${text}
      </div>
    `;
    chatMessages.appendChild(msgDiv);
    scrollToBottom();
  }

  function handleUserQuery(query) {
    addMessage("user", query);
    chatInput.value = "";
    sendBtn.disabled = true;
    chatInput.disabled = true;
    chatLoading.classList.remove("hidden");
    scrollToBottom();

    setTimeout(() => {
      // Find matching answer
      const cleaned = query.toLowerCase();
      let match = instructions.find(item => {
        const firstWord = item.topic.toLowerCase().split(/[\s/+]+/)[0];
        return cleaned.includes(firstWord) || cleaned.includes(item.topic.toLowerCase());
      });

      const responseText = match 
        ? match.answer 
        : "I'd answer that personally — drop your details on the Contact page or pick a topic pill above and I'll route you to the right response.";

      chatLoading.classList.add("hidden");
      chatInput.disabled = false;
      addMessage("assistant", responseText);
      chatInput.focus();
    }, 1400);
  }

  function scrollToBottom() {
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 50);
  }
}

// --- Scroll Reveal Observer ---
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -120px 0px", // Trigger when elements are 120px above viewport bottom
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => observer.observe(el));
}


// --- Chat Popup on Scroll ---
function initChatPopup() {
  const popup    = document.getElementById('chatbot-popup');
  const dismiss  = document.getElementById('chatbot-popup-dismiss');
  const ctaBtn   = document.getElementById('chatbot-popup-cta');
  const toggle   = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chatbot-close');

  if (!popup || !toggle) return;

  let shown     = false;
  let dismissed = false;

  // --- Inject keyframes once ---
  if (!document.getElementById('popup-keyframe-style')) {
    const style = document.createElement('style');
    style.id = 'popup-keyframe-style';
    style.textContent = `
      @keyframes popupIn {
        0%   { opacity: 0; transform: translateY(16px) scale(0.92); }
        60%  { opacity: 1; transform: translateY(-4px) scale(1.02); }
        100% { opacity: 1; transform: translateY(0)   scale(1); }
      }
      @keyframes popupOut {
        0%   { opacity: 1; transform: translateY(0)   scale(1); }
        100% { opacity: 0; transform: translateY(10px) scale(0.94); }
      }
      @keyframes togglePulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb, 99,91,255), 0.55); }
        50%      { box-shadow: 0 0 0 10px rgba(var(--primary-rgb, 99,91,255), 0); }
      }
      #chatbot-toggle.pulse-hint {
        animation: togglePulse 1.6s ease infinite;
      }
    `;
    document.head.appendChild(style);
  }

  // --- Show / Hide helpers ---
  function showPopup() {
    if (shown || dismissed) return;
    if (chatWindow && !chatWindow.classList.contains('hidden')) return;
    shown = true;

    popup.style.animation = 'none';
    popup.classList.remove('hidden');
    popup.offsetHeight; // force reflow
    popup.style.animation = 'popupIn 0.5s cubic-bezier(0.22,1,0.36,1) both';

    // Pulse the toggle button while popup is visible
    toggle.classList.add('pulse-hint');

    // Auto-hide after 10 seconds
    setTimeout(() => { if (!dismissed) hidePopup(); }, 10000);
  }

  function hidePopup(instant = false) {
    if (popup.classList.contains('hidden')) return;
    toggle.classList.remove('pulse-hint');

    if (instant) {
      popup.classList.add('hidden');
      return;
    }

    popup.style.animation = 'popupOut 0.3s ease forwards';
    setTimeout(() => popup.classList.add('hidden'), 290);
  }

  function openChat() {
    dismissed = true;
    hidePopup(true);
    if (chatWindow) {
      chatWindow.classList.remove('hidden');
      toggle.classList.add('opacity-0', 'pointer-events-none');
    }
  }

  // --- Scroll trigger: show chatbot popup when reaching Services (#what-i-build) on home, or after 400px on other pages ---
  const servicesSec = document.getElementById('what-i-build');
  if (servicesSec) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !shown && !dismissed) {
          showPopup();
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -25% 0px' });
    observer.observe(servicesSec);
  } else {
    const handleScrollFallback = () => {
      if (shown || dismissed) {
        window.removeEventListener('scroll', handleScrollFallback);
        return;
      }
      if (window.scrollY > 400) {
        showPopup();
        window.removeEventListener('scroll', handleScrollFallback);
      }
    };
    window.addEventListener('scroll', handleScrollFallback, { passive: true });
  }


  // --- Dismiss (×) button ---
  dismiss && dismiss.addEventListener('click', (e) => {
    e.stopPropagation();
    dismissed = true;
    hidePopup();
  });

  // --- CTA button "Start a project" ---
  ctaBtn && ctaBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openChat();
    // Scroll input into focus after chat opens
    setTimeout(() => {
      const input = document.getElementById('chat-input');
      if (input) input.focus();
    }, 150);
  });

  // --- Toggle button hides popup when clicked ---
  toggle.addEventListener('click', () => {
    dismissed = true;
    hidePopup(true);
  });

  // --- Chat close re-enables popup possibility (next page load) ---
  closeBtn && closeBtn.addEventListener('click', () => {
    // When chat is closed we do NOT re-show popup — dismissed stays true
    toggle.classList.remove('pulse-hint');
  });
}

// --- Back To Top Button ---
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  let isVisible = false;

  window.addEventListener('scroll', () => {
    const shouldBeVisible = window.scrollY > 400;
    if (shouldBeVisible !== isVisible) {
      isVisible = shouldBeVisible;
      if (isVisible) {
        btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


// --- Stats Counter Animation ---

function initStatsCounter() {
  const grid = document.querySelector(".stats-grid");
  if (!grid) return;

  const elements = grid.querySelectorAll("dt");
  const statsData = [];

  elements.forEach((el) => {
    const originalText = el.textContent.trim();
    // Parse prefix, number, and suffix
    const match = originalText.match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);
    if (match) {
      const prefix = match[1];
      const targetVal = parseInt(match[2], 10);
      const suffix = match[3];

      statsData.push({
        el,
        prefix,
        targetVal,
        suffix
      });

      // Set initial state
      el.textContent = `${prefix}0${suffix}`;
    }
  });

  function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  function animateCount(el, start, end, prefix, suffix, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      const currentVal = Math.floor(start + (end - start) * easedProgress);
      el.textContent = `${prefix}${currentVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${end}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  }

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statsData.forEach((stat) => {
          animateCount(stat.el, 0, stat.targetVal, stat.prefix, stat.suffix, 2000);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  observer.observe(grid);
}

// --- Hero Video Scroll Observer ---
function initHeroVideoObserver() {
  const video = document.getElementById("hero-loop-video");
  if (!video) return;

  const observerOptions = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, observerOptions);

  observer.observe(video);
}

// --- Enhanced Contact Form Submission ---
function initContactForm() {
  const form = document.getElementById("enhanced-contact-form");
  if (!form) return;

  const submitBtn = document.getElementById("contact-submit-btn");
  const btnText = document.getElementById("contact-btn-text");
  const btnIcon = document.getElementById("contact-btn-icon");
  const successMsg = document.getElementById("contact-success");
  const errorMsg = document.getElementById("contact-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Disable button & show loading state
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = "Sending...";
    if (btnIcon) btnIcon.classList.add("animate-pulse");
    if (successMsg) successMsg.classList.add("hidden");
    if (errorMsg) errorMsg.classList.add("hidden");

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        form.reset();
        if (successMsg) successMsg.classList.remove("hidden");
        if (btnText) btnText.textContent = "Sent!";
      } else {
        // Formspree returned error status
        if (errorMsg) errorMsg.classList.remove("hidden");
        if (btnText) btnText.textContent = "Send message";
        if (submitBtn) submitBtn.disabled = false;
      }
    } catch (err) {
      // Network error
      if (errorMsg) errorMsg.classList.remove("hidden");
      if (btnText) btnText.textContent = "Send message";
      if (submitBtn) submitBtn.disabled = false;
    } finally {
      if (btnIcon) btnIcon.classList.remove("animate-pulse");
    }
  });
}

// --- Hero Video Sound Control ---
function initVideoSoundToggle() {
  const video = document.getElementById("hero-loop-video");
  const toggleBtn = document.getElementById("video-sound-toggle");
  const soundOffIcon = document.getElementById("video-sound-off");
  const soundOnIcon = document.getElementById("video-sound-on");

  if (!video || !toggleBtn) return;

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isMuted = video.muted;
    video.muted = !isMuted;

    if (video.muted) {
      soundOffIcon.classList.remove("hidden");
      soundOnIcon.classList.add("hidden");
    } else {
      soundOffIcon.classList.add("hidden");
      soundOnIcon.classList.remove("hidden");
    }
  });
}

// --- Hero Video Play/Pause Control ---
function initVideoPlayToggle() {
  const video = document.getElementById("hero-loop-video");
  const toggleBtn = document.getElementById("video-play-toggle");
  const pauseIcon = document.getElementById("video-pause-icon");
  const playIcon = document.getElementById("video-play-icon");

  if (!video || !toggleBtn) return;

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (video.paused) {
      video.play().then(() => {
        pauseIcon.classList.remove("hidden");
        playIcon.classList.add("hidden");
      }).catch(err => {
        console.error("Video play failed:", err);
      });
    } else {
      video.pause();
      pauseIcon.classList.add("hidden");
      playIcon.classList.remove("hidden");
    }
  });

  // Keep button state sync'd if video elements are played/paused elsewhere
  video.addEventListener("play", () => {
    pauseIcon.classList.remove("hidden");
    playIcon.classList.add("hidden");
  });

  video.addEventListener("pause", () => {
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
  });
}

// --- Mobile Tap-to-toggle profile picture grayscale ---
function initMobilePortraitTap() {
  const wrapper = document.getElementById("about-portrait-wrapper");
  if (!wrapper) return;

  wrapper.addEventListener("click", () => {
    wrapper.classList.toggle("touch-active");
  });
}



