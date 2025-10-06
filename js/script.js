// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Scroll arrow functionality
const scrollArrow = document.querySelector('.scroll-indicator');
if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    // Add cursor pointer style
    scrollArrow.style.cursor = 'pointer';
}

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Navbar scroll effect with deployment-safe visibility
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

// Force navbar visibility on page load
if (navbar) {
    navbar.style.setProperty('transform', 'translateY(0)', 'important');
    navbar.style.setProperty('display', 'block', 'important');
    navbar.style.setProperty('visibility', 'visible', 'important');
    navbar.style.setProperty('opacity', '1', 'important');
    navbar.style.setProperty('position', 'fixed', 'important');
    navbar.style.setProperty('top', '0', 'important');
    navbar.style.setProperty('z-index', '1000', 'important');
}

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Multiple safety checks for deployed websites
    if (navbar) {
        // Force navbar to stay visible with highest priority
        navbar.style.setProperty('transform', 'translateY(0)', 'important');
        navbar.style.setProperty('display', 'block', 'important');
        navbar.style.setProperty('visibility', 'visible', 'important');
        navbar.style.setProperty('opacity', '1', 'important');
        navbar.style.setProperty('position', 'fixed', 'important');
        navbar.style.setProperty('top', '0', 'important');
        
        // Remove any potentially conflicting classes or attributes
        navbar.classList.remove('hidden', 'invisible', 'opacity-0');
        
        // Add smooth color transitions based on scroll position
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else if (scrollTop > 20) {
            navbar.classList.remove('scrolled');
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Additional safety check on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.setProperty('transform', 'translateY(0)', 'important');
        navbar.style.setProperty('display', 'block', 'important');
        navbar.style.setProperty('visibility', 'visible', 'important');
        navbar.style.setProperty('opacity', '1', 'important');
    }
});

// Safety check every 5 seconds for deployed sites
setInterval(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.getComputedStyle(navbar).transform !== 'none') {
        navbar.style.setProperty('transform', 'translateY(0)', 'important');
    }
}, 5000);

// Typing animation for hero section
const typingTexts = [
    'Mobile App Developer',
    'Frontend Enthusiast', 
    'Software Engineering Student',
    'Flutter Developer',
    'UI/UX Designer'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDuration = 2000;

function typeText() {
    if (!typingElement) return;
    
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = pauseDuration;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }
    
    setTimeout(typeText, typeSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure everything is loaded
    setTimeout(typeText, 500);
});

// Initialize scroll animations after page is fully loaded
window.addEventListener('load', function() {
    // Show the page with fade-in effect
    document.body.classList.add('loaded');
    
    // Additional delay for smooth appearance
    setTimeout(initScrollAnimations, 1000);
});

function initScrollAnimations() {
    // Observe all sections for scroll animations
    document.querySelectorAll('section, .timeline-item, .project-card, .skills-category, .about-stats').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate skill bars
            if (entry.target.classList.contains('skills-category')) {
                animateSkillBars(entry.target);
            }
            
            // Animate stats
            if (entry.target.classList.contains('about-stats')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Animate skill bars
function animateSkillBars(skillsSection) {
    const skillBars = skillsSection.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Animate statistics
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + '+';
        }, 20);
    });
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

window.addEventListener('scroll', updateActiveNavLink);

// Particle animation for hero background
function createParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Initialize EmailJS using config
(function() {
    // Wait for config to be loaded
    document.addEventListener('DOMContentLoaded', function() {
        if (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.emailjs.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
            emailjs.init(window.PORTFOLIO_CONFIG.emailjs.publicKey);
            console.log('EmailJS initialized with config');
        } else {
            console.warn('EmailJS not configured. Please update config/config.js with your EmailJS credentials.');
        }
    });
})();

// Contact form handling with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.querySelector('.btn-text');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Change button state to loading
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
            
            // Get configuration
            const config = window.PORTFOLIO_CONFIG;
            if (!config || !config.emailjs.serviceId || config.emailjs.serviceId === 'YOUR_EMAILJS_SERVICE_ID') {
                showNotification('Email service not configured. Please contact me directly at ' + (config?.contact?.email || 'nuwaherezapeter34@gmail.com'), 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const templateParams = {
                from_name: formData.get('from_name'),      // Visitor's name
                from_email: formData.get('from_email'),    // Visitor's email address
                subject: formData.get('subject'),          // Message subject
                message: formData.get('message'),          // The actual message content
                to_name: config.contact.name,             // Your name (recipient)
                to_email: config.contact.email            // Your email (where you'll receive the message)
            };
            
            // Send email TO your inbox using EmailJS
            // This sends the visitor's contact form data directly to your email
            emailjs.send(config.emailjs.serviceId, config.emailjs.templateId, templateParams)
                .then(function(response) {
                    console.log('Email sent to your inbox successfully!', response.status, response.text);
                    showNotification('Thank you! Your message has been sent. I\'ll get back to you soon!', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('Failed to send email:', error);
                    showNotification('Sorry, there was an error sending your message. Please try again or contact me directly at ' + config.contact.email, 'error');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    btnText.textContent = 'Send Message';
                    submitBtn.querySelector('i').className = 'fas fa-paper-plane';
                });
        });
    }
});

// Contact form handling (fallback for non-EmailJS setup)
const contactFormFallback = document.querySelector('.form:not(#contact-form)');
if (contactFormFallback) {
    contactFormFallback.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('from_name') || formData.get('name');
        const email = formData.get('from_email') || formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Create mailto link as fallback
        const mailtoLink = `mailto:nuwaherezapeter34@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        window.location.href = mailtoLink;
        
        showNotification('Opening your email client...', 'success');
        this.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
    }
});

// Performance optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));

// Preload images
function preloadImages() {
    const imageUrls = ['peterImage.jpg'];
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();