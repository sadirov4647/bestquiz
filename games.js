const question = document.getElementById("question");
const choices = document.getElementsByClassName("choice-text");

let currentQuestion = {};
let acceptingAnswers = true;
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
    getQuestion()
};

getQuestion = () => {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
        // console.log(number);
    });
}

startGame()