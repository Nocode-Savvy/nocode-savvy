document.addEventListener("DOMContentLoaded",()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(P(),e){_();return}H(),R(),z(),j(),Y(),X(),U(),V(),W(),G(),J(),Q()});function P(){const e=document.createElement("style");e.textContent=`
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
    
    @media (hover: hover) {
      #about-portrait-wrapper:hover .profile-image-el {
        filter: grayscale(0%) brightness(1.0);
      }
      #about-portrait-wrapper:hover #about-tagline {
        color: var(--primary);
      }
      #about-portrait-wrapper:hover #about-subtagline {
        letter-spacing: 0.15em;
      }
    }

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

    #about-portrait-wrapper:active #about-tagline,
    #about-portrait-wrapper.touch-active #about-tagline {
      color: var(--primary);
    }
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
  `,document.head.appendChild(e)}function _(){document.querySelectorAll("#hero dl dt").forEach(t=>{t.style.transform="none"});const n=document.querySelector("#about");if(n){n.querySelectorAll(".char-rollup-target").forEach(s=>s.style.transform="none"),n.querySelectorAll(".space-y-6 > p").forEach(s=>{s.style.filter="none",s.style.opacity="1",s.style.transform="none"}),n.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span").forEach(s=>{s.style.opacity="1",s.style.transform="none"});const i=document.getElementById("about-portrait");i&&(i.style.opacity="1",i.style.transform="none");const l=document.getElementById("about-tagline-container");l&&(l.style.opacity="1",l.style.transform="none")}}function H(){const e=document.querySelector("#hero h1");if(!e)return;e.classList.add("clip-reveal");let n=0;const t=.06;function o(r){if(r.nodeType===Node.TEXT_NODE){const l=r.nodeValue.split(/(\s+)/),s=document.createDocumentFragment();l.forEach(a=>{if(a.trim().length>0){const c=document.createElement("span");c.className="animate-word",c.textContent=a,c.style.animationDelay=`${n*t}s`,s.appendChild(c),n++}else s.appendChild(document.createTextNode(a))}),r.parentNode.replaceChild(s,r)}else r.nodeType===Node.ELEMENT_NODE&&r.tagName!=="SVG"&&Array.from(r.childNodes).forEach(o)}Array.from(e.childNodes).forEach(o)}function R(){const e=document.querySelector('header a[href="#hero"]');if(!e)return;const n=e.querySelector(".bg-primary"),t=e.querySelector(".text-primary");if(!t||!n)return;const o="Nocode",r="Savvy";let i=!1;e.addEventListener("mouseenter",()=>{if(i)return;i=!0;const l="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",s=performance.now(),a=600,c=30;function m(d){const u=d-s;let p="";for(let h=0;h<o.length;h++){const y=h*c;u>=a||u>=y+(a-o.length*c)?p+=o[h]:p+=l[Math.floor(Math.random()*l.length)]}let f="";for(let h=0;h<r.length;h++){const y=(o.length+h)*c;u>=a||u>=y+(a-(o.length+r.length)*c)?f+=r[h]:f+=l[Math.floor(Math.random()*l.length)]}let g=n.nextSibling;g&&g.nodeType===Node.TEXT_NODE&&(g.nodeValue=p),t.textContent=f,u<a?requestAnimationFrame(m):(g&&g.nodeType===Node.TEXT_NODE&&(g.nodeValue=o),t.textContent=r,i=!1)}requestAnimationFrame(m)})}function z(){const e=document.querySelectorAll("h1, h2, h3"),n=[];e.forEach(o=>{const r=o.textContent.trim();r.split(/\s+/).length<=3&&(o.classList.add("gradient-wipe"),o.setAttribute("data-text",r),n.push(o))});const t=new IntersectionObserver(o=>{o.forEach(r=>{r.isIntersecting&&(r.target.classList.add("wipe-active"),t.unobserve(r.target))})},{threshold:.5});n.forEach(o=>t.observe(o))}function j(){const e=document.getElementById("typewriter-text");if(!e)return;const n=["SaaS platforms that scale.","Bubble apps that don't break.","AI integrations that actually work.","Payment systems wired right.","MVPs shipped in 3 weeks.","The thing your business actually needs."];let t=0,o=0,r=!1;setTimeout(()=>{i()},1400);function i(){const l=n[t];r?(e.textContent=l.substring(0,o-1),o--,o===0?(r=!1,t=(t+1)%n.length,setTimeout(i,550)):setTimeout(i,30)):(e.textContent=l.substring(0,o+1),o++,o===l.length?(r=!0,setTimeout(i,1600)):setTimeout(i,55))}}function Y(){const e=document.querySelectorAll(".underline-sweep-target");if(e.length===0)return;const n=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&(o.target.classList.add("sweep-active"),n.unobserve(o.target))})},{threshold:.3});e.forEach(t=>n.observe(t))}function X(){const e=document.querySelector("#about");if(!e)return;const n=e.querySelectorAll(".char-rollup-target"),t=[],o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";n.forEach(c=>{const m=c.textContent.trim();c.innerHTML="",c.classList.add("char-roll-container");const d=[];for(let u=0;u<m.length;u++){const p=m[u];if(p===" "){const f=document.createElement("span");f.className="char-roll-char",f.innerHTML="&nbsp;",c.appendChild(f)}else{const f=document.createElement("span");f.className="char-roll-col";const g=10;for(let y=0;y<g;y++){const v=document.createElement("span");v.className="char-roll-char",v.textContent=o[Math.floor(Math.random()*o.length)],f.appendChild(v)}const h=document.createElement("span");h.className="char-roll-char",h.textContent=p,f.appendChild(h),c.appendChild(f),d.push({col:f,index:u})}}t.push({columns:d,target:c})});const r=e.querySelectorAll(".space-y-6 > p");r.forEach(c=>c.classList.add("about-bio-p"));const i=e.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span");i.forEach(c=>c.classList.add("about-badge-item"));const l=document.getElementById("about-portrait"),s=new IntersectionObserver(c=>{c.forEach(m=>{if(m.isIntersecting){if(t.forEach(({columns:d})=>{d.forEach(({col:u,index:p})=>{setTimeout(()=>{u.style.transform=`translateY(-${10*1.2}em)`},p*35)})}),r.forEach((d,u)=>{setTimeout(()=>{d.classList.add("reveal-active")},u*180)}),i.forEach((d,u)=>{setTimeout(()=>{d.classList.add("reveal-active")},u*120)}),l){l.classList.add("reveal-active");const d=document.getElementById("about-tagline-container");d&&d.classList.add("reveal-active"),setTimeout(()=>{l.classList.add("portrait-pulse-active")},900)}s.unobserve(m.target)}})},{threshold:.15});s.observe(e),e.querySelectorAll(".about-magnetic-card").forEach(c=>{c.addEventListener("mousemove",m=>{const d=c.getBoundingClientRect(),u=d.left+d.width/2,p=d.top+d.height/2,f=m.clientX,g=m.clientY,h=f-u,y=g-p,v=h/d.width*16,x=y/d.height*16,L=Math.sqrt(v*v+x*x),E=8;let k=v,C=x;L>E&&(k=v/L*E,C=x/L*E),c.style.transition="none",c.style.transform=`translate(${k}px, ${C}px)`}),c.addEventListener("mouseleave",()=>{c.style.transition="transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",c.style.transform="translate(0px, 0px)"})})}function U(){const e=document.querySelectorAll("#work .grid a");if(e.length===0)return;e.forEach(t=>{t.classList.add("curtain-card");const o=document.createElement("div");o.className="curtain-overlay",t.appendChild(o)});const n=new IntersectionObserver(t=>{let o=0;t.forEach(r=>{if(r.isIntersecting){const i=r.target;setTimeout(()=>{i.classList.add("wipe-active")},o*120),o++,n.unobserve(i)}})},{threshold:.2});e.forEach(t=>n.observe(t))}function V(){const e=document.querySelectorAll("#problem .grid > div"),n=document.querySelectorAll("#what-i-build .grid > div");[...e,...n].forEach(o=>{o.classList.add("draw-border-card");const r=document.createElement("span");r.className="draw-border-line draw-border-top";const i=document.createElement("span");i.className="draw-border-line draw-border-right";const l=document.createElement("span");l.className="draw-border-line draw-border-bottom";const s=document.createElement("span");s.className="draw-border-line draw-border-left",o.appendChild(r),o.appendChild(i),o.appendChild(l),o.appendChild(s)})}function W(){const e=document.querySelector(".font-display.text-5xl"),n=document.querySelector(".font-display.text-3xl.text-primary"),t=document.querySelectorAll("input[type='range']");if(!e||!n||t.length<3)return;let o=0,r=0,i=!0;function l(d){return"$"+Math.round(d).toLocaleString()}function s(){const d=parseInt(t[0].value,10),u=parseInt(t[1].value,10),p=parseInt(t[2].value,10),f=d*u*p*52,g=f*.78;return{drain:f,recoverable:g}}function a(d=400){const{drain:u,recoverable:p}=s();c(e,o,u,d,l,' <span class="text-base text-muted-foreground">/ year</span>'),c(n,r,p,d,l,' <span class="text-base text-muted-foreground">/ year</span>'),o=u,r=p}function c(d,u,p,f,g,h){const y=performance.now();function v(x){const L=x-y,E=Math.min(L/f,1),k=E===1?1:1-Math.pow(2,-10*E),C=u+(p-u)*k;d.innerHTML=`${g(C)}${h}`,E<1?requestAnimationFrame(v):d.innerHTML=`${g(p)}${h}`}requestAnimationFrame(v)}t.forEach(d=>{d.addEventListener("input",()=>{a(400)})});const m=document.querySelector("#roi-calc")||document.querySelector("section[data-section='services'] + section");if(m){const d=new IntersectionObserver(u=>{u.forEach(p=>{if(p.isIntersecting&&i){i=!1;const{drain:f,recoverable:g}=s();o=f,r=g,c(e,0,f,1200,l,' <span class="text-base text-muted-foreground">/ year</span>'),c(n,0,g,1200,l,' <span class="text-base text-muted-foreground">/ year</span>'),d.unobserve(p.target)}})},{threshold:.1});d.observe(m)}}function G(){document.querySelectorAll(".faq-answer").forEach(n=>{const t=document.createElement("div");t.className="faq-answer-inner",t.innerHTML=n.innerHTML,n.innerHTML="",n.appendChild(t)})}function J(){const e=[document.querySelector("#toolkit .grid"),document.querySelector("#services .space-y-4"),document.querySelector("#process .rounded-2xl"),document.querySelector("#work-list tbody"),document.querySelector("#faq .space-y-4")||document.querySelector("#faq .border-t.hairline"),document.querySelector("#contact .grid")].filter(Boolean),n=new IntersectionObserver(t=>{t.forEach(o=>{if(o.isIntersecting){const r=o.target;r.querySelectorAll(".fade-up-item").forEach((l,s)=>{setTimeout(()=>{l.classList.add("fade-up-active")},s*80)}),n.unobserve(r)}})},{threshold:.1});e.forEach(t=>{Array.from(t.children).forEach(o=>{o.classList.add("fade-up-item")}),n.observe(t)})}function Q(){const e=document.querySelector("section.border-y.hairline");if(!e)return;const n=e.querySelector(".flex");n&&(n.classList.remove("animate-[marquee_40s_linear_infinite]"),n.classList.add("marquee-row","marquee-left"),e.classList.add("marquee-container"))}let b=null,w=null,T=null,M=null,B=null,A="light",q=null;function $(e){A=e,b=document.getElementById("bg-canvas"),b||(b=document.createElement("canvas"),b.id="bg-canvas",b.style.position="fixed",b.style.inset="0",b.style.pointerEvents="none",b.style.zIndex="-1",document.body.prepend(b)),w=b.getContext("2d"),F(),window.removeEventListener("resize",F),window.addEventListener("resize",F),window.removeEventListener("mousemove",D),window.addEventListener("mousemove",D),window.removeEventListener("mouseleave",O),window.addEventListener("mouseleave",O),T&&cancelAnimationFrame(T),A==="dark"&&!q&&Z(),A==="light"?K():ee()}function F(){b&&(b.width=window.innerWidth,b.height=window.innerHeight)}function D(e){M=e.clientX,B=e.clientY}function O(){M=null,B=null}function Z(){const e=document.createElement("canvas");e.width=128,e.height=128;const n=e.getContext("2d"),t=n.createImageData(128,128),o=t.data;for(let r=0;r<o.length;r+=4){const i=Math.floor(Math.random()*255);o[r]=i,o[r+1]=i,o[r+2]=i,o[r+3]=6}n.putImageData(t,0,0),q=w.createPattern(e,"repeat")}let N=[];function K(){N=[];const e=60;for(let t=0;t<e;t++)N.push({x:Math.random()*b.width,y:Math.random()*b.height,origX:0,origY:0,vx:(Math.random()>.5?1:-1)*(.15+Math.random()*.15),vy:(Math.random()>.5?1:-1)*(.15+Math.random()*.15),radius:1+Math.random()*1});function n(){w.clearRect(0,0,b.width,b.height),w.fillStyle="rgba(0, 0, 0, 0.04)",N.forEach(t=>{if(t.x+=t.vx,t.y+=t.vy,t.x<0&&(t.x=b.width),t.x>b.width&&(t.x=0),t.y<0&&(t.y=b.height),t.y>b.height&&(t.y=0),M!==null&&B!==null){const o=M-t.x,r=B-t.y;Math.sqrt(o*o+r*r)<80&&(t.x+=o*.02,t.y+=r*.02)}w.beginPath(),w.arc(t.x,t.y,t.radius,0,Math.PI*2),w.fill()}),T=requestAnimationFrame(n)}n()}function ee(){let e=performance.now();function n(o){const r=(o-e)/1e3;w.clearRect(0,0,b.width,b.height);const i=b.width,l=b.height,s=i*.4,a=i*(.5+.3*Math.sin(2*Math.PI*r/18)),c=l*(.5+.2*Math.cos(2*Math.PI*r/18));t(a,c,s,"rgba(99, 60, 180, 0.12)");const m=i*.35,d=i*(.5-.25*Math.sin(2*Math.PI*r/24)),u=l*(.5-.2*Math.cos(2*Math.PI*r/24));t(d,u,m,"rgba(30, 80, 160, 0.10)");const p=i*.3,f=i*(.5+.2*Math.sin(2*Math.PI*r/20+Math.PI/4)),g=l*(.5+.2*Math.sin(2*Math.PI*r/20));t(f,g,p,"rgba(140, 60, 100, 0.08)");const h=1+.1*Math.sin(2*Math.PI*r/30),y=i*.45*h,v=i*.5,x=l*.5;t(v,x,y,"rgba(20, 100, 120, 0.07)"),q&&(w.fillStyle=q,w.fillRect(0,0,i,l)),T=requestAnimationFrame(n)}function t(o,r,i,l){if(i<=0)return;const s=w.createRadialGradient(o,r,0,o,r,i);s.addColorStop(0,l),s.addColorStop(1,"rgba(0, 0, 0, 0)"),w.fillStyle=s,w.beginPath(),w.arc(o,r,i,0,Math.PI*2),w.fill()}requestAnimationFrame(n)}document.addEventListener("DOMContentLoaded",async()=>{te(),ne(),oe();try{await xe()}catch(e){console.error("Dynamic content hydration failed:",e)}re(),ae(),ie(),ce(),ue(),me(),ge(),fe(),le(),de(),Ee(),pe(),he();try{se()}catch(e){console.error("Analytics tracking failed:",e)}});window.addEventListener("click",()=>!0,{once:!0});window.addEventListener("keydown",()=>!0,{once:!0});window.addEventListener("scroll",()=>!0,{once:!0});window.addEventListener("touchstart",()=>!0,{once:!0});function te(){const e=document.querySelectorAll("#theme-toggle"),n=document.querySelectorAll("#theme-sun-icon"),t=document.querySelectorAll("#theme-moon-icon");if(e.length===0)return;function o(l){l==="dark"?(n.forEach(s=>s.classList.remove("hidden")),t.forEach(s=>s.classList.add("hidden"))):(n.forEach(s=>s.classList.add("hidden")),t.forEach(s=>s.classList.remove("hidden")))}let r=document.documentElement.getAttribute("data-theme");r||(r=localStorage.getItem("ncs-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")),document.documentElement.setAttribute("data-theme",r),document.documentElement.classList.remove("dark","light"),document.documentElement.classList.add(r),o(r),$(r),setTimeout(()=>{document.documentElement.classList.remove("no-transition")},100);function i(l){const s=document.getElementById("bg-canvas");if(!s){$(l);return}s.style.transition="opacity 300ms ease",s.style.opacity="0",setTimeout(()=>{$(l),s.style.transition="opacity 400ms ease",s.style.opacity="1"},300)}e.forEach(l=>{l.addEventListener("click",()=>{document.documentElement.classList.add("theme-transitioning");const a=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",a),document.documentElement.classList.remove("dark","light"),document.documentElement.classList.add(a),localStorage.setItem("ncs-theme",a),o(a),i(a),setTimeout(()=>{document.documentElement.classList.remove("theme-transitioning")},600)})})}function ne(){const e=document.querySelectorAll(".faq-item");e.forEach(n=>{const t=n.querySelector(".faq-trigger");t&&t.addEventListener("click",()=>{const o=n.classList.contains("active");e.forEach(r=>{r.classList.remove("active")}),o||n.classList.add("active")})})}function oe(){const e=document.getElementById("roi-hours"),n=document.getElementById("roi-cost"),t=document.getElementById("roi-team"),o=document.getElementById("roi-hours-label"),r=document.getElementById("roi-cost-label"),i=document.getElementById("roi-team-label"),l=document.getElementById("roi-drain-value"),s=document.getElementById("roi-recoverable-value");if(!e||!n||!t)return;function a(d){return"$"+Math.round(d).toLocaleString()}function c(d){const u=parseFloat(d.min)||0,p=parseFloat(d.max)||100,g=((parseFloat(d.value)||0)-u)/(p-u)*100;d.style.setProperty("--percent",g+"%")}function m(){const d=parseInt(e.value,10),u=parseInt(n.value,10),p=parseInt(t.value,10);o&&(o.textContent=d+" hrs"),r&&(r.textContent="$"+u+" / hr"),i&&(i.textContent=p+(p===1?" person":" people")),c(e),c(n),c(t);const f=d*u*p*52,g=f*.78;l&&(l.innerHTML=`${a(f)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`),s&&(s.innerHTML=`${a(g)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`)}[e,n,t].forEach(d=>{d.addEventListener("input",m)}),m()}function re(){const e=document.getElementById("testimonial-slider");if(!e)return;const n=e.querySelectorAll(".testimonial-slide"),t=document.getElementById("testimonial-prev"),o=document.getElementById("testimonial-next"),r=document.querySelectorAll("#testimonial-dots button");if(n.length===0)return;let i=0,l=!1;function s(a){if(l||a===i)return;l=!0;const c=n[i],m=n[a];c.style.opacity="0",r[i].classList.remove("bg-primary","w-4"),r[i].classList.add("bg-foreground/25","w-2"),setTimeout(()=>{c.classList.add("hidden"),m.classList.remove("hidden"),m.offsetHeight,m.style.opacity="1",r[a].classList.remove("bg-foreground/25","w-2"),r[a].classList.add("bg-primary","w-4"),i=a,l=!1},300)}t==null||t.addEventListener("click",()=>{let a=i-1;a<0&&(a=n.length-1),s(a)}),o==null||o.addEventListener("click",()=>{let a=i+1;a>=n.length&&(a=0),s(a)}),r.forEach((a,c)=>{a.addEventListener("click",()=>{s(c)})}),n.forEach((a,c)=>{a.style.transition="opacity 0.3s ease",c!==0?a.style.opacity="0":a.style.opacity="1"})}function ae(){const e=document.querySelectorAll("section[id]"),n=document.querySelectorAll(".nav-link"),t=document.getElementById("active-section-indicator");if(e.length===0)return;const o={hero:"Home",problem:"Pain Points","what-i-build":"Services",toolkit:"Toolkit",services:"Pricing",process:"Process",work:"Selected Work","work-list":"Archive",about:"About",faq:"FAQ",contact:"Contact"},r={root:null,rootMargin:"-20% 0px -60% 0px",threshold:0},i=new IntersectionObserver(l=>{l.forEach(s=>{if(s.isIntersecting){const a=s.target.getAttribute("id");if(t){const c=o[a]||a.charAt(0).toUpperCase()+a.slice(1);t.innerHTML=`Viewing ${c} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-3 w-3"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>`}n.forEach(c=>{const m=c.getAttribute("href");m===`#${a}`||a==="work-list"&&m==="#work"||a==="what-i-build"&&m==="#services"?(c.classList.add("bg-primary","text-primary-foreground","active"),c.classList.remove("text-foreground/80")):(c.classList.remove("bg-primary","text-primary-foreground","active"),c.classList.add("text-foreground/80"))})}})},r);e.forEach(l=>i.observe(l))}function ie(){const e=document.getElementById("chatbot-toggle"),n=document.getElementById("chatbot-close"),t=document.getElementById("chatbot-window"),o=document.getElementById("chat-messages"),r=document.getElementById("chat-input"),i=document.getElementById("chat-form"),l=document.getElementById("chat-loading"),s=i==null?void 0:i.querySelector("button[type='submit']"),a=document.querySelectorAll(".chat-pill");if(!e||!t)return;const c=[{topic:"Full-Stack + Bubble",answer:"I architect the data model first, then ship UI in Bubble for visual surfaces and Next.js for anything that demands custom code."},{topic:"UI/UX Design",answer:"Design is structural — I work in Figma, then prototype directly in code. Token-first, component-driven."},{topic:"Custom Dev",answer:"Next.js + Supabase, TypeScript everywhere, edge-deployed. I write the code I'd want to inherit."}];d("assistant","Hey <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-hand inline-block mr-1 align-text-bottom text-primary'><path d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5'></path><path d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M6 15a4 4 0 0 0-4-4v0a2 2 0 0 0-2 2v6a8 8 0 0 0 8 8h5a6 6 0 0 0 6-6v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2'></path></svg> I'm the Emmanuel Twin. Ask me about how I build, what I charge, or anything else. Pick a starter or type a question."),e.addEventListener("click",()=>{t.classList.remove("hidden"),e.classList.add("opacity-0","pointer-events-none"),p()}),n.addEventListener("click",()=>{t.classList.add("hidden"),e.classList.remove("opacity-0","pointer-events-none")}),r.addEventListener("input",()=>{const f=r.value.trim().length>0;s.disabled=!f}),i.addEventListener("submit",f=>{f.preventDefault();const g=r.value.trim();g&&u(g)}),a.forEach(f=>{f.addEventListener("click",()=>{u(f.textContent)})});function d(f,g){const h=document.createElement("div");h.className=f==="user"?"flex justify-end":"flex justify-start";const y=f==="user",v=y?"bg-primary text-primary-foreground":"bg-foreground/[0.04] text-foreground border hairline",x=y?"rounded-2xl rounded-tr-none":"rounded-2xl rounded-tl-none";h.innerHTML=`
      <div class="max-w-[82%] px-4 py-3 text-sm leading-relaxed ${v} ${x}">
        ${g}
      </div>
    `,o.appendChild(h),p()}function u(f){d("user",f),r.value="",s.disabled=!0,r.disabled=!0,l.classList.remove("hidden"),p(),setTimeout(()=>{const g=f.toLowerCase();let h=c.find(v=>{const x=v.topic.toLowerCase().split(/[\s/+]+/)[0];return g.includes(x)||g.includes(v.topic.toLowerCase())});const y=h?h.answer:"I'd answer that personally — drop your details on the Contact page or pick a topic pill above and I'll route you to the right response.";l.classList.add("hidden"),r.disabled=!1,d("assistant",y),r.focus()},1400)}function p(){setTimeout(()=>{o.scrollTop=o.scrollHeight},50)}}async function se(){const e=I();if(!e||localStorage.getItem("admin_logged_in")==="true")return;let n=sessionStorage.getItem("ncs_analytics_session");n||(n=crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).substring(2),sessionStorage.setItem("ncs_analytics_session",n));const t=window.location.pathname,r={page:t==="/"||t.endsWith("index.html")||t.endsWith("/")?"Home":t.endsWith("portfolio.html")?"Portfolio":t.split("/").pop()||"Unknown",referrer:document.referrer||"Direct",user_agent:navigator.userAgent,session_id:n};try{await e.from("analytics").insert([r])}catch(i){console.warn("Failed to log page view:",i)}}function ce(){const e=document.querySelectorAll(".reveal");if(e.length===0)return;const n={root:null,rootMargin:"0px 0px -120px 0px",threshold:.05},t=new IntersectionObserver(o=>{o.forEach(r=>{r.isIntersecting&&(r.target.classList.add("reveal-active"),t.unobserve(r.target))})},n);e.forEach(o=>t.observe(o))}function le(){const e=document.getElementById("chatbot-popup"),n=document.getElementById("chatbot-popup-dismiss"),t=document.getElementById("chatbot-popup-cta"),o=document.getElementById("chatbot-toggle"),r=document.getElementById("chatbot-window"),i=document.getElementById("chatbot-close");if(!e||!o)return;let l=!1,s=!1;if(!document.getElementById("popup-keyframe-style")){const u=document.createElement("style");u.id="popup-keyframe-style",u.textContent=`
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
    `,document.head.appendChild(u)}function a(){l||s||r&&!r.classList.contains("hidden")||(l=!0,e.style.animation="none",e.classList.remove("hidden"),e.offsetHeight,e.style.animation="popupIn 0.5s cubic-bezier(0.22,1,0.36,1) both",o.classList.add("pulse-hint"),setTimeout(()=>{s||c()},1e4))}function c(u=!1){if(!e.classList.contains("hidden")){if(o.classList.remove("pulse-hint"),u){e.classList.add("hidden");return}e.style.animation="popupOut 0.3s ease forwards",setTimeout(()=>e.classList.add("hidden"),290)}}function m(){s=!0,c(!0),r&&(r.classList.remove("hidden"),o.classList.add("opacity-0","pointer-events-none"))}const d=document.getElementById("what-i-build");if(d){const u=new IntersectionObserver(p=>{p.forEach(f=>{f.isIntersecting&&!l&&!s&&(a(),u.unobserve(f.target))})},{rootMargin:"0px 0px -25% 0px"});u.observe(d)}else{const u=()=>{if(l||s){window.removeEventListener("scroll",u);return}window.scrollY>400&&(a(),window.removeEventListener("scroll",u))};window.addEventListener("scroll",u,{passive:!0})}n&&n.addEventListener("click",u=>{u.stopPropagation(),s=!0,c()}),t&&t.addEventListener("click",u=>{u.stopPropagation(),m(),setTimeout(()=>{const p=document.getElementById("chat-input");p&&p.focus()},150)}),o.addEventListener("click",()=>{s=!0,c(!0)}),i&&i.addEventListener("click",()=>{o.classList.remove("pulse-hint")})}function de(){const e=document.getElementById("back-to-top");if(!e)return;let n=!1;window.addEventListener("scroll",()=>{const t=window.scrollY>400;t!==n&&(n=t,n?(e.classList.remove("opacity-0","pointer-events-none","translate-y-4"),e.classList.add("opacity-100","pointer-events-auto","translate-y-0")):(e.classList.add("opacity-0","pointer-events-none","translate-y-4"),e.classList.remove("opacity-100","pointer-events-auto","translate-y-0")))},{passive:!0}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function ue(){const e=document.querySelector(".stats-grid");if(!e)return;const n=e.querySelectorAll("dt"),t=[];n.forEach(s=>{const c=s.textContent.trim().match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);if(c){const m=c[1],d=parseInt(c[2],10),u=c[3];t.push({el:s,prefix:m,targetVal:d,suffix:u}),s.textContent=`${m}0${u}`}});function o(s){return s===1?1:1-Math.pow(2,-10*s)}function r(s,a,c,m,d,u){const p=performance.now();function f(g){const h=g-p,y=Math.min(h/u,1),v=o(y),x=Math.floor(a+(c-a)*v);s.textContent=`${m}${x}${d}`,y<1?requestAnimationFrame(f):s.textContent=`${m}${c}${d}`}requestAnimationFrame(f)}const i={root:null,threshold:.1,rootMargin:"0px 0px -50px 0px"},l=new IntersectionObserver(s=>{s.forEach(a=>{a.isIntersecting&&(t.forEach(c=>{r(c.el,0,c.targetVal,c.prefix,c.suffix,2e3)}),l.unobserve(a.target))})},i);l.observe(e)}function me(){const e=document.getElementById("hero-loop-video");if(!e)return;const n={root:null,threshold:.1};new IntersectionObserver(o=>{o.forEach(r=>{r.isIntersecting?e.play().catch(()=>{}):e.pause()})},n).observe(e)}function pe(){const e=document.getElementById("enhanced-contact-form");if(!e)return;const n=document.getElementById("contact-submit-btn"),t=document.getElementById("contact-btn-text"),o=document.getElementById("contact-btn-icon"),r=document.getElementById("contact-success"),i=document.getElementById("contact-error");e.addEventListener("submit",async l=>{l.preventDefault(),n&&(n.disabled=!0),t&&(t.textContent="Sending..."),o&&o.classList.add("animate-pulse"),r&&r.classList.add("hidden"),i&&i.classList.add("hidden");try{const s=new FormData(e);(await fetch(e.action,{method:"POST",body:s,headers:{Accept:"application/json"}})).ok?(e.reset(),r&&r.classList.remove("hidden"),t&&(t.textContent="Sent!")):(i&&i.classList.remove("hidden"),t&&(t.textContent="Send message"),n&&(n.disabled=!1))}catch{i&&i.classList.remove("hidden"),t&&(t.textContent="Send message"),n&&(n.disabled=!1)}finally{o&&o.classList.remove("animate-pulse")}})}function fe(){const e=document.getElementById("hero-loop-video"),n=document.getElementById("video-sound-toggle"),t=document.getElementById("video-sound-off"),o=document.getElementById("video-sound-on");!e||!n||n.addEventListener("click",r=>{r.stopPropagation();const i=e.muted;e.muted=!i,e.muted?(t.classList.remove("hidden"),o.classList.add("hidden")):(t.classList.add("hidden"),o.classList.remove("hidden"))})}function ge(){const e=document.getElementById("hero-loop-video"),n=document.getElementById("video-play-toggle"),t=document.getElementById("video-pause-icon"),o=document.getElementById("video-play-icon");!e||!n||(n.addEventListener("click",r=>{r.stopPropagation(),e.paused?e.play().then(()=>{t.classList.remove("hidden"),o.classList.add("hidden")}).catch(i=>{console.error("Video play failed:",i)}):(e.pause(),t.classList.add("hidden"),o.classList.remove("hidden"))}),e.addEventListener("play",()=>{t.classList.remove("hidden"),o.classList.add("hidden")}),e.addEventListener("pause",()=>{t.classList.add("hidden"),o.classList.remove("hidden")}))}function he(){const e=document.getElementById("about-portrait-wrapper");e&&e.addEventListener("click",()=>{e.classList.toggle("touch-active")})}let S=null;function I(){if(S)return S;const e=localStorage.getItem("sb_url")||"https://iyhynpndndgxyioojdwp.supabase.co",n=localStorage.getItem("sb_key")||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5aHlucG5kbmRneHlpb29qZHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDg4MTksImV4cCI6MjA5NjUyNDgxOX0.QrDi0n3i-Et4EUabbPU6dtn9A-g35xDm3Ogv22jzXe4";if(window.supabase)try{return S=window.supabase.createClient(e,n),S}catch(t){console.error("Supabase client failed to initialize:",t)}return null}async function be(){const e=I();if(e){const{data:t,error:o}=await e.from("projects").select("*").order("created_at",{ascending:!1});if(!o)return t}const n=localStorage.getItem("db_projects");return n?JSON.parse(n):[]}async function ye(){const e=I();if(e){const{data:t,error:o}=await e.from("testimonials").select("*").order("created_at",{ascending:!1});if(!o)return t}const n=localStorage.getItem("db_testimonials");return n?JSON.parse(n):[]}async function ve(){const e=I();if(e){const{data:t,error:o}=await e.from("about_me").select("*").eq("key","profile_info").single();if(!o&&t)return t.value}const n=localStorage.getItem("db_about_me");return n?JSON.parse(n):null}async function we(){const e=I();if(e){const{data:t,error:o}=await e.from("blogs").select("*").order("created_at",{ascending:!1});if(!o)return t}const n=localStorage.getItem("db_blogs");return n?JSON.parse(n):[]}async function xe(){const e=await be();if(e&&e.length>0){const i=document.getElementById("projects-showcase-grid");i&&(i.innerHTML="",e.slice(0,6).forEach(a=>{const c=(a.tags||[]).map(u=>`<span class="rounded-full border hairline px-2.5 py-1">${u}</span>`).join(""),m=a.image_url?`<img src="${a.image_url}" class="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-[1.03] transition duration-500" alt="${a.title} screen">`:`<div class="w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center font-display text-3xl font-semibold text-primary/30 select-none">${a.title.substring(0,2).toUpperCase()}</div>`,d=document.createElement("a");d.href=a.link||"#",d.target="_blank",d.className="group block rounded-2xl border hairline overflow-hidden transition hover:shadow-lg md:col-span-4",d.innerHTML=`
          <div class="aspect-square w-full overflow-hidden relative">
            ${m}
          </div>
          <div class="p-5">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="eyebrow">${a.category} · ${a.year}</div>
                <h3 class="mt-2 font-display text-3xl md:text-4xl">${a.title}</h3>
                <p class="mt-2 text-sm text-muted-foreground leading-relaxed">${a.description}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-5 w-5 shrink-0 text-muted-foreground transition group-hover:rotate-45 group-hover:text-primary" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </div>
            <div class="mt-4 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
              ${c}
            </div>
          </div>
        `,i.appendChild(d)}));const l=document.getElementById("portfolio-showcase-grid");l&&(l.innerHTML="",e.forEach(a=>{const c=(a.tags||[]).map(u=>`<span class="rounded-full border hairline px-2.5 py-1">${u}</span>`).join(""),m=a.image_url?`<img src="${a.image_url}" class="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-[1.03] transition duration-500" alt="${a.title} screen">`:`<div class="w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center font-display text-3xl font-semibold text-primary/30 select-none">${a.title.substring(0,2).toUpperCase()}</div>`,d=document.createElement("a");d.href=a.link||"#",d.target="_blank",d.className="group block rounded-2xl border hairline p-6 transition hover:bg-foreground/[0.03] md:col-span-4",d.innerHTML=`
          <div class="aspect-square w-full rounded-xl overflow-hidden mb-4 border border-foreground/5 relative">
            ${m}
          </div>
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="eyebrow">${a.category} · ${a.year}</div>
              <h3 class="mt-3 font-display text-3xl md:text-4xl">${a.title}</h3>
              <p class="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">${a.description}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-5 w-5 text-muted-foreground transition group-hover:rotate-45 group-hover:text-primary" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
          </div>
          <div class="mt-6 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
            ${c}
          </div>
        `,l.appendChild(d)}));const s=document.getElementById("registry-list-container");s&&(s.innerHTML="",e.forEach((a,c)=>{const m=String(c+1).padStart(2,"0"),d=document.createElement("a");d.href=a.link||"#",d.target="_blank",d.className="group grid grid-cols-12 items-center gap-4 border-b hairline py-8 md:py-10 hover:bg-foreground/[0.03] -mx-4 px-4 md:-mx-8 md:px-8 transition",d.innerHTML=`
          <div class="col-span-1 font-mono text-xs text-muted-foreground">${m}</div>
          <div class="col-span-7 md:col-span-6">
            <div class="font-display text-3xl md:text-5xl">${a.title}</div>
            <div class="mt-2 text-sm text-muted-foreground">${a.description}</div>
          </div>
          <div class="hidden md:block col-span-3 text-sm text-muted-foreground">${a.category}</div>
          <div class="col-span-3 md:col-span-1 text-right text-sm text-muted-foreground">${a.year}</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right col-span-1 ml-auto h-5 w-5 text-muted-foreground transition group-hover:rotate-45 group-hover:text-primary" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
        `,s.appendChild(d)}))}const n=await ye();if(n&&n.length>0){const i=document.getElementById("testimonial-slider"),l=document.getElementById("testimonial-dots");i&&l&&(i.innerHTML="",l.innerHTML="",n.forEach((s,a)=>{const c=a===0,m=document.createElement("blockquote");m.className=`testimonial-slide transition-opacity duration-500 w-full text-center ${c?"":"hidden opacity-0"}`,c&&m.setAttribute("data-active","true"),m.innerHTML=`
          <p class="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed max-w-3xl mx-auto">
            "${s.review_text}"
          </p>
          <cite class="mt-8 block not-italic">
            <span class="font-display text-lg font-semibold text-foreground">${s.client_name}</span>
            <span class="text-xs uppercase tracking-widest text-muted-foreground block mt-1">${s.company_role}</span>
          </cite>
        `,i.appendChild(m);const d=document.createElement("button");d.setAttribute("aria-label",`Go to testimonial ${a+1}`),d.className=`h-2 ${c?"w-4 bg-primary":"w-2 bg-foreground/25"} rounded-full transition-all duration-300 cursor-pointer`,l.appendChild(d)}))}const t=await ve();if(t){const i=document.getElementById("about-tagline"),l=document.getElementById("about-subtagline"),s=document.getElementById("about-bio-container");i&&(i.textContent=t.name),l&&(l.textContent=t.tagline),s&&(t.bio1||t.bio2)&&(s.innerHTML=`
        <p><strong class="text-foreground">My name is <span class="font-display font-bold text-primary text-lg md:text-xl">${t.name}</span>.</strong> ${t.bio1}</p>
        ${t.bio2?`<p>${t.bio2}</p>`:""}
      `)}const o=await we(),r=document.getElementById("changelog-container");if(r){const i=r.querySelector("#blog-empty-state"),l=r.querySelector("#blog-grid"),s=r.querySelector("#blog-featured-slot"),a=r.querySelector("#blog-mini-grid"),c=(o||[]).filter(m=>m.status==="Published");if(c.length>0){i&&(i.style.display="none"),l&&l.classList.remove("hidden");const m=c[0],d=m.created_at?new Date(m.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"";s&&(s.innerHTML=`
          <article class="blog-featured-card">
            ${m.image_url?`<div class="blog-thumb-wrapper"><img src="${m.image_url}" alt="${m.title}" class="blog-thumb"></div>`:`<div class="blog-thumb-wrapper flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20 text-primary/30 font-display text-4xl font-semibold select-none">${m.title.substring(0,2).toUpperCase()}</div>`}
            <div class="blog-featured-card-content">
              <div class="space-y-4">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="blog-tag primary">Featured</span>
                  ${m.category?`<span class="blog-tag">${m.category}</span>`:""}
                  <span style="font-family:var(--font-mono);font-size:0.65rem;color:var(--muted-foreground);opacity:0.6;margin-left:auto">${d}</span>
                </div>
                <h3 class="font-display text-2xl md:text-3xl font-bold leading-snug text-foreground">${m.title}</h3>
                ${m.excerpt?`<p class="text-sm text-muted-foreground leading-relaxed">${m.excerpt}</p>`:""}
              </div>
              <div class="pt-6">
                ${m.url?`<a href="${m.url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">Read Article <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition group-hover:translate-x-0.5"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></a>`:""}
              </div>
            </div>
          </article>
        `),a&&c.length>1&&(a.innerHTML="",c.slice(1,4).forEach((p,f)=>{const g=p.created_at?new Date(p.created_at).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"",h=document.createElement("a");h.href=p.url||"#",h.target="_blank",h.rel="noopener noreferrer",h.className="blog-mini-card group";const y=p.image_url?`<img src="${p.image_url}" alt="${p.title}" class="blog-mini-thumb">`:`<div class="blog-mini-thumb flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/20 text-primary/30 font-display font-semibold text-lg select-none">${p.title.substring(0,2).toUpperCase()}</div>`;h.innerHTML=`
            ${y}
            <div style="flex:1;min-width:0" class="space-y-1.5">
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                ${p.category?`<span class="blog-tag">${p.category}</span>`:""}
                <span style="font-family:var(--font-mono);font-size:0.6rem;color:var(--muted-foreground);opacity:0.6">${g}</span>
              </div>
              <h4 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;color:var(--foreground);line-height:1.3;margin-bottom:2px">${p.title}</h4>
              ${p.excerpt?`<p style="font-size:0.8rem;color:var(--muted-foreground);line-height:1.55;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${p.excerpt}</p>`:""}
            </div>
          `,a.appendChild(h)}));const u=document.getElementById("blog-view-all");u&&c.length>4&&(u.style.display="inline-flex")}else i&&(i.style.display=""),l&&l.classList.add("hidden")}}function Ee(){const e=document.getElementById("video-expand-toggle"),n=document.getElementById("video-modal"),t=document.getElementById("video-modal-close"),o=document.getElementById("hero-loop-video"),r=document.getElementById("modal-video");if(!e||!n||!t||!o||!r)return;const i=()=>{isNaN(o.currentTime)||(r.currentTime=o.currentTime),o.pause(),n.classList.remove("hidden"),n.classList.add("flex"),n.offsetHeight,n.classList.remove("opacity-0"),n.classList.add("opacity-100"),r.muted=!1,r.play().catch(a=>{console.warn("Auto-play modal video failed:",a)})},l=()=>{n.classList.remove("opacity-100"),n.classList.add("opacity-0"),r.pause(),setTimeout(()=>{n.classList.remove("flex"),n.classList.add("hidden"),isNaN(r.currentTime)||(o.currentTime=r.currentTime),o.play().catch(a=>{})},300)};e.addEventListener("click",a=>{a.stopPropagation(),i()});const s=document.getElementById("hero-video-trigger");s&&s.addEventListener("click",a=>{a.target.closest("button")||i()}),t.addEventListener("click",l),n.addEventListener("click",a=>{a.target===n&&l()})}
