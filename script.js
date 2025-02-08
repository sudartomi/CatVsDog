let playerName = "";
let dogClicks = 0;
let catClicks = 0;

// Load leaderboard from localStorage
let dogLeaderboard = JSON.parse(localStorage.getItem("dogLeaderboard")) || [];
let catLeaderboard = JSON.parse(localStorage.getItem("catLeaderboard")) || [];

// Show leaderboard before logging in
updateLeaderboards();

function startGame() {
    const nameInput = document.getElementById("playerName").value.trim();
    if (nameInput === "") {
        alert("Please enter your name!");
        return;
    }
    playerName = nameInput;
    document.getElementById("nameInputContainer").style.display = "none";
    document.getElementById("gameContainer").style.display = "flex";

    let existingDogPlayer = dogLeaderboard.find(entry => entry.name === playerName);
    let existingCatPlayer = catLeaderboard.find(entry => entry.name === playerName);

    dogClicks = existingDogPlayer ? existingDogPlayer.clicks : 0;
    catClicks = existingCatPlayer ? existingCatPlayer.clicks : 0;

    document.getElementById("dogClicks").innerText = dogClicks;
    document.getElementById("catClicks").innerText = catClicks;

    updateLeaderboards();
}

function clickDog() {
    dogClicks++;
    document.getElementById("dogClicks").innerText = dogClicks;
    document.getElementById("dogSound").play();
    updateLeaderboard("dog");
}

function clickCat() {
    catClicks++;
    document.getElementById("catClicks").innerText = catClicks;
    document.getElementById("catSound").play();
    updateLeaderboard("cat");
}

function updateLeaderboard(animal) {
    let leaderboard = animal === "dog" ? dogLeaderboard : catLeaderboard;
    let clicks = animal === "dog" ? dogClicks : catClicks;

    let existingEntry = leaderboard.find(entry => entry.name === playerName);
    if (existingEntry) {
        existingEntry.clicks = clicks;
    } else {
        leaderboard.push({ name: playerName, clicks: clicks });
    }

    leaderboard.sort((a, b) => b.clicks - a.clicks); // Sort by highest clicks

    localStorage.setItem("
