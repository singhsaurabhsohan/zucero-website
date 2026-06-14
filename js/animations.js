document.addEventListener('DOMContentLoaded', () => {
  // 1. Reveal Elements on Scroll
  const revealElements = document.querySelectorAll('.reveal-up');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optional: stop observing once revealed
        // revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Dynamic Theme Switching
  const sections = document.querySelectorAll('section[data-theme]');
  const body = document.body;

  const themeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When a section enters the viewport significantly
      if (entry.isIntersecting) {
        const theme = entry.target.getAttribute('data-theme');
        // Remove existing theme classes
        body.classList.remove('theme-ivory', 'theme-charcoal');
        // Add new theme
        if (theme) {
          body.classList.add(`theme-${theme}`);
        }
      }
    });
  }, {
    // Trigger when 50% of the section is visible
    threshold: 0.5
  });

  sections.forEach(section => themeObserver.observe(section));

  // 3. Simple Parallax Effect
  const parallaxImages = document.querySelectorAll('.parallax-img');
  const nav = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Sticky Nav Blur Effect
    if (scrolled > 50) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
    
    parallaxImages.forEach(img => {
      // Calculate offset relative to the image's position
      const rect = img.getBoundingClientRect();
      // Only animate if in viewport
      if(rect.top < window.innerHeight && rect.bottom > 0) {
        // Adjust the multiplier for stronger/weaker effect
        const yPos = -(rect.top * 0.1); 
        img.style.transform = `scale(1.1) translateY(${yPos}px)`;
      }
    });
  });

  // 4. Cart Drawer Logic
  const cartTriggers = document.querySelectorAll('.cart-trigger');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');

  if (cartDrawer && cartOverlay) {
    cartTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
      });
    });

    const closeCart = () => {
      cartDrawer.classList.remove('active');
      cartOverlay.classList.remove('active');
    };

    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
  }
});
