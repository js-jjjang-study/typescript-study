/*
Create and style landing page
Style side nav and modal
Add functionality to make menu open/close on button click
Add functionality to make modal open/close on button click
*/
{
  const navbar = document.getElementById("navbar") as HTMLElement;
  const toggleBtn = document.getElementById("toggle") as HTMLButtonElement;
  const modal = document.getElementById("modal") as HTMLButtonElement;
  const openBtn = document.getElementById("open") as HTMLButtonElement;
  const closeBtn = document.getElementById("close") as HTMLButtonElement;
  const BODY = document.body;

  // Navbar
  const closeNavBar = (e: MouseEvent): void => {
    const isNavbar = navbar.contains(e.target as Node);
    const isToggle = toggleBtn.contains(e.target as Node);
    if (BODY.classList.contains("show-nav") && !isNavbar && !isToggle) {
      toggleBtn.click();
    }
  };

  toggleBtn.addEventListener("click", () => {
    BODY.classList.toggle("show-nav");
    if (BODY.classList.contains("show-nav")) {
      BODY.addEventListener("click", closeNavBar);
    } else {
      BODY.removeEventListener("click", closeNavBar);
    }
  });

  // Modal
  const showModal = (): void => modal.classList.add("show-modal");
  const hideModal = (): void => modal.classList.remove("show-modal");

  openBtn.addEventListener("click", showModal);
  closeBtn.addEventListener("click", hideModal);
  window.addEventListener("click", (e) =>
    e.target === modal ? hideModal() : false
  );
}
