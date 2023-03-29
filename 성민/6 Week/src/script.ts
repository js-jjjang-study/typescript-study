const selectQuery = (type: string) => document.querySelector(type);

const modalContainer = selectQuery('.modal-container') as HTMLElement;
const openModalButton = selectQuery('.cta-btn') as HTMLButtonElement;
const closeModalButton = selectQuery('.close-btn') as HTMLButtonElement;

const bodyElement = document.body;
const navToggleButton = selectQuery('.toggle') as HTMLButtonElement;

const showModalClass: string = 'show-modal';
const showNavClass: string = 'show-nav';

const showModal = (): void => modalContainer.classList.add(showModalClass);
const closeModal = (): void => modalContainer.classList.remove(showModalClass);
const showNav = (): boolean => bodyElement.classList.toggle(showNavClass);

window.onclick = ({ target }) => {
  if (target === modalContainer) {
    closeModal();
  }
};
openModalButton.onclick = showModal;
closeModalButton.onclick = closeModal;
navToggleButton.onclick = showNav;
