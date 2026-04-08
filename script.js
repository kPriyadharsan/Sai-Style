const letters = document.querySelectorAll(".letter");
letters.forEach((el, index) => {
    setTimeout(() => {
        el.classList.add("show");
    }, index * 120); // smooth stagger
});



