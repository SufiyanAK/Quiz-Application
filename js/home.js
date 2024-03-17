import { UserData } from "./quiz-data/userProfile.js";

const subjects = [
    {
        subName: 'Python',
        count: 1,
    },
    {
        subName: 'Web and App Crash Course',
        count: 2,
    },
    {
        subName: 'Web & App Development(Madaris)',
        count: 3,
    },
    {
        subName: 'TypeScript',
        count: 1,
    },
    {
        subName: 'Web And Mobile Hybrid App Development',
        count: 4,
    },
    {
        subName: 'Module-1 Exam',
        count: 3,
    },
    {
        subName: 'Web & App Rangers',
        count: 3,
    },
    {
        subName: 'Generative AI & Chatbot Batch-3',
        count: 1,
    },
    {
        subName: 'CCO',
        count: 1,
    },
    {
        subName: 'Web & Mobile App (ASF)',
        count: 3,
    }
];

// Constants
const userProfile = document.querySelector('.user-profile');
const aboutUser = document.querySelector('.about-user');
const cardDisplay = document.querySelector('.quiz-card');
const profileName = document.querySelector('.user-name');
const profileTitle = document.querySelector('.title span');
const logout = document.querySelector('.logout');
const result = document.querySelector('.result');

let userName = JSON.parse(localStorage.getItem('userName')) || '';
userName = userName ? userName.replace(/^"|"$/g, '') : '';

UserData.forEach(profile => {
    if (profile.name === userName) {
        userName = userName.split(' ')
        profileName.textContent = userName[0];
        profileTitle.textContent = userName.length === 3 ? `${userName[0]} ${userName[1]} ${userName[2]}` : `${userName[0]} ${userName[1]}`;
    }
});


// Event Listener for DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    renderSubjectCards();
    setupJoinButtonListeners();
});

// Render Subject Cards
function renderSubjectCards() {
    let html = '';
    subjects.forEach(subject => {
        html += `
            <div class="card">
                <h2 class="card-title">${subject.subName}</h2>
                <div class="subject-count"><span class="count">${subject.count}</span> Subjects</div>
                <div class="btn">Join</div>
            </div>
        `;
    });
    cardDisplay.innerHTML = html;
}

// Setup Join Button Listeners
function setupJoinButtonListeners() {
    const joinButtons = document.querySelectorAll('.btn');
    joinButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const title = card.querySelector('.card-title').textContent;
            const count = card.querySelector('.count').textContent;
            console.log(title);
            handleJoinButtonClick(title, count, index);
        });
    });
}

// Handle Join Button Click
function handleJoinButtonClick(title, count, index) {
    if (title === 'Web And Mobile Hybrid App Development') {
        window.location.href = '../html/aboutSub.html';
    } else {
        console.log(`Joining ${title} with ${count} subjects on index ${index}.`);
        // Perform any action you want when a button is clicked
    }
}

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