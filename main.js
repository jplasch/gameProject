const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.playerInput = null;
    // Player position
    // [y-coord, x-coord]
    this.playerPosition = [0, 0];
  }

  startGame() {
    this.print();
    this.assessInput();
  }

  print() {
    const regex = /,/g;
    const field = this.field.join('\n').replace(regex, '');
    console.log(field);
  }

  assessInput() {
    const playerInput = prompt('Which way? ').toLowerCase();
    switch (playerInput) {
      case 'u':
      case 'up':
        this.updatePosition('up');
        break;
      case 'd':
      case 'down':
        this.updatePosition('down');
        break;
      case 'l':
      case 'left':
        this.updatePosition('left');
        break;
      case 'r':
      case 'right':
        this.updatePosition('right');
        break;
      default:
        console.log('Invalid input; please enter [u]p, [d]own, [l]eft, or [r]ight.');
        this.assessInput();
    }
  }

  updatePosition(direction) {
    console.log(`You went ${direction}.`);
  }

  checkHole() {
    const [x, y] = this.playerPosition;
    if (this.field[x][y] === hole) {
      return true;
    } else {
      return false;
    }
  }
}

const myField = new Field([
  ['*', '░', '░', '░', 'O', '░', '░', '░', '░', '░', '░'],
  ['O', '░', 'O', 'O', '░', '░', 'O', '░', 'O', '░', '░'],
  ['░', '░', '░', 'O', '░', 'O', '░', '░', '░', '░', 'O'],
  ['░', 'O', 'O', '░', '░', 'O', '░', 'O', '░', 'O', '░'],
  ['░', '░', '░', '░', 'O', '░', '░', '░', 'O', '░', '░'],
  ['░', 'O', '░', 'O', '░', '░', 'O', 'O', '░', '░', '░'],
  ['░', 'O', '░', 'O', '░', '░', '░', 'O', '^', 'O', '░'],
  ['░', 'O', '░', 'O', '░', 'O', '░', '░', 'O', 'O', '░'],
  ['░', '░', '░', 'O', '░', '░', 'O', '░', 'O', '░', '░'],
  ['░', 'O', '░', '░', 'O', '░', '░', 'O', '░', '░', '░'],
  ['O', '░', '░', 'O', '░', '░', '░', '░', '░', '░', '░'],
]);

myField.startGame();
