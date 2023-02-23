const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const blankStatus = {
  username: false,
  email: false,
  password: false,
  password2: false,
};

const validateStatus = {
  username: false,
  email: false,
  password: false,
  password2: false,
};

// Show input error message
function showError(input, message) {
  switch (input) {
    case 'username':
      input = username;
      break;
    case 'email':
      input = email;
      break;
    case 'password':
      input = password;
      break;
    case 'password2':
      input = password2;
      break;
  }

  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  switch (input) {
    case 'username':
      input = username;
      break;
    case 'email':
      input = email;
      break;
    case 'password':
      input = password;
      break;
    case 'password2':
      input = password2;
      break;
  }
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

const checkRequired = (inputs) => {
  inputs.forEach((i, index) => {
    if (i.value.length !== 0) {
      blankStatus[i.id] = true;
    }
  });
};

const showBlankError = () => {
  for (let i in blankStatus) {
    let inputName = i;
    if (blankStatus[inputName] === false) {
      showError(inputName, '공백입니다');
      continue;
    }
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  showBlankError();
});
