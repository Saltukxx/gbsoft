// EBBApp - GBSoft Smart Operations Website JavaScript

// Language switching functionality
let currentLanguage = 'tr'; // Default to Turkish

document.addEventListener('DOMContentLoaded', function() {
    // Initialize language switching
    initializeLanguageSwitching();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize header scroll effects
    initializeHeaderEffects();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Initialize floating CTA
    initializeFloatingCTA();
    
    // Initialize form handling
    initializeFormHandling();
});

// Language Switching System
function initializeLanguageSwitching() {
    const languageToggle = document.getElementById('langToggle');
    
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            toggleLanguage();
        });
    }
    
    // Set initial language
    setLanguage(currentLanguage);
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'tr' ? 'en' : 'tr';
    setLanguage(currentLanguage);
    
    // Update toggle button text
    const languageToggle = document.getElementById('langToggle');
    if (languageToggle) {
        languageToggle.textContent = currentLanguage === 'tr' ? 'EN' : 'TR';
    }
}

function setLanguage(lang) {
    // Hide all text elements first
    document.querySelectorAll('.en-text, .tr-text').forEach(element => {
        element.classList.add('hidden');
    });
    
    // Show elements for the selected language
    const selector = lang === 'tr' ? '.tr-text' : '.en-text';
    document.querySelectorAll(selector).forEach(element => {
        element.classList.remove('hidden');
    });
    
    // Update page title and meta description
    if (lang === 'tr') {
        document.title = 'GBSoft Akıllı Operasyonlar | AI Destekli Belediye Komuta Merkezi';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'AI vardiya planlama, gerçek zamanlı filo görünürlüğü ve Sentinel-2 çevresel analitik birleştiren belediye sınıfı operasyon kokpiti. Türk belediyeleri için akıllı şehir yönetimi.');
        }
    } else {
        document.title = 'GBSoft Smart Operations | AI-Powered Municipal Command Center';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Municipal-grade operations cockpit unifying AI shift planning, real-time fleet visibility, and Sentinel-2 environmental analytics. Smart city management for Turkish municipalities.');
        }
    }
    
    currentLanguage = lang;
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Effects
function initializeHeaderEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.style.background = 'rgba(249, 250, 251, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(249, 250, 251, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', updateNavbar, { passive: true });
}

// Animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Simple fade-in animation for section titles only
    const animateElements = document.querySelectorAll('.section-title');
    animateElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.5s ease';
        observer.observe(el);
    });
    
    // Counter animation for statistics
    const counters = document.querySelectorAll('.stat-number, .metric-value');
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        countObserver.observe(counter);
    });

    // Initialize image optimization
    initializeImageOptimization();
}


// Image Optimization and Responsive Handling
function initializeImageOptimization() {
    // Simple image loading without intersection observer interference
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        // Ensure images are visible by default
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.3s ease';
        
        // Add loaded class when image loads
        img.onload = () => {
            img.classList.add('loaded');
        };
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
    
    // Handle image errors gracefully
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            
            // Create placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = `
                <div style="
                    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
                    border: 2px dashed var(--border-color);
                    border-radius: 12px;
                    padding: 40px 20px;
                    text-align: center;
                    color: var(--text-secondary);
                    font-weight: 500;
                    min-height: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                ">
                    <i class="fas fa-image" style="font-size: 3rem; opacity: 0.5; margin-bottom: 10px;"></i>
                    <span style="font-size: 0.9rem;">Image preview will be available soon</span>
                </div>
            `;
            
            this.parentNode.insertBefore(placeholder, this);
        });
    });
    
    // Responsive image handling for mobile
    function handleResponsiveImages() {
        const isMobile = window.innerWidth <= 768;
        const featureImages = document.querySelectorAll('.feature-image, .showcase-image');
        
        featureImages.forEach(img => {
            if (isMobile) {
                img.style.borderRadius = '12px';
            } else {
                img.style.borderRadius = '16px';
            }
        });
    }
    
    // Initial call and resize listener
    handleResponsiveImages();
    window.addEventListener('resize', handleResponsiveImages);
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const hasBrackets = text.includes('[') && text.includes(']');
    
    // Extract number
    let targetValue = parseFloat(text.replace(/[^\d.]/g, ''));
    if (isNaN(targetValue)) return;
    
    let currentValue = 0;
    const increment = targetValue / 60; // 60 steps for 1 second animation
    const duration = 1000;
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(currentValue);
        
        if (hasPercent) displayValue += '%';
        if (hasBrackets) displayValue = '[' + displayValue + '%]';
        if (text.includes('24/7')) {
            element.textContent = '24/7';
            clearInterval(timer);
            return;
        }
        
        element.textContent = displayValue;
    }, stepTime);
}

// FAQ Functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isOpen = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const otherAnswer = item.querySelector('.faq-answer');
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                    otherAnswer.style.opacity = '0';
                }
            });
            
            // Toggle current item
            if (!isOpen) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
            }
        });
    });
}

// Floating CTA
function initializeFloatingCTA() {
    const floatingCTA = document.getElementById('floatingCta');
    
    if (floatingCTA) {
        let isVisible = false;
        
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Show floating CTA after scrolling past hero section
            if (scrollPosition > windowHeight * 0.5 && !isVisible) {
                floatingCTA.style.transform = 'translateY(0)';
                floatingCTA.style.opacity = '1';
                isVisible = true;
            } else if (scrollPosition <= windowHeight * 0.3 && isVisible) {
                floatingCTA.style.transform = 'translateY(100px)';
                floatingCTA.style.opacity = '0';
                isVisible = false;
            }
            
            // Hide near footer
            if (scrollPosition + windowHeight > documentHeight - 200) {
                floatingCTA.style.transform = 'translateY(100px)';
                floatingCTA.style.opacity = '0';
            }
        });
        
        // Initial state
        floatingCTA.style.transform = 'translateY(100px)';
        floatingCTA.style.opacity = '0';
        floatingCTA.style.transition = 'all 0.3s ease';
    }
}

// Form Handling
function initializeFormHandling() {
    // CTA Button handlers
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .cta-nav, .pricing-cta, .floating-cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get button text for appropriate action
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('demo') || buttonText.includes('tour') || buttonText.includes('expert')) {
                showDemoModal();
            } else if (buttonText.includes('download') || buttonText.includes('brief')) {
                handleDownload();
            } else if (buttonText.includes('started') || buttonText.includes('başla')) {
                showContactModal();
            } else {
                showContactModal();
            }
        });
    });
}

function showDemoModal() {
    const modalHtml = `
        <div class="modal-overlay" id="demoModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>
                        <span class="en-text">Schedule Your GBSoft Demo</span>
                        <span class="tr-text hidden">GBSoft Demo Planlayın</span>
                    </h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="demoForm">
                        <div class="form-group">
                            <input type="text" name="name" placeholder="Full Name / Ad Soyad" required>
                        </div>
                        <div class="form-group">
                            <input type="email" name="email" placeholder="Email / E-posta" required>
                        </div>
                        <div class="form-group">
                            <input type="text" name="municipality" placeholder="Municipality / Belediye" required>
                        </div>
                        <div class="form-group">
                            <input type="text" name="title" placeholder="Job Title / Ünvan" required>
                        </div>
                        <div class="form-group">
                            <select name="interest" required>
                                <option value="">
                                    <span class="en-text">Primary Interest / Ana İlgi Alanı</span>
                                </option>
                                <option value="ai-planning">AI Shift Planning / AI Vardiya Planlama</option>
                                <option value="fleet-tracking">Fleet Tracking / Filo Takibi</option>
                                <option value="satellite-analytics">Satellite Analytics / Uydu Analitiği</option>
                                <option value="voice-commands">Voice Commands / Sesli Komutlar</option>
                                <option value="full-platform">Full Platform / Tam Platform</option>
                            </select>
                        </div>
                        <button type="submit" class="cta-primary">
                            <span class="en-text">Schedule Demo</span>
                            <span class="tr-text hidden">Demo Planla</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('demoModal');
    setLanguage(currentLanguage); // Apply current language to modal
    
    // Show modal
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Close modal handlers
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal('demoModal'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal('demoModal');
    });
    
    // Form submission
    document.getElementById('demoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="en-text">Scheduling...</span><span class="tr-text hidden">Planlanıyor...</span>';
        submitButton.disabled = true;
        
        setLanguage(currentLanguage); // Apply language to button text
        
        setTimeout(() => {
            showNotification(
                currentLanguage === 'en' 
                    ? 'Demo scheduled! Our team will contact you within 24 hours.'
                    : 'Demo planlandı! Ekibimiz 24 saat içinde sizinle iletişime geçecek.',
                'success'
            );
            closeModal('demoModal');
        }, 2000);
    });
}

function showContactModal() {
    const modalHtml = `
        <div class="modal-overlay" id="contactModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>
                        <span class="en-text">Contact Our Team</span>
                        <span class="tr-text hidden">Ekibimizle İletişime Geçin</span>
                    </h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="contactFormModal">
                        <div class="form-group">
                            <input type="text" name="name" placeholder="Full Name / Ad Soyad" required>
                        </div>
                        <div class="form-group">
                            <input type="email" name="email" placeholder="Email / E-posta" required>
                        </div>
                        <div class="form-group">
                            <input type="text" name="organization" placeholder="Municipality/Organization / Belediye/Kurum" required>
                        </div>
                        <div class="form-group">
                            <textarea name="message" placeholder="Message / Mesaj" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="cta-primary">
                            <span class="en-text">Send Message</span>
                            <span class="tr-text hidden">Mesaj Gönder</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('contactModal');
    setLanguage(currentLanguage);
    
    setTimeout(() => modal.classList.add('active'), 10);
    
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal('contactModal'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal('contactModal');
    });
    
    document.getElementById('contactFormModal').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="en-text">Sending...</span><span class="tr-text hidden">Gönderiliyor...</span>';
        submitButton.disabled = true;
        
        setLanguage(currentLanguage);
        
        setTimeout(() => {
            showNotification(
                currentLanguage === 'en' 
                    ? 'Message sent! We\'ll get back to you soon.'
                    : 'Mesaj gönderildi! En kısa sürede size dönüş yapacağız.',
                'success'
            );
            closeModal('contactModal');
        }, 2000);
    });
}

function handleDownload() {
    showNotification(
        currentLanguage === 'en' 
            ? 'Download initiated! Check your downloads folder.'
            : 'İndirme başlatıldı! İndirilenler klasörünüzü kontrol edin.',
        'success'
    );
    
    // In a real implementation, this would trigger an actual file download
    // For demo purposes, we'll just show the notification
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Utility functions
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        padding: 20px;
    }
    
    .modal-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-content {
        background: white;
        border-radius: 12px;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        transform: translateY(30px);
        transition: transform 0.3s ease;
    }
    
    .modal-overlay.active .modal-content {
        transform: translateY(0);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 24px 0;
    }
    
    .modal-header h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--text-primary);
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--text-secondary);
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: var(--transition);
    }
    
    .modal-close:hover {
        background: var(--background-color);
        color: var(--text-primary);
    }
    
    .modal-body {
        padding: 24px;
    }
    
    .modal-body .form-group {
        margin-bottom: 20px;
    }
    
    .modal-body input,
    .modal-body textarea,
    .modal-body select {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid var(--border-color);
        border-radius: var(--border-radius);
        font-family: var(--font-family);
        font-size: 16px;
        transition: var(--transition);
        background: white;
    }
    
    .modal-body input:focus,
    .modal-body textarea:focus,
    .modal-body select:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.1);
    }
    
    .modal-body textarea {
        resize: vertical;
        min-height: 100px;
    }
    
    .modal-body .cta-primary {
        width: 100%;
        margin-top: 8px;
    }
    
    /* Animation classes */
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

document.head.appendChild(modalStyles);

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModals = document.querySelectorAll('.modal-overlay.active');
        activeModals.forEach(modal => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });
    }
});

// Mobile navigation (if needed in future)
function initializeMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}