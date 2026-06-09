document.addEventListener("DOMContentLoaded",()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(P(),e){_();return}H(),z(),R(),Y(),j(),X(),U(),V(),W(),G(),J(),Q()});function P(){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e)}function _(){document.querySelectorAll("#hero dl dt").forEach(t=>{t.style.transform="none"});const o=document.querySelector("#about");if(o){o.querySelectorAll(".char-rollup-target").forEach(s=>s.style.transform="none"),o.querySelectorAll(".space-y-6 > p").forEach(s=>{s.style.filter="none",s.style.opacity="1",s.style.transform="none"}),o.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span").forEach(s=>{s.style.opacity="1",s.style.transform="none"});const a=document.getElementById("about-portrait");a&&(a.style.opacity="1",a.style.transform="none");const d=document.getElementById("about-tagline-container");d&&(d.style.opacity="1",d.style.transform="none")}}function H(){const e=document.querySelector("#hero h1");if(!e)return;e.classList.add("clip-reveal");let o=0;const t=.06;function n(r){if(r.nodeType===Node.TEXT_NODE){const d=r.nodeValue.split(/(\s+)/),s=document.createDocumentFragment();d.forEach(i=>{if(i.trim().length>0){const l=document.createElement("span");l.className="animate-word",l.textContent=i,l.style.animationDelay=`${o*t}s`,s.appendChild(l),o++}else s.appendChild(document.createTextNode(i))}),r.parentNode.replaceChild(s,r)}else r.nodeType===Node.ELEMENT_NODE&&r.tagName!=="SVG"&&Array.from(r.childNodes).forEach(n)}Array.from(e.childNodes).forEach(n)}function z(){const e=document.querySelector('header a[href="#hero"]');if(!e)return;const o=e.querySelector(".bg-primary"),t=e.querySelector(".text-primary");if(!t||!o)return;const n="Nocode",r="Savvy";let a=!1;e.addEventListener("mouseenter",()=>{if(a)return;a=!0;const d="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",s=performance.now(),i=600,l=30;function m(c){const u=c-s;let p="";for(let h=0;h<n.length;h++){const y=h*l;u>=i||u>=y+(i-n.length*l)?p+=n[h]:p+=d[Math.floor(Math.random()*d.length)]}let f="";for(let h=0;h<r.length;h++){const y=(n.length+h)*l;u>=i||u>=y+(i-(n.length+r.length)*l)?f+=r[h]:f+=d[Math.floor(Math.random()*d.length)]}let g=o.nextSibling;g&&g.nodeType===Node.TEXT_NODE&&(g.nodeValue=p),t.textContent=f,u<i?requestAnimationFrame(m):(g&&g.nodeType===Node.TEXT_NODE&&(g.nodeValue=n),t.textContent=r,a=!1)}requestAnimationFrame(m)})}function R(){const e=document.querySelectorAll("h1, h2, h3"),o=[];e.forEach(n=>{const r=n.textContent.trim();r.split(/\s+/).length<=3&&(n.classList.add("gradient-wipe"),n.setAttribute("data-text",r),o.push(n))});const t=new IntersectionObserver(n=>{n.forEach(r=>{r.isIntersecting&&(r.target.classList.add("wipe-active"),t.unobserve(r.target))})},{threshold:.5});o.forEach(n=>t.observe(n))}function Y(){const e=document.getElementById("typewriter-text");if(!e)return;const o=["SaaS platforms that scale.","Bubble apps that don't break.","AI integrations that actually work.","Payment systems wired right.","MVPs shipped in 3 weeks.","The thing your business actually needs."];let t=0,n=0,r=!1;setTimeout(()=>{a()},1400);function a(){const d=o[t];r?(e.textContent=d.substring(0,n-1),n--,n===0?(r=!1,t=(t+1)%o.length,setTimeout(a,550)):setTimeout(a,30)):(e.textContent=d.substring(0,n+1),n++,n===d.length?(r=!0,setTimeout(a,1600)):setTimeout(a,55))}}function j(){const e=document.querySelectorAll(".underline-sweep-target");if(e.length===0)return;const o=new IntersectionObserver(t=>{t.forEach(n=>{n.isIntersecting&&(n.target.classList.add("sweep-active"),o.unobserve(n.target))})},{threshold:.3});e.forEach(t=>o.observe(t))}function X(){const e=document.querySelector("#about");if(!e)return;const o=e.querySelectorAll(".char-rollup-target"),t=[],n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";o.forEach(l=>{const m=l.textContent.trim();l.innerHTML="",l.classList.add("char-roll-container");const c=[];for(let u=0;u<m.length;u++){const p=m[u];if(p===" "){const f=document.createElement("span");f.className="char-roll-char",f.innerHTML="&nbsp;",l.appendChild(f)}else{const f=document.createElement("span");f.className="char-roll-col";const g=10;for(let y=0;y<g;y++){const v=document.createElement("span");v.className="char-roll-char",v.textContent=n[Math.floor(Math.random()*n.length)],f.appendChild(v)}const h=document.createElement("span");h.className="char-roll-char",h.textContent=p,f.appendChild(h),l.appendChild(f),c.push({col:f,index:u})}}t.push({columns:c,target:l})});const r=e.querySelectorAll(".space-y-6 > p");r.forEach(l=>l.classList.add("about-bio-p"));const a=e.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span");a.forEach(l=>l.classList.add("about-badge-item"));const d=document.getElementById("about-portrait"),s=new IntersectionObserver(l=>{l.forEach(m=>{if(m.isIntersecting){if(t.forEach(({columns:c})=>{c.forEach(({col:u,index:p})=>{setTimeout(()=>{u.style.transform=`translateY(-${10*1.2}em)`},p*35)})}),r.forEach((c,u)=>{setTimeout(()=>{c.classList.add("reveal-active")},u*180)}),a.forEach((c,u)=>{setTimeout(()=>{c.classList.add("reveal-active")},u*120)}),d){d.classList.add("reveal-active");const c=document.getElementById("about-tagline-container");c&&c.classList.add("reveal-active"),setTimeout(()=>{d.classList.add("portrait-pulse-active")},900)}s.unobserve(m.target)}})},{threshold:.15});s.observe(e),e.querySelectorAll(".about-magnetic-card").forEach(l=>{l.addEventListener("mousemove",m=>{const c=l.getBoundingClientRect(),u=c.left+c.width/2,p=c.top+c.height/2,f=m.clientX,g=m.clientY,h=f-u,y=g-p,v=h/c.width*16,x=y/c.height*16,L=Math.sqrt(v*v+x*x),E=8;let k=v,C=x;L>E&&(k=v/L*E,C=x/L*E),l.style.transition="none",l.style.transform=`translate(${k}px, ${C}px)`}),l.addEventListener("mouseleave",()=>{l.style.transition="transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",l.style.transform="translate(0px, 0px)"})})}function U(){const e=document.querySelectorAll("#work .grid a");if(e.length===0)return;e.forEach(t=>{t.classList.add("curtain-card");const n=document.createElement("div");n.className="curtain-overlay",t.appendChild(n)});const o=new IntersectionObserver(t=>{let n=0;t.forEach(r=>{if(r.isIntersecting){const a=r.target;setTimeout(()=>{a.classList.add("wipe-active")},n*120),n++,o.unobserve(a)}})},{threshold:.2});e.forEach(t=>o.observe(t))}function V(){const e=document.querySelectorAll("#problem .grid > div"),o=document.querySelectorAll("#what-i-build .grid > div");[...e,...o].forEach(n=>{n.classList.add("draw-border-card");const r=document.createElement("span");r.className="draw-border-line draw-border-top";const a=document.createElement("span");a.className="draw-border-line draw-border-right";const d=document.createElement("span");d.className="draw-border-line draw-border-bottom";const s=document.createElement("span");s.className="draw-border-line draw-border-left",n.appendChild(r),n.appendChild(a),n.appendChild(d),n.appendChild(s)})}function W(){const e=document.querySelector(".font-display.text-5xl"),o=document.querySelector(".font-display.text-3xl.text-primary"),t=document.querySelectorAll("input[type='range']");if(!e||!o||t.length<3)return;let n=0,r=0,a=!0;function d(c){return"$"+Math.round(c).toLocaleString()}function s(){const c=parseInt(t[0].value,10),u=parseInt(t[1].value,10),p=parseInt(t[2].value,10),f=c*u*p*52,g=f*.78;return{drain:f,recoverable:g}}function i(c=400){const{drain:u,recoverable:p}=s();l(e,n,u,c,d,' <span class="text-base text-muted-foreground">/ year</span>'),l(o,r,p,c,d,' <span class="text-base text-muted-foreground">/ year</span>'),n=u,r=p}function l(c,u,p,f,g,h){const y=performance.now();function v(x){const L=x-y,E=Math.min(L/f,1),k=E===1?1:1-Math.pow(2,-10*E),C=u+(p-u)*k;c.innerHTML=`${g(C)}${h}`,E<1?requestAnimationFrame(v):c.innerHTML=`${g(p)}${h}`}requestAnimationFrame(v)}t.forEach(c=>{c.addEventListener("input",()=>{i(400)})});const m=document.querySelector("#roi-calc")||document.querySelector("section[data-section='services'] + section");if(m){const c=new IntersectionObserver(u=>{u.forEach(p=>{if(p.isIntersecting&&a){a=!1;const{drain:f,recoverable:g}=s();n=f,r=g,l(e,0,f,1200,d,' <span class="text-base text-muted-foreground">/ year</span>'),l(o,0,g,1200,d,' <span class="text-base text-muted-foreground">/ year</span>'),c.unobserve(p.target)}})},{threshold:.1});c.observe(m)}}function G(){document.querySelectorAll(".faq-answer").forEach(o=>{const t=document.createElement("div");t.className="faq-answer-inner",t.innerHTML=o.innerHTML,o.innerHTML="",o.appendChild(t)})}function J(){const e=[document.querySelector("#toolkit .grid"),document.querySelector("#services .space-y-4"),document.querySelector("#process .rounded-2xl"),document.querySelector("#work-list tbody"),document.querySelector("#faq .space-y-4")||document.querySelector("#faq .border-t.hairline"),document.querySelector("#contact .grid")].filter(Boolean),o=new IntersectionObserver(t=>{t.forEach(n=>{if(n.isIntersecting){const r=n.target;r.querySelectorAll(".fade-up-item").forEach((d,s)=>{setTimeout(()=>{d.classList.add("fade-up-active")},s*80)}),o.unobserve(r)}})},{threshold:.1});e.forEach(t=>{Array.from(t.children).forEach(n=>{n.classList.add("fade-up-item")}),o.observe(t)})}function Q(){const e=document.querySelector("section.border-y.hairline");if(!e)return;const o=e.querySelector(".flex");o&&(o.classList.remove("animate-[marquee_40s_linear_infinite]"),o.classList.add("marquee-row","marquee-left"),e.classList.add("marquee-container"))}let b=null,w=null,T=null,M=null,q=null,A="light",B=null;function $(e){A=e,b=document.getElementById("bg-canvas"),b||(b=document.createElement("canvas"),b.id="bg-canvas",b.style.position="fixed",b.style.inset="0",b.style.pointerEvents="none",b.style.zIndex="-1",document.body.prepend(b)),w=b.getContext("2d"),F(),window.removeEventListener("resize",F),window.addEventListener("resize",F),window.removeEventListener("mousemove",N),window.addEventListener("mousemove",N),window.removeEventListener("mouseleave",O),window.addEventListener("mouseleave",O),T&&cancelAnimationFrame(T),A==="dark"&&!B&&Z(),A==="light"?K():ee()}function F(){b&&(b.width=window.innerWidth,b.height=window.innerHeight)}function N(e){M=e.clientX,q=e.clientY}function O(){M=null,q=null}function Z(){const e=document.createElement("canvas");e.width=128,e.height=128;const o=e.getContext("2d"),t=o.createImageData(128,128),n=t.data;for(let r=0;r<n.length;r+=4){const a=Math.floor(Math.random()*255);n[r]=a,n[r+1]=a,n[r+2]=a,n[r+3]=6}o.putImageData(t,0,0),B=w.createPattern(e,"repeat")}let D=[];function K(){D=[];const e=60;for(let t=0;t<e;t++)D.push({x:Math.random()*b.width,y:Math.random()*b.height,origX:0,origY:0,vx:(Math.random()>.5?1:-1)*(.15+Math.random()*.15),vy:(Math.random()>.5?1:-1)*(.15+Math.random()*.15),radius:1+Math.random()*1});function o(){w.clearRect(0,0,b.width,b.height),w.fillStyle="rgba(0, 0, 0, 0.04)",D.forEach(t=>{if(t.x+=t.vx,t.y+=t.vy,t.x<0&&(t.x=b.width),t.x>b.width&&(t.x=0),t.y<0&&(t.y=b.height),t.y>b.height&&(t.y=0),M!==null&&q!==null){const n=M-t.x,r=q-t.y;Math.sqrt(n*n+r*r)<80&&(t.x+=n*.02,t.y+=r*.02)}w.beginPath(),w.arc(t.x,t.y,t.radius,0,Math.PI*2),w.fill()}),T=requestAnimationFrame(o)}o()}function ee(){let e=performance.now();function o(n){const r=(n-e)/1e3;w.clearRect(0,0,b.width,b.height);const a=b.width,d=b.height,s=a*.4,i=a*(.5+.3*Math.sin(2*Math.PI*r/18)),l=d*(.5+.2*Math.cos(2*Math.PI*r/18));t(i,l,s,"rgba(99, 60, 180, 0.12)");const m=a*.35,c=a*(.5-.25*Math.sin(2*Math.PI*r/24)),u=d*(.5-.2*Math.cos(2*Math.PI*r/24));t(c,u,m,"rgba(30, 80, 160, 0.10)");const p=a*.3,f=a*(.5+.2*Math.sin(2*Math.PI*r/20+Math.PI/4)),g=d*(.5+.2*Math.sin(2*Math.PI*r/20));t(f,g,p,"rgba(140, 60, 100, 0.08)");const h=1+.1*Math.sin(2*Math.PI*r/30),y=a*.45*h,v=a*.5,x=d*.5;t(v,x,y,"rgba(20, 100, 120, 0.07)"),B&&(w.fillStyle=B,w.fillRect(0,0,a,d)),T=requestAnimationFrame(o)}function t(n,r,a,d){if(a<=0)return;const s=w.createRadialGradient(n,r,0,n,r,a);s.addColorStop(0,d),s.addColorStop(1,"rgba(0, 0, 0, 0)"),w.fillStyle=s,w.beginPath(),w.arc(n,r,a,0,Math.PI*2),w.fill()}requestAnimationFrame(o)}document.addEventListener("DOMContentLoaded",async()=>{te(),ne(),oe();try{await xe()}catch(e){console.error("Dynamic content hydration failed:",e)}re(),ae(),ie(),le(),ue(),me(),ge(),fe(),ce(),de(),pe(),he();try{se()}catch(e){console.error("Analytics tracking failed:",e)}});window.addEventListener("click",()=>!0,{once:!0});window.addEventListener("keydown",()=>!0,{once:!0});window.addEventListener("scroll",()=>!0,{once:!0});window.addEventListener("touchstart",()=>!0,{once:!0});function te(){const e=document.querySelectorAll("#theme-toggle"),o=document.querySelectorAll("#theme-sun-icon"),t=document.querySelectorAll("#theme-moon-icon");if(e.length===0)return;function n(d){d==="dark"?(o.forEach(s=>s.classList.remove("hidden")),t.forEach(s=>s.classList.add("hidden"))):(o.forEach(s=>s.classList.add("hidden")),t.forEach(s=>s.classList.remove("hidden")))}let r=document.documentElement.getAttribute("data-theme");r||(r=localStorage.getItem("ncs-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")),document.documentElement.setAttribute("data-theme",r),document.documentElement.classList.remove("dark","light"),document.documentElement.classList.add(r),n(r),$(r),setTimeout(()=>{document.documentElement.classList.remove("no-transition")},100);function a(d){const s=document.getElementById("bg-canvas");if(!s){$(d);return}s.style.transition="opacity 300ms ease",s.style.opacity="0",setTimeout(()=>{$(d),s.style.transition="opacity 400ms ease",s.style.opacity="1"},300)}e.forEach(d=>{d.addEventListener("click",()=>{document.documentElement.classList.add("theme-transitioning");const i=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",i),document.documentElement.classList.remove("dark","light"),document.documentElement.classList.add(i),localStorage.setItem("ncs-theme",i),n(i),a(i),setTimeout(()=>{document.documentElement.classList.remove("theme-transitioning")},600)})})}function ne(){const e=document.querySelectorAll(".faq-item");e.forEach(o=>{const t=o.querySelector(".faq-trigger");t&&t.addEventListener("click",()=>{const n=o.classList.contains("active");e.forEach(r=>{r.classList.remove("active")}),n||o.classList.add("active")})})}function oe(){const e=document.getElementById("roi-hours"),o=document.getElementById("roi-cost"),t=document.getElementById("roi-team"),n=document.getElementById("roi-hours-label"),r=document.getElementById("roi-cost-label"),a=document.getElementById("roi-team-label"),d=document.getElementById("roi-drain-value"),s=document.getElementById("roi-recoverable-value");if(!e||!o||!t)return;function i(c){return"$"+Math.round(c).toLocaleString()}function l(c){const u=parseFloat(c.min)||0,p=parseFloat(c.max)||100,g=((parseFloat(c.value)||0)-u)/(p-u)*100;c.style.setProperty("--percent",g+"%")}function m(){const c=parseInt(e.value,10),u=parseInt(o.value,10),p=parseInt(t.value,10);n&&(n.textContent=c+" hrs"),r&&(r.textContent="$"+u+" / hr"),a&&(a.textContent=p+(p===1?" person":" people")),l(e),l(o),l(t);const f=c*u*p*52,g=f*.78;d&&(d.innerHTML=`${i(f)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`),s&&(s.innerHTML=`${i(g)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`)}[e,o,t].forEach(c=>{c.addEventListener("input",m)}),m()}function re(){const e=document.getElementById("testimonial-slider");if(!e)return;const o=e.querySelectorAll(".testimonial-slide"),t=document.getElementById("testimonial-prev"),n=document.getElementById("testimonial-next"),r=document.querySelectorAll("#testimonial-dots button");if(o.length===0)return;let a=0,d=!1;function s(i){if(d||i===a)return;d=!0;const l=o[a],m=o[i];l.style.opacity="0",r[a].classList.remove("bg-primary","w-4"),r[a].classList.add("bg-foreground/25","w-2"),setTimeout(()=>{l.classList.add("hidden"),m.classList.remove("hidden"),m.offsetHeight,m.style.opacity="1",r[i].classList.remove("bg-foreground/25","w-2"),r[i].classList.add("bg-primary","w-4"),a=i,d=!1},300)}t==null||t.addEventListener("click",()=>{let i=a-1;i<0&&(i=o.length-1),s(i)}),n==null||n.addEventListener("click",()=>{let i=a+1;i>=o.length&&(i=0),s(i)}),r.forEach((i,l)=>{i.addEventListener("click",()=>{s(l)})}),o.forEach((i,l)=>{i.style.transition="opacity 0.3s ease",l!==0?i.style.opacity="0":i.style.opacity="1"})}function ae(){const e=document.querySelectorAll("section[id]"),o=document.querySelectorAll(".nav-link"),t=document.getElementById("active-section-indicator");if(e.length===0)return;const n={hero:"Home",problem:"Pain Points","what-i-build":"Services",toolkit:"Toolkit",services:"Pricing",process:"Process",work:"Selected Work","work-list":"Archive",about:"About",faq:"FAQ",contact:"Contact"},r={root:null,rootMargin:"-20% 0px -60% 0px",threshold:0},a=new IntersectionObserver(d=>{d.forEach(s=>{if(s.isIntersecting){const i=s.target.getAttribute("id");if(t){const l=n[i]||i.charAt(0).toUpperCase()+i.slice(1);t.innerHTML=`Viewing ${l} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-3 w-3"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>`}o.forEach(l=>{const m=l.getAttribute("href");m===`#${i}`||i==="work-list"&&m==="#work"||i==="what-i-build"&&m==="#services"?(l.classList.add("bg-primary","text-primary-foreground","active"),l.classList.remove("text-foreground/80")):(l.classList.remove("bg-primary","text-primary-foreground","active"),l.classList.add("text-foreground/80"))})}})},r);e.forEach(d=>a.observe(d))}function ie(){const e=document.getElementById("chatbot-toggle"),o=document.getElementById("chatbot-close"),t=document.getElementById("chatbot-window"),n=document.getElementById("chat-messages"),r=document.getElementById("chat-input"),a=document.getElementById("chat-form"),d=document.getElementById("chat-loading"),s=a==null?void 0:a.querySelector("button[type='submit']"),i=document.querySelectorAll(".chat-pill");if(!e||!t)return;const l=[{topic:"Full-Stack + Bubble",answer:"I architect the data model first, then ship UI in Bubble for visual surfaces and Next.js for anything that demands custom code."},{topic:"UI/UX Design",answer:"Design is structural — I work in Figma, then prototype directly in code. Token-first, component-driven."},{topic:"Custom Dev",answer:"Next.js + Supabase, TypeScript everywhere, edge-deployed. I write the code I'd want to inherit."}];c("assistant","Hey <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-hand inline-block mr-1 align-text-bottom text-primary'><path d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5'></path><path d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M6 15a4 4 0 0 0-4-4v0a2 2 0 0 0-2 2v6a8 8 0 0 0 8 8h5a6 6 0 0 0 6-6v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2'></path></svg> I'm the Emmanuel Twin. Ask me about how I build, what I charge, or anything else. Pick a starter or type a question."),e.addEventListener("click",()=>{t.classList.remove("hidden"),e.classList.add("opacity-0","pointer-events-none"),p()}),o.addEventListener("click",()=>{t.classList.add("hidden"),e.classList.remove("opacity-0","pointer-events-none")}),r.addEventListener("input",()=>{const f=r.value.trim().length>0;s.disabled=!f}),a.addEventListener("submit",f=>{f.preventDefault();const g=r.value.trim();g&&u(g)}),i.forEach(f=>{f.addEventListener("click",()=>{u(f.textContent)})});function c(f,g){const h=document.createElement("div");h.className=f==="user"?"flex justify-end":"flex justify-start";const y=f==="user",v=y?"bg-primary text-primary-foreground":"bg-foreground/[0.04] text-foreground border hairline",x=y?"rounded-2xl rounded-tr-none":"rounded-2xl rounded-tl-none";h.innerHTML=`
      <div class="max-w-[82%] px-4 py-3 text-sm leading-relaxed ${v} ${x}">
        ${g}
      </div>
    `,n.appendChild(h),p()}function u(f){c("user",f),r.value="",s.disabled=!0,r.disabled=!0,d.classList.remove("hidden"),p(),setTimeout(()=>{const g=f.toLowerCase();let h=l.find(v=>{const x=v.topic.toLowerCase().split(/[\s/+]+/)[0];return g.includes(x)||g.includes(v.topic.toLowerCase())});const y=h?h.answer:"I'd answer that personally — drop your details on the Contact page or pick a topic pill above and I'll route you to the right response.";d.classList.add("hidden"),r.disabled=!1,c("assistant",y),r.focus()},1400)}function p(){setTimeout(()=>{n.scrollTop=n.scrollHeight},50)}}async function se(){const e=I();if(!e||localStorage.getItem("admin_logged_in")==="true")return;let o=sessionStorage.getItem("ncs_analytics_session");o||(o=crypto.randomUUID?crypto.randomUUID():Math.random().toString(36).substring(2),sessionStorage.setItem("ncs_analytics_session",o));const t=window.location.pathname,r={page:t==="/"||t.endsWith("index.html")||t.endsWith("/")?"Home":t.endsWith("portfolio.html")?"Portfolio":t.split("/").pop()||"Unknown",referrer:document.referrer||"Direct",user_agent:navigator.userAgent,session_id:o};try{await e.from("analytics").insert([r])}catch(a){console.warn("Failed to log page view:",a)}}function le(){const e=document.querySelectorAll(".reveal");if(e.length===0)return;const o={root:null,rootMargin:"0px 0px -120px 0px",threshold:.05},t=new IntersectionObserver(n=>{n.forEach(r=>{r.isIntersecting&&(r.target.classList.add("reveal-active"),t.unobserve(r.target))})},o);e.forEach(n=>t.observe(n))}function ce(){const e=document.getElementById("chatbot-popup"),o=document.getElementById("chatbot-popup-dismiss"),t=document.getElementById("chatbot-popup-cta"),n=document.getElementById("chatbot-toggle"),r=document.getElementById("chatbot-window"),a=document.getElementById("chatbot-close");if(!e||!n)return;let d=!1,s=!1;if(!document.getElementById("popup-keyframe-style")){const u=document.createElement("style");u.id="popup-keyframe-style",u.textContent=`
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
    `,document.head.appendChild(u)}function i(){d||s||r&&!r.classList.contains("hidden")||(d=!0,e.style.animation="none",e.classList.remove("hidden"),e.offsetHeight,e.style.animation="popupIn 0.5s cubic-bezier(0.22,1,0.36,1) both",n.classList.add("pulse-hint"),setTimeout(()=>{s||l()},1e4))}function l(u=!1){if(!e.classList.contains("hidden")){if(n.classList.remove("pulse-hint"),u){e.classList.add("hidden");return}e.style.animation="popupOut 0.3s ease forwards",setTimeout(()=>e.classList.add("hidden"),290)}}function m(){s=!0,l(!0),r&&(r.classList.remove("hidden"),n.classList.add("opacity-0","pointer-events-none"))}const c=document.getElementById("what-i-build");if(c){const u=new IntersectionObserver(p=>{p.forEach(f=>{f.isIntersecting&&!d&&!s&&(i(),u.unobserve(f.target))})},{rootMargin:"0px 0px -25% 0px"});u.observe(c)}else{const u=()=>{if(d||s){window.removeEventListener("scroll",u);return}window.scrollY>400&&(i(),window.removeEventListener("scroll",u))};window.addEventListener("scroll",u,{passive:!0})}o&&o.addEventListener("click",u=>{u.stopPropagation(),s=!0,l()}),t&&t.addEventListener("click",u=>{u.stopPropagation(),m(),setTimeout(()=>{const p=document.getElementById("chat-input");p&&p.focus()},150)}),n.addEventListener("click",()=>{s=!0,l(!0)}),a&&a.addEventListener("click",()=>{n.classList.remove("pulse-hint")})}function de(){const e=document.getElementById("back-to-top");if(!e)return;let o=!1;window.addEventListener("scroll",()=>{const t=window.scrollY>400;t!==o&&(o=t,o?(e.classList.remove("opacity-0","pointer-events-none","translate-y-4"),e.classList.add("opacity-100","pointer-events-auto","translate-y-0")):(e.classList.add("opacity-0","pointer-events-none","translate-y-4"),e.classList.remove("opacity-100","pointer-events-auto","translate-y-0")))},{passive:!0}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function ue(){const e=document.querySelector(".stats-grid");if(!e)return;const o=e.querySelectorAll("dt"),t=[];o.forEach(s=>{const l=s.textContent.trim().match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);if(l){const m=l[1],c=parseInt(l[2],10),u=l[3];t.push({el:s,prefix:m,targetVal:c,suffix:u}),s.textContent=`${m}0${u}`}});function n(s){return s===1?1:1-Math.pow(2,-10*s)}function r(s,i,l,m,c,u){const p=performance.now();function f(g){const h=g-p,y=Math.min(h/u,1),v=n(y),x=Math.floor(i+(l-i)*v);s.textContent=`${m}${x}${c}`,y<1?requestAnimationFrame(f):s.textContent=`${m}${l}${c}`}requestAnimationFrame(f)}const a={root:null,threshold:.1,rootMargin:"0px 0px -50px 0px"},d=new IntersectionObserver(s=>{s.forEach(i=>{i.isIntersecting&&(t.forEach(l=>{r(l.el,0,l.targetVal,l.prefix,l.suffix,2e3)}),d.unobserve(i.target))})},a);d.observe(e)}function me(){const e=document.getElementById("hero-loop-video");if(!e)return;const o={root:null,threshold:.1};new IntersectionObserver(n=>{n.forEach(r=>{r.isIntersecting?e.play().catch(()=>{}):e.pause()})},o).observe(e)}function pe(){const e=document.getElementById("enhanced-contact-form");if(!e)return;const o=document.getElementById("contact-submit-btn"),t=document.getElementById("contact-btn-text"),n=document.getElementById("contact-btn-icon"),r=document.getElementById("contact-success"),a=document.getElementById("contact-error");e.addEventListener("submit",async d=>{d.preventDefault(),o&&(o.disabled=!0),t&&(t.textContent="Sending..."),n&&n.classList.add("animate-pulse"),r&&r.classList.add("hidden"),a&&a.classList.add("hidden");try{const s=new FormData(e);(await fetch(e.action,{method:"POST",body:s,headers:{Accept:"application/json"}})).ok?(e.reset(),r&&r.classList.remove("hidden"),t&&(t.textContent="Sent!")):(a&&a.classList.remove("hidden"),t&&(t.textContent="Send message"),o&&(o.disabled=!1))}catch{a&&a.classList.remove("hidden"),t&&(t.textContent="Send message"),o&&(o.disabled=!1)}finally{n&&n.classList.remove("animate-pulse")}})}function fe(){const e=document.getElementById("hero-loop-video"),o=document.getElementById("video-sound-toggle"),t=document.getElementById("video-sound-off"),n=document.getElementById("video-sound-on");!e||!o||o.addEventListener("click",r=>{r.stopPropagation();const a=e.muted;e.muted=!a,e.muted?(t.classList.remove("hidden"),n.classList.add("hidden")):(t.classList.add("hidden"),n.classList.remove("hidden"))})}function ge(){const e=document.getElementById("hero-loop-video"),o=document.getElementById("video-play-toggle"),t=document.getElementById("video-pause-icon"),n=document.getElementById("video-play-icon");!e||!o||(o.addEventListener("click",r=>{r.stopPropagation(),e.paused?e.play().then(()=>{t.classList.remove("hidden"),n.classList.add("hidden")}).catch(a=>{console.error("Video play failed:",a)}):(e.pause(),t.classList.add("hidden"),n.classList.remove("hidden"))}),e.addEventListener("play",()=>{t.classList.remove("hidden"),n.classList.add("hidden")}),e.addEventListener("pause",()=>{t.classList.add("hidden"),n.classList.remove("hidden")}))}function he(){const e=document.getElementById("about-portrait-wrapper");e&&e.addEventListener("click",()=>{e.classList.toggle("touch-active")})}let S=null;function I(){if(S)return S;const e=localStorage.getItem("sb_url")||"https://iyhynpndndgxyioojdwp.supabase.co",o=localStorage.getItem("sb_key")||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5aHlucG5kbmRneHlpb29qZHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDg4MTksImV4cCI6MjA5NjUyNDgxOX0.QrDi0n3i-Et4EUabbPU6dtn9A-g35xDm3Ogv22jzXe4";if(window.supabase)try{return S=window.supabase.createClient(e,o),S}catch(t){console.error("Supabase client failed to initialize:",t)}return null}async function be(){const e=I();if(e){const{data:t,error:n}=await e.from("projects").select("*").order("created_at",{ascending:!1});if(!n)return t}const o=localStorage.getItem("db_projects");return o?JSON.parse(o):[]}async function ye(){const e=I();if(e){const{data:t,error:n}=await e.from("testimonials").select("*").order("created_at",{ascending:!1});if(!n)return t}const o=localStorage.getItem("db_testimonials");return o?JSON.parse(o):[]}async function ve(){const e=I();if(e){const{data:t,error:n}=await e.from("about_me").select("*").eq("key","profile_info").single();if(!n&&t)return t.value}const o=localStorage.getItem("db_about_me");return o?JSON.parse(o):null}async function we(){const e=I();if(e){const{data:t,error:n}=await e.from("blogs").select("*").order("created_at",{ascending:!1});if(!n)return t}const o=localStorage.getItem("db_blogs");return o?JSON.parse(o):[]}async function xe(){const e=await be();if(e&&e.length>0){const a=document.getElementById("projects-showcase-grid");a&&(a.innerHTML="",e.forEach(i=>{const l=(i.tags||[]).map(u=>`<span class="rounded-full border hairline px-2.5 py-1">${u}</span>`).join(""),m=i.image_url?`<img src="${i.image_url}" class="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-[1.03] transition duration-500" alt="${i.title} screen">`:`<div class="w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center font-display text-3xl font-semibold text-primary/30 select-none">${i.title.substring(0,2).toUpperCase()}</div>`,c=document.createElement("a");c.href=i.link||"#",c.target="_blank",c.className="group block rounded-2xl border hairline overflow-hidden transition hover:shadow-lg md:col-span-4",c.innerHTML=`
          <div class="aspect-square w-full overflow-hidden relative">
            ${m}
          </div>
          <div class="p-5">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="eyebrow">${i.category} · ${i.year}</div>
                <h3 class="mt-2 font-display text-3xl md:text-4xl">${i.title}</h3>
                <p class="mt-2 text-sm text-muted-foreground leading-relaxed">${i.description}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-5 w-5 shrink-0 text-muted-foreground transition group-hover:rotate-45 group-hover:text-primary" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </div>
            <div class="mt-4 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
              ${l}
            </div>
          </div>
        `,a.appendChild(c)}));const d=document.getElementById("portfolio-showcase-grid");d&&(d.innerHTML="",e.forEach(i=>{const l=(i.tags||[]).map(u=>`<span class="rounded-full border hairline px-2.5 py-1">${u}</span>`).join(""),m=i.image_url?`<img src="${i.image_url}" class="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-[1.03] transition duration-500" alt="${i.title} screen">`:`<div class="w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center font-display text-3xl font-semibold text-primary/30 select-none">${i.title.substring(0,2).toUpperCase()}</div>`,c=document.createElement("a");c.href=i.link||"#",c.target="_blank",c.className="group block rounded-2xl border hairline p-6 transition hover:bg-foreground/[0.03] md:col-span-4",c.innerHTML=`
          <div class="aspect-square w-full rounded-xl overflow-hidden mb-4 border border-foreground/5 relative">
            ${m}
          </div>
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="eyebrow">${i.category} · ${i.year}</div>
              <h3 class="mt-3 font-display text-3xl md:text-4xl">${i.title}</h3>
              <p class="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">${i.description}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-5 w-5 text-muted-foreground transition group-hover:rotate-45 group-hover:text-primary" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
          </div>
          <div class="mt-6 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
            ${l}
          </div>
        `,d.appendChild(c)}));const s=document.getElementById("registry-list-container");s&&(s.innerHTML="",e.forEach((i,l)=>{const m=String(l+1).padStart(2,"0"),c=document.createElement("a");c.href=i.link||"#",c.target="_blank",c.className="group grid grid-cols-12 items-center gap-4 border-b hairline py-8 md:py-10 hover:bg-foreground/[0.03] -mx-4 px-4 md:-mx-8 md:px-8 transition",c.innerHTML=`
          <div class="col-span-1 font-mono text-xs text-muted-foreground">${m}</div>
          <div class="col-span-7 md:col-span-6">
            <div class="font-display text-3xl md:text-5xl">${i.title}</div>
            <div class="mt-2 text-sm text-muted-foreground">${i.description}</div>
          </div>
          <div class="hidden md:block col-span-3 text-sm text-muted-foreground">${i.category}</div>
          <div class="col-span-3 md:col-span-1 text-right text-sm text-muted-foreground">${i.year}</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right col-span-1 ml-auto h-5 w-5 text-muted-foreground transition group-hover:rotate-45 group-hover:text-primary" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
        `,s.appendChild(c)}))}const o=await ye();if(o&&o.length>0){const a=document.getElementById("testimonial-slider"),d=document.getElementById("testimonial-dots");a&&d&&(a.innerHTML="",d.innerHTML="",o.forEach((s,i)=>{const l=i===0,m=document.createElement("blockquote");m.className=`testimonial-slide transition-opacity duration-500 w-full text-center ${l?"":"hidden opacity-0"}`,l&&m.setAttribute("data-active","true"),m.innerHTML=`
          <p class="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed max-w-3xl mx-auto">
            "${s.review_text}"
          </p>
          <cite class="mt-8 block not-italic">
            <span class="font-display text-lg font-semibold text-foreground">${s.client_name}</span>
            <span class="text-xs uppercase tracking-widest text-muted-foreground block mt-1">${s.company_role}</span>
          </cite>
        `,a.appendChild(m);const c=document.createElement("button");c.setAttribute("aria-label",`Go to testimonial ${i+1}`),c.className=`h-2 ${l?"w-4 bg-primary":"w-2 bg-foreground/25"} rounded-full transition-all duration-300 cursor-pointer`,d.appendChild(c)}))}const t=await ve();if(t){const a=document.getElementById("about-tagline"),d=document.getElementById("about-subtagline"),s=document.getElementById("about-bio-container");a&&(a.textContent=t.name),d&&(d.textContent=t.tagline),s&&(t.bio1||t.bio2)&&(s.innerHTML=`
        <p><strong class="text-foreground">My name is <span class="font-display font-bold text-primary text-lg md:text-xl">${t.name}</span>.</strong> ${t.bio1}</p>
        ${t.bio2?`<p>${t.bio2}</p>`:""}
      `)}const n=await we(),r=document.getElementById("changelog-container");if(r){const a=r.querySelector("#blog-empty-state"),d=r.querySelector("#blog-grid"),s=r.querySelector("#blog-featured-slot"),i=r.querySelector("#blog-mini-grid"),l=(n||[]).filter(m=>m.status==="Published");if(l.length>0){a&&(a.style.display="none"),d&&d.classList.remove("hidden");const m=l[0],c=m.created_at?new Date(m.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"";s&&(s.innerHTML=`
          <article class="blog-featured-card">
            ${m.image_url?`<div style="overflow:hidden"><img src="${m.image_url}" alt="${m.title}" class="blog-thumb"></div>`:""}
            <div style="padding:1.75rem 2rem 2rem">
              <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem;flex-wrap:wrap">
                <span class="blog-tag primary">Featured</span>
                ${m.category?`<span class="blog-tag">${m.category}</span>`:""}
                <span style="font-family:var(--font-mono);font-size:0.65rem;color:var(--muted-foreground);opacity:0.6;margin-left:auto">${c}</span>
              </div>
              <h3 style="font-family:var(--font-display);font-size:clamp(1.4rem,3vw,2rem);font-weight:700;line-height:1.2;color:var(--foreground);margin-bottom:0.75rem">${m.title}</h3>
              ${m.excerpt?`<p style="font-size:0.9rem;color:var(--muted-foreground);line-height:1.65;max-width:680px">${m.excerpt}</p>`:""}
              ${m.url?`<a href="${m.url}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;margin-top:1.25rem;font-size:0.825rem;color:var(--primary);text-decoration:none;font-weight:500">Read article <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></a>`:""}
            </div>
          </article>
        `),i&&l.length>1&&(i.innerHTML="",l.slice(1).forEach((p,f)=>{const g=p.created_at?new Date(p.created_at).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"",h=document.createElement("article");h.className="blog-mini-card",h.innerHTML=`
            <span class="blog-mini-number">0${f+2}</span>
            <div style="flex:1;min-width:0">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;flex-wrap:wrap">
                ${p.category?`<span class="blog-tag">${p.category}</span>`:""}
                <span style="font-family:var(--font-mono);font-size:0.6rem;color:var(--muted-foreground);opacity:0.6">${g}</span>
              </div>
              <h4 style="font-family:var(--font-display);font-size:1.05rem;font-weight:700;color:var(--foreground);line-height:1.3;margin-bottom:4px">${p.title}</h4>
              ${p.excerpt?`<p style="font-size:0.8rem;color:var(--muted-foreground);line-height:1.55;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${p.excerpt}</p>`:""}
              ${p.url?`<a href="${p.url}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:4px;margin-top:8px;font-size:0.75rem;color:var(--primary);text-decoration:none">Read <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></a>`:""}
            </div>
          `,i.appendChild(h)}));const u=document.getElementById("blog-view-all");u&&l.length>4&&(u.style.display="inline-flex")}else a&&(a.style.display=""),d&&d.classList.add("hidden")}}
