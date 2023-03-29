const selectQuery = (type: string) => document.querySelector(type);

const modalContainer = selectQuery('.modal-container') as HTMLElement;
const openModalButton = selectQuery('.cta-btn') as HTMLButtonElement;
const closeModalButton = selectQuery('.close-btn') as HTMLButtonElement;

const showModalClass: string = 'show-modal';

const showModal = (): void => {
  modalContainer.classList.add(showModalClass);
  modalContainer.style.display = 'flex';
};
const closeModal = (): void => {
  modalContainer.classList.remove(showModalClass);
  modalContainer.style.display = 'none';
};

window.onclick = ({ target }) => {
  if (target === modalContainer) {
    closeModal();
  }
};
openModalButton.onclick = showModal;
closeModalButton.onclick = closeModal;
