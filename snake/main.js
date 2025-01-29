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

    if (this.direction == this.movementStates.LEFT) {
      xCoord--;
    }
    else if (this.direction == this.movementStates.RIGHT) {
      //x-coordinate + 1
      xCoord++;
    } else if (this.direction == this.movementStates.UP) {
      //y-coordinate + 1
      yCoord--;
    } else if (this.direction == this.movementStates.DOWN) {
      //y-coordinate - 1
      yCoord++;
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

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;

const TILE_SIZE = 20;

let score = 0;

let apples = [];
let appleId = 0;

let spawnInterval = 400;
const MOVEMENT_INTERVAL = 10;
let spawnClock = 0;
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
  let isGrowing = checkAppleCollision();
  if (moveClock === 0) {
    snake.move(isGrowing);
  }
}

function draw() {
  ctx.globalCompositeOperation = "source-over";
  drawCanvas();
  drawSnake();
  spawnApple();
  moveSnake();
  drawApples();

  updateCycles();
  window.requestAnimationFrame(draw);
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
    // console.log(tile.x + " " + tile.y)
    ctx.fillRect(tile.x * TILE_SIZE, tile.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

function checkAppleCollision() {
  let nextTile = snake.getNextTile();
  let collision = false;

  for (let apple of apples) {
    if (isSameLocation(apple, nextTile)) {
      collision = true;
    }
  }

  return collision;
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

function spawnApple(snakeTiles) {
  if (apples.length < 3 && spawnClock == 0) {
    let id = appleId++;
    let coords = randomCoord();
    apples[id] = {
      id: id,
      x: coords.x,
      y: coords.y
    };
    //TODO: can't be on snake
  }
}

function getSpawnInterval() {
  let minFrames = 90;
  let maxFrames = 150;
  return Math.floor((Math.random() * (maxFrames - minFrames)) + minFrames);
}

function updateCycles() {
  spawnClock++;
  moveClock++;

  spawnClock = spawnClock % spawnInterval;
  moveClock = moveClock % MOVEMENT_INTERVAL;
  if (spawnClock == 0) {
    spawnInterval = getSpawnInterval();
  }
}

function drawApples() {
  ctx.fillStyle = "red";
  Object.values(apples).forEach(a => {
    drawApple(a.x, a.y);
  });
}

function randomCoord() {
  let xCoord = Math.floor((Math.random() * CANVAS_HEIGHT / TILE_SIZE) + 1);
  let yCoord = Math.floor((Math.random() * CANVAS_HEIGHT / TILE_SIZE) + 1);
  let coords = {
    x: xCoord,
    y: yCoord
  }
  return coords;
}

function drawApple(appleX, appleY) {
  //console.log("aaple x ", appleX, "apple y", appleY)
  //console.log("apple count: ", apples.length)
  ctx.fillRect(appleX * TILE_SIZE, appleY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
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

function gameOver() {
  //If Head is out of bounds or collided with self - end game
  if (isSelfCollision(headX, headY)) {
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

