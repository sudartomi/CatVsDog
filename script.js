let playerName;
let dogCount = 0;
let catCount = 0;
let dogLeaderboard = JSON.parse(localStorage.getItem("dogLeaderboard")) || [];
let catLeaderboard = JSON.parse(localStorage.getItem("catLeaderboard")) || [];

// Load leaderboard on page load
document.addEventListener("DOMContentLoaded", () => {
    checkLogin();
});

// Check if user is logged in
function checkLogin() {
    playerName = localStorage.getItem("playerName");

    if (playerName) {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("gameScreen").style.display = "flex";
        loadUserScore();
        updateLeaderboard("dog");
        updateLeaderboard("cat");
    }
}

// Login function
function login() {
    let inputName = document.getElementById("playerName").value.trim();
    if (!inputName) {
        alert("Please enter a valid name!");
        return;
    }

    playerName = inputName;
    localStorage.setItem("playerName", playerName);
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "flex";
    loadUserScore();
}

// Logout function
function logout() {
    localStorage.removeItem("playerName");
    window.location.reload();
}

// Load user's previous score
function loadUserScore() {
    let dogEntry = dogLeaderboard.find(entry => entry.name === playerName);
    let catEntry = catLeaderboard.find(entry => entry.name === playerName);

    dogCount = dogEntry ? dogEntry.score : 0;
    catCount = catEntry ? catEntry.score : 0;

    document.getElementById("dogCount").innerText = dogCount;
    document.getElementById("catCount").innerText = catCount;
}

// Click event for the dog
function clickDog() {
    dogCount++;
    document.getElementById("dogCount").innerText = dogCount;
    document.getElementById("dogImage").src = "dog_bark_full.gif";

    setTimeout(() => {
        document.getElementById("dogImage").src = "dog_still.png";
    }, 500);

    updateLeaderboard("dog");
}

// Click event for the cat
function clickCat() {
    catCount++;
    document.getElementById("catCount").innerText = catCount;
    document.getElementById("catImage").src = "cat_meow_full.gif";

    setTimeout(() => {
        document.getElementById("catImage").src = "cat_still.png";
    }, 500);

    updateLeaderboard("cat");
}

// Update the leaderboard
function updateLeaderboard(animal) {
    let leaderboard = animal === "dog" ? dogLeaderboard : catLeaderboard;
    let listId = animal === "dog" ? "dogLeaderboard" : "catLeaderboard";
    let count = animal === "dog" ? dogCount : catCount;

    let existingEntry = leaderboard.find(entry => entry.name === playerName);
    if (existingEntry) {
        existingEntry.score = count;
    } else {
        leaderboard.push({ name: playerName, score: count });
    }

    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem(animal === "dog" ? "dogLeaderboard" : "catLeaderboard", JSON.stringify(leaderboard));

    let list = document.getElementById(listId);
    list.innerHTML = "";
    leaderboard.forEach(entry => {
        let li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score}`;
        list.appendChild(li);
    });
}
