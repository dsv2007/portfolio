document.addEventListener('DOMContentLoaded', () => {
    // 0. Page Loader
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 500);
        }, 1000); // 1s minimum loading time for animation effect
    }

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 3.5 Animated Number Counters
    const counterElements = document.querySelectorAll('.metric-value[data-target]');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetEl = entry.target;
                const target = parseFloat(targetEl.getAttribute('data-target'));
                const hasDecimal = targetEl.getAttribute('data-decimal') === 'true';
                const suffix = targetEl.getAttribute('data-suffix') || '';
                
                let current = 0;
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        targetEl.textContent = hasDecimal ? current.toFixed(2) + suffix : Math.floor(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        targetEl.textContent = target + suffix;
                    }
                };
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(targetEl);
            }
        });
    }, { threshold: 0.5 });
    
    counterElements.forEach(el => counterObserver.observe(el));

    // 4. Parallax effect
    const ambientBg = document.querySelector('.ambient-bg');
    if(ambientBg) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            ambientBg.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
        });
    }

    // 4.5 Particle Canvas Background
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = `rgba(0, 240, 255, ${Math.random() * 0.5})`;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particlesArray = [];
            const numberOfParticles = Math.min((canvas.width * canvas.height) / 15000, 100);
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // 5. Project Modals & Data
    const projectsData = {
        nova: {
            title: "Nova Finance",
            desc: "A comprehensive fintech dashboard delivering real-time analytics, portfolio tracking, and AI-driven market insights. Built with a focus on deep security and lightning-fast data processing.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            tags: ["React", "TypeScript", "Node.js", "D3.js"],
            liveLink: "projects/nova/index.html",
            githubLink: "https://github.com/dsv2007"
        },
        aura: {
            title: "Aura Boutique",
            desc: "A premium luxury e-commerce platform pushing the boundaries of web animation. Features a headless CMS, ultra-fast page transitions, and elegant product showcases.",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
            tags: ["Next.js", "Tailwind", "Stripe", "Framer Motion"],
            liveLink: "projects/aura/index.html",
            githubLink: "https://github.com/dsv2007"
        },
        synapse: {
            title: "Synapse AI",
            desc: "A scalable SaaS web application allowing enterprise users to rapidly train and deploy custom AI models without writing a single line of code.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            tags: ["Vue.js", "Python", "TensorFlow", "AWS"],
            liveLink: "projects/synapse/index.html",
            githubLink: "https://github.com/dsv2007"
        },
        lumina: {
            title: "Lumina Studio",
            desc: "A breath-taking corporate branding and portfolio website for an internationally recognized architecture firm. Emphasizes minimalism and structural beauty.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
            tags: ["HTML/CSS", "Vanilla JS", "Three.js", "GSAP"],
            liveLink: "projects/lumina/index.html",
            githubLink: "https://github.com/dsv2007"
        },
        quantum: {
            title: "Quantum AI",
            desc: "An advanced AI Resume Analyzer & Creator Workspace featuring dynamic client-side keyword auditing, live ATS Friendliness checklists, STAR format sentence optimizers, and a real-time Neural Model Hyperparameter Hub with live convergence charts.",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
            tags: ["React", "Vite", "JavaScript", "CSS"],
            liveLink: "projects/quantum/index.html",
            githubLink: "https://github.com/dsv2007/quantum-ai"
        }
    };

    const viewProjectBtns = document.querySelectorAll('.view-project-btn');
    const modal = document.getElementById('project-modal');
    
    if(modal) {
        const modalBackdrop = document.querySelector('.modal-backdrop');
        const closeModalBtn = document.querySelector('.close-modal');
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');
        const modalTags = document.getElementById('modal-tags');
        const modalLiveLink = document.getElementById('modal-live-link');
        const modalGithubLink = document.getElementById('modal-github-link');

        const openModal = (projectId) => {
            const data = projectsData[projectId];
            if(data) {
                modalImg.src = data.image;
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                
                if(modalLiveLink) modalLiveLink.href = data.liveLink;
                if(modalGithubLink) modalGithubLink.href = data.githubLink;

                modalTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'tag';
                    span.textContent = tag;
                    modalTags.appendChild(span);
                });

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            }
        };

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        viewProjectBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.getAttribute('data-project');
                openModal(projectId);
            });
        });

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    }

    // 6. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = [
            "Santhivarshini D",
            "an AI Engineer",
            "a Data Scientist",
            "a Full-Stack Developer"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000; 
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000);
    }

    // 7. 3D Tilt Effect on Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // 8. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', () => {
            const btnSpan = submitBtn.querySelector('span');
            if (btnSpan) btnSpan.textContent = "Sending...";
            submitBtn.style.opacity = '0.8';
            submitBtn.style.pointerEvents = 'none';
        });
    }
});
