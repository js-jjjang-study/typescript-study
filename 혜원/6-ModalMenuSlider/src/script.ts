const body = document.body;
const toggle = document.getElementById('toggle');
const navBar = document.getElementById('navbar');

function showNav() {
  if(body!.className == '') {
    body!.className = 'show-nav';
    return;
  }

  if(body!.className == 'show-nav') {
    body!.className = '';
    return;
  }
}

toggle?.addEventListener('click', showNav);