import { Direction } from './direction';
import { lowerNeighbor, upperNeighbor } from './neighbor';

interface SnakeCell {
  prevPos?: number;
  pos: number | undefined;
}

export class Snake {
  dir: Direction = Direction.RIGHT;

  get head() {
    return this.cells[0];
  }

  get tail() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, ...tail] = this.cells;
    return tail;
  }

  cells: SnakeCell[] = [
    {
      pos: 3,
      prevPos: 2,
    },
    {
      pos: 2,
      prevPos: 1,
    },
    {
      pos: 1,
      prevPos: 0,
    },
  ];

  grow() {
    this.cells.push({
      pos: this.cells[this.cells.length - 1].pos,
    });
  }

  isSnakeCell(cell: number) {
    return this.cells.filter((elt) => elt.pos === cell).length > 0;
  }

  updateTail() {
    this.tail.forEach((elt, idx) => {
      elt.prevPos = elt.pos;
      elt.pos = this.cells[idx].prevPos;
    });
  }

  checkDead() {
    return this.tail.filter((elt) => elt.pos === this.head.pos).length > 0;
  }

  setNextPos(newPos: number) {
    this.head.prevPos = this.head.pos;
    this.head.pos = newPos;
    this.updateTail();
  }

  goStep(size: number) {
    const cell = this.head.pos;
    const latticeSize = size;
    if (this.dir === Direction.LEFT) {
      this.setNextPos(lowerNeighbor(cell as number, 1, latticeSize));
    } else if (this.dir === Direction.RIGHT) {
      this.setNextPos(upperNeighbor(cell as number, 1, latticeSize));
    } else if (this.dir === Direction.UP) {
      this.setNextPos(lowerNeighbor(cell as number, 2, latticeSize));
    } else if (this.dir === Direction.DOWN) {
      this.setNextPos(upperNeighbor(cell as number, 2, latticeSize));
    } else {
      throw new Error('Unknown direction');
    }

    // if (this.dir === Direction.LEFT || this.dir === Direction.RIGHT) {
    //   this.setNewColPos(this.dir, size);
    // } else if (this.dir === Direction.DOWN || this.dir === Direction.UP) {
    //   this.setNewRowPos(this.dir, size);
    // }
  }
}
