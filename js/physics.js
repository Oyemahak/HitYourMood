class Ball {
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 3;
        this.radius = 25;
        this.dx = Math.random() > 0.5 ? 3 : -3;
        this.dy = 4;
        this.emoji = "😂"; // Default Emoji
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        // Wall Collision
        if (this.x - this.radius < 0 || this.x + this.radius > window.innerWidth) {
            this.dx *= -1;
        }
        if (this.y - this.radius < 0) {
            this.dy *= -1;
        }

        // Paddle Collision
        let paddle = document.getElementById("paddle");
        let paddleRect = paddle.getBoundingClientRect();

        if (
            this.y + this.radius >= paddleRect.top &&
            this.x > paddleRect.left &&
            this.x < paddleRect.right
        ) {
            this.dy *= -1;
            this.y = paddleRect.top - this.radius;

            // Play Sound Effect
            let bounceSound = new Audio("assets/sounds/bounce.mp3");
            bounceSound.play();
        }

        // Game Over
        if (this.y + this.radius > window.innerHeight) {
            alert("Game Over!");
            location.reload();
        }
    }

    draw(ctx) {
        ctx.font = "40px Arial";
        ctx.fillText(this.emoji, this.x, this.y);
    }
}

class Paddle {
    constructor() {
        this.element = document.getElementById("paddle");
        this.x = window.innerWidth / 2 - 60;
    }

    move(event) {
        let touchX = event.touches[0].clientX;
        this.x = touchX - 60;
        this.element.style.left = `${this.x}px`;
    }
}