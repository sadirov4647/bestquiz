const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("question-counter");
const scoreText = document.getElementById("score");

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
]


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
        return window.location.assign('/end.html');
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${max_question}`;

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
        if (!acceptingAnswers) {
            return;
        }
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(correct_bonus)
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getQuestion();
        }, 1000)

    })
});

incrementScore = (num) => {
    console.log(num);
    sum += num;
    scoreText.innerText = score
}

startGame()