let dogCount = 0;
let catCount = 0;
let dogLeaderboard = [];
let catLeaderboard = [];

// Click event for the dog
function clickDog() {
    dogCount++;
    document.getElementById("dogCount").innerText = dogCount;
    document.getElementById("dogImage").src = "dog_bark.gif"; // Change to barking image

    setTimeout(() => {
        document.getElementById("dogImage").src = "dog_normal.png"; // Revert to normal image
    }, 500);

    updateLeaderboard("dog", dogCount);
}

// Click event for the cat
function clickCat() {
    catCount++;
    document.getElementById("catCount").innerText = catCount;
    document.getElementById("catImage").src = "cat_meow.gif"; // Change to meowing image

    setTimeout(() => {
        document.getElementById("catImage").src = "cat_normal.png"; // Revert to normal image
    }, 500);

    updateLeaderboard("cat", catCount);
}

// Update the leaderboard
function updateLeaderboard(animal, count) {
    let leaderboard = animal === "dog" ? dogLeaderboard : catLeaderboard;
    let listId = animal === "dog" ? "dogLeaderboard" : "catLeaderboard";

    let name = prompt("Enter your name:");
    if (!name) return;

    let found = leaderboard.find(entry => entry.name === name);
    if (found) {
        found.score += count;
    } else {
        leaderboard.push({ name, score: count });
    }

    leaderboard.sort((a, b) => b.score - a.score);
    let list = document.getElementById(listId);
    list.innerHTML = "";
    leaderboard.forEach(entry => {
        let li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score}`;
        list.appendChild(li);
    });
}
