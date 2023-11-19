import { Component, HostListener } from '@angular/core';
import { Direction } from './direction';
import { Egg } from './egg';
import { Snake } from './snake';

const KEY_CODES = {
  37: Direction.LEFT,
  38: Direction.UP,
  39: Direction.RIGHT,
  40: Direction.DOWN,
};
@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss'],
})
export class SnakeGameComponent {
  readonly size = 20;
  readonly gridSize = this.size * this.size;
  readonly cellWidth = 10; // in px
  readonly cells = new Array(this.size * this.size);
  readonly timestep = 100;
  readonly ngStyleCells = {
    width: `${this.size * this.cellWidth}px`,
  };

  snake = new Snake();
  readonly direnum = Direction;
  dead = false;
  win = false;
  time = 0;
  eated = 0;
  egg: Egg = new Egg(this.gridSize);
  paused = false;
  started = false;

  startGame() {
    this.snake = new Snake();
    this.started = true;
    this.dead = false;
    this.win = false;
    this.eated = 0;
    this.doSpawnEgg();
    const runTime = () => {
      setTimeout(() => {
        this.goStep();
        this.dead = this.snake.checkDead();
        this.time++;
        if (!this.dead && !this.win) {
          runTime();
        }
      }, this.timestep);
    };
    runTime();
  }

  doTogglePause() {
    this.paused = !this.paused;
  }

  doSpawnEgg() {
    this.egg = new Egg(this.gridSize, this.snake);
  }

  goStep() {
    this.snake.goStep(this.size);
    this.eatEgg();
  }

  eatEgg() {
    const pos = this.snake.head.pos;
    if (this.isEgg(pos as number)) {
      this.doSpawnEgg();
      this.snake.grow();
      this.eated++;
      this.checkWin();
    }
  }

  checkWin() {
    if (this.eated >= 10) {
      this.win = true;
      this.dead = false;
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(e: KeyboardEvent) {
    if (!this.dead && this.started) {
      const dir = KEY_CODES[e.keyCode as keyof typeof KEY_CODES];
      this.changeDirAndGoStep(dir);
    }
  }

  changeDirAndGoStep(dir: Direction) {
    if (this.win || this.dead || !this.started) return;
    if (dir) {
      const canChangeDir = this.getCanChangeDir(dir, this.snake.dir);
      if (canChangeDir) {
        this.snake.dir = dir;
        this.goStep();
      }
    }
  }

  getCanChangeDir(d1: Direction, d2: Direction) {
    const dirs = [d1, d2];
    const filteredUpDown = dirs.filter(
      (dir) => dir === Direction.UP || dir === Direction.DOWN
    ).length;
    const onlyOneDir = filteredUpDown === 2 || filteredUpDown === 0;
    return !onlyOneDir;
  }

  isEgg(cell: number) {
    return this.egg.pos === cell;
  }

  ngStyleCell(idx: number) {
    const bgEgg = this.isEgg(idx) ? 'var(--snake-color)' : null;
    const bgSnake = this.snake.isSnakeCell(idx) ? 'var(--snake-color)' : null;
    const defaultBg = 'transparent';
    return {
      width: `${this.cellWidth}px`,
      height: `${this.cellWidth}px`,
      background: bgEgg || bgSnake || defaultBg,
      borderRadius: bgEgg ? '50%' : null,
      boxShadow: bgEgg ? '0 0 0 5px var(--snake-color-20)' : null,
      transition: bgEgg || !bgSnake ? 'var(--ts)' : null,
    };
  }
}
