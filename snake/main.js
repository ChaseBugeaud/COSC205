class Snake {
  snakeTiles = [];

  movementStates = Object.freeze({
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3
  });

  direction = undefined;

  getTiles() {
    return snakeTiles;
  }

  constructor(xCoord, yCoord) {
    this.snakeTiles = [{ x: xCoord, y: yCoord }];
    this.direction = this.movementStates.UP;
  }

  getTiles() {
    return snakeTiles;
  }

  getNextTile() {
    let xCoord = this.snakeTiles[0].x;
    let yCoord = this.snakeTiles[0].y;

    switch (this.direction) {
      case this.movementStates.LEFT:
        xCoord--;
        break;
      case this.movementStates.RIGHT:
        xCoord++;
        break;
      case this.movementStates.UP:
        yCoord--;
        break;
      case this.movementStates.DOWN:
        yCoord++;
        break;
    }

    //out of bounds check
    xCoord = xCoord % (CANVAS_WIDTH / TILE_SIZE);
    yCoord = yCoord % (CANVAS_HEIGHT / TILE_SIZE);
    if (xCoord < 0) {
      xCoord = CANVAS_WIDTH / TILE_SIZE - 1;
    }
    if (yCoord < 0) {
      yCoord = CANVAS_HEIGHT / TILE_SIZE - 1;
    }
    return { x: xCoord, y: yCoord };
  }
  move(isGrowing) {
    this.snakeTiles.unshift(this.getNextTile());
    if (!isGrowing) {
      this.snakeTiles.pop();
    }
  }

  getSnakeTiles() {
    return this.snakeTiles;
  }
}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const skullImage = new Image();
skullImage.src = "skull.png";

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;

const TILE_SIZE = 20;

let score = 0;

let apples = [];
let skulls = [];

let appleSpawnInterval = 400;
let skullSpawnInterval = 1000;
let skullCurrentLifespan = 500;
let skullMaxLifespan = 1000;

const MOVEMENT_INTERVAL = 7;

let appleSpawnClock = 0;
let skullSpawnClock = 0;
let moveClock = 0;

let snake = new Snake(
  (CANVAS_WIDTH / 2) / TILE_SIZE,
  (CANVAS_HEIGHT / 2) / TILE_SIZE
);

const gameStates = Object.freeze({
  WON: 0,
  LOST: 1,
  IS_PLAYING: 2
});

function init() {
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  window.requestAnimationFrame(draw);
}

function moveSnake() {
  let collidedApple = checkAppleCollision();
  if (moveClock == 0) {
    snake.move(collidedApple);
    if (collidedApple) {
      apples = apples.filter(e => collidedApple !== e);
    }
  }
}

function draw() {
  ctx.globalCompositeOperation = "source-over";
  drawCanvas();
  drawSnake();
  spawnApple();
  spawnSkull();
  moveSnake();
  drawApples();
  drawSkulls();

  updateCycles();
  window.requestAnimationFrame(draw);
}

function skullExpire() {
  if (skullCurrentLifespan % skullMaxLifespan == 0) {
    skulls.pop();
    skullCurrentLifespan = 0;
  }
}
function drawCanvas() {
  ctx.fillStyle = "black"
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawSnake() {
  ctx.fillStyle = "green";
  let snakeTiles = snake.getSnakeTiles();
  for (let tile of snakeTiles) {
    ctx.fillRect(tile.x * TILE_SIZE, tile.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

function checkAppleCollision() {
  let nextTile = snake.getNextTile();

  for (let apple of apples) {
    if (isSameLocation(apple, nextTile)) {
      return apple;
    }
  }
}

function checkSkullCollision() {
  let nextTile = snake.getNextTile();

  for (let skull of skulls) {
    if (isSameLocation(skull, nextTile)) {
      return skull
    }
  }
}

function isSameLocation(loc1, loc2) {
  return loc1.x == loc2.x && loc1.y == loc2.y;
}

function resetScore() {
  score = 0;
}

function incScore(amount) {
  score += amount;
}

function spawnApple() {
  if (apples.length < 3 && appleSpawnClock == 0) {
    let coords;
    while (!coords) {
      coords = randomCoord();
      for (let tile of snake.getSnakeTiles()) {
        if (isSameLocation(tile, coords)) {
          coords = undefined;
          break;
        }
      }
    }
    apples.push({
      x: coords.x,
      y: coords.y
    });
  }
}

function spawnSkull() {
  const MAX_SKULLS = 1;
  if (skulls.length < MAX_SKULLS && skullSpawnClock == 0) {
    let coords;
    while (!coords) {
      coords = randomCoord();
      for (let tile of snake.getSnakeTiles()) {
        if (isSameLocation(tile, coords)) {
          coords = undefined;
          break;
        }
      }
      for (let apple of apples) {
        if (isSameLocation(apple, coords)) {
          coords = undefined;
          break;
        }
      }
    }
    skulls.push({
      x: coords.x,
      y: coords.y
    });

  }
}

function getSkullSpawnInterval() {
  let minFrames = 3000;
  let maxFrames = 8000;
  return Math.floor((Math.random() * (maxFrames - minFrames)) + minFrames);
}

function getAppleSpawnInterval() {
  let minFrames = 90;
  let maxFrames = 150;
  return Math.floor((Math.random() * (maxFrames - minFrames)) + minFrames);
}

function updateCycles() {
  appleSpawnClock++;
  skullSpawnClock++;
  skullCurrentLifespan++;
  moveClock++;

  appleSpawnClock = appleSpawnClock % appleSpawnInterval;
  skullSpawnClock = skullSpawnClock % appleSpawnInterval;
  moveClock = moveClock % MOVEMENT_INTERVAL;

  if (appleSpawnClock === 0) {
    appleSpawnInterval = getAppleSpawnInterval();
  }
  if (skullSpawnClock === 0) {
    skullSpawnInterval = getSkullSpawnInterval();
  }
  skullExpire()
}

function drawApples() {
  ctx.fillStyle = "red";
  Object.values(apples).forEach(a => {
    drawApple(a.x, a.y);
  });
}

function drawSkulls() {
  //ctx.fillStyle = "white";
  Object.values(skulls).forEach(a => {
    drawSkull(a.x, a.y);
  });
}

function randomCoord() {
  let xCoord = Math.floor(Math.random() * CANVAS_HEIGHT / TILE_SIZE);
  let yCoord = Math.floor(Math.random() * CANVAS_HEIGHT / TILE_SIZE);
  let coords = {
    x: xCoord,
    y: yCoord
  }
  return coords;
}

function drawApple(appleX, appleY) {
  ctx.fillRect(appleX * TILE_SIZE, appleY * TILE_SIZE, TILE_SIZE, TILE_SIZE);

}
function drawSkull(x, y) {
  if (skullImage.complete) {
    ctx.drawImage(skullImage, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

function isSelfCollision(snakeTiles) {
  //If Head coordinates enter snake-occupied tile BAD
  let snakeHead = snakeTiles[0];
  for (let i = 1; i < snakeTiles.length; i++) {
    if (snakeHead.xCoord === snakeTiles[i].xCoord && snakeHead.yCoord === snakeTiles[i].yCoord) {
      return true;
    }
  }
  return false;
}

function isSkullCollision(skulls) {
  let snakeHead = snakeTiles[0];
  for (let skull in skulls) {
    if (skull.x === snakeHead.x && skull.y === snakeHead.y) {
      return true;
    }
  }
  return false;
}

function gameOver() {
  if (isSelfCollision(headX, headY)) {
    currentstate = gameStates.LOST;
  }
  if (isSkullCollision(headX, headY)) {
    currentstate = gameStates.LOST;
  }
}

function assertCollision() {
  //TODO: complete test function
}

window.addEventListener(
  "keydown",
  (event) => {

    switch (event.key) {
      case "ArrowUp":
        snake.direction = snake.movementStates.UP;
        break;
      case "ArrowDown":
        snake.direction = snake.movementStates.DOWN;
        break;
      case "ArrowLeft":
        snake.direction = snake.movementStates.LEFT;
        break;
      case "ArrowRight":
        snake.direction = snake.movementStates.RIGHT;
        break;

    }
  },
  true,
);

init();
