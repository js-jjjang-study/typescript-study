const username = document.getElementById('username') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const password2 = document.getElementById('password2') as HTMLInputElement;
const button = document.querySelector('button');
const reg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

type ErrorType = 'Required' | 'LackOfLength' | 'OverLength' | 'Invalid' | 'Inconsistency';

function makeSuccess(element: HTMLInputElement) {
  element.parentElement!.className = 'form-control success'
}

function makeError(element: HTMLInputElement, type: ErrorType) {
  const sibling = element.nextElementSibling!;
  const parent = element.parentElement!;

  switch(type) {
    case 'Required':
      sibling.innerHTML = `${element.id} is required.`;
      parent.className = 'form-control error';
      break;
    case 'LackOfLength':
      (element.id == 'username')
      ? sibling.innerHTML = `${element.id} must be at least 3 characters`
      : sibling.innerHTML = `${element.id} must be at least 6 characters`;
      parent.className = 'form-control error';
      break;
    case 'OverLength':
      (element.id == 'username')
      ? sibling.innerHTML = `${element.id} must be less than 15 characters`
      : sibling.innerHTML = `${element.id} must be less then 25 characters`;
      parent.className = 'form-control error';
      break;
    case 'Invalid':
      sibling.innerHTML = `${element.id} is not valid`;
      parent.className = 'form-control error';
      break;
    case 'Inconsistency':
      sibling.innerHTML = `Passwords do not match`;
      parent.className = 'form-control error';
      break;
    default:
      throw new Error('Error type is invalid.');
  }
}

function checkRequired() {
  const arr = [username, email, password, password2];

  arr.forEach(el => {
    if(el.value == '') {
      makeError(el, 'Required');
    } else {
      switch (el) {
        case username:
          checkLength(el);
          break;
        case email:
          checkEmail();
          break;
        case password:
          checkLength(el);
          break;
        case password2:
          checkPasswordsMatch();
          break;
        default:
          break;
      }
    }
  })
}

function checkLength(el: HTMLInputElement) {
  const length = el.value.length;
  console.log('checkLength');

  if(el == username) {
    if(length < 3) {
      makeError(username, 'LackOfLength');
      return;
    }
  
    if(length > 15) {
      makeError(username, 'OverLength');
      return;
    }
  }

  if(el == password) {
    if(length < 6) {
      makeError(password, 'LackOfLength');
      return;
    }
  
    if(length > 25) {
      makeError(password, 'OverLength');
      return;
    }
  }

  makeSuccess(username);
  makeSuccess(password);
}

function checkEmail() {
  console.log('checkEmail');

  if(reg.test(email.value) == false) {
    makeError(email, 'Invalid');
  } else {
    makeSuccess(email);
  }
}

function checkPasswordsMatch() {
  console.log('checkPasswordsMatch');

  if(password.value !== password2.value) {
    makeError(password2, 'Inconsistency');
  } else {
    makeSuccess(password2);
  }
}

function handleClick(e: Event) {
  e.preventDefault();

  checkRequired();

}

button?.addEventListener('click', handleClick);