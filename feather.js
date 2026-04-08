(function () {
  const particleImages = [
    "Assets/png/feather (1).png",
    "Assets/png/feather (2).png",
    "Assets/png/feather (3).png"
  ];

  const maxFeathers = 12; // Adjusted limit
  let currentFeathers = 0;

  const container = document.createElement("div");
  container.id = "xo-feather-container";
  Object.assign(container.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    overflow: "hidden",
    zIndex: "0"
  });
  document.body.appendChild(container);

  function createFeather() {
    if (currentFeathers >= maxFeathers) return;

    const img = document.createElement("img");
    img.src = particleImages[Math.floor(Math.random() * particleImages.length)];
    img.className = "xo-feather";
    img.decoding = "async";
    img.loading = "lazy";

    const size = 20 + Math.random() * 30;
    const startLeft = Math.random() * window.innerWidth;
    const endLeft = startLeft + (Math.random() * 50 - 25);

    Object.assign(img.style, {
      width: `${size}px`,
      position: "absolute",
      left: `${startLeft}px`,
      top: `${window.innerHeight + 30}px`,
      zIndex: "10",
      opacity: "0.6",
      pointerEvents: "auto",
      willChange: "transform",
    });

    container.appendChild(img);
    currentFeathers++;

    const anim = gsap.to(img, {
      y: -window.innerHeight - 100,
      x: endLeft - startLeft,
      rotation: Math.random() * 90,
      duration: 10 + Math.random() * 3,
      ease: "sine.inOut",
      onComplete: () => {
        img.remove();
        currentFeathers--;
      }
    });

    img.addEventListener("click", () => {
      anim.kill();
      gsap.to(img, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power1.in",
        onComplete: () => {
          img.remove();
          currentFeathers--;
        }
      });
    });
  }

  // Spawn 3 feathers at a time
  setInterval(() => {
    const feathersToCreate = Math.min(3, maxFeathers - currentFeathers);
    for (let i = 0; i < feathersToCreate; i++) {
      setTimeout(createFeather, i * 300); // Small delay between each
    }
  }, 5000); // Triggered every 5 seconds
})();
