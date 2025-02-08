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

    // Load existing clicks for player
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

    if (animal === "dog") {
        localStorage.setItem("dogLeaderboard", JSON.stringify(dogLeaderboard));
    } else {
        localStorage.setItem("catLeaderboard", JSON.stringify(catLeaderboard));
    }

    updateLeaderboards();
}

function updateLeaderboards() {
    const dogList = document.getElementById("dogLeaderboard");
    const catList = document.getElementById("catLeaderboard");

    dogList.innerHTML = "";
    catList.innerHTML = "";

    dogLeaderboard.forEach(entry => {
        let li = document.createElement("li");
        li.innerText = `${entry.name}: ${entry.clicks}`;
        dogList.appendChild(li);
    });

    catLeaderboard.forEach(entry => {
        let li = document.createElement("li");
        li.innerText = `${entry.name}: ${entry.clicks}`;
        catList.appendChild(li);
    });
}

// Click event listeners
document.getElementById("dogButton").addEventListener("click", clickDog);
document.getElementById("catButton").addEventListener("click", clickCat);
