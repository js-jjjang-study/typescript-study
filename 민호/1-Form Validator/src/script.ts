const form = document.getElementById('form') as HTMLFormElement;
const username = document.getElementById('username') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const password2 = document.getElementById('password2') as HTMLInputElement;

// true : 정상 input
// false : 비정상 input이므로 에러토글 발생
type status = {
  [key: string]: boolean; //index signature
};

type showErrorFunc = (input: HTMLInputElement, message: string) => void;
type showSuccessFunc = (input: HTMLInputElement) => void;
type checkRequiredFunc = (blankStatus: status, validateStatus: status) => void;
type checkLengthFunc = (
  input: HTMLInputElement,
  min: number,
  max: number,
  validateStatus: status,
) => void;
type checkEmailFunc = (input: HTMLInputElement, validateStatus: status) => void;
type checkPasswordsMatchFunc = (
  input1: HTMLInputElement,
  input2: HTMLInputElement,
  validateStatus: status,
) => void;
type checkValidateFunc = (blankStatus: status, validateStatus: status) => void;
type checkAllFunc = () => boolean;

type inputTypes = 'username' | 'email' | 'password' | 'password2';
type checkTypes = 'blank' | 'validate';

const switchFunc = (
  blankStatus: status,
  validateStatus: status,
  checkType: checkTypes,
) => {
  if (checkType === 'blank') {
    [username, email, password, password2].forEach((i, index) => {
      // 띄워쓰기만 있는 경우도 방지해야 하므로 .length는 적절하지 않음
      if ((i as HTMLInputElement).value.trim() !== '') {
        blankStatus[i.id] = true;
      }
    });

    for (let i in blankStatus) {
      let inputName: inputTypes = i as inputTypes; // ?
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
  }

  if (checkType === 'validate') {
    for (let i in blankStatus) {
      let inputName: inputTypes = i as inputTypes; // ?

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
  }
};

const showError: showErrorFunc = (input: HTMLInputElement, message: string) => {
  const formControl: HTMLFormElement = input.parentElement as HTMLFormElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small') as HTMLElement;
  small.innerText = message;
};

// Show success outline
const showSuccess: showSuccessFunc = (input: HTMLInputElement) => {
  const formControl: HTMLFormElement = input.parentElement as HTMLFormElement;
  formControl.className = 'form-control success';
};

const checkRequired: checkRequiredFunc = (
  blankStatus: status,
  validateStatus: status,
) => {
  switchFunc(blankStatus, validateStatus, 'blank');
};

// Check input length
let checkLength: checkLengthFunc = (
  input: HTMLInputElement,
  min: number,
  max: number,
  validateStatus: status,
) => {
  if (input.value.length < min) {
    showError(input, `${input.id} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${input.id} must be less than ${max} characters`);
  } else {
    validateStatus[input.id] = true;
    showSuccess(input);
  }
};
// Check email is valid
let checkEmail: checkEmailFunc = (
  input: HTMLInputElement,
  validateStatus: status,
) => {
  const regex: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(input.value.trim())) {
    validateStatus[input.id] = true;
    showSuccess(input);
  } else {
    validateStatus[input.id] = false; //
    showError(input, 'Email is not valid');
  }
};

// Check passwords match
let checkPasswordsMatch: checkPasswordsMatchFunc = (
  input1: HTMLInputElement,
  input2: HTMLInputElement,
  validateStatus: status,
) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  } else {
    validateStatus[input2.id] = true;
    showSuccess(input2);
  }
};

const checkValidate: checkValidateFunc = (
  blankStatus: status,
  validateStatus: status,
) => {
  switchFunc(blankStatus, validateStatus, 'validate');
};

const checkAll: checkAllFunc = () => {
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

  checkRequired(blankStatus, validateStatus);
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
