const body = document.body;
const toggle = document.getElementById('toggle');
const navBar = document.getElementById('navbar');
const modal = document.getElementById('modal');
const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');

const nameField = document.getElementById('name') as HTMLInputElement;
const emailField = document.getElementById('email') as HTMLInputElement;
const pwdField = document.getElementById('password') as HTMLInputElement;
const pwd2Field = document.getElementById('password2') as HTMLInputElement;
const modalForm = document.querySelector('.modal-form');
const submitBtn = document.getElementsByClassName('submit-btn');
const reg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

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

function checkEmail(email: string): boolean {
  return reg.test(email);
}

function checkPwd(pwd: string, pwd2: string): boolean {
  return (pwd == pwd2);
}

function isEmpty(str: string): boolean {
  if(str == '') return true;
  return false;
}

function checkFulfill(e: Event) {
  if(!isEmpty(nameField.value) &&
    !isEmpty(emailField.value) &&
    !isEmpty(pwdField.value) &&
    !isEmpty(pwd2Field.value)) 
  {
    if(checkEmail(emailField.value) && checkPwd(pwdField.value, pwd2Field.value)) return true;
    else e.preventDefault();
  } else {
    e.preventDefault();
  }
}

toggle?.addEventListener('click', handleNavBar);
openBtn?.addEventListener('click', showModal);
closeBtn?.addEventListener('click', hideModal);
modalForm?.addEventListener('submit', (e) => { checkFulfill(e) });