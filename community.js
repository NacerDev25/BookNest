document.addEventListener('DOMContentLoaded', function() {
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    const communityHeading = document.getElementById('community-heading');

    // Focus on the community heading when the page loads
    if (communityHeading) {
        communityHeading.setAttribute('tabindex', '-1'); // Ensure it's focusable
        communityHeading.focus();
    }

    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            window.location.href = 'index.html?focus=community-btn';
        });
    }
});