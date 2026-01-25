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

    // --- 2. Core Menu Toggle Functionality ---
    if (menuToggle && sideMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevents the 'click outside' listener from firing immediately
            const isMenuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            toggleMenu(!isMenuOpen);
        });
    }

    /**
     * Toggles the menu visibility and accessibility attributes.
     * @param {boolean} show - True to show the menu, false to hide it.
     * @param {object} [options] - Optional settings.
     * @param {boolean} [options.returnFocus=true] - If false, focus will not be returned to the toggle button when closing.
     */
    function toggleMenu(show, options = { returnFocus: true }) {
        if (!sideMenu || !menuToggle) return;

        menuToggle.setAttribute('aria-expanded', show);
        if (pageContainer) {
            pageContainer.inert = show; // Make main content inert when menu is open
        }

        if (show) {
            // Focus the first interactive element in the menu
            const firstFocusableElement = sideMenu.querySelector('a, button');
            if (firstFocusableElement) {
                setTimeout(() => {
                    firstFocusableElement.focus();
                }, 100); // Delay allows screen reader to announce state change
            }
        } else {
            // Return focus to the toggle button when the menu is closed
            if (options.returnFocus) {
                menuToggle.focus();
            }
        }
    }

    // --- 3. Accessibility Enhancements ---

    // Close menu when a link inside is clicked
    sideMenu.addEventListener('click', (e) => {
        // If a link is clicked, close the menu, but don't steal focus
        // so the browser can navigate to the anchor.
        if (e.target.closest('a')) {
            toggleMenu(false, { returnFocus: false });
        }
    });

    // Close the menu with the 'Escape' key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const isMenuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            if (isMenuOpen) {
                toggleMenu(false); // Default options will return focus
            }
        }
    });

    // Close the menu when clicking outside of it
    document.addEventListener('click', (e) => {
        const isMenuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        if (!isMenuOpen) return;

        // Clicks on the toggle are handled by its own listener with stopPropagation
        // so we only need to check for clicks outside the menu.
        if (!sideMenu.contains(e.target)) {
            toggleMenu(false); // Default options will return focus
        }
    });

    // Initial state setup
    toggleMenu(false); // Ensure menu is closed on page load

    // --- 4. Login Modal Functionality ---
    const profileBtn = document.querySelector('.profile-container');
    const loginModalOverlay = document.getElementById('login-modal-overlay');
    const closeModalBtn = document.getElementById('modal-close-btn');
    const emailInput = document.getElementById('email-input');

    if (profileBtn && loginModalOverlay && closeModalBtn && emailInput) {
        // Function to open the modal
        const openModal = () => {
            loginModalOverlay.style.display = 'flex'; // Use style to show
            // Set focus to the email input for accessibility
            setTimeout(() => emailInput.focus(), 100);
        };

        // Function to close the modal
        const closeModal = () => {
            loginModalOverlay.style.display = 'none'; // Use style to hide
            // Return focus to the profile button
            profileBtn.focus();
        };

        // Event listener to open the modal
        profileBtn.addEventListener('click', openModal);
        profileBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal();
            }
        });

        // Event listener to close the modal with the button
        closeModalBtn.addEventListener('click', closeModal);

        // Event listener to close the modal by clicking the overlay
        loginModalOverlay.addEventListener('click', (e) => {
            // e.target is the element that was clicked
            // We only want to close if the dark overlay itself is clicked
            if (e.target === loginModalOverlay) {
                closeModal();
            }
        });

        // Event listener to close the modal with the Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && loginModalOverlay.style.display === 'flex') {
                closeModal();
            }
        });
    }
});