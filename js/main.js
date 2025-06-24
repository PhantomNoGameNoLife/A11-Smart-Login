var nameInput = document.querySelector('#name')
var emailInput = document.querySelector('#email')
var passwordInput = document.querySelector('#password')
var formSignUP = document.querySelector('#formsignup')
var formSignIn = document.querySelector('#formsignin')
var passwordToggle = document.querySelector('.password-toggle')
var invalidAccountMsg = document.querySelector('.invalid-account')
var validNameMsg = document.querySelector('.valid-name')
var validEmailMsg = document.querySelector('.valid-email')
var validPasswordMsg = document.querySelector('.valid-password')
var welcomeMsg = document.querySelector('#welcomemsg')
var logoutBtn = document.querySelector('#logout')
var toast = document.querySelector('.toast')
var userAccounts = [];
// get BaseURl and path without .html
var BaseURl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);

// get users from localStorage
if (localStorage.getItem('user')) {
    userAccounts = JSON.parse(localStorage.getItem('user'));
}

// check user if signin before
if (localStorage.getItem('username') && !window.location.href.includes('/home')) {
    window.location.href = `${BaseURl}home.html`;
}

//if user in home page welcome him
if (window.location.href.includes('/home')) {
    if (localStorage.getItem('username')) {
        welcomeMsg.innerHTML = `Welcome ${localStorage.getItem('username')}`;
    } else {
        window.location.href = `${BaseURl}?userAccess`;
    }
}

// if added new user from signUp page or user haven't sign in before go to home page -> show toast
if (window.location.href.includes('?userAccess')) {
    toast.classList.add('show')
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
        Example: sherefalex34@gmail.com */
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
        validEmailMsg.innerHTML = 'Starts with a letter, 4–30 characters, allows letters, numbers, dot (.), and dash (-). No ending with dot/dash, and no double dots or dashes.';
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

// add user to localStorage then go to signin page
function addUser() {
    // check valid Inputs
    if (validName(nameInput.value) && validEmail(emailInput.value) && validPassword(passwordInput.value)) {
        // check if user email exist
        if (!getUser()) {
            invalidAccountMsg.classList.add('d-none');
            user = {
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

// get user from userAccounts
function getUser() {
    for (var i = 0; i < userAccounts.length; i++) {
        if (emailInput.value === userAccounts[i].email) return userAccounts[i];
    }
}

// emailInput && passwordInput && passwordToggle for signIn && signUp pages only
if (emailInput && passwordInput && passwordToggle) {
    // check emailInput && passwordInput in signUp page only
    if (window.location.href.includes('/signup')) {
        emailInput.addEventListener('input', function (e) {
            validEmail(e.target.value);
        })

        passwordInput.addEventListener('input', function (e) {
            validPassword(e.target.value);
        })
    }

    passwordToggle.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            passwordToggle.classList.replace('fa-eye-slash', 'fa-eye');
        }
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
        var user = getUser();
        if (user && user.email === emailInput.value && user.password === passwordInput.value) {
            localStorage.setItem('username', user.name);
            window.location.href = `${BaseURl}home.html`;
        } else {
            invalidAccountMsg.classList.add('d-block');
            // must (Incorrect email or password) for Security 
            invalidAccountMsg.innerHTML = 'Incorrect email or password'
        }
    })
}

// logoutBtn for home page only
if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('username');
        window.location.href = `${BaseURl}`;
    })
}