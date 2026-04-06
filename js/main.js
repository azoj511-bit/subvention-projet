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
const GMAIL_ADDRESS = 'subventionprojet@outlook.fr';
const FORMSPREE_ID = ''; // Si vous avez un compte Formspree, mettez votre ID ici (ex: 'mknrekwy')

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
        
        const data = { name, email, subject, message };
        
        if (FORMSPREE_ID) {
            submitBtn.innerText = 'Envoi en cours...';
            submitBtn.disabled = true;
            fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    alert('Merci ! Votre message a été envoyé avec succès.');
                    contactForm.reset();
                } else {
                    alert("Une erreur s'est produite. Veuillez réessayer.");
                }
            }).catch(error => {
                alert("Une erreur s'est produite. Veuillez réessayer.");
            }).finally(() => {
                submitBtn.innerText = 'Envoyer le message';
                submitBtn.disabled = false;
            });
        } else {
            // Fallback to Gmail redirect
            const emailBody = `Détails du message :%0ANom : ${name}%0AEmail : ${email}%0A%0A${message}`;
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${GMAIL_ADDRESS}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            window.open(gmailUrl, '_blank');
        }
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
        
        const data = {
            _subject: `Demande de prêt - ${type} - ${name}`,
            nom: name,
            email: email,
            telephone: phone,
            type_pret: type,
            montant: amount,
            duree: duration,
            situation: job,
            message: message
        };
        
        if (FORMSPREE_ID) {
            submitBtn.innerText = 'Envoi en cours...';
            submitBtn.disabled = true;
            fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    alert('Félicitations ! Votre demande a été transmise.');
                    loanForm.reset();
                } else {
                    alert("Une erreur s'est produite lors de l'envoi.");
                }
            }).catch(error => {
                alert("Erreur de connexion. Veuillez réessayer.");
            }).finally(() => {
                submitBtn.innerText = 'Soumettre la demande';
                submitBtn.disabled = false;
            });
        } else {
            // Fallback to Gmail redirect
            const subject = `Demande de prêt - ${type} - ${name}`;
            const emailBody = `Nouvelle demande de financement :%0A%0ANom complet : ${name}%0AEmail : ${email}%0ATéléphone : ${phone}%0A%0A-- Détails du prêt --%0AType de prêt : ${type}%0AMontant souhaité : ${amount} €%0ADurée : ${duration} mois%0ASituation Pro : ${job}%0A%0A-- Informations complémentaires --%0A${message}`;
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${GMAIL_ADDRESS}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            window.open(gmailUrl, '_blank');
        }
    });
}
