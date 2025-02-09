// Firebase Configuration (Replace with your own)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

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
document.getElementById("dogImage").addEventListener("click", function() {
    let nameInput = document.getElementById("playerName").value.trim();
    if (!players[nameInput]) {
        alert("Enter your name first!");
        return;
    }
    players[nameInput].dog++;
    dogTotal++;
    saveData();
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
    saveData();
    this.classList.add("clicked");
    setTimeout(() => this.classList.remove("clicked"), 200);
    catSound.play();
});

// Save to localStorage and Firebase
function saveData() {
    localStorage.setItem("players", JSON.stringify(players));
    db.ref("gameData").set(players);
    updateScores();
}

// Load data from Firebase
db.ref("gameData").on("value", (snapshot) => {
    if (snapshot.exists()) {
        players = snapshot.val();
        updateScores();
    }
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
@media (max-width: 768px) {
    .container {
        flex-direction: column;
        height: auto;
    }

    .side {
        width: 100%;
        padding: 20px 0;
    }

    .leaderboard {
        width: 100%;
    }

    img {
        width: 150px; /* Kisebb képek a mobilnézethez */
    }
}
document.getElementById("dogImage").addEventListener("click", dogClick);
document.getElementById("dogImage").addEventListener("touchstart", dogClick);

document.getElementById("catImage").addEventListener("click", catClick);
document.getElementById("catImage").addEventListener("touchstart", catClick);

function dogClick() {
    let nameInput = document.getElementById("playerName").value.trim();
    if (!players[nameInput]) {
        alert("Enter your name first!");
        return;
    }
    players[nameInput].dog++;
    dogTotal++;
    saveData();
    document.getElementById("dogImage").classList.add("clicked");
    setTimeout(() => document.getElementById("dogImage").classList.remove("clicked"), 200);
    dogSound.play();
}

function catClick() {
    let nameInput = document.getElementById("playerName").value.trim();
    if (!players[nameInput]) {
        alert("Enter your name first!");
        return;
    }
    players[nameInput].cat++;
    catTotal++;
    saveData();
    document.getElementById("catImage").classList.add("clicked");
    setTimeout(() => document.getElementById("catImage").classList.remove("clicked"), 200);
    catSound.play();
}
