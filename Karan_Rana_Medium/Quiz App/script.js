const questions = [
        {
        question: "What is the capital of India?",
        answers: [
            { text: "Delhi", correct: true },
            { text: "Lucknow", correct: false },
            { text: "Chandigarh", correct: false },
            { text: "Patna", correct: false }
        ]
    },

    {
        question: "What is the highest mountain in the world?",
        answers: [
            { text: "Mount Everest", correct: true },
            { text: "Kanchenjunga", correct: false},
            { text: "Mount Kilimanjaro", correct: false},
            { text: "Mount Elbrus", correct: false},
        ]
    }, 
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');
const timerElement = document.getElementById('time');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timer;

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

restartButton.addEventListener('click', startQuiz);

function startQuiz() {
    score = 0;
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    resultContainer.classList.add('hide');
    nextButton.classList.add('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    clearInterval(timer);
    timerElement.innerText = 30;
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        score++;
    }
    clearInterval(timer);
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showResult();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function startTimer() {
    let timeLeft = 30;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            Array.from(answerButtonsElement.children).forEach(button => {
                if (button.dataset.correct) {
                    setStatusClass(button, button.dataset.correct);
                }
                button.disabled = true;
            });
            if (shuffledQuestions.length > currentQuestionIndex + 1) {
                nextButton.classList.remove('hide');
            } else {
                showResult();
            }
        }
    }, 1000);
}

function showResult() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    scoreElement.innerText = `You scored ${score} out of ${questions.length}`;
}

startQuiz();
