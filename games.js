// 'use strict'

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score");
const progresBarFull = document.querySelector(".progress-bar-full");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
    {
        question: "O'zbekistonning Poytaxti qayer",
        choice1: "Namangan",
        choice2: "Buxoro",
        choice3: "Toshkent",
        choice4: "Navoiy",
        answer: 3
    },
    {
        question: "Eng tez yuguruvchi hayvon qaysi?",
        choice1: "Gepard",
        choice2: "Ot",
        choice3: "Fil",
        choice4: "Sher",
        answer: 1
    },
    {
        question: "Nimaga go'sht qimmatlashib ketyapti",
        choice1: "Fermerlar kamayib ketgani uchun",
        choice2: "Ozuqa qimmatlashib ketgani uchun",
        choice3: "Xayvon gripi kelgani uchun",
        choice4: "Ko'p go'sht yepqo'yganimiz uchun",
        answer: 4
    }
];


const correct_bonus = 10;
const max_question = 3;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    getQuestion();
};

getQuestion = () => {
    if (availableQuestion.length === 0 || questionCounter > max_question) {
        localStorage.setItem("recentScore", score)
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${max_question}`;

    progresBarFull.style.width = `${(questionCounter / max_question) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestion.splice(questionIndex, 1);
    acceptingAnswers = true
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        console.log(classToApply)
        if (classToApply === "correct") {
            selectedChoice.parentElement.classList.add(classToApply);
            incrementScore(correct_bonus);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getQuestion();
        }, 1000);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame()