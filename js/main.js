// select elements
var nameInput = document.querySelector('#name');
var emailInput = document.querySelector('#email');
var passwordInput = document.querySelector('#password');
var rePasswordInput = document.querySelector('#repassword');
var resetCode = document.querySelector('#reset');
var formSignUP = document.querySelector('#formsignup');
var formSignIn = document.querySelector('#formsignin');
var formForgot = document.querySelector('#formforgot');
var formReset = document.querySelector('#formreset');
var formResetPassword = document.querySelector('#formresetpassword');
var passwordToggle = document.querySelectorAll('.password-toggle');
var invalidAccountMsg = document.querySelector('.invalid-account');
var validNameMsg = document.querySelector('.valid-name');
var validEmailMsg = document.querySelector('.valid-email');
var validPasswordMsg = document.querySelector('.valid-password');
var validRePasswordMsg = document.querySelector('.valid-repassword');
var welcomeMsg = document.querySelector('#welcomemsg');
var logoutBtn = document.querySelector('#logout');
var toast = document.querySelector('.toast');
var userAccounts = [];
// get BaseURl and path without .html (last /)
var BaseURl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);

// get users from localStorage
if (localStorage.getItem('user')) {
    userAccounts = JSON.parse(localStorage.getItem('user'));
}

// check user token if signin before
if (localStorage.getItem('token') && !window.location.href.includes('/home')) {
    window.location.href = `${BaseURl}home.html`;
}

//if user in home page welcome him
if (window.location.href.includes('/home')) {
    if (localStorage.getItem('token')) {
        // decrypt token
        var userToken = JSON.parse(atob(localStorage.getItem('token')));
        welcomeMsg.innerHTML = `Welcome ${userToken.name}`;
    } else {
        // return user to signin page if he didn't have token (he enter home page without signin)
        window.location.href = `${BaseURl}?userAccess`;
    }
}

//if user enter reset && resetpassword pages before enter forgot page first return him
if (window.location.href.includes('/reset') && !sessionStorage.getItem('resetCode')) {
    window.location.href = `${BaseURl}forgot.html`;
}

// if added new user from signUp page or user haven't sign in before go to home page -> show toast
if (window.location.href.includes('?userAccess')) {
    toast.classList.add('show')
}

// if user update his password from reset password page -> show toast
if (window.location.href.includes('?updated')) {
    toast.classList.add('show')
    toast.children[1].innerHTML = 'Password updated successfully! sign in to access the home page';
}

// check valid name if value is true show success message ,else show error message
function validName(name) {
    var regex = /^[a-z]{3,10}$/i;
    if (regex.test(name)) {
        validNameMsg.classList.remove('invalid-tooltip');
        validNameMsg.classList.add('d-block', 'valid-tooltip');
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
        validNameMsg.innerHTML = 'Looks good!';
        return true;
    } else {
        validNameMsg.classList.remove('valid-tooltip');
        validNameMsg.classList.add('d-block', 'invalid-tooltip');
        nameInput.classList.remove('is-valid');
        nameInput.classList.add('is-invalid');
        validNameMsg.innerHTML = 'Enter 3 to 10 letters only';
        return false;
    }
}

// check valid email (gmail only) if value is true show success message ,else show error message
function validEmail(email) {
    /*  It must start with a letter 
        be 4–30 characters long, and can include letters, numbers, dots (.), and dashes (-). 
        It should not end with a dot or dash, and should not have two dots or dashes in a row. 
        gmail only Example: sherefalex34@gmail.com */
    var regex = /^[a-z](?!.*[.-]{2})[a-z0-9.-]{2,28}[a-z0-9]@gmail\.com$/;
    if (regex.test(email)) {
        validEmailMsg.classList.remove('invalid-tooltip');
        validEmailMsg.classList.add('d-block', 'valid-tooltip');
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
        validEmailMsg.innerHTML = 'Looks good!';
        return true;
    } else {
        validEmailMsg.classList.remove('valid-tooltip');
        validEmailMsg.classList.add('d-block', 'invalid-tooltip');
        emailInput.classList.remove('is-valid');
        emailInput.classList.add('is-invalid');
        validEmailMsg.innerHTML = 'Starts with a letter, 4–30 characters, allows letters, numbers, dot (.), and dash (-). No ending with dot/dash, and no double dots or dashes.(gmail only)';
        return false;
    }
}

// check valid password if value is true show success message ,else show error message
function validPassword(password) {
    /*  Password must start with a capital letter,
        be at least 8 characters long,
        and include at least one number.
        Allowed characters: A–Z, a–z, 0–9, @ # $ % ^ & * */
    var regex = /^[A-Z](?=.*\d)[A-Za-z\d@#$%^&*]{7,}$/;
    if (regex.test(password)) {
        validPasswordMsg.classList.remove('invalid-tooltip');
        validPasswordMsg.classList.add('d-block', 'valid-tooltip');
        passwordInput.classList.remove('is-invalid');
        passwordInput.classList.add('is-valid');
        validPasswordMsg.innerHTML = 'Looks good!';
        return true;
    } else {
        validPasswordMsg.classList.remove('valid-tooltip');
        validPasswordMsg.classList.add('d-block', 'invalid-tooltip');
        passwordInput.classList.remove('is-valid');
        passwordInput.classList.add('is-invalid');
        validPasswordMsg.innerHTML = 'Start with a capital letter, and include a small letter (optional), number, and at least 8 characters';
        return false;
    }
}

// to toggle pasword and confirm password
function togglePassowrd() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordToggle[0].classList.replace('fa-eye', 'fa-eye-slash');
        // to toggle the two inputs in the same time
        if (rePasswordInput) {
            rePasswordInput.type = 'text';
            passwordToggle[1].classList.replace('fa-eye', 'fa-eye-slash');
        }
    } else {
        passwordInput.type = 'password';
        passwordToggle[0].classList.replace('fa-eye-slash', 'fa-eye');
        if (rePasswordInput) {
            rePasswordInput.type = 'password';
            passwordToggle[1].classList.replace('fa-eye-slash', 'fa-eye');
        }
    }
}

// check if Passwords match!
function checkPasswordMatch() {
    if (rePasswordInput.value !== passwordInput.value) {
        validRePasswordMsg.classList.remove('valid-tooltip');
        validRePasswordMsg.classList.add('d-block', 'invalid-tooltip');
        validRePasswordMsg.innerHTML = 'Passwords do not match';
        rePasswordInput.classList.remove('is-valid');
        rePasswordInput.classList.add('is-invalid');
    } else {
        validRePasswordMsg.classList.remove('invalid-tooltip');
        validRePasswordMsg.classList.add('d-block', 'valid-tooltip');
        validRePasswordMsg.innerHTML = 'Passwords match!';
        rePasswordInput.classList.remove('is-invalid');
        rePasswordInput.classList.add('is-valid');
    }
}

// add user to localStorage then go to signin page
function addUser() {
    // check valid Inputs
    if (validName(nameInput.value) && validEmail(emailInput.value) && validPassword(passwordInput.value)) {
        // check if user email exist
        if (!getUser(emailInput.value)) {
            invalidAccountMsg.classList.add('d-none');
            user = {
                id: crypto.randomUUID(), //user random id
                name: nameInput.value.toLowerCase(),
                email: emailInput.value,
                password: passwordInput.value
            }
            userAccounts.push(user);
            localStorage.setItem('user', JSON.stringify(userAccounts));
            window.location.href = `${BaseURl}?userAccess`;
        } else {
            invalidAccountMsg.classList.add('d-block');
            invalidAccountMsg.innerHTML = 'this email is already exists'
        }
    }
}

// get user from userAccounts by email
function getUser(email) {
    for (var i = 0; i < userAccounts.length; i++) {
        if (email === userAccounts[i].email) return userAccounts[i];
    }
}

// passwordInput && passwordToggle for signIn && signUp && reset password pages only
if (passwordInput && passwordToggle) {
    passwordInput.addEventListener('input', function (e) {
        validPassword(e.target.value);
    })

    // toggle password icons
    for (let i = 0; i < passwordToggle.length; i++) {
        passwordToggle[i].addEventListener('click', togglePassowrd);
    }
}

// rePasswordInput reset password page only
if (rePasswordInput) {
    // match confirm password with new password
    rePasswordInput.addEventListener('input', checkPasswordMatch);
    passwordInput.addEventListener('input', checkPasswordMatch);
}

// emailInput for signIn && signUp && forget pages only
if (emailInput) {
    emailInput.addEventListener('input', function (e) {
        validEmail(e.target.value);
    })
}

// nameInput && formSignUP for signUp page only
if (nameInput && formSignUP) {
    nameInput.addEventListener('input', function (e) {
        validName(e.target.value);
    })

    formSignUP.addEventListener('submit', function (e) {
        e.preventDefault();
        addUser();
    })
}

// formSignIn for signIn page only
if (formSignIn) {
    // check if user exist then go to home page
    formSignIn.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validEmail(emailInput.value) && validPassword(passwordInput.value)) {
            var user = getUser(emailInput.value);
            if (user && user.email === emailInput.value && user.password === passwordInput.value) {
                // Create token for user
                localStorage.setItem('token', btoa(JSON.stringify({ id: user.id, name: user.name })));
                window.location.href = `${BaseURl}home.html`;
            } else {
                invalidAccountMsg.classList.add('d-block');
                // must (Incorrect email or password) for Security 
                invalidAccountMsg.innerHTML = 'Incorrect email or password'
            }
        }
    })
}

// formForgot for forgot page only
if (formForgot) {
    // check if user exist then go to home page
    formForgot.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validEmail(emailInput.value)) {
            var user = getUser(emailInput.value);
            if (user && user.email === emailInput.value) {
                // Create Verify Reset Code send to user (sessionStorage)
                var resetCode = Math.floor(10000 + Math.random() * 90000).toString();
                sessionStorage.setItem('resetCode', resetCode);
                sessionStorage.setItem('userEmail', user.email);
                window.location.href = `${BaseURl}reset.html`;
            } else {
                invalidAccountMsg.classList.add('d-block');
                invalidAccountMsg.innerHTML = 'Incorrect Email'
            }
        }
    })
}

// formReset for reset page only
if (formReset) {
    // check if Verify Code Correct then go to reset password page
    formReset.addEventListener('submit', function (e) {
        e.preventDefault();
        if (sessionStorage.getItem('resetCode') === resetCode.value) {
            window.location.href = `${BaseURl}resetpassword.html`;
        } else {
            invalidAccountMsg.classList.add('d-block');
            invalidAccountMsg.innerHTML = 'Incorrect Code'
        }
    })
}

// formResetPassword for reset password page only
if (formResetPassword) {
    // check if Passwords match then update password and go to signin page
    formResetPassword.addEventListener('submit', function (e) {
        e.preventDefault();
        if (passwordInput.value === rePasswordInput.value) {
            var userReset = getUser(sessionStorage.getItem('userEmail'));
            sessionStorage.clear();
            userReset.password = passwordInput.value;
            localStorage.setItem('user', JSON.stringify(userAccounts));
            window.location.href = `${BaseURl}?updated`;
        } else {
            invalidAccountMsg.classList.add('d-block');
            invalidAccountMsg.innerHTML = 'Passwords do not match'
        }
    })
}

// logoutBtn for home page only
if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        // remove user token then go to signin page
        localStorage.removeItem('token');
        window.location.href = `${BaseURl}`;
    })
}