(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(e){if(e.ep)return;e.ep=!0;const a=t(e);fetch(e.href,a)}})();document.addEventListener("DOMContentLoaded",()=>{const n=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(N(),n){D();return}R(),Y(),X(),$(),z(),H(),V(),U(),W(),j(),G(),_()});function N(){const n=document.createElement("style");n.textContent=`
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
    }
    #about-portrait-wrapper:hover .profile-image-el,
    #about-portrait-wrapper:active .profile-image-el {
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
    #about-portrait-wrapper:active #about-tagline {
      color: var(--primary);
    }
    #about-portrait-wrapper:hover #about-subtagline,
    #about-portrait-wrapper:active #about-subtagline {
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
  `,document.head.appendChild(n)}function D(){document.querySelectorAll("#hero dl dt").forEach(t=>{t.style.transform="none"});const r=document.querySelector("#about");if(r){r.querySelectorAll(".char-rollup-target").forEach(i=>i.style.transform="none"),r.querySelectorAll(".space-y-6 > p").forEach(i=>{i.style.filter="none",i.style.opacity="1",i.style.transform="none"}),r.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span").forEach(i=>{i.style.opacity="1",i.style.transform="none"});const a=document.getElementById("about-portrait");a&&(a.style.opacity="1",a.style.transform="none");const c=document.getElementById("about-tagline-container");c&&(c.style.opacity="1",c.style.transform="none")}}function R(){const n=document.querySelector("#hero h1");if(!n)return;n.classList.add("clip-reveal");let r=0;const t=.06;function o(e){if(e.nodeType===Node.TEXT_NODE){const c=e.nodeValue.split(/(\s+)/),i=document.createDocumentFragment();c.forEach(l=>{if(l.trim().length>0){const s=document.createElement("span");s.className="animate-word",s.textContent=l,s.style.animationDelay=`${r*t}s`,i.appendChild(s),r++}else i.appendChild(document.createTextNode(l))}),e.parentNode.replaceChild(i,e)}else e.nodeType===Node.ELEMENT_NODE&&e.tagName!=="SVG"&&Array.from(e.childNodes).forEach(o)}Array.from(n.childNodes).forEach(o)}function Y(){const n=document.querySelector('header a[href="#hero"]');if(!n)return;const r=n.querySelector(".bg-primary"),t=n.querySelector(".text-primary");if(!t||!r)return;const o="Nocode",e="Savvy";let a=!1;n.addEventListener("mouseenter",()=>{if(a)return;a=!0;const c="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",i=performance.now(),l=600,s=30;function f(d){const u=d-i;let p="";for(let g=0;g<o.length;g++){const y=g*s;u>=l||u>=y+(l-o.length*s)?p+=o[g]:p+=c[Math.floor(Math.random()*c.length)]}let m="";for(let g=0;g<e.length;g++){const y=(o.length+g)*s;u>=l||u>=y+(l-(o.length+e.length)*s)?m+=e[g]:m+=c[Math.floor(Math.random()*c.length)]}let h=r.nextSibling;h&&h.nodeType===Node.TEXT_NODE&&(h.nodeValue=p),t.textContent=m,u<l?requestAnimationFrame(f):(h&&h.nodeType===Node.TEXT_NODE&&(h.nodeValue=o),t.textContent=e,a=!1)}requestAnimationFrame(f)})}function X(){const n=document.querySelectorAll("h1, h2, h3"),r=[];n.forEach(o=>{const e=o.textContent.trim();e.split(/\s+/).length<=3&&(o.classList.add("gradient-wipe"),o.setAttribute("data-text",e),r.push(o))});const t=new IntersectionObserver(o=>{o.forEach(e=>{e.isIntersecting&&(e.target.classList.add("wipe-active"),t.unobserve(e.target))})},{threshold:.5});r.forEach(o=>t.observe(o))}function $(){const n=document.getElementById("typewriter-text");if(!n)return;const r=["SaaS platforms that scale.","Bubble apps that don't break.","AI integrations that actually work.","Payment systems wired right.","MVPs shipped in 3 weeks.","The thing your business actually needs."];let t=0,o=0,e=!1;setTimeout(()=>{a()},1400);function a(){const c=r[t];e?(n.textContent=c.substring(0,o-1),o--,o===0?(e=!1,t=(t+1)%r.length,setTimeout(a,550)):setTimeout(a,30)):(n.textContent=c.substring(0,o+1),o++,o===c.length?(e=!0,setTimeout(a,1600)):setTimeout(a,55))}}function z(){const n=document.querySelectorAll(".underline-sweep-target");if(n.length===0)return;const r=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&(o.target.classList.add("sweep-active"),r.unobserve(o.target))})},{threshold:.3});n.forEach(t=>r.observe(t))}function H(){const n=document.querySelector("#about");if(!n)return;const r=n.querySelectorAll(".char-rollup-target"),t=[],o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";r.forEach(s=>{const f=s.textContent.trim();s.innerHTML="",s.classList.add("char-roll-container");const d=[];for(let u=0;u<f.length;u++){const p=f[u];if(p===" "){const m=document.createElement("span");m.className="char-roll-char",m.innerHTML="&nbsp;",s.appendChild(m)}else{const m=document.createElement("span");m.className="char-roll-col";const h=10;for(let y=0;y<h;y++){const v=document.createElement("span");v.className="char-roll-char",v.textContent=o[Math.floor(Math.random()*o.length)],m.appendChild(v)}const g=document.createElement("span");g.className="char-roll-char",g.textContent=p,m.appendChild(g),s.appendChild(m),d.push({col:m,index:u})}}t.push({columns:d,target:s})});const e=n.querySelectorAll(".space-y-6 > p");e.forEach(s=>s.classList.add("about-bio-p"));const a=n.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span");a.forEach(s=>s.classList.add("about-badge-item"));const c=document.getElementById("about-portrait"),i=new IntersectionObserver(s=>{s.forEach(f=>{if(f.isIntersecting){if(t.forEach(({columns:d})=>{d.forEach(({col:u,index:p})=>{setTimeout(()=>{u.style.transform=`translateY(-${10*1.2}em)`},p*35)})}),e.forEach((d,u)=>{setTimeout(()=>{d.classList.add("reveal-active")},u*180)}),a.forEach((d,u)=>{setTimeout(()=>{d.classList.add("reveal-active")},u*120)}),c){c.classList.add("reveal-active");const d=document.getElementById("about-tagline-container");d&&d.classList.add("reveal-active"),setTimeout(()=>{c.classList.add("portrait-pulse-active")},900)}i.unobserve(f.target)}})},{threshold:.15});i.observe(n),n.querySelectorAll(".about-magnetic-card").forEach(s=>{s.addEventListener("mousemove",f=>{const d=s.getBoundingClientRect(),u=d.left+d.width/2,p=d.top+d.height/2,m=f.clientX,h=f.clientY,g=m-u,y=h-p,v=g/d.width*16,E=y/d.height*16,L=Math.sqrt(v*v+E*E),x=8;let I=v,C=E;L>x&&(I=v/L*x,C=E/L*x),s.style.transition="none",s.style.transform=`translate(${I}px, ${C}px)`}),s.addEventListener("mouseleave",()=>{s.style.transition="transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",s.style.transform="translate(0px, 0px)"})})}function V(){const n=document.querySelectorAll("#work .grid a");if(n.length===0)return;n.forEach(t=>{t.classList.add("curtain-card");const o=document.createElement("div");o.className="curtain-overlay",t.appendChild(o)});const r=new IntersectionObserver(t=>{let o=0;t.forEach(e=>{if(e.isIntersecting){const a=e.target;setTimeout(()=>{a.classList.add("wipe-active")},o*120),o++,r.unobserve(a)}})},{threshold:.2});n.forEach(t=>r.observe(t))}function U(){const n=document.querySelectorAll("#problem .grid > div"),r=document.querySelectorAll("#what-i-build .grid > div");[...n,...r].forEach(o=>{o.classList.add("draw-border-card");const e=document.createElement("span");e.className="draw-border-line draw-border-top";const a=document.createElement("span");a.className="draw-border-line draw-border-right";const c=document.createElement("span");c.className="draw-border-line draw-border-bottom";const i=document.createElement("span");i.className="draw-border-line draw-border-left",o.appendChild(e),o.appendChild(a),o.appendChild(c),o.appendChild(i)})}function W(){const n=document.querySelector(".font-display.text-5xl"),r=document.querySelector(".font-display.text-3xl.text-primary"),t=document.querySelectorAll("input[type='range']");if(!n||!r||t.length<3)return;let o=0,e=0,a=!0;function c(d){return"$"+Math.round(d).toLocaleString()}function i(){const d=parseInt(t[0].value,10),u=parseInt(t[1].value,10),p=parseInt(t[2].value,10),m=d*u*p*52,h=m*.78;return{drain:m,recoverable:h}}function l(d=400){const{drain:u,recoverable:p}=i();s(n,o,u,d,c,' <span class="text-base text-muted-foreground">/ year</span>'),s(r,e,p,d,c,' <span class="text-base text-muted-foreground">/ year</span>'),o=u,e=p}function s(d,u,p,m,h,g){const y=performance.now();function v(E){const L=E-y,x=Math.min(L/m,1),I=x===1?1:1-Math.pow(2,-10*x),C=u+(p-u)*I;d.innerHTML=`${h(C)}${g}`,x<1?requestAnimationFrame(v):d.innerHTML=`${h(p)}${g}`}requestAnimationFrame(v)}t.forEach(d=>{d.addEventListener("input",()=>{l(400)})});const f=document.querySelector("#roi-calc")||document.querySelector("section[data-section='services'] + section");if(f){const d=new IntersectionObserver(u=>{u.forEach(p=>{if(p.isIntersecting&&a){a=!1;const{drain:m,recoverable:h}=i();o=m,e=h,s(n,0,m,1200,c,' <span class="text-base text-muted-foreground">/ year</span>'),s(r,0,h,1200,c,' <span class="text-base text-muted-foreground">/ year</span>'),d.unobserve(p.target)}})},{threshold:.1});d.observe(f)}}function j(){document.querySelectorAll(".faq-answer").forEach(r=>{const t=document.createElement("div");t.className="faq-answer-inner",t.innerHTML=r.innerHTML,r.innerHTML="",r.appendChild(t)})}function G(){const n=[document.querySelector("#toolkit .grid"),document.querySelector("#services .space-y-4"),document.querySelector("#process .rounded-2xl"),document.querySelector("#work-list tbody"),document.querySelector("#faq .space-y-4")||document.querySelector("#faq .border-t.hairline"),document.querySelector("#contact .grid")].filter(Boolean),r=new IntersectionObserver(t=>{t.forEach(o=>{if(o.isIntersecting){const e=o.target;e.querySelectorAll(".fade-up-item").forEach((c,i)=>{setTimeout(()=>{c.classList.add("fade-up-active")},i*80)}),r.unobserve(e)}})},{threshold:.1});n.forEach(t=>{Array.from(t.children).forEach(o=>{o.classList.add("fade-up-item")}),r.observe(t)})}function _(){const n=document.querySelector("section.border-y.hairline");if(!n)return;const r=n.querySelector(".flex");r&&(r.classList.remove("animate-[marquee_40s_linear_infinite]"),r.classList.add("marquee-row","marquee-left"),n.classList.add("marquee-container"))}let b=null,w=null,k=null,S=null,T=null,M="light",q=null;function A(n){M=n,b=document.getElementById("bg-canvas"),b||(b=document.createElement("canvas"),b.id="bg-canvas",b.style.position="fixed",b.style.inset="0",b.style.pointerEvents="none",b.style.zIndex="-1",document.body.prepend(b)),w=b.getContext("2d"),B(),window.removeEventListener("resize",B),window.addEventListener("resize",B),window.removeEventListener("mousemove",O),window.addEventListener("mousemove",O),window.removeEventListener("mouseleave",P),window.addEventListener("mouseleave",P),k&&cancelAnimationFrame(k),M==="dark"&&!q&&Q(),M==="light"?K():J()}function B(){b&&(b.width=window.innerWidth,b.height=window.innerHeight)}function O(n){S=n.clientX,T=n.clientY}function P(){S=null,T=null}function Q(){const n=document.createElement("canvas");n.width=128,n.height=128;const r=n.getContext("2d"),t=r.createImageData(128,128),o=t.data;for(let e=0;e<o.length;e+=4){const a=Math.floor(Math.random()*255);o[e]=a,o[e+1]=a,o[e+2]=a,o[e+3]=6}r.putImageData(t,0,0),q=w.createPattern(n,"repeat")}let F=[];function K(){F=[];const n=60;for(let t=0;t<n;t++)F.push({x:Math.random()*b.width,y:Math.random()*b.height,origX:0,origY:0,vx:(Math.random()>.5?1:-1)*(.15+Math.random()*.15),vy:(Math.random()>.5?1:-1)*(.15+Math.random()*.15),radius:1+Math.random()*1});function r(){w.clearRect(0,0,b.width,b.height),w.fillStyle="rgba(0, 0, 0, 0.04)",F.forEach(t=>{if(t.x+=t.vx,t.y+=t.vy,t.x<0&&(t.x=b.width),t.x>b.width&&(t.x=0),t.y<0&&(t.y=b.height),t.y>b.height&&(t.y=0),S!==null&&T!==null){const o=S-t.x,e=T-t.y;Math.sqrt(o*o+e*e)<80&&(t.x+=o*.02,t.y+=e*.02)}w.beginPath(),w.arc(t.x,t.y,t.radius,0,Math.PI*2),w.fill()}),k=requestAnimationFrame(r)}r()}function J(){let n=performance.now();function r(o){const e=(o-n)/1e3;w.clearRect(0,0,b.width,b.height);const a=b.width,c=b.height,i=a*.4,l=a*(.5+.3*Math.sin(2*Math.PI*e/18)),s=c*(.5+.2*Math.cos(2*Math.PI*e/18));t(l,s,i,"rgba(99, 60, 180, 0.12)");const f=a*.35,d=a*(.5-.25*Math.sin(2*Math.PI*e/24)),u=c*(.5-.2*Math.cos(2*Math.PI*e/24));t(d,u,f,"rgba(30, 80, 160, 0.10)");const p=a*.3,m=a*(.5+.2*Math.sin(2*Math.PI*e/20+Math.PI/4)),h=c*(.5+.2*Math.sin(2*Math.PI*e/20));t(m,h,p,"rgba(140, 60, 100, 0.08)");const g=1+.1*Math.sin(2*Math.PI*e/30),y=a*.45*g,v=a*.5,E=c*.5;t(v,E,y,"rgba(20, 100, 120, 0.07)"),q&&(w.fillStyle=q,w.fillRect(0,0,a,c)),k=requestAnimationFrame(r)}function t(o,e,a,c){if(a<=0)return;const i=w.createRadialGradient(o,e,0,o,e,a);i.addColorStop(0,c),i.addColorStop(1,"rgba(0, 0, 0, 0)"),w.fillStyle=i,w.beginPath(),w.arc(o,e,a,0,Math.PI*2),w.fill()}requestAnimationFrame(r)}document.addEventListener("DOMContentLoaded",()=>{Z(),ee(),te(),ne(),oe(),re(),ae(),ce(),le(),ue(),ie(),se(),de()});window.addEventListener("click",()=>!0,{once:!0});window.addEventListener("keydown",()=>!0,{once:!0});window.addEventListener("scroll",()=>!0,{once:!0});window.addEventListener("touchstart",()=>!0,{once:!0});function Z(){const n=document.querySelectorAll("#theme-toggle"),r=document.querySelectorAll("#theme-sun-icon"),t=document.querySelectorAll("#theme-moon-icon");if(n.length===0)return;function o(c){c==="dark"?(r.forEach(i=>i.classList.remove("hidden")),t.forEach(i=>i.classList.add("hidden"))):(r.forEach(i=>i.classList.add("hidden")),t.forEach(i=>i.classList.remove("hidden")))}let e=document.documentElement.getAttribute("data-theme");e||(e=localStorage.getItem("ncs-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")),document.documentElement.setAttribute("data-theme",e),document.documentElement.classList.remove("dark","light"),document.documentElement.classList.add(e),o(e),A(e),setTimeout(()=>{document.documentElement.classList.remove("no-transition")},100);function a(c){const i=document.getElementById("bg-canvas");if(!i){A(c);return}i.style.transition="opacity 300ms ease",i.style.opacity="0",setTimeout(()=>{A(c),i.style.transition="opacity 400ms ease",i.style.opacity="1"},300)}n.forEach(c=>{c.addEventListener("click",()=>{document.documentElement.classList.add("theme-transitioning");const l=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",l),document.documentElement.classList.remove("dark","light"),document.documentElement.classList.add(l),localStorage.setItem("ncs-theme",l),o(l),a(l),setTimeout(()=>{document.documentElement.classList.remove("theme-transitioning")},600)})})}function ee(){const n=document.querySelectorAll(".faq-item");n.forEach(r=>{const t=r.querySelector(".faq-trigger");t&&t.addEventListener("click",()=>{const o=r.classList.contains("active");n.forEach(e=>{e.classList.remove("active")}),o||r.classList.add("active")})})}function te(){const n=document.getElementById("roi-hours"),r=document.getElementById("roi-cost"),t=document.getElementById("roi-team"),o=document.getElementById("roi-hours-label"),e=document.getElementById("roi-cost-label"),a=document.getElementById("roi-team-label"),c=document.getElementById("roi-drain-value"),i=document.getElementById("roi-recoverable-value");if(!n||!r||!t)return;function l(d){return"$"+Math.round(d).toLocaleString()}function s(d){const u=parseFloat(d.min)||0,p=parseFloat(d.max)||100,h=((parseFloat(d.value)||0)-u)/(p-u)*100;d.style.setProperty("--percent",h+"%")}function f(){const d=parseInt(n.value,10),u=parseInt(r.value,10),p=parseInt(t.value,10);o&&(o.textContent=d+" hrs"),e&&(e.textContent="$"+u+" / hr"),a&&(a.textContent=p+(p===1?" person":" people")),s(n),s(r),s(t);const m=d*u*p*52,h=m*.78;c&&(c.innerHTML=`${l(m)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`),i&&(i.innerHTML=`${l(h)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`)}[n,r,t].forEach(d=>{d.addEventListener("input",f)}),f()}function ne(){const n=document.getElementById("testimonial-slider");if(!n)return;const r=n.querySelectorAll(".testimonial-slide"),t=document.getElementById("testimonial-prev"),o=document.getElementById("testimonial-next"),e=document.querySelectorAll("#testimonial-dots button");if(r.length===0)return;let a=0,c=!1;function i(l){if(c||l===a)return;c=!0;const s=r[a],f=r[l];s.style.opacity="0",e[a].classList.remove("bg-primary","w-4"),e[a].classList.add("bg-foreground/25"),setTimeout(()=>{s.classList.add("hidden"),f.classList.remove("hidden"),f.offsetHeight,f.style.opacity="1",e[l].classList.remove("bg-foreground/25"),e[l].classList.add("bg-primary","w-4"),a=l,c=!1},300)}t==null||t.addEventListener("click",()=>{let l=a-1;l<0&&(l=r.length-1),i(l)}),o==null||o.addEventListener("click",()=>{let l=a+1;l>=r.length&&(l=0),i(l)}),e.forEach((l,s)=>{l.addEventListener("click",()=>{i(s)})}),r.forEach((l,s)=>{l.style.transition="opacity 0.3s ease",s!==0?l.style.opacity="0":l.style.opacity="1"})}function oe(){const n=document.querySelectorAll("section[id]"),r=document.querySelectorAll(".nav-link"),t=document.getElementById("active-section-indicator");if(n.length===0)return;const o={hero:"Home",problem:"Pain Points","what-i-build":"Services",toolkit:"Toolkit",services:"Pricing",process:"Process",work:"Selected Work","work-list":"Archive",about:"About",faq:"FAQ",contact:"Contact"},e={root:null,rootMargin:"-20% 0px -60% 0px",threshold:0},a=new IntersectionObserver(c=>{c.forEach(i=>{if(i.isIntersecting){const l=i.target.getAttribute("id");if(t){const s=o[l]||l.charAt(0).toUpperCase()+l.slice(1);t.innerHTML=`Viewing ${s} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-3 w-3"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>`}r.forEach(s=>{const f=s.getAttribute("href");f===`#${l}`||l==="work-list"&&f==="#work"||l==="what-i-build"&&f==="#services"?(s.classList.add("bg-primary","text-primary-foreground","active"),s.classList.remove("text-foreground/80")):(s.classList.remove("bg-primary","text-primary-foreground","active"),s.classList.add("text-foreground/80"))})}})},e);n.forEach(c=>a.observe(c))}function re(){const n=document.getElementById("chatbot-toggle"),r=document.getElementById("chatbot-close"),t=document.getElementById("chatbot-window"),o=document.getElementById("chat-messages"),e=document.getElementById("chat-input"),a=document.getElementById("chat-form"),c=document.getElementById("chat-loading"),i=a==null?void 0:a.querySelector("button[type='submit']"),l=document.querySelectorAll(".chat-pill");if(!n||!t)return;const s=[{topic:"Full-Stack + Bubble",answer:"I architect the data model first, then ship UI in Bubble for visual surfaces and Next.js for anything that demands custom code."},{topic:"UI/UX Design",answer:"Design is structural — I work in Figma, then prototype directly in code. Token-first, component-driven."},{topic:"Custom Dev",answer:"Next.js + Supabase, TypeScript everywhere, edge-deployed. I write the code I'd want to inherit."}];d("assistant","Hey <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-hand inline-block mr-1 align-text-bottom text-primary'><path d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5'></path><path d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M6 15a4 4 0 0 0-4-4v0a2 2 0 0 0-2 2v6a8 8 0 0 0 8 8h5a6 6 0 0 0 6-6v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2'></path></svg> I'm the Emmanuel Twin. Ask me about how I build, what I charge, or anything else. Pick a starter or type a question."),n.addEventListener("click",()=>{t.classList.remove("hidden"),n.classList.add("opacity-0","pointer-events-none"),p()}),r.addEventListener("click",()=>{t.classList.add("hidden"),n.classList.remove("opacity-0","pointer-events-none")}),e.addEventListener("input",()=>{const m=e.value.trim().length>0;i.disabled=!m}),a.addEventListener("submit",m=>{m.preventDefault();const h=e.value.trim();h&&u(h)}),l.forEach(m=>{m.addEventListener("click",()=>{u(m.textContent)})});function d(m,h){const g=document.createElement("div");g.className=m==="user"?"flex justify-end":"flex justify-start";const y=m==="user",v=y?"bg-primary text-primary-foreground":"bg-foreground/[0.04] text-foreground border hairline",E=y?"rounded-2xl rounded-tr-none":"rounded-2xl rounded-tl-none";g.innerHTML=`
      <div class="max-w-[82%] px-4 py-3 text-sm leading-relaxed ${v} ${E}">
        ${h}
      </div>
    `,o.appendChild(g),p()}function u(m){d("user",m),e.value="",i.disabled=!0,e.disabled=!0,c.classList.remove("hidden"),p(),setTimeout(()=>{const h=m.toLowerCase();let g=s.find(v=>{const E=v.topic.toLowerCase().split(/[\s/+]+/)[0];return h.includes(E)||h.includes(v.topic.toLowerCase())});const y=g?g.answer:"I'd answer that personally — drop your details on the Contact page or pick a topic pill above and I'll route you to the right response.";c.classList.add("hidden"),e.disabled=!1,d("assistant",y),e.focus()},1400)}function p(){setTimeout(()=>{o.scrollTop=o.scrollHeight},50)}}function ae(){const n=document.querySelectorAll(".reveal");if(n.length===0)return;const r={root:null,rootMargin:"0px 0px -120px 0px",threshold:.05},t=new IntersectionObserver(o=>{o.forEach(e=>{e.isIntersecting&&(e.target.classList.add("reveal-active"),t.unobserve(e.target))})},r);n.forEach(o=>t.observe(o))}function ie(){const n=document.getElementById("chatbot-popup"),r=document.getElementById("chatbot-popup-dismiss"),t=document.getElementById("chatbot-popup-cta"),o=document.getElementById("chatbot-toggle"),e=document.getElementById("chatbot-window"),a=document.getElementById("chatbot-close");if(!n||!o)return;let c=!1,i=!1;if(!document.getElementById("popup-keyframe-style")){const u=document.createElement("style");u.id="popup-keyframe-style",u.textContent=`
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
    `,document.head.appendChild(u)}function l(){c||i||e&&!e.classList.contains("hidden")||(c=!0,n.style.animation="none",n.classList.remove("hidden"),n.offsetHeight,n.style.animation="popupIn 0.5s cubic-bezier(0.22,1,0.36,1) both",o.classList.add("pulse-hint"),setTimeout(()=>{i||s()},1e4))}function s(u=!1){if(!n.classList.contains("hidden")){if(o.classList.remove("pulse-hint"),u){n.classList.add("hidden");return}n.style.animation="popupOut 0.3s ease forwards",setTimeout(()=>n.classList.add("hidden"),290)}}function f(){i=!0,s(!0),e&&(e.classList.remove("hidden"),o.classList.add("opacity-0","pointer-events-none"))}const d=document.getElementById("what-i-build");if(d){const u=new IntersectionObserver(p=>{p.forEach(m=>{m.isIntersecting&&!c&&!i&&(l(),u.unobserve(m.target))})},{rootMargin:"0px 0px -25% 0px"});u.observe(d)}else{const u=()=>{if(c||i){window.removeEventListener("scroll",u);return}window.scrollY>400&&(l(),window.removeEventListener("scroll",u))};window.addEventListener("scroll",u,{passive:!0})}r&&r.addEventListener("click",u=>{u.stopPropagation(),i=!0,s()}),t&&t.addEventListener("click",u=>{u.stopPropagation(),f(),setTimeout(()=>{const p=document.getElementById("chat-input");p&&p.focus()},150)}),o.addEventListener("click",()=>{i=!0,s(!0)}),a&&a.addEventListener("click",()=>{o.classList.remove("pulse-hint")})}function se(){const n=document.getElementById("back-to-top");if(!n)return;let r=!1;window.addEventListener("scroll",()=>{const t=window.scrollY>400;t!==r&&(r=t,r?(n.classList.remove("opacity-0","pointer-events-none","translate-y-4"),n.classList.add("opacity-100","pointer-events-auto","translate-y-0")):(n.classList.add("opacity-0","pointer-events-none","translate-y-4"),n.classList.remove("opacity-100","pointer-events-auto","translate-y-0")))},{passive:!0}),n.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function ce(){const n=document.querySelector(".stats-grid");if(!n)return;const r=n.querySelectorAll("dt"),t=[];r.forEach(i=>{const s=i.textContent.trim().match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);if(s){const f=s[1],d=parseInt(s[2],10),u=s[3];t.push({el:i,prefix:f,targetVal:d,suffix:u}),i.textContent=`${f}0${u}`}});function o(i){return i===1?1:1-Math.pow(2,-10*i)}function e(i,l,s,f,d,u){const p=performance.now();function m(h){const g=h-p,y=Math.min(g/u,1),v=o(y),E=Math.floor(l+(s-l)*v);i.textContent=`${f}${E}${d}`,y<1?requestAnimationFrame(m):i.textContent=`${f}${s}${d}`}requestAnimationFrame(m)}const a={root:null,threshold:.1,rootMargin:"0px 0px -50px 0px"},c=new IntersectionObserver(i=>{i.forEach(l=>{l.isIntersecting&&(t.forEach(s=>{e(s.el,0,s.targetVal,s.prefix,s.suffix,2e3)}),c.unobserve(l.target))})},a);c.observe(n)}function le(){const n=document.getElementById("hero-loop-video");if(!n)return;const r={root:null,threshold:.1};new IntersectionObserver(o=>{o.forEach(e=>{e.isIntersecting?n.play().catch(()=>{}):n.pause()})},r).observe(n)}function de(){const n=document.getElementById("enhanced-contact-form");if(!n)return;const r=document.getElementById("contact-submit-btn"),t=document.getElementById("contact-btn-text"),o=document.getElementById("contact-btn-icon"),e=document.getElementById("contact-success"),a=document.getElementById("contact-error");n.addEventListener("submit",async c=>{c.preventDefault(),r&&(r.disabled=!0),t&&(t.textContent="Sending..."),o&&o.classList.add("animate-pulse"),e&&e.classList.add("hidden"),a&&a.classList.add("hidden");try{const i=new FormData(n);(await fetch(n.action,{method:"POST",body:i,headers:{Accept:"application/json"}})).ok?(n.reset(),e&&e.classList.remove("hidden"),t&&(t.textContent="Sent!")):(a&&a.classList.remove("hidden"),t&&(t.textContent="Send message"),r&&(r.disabled=!1))}catch{a&&a.classList.remove("hidden"),t&&(t.textContent="Send message"),r&&(r.disabled=!1)}finally{o&&o.classList.remove("animate-pulse")}})}function ue(){const n=document.getElementById("hero-loop-video"),r=document.getElementById("video-sound-toggle"),t=document.getElementById("video-sound-off"),o=document.getElementById("video-sound-on");!n||!r||r.addEventListener("click",e=>{e.stopPropagation();const a=n.muted;n.muted=!a,n.muted?(t.classList.remove("hidden"),o.classList.add("hidden")):(t.classList.add("hidden"),o.classList.remove("hidden"))})}
