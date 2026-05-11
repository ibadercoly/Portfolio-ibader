// Smooth scroll + active nav highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Manual click offset for anchor links
document.querySelectorAll('.nav-links a, .btn-primary[href^="#"], .btn-outline[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const hash = this.getAttribute('href');
        if (hash && hash !== '#') {
            const target = document.querySelector(hash);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, null, hash);
                updateActiveLink();
            }
        }
    });
});

// Animation au scroll pour les cartes
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Gestion de la photo avec fallback
const profilePhoto = document.getElementById('profilePhoto');
if (profilePhoto) {
    profilePhoto.addEventListener('error', function() {
        // Photo de remplacement par défaut
        this.style.display = 'none';
        const container = this.parentElement;
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'fallback-avatar';
        const span = document.createElement('span');
        span.textContent = 'IBA';
        fallbackDiv.appendChild(span);
        container.appendChild(fallbackDiv);
    });
}

// Gestion du téléchargement de CV
const downloadBtn = document.querySelector('.btn-primary[href="#"]');
if (downloadBtn && downloadBtn.textContent.includes('Télécharger')) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Fonctionnalité de téléchargement de CV à implémenter. Vous pouvez ajouter votre vrai fichier PDF ici.');
    });
}

console.log('Portfolio Iba Der Coly chargé avec succès ! 🚀');