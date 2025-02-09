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
    saveAndUpdate();
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
    saveAndUpdate();
    this.classList.add("clicked");
    setTimeout(() => this.classList.remove("clicked"), 200);
    catSound.play();
});

function saveAndUpdate() {
    // Save to local storage
    localStorage.setItem("players", JSON.stringify(players));

    // Update leaderboard and scores
    updateLeaderboard();
    updateScoreDifference();
}

function updateLeaderboard() {
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";

    // Sort players by total points (dog + cat)
    let sortedPlayers = Object.entries(players).sort((a, b) => {
        let aTotal = a[1].dog + a[1].cat;
        let bTotal = b[1].dog + b[1].cat;
        return bTotal - aTotal;
    });

    // Update leaderboard
    sortedPlayers.forEach(([player, scores]) => {
        let li = document.createElement("li");
        li.textContent = `${player}: Dogs (${scores.dog}) | Cats (${scores.cat})`;
        leaderboard.appendChild(li);
    });
}

function updateScoreDifference() {
    let scoreDifference = document.getElementById("scoreDifference");
    scoreDifference.textContent = dogTotal - catTotal;
}

// Initialize scores on page load
window.onload = function () {
    Object.values(players).forEach(player => {
        dogTotal += player.dog;
        catTotal += player.cat;
    });
    updateLeaderboard();
    updateScoreDifference();
};
