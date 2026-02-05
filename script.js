// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-dark-300/60', 'backdrop-blur-md', 'shadow-lg');
                navbar.classList.remove('py-4');
                navbar.classList.add('py-2');
            } else {
                navbar.classList.remove('bg-dark-300/60', 'backdrop-blur-md', 'shadow-lg', 'py-2');
                navbar.classList.add('py-4');
            }
        });
    }

    // Active Link Highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function changeLinkState() {
        let index = sections.length;
        while (--index && window.scrollY + 150 < sections[index].offsetTop) { }
        navLinks.forEach((link) => link.classList.remove('active'));
        if (index >= 0) {
            navLinks[index].classList.add('active');
        }
    }

    if (sections.length > 0) {
        changeLinkState(); // Initial check
        window.addEventListener("scroll", changeLinkState);
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('mobile-menu-active');
            document.body.classList.toggle('overflow-hidden');
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Typing Animation
    const textElement = document.querySelector('.typing-text');
    const textToType = "Rajesh A";
    let charIndex = 0;

    function typeText() {
        if (textElement && charIndex < textToType.length) {
            textElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 150); // Typing speed
        }
    }

    // Start typing after a slight delay
    if (textElement) {
        setTimeout(typeText, 1000);
    }

    // GSAP Animations ------------------------------------------------

    // Section Title Animations (AOS Effect)
    const sectionHeaders = document.querySelectorAll('.text-center.mb-16');
    sectionHeaders.forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    });

    // Hero Section
    const heroTl = gsap.timeline();
    if (document.querySelector(".hero-content")) {
        heroTl.from(".hero-content > *", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        })
            .from(".hero-image", {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            }, "-=0.5");
    }

    // About Section
    if (document.querySelector('.about-img-container')) {
        gsap.set(".about-img-container", { x: -50, opacity: 0 });
        gsap.set(".about-content > *", { x: 50, opacity: 0 });

        gsap.to(".about-img-container", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });

        gsap.to(".about-content > *", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        });
    }

    // Skills Section
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0) {
        gsap.set(skillCards, { y: 50, opacity: 0 });

        gsap.to(skillCards, {
            scrollTrigger: {
                trigger: "#skills",
                start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            onComplete: animateSkillsContent
        });
    }

    function animateSkillsContent() {
        // Animate Circles
        document.querySelectorAll('.progress-ring__circle').forEach(circle => {
            const percent = circle.getAttribute('data-percent');
            const radius = circle.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        });

        // Animate Numbers
        document.querySelectorAll('.count-up').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let zero = { val: 0 };
            gsap.to(zero, {
                val: target,
                duration: 1.5,
                ease: "power1.out",
                onUpdate: function () {
                    counter.innerText = Math.ceil(zero.val) + "%";
                }
            });
        });
    }

    // Experience Section
    if (document.querySelector(".experience-item")) {
        gsap.from(".experience-item", {
            scrollTrigger: {
                trigger: "#experience",
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // Projects Section
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        gsap.set(projectCards, { y: 50, opacity: 0 });

        gsap.to(projectCards, {
            scrollTrigger: {
                trigger: "#projects",
                start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });
    }

    // Contact Section
    if (document.querySelector("#contact")) {
        gsap.from("#contact > div > div > div:first-child", {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%",
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from("#contact form", {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%",
            },
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        });
    }

});
