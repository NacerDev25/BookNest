document.addEventListener('DOMContentLoaded', function() {
    const mainPage = document.getElementById('main-page');
    const communityPage = document.getElementById('community-page');
    
    const communityBtn = document.getElementById('community-btn');
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    
    const communityHeading = document.getElementById('community-heading');

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