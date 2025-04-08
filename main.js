const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const defaultField = [

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
];

class Field {
  constructor() {
    this.originalField = Field.deepCopy(defaultField);
    this.field = Field.deepCopy(defaultField);
    this.playerPosition = [];   // [row, col]
    this.gameOver = false;
  }

  static deepCopy(field) {
    return field.map(row => row.slice());
  }

  static generateRandomInt(n) {
    return Math.floor(Math.random() * n);
  }

  static generateField(height, width, ratio) {
    const newField = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        if (Math.random() < Math.min((ratio / 100), 0.45)) {
          row.push(hole);
        } else {
          row.push(fieldCharacter);
        }
      }
      newField.push(row);
    }

    let [xPath, yPath] = [this.generateRandomInt(height), this.generateRandomInt(width)];
    while (newField[xPath][yPath] === hole) {
      xPath = this.generateRandomInt(height);
      yPath = this.generateRandomInt(width);
    }
    newField[xPath][yPath] = pathCharacter;

    let [xHat, yHat] = [this.generateRandomInt(height), this.generateRandomInt(width)];
    while (newField[xHat][yHat] === hole || newField[xHat][yHat] === pathCharacter) {
      xHat = this.generateRandomInt(height);
      yHat = this.generateRandomInt(width);
    }
    newField[xHat][yHat] = hat;

    return { newField, startPosition: [xPath, yPath] };
  }

  startGame() {
    this.gameOver = false;
    this.playerPosition = [0, 0];
    const playerInput = prompt('Generate random field? ').toLowerCase();

    if (playerInput === 'y' || playerInput === 'yes') {
      const height = parseInt(prompt('Please enter a height: '));
      const width = parseInt(prompt('Please enter a width: '));
      const ratio = parseInt(prompt('Hole percentage? '));

      if (!isNaN(height) && !isNaN(width) && !isNaN(ratio) && ratio >= 0 && ratio <= 100) {
        const result = Field.generateField(height, width, ratio);
        this.field = result.newField;
        this.playerPosition = result.startPosition;
      } else {
        console.log('Invalid input. Generating default field...');
        this.field = Field.deepCopy(this.originalField);
      }
    } else if (playerInput === 'n' || playerInput === 'no') {
      this.field = Field.deepCopy(this.originalField);
    } else {
      console.log('Invalid input. Generating default field...');
      this.field = Field.deepCopy(this.originalField);
    }

    this.assessInput();
  }

  print() {
    const regex = /,/g;
    const field = this.field.join('\n').replace(regex, '');
    console.log(field);
  }

  assessInput() {
    this.print();
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
    switch (direction) {
      case 'up':
        this.playerPosition[0]--;
        break;
      case 'down':
        this.playerPosition[0]++;
        break;
      case 'left':
        this.playerPosition[1]--;
        break;
      case 'right':
        this.playerPosition[1]++;
        break;
    }

    this.winLoseCondition();

    if (!this.gameOver) {
      this.updateField();
      this.assessInput();
    }
  }

  updateField() {
    const [x, y] = this.playerPosition;
    this.field[x][y] = pathCharacter;
  }

  winLoseCondition() {
    if (this.checkBounds()) {
      console.log('You fell off the world, destined to fall for Eternity.');
      this.gameOver = true;
      this.restart();
    } else if (this.checkHole()) {
      console.log('Oh no! You fell into a hole and died!');
      this.gameOver = true;
      this.restart();
    } else if (this.checkHat()) {
      console.log('The Eternal Hat of Aeons has been found!');
      this.gameOver = true;
      
      setTimeout(() => {
        console.log('As the impending Apocalypse looms...');
      }, 1750);
      setTimeout(() => {
        console.log('the possessor of Eternity will Reign Supreme.');
      }, 4000);
      setTimeout(() => {
        console.log('As it may be, that being is YOU!');
      }, 6250);
      setTimeout(() => {
        console.log('And so it begins...');
      }, 8500);
      setTimeout(() => {
        this.restart();
      }, 9750);
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
    const [x, y] = this.playerPosition

    if (this.field[x][y] === hole) {
      return true;
    } else {
      return false;
    }
  }

  checkBounds() {
    const [x, y] = this.playerPosition;
    const maxXLength = this.field.length;
    const maxYLength = this.field[0].length;

    if (x < 0 || y < 0) {
      return true;
    } else if (x >= maxXLength || y >= maxYLength) {
      return true;
    } else {
      return false;
    }
  }

  checkHat() {
    const [x, y] = this.playerPosition;

    if (this.field[x][y] === hat) {
      return true;
    } else {
      return false;
    }
  }
}

const game = new Field();
game.startGame();
