// script.js - Complete JavaScript for Advent Roofing Website

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.getElementById('main-header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const servicesDropdown = document.getElementById('services-dropdown');
    const navLinks = document.querySelectorAll('.nav-link');
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const typingElement = document.getElementById('typing');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Typing animation phrases
    const phrases = [
        "Quality Craftsmanship",
        "Reliable Solutions",
        "Expert Installation",
        "24/7 Emergency Service",
        "Premium Materials",
        "Exceptional Service"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    // Typing animation function
    function typeText() {
        if (!typingElement) return;
        
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Delete characters
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Type characters
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // If typing is complete
        if (!isDeleting && charIndex === currentPhrase.length) {
            isEnd = true;
            isDeleting = true;
            // Pause at the end of typing
            setTimeout(typeText, 1500);
            return;
        }
        
        // If deleting is complete
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex++;
            if (phraseIndex === phrases.length) {
                phraseIndex = 0;
            }
        }
        
        // Determine typing speed
        const typeSpeed = isDeleting ? 50 : 100;
        // Randomize speed slightly for natural effect
        const randomSpeed = Math.random() * 50 + typeSpeed;
        
        setTimeout(typeText, randomSpeed);
    }
    
    // Start typing animation
    if (typingElement) {
        setTimeout(typeText, 1000);
    }
    
    // Header scroll effect
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Check for scroll animations
        checkScroll();
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuToggle.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Services dropdown toggle for mobile
    if (servicesDropdown) {
        servicesDropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                servicesDropdown.classList.toggle('active');
            }
        });
    }
    
    // Handle dropdown hover for desktop
    if (servicesDropdown && window.innerWidth > 992) {
        servicesDropdown.addEventListener('mouseenter', () => {
            servicesDropdown.classList.add('active');
        });
        
        servicesDropdown.addEventListener('mouseleave', () => {
            servicesDropdown.classList.remove('active');
        });
    }
    
    // Update active nav link based on current page
    function updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
                
                // If this is a dropdown toggle, also activate the dropdown
                if (link.classList.contains('dropdown-toggle')) {
                    const dropdown = link.closest('.dropdown');
                    if (dropdown) {
                        dropdown.classList.add('active');
                    }
                }
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Call on page load
    updateActiveNavLink();
    
    // Gallery filtering
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    const categories = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // FAQ Accordion
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
    
    // Scroll animation function
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    // Initialize animations on page load
    checkScroll();
    window.addEventListener('load', checkScroll);
    
    // Handle form submissions
    const leadForm = document.getElementById('lead-form');
    const contactForm = document.getElementById('contact-form');
    
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your request! We will contact you shortly.');
            this.reset();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your message! We will respond within 24 hours.');
            this.reset();
        });
    }
    
    // Handle window resize
    function handleResize() {
        // Close mobile menu if resizing to larger screen
        if (window.innerWidth > 992 && mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
        
        // Reset dropdown states on resize
        if (servicesDropdown && window.innerWidth > 992) {
            servicesDropdown.classList.remove('active');
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process if it's an anchor link (starts with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 992 && mainNav && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        if (mobileMenuToggle) {
                            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        }
                    }
                }
            }
        });
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add a small fade-in effect for images
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // In case image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Add current year to copyright
    const copyrightElements = document.querySelectorAll('.copyright p');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
        element.innerHTML = element.innerHTML.replace('2025', currentYear);
    });
});
