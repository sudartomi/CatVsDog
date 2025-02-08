let playerName = "";
let dogClicks = 0;
let catClicks = 0;

// Load existing leaderboard
let dogLeaderboard = JSON.parse(localStorage.getItem("dogLeaderboard")) || [];
let catLeaderboard = JSON.parse(localStorage.getItem("catLeaderboard")) || [];

function startGame() {
    const nameInput = document.getElementById("playerName").value.trim();
    if (nameInput === "") {
        alert("Please enter your name!");
        return;
    }
    playerName = nameInput;
    document.getElementById("nameInputContainer").style.display = "none";
    document.getElementById("gameContainer").style.display = "flex";

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

    leaderboard.sort((a, b) => b.clicks - a.clicks);
    leaderboard = leaderboard.slice(0, 100); // Keep only the top 100

    if (animal === "dog") {
        dogLeaderboard = leaderboard;
        localStorage.setItem("dogLeaderboard", JSON.stringify(dogLeaderboard));
    } else {
        catLeaderboard = leaderboard;
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
