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
    const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('mobile-menu-active');
            if (mobileBackdrop) {
                mobileBackdrop.classList.toggle('hidden');
                mobileBackdrop.classList.toggle('opacity-0');
                mobileBackdrop.classList.toggle('pointer-events-none');
            }
            document.body.classList.toggle('overflow-hidden');
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', toggleMenu);

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
        // Animate Circles using GSAP so we can re-run smoothly
        document.querySelectorAll('.progress-ring__circle').forEach(circle => {
            const percent = circle.getAttribute('data-percent');
            const radius = circle.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            // ensure dasharray is set
            circle.style.strokeDasharray = circumference;
            const offset = circumference - (percent / 100) * circumference;
            gsap.to(circle, {
                strokeDashoffset: offset,
                duration: 1.5,
                ease: "power1.out"
            });
        });

        // Animate Numbers using GSAP so we can re-run on demand
        document.querySelectorAll('.count-up').forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let ctx = { val: 0 };
            gsap.to(ctx, {
                val: target,
                duration: 1.5,
                ease: "power1.out",
                onUpdate: function () {
                    counter.innerText = Math.ceil(ctx.val) + "%";
                }
            });
        });
    }

    // Reset progress rings and counters so animations can re-run on demand
    function resetSkillsAnimation() {
        document.querySelectorAll('.progress-ring__circle').forEach(circle => {
            const radius = circle.getAttribute('r');
            const circumference = 2 * Math.PI * radius;
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
        });
        document.querySelectorAll('.count-up').forEach(counter => {
            counter.innerText = '0%';
        });
    }

    // Trigger animation when Skills nav link is clicked (desktop + mobile)
    const skillsNavLinks = document.querySelectorAll('.nav-link[href="#skills"], .mobile-link[href="#skills"]');
    if (skillsNavLinks.length > 0) {
        skillsNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Reset immediately so user sees animation from 0
                resetSkillsAnimation();
                // Delay slightly to allow browser to perform the scroll
                setTimeout(() => {
                    animateSkillsContent();
                }, 500);
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

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';

            const formData = new FormData(contactForm);

            // Use FormSubmit.co for serverless email handling (Works on GitHub Pages)
            fetch('https://formsubmit.co/ajax/pccraju7@gmail.com', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === "true" || data.success === true) {
                        alert("Thank you! Your message has been sent successfully.");
                        contactForm.reset();
                    } else {
                        alert("Something went wrong. Please try again.");
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
        });
    }

});
