const quizTitles = document.querySelectorAll('.subject-item');
const profileName = document.querySelector('.user-name');
let userName = JSON.parse(localStorage.getItem('userName')) || '';
userName = userName ? userName.replace(/^"|"$/g, '') : '';
userName = userName.split(' ');
profileName.textContent = userName[0];


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

quizTitles.forEach(title => {
    title.addEventListener('click', () => {
        const name = title.querySelector('.subject-name').textContent;
        
        if (name === 'HTML') {
            window.location.href = '../html/quiz.html'
        }
    })
})