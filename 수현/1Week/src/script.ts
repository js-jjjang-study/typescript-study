const form = <HTMLInputElement>document.getElementById("form");
const username = <HTMLInputElement>document.getElementById("username");
const email = <HTMLInputElement>document.getElementById("email");
const password = <HTMLInputElement>document.getElementById("password");
const password2 = <HTMLInputElement>document.getElementById("password2");

/**
 * checkRequired() to accept array of inputs
 * 전체 inputs 유효성 검사
 * @returns {boolean} isAllow?
 */

function checkRequired() {
  let check = true;
  if (!checkLength(username, password)) check = false;
  if (!checkEmail(email.value)) check = false;
  if (!checkPasswordsMatch(password.value, password2.value)) check = false;

  return check;
}

/**
 * checkLength() to check min and max length
 * username (min: 4, max:10)
 * email *except domain (min: 4, max: 64)
 * password (min: 10, max: 20)
 * @param {HTMLInputElement} username
 * @param {HTMLInputElement} password
 * @returns {boolean}
 */

function checkLength(name: HTMLInputElement, pwd: HTMLInputElement) {
  let check = true;
  if (name.value.length < 4 || name.value.length > 10) {
    toggleError(name);
    check = false;
  } else toggleSuccess(name);
  if (pwd.value.length < 10 || pwd.value.length > 20) {
    toggleError(pwd);
    check = false;
  } else toggleSuccess(pwd);
  return check;
}

/**
 * checkEmail() to validate email with regex
 * @param {string} email.value
 * @returns {boolean} isAllow?
 */

function checkEmail(inputEmail: string) {
  let check = true;
  if (!inputEmail.includes("@")) check = false;
  const regex = /^[A-Za-z0-9+]{4,64}$/;
  const [id, domain] = inputEmail.split("@");
  if (!regex.test(id!)) check = false;
  if (
    domain === undefined ||
    domain!.length <= 4 ||
    domain!.slice(domain!?.length - 4) !== ".com"
  )
    check = false;
  if (check) toggleSuccess(email);
  else toggleError(email);
  return check;
}

/**
 * checkPasswordsMatch() to match confirm password
 * @param {string} password.value
 * @param {string} password2.value
 * @returns {boolean} isAllow?
 */

function checkPasswordsMatch(setPwd: string, confirmPwd: string) {
  if (setPwd !== confirmPwd) {
    toggleError(password2);
    return false;
  } else {
    toggleSuccess(password2);
  }
  return true;
}

/**
 * Show error messages under specific inputs
 * @param {HTMLInputElement} target with error
 * @returns {void}
 */

function toggleError(target: HTMLInputElement) {
  target.parentElement!.className = "form-control error";
  const errorText = target.parentElement?.querySelector("small");

  switch (target.id) {
    case "username":
      errorText!.innerText = "유효한 이름을 작성해주세요.";
      return;
    case "email":
      errorText!.innerText = "유효한 이메일을 작성해주세요.";
      return;
    case "password":
      errorText!.innerText = "유효한 비밀번호를 작성해주세요.";
      return;
    case "password2":
      errorText!.innerText = "작성하신 비밀번호와 일치하지 않습니다.";
      return;
  }
}

/**
 * success or delete error messages under specific inputs
 * @param {HTMLInputElement} allowed target
 * @returns {void}
 */

function toggleSuccess(target: HTMLInputElement) {
  target.parentElement!.className = "form-control";
}

form?.addEventListener("submit", function (e) {
  e.preventDefault();
  if (checkRequired()) {
    alert("제출되었습니다.");
  }
});
