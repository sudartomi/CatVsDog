let username = "";
let dogClicks = 0;
let catClicks = 0;
const leaderboardURL = "https://raw.githubusercontent.com/your-github-username/dog-vs-cat-clicker/main/leaderboard.json";

// Load sounds
const dogSound = new Audio('dog-bark.mp3');
const catSound = new Audio('cat-meow.mp3');

document.getElementById("dog").addEventListener("click", function() {
    dogClicks++;
    document.getElementById("dogClicks").innerText = `Clicks: ${dogClicks}`;
    dogSound.play();
});

document.getElementById("cat").addEventListener("click", function() {
    catClicks++;
    document.getElementById("catClicks").innerText = `Clicks: ${catClicks}`;
    catSound.play();
});

function startGame() {
    username = document.getElementById("username").value.trim();
    if (username === "") {
        alert("Please enter a name!");
        return;
    }

    document.getElementById("login").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    loadLeaderboard();
}

async function loadLeaderboard() {
    try {
        let response = await fetch(leaderboardURL);
        let data = await response.json();
        updateLeaderboardUI(data);
    } catch (error) {
        console.error("Failed to load leaderboard.", error);
    }
}

function updateLeaderboardUI(data) {
    let list = document.getElementById("leaderboard");
    list.innerHTML = "";
    data.forEach(player => {
        let li = document.createElement("li");
        li.textContent = `${player.name}: ${player.clicks} clicks`;
        list.appendChild(li);
    });
}

async function saveScore() {
    let newScore = { name: username, clicks: dogClicks + catClicks };

    let response = await fetch(leaderboardURL);
    let leaderboard = await response.json();
    
    leaderboard.push(newScore);
    leaderboard.sort((a, b) => b.clicks - a.clicks);
    leaderboard = leaderboard.slice(0, 100); // Keep only the top 100 players

    await updateLeaderboardFile(leaderboard);
    updateLeaderboardUI(leaderboard);
}

async function updateLeaderboardFile(leaderboard) {
    let githubToken = "YOUR_PERSONAL_ACCESS_TOKEN"; // GitHub API key
    let repo = "your-github-username/dog-vs-cat-clicker";
    let path = "leaderboard.json";

    let response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        headers: {
            "Authorization": `token ${githubToken}`
        }
    });

    let fileData = await response.json();
    let sha = fileData.sha;

    let newContent = btoa(JSON.stringify(leaderboard, null, 2));

    await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        method: "PUT",
        headers: {
            "Authorization": `token ${githubToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Updated leaderboard",
            content: newContent,
            sha: sha
        })
    });
}
