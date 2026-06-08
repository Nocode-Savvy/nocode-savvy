document.addEventListener("DOMContentLoaded",()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(P(),e){H();return}R(),Y(),j(),X(),z(),_(),V(),U(),W(),J(),G(),Q()});function P(){const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e)}function H(){document.querySelectorAll("#hero dl dt").forEach(t=>{t.style.transform="none"});const r=document.querySelector("#about");if(r){r.querySelectorAll(".char-rollup-target").forEach(i=>i.style.transform="none"),r.querySelectorAll(".space-y-6 > p").forEach(i=>{i.style.filter="none",i.style.opacity="1",i.style.transform="none"}),r.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span").forEach(i=>{i.style.opacity="1",i.style.transform="none"});const a=document.getElementById("about-portrait");a&&(a.style.opacity="1",a.style.transform="none");const d=document.getElementById("about-tagline-container");d&&(d.style.opacity="1",d.style.transform="none")}}function R(){const e=document.querySelector("#hero h1");if(!e)return;e.classList.add("clip-reveal");let r=0;const t=.06;function n(o){if(o.nodeType===Node.TEXT_NODE){const d=o.nodeValue.split(/(\s+)/),i=document.createDocumentFragment();d.forEach(s=>{if(s.trim().length>0){const c=document.createElement("span");c.className="animate-word",c.textContent=s,c.style.animationDelay=`${r*t}s`,i.appendChild(c),r++}else i.appendChild(document.createTextNode(s))}),o.parentNode.replaceChild(i,o)}else o.nodeType===Node.ELEMENT_NODE&&o.tagName!=="SVG"&&Array.from(o.childNodes).forEach(n)}Array.from(e.childNodes).forEach(n)}function Y(){const e=document.querySelector('header a[href="#hero"]');if(!e)return;const r=e.querySelector(".bg-primary"),t=e.querySelector(".text-primary");if(!t||!r)return;const n="Nocode",o="Savvy";let a=!1;e.addEventListener("mouseenter",()=>{if(a)return;a=!0;const d="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",i=performance.now(),s=600,c=30;function p(l){const u=l-i;let f="";for(let g=0;g<n.length;g++){const v=g*c;u>=s||u>=v+(s-n.length*c)?f+=n[g]:f+=d[Math.floor(Math.random()*d.length)]}let m="";for(let g=0;g<o.length;g++){const v=(n.length+g)*c;u>=s||u>=v+(s-(n.length+o.length)*c)?m+=o[g]:m+=d[Math.floor(Math.random()*d.length)]}let h=r.nextSibling;h&&h.nodeType===Node.TEXT_NODE&&(h.nodeValue=f),t.textContent=m,u<s?requestAnimationFrame(p):(h&&h.nodeType===Node.TEXT_NODE&&(h.nodeValue=n),t.textContent=o,a=!1)}requestAnimationFrame(p)})}function j(){const e=document.querySelectorAll("h1, h2, h3"),r=[];e.forEach(n=>{const o=n.textContent.trim();o.split(/\s+/).length<=3&&(n.classList.add("gradient-wipe"),n.setAttribute("data-text",o),r.push(n))});const t=new IntersectionObserver(n=>{n.forEach(o=>{o.isIntersecting&&(o.target.classList.add("wipe-active"),t.unobserve(o.target))})},{threshold:.5});r.forEach(n=>t.observe(n))}function X(){const e=document.getElementById("typewriter-text");if(!e)return;const r=["SaaS platforms that scale.","Bubble apps that don't break.","AI integrations that actually work.","Payment systems wired right.","MVPs shipped in 3 weeks.","The thing your business actually needs."];let t=0,n=0,o=!1;setTimeout(()=>{a()},1400);function a(){const d=r[t];o?(e.textContent=d.substring(0,n-1),n--,n===0?(o=!1,t=(t+1)%r.length,setTimeout(a,550)):setTimeout(a,30)):(e.textContent=d.substring(0,n+1),n++,n===d.length?(o=!0,setTimeout(a,1600)):setTimeout(a,55))}}function z(){const e=document.querySelectorAll(".underline-sweep-target");if(e.length===0)return;const r=new IntersectionObserver(t=>{t.forEach(n=>{n.isIntersecting&&(n.target.classList.add("sweep-active"),r.unobserve(n.target))})},{threshold:.3});e.forEach(t=>r.observe(t))}function _(){const e=document.querySelector("#about");if(!e)return;const r=e.querySelectorAll(".char-rollup-target"),t=[],n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";r.forEach(c=>{const p=c.textContent.trim();c.innerHTML="",c.classList.add("char-roll-container");const l=[];for(let u=0;u<p.length;u++){const f=p[u];if(f===" "){const m=document.createElement("span");m.className="char-roll-char",m.innerHTML="&nbsp;",c.appendChild(m)}else{const m=document.createElement("span");m.className="char-roll-col";const h=10;for(let v=0;v<h;v++){const y=document.createElement("span");y.className="char-roll-char",y.textContent=n[Math.floor(Math.random()*n.length)],m.appendChild(y)}const g=document.createElement("span");g.className="char-roll-char",g.textContent=f,m.appendChild(g),c.appendChild(m),l.push({col:m,index:u})}}t.push({columns:l,target:c})});const o=e.querySelectorAll(".space-y-6 > p");o.forEach(c=>c.classList.add("about-bio-p"));const a=e.querySelectorAll(".flex.flex-wrap.gap-2.text-xs span");a.forEach(c=>c.classList.add("about-badge-item"));const d=document.getElementById("about-portrait"),i=new IntersectionObserver(c=>{c.forEach(p=>{if(p.isIntersecting){if(t.forEach(({columns:l})=>{l.forEach(({col:u,index:f})=>{setTimeout(()=>{u.style.transform=`translateY(-${10*1.2}em)`},f*35)})}),o.forEach((l,u)=>{setTimeout(()=>{l.classList.add("reveal-active")},u*180)}),a.forEach((l,u)=>{setTimeout(()=>{l.classList.add("reveal-active")},u*120)}),d){d.classList.add("reveal-active");const l=document.getElementById("about-tagline-container");l&&l.classList.add("reveal-active"),setTimeout(()=>{d.classList.add("portrait-pulse-active")},900)}i.unobserve(p.target)}})},{threshold:.15});i.observe(e),e.querySelectorAll(".about-magnetic-card").forEach(c=>{c.addEventListener("mousemove",p=>{const l=c.getBoundingClientRect(),u=l.left+l.width/2,f=l.top+l.height/2,m=p.clientX,h=p.clientY,g=m-u,v=h-f,y=g/l.width*16,x=v/l.height*16,L=Math.sqrt(y*y+x*x),E=8;let I=y,k=x;L>E&&(I=y/L*E,k=x/L*E),c.style.transition="none",c.style.transform=`translate(${I}px, ${k}px)`}),c.addEventListener("mouseleave",()=>{c.style.transition="transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",c.style.transform="translate(0px, 0px)"})})}function V(){const e=document.querySelectorAll("#work .grid a");if(e.length===0)return;e.forEach(t=>{t.classList.add("curtain-card");const n=document.createElement("div");n.className="curtain-overlay",t.appendChild(n)});const r=new IntersectionObserver(t=>{let n=0;t.forEach(o=>{if(o.isIntersecting){const a=o.target;setTimeout(()=>{a.classList.add("wipe-active")},n*120),n++,r.unobserve(a)}})},{threshold:.2});e.forEach(t=>r.observe(t))}function U(){const e=document.querySelectorAll("#problem .grid > div"),r=document.querySelectorAll("#what-i-build .grid > div");[...e,...r].forEach(n=>{n.classList.add("draw-border-card");const o=document.createElement("span");o.className="draw-border-line draw-border-top";const a=document.createElement("span");a.className="draw-border-line draw-border-right";const d=document.createElement("span");d.className="draw-border-line draw-border-bottom";const i=document.createElement("span");i.className="draw-border-line draw-border-left",n.appendChild(o),n.appendChild(a),n.appendChild(d),n.appendChild(i)})}function W(){const e=document.querySelector(".font-display.text-5xl"),r=document.querySelector(".font-display.text-3xl.text-primary"),t=document.querySelectorAll("input[type='range']");if(!e||!r||t.length<3)return;let n=0,o=0,a=!0;function d(l){return"$"+Math.round(l).toLocaleString()}function i(){const l=parseInt(t[0].value,10),u=parseInt(t[1].value,10),f=parseInt(t[2].value,10),m=l*u*f*52,h=m*.78;return{drain:m,recoverable:h}}function s(l=400){const{drain:u,recoverable:f}=i();c(e,n,u,l,d,' <span class="text-base text-muted-foreground">/ year</span>'),c(r,o,f,l,d,' <span class="text-base text-muted-foreground">/ year</span>'),n=u,o=f}function c(l,u,f,m,h,g){const v=performance.now();function y(x){const L=x-v,E=Math.min(L/m,1),I=E===1?1:1-Math.pow(2,-10*E),k=u+(f-u)*I;l.innerHTML=`${h(k)}${g}`,E<1?requestAnimationFrame(y):l.innerHTML=`${h(f)}${g}`}requestAnimationFrame(y)}t.forEach(l=>{l.addEventListener("input",()=>{s(400)})});const p=document.querySelector("#roi-calc")||document.querySelector("section[data-section='services'] + section");if(p){const l=new IntersectionObserver(u=>{u.forEach(f=>{if(f.isIntersecting&&a){a=!1;const{drain:m,recoverable:h}=i();n=m,o=h,c(e,0,m,1200,d,' <span class="text-base text-muted-foreground">/ year</span>'),c(r,0,h,1200,d,' <span class="text-base text-muted-foreground">/ year</span>'),l.unobserve(f.target)}})},{threshold:.1});l.observe(p)}}function J(){document.querySelectorAll(".faq-answer").forEach(r=>{const t=document.createElement("div");t.className="faq-answer-inner",t.innerHTML=r.innerHTML,r.innerHTML="",r.appendChild(t)})}function G(){const e=[document.querySelector("#toolkit .grid"),document.querySelector("#services .space-y-4"),document.querySelector("#process .rounded-2xl"),document.querySelector("#work-list tbody"),document.querySelector("#faq .space-y-4")||document.querySelector("#faq .border-t.hairline"),document.querySelector("#contact .grid")].filter(Boolean),r=new IntersectionObserver(t=>{t.forEach(n=>{if(n.isIntersecting){const o=n.target;o.querySelectorAll(".fade-up-item").forEach((d,i)=>{setTimeout(()=>{d.classList.add("fade-up-active")},i*80)}),r.unobserve(o)}})},{threshold:.1});e.forEach(t=>{Array.from(t.children).forEach(n=>{n.classList.add("fade-up-item")}),r.observe(t)})}function Q(){const e=document.querySelector("section.border-y.hairline");if(!e)return;const r=e.querySelector(".flex");r&&(r.classList.remove("animate-[marquee_40s_linear_infinite]"),r.classList.add("marquee-row","marquee-left"),e.classList.add("marquee-container"))}let b=null,w=null,S=null,T=null,M=null,A="light",q=null;function $(e){A=e,b=document.getElementById("bg-canvas"),b||(b=document.createElement("canvas"),b.id="bg-canvas",b.style.position="fixed",b.style.inset="0",b.style.pointerEvents="none",b.style.zIndex="-1",document.body.prepend(b)),w=b.getContext("2d"),F(),window.removeEventListener("resize",F),window.addEventListener("resize",F),window.removeEventListener("mousemove",D),window.addEventListener("mousemove",D),window.removeEventListener("mouseleave",O),window.addEventListener("mouseleave",O),S&&cancelAnimationFrame(S),A==="dark"&&!q&&Z(),A==="light"?K():ee()}function F(){b&&(b.width=window.innerWidth,b.height=window.innerHeight)}function D(e){T=e.clientX,M=e.clientY}function O(){T=null,M=null}function Z(){const e=document.createElement("canvas");e.width=128,e.height=128;const r=e.getContext("2d"),t=r.createImageData(128,128),n=t.data;for(let o=0;o<n.length;o+=4){const a=Math.floor(Math.random()*255);n[o]=a,n[o+1]=a,n[o+2]=a,n[o+3]=6}r.putImageData(t,0,0),q=w.createPattern(e,"repeat")}let N=[];function K(){N=[];const e=60;for(let t=0;t<e;t++)N.push({x:Math.random()*b.width,y:Math.random()*b.height,origX:0,origY:0,vx:(Math.random()>.5?1:-1)*(.15+Math.random()*.15),vy:(Math.random()>.5?1:-1)*(.15+Math.random()*.15),radius:1+Math.random()*1});function r(){w.clearRect(0,0,b.width,b.height),w.fillStyle="rgba(0, 0, 0, 0.04)",N.forEach(t=>{if(t.x+=t.vx,t.y+=t.vy,t.x<0&&(t.x=b.width),t.x>b.width&&(t.x=0),t.y<0&&(t.y=b.height),t.y>b.height&&(t.y=0),T!==null&&M!==null){const n=T-t.x,o=M-t.y;Math.sqrt(n*n+o*o)<80&&(t.x+=n*.02,t.y+=o*.02)}w.beginPath(),w.arc(t.x,t.y,t.radius,0,Math.PI*2),w.fill()}),S=requestAnimationFrame(r)}r()}function ee(){let e=performance.now();function r(n){const o=(n-e)/1e3;w.clearRect(0,0,b.width,b.height);const a=b.width,d=b.height,i=a*.4,s=a*(.5+.3*Math.sin(2*Math.PI*o/18)),c=d*(.5+.2*Math.cos(2*Math.PI*o/18));t(s,c,i,"rgba(99, 60, 180, 0.12)");const p=a*.35,l=a*(.5-.25*Math.sin(2*Math.PI*o/24)),u=d*(.5-.2*Math.cos(2*Math.PI*o/24));t(l,u,p,"rgba(30, 80, 160, 0.10)");const f=a*.3,m=a*(.5+.2*Math.sin(2*Math.PI*o/20+Math.PI/4)),h=d*(.5+.2*Math.sin(2*Math.PI*o/20));t(m,h,f,"rgba(140, 60, 100, 0.08)");const g=1+.1*Math.sin(2*Math.PI*o/30),v=a*.45*g,y=a*.5,x=d*.5;t(y,x,v,"rgba(20, 100, 120, 0.07)"),q&&(w.fillStyle=q,w.fillRect(0,0,a,d)),S=requestAnimationFrame(r)}function t(n,o,a,d){if(a<=0)return;const i=w.createRadialGradient(n,o,0,n,o,a);i.addColorStop(0,d),i.addColorStop(1,"rgba(0, 0, 0, 0)"),w.fillStyle=i,w.beginPath(),w.arc(n,o,a,0,Math.PI*2),w.fill()}requestAnimationFrame(r)}document.addEventListener("DOMContentLoaded",async()=>{te(),ne(),oe();try{await we()}catch(e){console.error("Dynamic content hydration failed:",e)}re(),ae(),ie(),se(),de(),ue(),fe(),pe(),ce(),le(),me(),he()});window.addEventListener("click",()=>!0,{once:!0});window.addEventListener("keydown",()=>!0,{once:!0});window.addEventListener("scroll",()=>!0,{once:!0});window.addEventListener("touchstart",()=>!0,{once:!0});function te(){const e=document.querySelectorAll("#theme-toggle"),r=document.querySelectorAll("#theme-sun-icon"),t=document.querySelectorAll("#theme-moon-icon");if(e.length===0)return;function n(d){d==="dark"?(r.forEach(i=>i.classList.remove("hidden")),t.forEach(i=>i.classList.add("hidden"))):(r.forEach(i=>i.classList.add("hidden")),t.forEach(i=>i.classList.remove("hidden")))}let o=document.documentElement.getAttribute("data-theme");o||(o=localStorage.getItem("ncs-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")),document.documentElement.setAttribute("data-theme",o),document.documentElement.classList.remove("dark","light"),document.documentElement.classList.add(o),n(o),$(o),setTimeout(()=>{document.documentElement.classList.remove("no-transition")},100);function a(d){const i=document.getElementById("bg-canvas");if(!i){$(d);return}i.style.transition="opacity 300ms ease",i.style.opacity="0",setTimeout(()=>{$(d),i.style.transition="opacity 400ms ease",i.style.opacity="1"},300)}e.forEach(d=>{d.addEventListener("click",()=>{document.documentElement.classList.add("theme-transitioning");const s=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",s),document.documentElement.classList.remove("dark","light"),document.documentElement.classList.add(s),localStorage.setItem("ncs-theme",s),n(s),a(s),setTimeout(()=>{document.documentElement.classList.remove("theme-transitioning")},600)})})}function ne(){const e=document.querySelectorAll(".faq-item");e.forEach(r=>{const t=r.querySelector(".faq-trigger");t&&t.addEventListener("click",()=>{const n=r.classList.contains("active");e.forEach(o=>{o.classList.remove("active")}),n||r.classList.add("active")})})}function oe(){const e=document.getElementById("roi-hours"),r=document.getElementById("roi-cost"),t=document.getElementById("roi-team"),n=document.getElementById("roi-hours-label"),o=document.getElementById("roi-cost-label"),a=document.getElementById("roi-team-label"),d=document.getElementById("roi-drain-value"),i=document.getElementById("roi-recoverable-value");if(!e||!r||!t)return;function s(l){return"$"+Math.round(l).toLocaleString()}function c(l){const u=parseFloat(l.min)||0,f=parseFloat(l.max)||100,h=((parseFloat(l.value)||0)-u)/(f-u)*100;l.style.setProperty("--percent",h+"%")}function p(){const l=parseInt(e.value,10),u=parseInt(r.value,10),f=parseInt(t.value,10);n&&(n.textContent=l+" hrs"),o&&(o.textContent="$"+u+" / hr"),a&&(a.textContent=f+(f===1?" person":" people")),c(e),c(r),c(t);const m=l*u*f*52,h=m*.78;d&&(d.innerHTML=`${s(m)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`),i&&(i.innerHTML=`${s(h)}<span class="text-sm font-normal text-muted-foreground tracking-normal"> / year</span>`)}[e,r,t].forEach(l=>{l.addEventListener("input",p)}),p()}function re(){const e=document.getElementById("testimonial-slider");if(!e)return;const r=e.querySelectorAll(".testimonial-slide"),t=document.getElementById("testimonial-prev"),n=document.getElementById("testimonial-next"),o=document.querySelectorAll("#testimonial-dots button");if(r.length===0)return;let a=0,d=!1;function i(s){if(d||s===a)return;d=!0;const c=r[a],p=r[s];c.style.opacity="0",o[a].classList.remove("bg-primary","w-4"),o[a].classList.add("bg-foreground/25","w-2"),setTimeout(()=>{c.classList.add("hidden"),p.classList.remove("hidden"),p.offsetHeight,p.style.opacity="1",o[s].classList.remove("bg-foreground/25","w-2"),o[s].classList.add("bg-primary","w-4"),a=s,d=!1},300)}t==null||t.addEventListener("click",()=>{let s=a-1;s<0&&(s=r.length-1),i(s)}),n==null||n.addEventListener("click",()=>{let s=a+1;s>=r.length&&(s=0),i(s)}),o.forEach((s,c)=>{s.addEventListener("click",()=>{i(c)})}),r.forEach((s,c)=>{s.style.transition="opacity 0.3s ease",c!==0?s.style.opacity="0":s.style.opacity="1"})}function ae(){const e=document.querySelectorAll("section[id]"),r=document.querySelectorAll(".nav-link"),t=document.getElementById("active-section-indicator");if(e.length===0)return;const n={hero:"Home",problem:"Pain Points","what-i-build":"Services",toolkit:"Toolkit",services:"Pricing",process:"Process",work:"Selected Work","work-list":"Archive",about:"About",faq:"FAQ",contact:"Contact"},o={root:null,rootMargin:"-20% 0px -60% 0px",threshold:0},a=new IntersectionObserver(d=>{d.forEach(i=>{if(i.isIntersecting){const s=i.target.getAttribute("id");if(t){const c=n[s]||s.charAt(0).toUpperCase()+s.slice(1);t.innerHTML=`Viewing ${c} <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-3 w-3"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>`}r.forEach(c=>{const p=c.getAttribute("href");p===`#${s}`||s==="work-list"&&p==="#work"||s==="what-i-build"&&p==="#services"?(c.classList.add("bg-primary","text-primary-foreground","active"),c.classList.remove("text-foreground/80")):(c.classList.remove("bg-primary","text-primary-foreground","active"),c.classList.add("text-foreground/80"))})}})},o);e.forEach(d=>a.observe(d))}function ie(){const e=document.getElementById("chatbot-toggle"),r=document.getElementById("chatbot-close"),t=document.getElementById("chatbot-window"),n=document.getElementById("chat-messages"),o=document.getElementById("chat-input"),a=document.getElementById("chat-form"),d=document.getElementById("chat-loading"),i=a==null?void 0:a.querySelector("button[type='submit']"),s=document.querySelectorAll(".chat-pill");if(!e||!t)return;const c=[{topic:"Full-Stack + Bubble",answer:"I architect the data model first, then ship UI in Bubble for visual surfaces and Next.js for anything that demands custom code."},{topic:"UI/UX Design",answer:"Design is structural — I work in Figma, then prototype directly in code. Token-first, component-driven."},{topic:"Custom Dev",answer:"Next.js + Supabase, TypeScript everywhere, edge-deployed. I write the code I'd want to inherit."}];l("assistant","Hey <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-hand inline-block mr-1 align-text-bottom text-primary'><path d='M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5'></path><path d='M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8'></path><path d='M6 15a4 4 0 0 0-4-4v0a2 2 0 0 0-2 2v6a8 8 0 0 0 8 8h5a6 6 0 0 0 6-6v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2'></path></svg> I'm the Emmanuel Twin. Ask me about how I build, what I charge, or anything else. Pick a starter or type a question."),e.addEventListener("click",()=>{t.classList.remove("hidden"),e.classList.add("opacity-0","pointer-events-none"),f()}),r.addEventListener("click",()=>{t.classList.add("hidden"),e.classList.remove("opacity-0","pointer-events-none")}),o.addEventListener("input",()=>{const m=o.value.trim().length>0;i.disabled=!m}),a.addEventListener("submit",m=>{m.preventDefault();const h=o.value.trim();h&&u(h)}),s.forEach(m=>{m.addEventListener("click",()=>{u(m.textContent)})});function l(m,h){const g=document.createElement("div");g.className=m==="user"?"flex justify-end":"flex justify-start";const v=m==="user",y=v?"bg-primary text-primary-foreground":"bg-foreground/[0.04] text-foreground border hairline",x=v?"rounded-2xl rounded-tr-none":"rounded-2xl rounded-tl-none";g.innerHTML=`
      <div class="max-w-[82%] px-4 py-3 text-sm leading-relaxed ${y} ${x}">
        ${h}
      </div>
    `,n.appendChild(g),f()}function u(m){l("user",m),o.value="",i.disabled=!0,o.disabled=!0,d.classList.remove("hidden"),f(),setTimeout(()=>{const h=m.toLowerCase();let g=c.find(y=>{const x=y.topic.toLowerCase().split(/[\s/+]+/)[0];return h.includes(x)||h.includes(y.topic.toLowerCase())});const v=g?g.answer:"I'd answer that personally — drop your details on the Contact page or pick a topic pill above and I'll route you to the right response.";d.classList.add("hidden"),o.disabled=!1,l("assistant",v),o.focus()},1400)}function f(){setTimeout(()=>{n.scrollTop=n.scrollHeight},50)}}function se(){const e=document.querySelectorAll(".reveal");if(e.length===0)return;const r={root:null,rootMargin:"0px 0px -120px 0px",threshold:.05},t=new IntersectionObserver(n=>{n.forEach(o=>{o.isIntersecting&&(o.target.classList.add("reveal-active"),t.unobserve(o.target))})},r);e.forEach(n=>t.observe(n))}function ce(){const e=document.getElementById("chatbot-popup"),r=document.getElementById("chatbot-popup-dismiss"),t=document.getElementById("chatbot-popup-cta"),n=document.getElementById("chatbot-toggle"),o=document.getElementById("chatbot-window"),a=document.getElementById("chatbot-close");if(!e||!n)return;let d=!1,i=!1;if(!document.getElementById("popup-keyframe-style")){const u=document.createElement("style");u.id="popup-keyframe-style",u.textContent=`
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
    `,document.head.appendChild(u)}function s(){d||i||o&&!o.classList.contains("hidden")||(d=!0,e.style.animation="none",e.classList.remove("hidden"),e.offsetHeight,e.style.animation="popupIn 0.5s cubic-bezier(0.22,1,0.36,1) both",n.classList.add("pulse-hint"),setTimeout(()=>{i||c()},1e4))}function c(u=!1){if(!e.classList.contains("hidden")){if(n.classList.remove("pulse-hint"),u){e.classList.add("hidden");return}e.style.animation="popupOut 0.3s ease forwards",setTimeout(()=>e.classList.add("hidden"),290)}}function p(){i=!0,c(!0),o&&(o.classList.remove("hidden"),n.classList.add("opacity-0","pointer-events-none"))}const l=document.getElementById("what-i-build");if(l){const u=new IntersectionObserver(f=>{f.forEach(m=>{m.isIntersecting&&!d&&!i&&(s(),u.unobserve(m.target))})},{rootMargin:"0px 0px -25% 0px"});u.observe(l)}else{const u=()=>{if(d||i){window.removeEventListener("scroll",u);return}window.scrollY>400&&(s(),window.removeEventListener("scroll",u))};window.addEventListener("scroll",u,{passive:!0})}r&&r.addEventListener("click",u=>{u.stopPropagation(),i=!0,c()}),t&&t.addEventListener("click",u=>{u.stopPropagation(),p(),setTimeout(()=>{const f=document.getElementById("chat-input");f&&f.focus()},150)}),n.addEventListener("click",()=>{i=!0,c(!0)}),a&&a.addEventListener("click",()=>{n.classList.remove("pulse-hint")})}function le(){const e=document.getElementById("back-to-top");if(!e)return;let r=!1;window.addEventListener("scroll",()=>{const t=window.scrollY>400;t!==r&&(r=t,r?(e.classList.remove("opacity-0","pointer-events-none","translate-y-4"),e.classList.add("opacity-100","pointer-events-auto","translate-y-0")):(e.classList.add("opacity-0","pointer-events-none","translate-y-4"),e.classList.remove("opacity-100","pointer-events-auto","translate-y-0")))},{passive:!0}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})}function de(){const e=document.querySelector(".stats-grid");if(!e)return;const r=e.querySelectorAll("dt"),t=[];r.forEach(i=>{const c=i.textContent.trim().match(/^([^0-9]*)([0-9]+)([^0-9]*)$/);if(c){const p=c[1],l=parseInt(c[2],10),u=c[3];t.push({el:i,prefix:p,targetVal:l,suffix:u}),i.textContent=`${p}0${u}`}});function n(i){return i===1?1:1-Math.pow(2,-10*i)}function o(i,s,c,p,l,u){const f=performance.now();function m(h){const g=h-f,v=Math.min(g/u,1),y=n(v),x=Math.floor(s+(c-s)*y);i.textContent=`${p}${x}${l}`,v<1?requestAnimationFrame(m):i.textContent=`${p}${c}${l}`}requestAnimationFrame(m)}const a={root:null,threshold:.1,rootMargin:"0px 0px -50px 0px"},d=new IntersectionObserver(i=>{i.forEach(s=>{s.isIntersecting&&(t.forEach(c=>{o(c.el,0,c.targetVal,c.prefix,c.suffix,2e3)}),d.unobserve(s.target))})},a);d.observe(e)}function ue(){const e=document.getElementById("hero-loop-video");if(!e)return;const r={root:null,threshold:.1};new IntersectionObserver(n=>{n.forEach(o=>{o.isIntersecting?e.play().catch(()=>{}):e.pause()})},r).observe(e)}function me(){const e=document.getElementById("enhanced-contact-form");if(!e)return;const r=document.getElementById("contact-submit-btn"),t=document.getElementById("contact-btn-text"),n=document.getElementById("contact-btn-icon"),o=document.getElementById("contact-success"),a=document.getElementById("contact-error");e.addEventListener("submit",async d=>{d.preventDefault(),r&&(r.disabled=!0),t&&(t.textContent="Sending..."),n&&n.classList.add("animate-pulse"),o&&o.classList.add("hidden"),a&&a.classList.add("hidden");try{const i=new FormData(e);(await fetch(e.action,{method:"POST",body:i,headers:{Accept:"application/json"}})).ok?(e.reset(),o&&o.classList.remove("hidden"),t&&(t.textContent="Sent!")):(a&&a.classList.remove("hidden"),t&&(t.textContent="Send message"),r&&(r.disabled=!1))}catch{a&&a.classList.remove("hidden"),t&&(t.textContent="Send message"),r&&(r.disabled=!1)}finally{n&&n.classList.remove("animate-pulse")}})}function pe(){const e=document.getElementById("hero-loop-video"),r=document.getElementById("video-sound-toggle"),t=document.getElementById("video-sound-off"),n=document.getElementById("video-sound-on");!e||!r||r.addEventListener("click",o=>{o.stopPropagation();const a=e.muted;e.muted=!a,e.muted?(t.classList.remove("hidden"),n.classList.add("hidden")):(t.classList.add("hidden"),n.classList.remove("hidden"))})}function fe(){const e=document.getElementById("hero-loop-video"),r=document.getElementById("video-play-toggle"),t=document.getElementById("video-pause-icon"),n=document.getElementById("video-play-icon");!e||!r||(r.addEventListener("click",o=>{o.stopPropagation(),e.paused?e.play().then(()=>{t.classList.remove("hidden"),n.classList.add("hidden")}).catch(a=>{console.error("Video play failed:",a)}):(e.pause(),t.classList.add("hidden"),n.classList.remove("hidden"))}),e.addEventListener("play",()=>{t.classList.remove("hidden"),n.classList.add("hidden")}),e.addEventListener("pause",()=>{t.classList.add("hidden"),n.classList.remove("hidden")}))}function he(){const e=document.getElementById("about-portrait-wrapper");e&&e.addEventListener("click",()=>{e.classList.toggle("touch-active")})}let C=null;function B(){if(C)return C;const e=localStorage.getItem("sb_url")||"https://iyhynpndndgxyioojdwp.supabase.co",r=localStorage.getItem("sb_key")||"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5aHlucG5kbmRneHlpb29qZHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NDg4MTksImV4cCI6MjA5NjUyNDgxOX0.QrDi0n3i-Et4EUabbPU6dtn9A-g35xDm3Ogv22jzXe4";if(window.supabase)try{return C=window.supabase.createClient(e,r),C}catch(t){console.error("Supabase client failed to initialize:",t)}return null}async function ge(){const e=B();if(e){const{data:t,error:n}=await e.from("projects").select("*").order("created_at",{ascending:!1});if(!n)return t}const r=localStorage.getItem("db_projects");return r?JSON.parse(r):[]}async function be(){const e=B();if(e){const{data:t,error:n}=await e.from("testimonials").select("*").order("created_at",{ascending:!1});if(!n)return t}const r=localStorage.getItem("db_testimonials");return r?JSON.parse(r):[]}async function ve(){const e=B();if(e){const{data:t,error:n}=await e.from("about_me").select("*").eq("key","profile_info").single();if(!n&&t)return t.value}const r=localStorage.getItem("db_about_me");return r?JSON.parse(r):null}async function ye(){const e=B();if(e){const{data:t,error:n}=await e.from("blogs").select("*").order("created_at",{ascending:!1});if(!n)return t}const r=localStorage.getItem("db_blogs");return r?JSON.parse(r):[]}async function we(){const e=await ge();if(e&&e.length>0){const a=document.getElementById("projects-showcase-grid");a&&(a.innerHTML="",e.forEach(s=>{const c=(s.tags||[]).map(u=>`<span class="rounded-full border hairline px-2.5 py-1">${u}</span>`).join(""),p=s.image_url?`<img src="${s.image_url}" class="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-[1.03] transition duration-500" alt="${s.title} screen">`:`<div class="w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center font-display text-3xl font-semibold text-primary/30 select-none">${s.title.substring(0,2).toUpperCase()}</div>`,l=document.createElement("a");l.href=s.link||"#",l.target="_blank",l.className="group block rounded-2xl border hairline overflow-hidden transition hover:shadow-lg md:col-span-4",l.innerHTML=`
          <div class="aspect-square w-full overflow-hidden relative">
            ${p}
          </div>
          <div class="p-5">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="eyebrow">${s.category} · ${s.year}</div>
                <h3 class="mt-2 font-display text-3xl md:text-4xl">${s.title}</h3>
                <p class="mt-2 text-sm text-muted-foreground leading-relaxed">${s.description}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-5 w-5 shrink-0 text-muted-foreground transition group-hover:rotate-45 group-hover:text-primary" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
            </div>
            <div class="mt-4 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
              ${c}
            </div>
          </div>
        `,a.appendChild(l)}));const d=document.getElementById("portfolio-showcase-grid");d&&(d.innerHTML="",e.forEach(s=>{const c=(s.tags||[]).map(u=>`<span class="rounded-full border hairline px-2.5 py-1">${u}</span>`).join(""),p=s.image_url?`<img src="${s.image_url}" class="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-[1.03] transition duration-500" alt="${s.title} screen">`:`<div class="w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center font-display text-3xl font-semibold text-primary/30 select-none">${s.title.substring(0,2).toUpperCase()}</div>`,l=document.createElement("a");l.href=s.link||"#",l.target="_blank",l.className="group block rounded-2xl border hairline p-6 transition hover:bg-foreground/[0.03] md:col-span-4",l.innerHTML=`
          <div class="aspect-square w-full rounded-xl overflow-hidden mb-4 border border-foreground/5 relative">
            ${p}
          </div>
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="eyebrow">${s.category} · ${s.year}</div>
              <h3 class="mt-3 font-display text-3xl md:text-4xl">${s.title}</h3>
              <p class="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">${s.description}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right h-5 w-5 text-muted-foreground transition group-hover:rotate-45 group-hover:text-primary" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
          </div>
          <div class="mt-6 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
            ${c}
          </div>
        `,d.appendChild(l)}));const i=document.getElementById("registry-list-container");i&&(i.innerHTML="",e.forEach((s,c)=>{const p=String(c+1).padStart(2,"0"),l=document.createElement("a");l.href=s.link||"#",l.target="_blank",l.className="group grid grid-cols-12 items-center gap-4 border-b hairline py-8 md:py-10 hover:bg-foreground/[0.03] -mx-4 px-4 md:-mx-8 md:px-8 transition",l.innerHTML=`
          <div class="col-span-1 font-mono text-xs text-muted-foreground">${p}</div>
          <div class="col-span-7 md:col-span-6">
            <div class="font-display text-3xl md:text-5xl">${s.title}</div>
            <div class="mt-2 text-sm text-muted-foreground">${s.description}</div>
          </div>
          <div class="hidden md:block col-span-3 text-sm text-muted-foreground">${s.category}</div>
          <div class="col-span-3 md:col-span-1 text-right text-sm text-muted-foreground">${s.year}</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right col-span-1 ml-auto h-5 w-5 text-muted-foreground transition group-hover:rotate-45 group-hover:text-primary" aria-hidden="true"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
        `,i.appendChild(l)}))}const r=await be();if(r&&r.length>0){const a=document.getElementById("testimonial-slider"),d=document.getElementById("testimonial-dots");a&&d&&(a.innerHTML="",d.innerHTML="",r.forEach((i,s)=>{const c=s===0,p=document.createElement("blockquote");p.className=`testimonial-slide transition-opacity duration-500 w-full text-center ${c?"":"hidden opacity-0"}`,c&&p.setAttribute("data-active","true"),p.innerHTML=`
          <p class="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed max-w-3xl mx-auto">
            "${i.review_text}"
          </p>
          <cite class="mt-8 block not-italic">
            <span class="font-display text-lg font-semibold text-foreground">${i.client_name}</span>
            <span class="text-xs uppercase tracking-widest text-muted-foreground block mt-1">${i.company_role}</span>
          </cite>
        `,a.appendChild(p);const l=document.createElement("button");l.setAttribute("aria-label",`Go to testimonial ${s+1}`),l.className=`h-2 ${c?"w-4 bg-primary":"w-2 bg-foreground/25"} rounded-full transition-all duration-300 cursor-pointer`,d.appendChild(l)}))}const t=await ve();if(t){const a=document.getElementById("about-tagline"),d=document.getElementById("about-subtagline"),i=document.getElementById("about-bio-container");a&&(a.textContent=t.name),d&&(d.textContent=t.tagline),i&&(t.bio1||t.bio2)&&(i.innerHTML=`
        <p><strong class="text-foreground">My name is <span class="font-display font-bold text-primary text-lg md:text-xl">${t.name}</span>.</strong> ${t.bio1}</p>
        ${t.bio2?`<p>${t.bio2}</p>`:""}
      `)}const n=await ye(),o=document.getElementById("changelog-container");o&&(n&&n.length>0?(o.innerHTML="",n.forEach(a=>{let d="bg-primary/10 text-primary border border-primary/20";a.status==="Published"&&(d="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"),a.status==="Draft"&&(d="bg-amber-500/10 text-amber-400 border border-amber-500/20");const i=document.createElement("article");i.className="p-6 rounded-2xl border hairline bg-foreground/[0.02] flex flex-col items-start gap-4 text-left w-full";const s=a.created_at?new Date(a.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}):"";i.innerHTML=`
          <div class="flex items-center justify-between w-full gap-4">
            <span class="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">${s}</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${d}">${a.status}</span>
          </div>
          <div class="space-y-2 mt-1">
            <h4 class="font-display text-2xl font-bold text-foreground leading-tight">${a.title}</h4>
            <p class="text-sm text-muted-foreground leading-relaxed">${a.excerpt||""}</p>
            <div class="text-sm text-foreground/80 mt-4 leading-relaxed pt-2 border-t border-foreground/5 whitespace-pre-wrap">${a.content}</div>
          </div>
        `,o.appendChild(i)})):o.innerHTML=`
        <div class="text-center p-8 border border-dashed rounded-2xl border-foreground/15 text-muted-foreground text-sm">
          No articles or blog posts published yet.
        </div>
      `)}
