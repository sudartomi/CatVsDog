let players = JSON.parse(localStorage.getItem("players")) || {};
let dogTotal = JSON.parse(localStorage.getItem("dogTotal")) || 0;
let catTotal = JSON.parse(localStorage.getItem("catTotal")) || 0;
let currentPlayer = null;

function startGame() {
    const playerNameInput = document.getElementById("playerName").value.trim();
    if (!playerNameInput) {
        alert("Enter a name first!");
        return;
    }
    if (!players[playerNameInput]) {
        players[playerNameInput] = { dog: 0, cat: 0 };
    }
    currentPlayer = playerNameInput;
    alert(`Welcome, ${currentPlayer}! Start clicking!`);
    updatePlayerScores();
}

document.getElementById("dogImage").addEventListener("click", function () {
    if (!currentPlayer) {
        alert("Enter your name first!");
        return;
    }
    players[currentPlayer].dog++;
    dogTotal++;
    updatePlayerScores();
    updateGlobalScores();
    this.classList.add("clicked");
    setTimeout(() => this.classList.remove("clicked"), 200);
    new Audio("dog-bark.mp3").play();
});

document.getElementById("catImage").addEventListener("click", function () {
    if (!currentPlayer) {
        alert("Enter your name first!");
        return;
    }
    players[currentPlayer].cat++;
    catTotal++;
    updatePlayerScores();
    updateGlobalScores();
    this.classList.add("clicked");
    setTimeout(() => this.classList.remove("clicked"), 200);
    new Audio("cat-meow.mp3").play();
});

function updatePlayerScores() {
    document.getElementById("dogPlayerScore").textContent = players[currentPlayer].dog;
    document.getElementById("catPlayerScore").textContent = players[currentPlayer].cat;
}

function updateGlobalScores() {
    document.getElementById("dogTotalScore").textContent = dogTotal;
    document.getElementById("catTotalScore").textContent = catTotal;
    document.getElementById("scoreDifference").textContent = dogTotal - catTotal;

    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("dogTotal", dogTotal);
    localStorage.setItem("catTotal", catTotal);

    updateLeaderboard();
}

function updateLeaderboard() {
    const leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";

    const sortedPlayers = Object.entries(players).sort((a, b) => {
        const totalA = a[1].dog + a[1].cat;
        const totalB = b[1].dog + b[1].cat;
        return totalB - totalA;
    });

    sortedPlayers.forEach(([player, scores]) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${player}: Dogs (${scores.dog}) | Cats (${scores.cat})`;
        leaderboard.appendChild(listItem);
    });
}

// Initialize leaderboard and scores on page load
window.onload = function () {
    updateGlobalScores();
    updateLeaderboard();
};
