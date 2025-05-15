document.addEventListener('DOMContentLoaded', () => {
    // የአሁኑን ዓመት በግርጌ ላይ ማስቀመጥ
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // የሞባይል ምናሌ ቁልፍ ተግባር
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navbarNav = document.querySelector('.navbar-nav');

    if (mobileMenuButton && navbarNav) {
        mobileMenuButton.addEventListener('click', () => {
            navbarNav.classList.toggle('open'); // 'open' የሚባል CSS class በመጨመር ወይም በመቀነስ ምናሌውን ይቆጣጠራል
        });
    }

    // የመውጫ ቁልፍ ተግባር (በምሳሌነት)
    const logoutButtons = document.querySelectorAll('#logout');

    logoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Logout clicked (Replace with real logout functionality!)');
            window.location.href = 'index.html';
        });
    });

    // የትኛው የናቭ ባር ንጥል እንደነቃ ምልክት ማድረግ
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath || (currentPath === 'index.html' && linkPath === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});