{
    const navbar = document.getElementById('navbar') as HTMLElement;
    const toggleBtn = document.getElementById('toggle') as HTMLButtonElement;
    const modal = document.getElementById('modal') as HTMLButtonElement;
    const openBtn = document.getElementById('open') as HTMLButtonElement;
    const closeBtn = document.getElementById('close') as HTMLButtonElement;

    // Navbar
    const closeNavBar = (e: MouseEvent): void => {
        const existenceNavbar = navbar.contains(e.target as HTMLElement);

        if (document.body.classList.contains('show-nav') && !existenceNavbar) {
            toggleBtn.click();
        }
    };

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('show-nav');
        if (document.body.classList.contains('show-nav')) {
            document.body.addEventListener('click', closeNavBar);
        } else {
            document.body.removeEventListener('click', closeNavBar);
        }
    });

    // Modal
    const openModal = (): void => modal.classList.add('show-modal');
    const closeModal = (): void => modal.classList.remove('show-modal');

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) =>
        e.target === modal ? closeModal() : false
    );
}
