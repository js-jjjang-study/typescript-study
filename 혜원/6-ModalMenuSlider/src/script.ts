const body = document.body;
const toggle = document.getElementById('toggle');
const navBar = document.getElementById('navbar');
const modal = document.getElementById('modal');
const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');

function handleNavBar() {
  if(body!.className == '') {
    body!.className = 'show-nav';
    return;
  }

  if(body!.className == 'show-nav') {
    body!.className = '';
    return;
  }
}

function showModal() {
  modal!.style.display = 'block';
  return;
}

function hideModal() {
  modal!.style.display ='none';
  return;
}

toggle?.addEventListener('click', handleNavBar);
openBtn?.addEventListener('click', showModal);
closeBtn?.addEventListener('click', hideModal);