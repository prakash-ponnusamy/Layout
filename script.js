// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation tab switching
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section (if sections exist)
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Handle sticky navigation
    const navBar = document.getElementById('navBar');
    const header = document.querySelector('.header');
    
    function handleScroll() {
        const headerHeight = header.offsetHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > headerHeight - 100) {
            navBar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navBar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        }
    }
    
    window.addEventListener('scroll', handleScroll);

    // Handle edit button clicks
    const editButtons = document.querySelectorAll('.edit-btn, .edit-profile-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show notification (you can replace this with actual edit functionality)
            showNotification('Edit functionality would be implemented here');
        });
    });

    // Handle quick action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show notification based on button clicked
            showNotification(`${buttonText} functionality would be implemented here`);
        });
    });

    // Handle activity item clicks
    const activityItems = document.querySelectorAll('.activity-item');
    
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const activityTitle = this.querySelector('.activity-title').textContent;
            showNotification(`Viewing details for: ${activityTitle}`);
        });
    });

    // Handle stat item clicks
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('click', function() {
            const statLabel = this.querySelector('.stat-label').textContent;
            showNotification(`Viewing detailed ${statLabel.toLowerCase()} information`);
        });
    });

    // Notification system
    function showNotification(message) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-info-circle"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;

        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            color: #1e293b;
        `;

        const closeButton = notification.querySelector('.notification-close');
        closeButton.style.cssText = `
            background: none;
            border: none;
            color: #64748b;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            margin-left: auto;
        `;

        // Add animation keyframes
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
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
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Add to page
        document.body.appendChild(notification);

        // Handle close button
        closeButton.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // Handle responsive navigation on mobile
    function handleMobileNav() {
        const navTabs = document.querySelector('.nav-tabs');
        let isScrolling = false;

        navTabs.addEventListener('touchstart', function() {
            isScrolling = true;
        });

        navTabs.addEventListener('touchend', function() {
            setTimeout(() => {
                isScrolling = false;
            }, 100);
        });

        // Prevent click events during scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (isScrolling) {
                    e.preventDefault();
                }
            });
        });
    }

    handleMobileNav();

    // Add loading states for better UX
    function addLoadingState(element) {
        const originalContent = element.innerHTML;
        element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        element.disabled = true;

        setTimeout(() => {
            element.innerHTML = originalContent;
            element.disabled = false;
        }, 1000);
    }

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add keyboard navigation styles
    const keyboardStyles = document.createElement('style');
    keyboardStyles.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #007bff !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(keyboardStyles);
});