const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check input length
function checkLength(input, min, max, validateStatus) {
  if (input.value.length < min) {
    showError(input, `${input.id} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${input.id} must be less than ${max} characters`);
  } else {
    validateStatus[input.id] = true;
    showSuccess(input);
  }
}

// Check email is valid
function checkEmail(input, validateStatus) {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(input.value.trim())) {
    validateStatus[input.id] = true;
    showSuccess(input);
  } else {
    validateStatus[input.id] = true;
    showError(input, 'Email is not valid');
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2, validateStatus) {
  console.log(input1.value, input2.value);
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  } else {
    validateStatus[input2.id] = true;
    showSuccess(input2);
  }
}

const checkRequired = (inputs, blankStatus) => {
  inputs.forEach((i, index) => {
    // 띄워쓰기만 있는 경우도 방지해야 하므로 .length는 적절하지 않음
    if (i.value.trim() !== '') {
      blankStatus[i.id] = true;
    }
  });
};

const showBlankError = (blankStatus) => {
  for (let i in blankStatus) {
    let inputName = i;
    if (blankStatus[inputName] === false) {
      switch (inputName) {
        case 'username':
          inputName = username;
          break;
        case 'email':
          inputName = email;
          break;
        case 'password':
          inputName = password;
          break;
        case 'password2':
          inputName = password2;
          break;
      }
      showError(inputName, '공백입니다');
      continue;
    }
  }
};

const checkValidate = (blankStatus, validateStatus) => {
  for (let i in blankStatus) {
    let inputName = i;
    if (blankStatus[inputName] === false) continue;

    switch (inputName) {
      case 'username':
        checkLength(username, 3, 15, validateStatus);
        break;
      case 'email':
        checkEmail(email, validateStatus);
        break;
      case 'password':
        checkLength(password, 6, 25, validateStatus);
        break;
      case 'password2':
        checkPasswordsMatch(password, password2, validateStatus);
        break;
    }
  }
};

const checkAll = () => {
  const blankStatus = {
    username: false,
    email: false,
    password: false,
    password2: false,
  };

  // blankStatus가 true인 값에 한해서만 진행하며
  // 최종적으로 이게 true면 완료인 것이다
  const validateStatus = {
    username: false,
    email: false,
    password: false,
    password2: false,
  };

  checkRequired([username, email, password, password2], blankStatus);
  showBlankError(blankStatus);

  // balnkError와는 달리 유효성 검사와 에러 or 성공 이벤트를 동시에 진행합니다
  checkValidate(blankStatus, validateStatus);

  let resultFalg = true;
  for (let i in validateStatus) {
    if (!validateStatus[i]) {
      resultFalg = false;
      break;
    }
  }

  return resultFalg;
};
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (checkAll()) {
    alert('제출이 완료되었습니다!');
  }
});
