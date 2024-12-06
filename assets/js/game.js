const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

const carWidth = 20;
const carHeight = 40;
let carX = canvas.width / 2 - carWidth / 2;
let carY = canvas.height - carHeight - 10;

let obstacles = [];
let gameSpeed = 2;
let score = 0;
let tiltX = 0;

window.addEventListener("deviceorientation", (event) => {
  tiltX = event.gamma || 0; // tilt left/right (gamma) is used
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

function updateObstaclesReload() {
    obstacles.forEach((obstacle) => (obstacle.y += 600 * gameSpeed));
    obstacles = obstacles.filter((obstacle) => obstacle.y < canvas.height);
    
}
  

function checkCollision() {
    for (let obstacle of obstacles) {
      if (
        carX < obstacle.x + obstacle.width &&
        carX + carWidth > obstacle.x &&
        carY < obstacle.y + obstacle.height &&
        carY + carHeight > obstacle.y
      ) {
        updateObstaclesReload()
        alert(`Game Over! Your score: ${score}`);
        
        break;
      }
    }
  }

function updateScore() {
  score++;
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function handleTiltControls() {
  // map tilt values to the canvas width
  const maxTilt = 20; // max tilt angle for smooth control
  if (tiltX > maxTilt) tiltX = maxTilt;
  if (tiltX < -maxTilt) tiltX = -maxTilt;

  const moveX = (tiltX / maxTilt) * 10; // control sensitivity
  carX += moveX;

  // prevent car from going out of bounds
  if (carX < 0) carX = 0;
  if (carX > canvas.width - carWidth) carX = canvas.width - carWidth;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();
  updateObstacles();
  obstacles.forEach(drawObstacle);
  checkCollision();
  updateScore();
  handleTiltControls();
  requestAnimationFrame(gameLoop);
}

gameLoop();
