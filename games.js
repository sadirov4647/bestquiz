'use strict'

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score");
const loader = document.querySelector("#loader");
const game = document.querySelector("#game");
const progresBarFull = document.querySelector(".progress-bar-full");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [];

fetch("question.json")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        questions = loadedQuestions;
        startGame();
    })
    .catch(err => {
        console.error(err);
    });


const correct_bonus = 10;
const max_question = 3;


function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    getQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

function getQuestion() {
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

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
};