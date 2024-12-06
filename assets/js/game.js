const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

const carWidth = 50;
const carHeight = 80;
let carX = canvas.width / 2 - carWidth / 2;
let carY = canvas.height - carHeight - 10;

let obstacles = [];
let gameSpeed = 2;
let score = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && carX > 10) carX -= 20;
  if (e.key === "ArrowRight" && carX < canvas.width - carWidth - 10) carX += 20;
});

function drawCar() {
  ctx.fillStyle = "blue";
  ctx.fillRect(carX, carY, carWidth, carHeight);
}

function drawObstacle(obstacle) {
  ctx.fillStyle = "red";
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function updateObstacles() {
  obstacles.forEach((obstacle) => (obstacle.y += gameSpeed));
  obstacles = obstacles.filter((obstacle) => obstacle.y < canvas.height);
  if (Math.random() < 0.02) {
    const width = 50 + Math.random() * 100;
    const x = Math.random() * (canvas.width - width);
    obstacles.push({ x, y: -50, width, height: 20 });
  }
}

function checkCollision() {
  for (let obstacle of obstacles) {
    if (
      carX < obstacle.x + obstacle.width &&
      carX + carWidth > obstacle.x &&
      carY < obstacle.y + obstacle.height &&
      carY + carHeight > obstacle.y
    ) {
      alert(`Game Over! Your score: ${score}`);
      document.location.reload();
    }
  }
}

function updateScore() {
  score++;
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();
  updateObstacles();
  obstacles.forEach(drawObstacle);
  checkCollision();
  updateScore();
  requestAnimationFrame(gameLoop);
}

gameLoop();
