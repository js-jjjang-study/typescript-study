const form = document.getElementById('form') as HTMLElement;
const username = document.getElementById('username') as HTMLElement;
const email = document.getElementById('email') as HTMLElement;
const password = document.getElementById('password') as HTMLElement;
const password2 = document.getElementById('password2') as HTMLElement;

type status = {
  username: boolean;
  email: boolean;
  password: boolean;
  password2: boolean;
};

function showError(input: HTMLInputElement, message: string) {
  const formControl: HTMLFormElement = input.parentElement as HTMLFormElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small') as HTMLElement;
  small.innerText = message;
}

// Show success outline
function showSuccess(input: HTMLInputElement) {
  const formControl: HTMLFormElement = input.parentElement as HTMLFormElement;
  formControl.className = 'form-control success';
}

const checkRequired = (inputs: HTMLElement[], blankStatus: status) => {
  inputs.forEach((i, index) => {
    // 띄워쓰기만 있는 경우도 방지해야 하므로 .length는 적절하지 않음
    if ((i as HTMLInputElement).value.trim() !== '') {
      blankStatus[i.id] = true;
    }
  });
};

const showBlankError = (blankStatus: status) => {
  for (let i in blankStatus) {
    let inputName: string = i;
    let errorTarget: HTMLElement | undefined;
    if (blankStatus[inputName] === false) {
      switch (inputName) {
        case 'username':
          errorTarget = username;
          break;
        case 'email':
          errorTarget = email;
          break;
        case 'password':
          errorTarget = password;
          break;
        case 'password2':
          errorTarget = password2;
          break;
      }
      showError(errorTarget as HTMLInputElement, '공백입니다');
      continue;
    }
  }
};

// Check input length
function checkLength(
  input: HTMLInputElement,
  min: number,
  max: number,
  validateStatus: status,
) {
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
function checkEmail(input: HTMLInputElement, validateStatus: status) {
  const regex: RegExp =
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
function checkPasswordsMatch(
  input1: HTMLInputElement,
  input2: HTMLInputElement,
  validateStatus: status,
) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  } else {
    validateStatus[input2.id] = true;
    showSuccess(input2);
  }
}

const checkValidate = (blankStatus: status, validateStatus: status) => {
  for (let i in blankStatus) {
    let inputName: string = i;
    if (blankStatus[inputName] === false) continue;

    switch (inputName) {
      case 'username':
        checkLength(username as HTMLInputElement, 3, 15, validateStatus);
        break;
      case 'email':
        checkEmail(email as HTMLInputElement, validateStatus);
        break;
      case 'password':
        checkLength(password as HTMLInputElement, 6, 25, validateStatus);
        break;
      case 'password2':
        checkPasswordsMatch(
          password as HTMLInputElement,
          password2 as HTMLInputElement,
          validateStatus,
        );
        break;
    }
  }
};

const checkAll = () => {
  const blankStatus: status = {
    username: false,
    email: false,
    password: false,
    password2: false,
  };

  // blankStatus가 true인 값에 한해서만 진행하며
  // 최종적으로 이게 true면 완료인 것이다
  const validateStatus: status = {
    username: false,
    email: false,
    password: false,
    password2: false,
  };

  checkRequired([username, email, password, password2], blankStatus);
  showBlankError(blankStatus);

  // balnkError와는 달리 유효성 검사와 에러 or 성공 이벤트를 동시에 진행합니다
  checkValidate(blankStatus, validateStatus);

  let resultFlag: boolean = true;
  for (let i in validateStatus) {
    if (!validateStatus[i]) {
      resultFlag = false;
      break;
    }
  }

  return resultFlag;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (checkAll()) {
    alert('제출이 완료되었습니다!');
  }
});
