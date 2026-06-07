(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();document.addEventListener("DOMContentLoaded",()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(N(),e){D();return}R(),Y(),X(),$(),z(),V(),H(),U(),W(),j(),G(),_()});function N(){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e)}function D(){document.querySelectorAll("#hero dl dt").forEach(t=>{t.style.transform="none"});const r=document.querySelector("#about");if(r){r.querySelectorAll(".char-rollup-target").forEach(i=>i.style.transform="none"),r.querySelectorAll(".space-y-6 > p").forEach(i=>{i.style.filter="none",i.style.opacity="1",i.style.transform="none"}),r.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span").forEach(i=>{i.style.opacity="1",i.style.transform="none"});const a=document.getElementById("about-portrait");a&&(a.style.opacity="1",a.style.transform="none");const c=document.getElementById("about-tagline-container");c&&(c.style.opacity="1",c.style.transform="none")}}function R(){const e=document.querySelector("#hero h1");if(!e)return;e.classList.add("clip-reveal");let r=0;const t=.06;function o(n){if(n.nodeType===Node.TEXT_NODE){const c=n.nodeValue.split(/(\s+)/),i=document.createDocumentFragment();c.forEach(m=>{if(m.trim().length>0){const s=document.createElement("span");s.className="animate-word",s.textContent=m,s.style.animationDelay=`${r*t}s`,i.appendChild(s),r++}else i.appendChild(document.createTextNode(m))}),n.parentNode.replaceChild(i,n)}else n.nodeType===Node.ELEMENT_NODE&&n.tagName!=="SVG"&&Array.from(n.childNodes).forEach(o)}Array.from(e.childNodes).forEach(o)}function Y(){const e=document.querySelector('header a[href="#hero"]');if(!e)return;const r=e.querySelector(".bg-primary"),t=e.querySelector(".text-primary");if(!t||!r)return;const o="Nocode",n="Savvy";let a=!1;e.addEventListener("mouseenter",()=>{if(a)return;a=!0;const c="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",i=performance.now(),m=600,s=30;function h(l){const d=l-i;let p="";for(let g=0;g<o.length;g++){const v=g*s;d>=m||d>=v+(m-o.length*s)?p+=o[g]:p+=c[Math.floor(Math.random()*c.length)]}let u="";for(let g=0;g<n.length;g++){const v=(o.length+g)*s;d>=m||d>=v+(m-(o.length+n.length)*s)?u+=n[g]:u+=c[Math.floor(Math.random()*c.length)]}let f=r.nextSibling;f&&f.nodeType===Node.TEXT_NODE&&(f.nodeValue=p),t.textContent=u,d<m?requestAnimationFrame(h):(f&&f.nodeType===Node.TEXT_NODE&&(f.nodeValue=o),t.textContent=n,a=!1)}requestAnimationFrame(h)})}function X(){const e=document.querySelectorAll("h1, h2, h3"),r=[];e.forEach(o=>{const n=o.textContent.trim();n.split(/\s+/).length<=3&&(o.classList.add("gradient-wipe"),o.setAttribute("data-text",n),r.push(o))});const t=new IntersectionObserver(o=>{o.forEach(n=>{n.isIntersecting&&(n.target.classList.add("wipe-active"),t.unobserve(n.target))})},{threshold:.5});r.forEach(o=>t.observe(o))}function $(){const e=document.getElementById("typewriter-text");if(!e)return;const r=["SaaS platforms that scale.","Bubble apps that don't break.","AI integrations that actually work.","Payment systems wired right.","MVPs shipped in 3 weeks.","The thing your business actually needs."];let t=0,o=0,n=!1;setTimeout(()=>{a()},1400);function a(){const c=r[t];n?(e.textContent=c.substring(0,o-1),o--,o===0?(n=!1,t=(t+1)%r.length,setTimeout(a,550)):setTimeout(a,30)):(e.textContent=c.substring(0,o+1),o++,o===c.length?(n=!0,setTimeout(a,1600)):setTimeout(a,55))}}function z(){const e=document.querySelectorAll(".underline-sweep-target");if(e.length===0)return;const r=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&(o.target.classList.add("sweep-active"),r.unobserve(o.target))})},{threshold:.3});e.forEach(t=>r.observe(t))}function V(){const e=document.querySelector("#about");if(!e)return;const r=e.querySelectorAll(".char-rollup-target"),t=[],o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";r.forEach(s=>{const h=s.textContent.trim();s.innerHTML="",s.classList.add("char-roll-container");const l=[];for(let d=0;d<h.length;d++){const p=h[d];if(p===" "){const u=document.createElement("span");u.className="char-roll-char",u.innerHTML="&nbsp;",s.appendChild(u)}else{const u=document.createElement("span");u.className="char-roll-col";const f=10;for(let v=0;v<f;v++){const y=document.createElement("span");y.className="char-roll-char",y.textContent=o[Math.floor(Math.random()*o.length)],u.appendChild(y)}const g=document.createElement("span");g.className="char-roll-char",g.textContent=p,u.appendChild(g),s.appendChild(u),l.push({col:u,index:d})}}t.push({columns:l,target:s})});const n=e.querySelectorAll(".space-y-6 > p");n.forEach(s=>s.classList.add("about-bio-p"));const a=e.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span");a.forEach(s=>s.classList.add("about-badge-item"));const c=document.getElementById("about-portrait"),i=new IntersectionObserver(s=>{s.forEach(h=>{if(h.isIntersecting){if(t.forEach(({columns:l})=>{l.forEach(({col:d,index:p})=>{setTimeout(()=>{d.style.transform=`translateY(-${10*1.2}em)`},p*35)})}),n.forEach((l,d)=>{setTimeout(()=>{l.classList.add("reveal-active")},d*180)}),a.forEach((l,d)=>{setTimeout(()=>{l.classList.add("reveal-active")},d*120)}),c){c.classList.add("reveal-active");const l=document.getElementById("about-tagline-container");l&&l.classList.add("reveal-active"),setTimeout(()=>{c.classList.add("portrait-pulse-active")},900)}i.unobserve(h.target)}})},{threshold:.15});i.observe(e),e.querySelectorAll(".about-magnetic-card").forEach(s=>{s.addEventListener("mousemove",h=>{const l=s.getBoundingClientRect(),d=l.left+l.width/2,p=l.top+l.height/2,u=h.clientX,f=h.clientY,g=u-d,v=f-p,y=g/l.width*16,E=v/l.height*16,L=Math.sqrt(y*y+E*E),x=8;let I=y,C=E;L>x&&(I=y/L*x,C=E/L*x),s.style.transition="none",s.style.transform=`translate(${I}px, ${C}px)`}),s.addEventListener("mouseleave",()=>{s.style.transition="transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",s.style.transform="translate(0px, 0px)"})})}function H(){const e=document.querySelectorAll("#work .grid a");if(e.length===0)return;e.forEach(t=>{t.classList.add("curtain-card");const o=document.createElement("div");o.className="curtain-overlay",t.appendChild(o)});const r=new IntersectionObserver(t=>{let o=0;t.forEach(n=>{if(n.isIntersecting){const a=n.target;setTimeout(()=>{a.classList.add("wipe-active")},o*120),o++,r.unobserve(a)}})},{threshold:.2});e.forEach(t=>r.observe(t))}function U(){const e=document.querySelectorAll("#problem .grid > div"),r=document.querySelectorAll("#what-i-build .grid > div");[...e,...r].forEach(o=>{o.classList.add("draw-border-card");const n=document.createElement("span");n.className="draw-border-line draw-border-top";const a=document.createElement("span");a.className="draw-border-line draw-border-right";const c=document.createElement("span");c.className="draw-border-line draw-border-bottom";const i=document.createElement("span");i.className="draw-border-line draw-border-left",o.appendChild(n),o.appendChild(a),o.appendChild(c),o.appendChild(i)})}function W(){const e=document.querySelector(".font-display.text-5xl"),r=document.querySelector(".font-display.text-3xl.text-primary"),t=document.querySelectorAll("input[type='range']");if(!e||!r||t.length<3)return;let o=0,n=0,a=!0;function c(l){return"$"+Math.round(l).toLocaleString()}function i(){const l=parseInt(t[0].value,10),d=parseInt(t[1].value,10),p=parseInt(t[2].value,10),u=l*d*p*52,f=u*.78;return{drain:u,recoverable:f}}function m(l=400){const{drain:d,recoverable:p}=i();s(e,o,d,l,c,' <span class="text-base text-muted-foreground">/ year</span>'),s(r,n,p,l,c,' <span class="text-base text-muted-foreground">/ year</span>'),o=d,n=p}function s(l,d,p,u,f,g){const v=performance.now();function y(E){const L=E-v,x=Math.min(L/u,1),I=x===1?1:1-Math.pow(2,-10*x),C=d+(p-d)*I;l.innerHTML=`${f(C)}${g}`,x<1?requestAnimationFrame(y):l.innerHTML=`${f(p)}${g}`}requestAnimationFrame(y)}t.forEach(l=>{l.addEventListener("input",()=>{m(400)})});const h=document.querySelector("#roi-calc")||document.querySelector("section[data-section='services'] + section");if(h){const l=new IntersectionObserver(d=>{d.forEach(p=>{if(p.isIntersecting&&a){a=!1;const{drain:u,recoverable:f}=i();o=u,n=f,s(e,0,u,1200,c,' <span class="text-base text-muted-foreground">/ year</span>'),s(r,0,f,1200,c,' <span class="text-base text-muted-foreground">/ year</span>'),l.unobserve(p.target)}})},{threshold:.1});l.observe(h)}}function j(){document.querySelectorAll(".faq-answer").forEach(r=>{const t=document.createElement("div");t.className="faq-answer-inner",t.innerHTML=r.innerHTML,r.innerHTML="",r.appendChild(t)})}function G(){const e=[document.querySelector("#toolkit .grid"),document.querySelector("#services .space-y-4"),document.querySelector("#process .rounded-2xl"),document.querySelector("#work-list tbody"),document.querySelector("#faq .space-y-4")||document.querySelector("#faq .border-t.hairline"),document.querySelector("#contact .grid")].filter(Boolean),r=new IntersectionObserver(t=>{t.forEach(o=>{if(o.isIntersecting){const n=o.target;n.querySelectorAll(".fade-up-item").forEach((c,i)=>{setTimeout(()=>{c.classList.add("fade-up-active")},i*80)}),r.unobserve(n)}})},{threshold:.1});e.forEach(t=>{Array.from(t.children).forEach(o=>{o.classList.add("fade-up-item")}),r.observe(t)})}function _(){const e=document.querySelector("section.border-y.hairline");if(!e)return;const r=e.querySelector(".flex");r&&(r.classList.remove("animate-[marquee_40s_linear_infinite]"),r.classList.add("marquee-row","marquee-left"),e.classList.add("marquee-container"))}let b=null,w=null,k=null,S=null,T=null,M="light",q=null;function B(e){M=e,b=document.getElementById("bg-canvas"),b||(b=document.createElement("canvas"),b.id="bg-canvas",b.style.position="fixed",b.style.inset="0",b.style.pointerEvents="none",b.style.zIndex="-1",document.body.prepend(b)),w=b.getContext("2d"),A(),window.removeEventListener("resize",A),window.addEventListener("resize",A),window.removeEventListener("mousemove",P),window.addEventListener("mousemove",P),window.removeEventListener("mouseleave",O),window.addEventListener("mouseleave",O),k&&cancelAnimationFrame(k),M==="dark"&&!q&&Q(),M==="light"?K():J()}function A(){b&&(b.width=window.innerWidth,b.height=window.innerHeight)}function P(e){S=e.clientX,T=e.clientY}function O(){S=null,T=null}function Q(){const e=document.createElement("canvas");e.width=128,e.height=128;const r=e.getContext("2d"),t=r.createImageData(128,128),o=t.data;for(let n=0;n<o.length;n+=4){const a=Math.floor(Math.random()*255);o[n]=a,o[n+1]=a,o[n+2]=a,o[n+3]=6}r.putImageData(t,0,0),q=w.createPattern(e,"repeat")}let F=[];function K(){F=[];const e=60;for(let t=0;t<e;t++)F.push({x:Math.random()*b.width,y:Math.random()*b.height,origX:0,origY:0,vx:(Math.random()>.5?1:-1)*(.15+Math.random()*.15),vy:(Math.random()>.5?1:-1)*(.15+Math.random()*.15),radius:1+Math.random()*1});function r(){w.clearRect(0,0,b.width,b.height),w.fillStyle="rgba(0, 0, 0, 0.04)",F.forEach(t=>{if(t.x+=t.vx,t.y+=t.vy,t.x<0&&(t.x=b.width),t.x>b.width&&(t.x=0),t.y<0&&(t.y=b.height),t.y>b.height&&(t.y=0),S!==null&&T!==null){const o=S-t.x,n=T-t.y;Math.sqrt(o*o+n*n)<80&&(t.x+=o*.02,t.y+=n*.02)}w.beginPath(),w.arc(t.x,t.y,t.radius,0,Math.PI*2),w.fill()}),k=requestAnimationFrame(r)}r()}function J(){let e=performance.now();function r(o){const n=(o-e)/1e3;w.clearRect(0,0,b.width,b.height);const a=b.width,c=b.height,i=a*.4,m=a*(.5+.3*Math.sin(2*Math.PI*n/18)),s=c*(.5+.2*Math.cos(2*Math.PI*n/18));t(m,s,i,"rgba(99, 60, 180, 0.12)");const h=a*.35,l=a*(.5-.25*Math.sin(2*Math.PI*n/24)),d=c*(.5-.2*Math.cos(2*Math.PI*n/24));t(l,d,h,"rgba(30, 80, 160, 0.10)");const p=a*.3,u=a*(.5+.2*Math.sin(2*Math.PI*n/20+Math.PI/4)),f=c*(.5+.2*Math.sin(2*Math.PI*n/20));t(u,f,p,"rgba(140, 60, 100, 0.08)");const g=1+.1*Math.sin(2*Math.PI*n/30),v=a*.45*g,y=a*.5,E=c*.5;t(y,E,v,"rgba(20, 100, 120, 0.07)"),q&&(w.fillStyle=q,w.fillRect(0,0,a,c)),k=requestAnimationFrame(r)}function t(o,n,a,c){if(a<=0)return;const i=w.createRadialGradient(o,n,0,o,n,a);i.addColorStop(0,c),i.addColorStop(1,"rgba(0, 0, 0, 0)"),w.fillStyle=i,w.beginPath(),w.arc(o,n,a,0,Math.PI*2),w.fill()}requestAnimationFrame(r)}document.addEventListener("DOMContentLoaded",()=>{Z(),ee(),te(),ne(),oe(),re(),se(),ce(),ue(),de(),ae(),ie(),le(),me()});window.addEventListener("click",()=>!0,{once:!0});window.addEventListener("keydown",()=>!0,{once:!0});window.addEventListener("scroll",()=>!0,{once:!0});window.addEventListener("touchstart",()=>!0,{once:!0});function Z(){const e=document.querySelectorAll("#theme-toggle"),r=document.querySelectorAll("#theme-sun-icon"),t=document.querySelectorAll("#theme-moon-icon");if(e.length===0)return;function o(c){c==="dark"?(r.forEach(i=>i.classList.remove("hidden")),t.forEach(i=>i.classList.add("hidden"))):(r.forEach(i=>i.classList.add("hidden")),t.forEach(i=>i.classList.remove("hidden")))}let n=document.documentElement.getAttribute("data-theme");n||(n=localStorage.getItem("ncs-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")),document.documentElement.setAttribute("data-theme",n),document.documentElement.classList.remove("dark","light"),document.documentElement.classList.add(n),o(n),B(n),setTimeout(()=>{document.documentElement.classList.remove("no-transition")},100);function a(c){const i=document.getElementById("bg-canvas");if(!i){B(c);return}i.style.transition="opacity 300ms ease",i.style.opacity="0",setTimeout(()=>{B(c),i.style.transition="opacity 400ms ease",i.style.opacity="1"},300)}e.forEach(c=>{c.addEventListener("click",()=>{document.documentElement.classList.add("theme-transitioning");const m=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",m),document.documentElement.classList.remove("dark","light"),document.documentElement.classList.add(m),localStorage.setItem("ncs-theme",m),o(m),a(m),setTimeout(()=>{document.documentElement.classList.remove("theme-transitioning")},600)})})}function ee(){const e=document.querySelectorAll(".faq-item");e.forEach(r=>{const t=r.querySelector(".faq-trigger");t&&t.addEventListener("click",()=>{const o=r.classList.contains("active");e.forEach(n=>{n.classList.remove("active")}),o||r.classList.add("active")})})}function te(){const e=document.getElementById("roi-hours"),r=document.getElementById("roi-cost"),t=document.getElementById("roi-team"),o=document.getElementById("roi-hours-label"),n=document.getElementById("roi-cost-label"),a=document.getElementById("roi-team-label"),c=document.getElementById("roi-drain-value"),i=document.getElementById("roi-recoverable-value");if(!e||!r||!t)return;function m(l){return"$"+Math.round(l).toLocaleString()}function s(l){const d=parseFloat(l.min)||0,p=parseFloat(l.max)||100,f=((parseFloat(l.value)||0)-d)/(p-d)*100;l.style.setProperty("--percent",f+"%")}function h(){const l=parseInt(e.value,10),d=parseInt(r.value,10),p=parseInt(t.value,10);o&&(o.textContent=l+" hrs"),n&&(n.textContent="$"+d+" / hr"),a&&(a.textContent=p+(p===1?" person":" people")),s(e),s(r),s(t);const u=l*d*p*52,f=u*.78;c&&(c.innerHTML=`${m(u)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`),i&&(i.innerHTML=`${m(f)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`)}[e,r,t].forEach(l=>{l.addEventListener("input",h)}),h()}function ne(){const e=document.querySelectorAll("section[id]"),r=document.querySelectorAll(".nav-link"),t=document.getElementById("active-section-indicator");if(e.length===0)return;const o={hero:"Home",problem:"Pain Points","what-i-build":"Services",toolkit:"Toolkit",services:"Pricing",process:"Process",work:"Selected Work","work-list":"Archive",about:"About",faq:"FAQ",contact:"Contact"},n={root:null,rootMargin:"-20% 0px -60% 0px",threshold:0},a=new IntersectionObserver(c=>{c.forEach(i=>{if(i.isIntersecting){const m=i.target.getAttribute("id");if(t){const s=o[m]||m.charAt(0).toUpperCase()+m.slice(1);t.innerHTML=`Viewing ${s} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-3 w-3"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>`}r.forEach(s=>{const h=s.getAttribute("href");h===`#${m}`||m==="work-list"&&h==="#work"||m==="what-i-build"&&h==="#services"?(s.classList.add("bg-primary","text-primary-foreground","active"),s.classList.remove("text-foreground/80")):(s.classList.remove("bg-primary","text-primary-foreground","active"),s.classList.add("text-foreground/80"))})}})},n);e.forEach(c=>a.observe(c))}function oe(){const e=document.getElementById("chatbot-toggle"),r=document.getElementById("chatbot-close"),t=document.getElementById("chatbot-window"),o=document.getElementById("chat-messages"),n=document.getElementById("chat-input"),a=document.getElementById("chat-form"),c=document.getElementById("chat-loading"),i=a==null?void 0:a.querySelector("button[type='submit']"),m=document.querySelectorAll(".chat-pill");if(!e||!t)return;const s=[{topic:"Full-Stack + Bubble",answer:"I architect the data model first, then ship UI in Bubble for visual surfaces and Next.js for anything that demands custom code."},{topic:"UI/UX Design",answer:"Design is structural — I work in Figma, then prototype directly in code. Token-first, component-driven."},{topic:"Custom Dev",answer:"Next.js + Supabase, TypeScript everywhere, edge-deployed. I write the code I'd want to inherit."}];l("assistant","Hey <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-hand inline-block mr-1 align-text-bottom text-primary'><path d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5'></path><path d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M6 15a4 4 0 0 0-4-4v0a2 2 0 0 0-2 2v6a8 8 0 0 0 8 8h5a6 6 0 0 0 6-6v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2'></path></svg> I'm the Emmanuel Twin. Ask me about how I build, what I charge, or anything else. Pick a starter or type a question."),e.addEventListener("click",()=>{t.classList.remove("hidden"),e.classList.add("opacity-0","pointer-events-none"),p()}),r.addEventListener("click",()=>{t.classList.add("hidden"),e.classList.remove("opacity-0","pointer-events-none")}),n.addEventListener("input",()=>{const u=n.value.trim().length>0;i.disabled=!u}),a.addEventListener("submit",u=>{u.preventDefault();const f=n.value.trim();f&&d(f)}),m.forEach(u=>{u.addEventListener("click",()=>{d(u.textContent)})});function l(u,f){const g=document.createElement("div");g.className=u==="user"?"flex justify-end":"flex justify-start";const v=u==="user",y=v?"bg-primary text-primary-foreground":"bg-foreground/[0.04] text-foreground border hairline",E=v?"rounded-2xl rounded-tr-none":"rounded-2xl rounded-tl-none";g.innerHTML=`
      <div class="max-w-[82%] px-4 py-3 text-sm leading-relaxed ${y} ${E}">
        ${f}
      </div>
    `,o.appendChild(g),p()}function d(u){l("user",u),n.value="",i.disabled=!0,n.disabled=!0,c.classList.remove("hidden"),p(),setTimeout(()=>{const f=u.toLowerCase();let g=s.find(y=>{const E=y.topic.toLowerCase().split(/[\s/+]+/)[0];return f.includes(E)||f.includes(y.topic.toLowerCase())});const v=g?g.answer:"I'd answer that personally — drop your details on the Contact page or pick a topic pill above and I'll route you to the right response.";c.classList.add("hidden"),n.disabled=!1,l("assistant",v),n.focus()},1400)}function p(){setTimeout(()=>{o.scrollTop=o.scrollHeight},50)}}function re(){const e=document.querySelectorAll(".reveal");if(e.length===0)return;const r={root:null,rootMargin:"0px 0px -120px 0px",threshold:.05},t=new IntersectionObserver(o=>{o.forEach(n=>{n.isIntersecting&&(n.target.classList.add("reveal-active"),t.unobserve(n.target))})},r);e.forEach(o=>t.observe(o))}function ae(){const e=document.getElementById("chatbot-popup"),r=document.getElementById("chatbot-popup-dismiss"),t=document.getElementById("chatbot-popup-cta"),o=document.getElementById("chatbot-toggle"),n=document.getElementById("chatbot-window"),a=document.getElementById("chatbot-close");if(!e||!o)return;let c=!1,i=!1;if(!document.getElementById("popup-keyframe-style")){const d=document.createElement("style");d.id="popup-keyframe-style",d.textContent=`
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
    `,document.head.appendChild(d)}function m(){c||i||n&&!n.classList.contains("hidden")||(c=!0,e.style.animation="none",e.classList.remove("hidden"),e.offsetHeight,e.style.animation="popupIn 0.5s cubic-bezier(0.22,1,0.36,1) both",o.classList.add("pulse-hint"),setTimeout(()=>{i||s()},1e4))}function s(d=!1){if(!e.classList.contains("hidden")){if(o.classList.remove("pulse-hint"),d){e.classList.add("hidden");return}e.style.animation="popupOut 0.3s ease forwards",setTimeout(()=>e.classList.add("hidden"),290)}}function h(){i=!0,s(!0),n&&(n.classList.remove("hidden"),o.classList.add("opacity-0","pointer-events-none"))}const l=document.getElementById("what-i-build");if(l){const d=new IntersectionObserver(p=>{p.forEach(u=>{u.isIntersecting&&!c&&!i&&(m(),d.unobserve(u.target))})},{rootMargin:"0px 0px -25% 0px"});d.observe(l)}else{const d=()=>{if(c||i){window.removeEventListener("scroll",d);return}window.scrollY>400&&(m(),window.removeEventListener("scroll",d))};window.addEventListener("scroll",d,{passive:!0})}r&&r.addEventListener("click",d=>{d.stopPropagation(),i=!0,s()}),t&&t.addEventListener("click",d=>{d.stopPropagation(),h(),setTimeout(()=>{const p=document.getElementById("chat-input");p&&p.focus()},150)}),o.addEventListener("click",()=>{i=!0,s(!0)}),a&&a.addEventListener("click",()=>{o.classList.remove("pulse-hint")})}function ie(){const e=document.getElementById("back-to-top");if(!e)return;let r=!1;window.addEventListener("scroll",()=>{const t=window.scrollY>400;t!==r&&(r=t,r?(e.classList.remove("opacity-0","pointer-events-none","translate-y-4"),e.classList.add("opacity-100","pointer-events-auto","translate-y-0")):(e.classList.add("opacity-0","pointer-events-none","translate-y-4"),e.classList.remove("opacity-100","pointer-events-auto","translate-y-0")))},{passive:!0}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function se(){const e=document.querySelector(".stats-grid");if(!e)return;const r=e.querySelectorAll("dt"),t=[];r.forEach(i=>{const s=i.textContent.trim().match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);if(s){const h=s[1],l=parseInt(s[2],10),d=s[3];t.push({el:i,prefix:h,targetVal:l,suffix:d}),i.textContent=`${h}0${d}`}});function o(i){return i===1?1:1-Math.pow(2,-10*i)}function n(i,m,s,h,l,d){const p=performance.now();function u(f){const g=f-p,v=Math.min(g/d,1),y=o(v),E=Math.floor(m+(s-m)*y);i.textContent=`${h}${E}${l}`,v<1?requestAnimationFrame(u):i.textContent=`${h}${s}${l}`}requestAnimationFrame(u)}const a={root:null,threshold:.1,rootMargin:"0px 0px -50px 0px"},c=new IntersectionObserver(i=>{i.forEach(m=>{m.isIntersecting&&(t.forEach(s=>{n(s.el,0,s.targetVal,s.prefix,s.suffix,2e3)}),c.unobserve(m.target))})},a);c.observe(e)}function ce(){const e=document.getElementById("hero-loop-video");if(!e)return;const r={root:null,threshold:.1};new IntersectionObserver(o=>{o.forEach(n=>{n.isIntersecting?e.play().catch(()=>{}):e.pause()})},r).observe(e)}function le(){const e=document.getElementById("enhanced-contact-form");if(!e)return;const r=document.getElementById("contact-submit-btn"),t=document.getElementById("contact-btn-text"),o=document.getElementById("contact-btn-icon"),n=document.getElementById("contact-success"),a=document.getElementById("contact-error");e.addEventListener("submit",async c=>{c.preventDefault(),r&&(r.disabled=!0),t&&(t.textContent="Sending..."),o&&o.classList.add("animate-pulse"),n&&n.classList.add("hidden"),a&&a.classList.add("hidden");try{const i=new FormData(e);(await fetch(e.action,{method:"POST",body:i,headers:{Accept:"application/json"}})).ok?(e.reset(),n&&n.classList.remove("hidden"),t&&(t.textContent="Sent!")):(a&&a.classList.remove("hidden"),t&&(t.textContent="Send message"),r&&(r.disabled=!1))}catch{a&&a.classList.remove("hidden"),t&&(t.textContent="Send message"),r&&(r.disabled=!1)}finally{o&&o.classList.remove("animate-pulse")}})}function de(){const e=document.getElementById("hero-loop-video"),r=document.getElementById("video-sound-toggle"),t=document.getElementById("video-sound-off"),o=document.getElementById("video-sound-on");!e||!r||r.addEventListener("click",n=>{n.stopPropagation();const a=e.muted;e.muted=!a,e.muted?(t.classList.remove("hidden"),o.classList.add("hidden")):(t.classList.add("hidden"),o.classList.remove("hidden"))})}function ue(){const e=document.getElementById("hero-loop-video"),r=document.getElementById("video-play-toggle"),t=document.getElementById("video-pause-icon"),o=document.getElementById("video-play-icon");!e||!r||(r.addEventListener("click",n=>{n.stopPropagation(),e.paused?e.play().then(()=>{t.classList.remove("hidden"),o.classList.add("hidden")}).catch(a=>{console.error("Video play failed:",a)}):(e.pause(),t.classList.add("hidden"),o.classList.remove("hidden"))}),e.addEventListener("play",()=>{t.classList.remove("hidden"),o.classList.add("hidden")}),e.addEventListener("pause",()=>{t.classList.add("hidden"),o.classList.remove("hidden")}))}function me(){const e=document.getElementById("about-portrait-wrapper");e&&e.addEventListener("click",()=>{e.classList.toggle("touch-active")})}
