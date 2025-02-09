let players = JSON.parse(localStorage.getItem("players")) || {};
let dogTotal = 0;
let catTotal = 0;

// Load sounds
let dogSound = new Audio("dog-bark.mp3");
let catSound = new Audio("cat-meow.mp3");

function startGame() {
    let nameInput = document.getElementById("playerName").value.trim();
    if (nameInput === "") {
        alert("Enter a name first!");
        return;
    }
    if (!players[nameInput]) {
        players[nameInput] = { dog: 0, cat: 0 };
    }
    alert(`Welcome, ${nameInput}! Click on the animals to earn points.`);
}

// Dog click event
document.getElementById("dogImage").addEventListener("click", function () {
    let nameInput = document.getElementById("playerName").value.trim();
    if (!players[nameInput]) {
        alert("Enter your name first!");
        return;
    }
    players[nameInput].dog++;
    dogTotal++;
    updateScores();
    this.classList.add("clicked");
    setTimeout(() => this.classList.remove("clicked"), 200);
    dogSound.play();
});

// Cat click event
document.getElementById("catImage").addEventListener("click", function () {
    let nameInput = document.getElementById("playerName").value.trim();
    if (!players[nameInput]) {
        alert("Enter your name first!");
        return;
    }
    players[nameInput].cat++;
    catTotal++;
    updateScores();
    this.classList.add("clicked");
    setTimeout(() => this.classList.remove("clicked"), 200);
    catSound.play();
});

// Update leaderboard and score difference
function updateScores() {
    let leaderboard = document.getElementById("leaderboard");
    let scoreDifference = document.getElementById("scoreDifference");

    // Update localStorage
    localStorage.setItem("players", JSON.stringify(players));

    // Sort players by total points (dog + cat)
    let sortedPlayers = Object.entries(players).sort((a, b) => {
        let aTotal = a[1].dog + a[1].cat;
        let bTotal = b[1].dog + b[1].cat;
        return bTotal - aTotal;
    });

    // Update leaderboard
    leaderboard.innerHTML = "";
    sortedPlayers.forEach(([player, scores]) => {
        let li = document.createElement("li");
        li.textContent = `${player}: Dogs (${scores.dog}) | Cats (${scores.cat})`;
        leaderboard.appendChild(li);
    });

    // Update score difference
    scoreDifference.textContent = dogTotal - catTotal;
}
