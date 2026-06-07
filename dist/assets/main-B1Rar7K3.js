(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();document.addEventListener("DOMContentLoaded",()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(N(),e){D();return}R(),Y(),z(),X(),$(),H(),V(),W(),U(),j(),G(),_()});function N(){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e)}function D(){document.querySelectorAll("#hero dl dt").forEach(n=>{n.style.transform="none"});const r=document.querySelector("#about");if(r){r.querySelectorAll(".char-rollup-target").forEach(i=>i.style.transform="none"),r.querySelectorAll(".space-y-6 > p").forEach(i=>{i.style.filter="none",i.style.opacity="1",i.style.transform="none"}),r.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span").forEach(i=>{i.style.opacity="1",i.style.transform="none"});const a=document.getElementById("about-portrait");a&&(a.style.opacity="1",a.style.transform="none");const c=document.getElementById("about-tagline-container");c&&(c.style.opacity="1",c.style.transform="none")}}function R(){const e=document.querySelector("#hero h1");if(!e)return;e.classList.add("clip-reveal");let r=0;const n=.06;function o(t){if(t.nodeType===Node.TEXT_NODE){const c=t.nodeValue.split(/(\s+)/),i=document.createDocumentFragment();c.forEach(d=>{if(d.trim().length>0){const s=document.createElement("span");s.className="animate-word",s.textContent=d,s.style.animationDelay=`${r*n}s`,i.appendChild(s),r++}else i.appendChild(document.createTextNode(d))}),t.parentNode.replaceChild(i,t)}else t.nodeType===Node.ELEMENT_NODE&&t.tagName!=="SVG"&&Array.from(t.childNodes).forEach(o)}Array.from(e.childNodes).forEach(o)}function Y(){const e=document.querySelector('header a[href="#hero"]');if(!e)return;const r=e.querySelector(".bg-primary"),n=e.querySelector(".text-primary");if(!n||!r)return;const o="Nocode",t="Savvy";let a=!1;e.addEventListener("mouseenter",()=>{if(a)return;a=!0;const c="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",i=performance.now(),d=600,s=30;function f(l){const p=l-i;let u="";for(let g=0;g<o.length;g++){const y=g*s;p>=d||p>=y+(d-o.length*s)?u+=o[g]:u+=c[Math.floor(Math.random()*c.length)]}let m="";for(let g=0;g<t.length;g++){const y=(o.length+g)*s;p>=d||p>=y+(d-(o.length+t.length)*s)?m+=t[g]:m+=c[Math.floor(Math.random()*c.length)]}let h=r.nextSibling;h&&h.nodeType===Node.TEXT_NODE&&(h.nodeValue=u),n.textContent=m,p<d?requestAnimationFrame(f):(h&&h.nodeType===Node.TEXT_NODE&&(h.nodeValue=o),n.textContent=t,a=!1)}requestAnimationFrame(f)})}function z(){const e=document.querySelectorAll("h1, h2, h3"),r=[];e.forEach(o=>{const t=o.textContent.trim();t.split(/\s+/).length<=3&&(o.classList.add("gradient-wipe"),o.setAttribute("data-text",t),r.push(o))});const n=new IntersectionObserver(o=>{o.forEach(t=>{t.isIntersecting&&(t.target.classList.add("wipe-active"),n.unobserve(t.target))})},{threshold:.5});r.forEach(o=>n.observe(o))}function X(){const e=document.getElementById("typewriter-text");if(!e)return;const r=["SaaS platforms that scale.","Bubble apps that don't break.","AI integrations that actually work.","Payment systems wired right.","MVPs shipped in 3 weeks.","The thing your business actually needs."];let n=0,o=0,t=!1;setTimeout(()=>{a()},1400);function a(){const c=r[n];t?(e.textContent=c.substring(0,o-1),o--,o===0?(t=!1,n=(n+1)%r.length,setTimeout(a,550)):setTimeout(a,30)):(e.textContent=c.substring(0,o+1),o++,o===c.length?(t=!0,setTimeout(a,1600)):setTimeout(a,55))}}function $(){const e=document.querySelectorAll(".underline-sweep-target");if(e.length===0)return;const r=new IntersectionObserver(n=>{n.forEach(o=>{o.isIntersecting&&(o.target.classList.add("sweep-active"),r.unobserve(o.target))})},{threshold:.3});e.forEach(n=>r.observe(n))}function H(){const e=document.querySelector("#about");if(!e)return;const r=e.querySelectorAll(".char-rollup-target"),n=[],o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";r.forEach(s=>{const f=s.textContent.trim();s.innerHTML="",s.classList.add("char-roll-container");const l=[];for(let p=0;p<f.length;p++){const u=f[p];if(u===" "){const m=document.createElement("span");m.className="char-roll-char",m.innerHTML="&nbsp;",s.appendChild(m)}else{const m=document.createElement("span");m.className="char-roll-col";const h=10;for(let y=0;y<h;y++){const v=document.createElement("span");v.className="char-roll-char",v.textContent=o[Math.floor(Math.random()*o.length)],m.appendChild(v)}const g=document.createElement("span");g.className="char-roll-char",g.textContent=u,m.appendChild(g),s.appendChild(m),l.push({col:m,index:p})}}n.push({columns:l,target:s})});const t=e.querySelectorAll(".space-y-6 > p");t.forEach(s=>s.classList.add("about-bio-p"));const a=e.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span");a.forEach(s=>s.classList.add("about-badge-item"));const c=document.getElementById("about-portrait"),i=new IntersectionObserver(s=>{s.forEach(f=>{if(f.isIntersecting){if(n.forEach(({columns:l})=>{l.forEach(({col:p,index:u})=>{setTimeout(()=>{p.style.transform=`translateY(-${10*1.2}em)`},u*35)})}),t.forEach((l,p)=>{setTimeout(()=>{l.classList.add("reveal-active")},p*180)}),a.forEach((l,p)=>{setTimeout(()=>{l.classList.add("reveal-active")},p*120)}),c){c.classList.add("reveal-active");const l=document.getElementById("about-tagline-container");l&&l.classList.add("reveal-active"),setTimeout(()=>{c.classList.add("portrait-pulse-active")},900)}i.unobserve(f.target)}})},{threshold:.15});i.observe(e),e.querySelectorAll(".about-magnetic-card").forEach(s=>{s.addEventListener("mousemove",f=>{const l=s.getBoundingClientRect(),p=l.left+l.width/2,u=l.top+l.height/2,m=f.clientX,h=f.clientY,g=m-p,y=h-u,v=g/l.width*16,E=y/l.height*16,L=Math.sqrt(v*v+E*E),x=8;let I=v,C=E;L>x&&(I=v/L*x,C=E/L*x),s.style.transition="none",s.style.transform=`translate(${I}px, ${C}px)`}),s.addEventListener("mouseleave",()=>{s.style.transition="transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",s.style.transform="translate(0px, 0px)"})})}function V(){const e=document.querySelectorAll("#work .grid a");if(e.length===0)return;e.forEach(n=>{n.classList.add("curtain-card");const o=document.createElement("div");o.className="curtain-overlay",n.appendChild(o)});const r=new IntersectionObserver(n=>{let o=0;n.forEach(t=>{if(t.isIntersecting){const a=t.target;setTimeout(()=>{a.classList.add("wipe-active")},o*120),o++,r.unobserve(a)}})},{threshold:.2});e.forEach(n=>r.observe(n))}function W(){const e=document.querySelectorAll("#problem .grid > div"),r=document.querySelectorAll("#what-i-build .grid > div");[...e,...r].forEach(o=>{o.classList.add("draw-border-card");const t=document.createElement("span");t.className="draw-border-line draw-border-top";const a=document.createElement("span");a.className="draw-border-line draw-border-right";const c=document.createElement("span");c.className="draw-border-line draw-border-bottom";const i=document.createElement("span");i.className="draw-border-line draw-border-left",o.appendChild(t),o.appendChild(a),o.appendChild(c),o.appendChild(i)})}function U(){const e=document.querySelector(".font-display.text-5xl"),r=document.querySelector(".font-display.text-3xl.text-primary"),n=document.querySelectorAll("input[type='range']");if(!e||!r||n.length<3)return;let o=0,t=0,a=!0;function c(l){return"$"+Math.round(l).toLocaleString()}function i(){const l=parseInt(n[0].value,10),p=parseInt(n[1].value,10),u=parseInt(n[2].value,10),m=l*p*u*52,h=m*.78;return{drain:m,recoverable:h}}function d(l=400){const{drain:p,recoverable:u}=i();s(e,o,p,l,c,' <span class="text-base text-muted-foreground">/ year</span>'),s(r,t,u,l,c,' <span class="text-base text-muted-foreground">/ year</span>'),o=p,t=u}function s(l,p,u,m,h,g){const y=performance.now();function v(E){const L=E-y,x=Math.min(L/m,1),I=x===1?1:1-Math.pow(2,-10*x),C=p+(u-p)*I;l.innerHTML=`${h(C)}${g}`,x<1?requestAnimationFrame(v):l.innerHTML=`${h(u)}${g}`}requestAnimationFrame(v)}n.forEach(l=>{l.addEventListener("input",()=>{d(400)})});const f=document.querySelector("#roi-calc")||document.querySelector("section[data-section='services'] + section");if(f){const l=new IntersectionObserver(p=>{p.forEach(u=>{if(u.isIntersecting&&a){a=!1;const{drain:m,recoverable:h}=i();o=m,t=h,s(e,0,m,1200,c,' <span class="text-base text-muted-foreground">/ year</span>'),s(r,0,h,1200,c,' <span class="text-base text-muted-foreground">/ year</span>'),l.unobserve(u.target)}})},{threshold:.1});l.observe(f)}}function j(){document.querySelectorAll(".faq-answer").forEach(r=>{const n=document.createElement("div");n.className="faq-answer-inner",n.innerHTML=r.innerHTML,r.innerHTML="",r.appendChild(n)})}function G(){const e=[document.querySelector("#toolkit .grid"),document.querySelector("#services .space-y-4"),document.querySelector("#process .rounded-2xl"),document.querySelector("#work-list tbody"),document.querySelector("#faq .space-y-4")||document.querySelector("#faq .border-t.hairline"),document.querySelector("#contact .grid")].filter(Boolean),r=new IntersectionObserver(n=>{n.forEach(o=>{if(o.isIntersecting){const t=o.target;t.querySelectorAll(".fade-up-item").forEach((c,i)=>{setTimeout(()=>{c.classList.add("fade-up-active")},i*80)}),r.unobserve(t)}})},{threshold:.1});e.forEach(n=>{Array.from(n.children).forEach(o=>{o.classList.add("fade-up-item")}),r.observe(n)})}function _(){const e=document.querySelector("section.border-y.hairline");if(!e)return;const r=e.querySelector(".flex");r&&(r.classList.remove("animate-[marquee_40s_linear_infinite]"),r.classList.add("marquee-row","marquee-left"),e.classList.add("marquee-container"))}let b=null,w=null,k=null,S=null,T=null,M="light",q=null;function A(e){M=e,b=document.getElementById("bg-canvas"),b||(b=document.createElement("canvas"),b.id="bg-canvas",b.style.position="fixed",b.style.inset="0",b.style.pointerEvents="none",b.style.zIndex="-1",document.body.prepend(b)),w=b.getContext("2d"),B(),window.removeEventListener("resize",B),window.addEventListener("resize",B),window.removeEventListener("mousemove",O),window.addEventListener("mousemove",O),window.removeEventListener("mouseleave",P),window.addEventListener("mouseleave",P),k&&cancelAnimationFrame(k),M==="dark"&&!q&&Q(),M==="light"?K():J()}function B(){b&&(b.width=window.innerWidth,b.height=window.innerHeight)}function O(e){S=e.clientX,T=e.clientY}function P(){S=null,T=null}function Q(){const e=document.createElement("canvas");e.width=128,e.height=128;const r=e.getContext("2d"),n=r.createImageData(128,128),o=n.data;for(let t=0;t<o.length;t+=4){const a=Math.floor(Math.random()*255);o[t]=a,o[t+1]=a,o[t+2]=a,o[t+3]=6}r.putImageData(n,0,0),q=w.createPattern(e,"repeat")}let F=[];function K(){F=[];const e=60;for(let n=0;n<e;n++)F.push({x:Math.random()*b.width,y:Math.random()*b.height,origX:0,origY:0,vx:(Math.random()>.5?1:-1)*(.15+Math.random()*.15),vy:(Math.random()>.5?1:-1)*(.15+Math.random()*.15),radius:1+Math.random()*1});function r(){w.clearRect(0,0,b.width,b.height),w.fillStyle="rgba(0, 0, 0, 0.04)",F.forEach(n=>{if(n.x+=n.vx,n.y+=n.vy,n.x<0&&(n.x=b.width),n.x>b.width&&(n.x=0),n.y<0&&(n.y=b.height),n.y>b.height&&(n.y=0),S!==null&&T!==null){const o=S-n.x,t=T-n.y;Math.sqrt(o*o+t*t)<80&&(n.x+=o*.02,n.y+=t*.02)}w.beginPath(),w.arc(n.x,n.y,n.radius,0,Math.PI*2),w.fill()}),k=requestAnimationFrame(r)}r()}function J(){let e=performance.now();function r(o){const t=(o-e)/1e3;w.clearRect(0,0,b.width,b.height);const a=b.width,c=b.height,i=a*.4,d=a*(.5+.3*Math.sin(2*Math.PI*t/18)),s=c*(.5+.2*Math.cos(2*Math.PI*t/18));n(d,s,i,"rgba(99, 60, 180, 0.12)");const f=a*.35,l=a*(.5-.25*Math.sin(2*Math.PI*t/24)),p=c*(.5-.2*Math.cos(2*Math.PI*t/24));n(l,p,f,"rgba(30, 80, 160, 0.10)");const u=a*.3,m=a*(.5+.2*Math.sin(2*Math.PI*t/20+Math.PI/4)),h=c*(.5+.2*Math.sin(2*Math.PI*t/20));n(m,h,u,"rgba(140, 60, 100, 0.08)");const g=1+.1*Math.sin(2*Math.PI*t/30),y=a*.45*g,v=a*.5,E=c*.5;n(v,E,y,"rgba(20, 100, 120, 0.07)"),q&&(w.fillStyle=q,w.fillRect(0,0,a,c)),k=requestAnimationFrame(r)}function n(o,t,a,c){if(a<=0)return;const i=w.createRadialGradient(o,t,0,o,t,a);i.addColorStop(0,c),i.addColorStop(1,"rgba(0, 0, 0, 0)"),w.fillStyle=i,w.beginPath(),w.arc(o,t,a,0,Math.PI*2),w.fill()}requestAnimationFrame(r)}document.addEventListener("DOMContentLoaded",()=>{Z(),ee(),te(),ne(),oe(),re(),ae(),ce(),le(),ie(),se(),de(),ue()});window.addEventListener("click",()=>!0,{once:!0});window.addEventListener("keydown",()=>!0,{once:!0});window.addEventListener("scroll",()=>!0,{once:!0});window.addEventListener("touchstart",()=>!0,{once:!0});function Z(){const e=document.querySelectorAll("#theme-toggle"),r=document.querySelectorAll("#theme-sun-icon"),n=document.querySelectorAll("#theme-moon-icon");if(e.length===0)return;function o(c){c==="dark"?(r.forEach(i=>i.classList.remove("hidden")),n.forEach(i=>i.classList.add("hidden"))):(r.forEach(i=>i.classList.add("hidden")),n.forEach(i=>i.classList.remove("hidden")))}let t=document.documentElement.getAttribute("data-theme");t||(t=localStorage.getItem("ncs-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")),document.documentElement.setAttribute("data-theme",t),document.documentElement.classList.remove("dark","light"),document.documentElement.classList.add(t),o(t),A(t),setTimeout(()=>{document.documentElement.classList.remove("no-transition")},100);function a(c){const i=document.getElementById("bg-canvas");if(!i){A(c);return}i.style.transition="opacity 300ms ease",i.style.opacity="0",setTimeout(()=>{A(c),i.style.transition="opacity 400ms ease",i.style.opacity="1"},300)}e.forEach(c=>{c.addEventListener("click",()=>{document.documentElement.classList.add("theme-transitioning");const d=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",d),document.documentElement.classList.remove("dark","light"),document.documentElement.classList.add(d),localStorage.setItem("ncs-theme",d),o(d),a(d),setTimeout(()=>{document.documentElement.classList.remove("theme-transitioning")},600)})})}function ee(){const e=document.querySelectorAll(".faq-item");e.forEach(r=>{const n=r.querySelector(".faq-trigger");n&&n.addEventListener("click",()=>{const o=r.classList.contains("active");e.forEach(t=>{t.classList.remove("active")}),o||r.classList.add("active")})})}function te(){const e=document.getElementById("roi-hours"),r=document.getElementById("roi-cost"),n=document.getElementById("roi-team"),o=document.getElementById("roi-hours-label"),t=document.getElementById("roi-cost-label"),a=document.getElementById("roi-team-label"),c=document.getElementById("roi-drain-value"),i=document.getElementById("roi-recoverable-value");if(!e||!r||!n)return;function d(l){return"$"+Math.round(l).toLocaleString()}function s(l){const p=parseFloat(l.min)||0,u=parseFloat(l.max)||100,h=((parseFloat(l.value)||0)-p)/(u-p)*100;l.style.setProperty("--percent",h+"%")}function f(){const l=parseInt(e.value,10),p=parseInt(r.value,10),u=parseInt(n.value,10);o&&(o.textContent=l+" hrs"),t&&(t.textContent="$"+p+" / hr"),a&&(a.textContent=u+(u===1?" person":" people")),s(e),s(r),s(n);const m=l*p*u*52,h=m*.78;c&&(c.innerHTML=`${d(m)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`),i&&(i.innerHTML=`${d(h)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`)}[e,r,n].forEach(l=>{l.addEventListener("input",f)}),f()}function ne(){const e=document.getElementById("testimonial-slider");if(!e)return;const r=e.querySelectorAll(".testimonial-slide"),n=document.getElementById("testimonial-prev"),o=document.getElementById("testimonial-next"),t=document.querySelectorAll("#testimonial-dots button");if(r.length===0)return;let a=0,c=!1;function i(d){if(c||d===a)return;c=!0;const s=r[a],f=r[d];s.style.opacity="0",t[a].classList.remove("bg-primary","w-4"),t[a].classList.add("bg-foreground/25"),setTimeout(()=>{s.classList.add("hidden"),f.classList.remove("hidden"),f.offsetHeight,f.style.opacity="1",t[d].classList.remove("bg-foreground/25"),t[d].classList.add("bg-primary","w-4"),a=d,c=!1},300)}n==null||n.addEventListener("click",()=>{let d=a-1;d<0&&(d=r.length-1),i(d)}),o==null||o.addEventListener("click",()=>{let d=a+1;d>=r.length&&(d=0),i(d)}),t.forEach((d,s)=>{d.addEventListener("click",()=>{i(s)})}),r.forEach((d,s)=>{d.style.transition="opacity 0.3s ease",s!==0?d.style.opacity="0":d.style.opacity="1"})}function oe(){const e=document.querySelectorAll("section[id]"),r=document.querySelectorAll(".nav-link"),n=document.getElementById("active-section-indicator");if(e.length===0)return;const o={hero:"Home",problem:"Pain Points","what-i-build":"Services",toolkit:"Toolkit",services:"Pricing",process:"Process",work:"Selected Work","work-list":"Archive",about:"About",faq:"FAQ",contact:"Contact"},t={root:null,rootMargin:"-20% 0px -60% 0px",threshold:0},a=new IntersectionObserver(c=>{c.forEach(i=>{if(i.isIntersecting){const d=i.target.getAttribute("id");if(n){const s=o[d]||d.charAt(0).toUpperCase()+d.slice(1);n.innerHTML=`Viewing ${s} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-3 w-3"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>`}r.forEach(s=>{const f=s.getAttribute("href");f===`#${d}`||d==="work-list"&&f==="#work"||d==="what-i-build"&&f==="#services"?(s.classList.add("bg-primary","text-primary-foreground","active"),s.classList.remove("text-foreground/80")):(s.classList.remove("bg-primary","text-primary-foreground","active"),s.classList.add("text-foreground/80"))})}})},t);e.forEach(c=>a.observe(c))}function re(){const e=document.getElementById("chatbot-toggle"),r=document.getElementById("chatbot-close"),n=document.getElementById("chatbot-window"),o=document.getElementById("chat-messages"),t=document.getElementById("chat-input"),a=document.getElementById("chat-form"),c=document.getElementById("chat-loading"),i=a==null?void 0:a.querySelector("button[type='submit']"),d=document.querySelectorAll(".chat-pill");if(!e||!n)return;const s=[{topic:"Full-Stack + Bubble",answer:"I architect the data model first, then ship UI in Bubble for visual surfaces and Next.js for anything that demands custom code."},{topic:"UI/UX Design",answer:"Design is structural — I work in Figma, then prototype directly in code. Token-first, component-driven."},{topic:"Custom Dev",answer:"Next.js + Supabase, TypeScript everywhere, edge-deployed. I write the code I'd want to inherit."}];l("assistant","Hey <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-hand inline-block mr-1 align-text-bottom text-primary'><path d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5'></path><path d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M6 15a4 4 0 0 0-4-4v0a2 2 0 0 0-2 2v6a8 8 0 0 0 8 8h5a6 6 0 0 0 6-6v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2'></path></svg> I'm the Emmanuel Twin. Ask me about how I build, what I charge, or anything else. Pick a starter or type a question."),e.addEventListener("click",()=>{n.classList.remove("hidden"),e.classList.add("opacity-0","pointer-events-none"),u()}),r.addEventListener("click",()=>{n.classList.add("hidden"),e.classList.remove("opacity-0","pointer-events-none")}),t.addEventListener("input",()=>{const m=t.value.trim().length>0;i.disabled=!m}),a.addEventListener("submit",m=>{m.preventDefault();const h=t.value.trim();h&&p(h)}),d.forEach(m=>{m.addEventListener("click",()=>{p(m.textContent)})});function l(m,h){const g=document.createElement("div");g.className=m==="user"?"flex justify-end":"flex justify-start";const y=m==="user",v=y?"bg-primary text-primary-foreground":"bg-foreground/[0.04] text-foreground border hairline",E=y?"rounded-2xl rounded-tr-none":"rounded-2xl rounded-tl-none";g.innerHTML=`
      <div class="max-w-[82%] px-4 py-3 text-sm leading-relaxed ${v} ${E}">
        ${h}
      </div>
    `,o.appendChild(g),u()}function p(m){l("user",m),t.value="",i.disabled=!0,t.disabled=!0,c.classList.remove("hidden"),u(),setTimeout(()=>{const h=m.toLowerCase();let g=s.find(v=>{const E=v.topic.toLowerCase().split(/[\s/+]+/)[0];return h.includes(E)||h.includes(v.topic.toLowerCase())});const y=g?g.answer:"I'd answer that personally — drop your details on the Contact page or pick a topic pill above and I'll route you to the right response.";c.classList.add("hidden"),t.disabled=!1,l("assistant",y),t.focus()},1400)}function u(){setTimeout(()=>{o.scrollTop=o.scrollHeight},50)}}function ae(){const e=document.querySelectorAll(".reveal");if(e.length===0)return;const r={root:null,rootMargin:"0px 0px -120px 0px",threshold:.05},n=new IntersectionObserver(o=>{o.forEach(t=>{t.isIntersecting&&(t.target.classList.add("reveal-active"),n.unobserve(t.target))})},r);e.forEach(o=>n.observe(o))}function ie(){const e=document.getElementById("chatbot-popup"),r=document.getElementById("chatbot-popup-dismiss"),n=document.getElementById("chatbot-popup-cta"),o=document.getElementById("chatbot-toggle"),t=document.getElementById("chatbot-window"),a=document.getElementById("chatbot-close");if(!e||!o)return;let c=!1,i=!1;if(!document.getElementById("popup-keyframe-style")){const u=document.createElement("style");u.id="popup-keyframe-style",u.textContent=`
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
    `,document.head.appendChild(u)}function d(){c||i||t&&!t.classList.contains("hidden")||(c=!0,e.style.animation="none",e.classList.remove("hidden"),e.offsetHeight,e.style.animation="popupIn 0.5s cubic-bezier(0.22,1,0.36,1) both",o.classList.add("pulse-hint"),setTimeout(()=>{i||s()},1e4))}function s(u=!1){if(!e.classList.contains("hidden")){if(o.classList.remove("pulse-hint"),u){e.classList.add("hidden");return}e.style.animation="popupOut 0.3s ease forwards",setTimeout(()=>e.classList.add("hidden"),290)}}function f(){i=!0,s(!0),t&&(t.classList.remove("hidden"),o.classList.add("opacity-0","pointer-events-none"))}let l=null;const p=document.getElementById("what-i-build");window.addEventListener("scroll",()=>{if(c||i)return;let u=!1;p?u=p.getBoundingClientRect().top<=window.innerHeight*.75:u=window.scrollY>400,u?l||(l=setTimeout(d,700)):(clearTimeout(l),l=null)},{passive:!0}),r&&r.addEventListener("click",u=>{u.stopPropagation(),i=!0,s()}),n&&n.addEventListener("click",u=>{u.stopPropagation(),f(),setTimeout(()=>{const m=document.getElementById("chat-input");m&&m.focus()},150)}),o.addEventListener("click",()=>{i=!0,s(!0)}),a&&a.addEventListener("click",()=>{o.classList.remove("pulse-hint")})}function se(){const e=document.getElementById("back-to-top");e&&(window.addEventListener("scroll",()=>{window.scrollY>400?(e.classList.remove("opacity-0","pointer-events-none","translate-y-4"),e.classList.add("opacity-100","pointer-events-auto","translate-y-0")):(e.classList.add("opacity-0","pointer-events-none","translate-y-4"),e.classList.remove("opacity-100","pointer-events-auto","translate-y-0"))},{passive:!0}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}))}function ce(){const e=document.querySelector(".stats-grid");if(!e)return;const r=e.querySelectorAll("dt"),n=[];r.forEach(i=>{const s=i.textContent.trim().match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);if(s){const f=s[1],l=parseInt(s[2],10),p=s[3];n.push({el:i,prefix:f,targetVal:l,suffix:p}),i.textContent=`${f}0${p}`}});function o(i){return i===1?1:1-Math.pow(2,-10*i)}function t(i,d,s,f,l,p){const u=performance.now();function m(h){const g=h-u,y=Math.min(g/p,1),v=o(y),E=Math.floor(d+(s-d)*v);i.textContent=`${f}${E}${l}`,y<1?requestAnimationFrame(m):i.textContent=`${f}${s}${l}`}requestAnimationFrame(m)}const a={root:null,threshold:.1,rootMargin:"0px 0px -50px 0px"},c=new IntersectionObserver(i=>{i.forEach(d=>{d.isIntersecting&&(n.forEach(s=>{t(s.el,0,s.targetVal,s.prefix,s.suffix,2e3)}),c.unobserve(d.target))})},a);c.observe(e)}function le(){const e=document.getElementById("hero-loop-video");if(!e)return;const r={root:null,threshold:.1};new IntersectionObserver(o=>{o.forEach(t=>{t.isIntersecting?e.play().catch(()=>{}):e.pause()})},r).observe(e)}function de(){const e=document.getElementById("enhanced-contact-form");if(!e)return;const r=document.getElementById("contact-submit-btn"),n=document.getElementById("contact-btn-text"),o=document.getElementById("contact-btn-icon"),t=document.getElementById("contact-success"),a=document.getElementById("contact-error");e.addEventListener("submit",async c=>{c.preventDefault(),r&&(r.disabled=!0),n&&(n.textContent="Sending..."),o&&o.classList.add("animate-pulse"),t&&t.classList.add("hidden"),a&&a.classList.add("hidden");try{const i=new FormData(e);(await fetch(e.action,{method:"POST",body:i,headers:{Accept:"application/json"}})).ok?(e.reset(),t&&t.classList.remove("hidden"),n&&(n.textContent="Sent!")):(a&&a.classList.remove("hidden"),n&&(n.textContent="Send message"),r&&(r.disabled=!1))}catch{a&&a.classList.remove("hidden"),n&&(n.textContent="Send message"),r&&(r.disabled=!1)}finally{o&&o.classList.remove("animate-pulse")}})}function ue(){const e=document.getElementById("calendly-inline-embed");if(!e)return;const r=new IntersectionObserver(n=>{n.forEach(o=>{o.isIntersecting&&(me(e),r.unobserve(e))})},{rootMargin:"300px 0px"});r.observe(e)}function me(e){const r=e.getAttribute("data-url");if(!r)return;const n=()=>{if(window.Calendly){window.Calendly.initInlineWidget({url:r,parentElement:e,prefill:{},utm:{}});const o=setInterval(()=>{const t=e.querySelector("iframe");t&&(clearInterval(o),t.addEventListener("load",()=>{const a=document.getElementById("calendly-skeleton");a&&(a.style.opacity="0",setTimeout(()=>a.remove(),300))}),setTimeout(()=>{const a=document.getElementById("calendly-skeleton");a&&a.remove()},3e3))},100)}};if(window.Calendly)n();else{const o=document.createElement("script");o.src="https://assets.calendly.com/assets/external/widget.js",o.async=!0,o.onload=n,document.body.appendChild(o)}}
