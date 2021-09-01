const ul = document.querySelector(".high-score-list");

const moreLi = JSON.parse(localStorage.getItem("highScores")) || [];


ul.innerHTML = moreLi.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("");