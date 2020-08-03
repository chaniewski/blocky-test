import BlockGrid from './BlockGrid';
import Block from './Block';
import { COLOURS } from './Block';


describe('BlockGrid', () => {
  it('fills a multidimensional array of Blocks as its grid, according to the given width and height', () => {
    const grid = new BlockGrid(10, 10).grid;

    expect(grid.length).toBe(10);

    grid.forEach(column => {
      expect(column.length).toBe(10);

      column.forEach(block => {
        expect(block).toBeInstanceOf(Block);
      });
    });

    const gridB = new BlockGrid(3, 5).grid;

    expect(gridB.length).toBe(3);

    gridB.forEach(column => {
      expect(column.length).toBe(5);
    });
  });

  xit('good luck, have fun!', () => {});
});

let testGridObject;
let testGrid = [];

describe('BlockGrid behaviours', () => {
  document.body.innerHTML = '<div id="gridEl"></div>';

  beforeEach(() => {
    // resets grid to the following:
    // 0102
    // 1112
    // 0102
    // 3333
    testGridObject = new BlockGrid(4, 4);
    testGrid = testGridObject.grid;
    testGrid[0][3].colour = COLOURS[0];
    testGrid[0][2].colour = COLOURS[1];
    testGrid[0][1].colour = COLOURS[0];
    testGrid[0][0].colour = COLOURS[3];

    testGrid[1][3].colour = COLOURS[1];
    testGrid[1][2].colour = COLOURS[1];
    testGrid[1][1].colour = COLOURS[1];
    testGrid[1][0].colour = COLOURS[3];

    testGrid[2][3].colour = COLOURS[0];
    testGrid[2][2].colour = COLOURS[1];
    testGrid[2][1].colour = COLOURS[0];
    testGrid[2][0].colour = COLOURS[3];

    testGrid[3][3].colour = COLOURS[2];
    testGrid[3][2].colour = COLOURS[2];
    testGrid[3][1].colour = COLOURS[2];
    testGrid[3][0].colour = COLOURS[3];
  });

  it('removes a single block if the clicked block is isolated', () => {
    testGridObject.blockClicked(null, testGrid[0][3]);
    expect(testGrid.length).toBe(4);
    expect(testGrid[0].length).toBe(3);
    expect(testGrid[1].length).toBe(4);
    expect(testGrid[2].length).toBe(4);
    expect(testGrid[3].length).toBe(4);
    expect(testGrid[0][2].colour).toBe(COLOURS[1]);
  });

  it('removes a whole row if it\s the same colour as the clicked block', () => {
    testGridObject.blockClicked(null, testGrid[1][0]);
    expect(testGrid.length).toBe(4);
    testGrid.forEach(column => {
      expect(column.length).toBe(3);
    });

    expect(testGrid[0][0].colour).toBe(COLOURS[0]);
    expect(testGrid[1][0].colour).toBe(COLOURS[1]);
    expect(testGrid[2][0].colour).toBe(COLOURS[0]);
    expect(testGrid[3][0].colour).toBe(COLOURS[2]);
  });

  it('removes a column if it\s the same colour as the clicked block', () => {
    testGridObject.blockClicked(null, testGrid[3][2]);
    expect(testGrid.length).toBe(4);
    expect(testGrid[0].length).toBe(4);
    expect(testGrid[1].length).toBe(4);
    expect(testGrid[2].length).toBe(4);
    expect(testGrid[3].length).toBe(1);

    expect(testGrid[3][0].colour).toBe(COLOURS[3]);
  });

  it('removes an irregular shape of the same colour as the clicked block', () => {
    testGridObject.blockClicked(null, testGrid[1][2]);
    expect(testGrid.length).toBe(4);
    
    expect(testGrid[0].length).toBe(3);
    expect(testGrid[0][0].colour).toBe(COLOURS[3]);
    expect(testGrid[0][1].colour).toBe(COLOURS[0]);
    expect(testGrid[0][2].colour).toBe(COLOURS[0]);

    expect(testGrid[1].length).toBe(1);
    expect(testGrid[1][0].colour).toBe(COLOURS[3]);

    expect(testGrid[2].length).toBe(3);
    expect(testGrid[2][0].colour).toBe(COLOURS[3]);
    expect(testGrid[2][1].colour).toBe(COLOURS[0]);
    expect(testGrid[2][2].colour).toBe(COLOURS[0]);

    expect(testGrid[3].length).toBe(4);
    expect(testGrid[3][0].colour).toBe(COLOURS[3]);
    expect(testGrid[3][1].colour).toBe(COLOURS[2]);
    expect(testGrid[3][2].colour).toBe(COLOURS[2]);
    expect(testGrid[3][3].colour).toBe(COLOURS[2]);
  });
  
  it('clears all blocks when enough of them are clicked', () => {
    testGridObject.blockClicked(null, testGrid[3][0]);
    testGridObject.blockClicked(null, testGrid[3][0]);
    testGridObject.blockClicked(null, testGrid[1][0]);
    testGridObject.blockClicked(null, testGrid[0][0]);
    testGridObject.blockClicked(null, testGrid[2][0]);
    
    expect(testGrid.length).toBe(4);
    
    testGrid.forEach(column => {
      expect(column.length).toBe(0);
    });
  });
})