const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.playerInput = null;
    this.playerPosition = [];   // [x-coord, y-coord] where x-axis is up/down and y-axis is left/right
  }

  startGame() {
    this.playerPosition = [0, 0];
    this.print();
    this.assessInput();
  }

  print() {
    const regex = /,/g;
    const field = this.field.join('\n').replace(regex, '');
    console.log(field);
  }

  assessInput() {
    console.log(`Current position: ${this.playerPosition}`);
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
    // running but positions are not being updated correctly
    switch (direction) {
      case 'up':
        this.playerPosition[0] -= 1;
      case 'down':
        this.playerPosition[0] += 1;
      case 'left':
        this.playerPosition[1] -+ 1;
      case 'right':
        this.playerPosition[1] += 1;
      default:
        this.failCondition();
        this.updateField();
        this.assessInput();
    }
  }

  updateField() {
  }

  failCondition() {
    const hole = this.checkHole();
    const outOfBounds = this.checkBounds();

    if (hole) {
      console.log('Oh no! You fell into a hole and died!');
      this.restart();
    } else if (outOfBounds) {
      console.log('You fell off the world, falling for eternity, waiting for the end... but it never comes.');
      this.restart();
    }
  }

  restart() {
    const playerInput = prompt('GAME OVER: Play again? ').toLowerCase();

    if (playerInput === 'yes' || playerInput === 'y') {
      this.startGame();
    } else if (playerInput === 'no' || playerInput === 'n') {
      console.log('Exiting...');
      process.exit(0);
    } else {
      console.log('Invalid input: exiting...')
      process.exit(0);
    }
  }

  checkHole() {
    const [x, y] = this.playerPosition;

    if (this.field[x][y] === hole) {
      return true;
    } else {
      return false;
    }
  }

  checkBounds() {
    const [x, y] = this.playerPosition;
    if (x < 0 || y < 0) {
      return true;
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
