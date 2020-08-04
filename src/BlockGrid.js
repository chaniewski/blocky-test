import Block from './Block';

class BlockGrid {
  constructor(width = 10, height = 10) {
    this.width = width;
    this.height = height;
    this.grid = [];

    for (let x = 0; x < this.width; x++) {
      const col = [];
      for (let y = 0; y < this.height; y++) {
        col.push(new Block(x, y));
      }

      this.grid.push(col);
    }
  }

  render(el = document.getElementById('gridEl')) {
    el.innerHTML = '';
    for (let x = 0; x < this.width; x++) {
      const id = 'col_' + x;
      const colEl = document.createElement('div');
      colEl.id = id;
      colEl.className = 'col';
      el.appendChild(colEl);

      for (let y = this.height - 1; y >= 0; y--) {
        const block = this.safeGetBlock(x,y);
        if(block) {
          const id = `block_${x}x${y}`;
          const blockEl = document.createElement('div');

          blockEl.id = id;
          blockEl.className = 'block';
          blockEl.style.background = block.colour;
          blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
          colEl.appendChild(blockEl);
        }
      }
    }
  }

  blockClicked(e, block) {
    console.log(e, block);
    this.findBlocksToDelete(block, block.colour);
    this.deleteBlocks();
  }

  findBlocksToDelete(block, colour) {
    // exit the recursion if block is wrong colour, or already marked for deletion (loop prevention)
    if(!block || block.toBeDeleted || block.colour != colour) {
      return;
    }

    block.toBeDeleted = true;
    console.log('DELETE', block);

    // below
    this.findBlocksToDelete(this.safeGetBlock(block.x, block.y-1), colour);
    // above
    this.findBlocksToDelete(this.safeGetBlock(block.x, block.y+1), colour);
    // left
    this.findBlocksToDelete(this.safeGetBlock(block.x-1, block.y), colour);
    // right
    this.findBlocksToDelete(this.safeGetBlock(block.x+1, block.y), colour);
  }

  deleteBlocks() {
    for(let x = 0; x < this.width; x++) {
      const col = this.grid[x];
      var newCol = [];
      for(let y = 0; y < col.length; y++) {
        var block = col[y];
        var blockEl = document.getElementById(`block_${x}x${y}`);
        if(!block.toBeDeleted) {
          block.y = newCol.length;
          blockEl.id = `block_${x}x${block.y}`;
          newCol.push(block);
        } else {
          blockEl.className = 'block deleted';
          blockEl.addEventListener('webkitTransitionEnd', function(evt) {
            this.parentElement.removeChild(this);
          }, false);
        }
      }

      this.grid[x] = newCol;
    }
  }

  safeGetBlock(x, y) {
    if(x < 0 || x >= this.width) {
      return null;
    }
  
    var col = this.grid[x];
    if(y < 0 || y >= col.length){
      return null;
    }
  
    return col[y];
  }
}



export default BlockGrid;
