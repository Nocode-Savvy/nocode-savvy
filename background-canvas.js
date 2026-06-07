// background-canvas.js
// Handles light mode particle field and dark mode aurora + noise grain.

let canvas = null;
let ctx = null;
let animationFrameId = null;
let mouseX = null;
let mouseY = null;
let themeMode = "light";
let noisePattern = null;

export function initCanvas(theme) {
  themeMode = theme;
  canvas = document.getElementById("bg-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "bg-canvas";
    canvas.style.position = "fixed";
    canvas.style.inset = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "-1";
    document.body.prepend(canvas);
  }
  ctx = canvas.getContext("2d");

  // Handle window resizing
  resizeCanvas();
  window.removeEventListener("resize", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);

  // Track mouse coordinates
  window.removeEventListener("mousemove", trackMouse);
  window.addEventListener("mousemove", trackMouse);
  window.removeEventListener("mouseleave", clearMouse);
  window.addEventListener("mouseleave", clearMouse);

  // Stop previous animation loop
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  // Pre-generate noise pattern for dark mode
  if (themeMode === "dark" && !noisePattern) {
    generateNoisePattern();
  }

  if (themeMode === "light") {
    initLightParticles();
  } else {
    initDarkAurora();
  }
}

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function trackMouse(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function clearMouse() {
  mouseX = null;
  mouseY = null;
}

// Generate tileable 128x128 noise pattern canvas to keep render performant
function generateNoisePattern() {
  const noiseCanvas = document.createElement("canvas");
  noiseCanvas.width = 128;
  noiseCanvas.height = 128;
  const noiseCtx = noiseCanvas.getContext("2d");
  const imgData = noiseCtx.createImageData(128, 128);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const val = Math.floor(Math.random() * 255);
    data[i] = val;     // R
    data[i + 1] = val; // G
    data[i + 2] = val; // B
    data[i + 3] = 6;   // Alpha (very fine opacity: ~0.025)
  }

  noiseCtx.putImageData(imgData, 0, 0);
  noisePattern = ctx.createPattern(noiseCanvas, "repeat");
}

// ===== LIGHT MODE: Drifting Particles with Cursor Magnetism =====
let particles = [];

function initLightParticles() {
  particles = [];
  const particleCount = 60;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      origX: 0,
      origY: 0,
      vx: (Math.random() > 0.5 ? 1 : -1) * (0.15 + Math.random() * 0.15),
      vy: (Math.random() > 0.5 ? 1 : -1) * (0.15 + Math.random() * 0.15),
      radius: 1 + Math.random() * 1
    });
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.04)";

    particles.forEach(p => {
      // Background drifting motion
      p.x += p.vx;
      p.y += p.vy;

      // Boundary check with wrapping
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Mouse attraction check (within 80px range)
      if (mouseX !== null && mouseY !== null) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 80) {
          // Gently attract at 2% of the distance per frame
          p.x += dx * 0.02;
          p.y += dy * 0.02;
        }
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    animationFrameId = requestAnimationFrame(loop);
  }

  loop();
}

// ===== DARK MODE: Lissajous-drifting Radial Aurora Orbs + Grain =====
function initDarkAurora() {
  let startTime = performance.now();

  function loop(now) {
    const elapsedSeconds = (now - startTime) / 1000;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;
    const baseSize = Math.min(w, h);

    // Orb 1: rgba(99, 60, 180, 0.12) - size 40vw, slow sine wave, cycle 18s
    const orb1Size = w * 0.40;
    const orb1X = w * (0.5 + 0.3 * Math.sin(2 * Math.PI * elapsedSeconds / 18));
    const orb1Y = h * (0.5 + 0.2 * Math.cos(2 * Math.PI * elapsedSeconds / 18));
    drawRadialOrb(orb1X, orb1Y, orb1Size, "rgba(99, 60, 180, 0.12)");

    // Orb 2: rgba(30, 80, 160, 0.10) - size 35vw, opposite direction, cycle 24s
    const orb2Size = w * 0.35;
    const orb2X = w * (0.5 - 0.25 * Math.sin(2 * Math.PI * elapsedSeconds / 24));
    const orb2Y = h * (0.5 - 0.2 * Math.cos(2 * Math.PI * elapsedSeconds / 24));
    drawRadialOrb(orb2X, orb2Y, orb2Size, "rgba(30, 80, 160, 0.10)");

    // Orb 3: rgba(140, 60, 100, 0.08) - size 30vw, drifts diagonally, cycle 20s
    const orb3Size = w * 0.30;
    const orb3X = w * (0.5 + 0.2 * Math.sin(2 * Math.PI * elapsedSeconds / 20 + Math.PI / 4));
    const orb3Y = h * (0.5 + 0.2 * Math.sin(2 * Math.PI * elapsedSeconds / 20));
    drawRadialOrb(orb3X, orb3Y, orb3Size, "rgba(140, 60, 100, 0.08)");

    // Orb 4: rgba(20, 100, 120, 0.07) - size 45vw, breathes in place, cycle 30s
    const scale = 1.0 + 0.10 * Math.sin(2 * Math.PI * elapsedSeconds / 30);
    const orb4Size = w * 0.45 * scale;
    const orb4X = w * 0.5;
    const orb4Y = h * 0.5;
    drawRadialOrb(orb4X, orb4Y, orb4Size, "rgba(20, 100, 120, 0.07)");

    // Render grain overlay layer on top of orbs
    if (noisePattern) {
      ctx.fillStyle = noisePattern;
      ctx.fillRect(0, 0, w, h);
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  function drawRadialOrb(x, y, radius, colorString) {
    if (radius <= 0) return;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, colorString);
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(loop);
}
