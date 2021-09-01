const userName = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#save-score-btn");
const finalScore = document.querySelector("#finalScore");
const recentScore = localStorage.getItem("recentScore");


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = recentScore;

userName.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !userName.value
});


saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: userName.value,
    }
    highScores.push(score);

    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
}