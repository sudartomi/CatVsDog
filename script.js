let players = {};
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
document.getElementById("dogImage").addEventListener("click", function() {
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
document.getElementById("catImage").addEventListener("click", function() {
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
    let dogLeaderboard = document.getElementById("dogLeaderboard");
    let catLeaderboard = document.getElementById("catLeaderboard");
    let scoreDifference = document.getElementById("scoreDifference");

    let sortedDogPlayers = Object.entries(players).sort((a, b) => b[1].dog - a[1].dog);
    let sortedCatPlayers = Object.entries(players).sort((a, b) => b[1].cat - a[1].cat);

    dogLeaderboard.innerHTML = "";
    sortedDogPlayers.forEach(player => {
        let li = document.createElement("li");
        li.textContent = `${player[0]}: ${player[1].dog} points`;
        dogLeaderboard.appendChild(li);
    });

    catLeaderboard.innerHTML = "";
    sortedCatPlayers.forEach(player => {
        let li = document.createElement("li");
        li.textContent = `${player[0]}: ${player[1].cat} points`;
        catLeaderboard.appendChild(li);
    });

    scoreDifference.textContent = dogTotal - catTotal;
}
