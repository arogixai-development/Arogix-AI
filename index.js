/**
 * Arogix AI - Clean Core Physics & Interaction Engine
 * Highly optimized, zero lag, fully responsive, and professional.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initBackgroundVideo();
  initNeuralCanvas();
  initShowcaseTabs();
  initScrollAnimations();
  initPresentationModal();
  initContactForm();
});

/* 1. Technical Preloader Fader */
function initLoader() {
  const loaderWrapper = document.getElementById('loader-wrapper');
  const barFill = document.querySelector('.loader-bar-fill');
  
  if (!loaderWrapper || !barFill) return;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 10) + 6;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Fine fade-out transition
      setTimeout(() => {
        loaderWrapper.style.opacity = '0';
        setTimeout(() => {
          loaderWrapper.style.display = 'none';
          
          // Trigger initial hero reveal
          document.querySelectorAll('.hero-section .reveal').forEach(el => {
            el.classList.add('active');
          });
        }, 500);
      }, 300);
    }
    barFill.style.width = `${progress}%`;
  }, 35);
}

/* 2. Scroll Header Highlight & Hamburger Drawer */
function initNavbar() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('mobile-hamburger-btn');
  const navLinks = document.getElementById('main-navigation-menu');
  const navLinksA = document.querySelectorAll('#main-navigation-menu a');
  
  if (!header) return;

  // Scrolled Header Behavior
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightNavOnScroll();
  }, { passive: true });
  
  // Hamburger drawer controls
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('mobile-active');
      const isExpanded = navLinks.classList.contains('mobile-active');
      hamburger.setAttribute('aria-expanded', isExpanded);
      
      // Animate Hamburger Lines
      const spans = hamburger.querySelectorAll('span');
      if (isExpanded) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Auto collapse drawer on outside click
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        if (navLinks.classList.contains('mobile-active')) {
          navLinks.classList.remove('mobile-active');
          hamburger.setAttribute('aria-expanded', 'false');
          const spans = hamburger.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
  }
  
  // High-fidelity active section scrolling
  navLinksA.forEach(link => {
    link.addEventListener('click', () => {
      navLinksA.forEach(a => a.classList.remove('active'));
      link.classList.add('active');
      
      // Auto close mobile menu
      if (navLinks.classList.contains('mobile-active')) {
        navLinks.classList.remove('mobile-active');
        hamburger.setAttribute('aria-expanded', 'false');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });

  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 120;
    const targets = [];
    
    navLinksA.forEach(link => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const refElement = document.querySelector(targetId);
        if (refElement) {
          targets.push({ link, el: refElement, top: refElement.offsetTop });
        }
      }
    });
    
    // Sort by top offset ascending
    targets.sort((a, b) => a.top - b.top);
    
    let activeTarget = null;
    for (let i = 0; i < targets.length; i++) {
      if (scrollPos >= targets[i].top) {
        activeTarget = targets[i];
      } else {
        break;
      }
    }
    
    navLinksA.forEach(a => a.classList.remove('active'));
    if (activeTarget) {
      activeTarget.link.classList.add('active');
    } else {
      // Default to highlighting About when at the top of the page (Hero)
      const aboutLink = document.getElementById('nav-link-about');
      if (aboutLink) {
        aboutLink.classList.add('active');
      }
    }
  }
}

/* 3. HTML5 Canvas Ambient Particle Background physics (Subtle & High-Performance) */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  
  const particles = [];
  const properties = {
    particleColor: 'rgba(255, 255, 255, 0.15)',
    particleRadius: 1.2,
    particleCount: calculateParticleCount(),
    maxVelocity: 0.25,
    lineLength: 110,
    mouseRadius: 120
  };
  
  const mouse = { x: null, y: null };
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    properties.particleCount = calculateParticleCount();
    initParticles();
  });
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  function calculateParticleCount() {
    const area = window.innerWidth * window.innerHeight;
    // Keep it extremely low-density and highly professional to save GPU resources
    return Math.min(Math.floor(area / 16000), 75);
  }
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.velocityX = (Math.random() * (properties.maxVelocity * 2)) - properties.maxVelocity;
      this.velocityY = (Math.random() * (properties.maxVelocity * 2)) - properties.maxVelocity;
    }
    
    update() {
      this.x += this.velocityX;
      this.y += this.velocityY;
      
      if (this.x < 0 || this.x > width) this.velocityX = -this.velocityX;
      if (this.y < 0 || this.y > height) this.velocityY = -this.velocityY;
      
      // Ambient mouse influence (gentle drift, no jumps)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < properties.mouseRadius) {
          const force = (properties.mouseRadius - dist) / properties.mouseRadius;
          this.x += (dx / dist) * force * 0.3;
          this.y += (dy / dist) * force * 0.3;
        }
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }
  }
  
  function drawLines() {
    let x1, y1, x2, y2, dist, opacity;
    for (let i = 0; i < properties.particleCount; i++) {
      for (let j = i + 1; j < properties.particleCount; j++) {
        x1 = particles[i].x;
        y1 = particles[i].y;
        x2 = particles[j].x;
        y2 = particles[j].y;
        dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        
        if (dist < properties.lineLength) {
          opacity = 1 - (dist / properties.lineLength);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.045})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    }
  }
  
  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < properties.particleCount; i++) {
      particles[i].update();
      particles[i].draw();
    }
    drawLines();
    requestAnimationFrame(animate);
  }
  
  initParticles();
  animate();
}

/* 4. Showcase Interactive Dashboard Simulator */
function initShowcaseTabs() {
  const tabs = document.querySelectorAll('.dashboard-tab');
  const panes = document.querySelectorAll('.tab-pane');
  const soapOutput = document.getElementById('soap-typewriter');
  
  const notesText = 
`[SYSTEM LOG DIRECTORY: PHI-3 INFERENCE PIPELINE]
PATIENT DEMOGRAPHICS: 34-year-old female.
CHIEF COMPLAINT: Atypical macular lesion on left forearm.

SUBJECTIVE:
Patient notes a dark brown spot on her left dorsal forearm which has expanded over the last 4 months. Denies bleeding, pain, or itch. Scored Asymmetry(+), Jagged Border(+), Variegated Color(+).

OBJECTIVE:
Physical Exam reveals a 6.2mm macular lesion on the left forearm.
- Asymmetry: Marked asymmetry along both axes.
- Borders: Jagged, poorly demarcated margins.
- Color: Variegated dark brown and light tan focal areas.
- Diameter: 6.2mm (Evolution confirmed).

ASSESSMENT:
Atypical melanocytic nevus on the left forearm. Differential Suspects:
1. Melanoma in-situ (primary suspect)
2. Severe Dysplastic Nevus
3. Atypical Seborrheic Keratosis

PLAN:
1. Schedule a 2mm punch biopsy immediately.
2. Patient education provided regarding daily full-body sun protection.
3. expedited pathology referral initiated.`;

  let typingTimer = null;
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panes.forEach(p => p.classList.remove('active'));
      
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      const pane = document.getElementById(target);
      if (pane) pane.classList.add('active');
      
      if (target === 'soap-pane') {
        runSoapTypewriter();
      }
    });
  });
  
  // Auto trigger first load
  setTimeout(() => {
    const activeTab = document.querySelector('.dashboard-tab.active');
    if (activeTab && activeTab.getAttribute('data-tab') === 'soap-pane') {
      runSoapTypewriter();
    }
  }, 1200);
  
  function runSoapTypewriter() {
    if (!soapOutput) return;
    
    // Clear previous runs
    if (typingTimer) clearTimeout(typingTimer);
    soapOutput.textContent = '';
    
    let index = 0;
    function type() {
      if (index < notesText.length) {
        soapOutput.textContent += notesText.charAt(index);
        index++;
        soapOutput.scrollTop = soapOutput.scrollHeight;
        typingTimer = setTimeout(type, 6); // Technical speed
      }
    }
    type();
  }
}

/* 5. Minimalist Intersection Observer */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });
  
  reveals.forEach(el => observer.observe(el));
}

/* 6. Pitch Deck Slider Carousel & Presentation Theater Modal */
function initPresentationModal() {
  // A: Inline slide preview loop
  const previewSlides = document.querySelectorAll('.preview-slide');
  const slideDots = document.querySelectorAll('.slide-dot');
  let currentPreview = 0;
  let previewInterval;
  
  function showPreview(idx) {
    previewSlides.forEach(s => s.classList.remove('active'));
    slideDots.forEach(d => d.classList.remove('active'));
    
    currentPreview = idx;
    previewSlides[currentPreview].classList.add('active');
    slideDots[currentPreview].classList.add('active');
  }
  
  slideDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      clearInterval(previewInterval);
      showPreview(idx);
      startLoop();
    });
  });
  
  function startLoop() {
    previewInterval = setInterval(() => {
      const next = (currentPreview + 1) % previewSlides.length;
      showPreview(next);
    }, 4500);
  }
  
  startLoop();
  
  // B: Fullscreen Modal presentation slider (8 slides)
  const openBtn = document.getElementById('open-deck-modal');
  const closeBtn = document.getElementById('close-deck-modal');
  const deckModal = document.getElementById('deck-modal');
  const modalSlides = document.querySelectorAll('.modal-slide');
  const prevBtn = document.querySelector('.deck-nav-prev');
  const nextBtn = document.querySelector('.deck-nav-next');
  const progressBar = document.querySelector('.modal-progress-bar');
  
  let activeSlide = 0;
  
  if (!deckModal || !openBtn) return;
  
  function openModal() {
    deckModal.classList.add('active');
    activeSlide = 0;
    showModalSlide(0);
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    deckModal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function showModalSlide(idx) {
    if (idx < 0) idx = 0;
    if (idx >= modalSlides.length) idx = modalSlides.length - 1;
    
    modalSlides.forEach(s => s.classList.remove('active'));
    activeSlide = idx;
    modalSlides[activeSlide].classList.add('active');
    
    // Progress fill update
    const percent = ((activeSlide + 1) / modalSlides.length) * 100;
    if (progressBar) progressBar.style.width = `${percent}%`;
    
    // Toggle navigations
    if (prevBtn) {
      prevBtn.style.opacity = activeSlide === 0 ? '0.2' : '1';
      prevBtn.style.pointerEvents = activeSlide === 0 ? 'none' : 'auto';
    }
    if (nextBtn) {
      nextBtn.style.opacity = activeSlide === modalSlides.length - 1 ? '0.2' : '1';
      nextBtn.style.pointerEvents = activeSlide === modalSlides.length - 1 ? 'none' : 'auto';
    }
  }
  
  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  
  if (prevBtn) prevBtn.addEventListener('click', () => showModalSlide(activeSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showModalSlide(activeSlide + 1));
  
  // Modal key events
  document.addEventListener('keydown', (e) => {
    if (!deckModal.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      showModalSlide(activeSlide + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showModalSlide(activeSlide - 1);
    } else if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  // Background overlay click
  deckModal.addEventListener('click', (e) => {
    if (e.target === deckModal) {
      closeModal();
    }
  });
}

/* 7. Corporate Inquiry Form Controller */
function initContactForm() {
  const form = document.getElementById('arogix-contact-form');
  const successAlert = document.getElementById('form-success-alert');
  
  if (!form || !successAlert) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Enforce HTML5 validation check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const origText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'TRANSMITTING...';
    
    // Send form data via EmailJS API
    emailjs.sendForm('service_x545sam', 'template_5xh9bkr', form)
      .then(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = origText;
        
        successAlert.textContent = 'INQUIRY TRANSMITTED SUCCESSFULLY. Our executive office will contact you.';
        successAlert.style.background = 'rgba(16, 185, 129, 0.08)';
        successAlert.style.borderColor = 'rgba(16, 185, 129, 0.2)';
        successAlert.style.color = '#34d399';
        successAlert.style.display = 'block';
        
        setTimeout(() => {
          successAlert.style.opacity = '0';
          setTimeout(() => {
            successAlert.style.display = 'none';
            successAlert.style.opacity = '1';
          }, 400);
        }, 6000);
      })
      .catch((error) => {
        console.error('EmailJS Transmission Failure:', error);
        submitBtn.disabled = false;
        submitBtn.textContent = origText;
        
        successAlert.textContent = 'TRANSMISSION FAILED. Please contact us directly at arogixai@gmail.com.';
        successAlert.style.background = 'rgba(239, 68, 68, 0.08)';
        successAlert.style.borderColor = 'rgba(239, 68, 68, 0.2)';
        successAlert.style.color = '#f87171';
        successAlert.style.display = 'block';
        
        setTimeout(() => {
          successAlert.style.opacity = '0';
          setTimeout(() => {
            successAlert.style.display = 'none';
            successAlert.style.opacity = '1';
          }, 400);
        }, 6000);
      });
  });
}

/* 8. Programmatic Force Play Background Video (Bypasses Local file:// Autoplay Blocking) */
function initBackgroundVideo() {
  const bgVideo = document.querySelector('.bg-video');
  if (!bgVideo) return;
  
  // Enforce silent playsinline attributes
  bgVideo.muted = true;
  bgVideo.defaultMuted = true;
  bgVideo.playsInline = true;
  bgVideo.setAttribute('muted', '');
  bgVideo.setAttribute('playsinline', '');

  // Detect WebM support to select the most optimal local source
  const supportsWebm = bgVideo.canPlayType('video/webm; codecs="vp9, vorbis"') !== '' || 
                       bgVideo.canPlayType('video/webm; codecs="vp8, vorbis"') !== '';
  
  const videoSrc = supportsWebm ? 'assets/tech_loop.webm' : 'assets/tech_loop.mp4';
  
  // Explicitly assign the correct src attribute to prevent browser 404 halt glitches on nested sources
  bgVideo.src = videoSrc;

  // Force loading and initial play
  bgVideo.load();
  const playPromise = bgVideo.play();
  
  if (playPromise !== undefined) {
    playPromise.then(() => {
      console.log("BACKGROUND VIDEO PLAYING SUCCESS (" + (supportsWebm ? "WEBM" : "MP4") + ")");
    }).catch((err) => {
      console.warn("BACKGROUND VIDEO PLAY INITIAL BLOCK:", err);
      // Fallback: Trigger play on the first user action on the page
      const playOnInteract = () => {
        bgVideo.play().then(() => {
          console.log("BACKGROUND VIDEO PLAYING SUCCESS ON INTERACTION");
          // Remove event listeners once video successfully plays
          window.removeEventListener('click', playOnInteract);
          window.removeEventListener('scroll', playOnInteract);
          window.removeEventListener('keydown', playOnInteract);
          window.removeEventListener('mousemove', playOnInteract);
        }).catch((e) => {
          console.error("BACKGROUND VIDEO PLAY FAILURE:", e);
        });
      };
      
      window.addEventListener('click', playOnInteract, { passive: true });
      window.addEventListener('scroll', playOnInteract, { passive: true });
      window.addEventListener('keydown', playOnInteract, { passive: true });
      window.addEventListener('mousemove', playOnInteract, { passive: true });
    });
  }
}
