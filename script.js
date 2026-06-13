/* ═══════════════════════════════════════════════════════════════
   ANKESH SRIVASTAVA — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────
     1. NAVBAR — Scroll & Mobile Toggle
     ───────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = navLinks.querySelectorAll('a');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navItems.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Active nav highlighting
  const sections = document.querySelectorAll('.section');
  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(sec => observerNav.observe(sec));

  /* ─────────────────────────────────────────────
     2. LANDING — Particles
     ───────────────────────────────────────────── */
  const particlesContainer = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${50 + Math.random() * 50}%`;
    p.style.animationDelay = `${Math.random() * 6}s`;
    p.style.animationDuration = `${4 + Math.random() * 4}s`;
    p.style.width = `${2 + Math.random() * 3}px`;
    p.style.height = p.style.width;
    particlesContainer.appendChild(p);
  }

  /* ─────────────────────────────────────────────
     3. LANDING — Typing Effect
     ───────────────────────────────────────────── */
  const designations = [
    'Electrical Engineering Student',
    'Full-Stack Developer',
    'Data Analyst'
  ];
  const typedEl = document.getElementById('typedText');
  let desIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeLoop() {
    const current = designations[desIdx];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      typedEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIdx === current.length) {
      typingSpeed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      desIdx = (desIdx + 1) % designations.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }
  typeLoop();

  /* ─────────────────────────────────────────────
     4. INTERSECTION OBSERVER — Reveal Animations
     ───────────────────────────────────────────── */
  const animatedSelectors = [
    '.reveal-up',
    '.slide-in-left',
    '.slide-up-stagger',
    '.flip-card',
    '.drop-in-top',
    '.typewriter-list',
    '.stagger-in',
    '.slide-in-blur',
    '.fade-delay',
    '.pop-in',
    '.bounce-in',
    '.grid-wave',
    '.waterfall',
    '.zoom-in-center',
    '.slide-in-bl',
    '.slide-in-br'
  ];

  const allAnimated = document.querySelectorAll(animatedSelectors.join(', '));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve so we can re-trigger if wanted
        // Actually for performance, unobserve after animation
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  allAnimated.forEach(el => revealObserver.observe(el));

  /* ─────────────────────────────────────────────
     5. SOCIAL ICONS — Pop Animation
     ───────────────────────────────────────────── */
  const socialPops = document.querySelectorAll('.social-pop');
  const socialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        socialPops.forEach(icon => icon.classList.add('animate'));
        socialObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (socialPops.length) {
    socialObserver.observe(socialPops[0].closest('.landing-socials') || socialPops[0]);
  }

  /* ─────────────────────────────────────────────
     6. SKILLS — Animated Progress Bars
     ───────────────────────────────────────────── */
  const skillCards = document.querySelectorAll('.skill-category-card');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.skill-bar');
        bars.forEach((bar, i) => {
          const percent = bar.getAttribute('data-percent');
          const fill = bar.querySelector('.bar-fill');
          const percentEl = bar.querySelector('.skill-percent');

          setTimeout(() => {
            fill.style.width = `${percent}%`;

            // Animate the counter
            animateCounter(percentEl, 0, parseInt(percent), 1000);
          }, i * 100);
        });

        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillCards.forEach(card => skillObserver.observe(card));

  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(start + (end - start) * eased);
      el.textContent = `${value}%`;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  /* ─────────────────────────────────────────────
     7. STAT COUNTERS — Count Up Animation
     ───────────────────────────────────────────── */
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-target'));
          animateStatCounter(num, 0, target, 1500);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-counters');
  if (statsSection) statsObserver.observe(statsSection);

  function animateStatCounter(el, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = Math.round(start + (end - start) * eased);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  /* ─────────────────────────────────────────────
     8. CONTACT FORM — Form Handling & Pulse
     ───────────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const sendBtn = document.getElementById('sendBtn');

  // Pulse send button once when form becomes visible
  const formObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          sendBtn.classList.add('pulse-once');
          sendBtn.addEventListener('animationend', () => {
            sendBtn.classList.remove('pulse-once');
          }, { once: true });
        }, 1200);
        formObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (contactForm) formObserver.observe(contactForm);

  // Form submit — open mailto
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const subject = document.getElementById('contactSubject').value;
      const message = document.getElementById('contactMessage').value;

      const mailtoLink = `mailto:ankeshsrivastava61289@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      window.location.href = mailtoLink;

      // Visual feedback
      sendBtn.querySelector('span').textContent = 'Opening Mail Client...';
      setTimeout(() => {
        sendBtn.querySelector('span').textContent = 'Send Message';
      }, 3000);
    });
  }

  /* ─────────────────────────────────────────────
     9. CERTIFICATION CARDS — Mouse-follow tilt
     ───────────────────────────────────────────── */
  const certCards = document.querySelectorAll('.cert-card');
  certCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    });
  });

  /* ─────────────────────────────────────────────
     10. SMOOTH SCROLL for anchor links
     ───────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─────────────────────────────────────────────
     11. EXPERIENCE CARD — Curtain animation
     ───────────────────────────────────────────── */
  const expCards = document.querySelectorAll('.exp-card');
  const expObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const left = entry.target.querySelector('.exp-card-left');
        if (left) {
          left.style.animation = 'curtainOpen 0.8s var(--ease-out-expo) forwards';
        }
        expObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  expCards.forEach(card => expObserver.observe(card));

  // Add curtain CSS dynamically
  const curtainStyle = document.createElement('style');
  curtainStyle.textContent = `
    @keyframes curtainOpen {
      0% { max-width: 0; padding: 36px 0; opacity: 0; }
      100% { max-width: 260px; padding: 36px 28px; opacity: 1; }
    }
  `;
  document.head.appendChild(curtainStyle);

  /* ─────────────────────────────────────────────
     12. CERTIFICATIONS — Collection Surfer 3D Showcase
     ───────────────────────────────────────────── */
  const certificates = [
    { id: 1, image: "Cert/Certificate_isro.png", title: "Geodata Processing using Python and Machine Learning", provider: "ISRO", date: "February 2026" },
    { id: 2, image: "Cert/Ai.png", title: "AI Unleashed Bootcamp on Machine Learning to Deep Neural Network", provider: "AI Spark Society, MMMUT", date: "October 2025" },
    { id: 3, image: "Cert/Ankesh_cert.png", title: "Three-Day Hands-on Workshop 'PROMPTOPS' 26", provider: "CSSE, MMMUT", date: "February 2026" },
    { id: 4, image: "Cert/IEEE.png", title: "IEEE Day 2025", provider: "IEEE GTBIT SB & IEEE DTU SB", date: "October 2025" },
    { id: 5, image: "Cert/Nvidia.png", title: "Introduction to AI in the Data Center", provider: "NVIDIA", date: "December 2025" },
    { id: 6, image: "Cert/Swiftwings_ankesh_page-0001.jpg", title: "Swiftwings'25 Workshop and Competition", provider: "Drone & IoT Club, MMMUT", date: "December 2025" },
    { id: 7, image: "Cert/Certificate.png", title: "Winter of Code Certificate of Participation", provider: "Elite Coders", date: "2025" },
    { id: 8, image: "Cert/ML.png", title: "Machine Learning for Beginners", provider: "Simplilearn", date: "November 2025" },
    { id: 9, image: "Cert/Hp.png", title: "AI for Beginners", provider: "HP LIFE", date: "November 2025" },
    { id: 10, image: "Cert/Prompt.png", title: "Prompt Engineering with GitHub Copilot", provider: "Simplilearn", date: "December 2025" },
    { id: 11, image: "Cert/Tata.png", title: "Tata Crucible Campus Quiz 2025", provider: "Tata Crucible", date: "November 2025" },
    { id: 12, image: "Cert/Achievement_ecwoc.png", title: "Elite Coders Winter of Code Certificate of Appreciation", provider: "Elite Coders Winter of Code", date: "2025" },
    { id: 13, image: "Cert/Achievment.png", title: "Mathematics National Level E-Quiz 7.0 (Scored 91.5%)", provider: "Chaitanya Bharathi Institute of Technology", date: "September 2025" },
    { id: 14, image: "Cert/code_clash.png", title: "IIT Jodhpur Winner of Code Clash (Rank 1)", provider: "IIT Jodhpur", date: "N/A" },
    { id: 15, image: "Cert/deloitte.png", title: "Data Analytics Job Simulation", provider: "Deloitte", date: "June 2026" },
    { id: 16, image: "Cert/ewoc.png", title: "Elite Coders Winter of Code Contributor", provider: "Elite Coders Winter of Code", date: "2025" },
    { id: 17, image: "Cert/idea.png", title: "Idea Presentation Certificate of Participation", provider: "MANIT, Bhopal", date: "N/A" },
    { id: 18, image: "Cert/meta.png", title: "Introduction to Front-End Development", provider: "Meta", date: "December 2025" },
    { id: 19, image: "Cert/ms.png", title: "Getting Started with Microsoft Excel", provider: "Coursera Project Network", date: "June 2025" }
  ];

  const animatedTrack = document.getElementById('animatedTrack');
  const certSection = document.getElementById('certifications');
  
  if (animatedTrack && certSection) {
    // Duplicate the certificates array for loop buffer
    const duplicatedCerts = [...certificates, ...certificates];
    
    // Dynamic generation of cards
    duplicatedCerts.forEach((item, index) => {
      const card = document.createElement('a');
      card.href = item.image;
      card.target = '_blank';
      card.className = 'cert-surfer-card';
      
      // Index formatted as 01-19
      const numString = String((index % certificates.length) + 1).padStart(2, '0');
      
      card.innerHTML = `
        <div class="cert-card-num">${numString}</div>
        <div class="cert-card-image">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="cert-card-overlay">
          <p class="provider">${item.provider}</p>
          <h3>${item.title}</h3>
          <p class="date">${item.date}</p>
        </div>
      `;
      
      // Bind click event to open lightbox instead of opening in a new tab
      card.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(item.image, `${item.title} — ${item.provider}`);
      });
      
      animatedTrack.appendChild(card);
    });

    // Positions and constants
    const scrollPerItem = 600;
    const loopDistance = certificates.length * scrollPerItem;
    
    const stepX = 240;
    const stepY = -84;
    const stepZ = -288;
    
    let mouseX = -10000;
    let mouseY = -10000;
    
    // Update track and cards based on scroll and mouse position
    function updateSurfer() {
      const startScroll = certSection.offsetTop;
      const totalScrollable = certSection.offsetHeight - window.innerHeight;
      const relativeScroll = window.scrollY - startScroll;
      
      // Calculate looped progress
      // Math.max(0, relativeScroll) to prevent negative modulo at top
      const loopedProgress = Math.max(0, relativeScroll) % loopDistance;
      const progressRatio = loopedProgress / loopDistance;
      
      const sceneX = -progressRatio * certificates.length * stepX;
      const sceneY = -progressRatio * certificates.length * stepY;
      const sceneZ = -progressRatio * certificates.length * stepZ;
      
      // Transform track
      animatedTrack.style.transform = `translate3d(${sceneX}px, ${sceneY}px, ${sceneZ}px)`;
      
      // Get all cards to calculate distance from mouse
      const cards = animatedTrack.querySelectorAll('.cert-surfer-card');
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        let scale = 1;
        let uplift = 0;
        
        if (mouseX !== -10000) {
          const dist = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));
          // Proximity threshold of 400px
          if (dist < 400) {
            const factor = 1 - (dist / 400); // 1 at mouse, 0 at 400px
            scale = 1 + 0.5 * factor; // scale up to 1.5
          }
        }
        
        const baseX = i * stepX;
        const baseY = i * stepY;
        const baseZ = i * stepZ;
        
        card.style.transform = `translate3d(${baseX}px, ${baseY + uplift}px, ${baseZ}px) rotateY(-50deg) scale(${scale})`;
      });
    }

    // Scroll listener
    window.addEventListener('scroll', () => {
      const rect = certSection.getBoundingClientRect();
      
      // Only run calculations if certifications section is visible in scroll
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        requestAnimationFrame(updateSurfer);
      }
    });
    
    // Mouse tracker
    const perspectiveContainer = certSection.querySelector('.perspective-container');
    if (perspectiveContainer) {
      perspectiveContainer.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        requestAnimationFrame(updateSurfer);
      });
      
      perspectiveContainer.addEventListener('mouseleave', () => {
        mouseX = -10000;
        mouseY = -10000;
        requestAnimationFrame(updateSurfer);
      });
    }
    
    // Initial call to position cards
    setTimeout(updateSurfer, 100);
  }

  /* ─────────────────────────────────────────────
     13. LIGHTBOX MODAL HANDLER
     ───────────────────────────────────────────── */
  const lightbox = document.getElementById('certLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxLink = document.getElementById('lightboxLink');
  
  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;
    lightboxImg.src = src;
    if (lightboxLink) lightboxLink.href = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden'; // Disable scroll
  }
  
  if (lightbox) {
    const closeBtn = lightbox.querySelector('.lightbox-close');
    
    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = ''; // Restore scroll
    };
    
    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        closeLightbox();
      }
    });
    
    // Escape key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

});
