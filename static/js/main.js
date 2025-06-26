// Main JavaScript for Shaurya Gupta Portfolio

// Dark Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const body = document.body;
    
    // Get saved theme or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || 'dark';
    
    // Apply theme to both body and html
    body.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme, themeIcon);
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply theme to both body and html
        body.setAttribute('data-theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
        
        // Add smooth transition effect
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Update navbar background immediately
        if (window.updateNavbarBackground) {
            window.updateNavbarBackground();
        }
        
        // Track theme change
        trackEvent('theme_toggle', { theme: newTheme });
        
        console.log('Theme switched to:', newTheme);
    });
}

function updateThemeIcon(theme, iconElement) {
    if (!iconElement) return;
    
    if (theme === 'dark') {
        iconElement.setAttribute('data-feather', 'sun');
    } else {
        iconElement.setAttribute('data-feather', 'moon');
    }
    feather.replace();
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effects
function initNavbarScroll() {
    const navbar = document.getElementById('mainNav');
    
    function updateNavbarBackground() {
        const theme = document.body.getAttribute('data-theme');
        const isScrolled = window.scrollY > 100;
        
        if (isScrolled) {
            navbar.classList.add('scrolled');
            if (theme === 'dark') {
                navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
                navbar.style.borderBottom = '1px solid rgba(241, 245, 249, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.borderBottom = '1px solid rgba(45, 55, 72, 0.1)';
            }
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        } else {
            navbar.classList.remove('scrolled');
            if (theme === 'dark') {
                navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
                navbar.style.borderBottom = '1px solid rgba(241, 245, 249, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.borderBottom = '1px solid rgba(45, 55, 72, 0.1)';
            }
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Update on scroll
    window.addEventListener('scroll', throttle(updateNavbarBackground, 100));
    
    // Update immediately on theme change
    window.updateNavbarBackground = updateNavbarBackground;
}

// Active section highlighting in navbar
function initScrollEffects() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    
    window.addEventListener('scroll', throttle(function() {
        let current = '';
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// Contact form enhancement
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    form.addEventListener('submit', function(e) {
        // Basic client-side validation
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        if (!name || name.length < 2) {
            e.preventDefault();
            showFormError('Name must be at least 2 characters long.');
            return;
        }
        
        if (!isValidEmail(email)) {
            e.preventDefault();
            showFormError('Please enter a valid email address.');
            return;
        }
        
        if (!message || message.length < 10) {
            e.preventDefault();
            showFormError('Message must be at least 10 characters long.');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    });
    
    // Reset button state if form submission fails
    setTimeout(() => {
        if (submitBtn.disabled) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    }, 5000);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form error
function showFormError(message) {
    const existingAlert = document.querySelector('.alert-danger');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(alertDiv, form);
    
    setTimeout(() => {
        if (alertDiv && alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Fade in animation for sections
function initFadeInAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        hero.style.transform = `translateY(${rate}px)`;
    }, 16));
}

// Typing animation for hero tagline - cycles through multiple texts
function initTypingAnimation() {
    const tagline = document.getElementById('typewriter-text');
    if (!tagline) return;
    
    const texts = [
        "Building intelligent tools, one dataset at a time.",
        "Creating AI solutions that make a difference.",
        "Transforming ideas into smart applications.",
        "Developing the future with code and creativity."
    ];
    
    let currentTextIndex = 0;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    
    // Add blinking cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.innerHTML = '';
    tagline.appendChild(cursor);
    
    function typeText() {
        const currentText = texts[currentTextIndex];
        let i = 0;
        const typeTimer = setInterval(() => {
            if (i < currentText.length) {
                tagline.textContent = currentText.substring(0, i + 1);
                tagline.appendChild(cursor);
                i++;
            } else {
                clearInterval(typeTimer);
                // Wait, then start erasing
                setTimeout(() => {
                    eraseText();
                }, 3000);
            }
        }, 80);
    }
    
    function eraseText() {
        const currentText = texts[currentTextIndex];
        let i = currentText.length;
        const eraseTimer = setInterval(() => {
            if (i > 0) {
                tagline.textContent = currentText.substring(0, i - 1);
                tagline.appendChild(cursor);
                i--;
            } else {
                clearInterval(eraseTimer);
                // Move to next text
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                // Wait, then start typing next text
                setTimeout(() => {
                    typeText();
                }, 1000);
            }
        }, 50);
    }
    
    // Start the animation
    typeText();
}

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            trackEvent('project_filter', { filter: filter });
        });
    });
}

// Performance optimization: Throttle function
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

// Analytics tracking
function trackEvent(eventName, eventData = {}) {
    console.log('Analytics Event:', eventName, eventData);
    // Implement actual analytics tracking here
}

// Auto-dismiss alerts
function initAlertDismissal() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            if (alert && alert.parentNode) {
                alert.classList.remove('show');
                setTimeout(() => alert.remove(), 150);
            }
        }, 5000);
    });
}

// Easter egg: Konami code
function initKonamiCode() {
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            trackEvent('konami_code_activated');
        }
    });
}

// Initialize everything when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initScrollEffects();
    initNavbarScroll();
    initSmoothScroll();
    initContactForm();
    initFadeInAnimation();
    initProjectFilters();
    initAlertDismissal();
    initKonamiCode();
    
    // Initialize typing animation with delay
    setTimeout(initTypingAnimation, 1500);
    
    // Initialize parallax on larger screens only
    if (window.innerWidth > 768) {
        initParallaxEffect();
    }
    
    // Track page load
    trackEvent('page_load', {
        theme: localStorage.getItem('theme') || 'light',
        viewport: { width: window.innerWidth, height: window.innerHeight }
    });
});

// Track CTA clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            button_href: e.target.href || 'no-href'
        });
    }
    
    if (e.target.closest('a[target="_blank"]')) {
        trackEvent('external_link_click', {
            link_url: e.target.closest('a').href,
            link_text: e.target.closest('a').textContent.trim()
        });
    }
});

// Add rainbow animation CSS for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);