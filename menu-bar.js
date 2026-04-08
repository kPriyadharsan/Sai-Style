const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('toggler-navLinks');

let isLockedOpen = false;
let hoverTimeout;

// Hover to show (but only if not already locked)
menuToggle.addEventListener('mouseover', () => {
    if (!isLockedOpen) {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        navLinks.classList.add('show');
        navLinks.classList.remove('hide');
        menuToggle.textContent = 'CLOSE';
  
        // ✅ Force cursor recalculation
        void menuToggle.offsetHeight;
        menuToggle.style.cursor = 'pointer';
  
      }, 300);
    }
  });
  
  menuToggle.addEventListener('click', () => {
    clearTimeout(hoverTimeout);
    if (isLockedOpen) {
      navLinks.classList.remove('show');
      navLinks.classList.add('hide');
      menuToggle.textContent = 'MENU';
    } else {
      navLinks.classList.add('show');
      navLinks.classList.remove('hide');
      menuToggle.textContent = 'CLOSE';
    }
  
    // ✅ Force cursor to pointer after content change
    void menuToggle.offsetHeight;
    menuToggle.style.cursor = 'pointer';
  
    isLockedOpen = !isLockedOpen;
  });