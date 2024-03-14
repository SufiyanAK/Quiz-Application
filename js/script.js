import { htmlQuestions } from "./quiz-data/data.js";

// DOM Elements
const homeButton = document.querySelector('.logo img');
const questionDisplay = document.querySelector('.question');
const optionsContainer = document.querySelector('.option-section');
const nextButton = document.querySelector('.next-button');

// Select 20 random questions
let selectedQuestions = shuffle(htmlQuestions).slice(0, 20);

// Quiz Variables
const totalQuestions = selectedQuestions.length;
let currentQuestionIndex = 0;
let correctAnswers = 0;

// Event Listeners
document.body.addEventListener('keydown', handleKeyPress);
nextButton.addEventListener('click', handleNextButtonClick);
homeButton.addEventListener('click', redirectToHomePage);

// Initialize quiz
displayQuestion(currentQuestionIndex);

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleNextButtonClick();
    }
}

function handleNextButtonClick() {
    const selectedOption = document.querySelector('input[name="selected-option"]:checked');
    
    if (!selectedOption) {
        showErrorMessage("Please select an option!");
        return;
    }

    checkAnswer(selectedOption.value);
    currentQuestionIndex++;
    
    if (currentQuestionIndex < totalQuestions) {
        displayQuestion(currentQuestionIndex);
    } else {
        showScore();
        nextButton.textContent = 'Reset';
        nextButton.removeEventListener('click', handleNextButtonClick);
        nextButton.addEventListener('click', resetQuiz);
    }
}

function redirectToHomePage() {
    window.location.href = '../index.html';
}

function resetQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    nextButton.textContent = 'Next';
    selectedQuestions = shuffle(selectedQuestions);

    nextButton.removeEventListener('click', resetQuiz);
    nextButton.addEventListener('click', handleNextButtonClick);
    displayQuestion(currentQuestionIndex);
}

function displayQuestion(index) {
    let optionCount = 1;
    const currentQuestion = selectedQuestions[index];
    const isFourOptions = Object.keys(currentQuestion).length === 5;
    let html = '';

    for (let key in currentQuestion) {
        if (key === 'Question') {
            questionDisplay.textContent = `Q ${index + 1}: ${currentQuestion[key]}`;
        } else {
            html += `
                <li class="option">
                    <input id="test${optionCount}" value="${currentQuestion[key]}" type="radio" name="selected-option">
                    <label for="test${optionCount}" class="label${optionCount}"></label>
                </li>
            `;
            optionCount++;
        }
    }

    optionsContainer.innerHTML = html;

    const labelSelectors = isFourOptions ? ['.label1', '.label2', '.label3', '.label4'] : ['.label1', '.label2'];
    labelSelectors.forEach(selector => {
        const label = document.querySelector(selector);
        if (label) {
            const keyIndex = parseInt(selector.replace('.label', ''));
            const keys = Object.keys(currentQuestion);
            label.textContent = currentQuestion[keys[keyIndex]];
        }
    });
}

function checkAnswer(selectedOption) {
    if (selectedOption === selectedQuestions[currentQuestionIndex].answer) {
        correctAnswers++;
    }
}

function showErrorMessage(message) {
    swal("Good job!", message, "error");
}

function showScore() {
    
    const score = (correctAnswers / totalQuestions) * 100;
    swal("Score!", `Score: ${score.toFixed(2)}%`, "success");
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}