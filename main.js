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

  print() {
    const regex = /,/g;
    const field = this.field.join('\n').replace(regex, '');
    console.log(field);
  }

  promptPlayer() {
    this.playerInput = prompt('Which way? ');
  }

  assessInput() {

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

myField.print();
