// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Animate Counters on Scroll
const counters = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60 FPS
        
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCounter();
    });
};

const checkScroll = () => {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        const sectionTop = statsSection.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom && !hasAnimated) {
            animateCounters();
            hasAnimated = true;
        }
    }
};

window.addEventListener('scroll', checkScroll);


