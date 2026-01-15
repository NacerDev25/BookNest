document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById("menu-toggle");
    const sideMenu = document.getElementById("side-menu");
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
     */
    function toggleMenu(show) {
        if (!sideMenu || !menuToggle) return;

        menuToggle.setAttribute('aria-expanded', show);
        sideMenu.setAttribute('aria-hidden', !show);

        if (show) {
            // Optional: Focus the first interactive element in the menu
            const firstFocusableElement = sideMenu.querySelector('a, button');
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
        } else {
            // Return focus to the toggle button when the menu is closed
            menuToggle.focus();
        }
    }

    // --- 3. Accessibility Enhancements ---

    // Close the menu with the 'Escape' key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const isMenuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            if (isMenuOpen) {
                toggleMenu(false);
            }
        }
    });

    // Close the menu when clicking outside of it
    document.addEventListener('click', (e) => {
        const isMenuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        if (isMenuOpen && !sideMenu.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Initial state setup
    toggleMenu(false); // Ensure menu is closed on page load
});