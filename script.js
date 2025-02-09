// Load player data from local storage
let players = JSON.parse(localStorage.getItem("players")) || {};
let playerCount = Object.keys(players).length;

// Player registration (prompt)
let playerName = prompt("Enter your name:");
if (!players[playerName]) {
    players[playerName] = { team: null, score: 0 };
}

// Update player counter
playerCount = Object.keys(players).length;
document.getElementById("player-count").innerText = playerCount + " players";

// Dogs team score
let dogScore = 0;
document.getElementById("dog-btn").addEventListener("click", function() {
    dogScore++;
    players[playerName].score++;
    updateLeaderboard();
});

// Cats team score
let catScore = 0;
document.getElementById("cat-btn").addEventListener("click", function() {
    catScore++;
    players[playerName].score++;
    updateLeaderboard();
});

// Update leaderboard
function updateLeaderboard() {
    localStorage.setItem("players", JSON.stringify(players));
    let sortedPlayers = Object.entries(players).sort((a, b) => b[1].score - a[1].score);

    let leaderboard = document.getElementById("score-list");
    leaderboard.innerHTML = "";
    
    sortedPlayers.forEach(([name, data]) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${name}: ${data.score} points`;
        leaderboard.appendChild(listItem);
    });

    document.getElementById("dog-score").innerText = dogScore;
    document.getElementById("cat-score").innerText = catScore;
}

// Load initial leaderboard
updateLeaderboard();
