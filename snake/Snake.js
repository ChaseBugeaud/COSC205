class Snake {
  snakeTiles = [{ x: xCoord, y: yCoord }];

  movementStates = Object.freeze({
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3
  });

  constructor(xCoord, yCoord) {
    snakeTiles[0] = { x: xCoord, y: yCoord };
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
