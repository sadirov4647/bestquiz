const userName = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#save-score-btn");
const finalScore = document.querySelector("#finalScore");
const recentScore = localStorage.getItem("recentScore");


const highScores = JSON.parse(localStorage.getItem("highScores"));
console.log(highScores)
finalScore.innerText = recentScore;

userName.addEventListener("keyup", () => {
    console.log(userName.value);
    saveScoreBtn.disabled = !userName.value
});


saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: userName.value,
    }
    highScores.push(score);

    highScores.sort((a, b) => {
        return b.score - a.score
    })
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
}