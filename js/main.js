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

// Contact Form / Loan Application Helper
const WHATSAPP_NUMBER = '33757756283';

// Handle Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        submitBtn.innerText = 'Redirection...';
        submitBtn.disabled = true;

        const text = `*Nouveau Message de Contact*\n\n*Nom* : ${name}\n*Email* : ${email}\n*Sujet* : ${subject}\n\n*Message* :\n${message}`;
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        
        window.open(waUrl, '_blank');
        contactForm.reset();
        
        setTimeout(() => {
            submitBtn.innerText = 'Soumettre la demande';
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Handle Loan Application Form Submission
const loanForm = document.getElementById('loanForm');
if (loanForm) {
    loanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = loanForm.querySelector('button[type="submit"]');
        const name = document.getElementById('loanName').value;
        const email = document.getElementById('loanEmail').value;
        const phone = document.getElementById('loanPhone').value;
        const job = document.getElementById('loanJob').value;
        const amount = document.getElementById('loanAmount').value;
        const duration = document.getElementById('loanDuration').value;
        const type = document.getElementById('loanType').value;
        const message = document.getElementById('loanMessage').value;
        
        submitBtn.innerText = 'Redirection...';
        submitBtn.disabled = true;

        const text = `*Nouvelle Demande de Financement*\n\n*Nom complet* : ${name}\n*Email* : ${email}\n*Téléphone* : ${phone}\n\n-- *Détails du prêt* --\n*Type de prêt* : ${type}\n*Montant souhaité* : ${amount} €\n*Durée* : ${duration} mois\n*Situation Pro* : ${job}\n\n-- *Informations complémentaires* --\n${message}`;
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        
        window.open(waUrl, '_blank');
        loanForm.reset();
        
        setTimeout(() => {
            submitBtn.innerText = 'Soumettre la demande';
            submitBtn.disabled = false;
        }, 2000);
    });
}
