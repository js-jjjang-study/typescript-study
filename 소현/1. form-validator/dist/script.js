"use strict";
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const form = document.getElementById("form");
const form_list = document.getElementsByClassName("form-control");
const error_list = document.getElementsByTagName("small");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkRequired();
});
// to accept array of inputs
function checkRequired() {
    checkLength("username");
    checkEmail();
    checkLength("password");
    checkPasswordsMatch();
}
// to check min and max length
function checkLength(type) {
    if (type === "username") {
        if (username.value.length < 3) {
            form_list[0].className = "form-control error";
            error_list[0].innerHTML = "Username must be at least 3 characters";
        }
        else if (username.value.length > 15) {
            form_list[0].className = "form-control error";
            error_list[0].innerHTML = "Username must be less than 15 characters";
        }
        else {
            form_list[0].className = "form-control success";
        }
    }
    else {
        if (password.value.length < 6) {
            form_list[2].className = "form-control error";
            error_list[2].innerHTML = "Password must be at least 6 characters";
        }
        else if (password.value.length > 25) {
            form_list[2].className = "form-control error";
            error_list[2].innerHTML = "Password must be less than 25 characters";
        }
        else {
            form_list[2].className = "form-control success";
        }
    }
}
// to validate email with regex
function checkEmail() {
    let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (email.value.match(regExp) != null) {
        form_list[1].className = "form-control success";
    }
    else {
        form_list[1].className = "form-control error";
        error_list[1].innerHTML = "Email is not valid";
    }
}
// to match confirm password
function checkPasswordsMatch() {
    if (password.value !== password2.value) {
        form_list[3].className = "form-control error";
        error_list[3].innerHTML = "Passwords do not match";
    }
    else if (password2.value.length === 0) {
        form_list[3].className = "form-control error";
        error_list[3].innerHTML = "Password2 is required";
    }
    else {
        form_list[3].className = "form-control success";
    }
}
