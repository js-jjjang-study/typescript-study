"use strict";
{
    const navbar = document.getElementById('navbar');
    const toggleBtn = document.getElementById('toggle');
    const modal = document.getElementById('modal');
    const openBtn = document.getElementById('open');
    const closeBtn = document.getElementById('close');
    // Navbar
    const closeNavBar = (e) => {
        const existenceNavbar = navbar.contains(e.target);
        if (document.body.classList.contains('show-nav') && !existenceNavbar) {
            toggleBtn.click();
        }
    };
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('show-nav');
        if (document.body.classList.contains('show-nav')) {
            document.body.addEventListener('click', closeNavBar);
        }
        else {
            document.body.removeEventListener('click', closeNavBar);
        }
    });
    // Modal
    const openModal = () => modal.classList.add('show-modal');
    const closeModal = () => modal.classList.remove('show-modal');
    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => e.target === modal && closeModal());
}
