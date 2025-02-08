<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dog vs Cat Clicker Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Dog vs Cat Clicker Game</h1>

    <!-- Leaderboard (Now visible before logging in) -->
    <div id="leaderboardContainer">
        <div id="dogLeaderboardSection">
            <h3>Dog Leaderboard</h3>
            <ol id="dogLeaderboard"></ol>
        </div>
        <div id="catLeaderboardSection">
            <h3>Cat Leaderboard</h3>
            <ol id="catLeaderboard"></ol>
        </div>
    </div>

    <!-- Name input (Now below leaderboard) -->
    <div id="nameInputContainer">
        <h2>Enter Your Name to Play</h2>
        <input type="text" id="playerName" placeholder="Enter your name">
        <button onclick="startGame()">Start</button>
    </div>

    <!-- Game area -->
    <div id="gameContainer" style="display: none;">
        <div id="leftSide">
            <h2>Dogs</h2>
            <img id="dogImage" src="assets/dog.png" alt="Dog">
            <p>Your Clicks: <span id="dogClicks">0</span></p>
        </div>

        <div id="rightSide">
            <h2>Cats</h2>
            <img id="catImage" src="assets/cat.png" alt="Cat">
            <p>Your Clicks: <span id="catClicks">0</span></p>
        </div>
    </div>

    <!-- Audio for clicking -->
    <audio id="dogSound" src="assets/dog-bark.mp3"></audio>
    <audio id="catSound" src="assets/cat-meow.mp3"></audio>

    <script src="script.js"></script>
</body>
</html>
