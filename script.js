/* -------------------------------------------------------------
 * PREMIUM ANIMATED PORTFOLIO INTERACTION - AMAN KUMAR
 * ------------------------------------------------------------- */

// Sanity CMS Configuration
const SANITY_CONFIG = {
    projectId: 'YOUR_SANITY_PROJECT_ID', // Replace with your actual Sanity project ID
    dataset: 'production',
    apiVersion: '2023-01-01'
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize functions
    initParticles();
    initTypingEffect();
    initCustomCursor();
    initCardGlow();
    initScrollReveal();
    initMobileNav();
    initActiveNavLinks();
    initContactForm();
    initProjectFilters();
    init3DTilt();
    initEmailCopier();
    
    // Fetch and render projects from Sanity CMS
    initDynamicProjects();
});

/* -------------------------------------------------------------
 * 1. PARTICLES BACKGROUND CANVAS
 * ------------------------------------------------------------- */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animationFrameId;
    const mouse = { x: null, y: null, radius: 150 };

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticleArray();
    }

    // Particle template
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 15;
            this.color = Math.random() > 0.4 ? 'rgba(56, 189, 248, 0.45)' : 'rgba(0, 240, 255, 0.5)';
            this.speedX = (Math.random() * 0.4) - 0.2;
            this.speedY = (Math.random() * 0.4) - 0.2;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            // Normal drift
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off boundaries
            if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
            if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

            // Mouse interactive repulsion/attraction
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.hypot(dx, dy);
                
                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density * 0.6;
                    let directionY = forceDirectionY * force * this.density * 0.6;
                    
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }
    }

    // Populate particles
    function initParticleArray() {
        particles = [];
        const count = Math.min(100, Math.floor((canvas.width * canvas.height) / 14000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    // Connect particles with thin gradient lines
    function connect() {
        const maxDistance = 110;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.hypot(dx, dy);

                if (distance < maxDistance) {
                    let opacity = (1 - (distance / maxDistance)) * 0.15;
                    ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        connect();
        animationFrameId = requestAnimationFrame(animate);
    }

    // Mouse events
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', resizeCanvas);
    
    resizeCanvas();
    animate();
}

/* -------------------------------------------------------------
 * 2. TYPING ANIMATION
 * ------------------------------------------------------------- */
function initTypingEffect() {
    const typingSpan = document.getElementById('typing-text');
    if (!typingSpan) return;

    const words = ["Java Developer", "Full Stack Developer", "Backend Engineer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster backspacing
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // steady typing
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Wait at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 800);
}

/* -------------------------------------------------------------
 * 3. CUSTOM CURSOR TRAIL
 * ------------------------------------------------------------- */
function initCustomCursor() {
    const dot = document.querySelector('.custom-cursor-dot');
    const outline = document.querySelector('.custom-cursor-outline');
    if (!dot || !outline) return;

    // Hide custom cursor on mobile touch screens
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        dot.style.display = 'none';
        outline.style.display = 'none';
        return;
    }

    // Show on desktops
    dot.style.display = 'block';
    outline.style.display = 'block';

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Lerp constant (lag effect)
    const speed = 0.16;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate dot tracking
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    // Animate trailing outline
    function updateOutline() {
        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;
        
        outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(updateOutline);
    }
    updateOutline();

    // Hover scales using event delegation to support dynamic cards
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .btn, .project-card, .method-item, .skills-category-card, .mobile-menu-btn')) {
            outline.classList.add('custom-cursor-hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, .btn, .project-card, .method-item, .skills-category-card, .mobile-menu-btn')) {
            outline.classList.remove('custom-cursor-hover');
        }
    });
}

/* -------------------------------------------------------------
 * 4. CARD GLOW EFFECTS (Mouse Tracking)
 * ------------------------------------------------------------- */
function initCardGlow() {
    const cards = document.querySelectorAll('.glass-card:not([data-glow-active])');
    cards.forEach(card => {
        card.setAttribute('data-glow-active', 'true');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* -------------------------------------------------------------
 * 5. SCROLL REVEAL (Timeline & Skill Bars)
 * ------------------------------------------------------------- */
let fadeObserver;

function initScrollReveal() {
    // 5.1 Skill Bars Animation
    const skillBars = document.querySelectorAll('.progress-bar-fill');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.15 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // 5.2 Timeline items reveal
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add class with a subtle delay between consecutive items
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    timelineItems.forEach(item => timelineObserver.observe(item));

    // 5.3 General cards reveal (Fade up elements)
    fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe static fade elements (excluding project cards, which will be loaded dynamically)
    const staticFadeCards = document.querySelectorAll('.skills-category-card, .contact-info, .contact-form-card');
    staticFadeCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(card);
    });
}

function observeDynamicCards(cards) {
    if (!fadeObserver) return;
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(card);
    });
}

/* -------------------------------------------------------------
 * 6. MOBILE NAVIGATION OVERLAY
 * ------------------------------------------------------------- */
function initMobileNav() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-navbar .btn');

    if (!menuBtn || !navOverlay) return;

    function toggleMenu() {
        menuBtn.classList.toggle('active');
        navOverlay.classList.toggle('active');
        // Toggle body scroll lock
        document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : 'auto';
    }

    menuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navOverlay.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

/* -------------------------------------------------------------
 * 7. ACTIVE NAVIGATION LINK & STICKY HEADER
 * ------------------------------------------------------------- */
function initActiveNavLinks() {
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset header height

        // 7.1 Sticky Header and Scroll Top Visibility
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }

        // 7.2 Find current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // 7.3 Update Navbar Active class
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll to Top action
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* -------------------------------------------------------------
 * 8. CONTACT FORM SUBMISSION — EmailJS
 * ------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalBtnHTML = btn.innerHTML;

        btn.disabled = true;
        btn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

        // Build the template params matching EmailJS template variables
        const nameVal    = form.querySelector('#name').value.trim();
        const emailVal   = form.querySelector('#email').value.trim();
        const subjectVal = form.querySelector('#subject').value.trim();
        const msgVal     = form.querySelector('#message').value.trim();

        const templateParams = {
            name:    nameVal,
            email:   emailVal,
            title:   subjectVal,
            message: msgVal
        };

        // Send via EmailJS
        emailjs.send('service_v8u8iio', 'template_9e7oaas', templateParams)
            .then(() => {
                showSubmissionResult(true);
            })
            .catch((error) => {
                console.error('EmailJS error:', error);
                showSubmissionResult(false, error.text || 'Unknown error');
            });

        function showSubmissionResult(isSuccess, errorMessage = "") {
            if (isSuccess) {
                btn.innerHTML = `<span>Sent Successfully!</span> <i class="fa-solid fa-check"></i>`;
                btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                btn.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.4)';
                btn.style.color = '#ffffff';
                form.reset();
            } else {
                btn.innerHTML = `<span>Failed to Send</span> <i class="fa-solid fa-triangle-exclamation"></i>`;
                btn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                btn.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.4)';
                btn.style.color = '#ffffff';
                alert("Error: " + errorMessage + "\nPlease try again or contact me directly at amannnkumarrrr@gmail.com");
            }

            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = originalBtnHTML;
                btn.style.background = '';
                btn.style.boxShadow = '';
                btn.style.color = '';
            }, 4000);
        }
    });
}

/* -------------------------------------------------------------
 * 9. ADVANCED PROJECT FILTERING
 * ------------------------------------------------------------- */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            const projectCards = document.querySelectorAll('.project-card');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                    // Add animate back trigger
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9) translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}

/* -------------------------------------------------------------
 * 10. ADVANCED 3D TILT EFFECT ON CARDS
 * ------------------------------------------------------------- */
function init3DTilt() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    // Target elements that haven't been tilt-initialized yet
    const tiltElements = document.querySelectorAll('.project-card:not([data-tilt-active]), .about-info-card:not([data-tilt-active])');

    tiltElements.forEach(el => {
        el.setAttribute('data-tilt-active', 'true');
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            
            const mouseX = e.clientX - rect.left - (width / 2);
            const mouseY = e.clientY - rect.top - (height / 2);
            
            const maxTilt = 8;
            
            const tiltX = (mouseY / (height / 2)) * -maxTilt;
            const tiltY = (mouseX / (width / 2)) * maxTilt;
            
            el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

/* -------------------------------------------------------------
 * 11. DYNAMIC EMAIL CLICK COPPIER & TOAST
 * ------------------------------------------------------------- */
function initEmailCopier() {
    const emailLinks = document.querySelectorAll('.email-link');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Stop standard mailto trigger to prevent app errors
            
            const email = "amannnkumarrrr@gmail.com";
            
            // 1. Copy email address to clipboard as helper
            navigator.clipboard.writeText(email).then(() => {
                showToast("Email copied & Gmail composer opened!");
            }).catch(err => {
                console.error("Could not copy email: ", err);
            });

            // 2. Directly open browser Gmail Compose window in a new tab
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
        });
    });

    function showToast(message) {
        // Remove existing toast if present
        const existingToast = document.querySelector('.toast-popup');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-popup';
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
        document.body.appendChild(toast);

        // Simple animation triggers
        setTimeout(() => {
            toast.classList.add('show');
        }, 50);

        // Fade out and remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3200);
    }
}

/* -------------------------------------------------------------
 * 12. DYNAMIC PROJECTS FETCH FROM SANITY.IO CMS
 * ------------------------------------------------------------- */
function initDynamicProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    if (!SANITY_CONFIG.projectId || SANITY_CONFIG.projectId === 'YOUR_SANITY_PROJECT_ID') {
        console.warn('Sanity.io Project ID not configured yet. Serving static fallback projects.');
        // Register events and animations for fallback static projects
        const fallbackCards = container.querySelectorAll('.project-card');
        initCardGlow();
        init3DTilt();
        observeDynamicCards(fallbackCards);
        return;
    }

    // Build Sanity API URL
    const query = '*[_type == "project"] | order(orderRank asc)';
    const url = `https://${SANITY_CONFIG.projectId}.api.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodeURIComponent(query)}`;

    // Show loading spinner
    const originalContent = container.innerHTML;
    container.innerHTML = `
        <div class="projects-loader" style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 3rem; color: var(--accent-primary); margin-bottom: 1.5rem; filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.4));"></i>
            <p style="color: var(--text-secondary); font-family: var(--font-heading); font-weight: 500;">Fetching projects from Sanity CMS...</p>
        </div>
    `;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data.result && data.result.length > 0) {
                // Render project cards
                container.innerHTML = data.result.map(project => renderProjectCard(project)).join('\n');
                
                // Re-initialize dynamic styles and listeners
                initCardGlow();
                init3DTilt();
                
                const newCards = container.querySelectorAll('.project-card');
                observeDynamicCards(newCards);
            } else {
                throw new Error('No projects found in Sanity database.');
            }
        })
        .catch(error => {
            console.error('Failed to load projects from Sanity CMS:', error);
            // Fallback to static html content
            container.innerHTML = originalContent;
            
            // Re-initialize dynamic styles and listeners on fallback projects
            initCardGlow();
            init3DTilt();
            
            const fallbackCards = container.querySelectorAll('.project-card');
            observeDynamicCards(fallbackCards);
        });
}

function urlFor(ref) {
    if (!ref) return 'assets/profile.jpg';
    // Parse Sanity asset reference: image-388f8d689622d1ec86eb2a36b56b3e34b9d0c279-800x600-png
    const parts = ref.split('-');
    if (parts.length < 4) return 'assets/profile.jpg';
    const id = parts[1];
    const dimensions = parts[2];
    const extension = parts[3];
    return `https://cdn.sanity.io/images/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}/${id}-${dimensions}.${extension}`;
}

function renderProjectCard(project) {
    // Generate image URL using the asset ref
    const imageUrl = project.image && project.image.asset && project.image.asset._ref
        ? urlFor(project.image.asset._ref)
        : 'assets/profile.jpg';

    // Generate tech stack badges HTML
    const techHtml = (project.tech || []).map(t => {
        const lowTech = t.toLowerCase();
        let iconHtml = '';
        if (lowTech.includes('java') && !lowTech.includes('javascript')) {
            iconHtml = '<i class="devicon-java-plain colored"></i> ';
        } else if (lowTech.includes('spring')) {
            iconHtml = '<i class="devicon-spring-plain colored"></i> ';
        } else if (lowTech.includes('react')) {
            iconHtml = '<i class="devicon-react-original colored"></i> ';
        } else if (lowTech.includes('postgresql')) {
            iconHtml = '<i class="devicon-postgresql-plain colored"></i> ';
        } else if (lowTech.includes('mysql')) {
            iconHtml = '<i class="devicon-mysql-plain colored"></i> ';
        } else if (lowTech.includes('bootstrap')) {
            iconHtml = '<i class="devicon-bootstrap-plain colored"></i> ';
        } else if (lowTech.includes('kafka')) {
            iconHtml = '<i class="devicon-apache-plain colored"></i> ';
        } else if (lowTech.includes('git')) {
            iconHtml = '<i class="devicon-git-plain colored"></i> ';
        } else {
            iconHtml = '<i class="fa-solid fa-code"></i> ';
        }
        return `<span>${iconHtml}${t}</span>`;
    }).join('\n');

    let displayCategory = project.category;
    if (project.category === 'fintech') displayCategory = 'Fintech';
    else if (project.category === 'enterprise') displayCategory = 'Enterprise';
    else if (project.category === 'utility') displayCategory = 'Utility / Geolocation';
    else if (project.category === 'crud') displayCategory = 'CRUD Web App';

    return `
        <div class="project-card glass-card" data-category="${project.category}">
            <div class="card-glow"></div>
            <div class="project-header">
                <div class="project-icon"><i class="fa-solid ${project.icon || 'fa-folder-open'}"></i></div>
                <span class="project-category">${displayCategory}</span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${techHtml}
            </div>
        </div>
    `;
}
