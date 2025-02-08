const repo = "your-github-username/dog-vs-cat-clicker";
const path = "leaderboard.json";
const githubToken = "YOUR_PERSONAL_ACCESS_TOKEN"; // Replace with your actual token

async function saveScore() {
    let newScore = { name: username, clicks: dogClicks + catClicks };

    try {
        let response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
            headers: { "Authorization": `token ${githubToken}` }
        });

        if (!response.ok) throw new Error("Failed to fetch leaderboard.");

        let fileData = await response.json();
        let leaderboard = JSON.parse(atob(fileData.content));

        leaderboard.push(newScore);
        leaderboard.sort((a, b) => b.clicks - a.clicks);
        leaderboard = leaderboard.slice(0, 100); // Keep top 100

        await updateLeaderboardFile(leaderboard, fileData.sha);
        updateLeaderboardUI(leaderboard);
        alert("Score saved successfully!");
    } catch (error) {
        console.error("Error saving score:", error);
        alert("Failed to save score. Check the console for details.");
    }
}

async function updateLeaderboardFile(leaderboard, sha) {
    let updatedContent = btoa(JSON.stringify(leaderboard, null, 2));

    try {
        let response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
            method: "PUT",
            headers: {
                "Authorization": `token ${githubToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Updated leaderboard",
                content: updatedContent,
                sha: sha
            })
        });

        if (!response.ok) throw new Error("Failed to update leaderboard.");

    } catch (error) {
        console.error("Error updating leaderboard:", error);
    }
}
