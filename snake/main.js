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

  grow() {
    //Add location to the end of list

  }
  move() {
    //TODO: check for apple, make apple the snake head
    //if (isGrowing) {
    //grow();
    //}
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

    this.snakeTiles.unshift({ x: xCoord, y: yCoord });
    this.snakeTiles.pop();
    //Give headTile new location
    //Iterate through list and shift forward by adding 
    //headTile-location to front of list and disgarding last element
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
  if (moveClock == 0) {
    snake.move();
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

function resetScore() {
  score = 0;
}

function incScore(amount) {
  score += amount;
}

function spawnApple() {
  if (apples.length < 3 && spawnClock == 0) {
    let id = appleId++;
    let coords = randomCoord();
    let key = id.toString();
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

//Collision handling functions
function isInBounds(x, y) {
  //Check Right Bounds - X > ScnSize
  if (x > CANVAS_WIDTH) {
    return false;
  }
  //Check Left Bounds - X < 0
  if (x < 0) {
    return false;
  }
  //Check Top Bounds - Y < 0
  if (y < 0) {
    return false;
  }
  //Check Bottom Bounds - Y > ScnSize
  if (y > CANVAS_HEIGHT) {
    return false;
  }
  //Else return true
  return true;
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
  if (!isInBounds(headX, headY) || isSelfCollision(headX, headY)) {
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
//    while (gameStates.IS_PLAYING){
//
//    }

