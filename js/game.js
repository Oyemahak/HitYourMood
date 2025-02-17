let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball = new Ball();
let paddle = new Paddle();

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.update();
    ball.draw(ctx);
    requestAnimationFrame(gameLoop);
}

document.addEventListener("touchmove", function(event) {
    paddle.move(event);
});

gameLoop();