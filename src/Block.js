export const COLOURS = ['#f62a00', '#f1f3ce', '#1e656d', '#00293c'];

class Block {
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = COLOURS[colour || Math.floor(Math.random() * COLOURS.length)];
    this.toBeDeleted = false;
  }
}

export default Block;
