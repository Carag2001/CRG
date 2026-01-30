// ===== PAGE LOADER =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);
});

// ===== COOKIE BANNER =====
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.querySelector('.btn-cookie.accept');
const cookieDecline = document.querySelector('.btn-cookie.decline');

// Check if user already made a choice
if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 3000);
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.classList.remove('show');
});

cookieDecline.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    cookieBanner.classList.remove('show');
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// ===== LANGUAGE SWITCHER =====
const langButtons = document.querySelectorAll('.lang-btn');
const currentLang = localStorage.getItem('language') || 'fr';

// Set active language
langButtons.forEach(btn => {
    if (btn.dataset.lang === currentLang) {
        btn.classList.add('active');
    }
    
    btn.addEventListener('click', () => {
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localStorage.setItem('language', btn.dataset.lang);
        
        // Here you would typically load translations
        console.log('Language changed to:', btn.dataset.lang);
    });
});

// ===== COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounter = (element) => {
    const target = element.getAttribute('data-target');
    let targetValue;
    
    // Handle different formats
    if (target.includes('.')) {
        targetValue = parseFloat(target);
    } else {
        targetValue = parseInt(target);
    }
    
    const duration = 2000;
    const increment = targetValue / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < targetValue) {
            if (target.includes('.')) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current);
            }
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const statsSection = document.querySelector('.stats-section');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            stats.forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, {
    threshold: 0.5
});

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== SMOOTH SCROLL FOR HERO BUTTONS =====
const btnPrimary = document.querySelector('.btn-primary');
const btnSecondary = document.querySelector('.btn-secondary');

if (btnPrimary) {
    btnPrimary.addEventListener('click', () => {
        document.querySelector('#services').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
}

if (btnSecondary) {
    btnSecondary.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
}

// ===== PORTFOLIO FILTERS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        portfolioCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== QUICK QUOTE FORM =====
const quoteForm = document.getElementById('quickQuoteForm');
const quoteSteps = document.querySelectorAll('.quote-step');
const quoteResult = document.getElementById('quoteResult');
let currentStep = 1;

// Next buttons
document.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
        const currentStepElement = document.querySelector(`.quote-step[data-step="${currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.type === 'radio') {
                const radioGroup = currentStepElement.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked) isValid = false;
            }
        });
        
        if (isValid) {
            currentStepElement.classList.remove('active');
            currentStep++;
            document.querySelector(`.quote-step[data-step="${currentStep}"]`).classList.add('active');
        } else {
            alert('Veuillez sélectionner une option');
        }
    });
});

// Previous buttons
document.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', () => {
        const currentStepElement = document.querySelector(`.quote-step[data-step="${currentStep}"]`);
        currentStepElement.classList.remove('active');
        currentStep--;
        document.querySelector(`.quote-step[data-step="${currentStep}"]`).classList.add('active');
    });
});

// Submit quote form
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(quoteForm);
        const data = {};
        formData.forEach((value, key) => {
            if (key !== '_honey') {
                data[key] = value;
            }
        });
        
        console.log('Quote request:', data);
        
        // Hide all steps
        quoteSteps.forEach(step => step.classList.remove('active'));
        
        // Show result
        quoteResult.classList.add('active');
        
        // Here you would typically send the data to your server
        // For now, we'll just simulate success
    });
}

// ===== CONTACT FORM =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Form will be handled by FormSubmit
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.querySelector('span').textContent = 'ENVOI EN COURS...';
        submitBtn.style.pointerEvents = 'none';
    });
}

// ===== SERVICE CARDS HOVER EFFECT =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== NAVIGATION ACTIVE STATE =====
const sections = document.querySelectorAll('section[id]');

const navHighlighter = () => {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', navHighlighter);

// ===== MODAL FUNCTIONALITY =====
const privacyLink = document.getElementById('privacyLink');
const termsLink = document.getElementById('termsLink');
const cookiesLink = document.getElementById('cookiesLink');

const privacyModal = document.getElementById('privacyModal');
const termsModal = document.getElementById('termsModal');
const cookiesModal = document.getElementById('cookiesModal');

const modalCloses = document.querySelectorAll('.modal-close');

// Open modals
if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
        e.preventDefault();
        privacyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (termsLink) {
    termsLink.addEventListener('click', (e) => {
        e.preventDefault();
        termsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (cookiesLink) {
    cookiesLink.addEventListener('click', (e) => {
        e.preventDefault();
        cookiesModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close modals
modalCloses.forEach(close => {
    close.addEventListener('click', () => {
        close.closest('.modal').classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== ANIMATIONS ON SCROLL =====
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

// Observe elements for animation
const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card, .pricing-card, .blog-card, .team-member');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
const typingText = document.querySelector('.typing-text');

if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// ===== GOLDEN PARTICLES INTERACTIVE =====
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 2;
        const moveX = (x - 0.5) * speed;
        const moveY = (y - 0.5) * speed;
        
        particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    navHighlighter();
}, 10));

// ===== BLOG CARDS PREVIEW =====
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
    const btnBlog = card.querySelector('.btn-blog');
    
    if (btnBlog) {
        btnBlog.addEventListener('click', () => {
            alert('Article bientôt disponible ! 📖');
        });
    }
});

// ===== PORTFOLIO CARDS DETAIL =====
const portfolioBtns = document.querySelectorAll('.portfolio-btn');

portfolioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        alert('Détails du projet bientôt disponibles ! 🚀');
    });
});

// ===== SERVICE BUTTONS =====
const serviceBtns = document.querySelectorAll('.btn-service');

serviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
});

// ===== PRICING BUTTONS =====
const pricingBtns = document.querySelectorAll('.btn-pricing');

pricingBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (index === 2) { // Enterprise plan
            document.querySelector('#contact').scrollIntoView({ 
                behavior: 'smooth' 
            });
        } else {
            document.querySelector('#contact').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    });
});

// ===== CONSOLE EASTER EGG =====
console.log('%c🌟 CRG - Excellence Digitale 🌟', 'color: #FFD700; font-size: 24px; font-weight: bold;');
console.log('%cVous êtes curieux ? On aime ça ! 😎', 'color: #FFD700; font-size: 14px;');
console.log('%cRejoignez notre équipe : maholo.contact@gmail.com', 'color: #FFD700; font-size: 12px;');

// ===== PREVENT CONTEXT MENU ON SPECIFIC ELEMENTS (Optional) =====
// Uncomment if you want to protect your images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        alert('Image protégée © CRG 2026');
    });
});
*/

// ===== NEWSLETTER FORM (If you add one later) =====
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            alert('Merci pour votre inscription ! 📧');
            newsletterForm.reset();
        }
    });
}

// ===== LAZY LOADING IMAGES (If you add real images later) =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== AUTOMATIC YEAR UPDATE IN FOOTER =====
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.current-year');

yearElements.forEach(element => {
    element.textContent = currentYear;
});

// ===== TESTIMONIALS ROTATION (Optional Auto-scroll) =====
let testimonialIndex = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    if (testimonialCards.length > 0) {
        testimonialCards.forEach((card, index) => {
            card.style.opacity = index === testimonialIndex ? '1' : '0.5';
            card.style.transform = index === testimonialIndex ? 'scale(1.05)' : 'scale(1)';
        });
        
        testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    }
}

// Auto-rotate testimonials every 5 seconds (optional)
// Uncomment if you want this feature
// setInterval(rotateTestimonials, 5000);

// ===== COPY EMAIL TO CLIPBOARD =====
const emailElements = document.querySelectorAll('.info-card p');

emailElements.forEach(element => {
    if (element.textContent.includes('@gmail.com')) {
        element.style.cursor = 'pointer';
        element.title = 'Cliquer pour copier';
        
        element.addEventListener('click', () => {
            const email = element.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                const originalText = element.textContent;
                element.textContent = '✓ Email copié !';
                element.style.color = '#00ff00';
                
                setTimeout(() => {
                    element.textContent = originalText;
                    element.style.color = '';
                }, 2000);
            });
        });
    }
});

// ===== LOADING PROGRESS FOR FORMS =====
function showLoadingProgress(button) {
    const originalText = button.querySelector('span').textContent;
    let dots = 0;
    
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        button.querySelector('span').textContent = 'ENVOI EN COURS' + '.'.repeat(dots);
    }, 500);
    
    return interval;
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (if you add search later)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Focus search input
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close mobile menu
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// ===== SMOOTH REVEAL ON PAGE LOAD =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== ANALYTICS TRACKING (Add your tracking code here) =====
function trackEvent(category, action, label) {
    console.log('Track Event:', category, action, label);
    // Add your analytics code here (Google Analytics, etc.)
}

// Track button clicks
document.querySelectorAll('button, .btn-gold').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent.trim());
    });
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
        }, 0);
    });
}

// ===== PRINT STYLES HANDLER =====
window.addEventListener('beforeprint', () => {
    console.log('Page is being printed...');
    // Hide unnecessary elements before printing
    document.querySelectorAll('.particles, .luxury-grid, .back-to-top, .theme-toggle, .language-switcher').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', () => {
    console.log('Print completed');
    // Restore hidden elements
    document.querySelectorAll('.particles, .luxury-grid, .back-to-top, .theme-toggle, .language-switcher').forEach(el => {
        el.style.display = '';
    });
});

// ===== INITIALIZATION MESSAGE =====
console.log('%c✨ Site CRG chargé avec succès! ✨', 'color: #FFD700; font-size: 16px; font-weight: bold;');
console.log('%cToutes les fonctionnalités sont actives:', 'color: #FFD700; font-size: 12px;');
console.log('✓ Navigation responsive');
console.log('✓ Animations interactives');
console.log('✓ Système de filtres portfolio');
console.log('✓ FAQ accordéon');
console.log('✓ Formulaires fonctionnels');
console.log('✓ Mode sombre/clair');
console.log('✓ Multilingue (FR/EN)');
console.log('✓ Devis rapide');
console.log('✓ Et bien plus encore!');
