// Get the canvas and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the game settings
const gridSize = 20;  // Grid size, each "block" of the snake will be 20px
const canvasSize = 400;  // Size of the canvas
const totalBlocks = canvasSize / gridSize;  // Number of blocks on the grid

let snake = [{ x: 160, y: 160 }];  // Snake starts at the center
let food = generateFood();  // Generate food
let direction = 'RIGHT';  // Initial direction
let changingDirection = false;
let score = 0;  // Keep track of score

// Event listener to change snake's direction
document.addEventListener('keydown', changeDirection);

// Game loop
function gameLoop() {
  if (hasCollided()) {
    alert("Game Over! Final Score: " + score);
    resetGame();
    return;
  }

  changingDirection = false;
  moveSnake();
  if (eatFood()) {
    score++;
    food = generateFood();
  }

  clearCanvas();
  drawFood();
  drawSnake();
  drawScore();

  setTimeout(gameLoop, 100);  // Refresh the game every 100ms
}

// Draw the snake
function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "lime";
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

// Draw the food
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Draw the score
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

// Move the snake
function moveSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case 'UP':
      head.y -= gridSize;
      break;
    case 'DOWN':
      head.y += gridSize;
      break;
    case 'LEFT':
      head.x -= gridSize;
      break;
    case 'RIGHT':
      head.x += gridSize;
      break;
  }

  snake.unshift(head);  // Add new head to the front of the snake
  snake.pop();  // Remove last part of the snake (move forward)
}

// Check if the snake eats the food
function eatFood() {
  return snake[0].x === food.x && snake[0].y === food.y;
}

// Generate new food location
function generateFood() {
  let foodX = Math.floor(Math.random() * totalBlocks) * gridSize;
  let foodY = Math.floor(Math.random() * totalBlocks) * gridSize;

  // Ensure food does not appear on the snake
  while (isFoodOnSnake(foodX, foodY)) {
    foodX = Math.floor(Math.random() * totalBlocks) * gridSize;
    foodY = Math.floor(Math.random() * totalBlocks) * gridSize;
  }

  return { x: foodX, y: foodY };
}

// Check if food appears on the snake
function isFoodOnSnake(x, y) {
  return snake.some((segment) => segment.x === x && segment.y === y);
}

// Change the snake's direction based on keyboard input
function changeDirection(event) {
  if (changingDirection) return;
  changingDirection = true;

  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'DOWN') direction = 'UP';
      break;
    case 'ArrowDown':
      if (direction !== 'UP') direction = 'DOWN';
      break;
    case 'ArrowLeft':
      if (direction !== 'RIGHT') direction = 'LEFT';
      break;
    case 'ArrowRight':
      if (direction !== 'LEFT') direction = 'RIGHT';
      break;
  }
}

// Check if the snake has collided with the walls or itself
function hasCollided() {
  const head = snake[0];

  // Check if the snake hits the walls
  if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
    return true;
  }

  // Check if the snake hits itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Reset the game
function resetGame() {
  snake = [{ x: 160, y: 160 }];
  food = generateFood();
  direction = 'RIGHT';
  score = 0;
  gameLoop();  // Restart the game
}

// Start the game loop
gameLoop();