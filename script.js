// script.js - Complete JavaScript for Advent Roofing Website

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.getElementById('main-header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const servicesDropdown = document.getElementById('services-dropdown');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
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
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            mobileMenuToggle.innerHTML = mainNav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            
            // Close services dropdown when mobile menu closes
            if (!mainNav.classList.contains('active') && servicesDropdown) {
                servicesDropdown.classList.remove('active');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mainNav && mainNav.classList.contains('active') && 
            !mainNav.contains(e.target) && 
            mobileMenuToggle && 
            !mobileMenuToggle.contains(e.target)) {
            mainNav.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            if (servicesDropdown) {
                servicesDropdown.classList.remove('active');
            }
        }
    });
    
    // Services dropdown functionality
    if (servicesDropdown) {
        const dropdownToggle = servicesDropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = servicesDropdown.querySelector('.dropdown-menu');
        
        // Function to handle dropdown toggle
        function toggleDropdown(e) {
            if (window.innerWidth <= 992) {
                // Mobile behavior
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle dropdown
                servicesDropdown.classList.toggle('active');
                
                // Close other dropdowns if any
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    if (dropdown !== servicesDropdown && dropdown.classList.contains('active')) {
                        dropdown.classList.remove('active');
                    }
                });
            }
        }
        
        // Handle dropdown toggle click
        dropdownToggle.addEventListener('click', toggleDropdown);
        
        // Handle dropdown item clicks
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // Get the href attribute
                const href = this.getAttribute('href');
                
                // Only process if it's a valid link
                if (href && href !== '#') {
                    // On mobile, close the menu and dropdown
                    if (window.innerWidth <= 992) {
                        if (mainNav.classList.contains('active')) {
                            mainNav.classList.remove('active');
                            if (mobileMenuToggle) {
                                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                            }
                        }
                        if (servicesDropdown.classList.contains('active')) {
                            servicesDropdown.classList.remove('active');
                        }
                        
                        // If the link is to a section on the same page (like #installation)
                        if (href.includes('#')) {
                            e.preventDefault();
                            const [page, sectionId] = href.split('#');
                            
                            // Check if we're already on the services page
                            if (window.location.pathname.includes('services.html') || 
                                (page === 'services.html' && window.location.pathname.endsWith('services.html'))) {
                                // Scroll to section
                                if (sectionId) {
                                    const targetElement = document.getElementById(sectionId);
                                    if (targetElement) {
                                        window.scrollTo({
                                            top: targetElement.offsetTop - 80,
                                            behavior: 'smooth'
                                        });
                                    }
                                }
                            } else {
                                // Navigate to services page with hash
                                window.location.href = href;
                            }
                        } else {
                            // Regular page navigation
                            window.location.href = href;
                        }
                    } else {
                        // Desktop behavior - let the link work normally
                        if (href.includes('#')) {
                            e.preventDefault();
                            const [page, sectionId] = href.split('#');
                            
                            // Check if we're already on the services page
                            if (window.location.pathname.includes('services.html') || 
                                (page === 'services.html' && window.location.pathname.endsWith('services.html'))) {
                                // Scroll to section
                                if (sectionId) {
                                    const targetElement = document.getElementById(sectionId);
                                    if (targetElement) {
                                        window.scrollTo({
                                            top: targetElement.offsetTop - 80,
                                            behavior: 'smooth'
                                        });
                                        
                                        // Close dropdown after click
                                        servicesDropdown.classList.remove('active');
                                    }
                                }
                            } else {
                                // Navigate to services page with hash
                                window.location.href = href;
                            }
                        }
                    }
                }
            });
        });
        
        // Handle hover for desktop
        if (window.innerWidth > 992) {
            servicesDropdown.addEventListener('mouseenter', () => {
                servicesDropdown.classList.add('active');
            });
            
            servicesDropdown.addEventListener('mouseleave', () => {
                servicesDropdown.classList.remove('active');
            });
        }
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
    window.addEventListener('scroll', checkScroll);
    
    // Handle form submissions
    const leadForm = document.getElementById('lead-form');
    const contactForm = document.getElementById('contact-form');
    
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show an alert
            showNotification('Thank you for your request! We will contact you shortly.');
            this.reset();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show an alert
            showNotification('Thank you for your message! We will respond within 24 hours.');
            this.reset();
        });
    }
    
    // Notification function
    function showNotification(message) {
        // Remove any existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
            animation-fill-mode: forwards;
            max-width: 350px;
            font-family: 'Lato', sans-serif;
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        // Add keyframes for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%);
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
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
        
        // Update dropdown event listeners based on screen size
        updateDropdownBehavior();
    }
    
    // Update dropdown behavior based on screen size
    function updateDropdownBehavior() {
        if (servicesDropdown) {
            const dropdownToggle = servicesDropdown.querySelector('.dropdown-toggle');
            
            // Remove existing event listeners to avoid duplicates
            const newToggle = dropdownToggle.cloneNode(true);
            dropdownToggle.parentNode.replaceChild(newToggle, dropdownToggle);
            
            // Re-attach event listener
            newToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    e.stopPropagation();
                    servicesDropdown.classList.toggle('active');
                }
            });
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process if it's an anchor link (starts with #)
            if (href.startsWith('#') && href.length > 1) {
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
                    
                    // Close dropdown if open
                    if (servicesDropdown && servicesDropdown.classList.contains('active')) {
                        servicesDropdown.classList.remove('active');
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
        element.innerHTML = element.innerHTML.replace('2023', currentYear);
    });
    
    // Add active class to current page in footer links
    function updateFooterLinks() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const footerLinks = document.querySelectorAll('.footer-links a');
        
        footerLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.style.color = 'var(--primary)';
                link.style.fontWeight = '600';
            }
        });
    }
    
    updateFooterLinks();
    
    // Prevent body scroll when mobile menu is open
    if (mobileMenuToggle) {
        const originalToggle = mobileMenuToggle.onclick;
        mobileMenuToggle.onclick = function(e) {
            if (originalToggle) originalToggle.call(this, e);
            
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            } else {
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
        };
        
        // Also handle when clicking nav links to close menu
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992 && mainNav.classList.contains('active')) {
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
            });
        });
        
        // Handle dropdown items
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    document.body.style.overflow = '';
                    document.body.style.position = '';
                    document.body.style.width = '';
                }
            });
        });
    }
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu and dropdowns
        if (e.key === 'Escape') {
            if (mainNav && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }
            
            if (servicesDropdown && servicesDropdown.classList.contains('active')) {
                servicesDropdown.classList.remove('active');
            }
            
            // Close FAQ items
            faqItems.forEach(item => {
                if (item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
        }
    });
    
    // Initialize dropdown behavior
    updateDropdownBehavior();
    
    // Log initialization
    console.log('Advent Roofing website initialized successfully');
});

// Add CSS for better dropdown on mobile
(function() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 992px) {
            .dropdown.active .dropdown-menu {
                display: block !important;
                animation: dropdownSlideDown 0.3s ease;
            }
            
            @keyframes dropdownSlideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .dropdown-item {
                padding-left: 2rem !important;
                transition: all 0.3s ease;
            }
            
            .dropdown-item:hover {
                padding-left: 2.5rem !important;
            }
        }
        
        /* Smooth transitions for all interactive elements */
        a, button, .btn, .dropdown-item, .filter-btn, .faq-question {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* Better focus styles for accessibility */
        a:focus, button:focus, .btn:focus, input:focus, select:focus, textarea:focus {
            outline: 2px solid var(--primary);
            outline-offset: 2px;
        }
        
        /* Smooth scrolling for the whole page */
        html {
            scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
            html {
                scroll-behavior: auto;
            }
            
            a, button, .btn, .dropdown-item, .filter-btn, .faq-question {
                transition: none !important;
            }
        }
    `;
    document.head.appendChild(style);
})();
