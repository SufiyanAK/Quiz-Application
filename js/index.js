import { UserData } from "./quiz-data/userProfile.js";

let container = document.getElementById('container');
const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');
const incorrectUserName = document.querySelector('.error-user');
const incorrectPassword = document.querySelector('.error-404');
const emptyUsername = document.querySelector('.error-set-userName');
const emptyEmail = document.querySelector('.error-email');
const emptyPassword = document.querySelector('.error-set-password');
const incorrectConfirmPassword = document.querySelector('.error');
const pointer = document.querySelectorAll('.pointer');
const showPassword = document.querySelectorAll('.ShowNHide');

const fields = {
    userName: document.getElementById('userName'),
    password: document.getElementById('password'),
    setUserName: document.getElementById('setUserName'),
    email: document.getElementById('email'),
    setPassword: document.getElementById('setPassword'),
    confirmPassword: document.getElementById('confirmPassword'),
    enter: document.querySelectorAll('.onEnter')
};

const { setUserName, email, setPassword, confirmPassword, userName, password, enter } = fields;


// EVENTLISTNERS FOR SIGNIN, SIGNUP AND TOGGLE FOR BOTH SIGNIN AND SIGNUP
signUpBtn.addEventListener('click', () => {
    signUp(setUserName.value, email.value, setPassword.value, confirmPassword.value);
})

signInBtn.addEventListener('click', () => {
    signIn(userName.value, password.value);
});

pointer.forEach(point => {
    point.addEventListener('click', view)
})

// ON ENTER EVENT
enter.forEach(e => {
    e.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            signIn(userName.value, password.value);
        }
    });
});

password.addEventListener('input', () => {
    if (password.value.trim() === '') {
        showPassword[1].style.display = 'none';
    } else {
        showPassword[1].style.display = 'block';
    }
});

confirmPassword.addEventListener('input', () => {
    if (confirmPassword.value.trim() === '') {
        showPassword[0].style.display = 'none';
    } else {
        showPassword[0].style.display = 'block';
    }
});

// SHOW PASSWORD EVENT
showPassword.forEach(elem => {
    elem.addEventListener('click', () => {
        displayPassword(elem, elem.dataset.target);
    });
});

function displayPassword(elem, targetId) {
    const type = document.getElementById(targetId);

    if (elem.src.includes('show.svg')) {
        type.type = 'text';
        elem.src = 'Assets/icons/hide.svg';
    } else {
        type.type = 'password';
        elem.src = 'Assets/icons/show.svg';
    }
}

// SIGNIN FUNCTION
function signIn (userName, password) {
    incorrectUserName.textContent = '';
    incorrectPassword.textContent = '';

    // SHOW ERROR WHEN FIELD IS EMPTY
    if (!userName || !password) {
        incorrectUserName.textContent = !userName ? 'Please Fill UserName' : '';
        incorrectPassword.textContent = !password ? 'Please Input Password' : '';
        return;
    }

    for (const profile of UserData) {
        if (userName === profile.name && password === profile.password) {
            // localStorage.setItem('userName', userName);
            saveToStorage('userName', JSON.stringify(userName));
            // Successful sign-in
            window.location.href = '../html/home.html';
            return;
        }
    }

    // Display error for incorrect username or password
    incorrectUserName.textContent = 'Incorrect username';
    incorrectPassword.textContent = 'Incorrect password';
}

// SIGNUP FUNCTION
function signUp (name, email, password, confirmPassword) {
    incorrectConfirmPassword.textContent = '';
    emptyUsername.textContent = '';
    emptyEmail.textContent = '';
    emptyPassword.textContent = '';

    if (!name || !email || !password || !confirmPassword) {
        emptyUsername.textContent = !name ? 'Please Set UserName' : '';
        emptyEmail.textContent = !email ? 'Please Set Email' : '';
        emptyPassword.textContent = !password ? 'Please Set Password' : '';
        incorrectConfirmPassword.textContent = !confirmPassword ? 'Please Password To Confirm' : '';
        return;
    }

    if (confirmPassword !== password) {
        incorrectConfirmPassword.style.display = 'block';
        incorrectConfirmPassword.textContent = "Password Is Incorrect";
        return;
    }

    UserData.push({
            name,
            email,
            password,
            confirmPassword
        });

    saveToStorage('userData', UserData);

    // localStorage.setItem('UserData', JSON.stringify(UserData));

    view();

    console.log(UserData);
}

function saveToStorage (elemName, value) {
    localStorage.setItem(elemName, JSON.stringify(value))
}

function view ()  {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)