var form = document.getElementById('form');
var username = document.getElementById('username');
var email = document.getElementById('email');
var password = document.getElementById('password');
var password2 = document.getElementById('password2');
function showError(input, message) {
    var formControl = input.parentElement;
    formControl.className = 'form-control error';
    var small = formControl.querySelector('small');
    small.innerText = message;
}
// Show success outline
function showSuccess(input) {
    var formControl = input.parentElement;
    formControl.className = 'form-control success';
}
var checkRequired = function (inputs, blankStatus) {
    inputs.forEach(function (i, index) {
        // 띄워쓰기만 있는 경우도 방지해야 하므로 .length는 적절하지 않음
        if (i.value.trim() !== '') {
            blankStatus[i.id] = true;
        }
    });
};
var showBlankError = function (blankStatus) {
    for (var i in blankStatus) {
        var inputName = i;
        var errorTarget = void 0;
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
            showError(errorTarget, '공백입니다');
            continue;
        }
    }
};
// Check input length
function checkLength(input, min, max, validateStatus) {
    if (input.value.length < min) {
        showError(input, "".concat(input.id, " must be at least ").concat(min, " characters"));
    }
    else if (input.value.length > max) {
        showError(input, "".concat(input.id, " must be less than ").concat(max, " characters"));
    }
    else {
        validateStatus[input.id] = true;
        showSuccess(input);
    }
}
// Check email is valid
function checkEmail(input, validateStatus) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(input.value.trim())) {
        validateStatus[input.id] = true;
        showSuccess(input);
    }
    else {
        validateStatus[input.id] = true;
        showError(input, 'Email is not valid');
    }
}
// Check passwords match
function checkPasswordsMatch(input1, input2, validateStatus) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
    else {
        validateStatus[input2.id] = true;
        showSuccess(input2);
    }
}
var checkValidate = function (blankStatus, validateStatus) {
    for (var i in blankStatus) {
        var inputName = i;
        if (blankStatus[inputName] === false)
            continue;
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
var checkAll = function () {
    var blankStatus = {
        username: false,
        email: false,
        password: false,
        password2: false
    };
    // blankStatus가 true인 값에 한해서만 진행하며
    // 최종적으로 이게 true면 완료인 것이다
    var validateStatus = {
        username: false,
        email: false,
        password: false,
        password2: false
    };
    checkRequired([username, email, password, password2], blankStatus);
    showBlankError(blankStatus);
    // balnkError와는 달리 유효성 검사와 에러 or 성공 이벤트를 동시에 진행합니다
    checkValidate(blankStatus, validateStatus);
    var resultFlag = true;
    for (var i in validateStatus) {
        if (!validateStatus[i]) {
            resultFlag = false;
            break;
        }
    }
    return resultFlag;
};
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (checkAll()) {
        alert('제출이 완료되었습니다!');
    }
});
