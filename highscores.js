const ul = document.querySelector(".high-score-list");

const moreLi = JSON.parse(localStorage.getItem("highScores")) || [];


console.log(moreLi.map(score => {
    console.log(`${score.name}-${score.score}`)
}));