import { htmlQuestions } from "./data.js";

const question = document.querySelector('.question');
const options = document.querySelector('.option-section');
const nextButton = document.querySelector('.next-button');

const totalQuestions = htmlQuestions.length;
let correctAnswer = 0;

let currentQuestionIndex = 0;

function displayQuestion(index) {
    const currentQuestion = htmlQuestions[index];
    const keys = Object.keys(currentQuestion);
    const isFourOptions = keys.length === 5;

    let html = '';
    let optionCount = 1;

    for (let key in currentQuestion) {
        if (key !== 'Question') {
            if ((isFourOptions && optionCount <= 4) || (!isFourOptions && optionCount <= 2)) {
                html += `
                    <li class="option">
                        <input id="test${optionCount}" value="${currentQuestion[key]}" type="radio" name="selected-option">
                        <label for="test${optionCount}" class="label${optionCount}"></label>
                    </li>
                `;
            }
            optionCount++;
        } else {
            question.textContent = `Q ${currentQuestionIndex + 1}: ${currentQuestion[key]}`;
        }
    }
    options.innerHTML = html;

    const labelSelectors = isFourOptions ? ['.label1', '.label2', '.label3', '.label4'] : ['.label1', '.label2'];
    labelSelectors.forEach(selector => {
        const label = document.querySelector(selector);
        if (label) {
            const keyIndex = parseInt(selector.replace('.label', ''));
            const keys = Object.keys(currentQuestion);
            if (keys[keyIndex] !== 'Question') {
                console.log(currentQuestion[keys[keyIndex]])
                label.textContent = currentQuestion[keys[keyIndex]];
            }
            // console.log(keyIndex);
            // console.log(keys);
            // console.log(label.textContent);
            // console.log(currentQuestion[keys[keyIndex]]);
            // console.log(label.textContent);
        }
    });
}

displayQuestion(currentQuestionIndex);

nextButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="selected-option"]:checked');

    if (!selectedOption) {
        swal("Good job!", "Please select an option!", "error");
        return;
        
    }
    
    if (selectedOption.value === htmlQuestions[currentQuestionIndex].answer) {
        correctAnswer += 1;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < htmlQuestions.length) {
        displayQuestion(currentQuestionIndex);
    } else if (nextButton.textContent === 'Reset') {
        currentQuestionIndex = 0;
        displayQuestion(currentQuestionIndex);
        nextButton.textContent = 'Next';
    } else {
        // If there are no more questions, you can handle this case accordingly
        nextButton.textContent = 'Reset';
        swal("Score!", `Score: ${(correctAnswer / totalQuestions).toFixed(2) * 100}`, "success");
    }
});

const dUnselect = document.querySelector('body');

dUnselect.addEventListener('mousedown', event => {
    if (event.detail > 1) {
        console.log(event.detail);
        event.preventDefault();
    }
});

swal("Score!", `Score: ${(correctAnswer / totalQuestions).toFixed(2) * 100}%`, "success");