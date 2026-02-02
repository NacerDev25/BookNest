
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded. Setting a timeout to focus.");
    
    setTimeout(function() {
        var communityHeading = document.getElementById('community-heading');
        
        if (communityHeading) {
            console.log("Timeout finished. Found community heading element:", communityHeading);
            communityHeading.focus();
            console.log("Focus method called. Active element is:", document.activeElement);
        } else {
            console.log("Timeout finished. Could not find community heading element.");
        }
    }, 100); // 100ms delay
});