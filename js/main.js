document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
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
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Observers only once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Parallax effect for the ambient background glow
    const ambientBg = document.querySelector('.ambient-bg');
    if(ambientBg) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Subtle shift based on mouse position
            ambientBg.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
        });
    }

    // 5. Project Modals
    const projectsData = {
        nova: {
            title: "Nova Finance",
            desc: "A comprehensive fintech dashboard delivering real-time analytics, portfolio tracking, and AI-driven market insights. Built with a focus on deep security and lightning-fast data processing.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            tags: ["React", "TypeScript", "Node.js", "D3.js"],
            liveLink: "#",
            githubLink: "https://github.com/dsv2007"
        },
        aura: {
            title: "Aura Boutique",
            desc: "A premium luxury e-commerce platform pushing the boundaries of web animation. Features a headless CMS, ultra-fast page transitions, and elegant product showcases.",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
            tags: ["Next.js", "Tailwind", "Stripe", "Framer Motion"],
            liveLink: "#",
            githubLink: "https://github.com/dsv2007"
        },
        synapse: {
            title: "Synapse AI",
            desc: "A scalable SaaS web application allowing enterprise users to rapidly train and deploy custom AI models without writing a single line of code.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            tags: ["Vue.js", "Python", "TensorFlow", "AWS"],
            liveLink: "#",
            githubLink: "https://github.com/dsv2007"
        },
        lumina: {
            title: "Lumina Studio",
            desc: "A breath-taking corporate branding and portfolio website for an internationally recognized architecture firm. Emphasizes minimalism and structural beauty.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
            tags: ["HTML/CSS", "Vanilla JS", "Three.js", "GSAP"],
            liveLink: "#",
            githubLink: "https://github.com/dsv2007"
        },
        quantum: {
            title: "Quantum AI",
            desc: "An advanced AI Resume Analyzer & Creator Workspace featuring dynamic client-side keyword auditing, live ATS Friendliness checklists, STAR format sentence optimizers, and a real-time Neural Model Hyperparameter Hub with live convergence charts.",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
            tags: ["React", "Vite", "JavaScript", "CSS"],
            liveLink: "#",
            githubLink: "https://github.com/dsv2007/quantum-ai.git"
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

                // Clear and repopulate tags
                modalTags.innerHTML = '';
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'tag';
                    span.textContent = tag;
                    modalTags.appendChild(span);
                });

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling underneath
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
});
