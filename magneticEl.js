document.querySelectorAll('.magneticbtn').forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
    const scaleTo = gsap.quickTo(el, "scale", { duration: 0.4, ease: "power3.out" });

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);

      // Responsive to all directions, stronger magnetic pull
      const moveX = offsetX * 1.4;
      const moveY = offsetY * 1.4;

      xTo(moveX);
      yTo(moveY);
      scaleTo(1.18);

      // Small vertical jump each time like a ball bounce
      gsap.to(el, {
        y: moveY - 12,
        duration: 0.25,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 2,
        ease: "elastic.out(1, 0.28)" // smoother and springier
      });
    });
  });