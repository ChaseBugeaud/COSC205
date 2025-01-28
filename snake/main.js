class Snake {
  snakeTiles = [{}];

  movementStates = Object.freeze({
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3
  });

  constructor(xCoord, yCoord) {
    this.snakeTiles = [{ x: xCoord, y: yCoord }];
  }

  grow() {
    //Add location to the end of list

  }
  move(direction, isGrowing) {
    //TODO: check for apple, make apple the snake head
    if (isGrowing) {
      grow();
    }

    if (direction == this.movementStates.LEFT) {

    } else if (direction == this.movementStates.RIGHT) {

    } else if (direction == this.movementStates.UP) {

    } else if (direction == this.movementStates.DOWN) {

    }
    //Give headTile new location
    //Iterate through list and shift forward by adding 
    //headTile-location to front of list and disgarding last element
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
let cycleCount = 0;

let snake = new Snake(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, TILE_SIZE, TILE_SIZE);

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

function draw() {
  ctx.globalCompositeOperation = "source-over";
  drawCanvas();
  drawSnake();
  spawnApple();
  drawApples();

  updateCycle();
  window.requestAnimationFrame(draw);
}

function drawCanvas() {
  ctx.fillStyle = "black"
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawSnake() {
  ctx.fillStyle = "green";
  ctx.fillRect(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, TILE_SIZE, TILE_SIZE);
}

function resetScore() {
  score = 0;
}

function incScore(amount) {
  score += amount;
}

function spawnApple() {
  if (apples.length < 3 && cycleCount == 0) {
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

function updateCycle() {
  cycleCount++;

  cycleCount = cycleCount % spawnInterval;
  if (cycleCount == 0) {
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
  console.log("aaple x ", appleX, "apple y", appleY)
  console.log("apple count: ", apples.length)
  ctx.fillRect(appleX * TILE_SIZE, appleY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}
function isSnakeCollision(
  //detects snake collisions with canvas border, apples, and itself
  //TODO: complete
  apples,
  snake,
  CANVAS_WIDTH_START,
  CANVAS_WIDTH,
  CANVAS_HEIGHT_START,
  CANVAS_HEIGHT) {



  return false;
}
function assertCollision() {
  //TODO: complete test function
}



init();
//    while (gameStates.IS_PLAYING){
//
//    }

