// import { userProfile, logout, result } from "./home.js";

// SELECTORS
const quizTitles = document.querySelectorAll('.subject-item');
const profileName = document.querySelector('.user-name');
const aboutUser = document.querySelector('.about-user');
const userProfile = document.querySelector('.user-profile');
const logout = document.querySelector('.logout');
const result = document.querySelector('.result');
let userName = JSON.parse(localStorage.getItem('userName')) || '';

userName = userName ? userName.replace(/^"|"$/g, '') : '';
userName = userName.split(' ');
profileName.textContent = userName[0];

quizTitles.forEach(title => {
    title.addEventListener('click', () => {
        const name = title.querySelector('.subject-name').textContent;
        
        if (name === 'HTML') {
            window.location.href = '../html/quiz.html';
        } else {
            alert(`${name} is under development process`);
        }
    });
});

userProfile.addEventListener('click', () => {
    console.log('is clicked')
    show();
});

logout.addEventListener('click', () => {
    window.location.href = '../index.html';
});

result.addEventListener('click', () => {
    alert('section is under devolopment');
});

function show () {
	aboutUser.classList.toggle('show')
    aboutUser.classList.toggle('hide')
}


// quizTitles.forEach(title => {
//     title.addEventListener('click', () => {
//         const icon = title.querySelector('.icon');

//         if (icon.src.includes('arrow-down.svg')) {
//             icon.src = '../Assets/icons/arrow-right.svg';
//             return
//         }
//         icon.src = '../Assets/icons/arrow-down.svg';

//         quizTitles.forEach(otherTitle => {
//             const otherIcon = otherTitle.querySelector('.icon');

//             if (otherTitle !== title) {
//                 otherIcon.src = '../Assets/icons/arrow-right.svg';
//             }
//         });
//     });
// });