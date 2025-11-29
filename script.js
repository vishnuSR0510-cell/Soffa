// Hamburger menu toggle for mobile navigation
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');

    navToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        navToggle.classList.toggle('open');
    });
});

function exploreNoorts() {
    alert('Explore Noorts new collection!');
}

function exploreHighEnd() {
    alert('Explore High-End sofas!');
}
