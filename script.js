const navbarNav = document.querySelector('.navbar-nav');

document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// active search
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
    e.preventDefault(); // Prevent default action to avoid unintended behaviors
    searchForm.classList.toggle('active');
};

// hamburger menu
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if (
        !searchForm.contains(e.target) &&
        !document.querySelector('#search-button').contains(e.target)
    ) {
        searchForm.classList.remove('active');
    }
});
