// console.log('Working!');

import { LEVEL, OBJECT_TYPE } from './setup';

//import classes
import GameBoard from './GameBoard';

//import Pacman
import Pacman from './Pacman';

//grab DOM elements

const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

//game constants
const POWER_PILL_TIME = 10000; //ms
const GLOBAL_SPEED = 80; //ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

//initial setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = null;

function gameOver(pacman, grid) {

}

function checkCollision(pacman, ghosts) {

}

function gameLoop(pacman, ghosts) {
    // console.log('it works!')
    gameBoard.moveCharacter(pacman);
}

function startGame() {
    // console.log('dammitman')
    //reset variables
    gameWin = false;
    powerPillActive = false;
    score = 0;

    startButton.classList.add('hide');

    //new game grid each new game
    gameBoard.createGrid(LEVEL);

    //new speed and position
    const pacman = new Pacman(2, 287)

    //make pacman appear on the board
    gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
    //add event listener to control pacman
    document.addEventListener('keydown', (e) =>
        pacman.handleKeyInput(e, gameBoard.objectExist));

    timer = setInterval(() => gameLoop(pacman), GLOBAL_SPEED)

}

//initialize game
startButton.addEventListener('click', startGame);












