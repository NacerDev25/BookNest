document.addEventListener('DOMContentLoaded', function() {
    const mainPage = document.getElementById('main-page');
    const communityPage = document.getElementById('community-page');
    
    const communityBtn = document.getElementById('community-btn');
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    
    const communityHeading = document.getElementById('community-heading');

    // --- Side Menu Functionality ---
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const menuBackdrop = document.getElementById('menu-backdrop');
    const bottomNav = document.querySelector('.bottom-nav');
    const announcer = document.getElementById('aria-live-announcer');

    // 1. Clone navigation links into the side menu for mobile view
    if (bottomNav && sideMenu) {
        const navList = bottomNav.querySelector('.nav-list');
        if (navList) {
            const clonedNavList = navList.cloneNode(true);
            sideMenu.appendChild(clonedNavList);
        }
    }

    // Function to close the menu
    const closeMenu = () => {
        if (!menuToggle || !document.body.classList.contains('menu-open')) return;
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        if (announcer) announcer.textContent = 'Menu closed';
        menuToggle.focus(); // Return focus to the menu button
    };

    // 2. Handle menu toggle button click
    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeMenu();
            } else {
                menuToggle.setAttribute('aria-expanded', 'true');
                document.body.classList.add('menu-open');
                if (announcer) announcer.textContent = 'Menu opened';
                const firstLink = sideMenu.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        });
    }

    // 3. Close menu when clicking the backdrop
    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', closeMenu);
    }

    // 4. Close menu when the 'Escape' key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
            closeMenu();
        }
    });
    
    // --- Community Page Functionality (Reverted to show/hide) ---
    if (communityBtn) {
        communityBtn.addEventListener('click', () => {
            // Hide main page and show community page
            if (mainPage) mainPage.style.display = 'none';
            if (communityPage) communityPage.style.display = 'block';

            // Set focus to the community heading
            if (communityHeading) {
                communityHeading.focus();
            }
        });
    }

    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            // Hide community page and show main page
            if (communityPage) communityPage.style.display = 'none';
            if (mainPage) mainPage.style.display = 'block';

            // Optional: Set focus back to the community button for better navigation
            if (communityBtn) {
                communityBtn.focus();
            }
        });
    }
});