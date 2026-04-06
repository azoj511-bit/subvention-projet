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

// Contact Form / Loan Application Handler (via WhatsApp)
const WHATSAPP_NUMBER = '33757756283';

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
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
        contactForm.reset();

        setTimeout(() => {
            submitBtn.innerText = 'Soumettre la demande';
            submitBtn.disabled = false;
        }, 2000);
    });
}

const loanForm = document.getElementById('loanForm');
if (loanForm) {
    loanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = loanForm.querySelector('button[type="submit"]');
        const name = document.getElementById('loanName').value;
        const birth = document.getElementById('loanBirth').value;
        const nationality = document.getElementById('loanNationality').value;
        const postal = document.getElementById('loanPostal').value;
        const city = document.getElementById('loanCity').value;
        const country = document.getElementById('loanCountry').value;
        const phone = document.getElementById('loanPhone').value;
        const email = document.getElementById('loanEmail').value;
        const amount = document.getElementById('loanAmount').value;
        const duration = document.getElementById('loanDuration').value;
        const type = document.getElementById('loanType').value;
        const job = document.getElementById('loanJob').value;
        const marital = document.getElementById('loanMarital').value;
        const income = document.getElementById('loanIncome').value;
        const message = document.getElementById('loanMessage').value;

        submitBtn.innerText = 'Redirection...';
        submitBtn.disabled = true;

        const text = `*🏦 Nouvelle Demande de Financement*\n\n` +
            `*— Informations Personnelles —*\n` +
            `*Noms et Prénoms* : ${name}\n` +
            `*Date & Lieu de Naissance* : ${birth}\n` +
            `*Nationalité* : ${nationality}\n` +
            `*Code Postal* : ${postal}\n` +
            `*Ville* : ${city}\n` +
            `*Pays* : ${country}\n` +
            `*Téléphone* : ${phone}\n` +
            `*E-Mail* : ${email}\n\n` +
            `*— Détails du Prêt —*\n` +
            `*Montant souhaité* : ${amount} €\n` +
            `*Durée de remboursement* : ${duration} mois\n` +
            `*Objet du prêt* : ${type}\n\n` +
            `*— Situation Personnelle & Financière —*\n` +
            `*Situation Professionnelle* : ${job}\n` +
            `*Situation Matrimoniale* : ${marital}\n` +
            `*Revenu mensuel* : ${income} €\n\n` +
            `*— Déclaration —*\n${message}\n\n` +
            `⚠️ *Les pièces justificatives seront à envoyer séparément.*`;

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
        loanForm.reset();

        setTimeout(() => {
            submitBtn.innerText = 'Soumettre la demande';
            submitBtn.disabled = false;
        }, 2000);
    });
}
