const userName = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#save-score-btn");
const finalScore = document.querySelector("#finalScore");
const recentScore = localStorage.getItem("recentScore");

finalScore.innerText = recentScore;

userName.addEventListener("keyup", () => {
    console.log(userName.value);
    saveScoreBtn.disabled = !userName.value
});


saveHighScore = e => {
    e.preventDefault()
}