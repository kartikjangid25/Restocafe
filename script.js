document.addEventListener('DOMContentLoaded', () => {
  /* ===============================
     1. STICKY NAV ON SCROLL
     =============================== */
  const header = document.querySelector('.js-header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Initialize state on load
  handleScroll();

  /* ===============================
     2. MOBILE DRAWER NAVIGATION
     =============================== */
  const hamburger = document.querySelector('.js-hamburger');
  const drawer = document.querySelector('.js-drawer');
  const drawerCloseBtn = document.querySelector('.js-drawer-close');
  const drawerOverlay = document.querySelector('.js-drawer-overlay');
  const drawerLinks = document.querySelectorAll('.js-drawer-link');

  const openDrawer = () => {
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (hamburger && drawer) {
    hamburger.addEventListener('click', openDrawer);
    drawerCloseBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);
    
    // Close drawer when a link is clicked
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  /* ===============================
     3. SCROLL ANIMATIONS (Intersection Observer)
     =============================== */
  const animatedElements = document.querySelectorAll('.js-animate');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% visible
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve after animating once
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  /* ===============================
     4. HERO PARALLAX ON MOUSEMOVE
     =============================== */
  const parallaxContainer = document.querySelector('.hero');
  const parallaxTarget = document.querySelector('.js-parallax');

  if (parallaxContainer && parallaxTarget && window.innerWidth > 768) {
    parallaxContainer.addEventListener('mousemove', (e) => {
      // Calculate mouse position relative to center of screen
      const x = (window.innerWidth / 2 - e.pageX) * 0.02;
      const y = (window.innerHeight / 2 - e.pageY) * 0.02;
      
      // Apply subtle transform
      parallaxTarget.style.transform = `translate(${x}px, ${y}px)`;
    });

    parallaxContainer.addEventListener('mouseleave', () => {
      parallaxTarget.style.transform = 'translate(0, 0)';
      parallaxTarget.style.transition = 'transform 0.5s ease-out';
      
      // Remove transition after it completes to restore raw mousemove tracking
      setTimeout(() => {
        parallaxTarget.style.transition = '';
      }, 500);
    });
  }

  /* ===============================
     5. NEWSLETTER FORM VALIDATION
     =============================== */
  const newsletterForm = document.querySelector('.js-newsletter');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('.js-email');
      const messageEl = newsletterForm.querySelector('.js-message');
      const email = emailInput.value.trim();
      
      // Basic email regex for client-side validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      messageEl.classList.remove('success', 'error');
      
      if (!email) {
        messageEl.textContent = 'Please enter an email address.';
        messageEl.classList.add('error');
      } else if (!emailRegex.test(email)) {
        messageEl.textContent = 'Please enter a valid email address.';
        messageEl.classList.add('error');
      } else {
        // Simulate success
        messageEl.textContent = 'Thank you for subscribing!';
        messageEl.classList.add('success');
        emailInput.value = '';
        
        // Clear message after 4 seconds
        setTimeout(() => {
          messageEl.textContent = '';
          messageEl.classList.remove('success');
        }, 4000);
      }
    });
  }

  /* ===============================
     6. SCROLL PROGRESS BAR
     =============================== */
  if (window.innerWidth > 768) {
    document.body.insertAdjacentHTML('beforeend', '<div class="scroll-progress js-scroll-progress"></div>');
    
    const scrollProgress = document.querySelector('.js-scroll-progress');
    
    // Update scroll progress bar
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (scrollProgress) {
        scrollProgress.style.width = scrolled + "%";
      }
    }, { passive: true });

    // Hero Spotlight
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        heroSection.style.setProperty('--mouse-x', `${x}px`);
        heroSection.style.setProperty('--mouse-y', `${y}px`);
      });
    }
  }

});
