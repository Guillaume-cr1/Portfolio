
// MENU HAMBURGER RESPONSIVE

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animation du hamburger (transformation en X)
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// FORMULAIRE DE CONTACT - CONSTITUTION D'UN EMAIL


const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const sujet = encodeURIComponent(`Message de ${nom} via le site portfolio`);
        const corps = encodeURIComponent(
            `Nom: ${nom}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        );
        const mailtoLink = `mailto:crampe.guillaume@gmail.com?subject=${sujet}&body=${corps}`;
        
        window.location.href = mailtoLink;
        
        contactForm.reset();
        
        alert('Votre client email va s\'ouvrir. Veuillez envoyer le message.');
    });
}

// NAVIGATION INTERNE CV 

const cvNavLinks = document.querySelectorAll('.cv-nav-link');

cvNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            cvNavLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// ANIMATION AU SCROLL

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de compétences
const competenceCards = document.querySelectorAll('.competence-card');
competenceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// VALIDATION DU FORMULAIRE AVEC VÉRIFICATIONS

if (contactForm) {
    const emailInput = document.getElementById('email');
    const nomInput = document.getElementById('nom');
    const messageInput = document.getElementById('message');
    
    // Validation de l'email en temps réel
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = '#e74c3c';
            } else {
                emailInput.style.borderColor = '#27ae60';
            }
        });
    }
    
    // Réinitialiser la bordure au focus
    [nomInput, emailInput, messageInput].forEach(input => {
        if (input) {
            input.addEventListener('focus', () => {
                input.style.borderColor = '#3498db';
            });
        }
    });
}

// GESTION DES LIENS EXTERNES

document.addEventListener('DOMContentLoaded', () => {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.hostname.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// DÉTECTION DU SCROLL POUR LA NAVBAR

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    navbar.style.transition = 'transform 0.3s ease';
}

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll vers le bas - masquer la navbar
        if (navbar) {
            navbar.style.transform = 'translateY(-100%)';
        }
    } else {
        // Scroll vers le haut - afficher la navbar
        if (navbar) {
            navbar.style.transform = 'translateY(0)';
        }
    }
    
    lastScroll = currentScroll;
});