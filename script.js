document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.service-card, .process-step, .about-content, .cta-banner');
    
    // Add reveal class to all elements we want to animate
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    // Smart Header
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            // Past the top - strictly hide header
            nav.classList.add('nav-hidden');
            nav.classList.remove('nav-solid');
        } else {
            // At top - transparent header visible
            nav.classList.remove('nav-hidden');
            nav.classList.remove('nav-solid');
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (window.scrollY > 100) {
            if (e.clientY <= 80) {
                // Show header if mouse is at the top of the screen
                nav.classList.remove('nav-hidden');
                nav.classList.add('nav-solid');
            } else {
                // Re-hide header when mouse leaves the top
                nav.classList.add('nav-hidden');
                nav.classList.remove('nav-solid');
            }
        }
    });
});
