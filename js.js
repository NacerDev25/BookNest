document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById("menu-toggle");
    const sideMenu = document.getElementById("side-menu");
    const pageContainer = document.querySelector(".page-container");
    const mainNavList = document.querySelector(".bottom-nav .nav-list");

    // --- 1. Populate the side menu on page load ---
    // Clone the main navigation to the side menu for mobile use.
    if (mainNavList && sideMenu) {
        const clonedNav = mainNavList.cloneNode(true);
        sideMenu.appendChild(clonedNav);
    }

    // --- 2. Advanced Menu Functionality ---
    const menuBackdrop = document.getElementById("menu-backdrop");
    let isMenuOpen = false; // State variable

    // Function to toggle the menu
    function toggleMenu(show, options = { returnFocus: true }) {
        // Prevent running if the state is already what's requested
        if (show === isMenuOpen) return;

        isMenuOpen = show;
        menuToggle.setAttribute('aria-expanded', isMenuOpen);

        if (isMenuOpen) {
            document.body.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
            pageContainer.inert = true;
            
            // Push state to history for back button functionality
            history.pushState({ menuOpen: true }, '', '#menu');

            // Focus first element
            const firstFocusable = sideMenu.querySelector('a, button');
            if (firstFocusable) setTimeout(() => firstFocusable.focus(), 100);

        } else {
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            pageContainer.inert = false;
            
            // If the closing was triggered by something other than popstate, go back
            if (history.state && history.state.menuOpen) {
                history.back();
            }
            
            // Return focus to the toggle button
            if (options.returnFocus) {
                setTimeout(() => menuToggle.focus(), 0); // Ensure focus happens after any potential navigation
            }
        }
    }

    // --- 3. Event Listeners for Menu ---

    // Toggle button click
    if (menuToggle) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu(!isMenuOpen);
        });
    }

    // Backdrop click to close
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', () => toggleMenu(false));
    }

    // Close menu when a link inside is clicked
    if (sideMenu) {
        sideMenu.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                toggleMenu(false); // Removed { returnFocus: false } to allow focus return
            }
        });
    }

    // Keyboard accessibility: Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu(false);
        }
    });

    // Handle the browser's back button
    window.addEventListener('popstate', (e) => {
        // If the state is null, it means we've gone back from the #menu hash
        if (isMenuOpen && (!e.state || !e.state.menuOpen)) {
            toggleMenu(false);
        }
    });

    // Initial state setup on load
    if (window.location.hash === '#menu') {
        history.replaceState({}, '', window.location.pathname + window.location.search);
    }
    document.body.classList.remove('menu-open');
    isMenuOpen = true; // Set to true so toggleMenu(false) runs correctly
    toggleMenu(false);

    // --- 4. Login Modal Functionality ---
    const profileBtn = document.querySelector('#login-btn');

    let loginModalOverlay = null; // Will be assigned after fetching
    let closeModalBtn = null;
    let emailInput = null;
    let modalLoaded = false; // Flag to ensure modal HTML is only fetched once
    let lastFocusedElement = null; // Variable to store what to focus on close

    // Define handlers so they can be added and removed
    const handleOverlayClick = (e) => {
        if (e.target === loginModalOverlay) {
            closeModal();
        }
    };

    const handleEscapeKey = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    // Function to open the modal
    const openModal = async () => {
        lastFocusedElement = document.activeElement; // Store the currently focused element

        if (!modalLoaded) {
            try {
                const response = await fetch('login-modal.html');
                if (!response.ok) {
                    console.error('Failed to fetch login modal.');
                    return;
                }
                const modalHtml = await response.text();
                document.body.insertAdjacentHTML('beforeend', modalHtml);

                loginModalOverlay = document.getElementById('login-modal-overlay');
                closeModalBtn = document.getElementById('modal-close-btn');
                emailInput = document.getElementById('email-input');
                
                modalLoaded = true;
            } catch (error) {
                console.error('Error fetching or setting up login modal:', error);
                return;
            }
        }

        if (loginModalOverlay) {
            loginModalOverlay.classList.add('visible');
            
            // Attach event listeners every time the modal opens
            closeModalBtn?.addEventListener('click', closeModal);
            loginModalOverlay?.addEventListener('click', handleOverlayClick);
            document.addEventListener('keydown', handleEscapeKey);

            setTimeout(() => emailInput?.focus(), 100);
        }
    };

    // Function to close the modal
    const closeModal = () => {
        if (loginModalOverlay && loginModalOverlay.classList.contains('visible')) {
            loginModalOverlay.classList.remove('visible');

            // Remove event listeners every time the modal closes
            closeModalBtn?.removeEventListener('click', closeModal);
            loginModalOverlay?.removeEventListener('click', handleOverlayClick);
            document.removeEventListener('keydown', handleEscapeKey);
            
            // Return focus to the element that opened the modal.
            lastFocusedElement?.focus();
        }
    };

    if (profileBtn) {
        profileBtn.addEventListener('click', openModal);
        profileBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });
    } else {
        console.error("Could not find the profile button (.profile-container). The modal will not open.");
    }

    // --- 6. Community Button Navigation ---
    const communityBtn = document.getElementById('community-btn');
    if (communityBtn) {
        communityBtn.addEventListener('click', () => {
            window.location.href = 'community.html';
        });
    }

    // --- 7. Dark/Light Mode Toggle ---
    const modeToggle = document.getElementById("mode-toggle");
    const modeIcon = modeToggle.querySelector("i");
    const modeText = modeToggle.querySelector("span");

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add("dark-mode");
            modeIcon.className = 'ti ti-sun';
            modeText.textContent = 'Light Mode';
        } else {
            document.body.classList.remove("dark-mode");
            modeIcon.className = 'ti ti-moon';
            modeText.textContent = 'Dark Mode';
        }
    };

    // Function to toggle the theme and save preference
    const toggleTheme = () => {
        const currentThemeIsDark = document.body.classList.contains("dark-mode");
        const newTheme = currentThemeIsDark ? 'light' : 'dark';
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    };

    // Add click event listener
    if (modeToggle) {
        modeToggle.addEventListener("click", toggleTheme);
    }

    // On initial load, check for saved theme
    const savedTheme = localStorage.getItem("theme");
    // Check for user's system preference if no theme is saved
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light'); // Default to light
    }

    // --- 8. Focus Management on Page Load ---
    const handleReturnFocus = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const focusTargetId = urlParams.get('returnFocus');

        if (focusTargetId) {
            const focusTarget = document.getElementById(focusTargetId);
            if (focusTarget) {
                // Use a more robust focus method for mobile reliability
                setTimeout(() => {
                    // Blur any active element first to prevent focus conflicts
                    if (document.activeElement) {
                        document.activeElement.blur();
                    }
                    focusTarget.focus();

                    // Announce successful navigation to screen reader users
                    const announcer = document.getElementById('aria-live-announcer');
                    if (announcer) {
                        announcer.textContent = 'تم الرجوع إلى الصفحة الرئيسية';
                        // Clear the announcer after a delay so it's not read again
                        setTimeout(() => {
                            announcer.textContent = '';
                        }, 5000);
                    }
                }, 150); // Increased delay for mobile browsers
            }
            // Clean the URL to remove the parameter
            history.replaceState(null, '', window.location.pathname);
        }
    };

    handleReturnFocus();
});
document.addEventListener('DOMContentLoaded', () => {
    const mainHeading = document.getElementById('community-heading');

    if (mainHeading) {
        // Set tabindex to -1 to make the heading programmatically focusable
        mainHeading.setAttribute('tabindex', '-1');
        
        // Use a more robust focus method for mobile reliability
        setTimeout(() => {
            // Blur any active element first to prevent focus conflicts
            if (document.activeElement) {
                document.activeElement.blur();
            }
            mainHeading.focus();
        }, 150); // Increased delay for mobile browsers
    }

    const backToHomeBtn = document.getElementById('back-to-home-btn');
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            // Redirect back to the main page and signal where to return focus
            window.location.href = 'index.html?returnFocus=community-btn';
        });
    }
});
