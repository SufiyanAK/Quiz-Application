const UserData = JSON.parse(localStorage.getItem('data')) || [];

let container = document.getElementById('container');
const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');
const incorrectUserName = document.querySelector('.error-user');
const incorrectPassword = document.querySelector('.error-404');
const emptyUsername = document.querySelector('.error-set-userName');
const emptyEmail = document.querySelector('.error-email');
const emptyPassword = document.querySelector('.error-set-password');
const incorrectConfirmPassword = document.querySelector('.error');

const fields = {
    userName: document.getElementById('userName'),
    password: document.getElementById('password'),
    setUserName: document.getElementById('setUserName'),
    email: document.getElementById('email'),
    setPassword: document.getElementById('setPassword'),
    confirmPassword: document.getElementById('confirmPassword')
};

const { setUserName, email, setPassword, confirmPassword, userName, password } = fields;

function signIn (userName, password) {
    incorrectUserName.textContent = '';
    incorrectPassword.textContent = '';

    if (!userName || !password) {
        incorrectUserName.textContent = !userName ? 'Please Fill UserName' : '';
        incorrectPassword.textContent = !password ? 'Please Input Password' : '';
        // incorrectUserName.style.display = !userName.value ? 'block' : 'none';
        // incorrectPassword.style.display = !password.value ? 'block' : 'none';
        return;
    }

    for (const profile of UserData) {
        if (userName === profile.name && password === profile.password) {
            // Successful sign-in
            window.location.href = '../index.html';
            return;
        }
    }

    // Display error for incorrect username or password
    incorrectUserName.textContent = 'Incorrect username';
    incorrectPassword.textContent = 'Incorrect password';
    // incorrectUserName.style.display = 'block';
    // incorrectPassword.style.display = 'block';
    

}

function signUp (name, email, password, confirmPassword,) {

    incorrectConfirmPassword.textContent = '';
    emptyUsername.textContent = '';
    emptyEmail.textContent = '';
    emptyPassword.textContent = '';


    if (!name || !email || !password || !confirmPassword) {
        emptyUsername.textContent = !name ? 'Please Set UserName' : '';
        emptyEmail.textContent = !email ? 'Please Set Email' : '';
        emptyPassword.textContent = !password ? 'Please Set Password' : '';
        incorrectConfirmPassword.textContent = !confirmPassword ? 'Please Password To Confirm' : '';
        // emptyUsername.style.display = !name ? 'block' : 'none';
        // emptyEmail.style.display = !email ? 'block' : 'none';
        // emptyPassword.style.display = !password ? 'block' : 'none';
        // incorrectConfirmPassword.style.display = !confirmPassword ? 'block' : 'none';
        return;
    }

    if (confirmPassword !== password) {
        incorrectConfirmPassword.style.display = 'block';
        incorrectConfirmPassword.textContent = "Password Is Incorrect";
        return;
    }

    UserData.push(
        {
            name,
            email,
            password,
            confirmPassword
        }
    );

    localStorage.setItem('data', JSON.stringify(UserData));

    console.log(UserData);
}


toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)