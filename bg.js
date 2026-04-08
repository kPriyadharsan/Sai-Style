const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");

let confettiParticles = [];
let scrollY = 0;
let mouseX = 0, mouseY = 0;
let lastSpawnTime = 0;

// Resize canvas
function resizeCanvas() {
  if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Update scroll and mouse positions
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;

  // Limit spawns to avoid excessive calls on fast scroll
  const now = Date.now();
  if (now - lastSpawnTime > 100) {
    spawnConfetti();
    lastSpawnTime = now;
  }
});

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX / window.innerWidth - 0.5;
  mouseY = e.clientY / window.innerHeight - 0.5;
});

// Spawn confetti particles
function spawnConfetti() {
  const maxParticles = 80;
  if (confettiParticles.length >= maxParticles) return;

  const colors = ['#FFD700', '#E6E6FA', '#FF69B4', '#87CEFA', '#FFFFFF'];

  for (let i = 0; i < 5; i++) {
    const isXO = Math.random() < 0.25;

    confettiParticles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: isXO ? 20 : Math.random() * 5 + 3,
      speedY: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.random() * Math.PI,
      shape: isXO ? "xo" : (Math.random() < 0.7 ? "rect" : "circle"),
      depth: Math.random() * 2 + 1
    });
  }
}

// Draw confetti particles
function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Loop backward to safely splice
  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.y -= p.speedY / p.depth;
    p.rotate += 0.03;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotate);
    ctx.fillStyle = p.color;

    if (p.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === "rect") {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    } else if (p.shape === "xo") {
      ctx.font = `${p.size}px 'Poppins', sans-serif`;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fillText("XO", -p.size / 2.5, p.size / 3);
    }

    ctx.restore();

    if (p.y < -60) {
      confettiParticles.splice(i, 1);
    }
  }
}

// Animation loop
function animate() {
  drawConfetti();
  requestAnimationFrame(animate);
}

animate();
