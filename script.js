const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 500;

let mood = "happy";
let emoji = "😊";
let paddle, ball;
let score = 0;
let bounceSound = new Audio("assets/sounds/bounce.mp3");

const moodEmojis = {
    happy: "😊",
    sad: "😢",
    angry: "😠",
    excited: "😆"
};

const moodClasses = {
    happy: "happy",
    sad: "sad",
    angry: "angry",
    excited: "excited"
};

function startGame() {
    mood = document.getElementById("mood").value;
    document.body.className = moodClasses[mood];
    emoji = moodEmojis[mood];

    paddle = { x: 250, width: 100, height: 15 };
    ball = { x: 300, y: 250, radius: 15, dx: 3, dy: 3 };

    document.getElementById("mood-selection").style.display = "none";
    document.getElementById("game-container").style.display = "block";

    gameLoop();
}

// Keyboard Controls for Desktop
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft" && paddle.x > 0) {
        paddle.x -= 30;
    } else if (event.key === "ArrowRight" && paddle.x < canvas.width - paddle.width) {
        paddle.x += 30;
    }
});

// Mobile Touch Controls for Paddle Movement
document.getElementById("left-btn").addEventListener("click", () => {
    if (paddle.x > 0) paddle.x -= 30;
});

document.getElementById("right-btn").addEventListener("click", () => {
    if (paddle.x < canvas.width - paddle.width) paddle.x += 30;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Paddle
    ctx.fillStyle = "#333";
    ctx.fillRect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);

    // Draw Ball (Emoji)
    ctx.font = "30px Arial";
    ctx.fillText(emoji, ball.x, ball.y);

    // Ball Movement
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall Collision
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx *= -1;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    // Paddle Collision
    if (
        ball.y + ball.radius >= canvas.height - paddle.height &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy *= -1;
        score++;
        document.getElementById("score").innerText = "Score: " + score;

        bounceSound.play();

        document.getElementById("game-container").classList.add("paddle-hit");
        setTimeout(() => {
            document.getElementById("game-container").classList.remove("paddle-hit");
        }, 200);
    }

    // Game Over
    if (ball.y + ball.radius > canvas.height) {
        alert(`Game Over! Your score: ${score}`);
        document.location.reload();
    }

    requestAnimationFrame(gameLoop);
}