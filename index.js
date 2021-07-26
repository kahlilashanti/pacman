// console.log('Working!');

import { LEVEL, OBJECT_TYPE } from './setup';

import { randomMovement } from './ghostMoves';

//import classes
import GameBoard from './GameBoard';

//import Pacman and Ghosts
import Pacman from './Pacman';

import Ghost from './Ghost';

//import sounds
import soundDot from './sounds/munch.wav';
import soundPill from './sounds/pill.wav';
import soundGameStart from './sounds/game_start.wav';
import soundGameOver from './sounds/death.wav';
import soundGhost from './sounds/eat_ghost.wav';


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

//function to play the sounds
function playAudio(audio) {
    const soundEffect = new Audio(audio);
    soundEffect.play();
}

function gameOver(pacman, grid) {
    playAudio(soundGameOver);
    document.removeEventListener('keydown', e =>
        pacman.handleKeyInput(e, gameBoard.objectExist)
    );
    gameBoard.showGameStatus(gameWin);

    clearInterval(timer);

    startButton.classList.remove('hide');
}

function checkCollision(pacman, ghosts) {
    const collidedGhost = ghosts.find(ghost => pacman.pos === ghost.pos);
    if (collidedGhost) {
        if (pacman.powerPill) {
            playAudio(soundGhost)

            ghosts.forEach((ghost, i) => {
                if (collidedGhost.name === ghost.name) {
                    gameBoard.removeObject(collidedGhost.pos, [
                        OBJECT_TYPE.GHOST,
                        OBJECT_TYPE.SCARED,
                        collidedGhost.name
                    ]);
                    //reset the ghost to start position
                    collidedGhost.pos = collidedGhost.startPos;
                }
            })

            score += 100;
        } else {
            //if he dies remove him from the gameboard
            gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
            gameBoard.rotateDiv(pacman.pos, 0);
            gameOver(pacman, gameGrid);
        }
    }
}

function gameLoop(pacman, ghosts) {
    // console.log('it works!')
    gameBoard.moveCharacter(pacman);
    checkCollision(pacman, ghosts);

    ghosts.forEach(ghost => gameBoard.moveCharacter(ghost));
    checkCollision(pacman, ghosts);

    //if pacman eats a dot
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
        playAudio(soundDot);
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT])
        //remove dot
        gameBoard.dotCount--;

        //give pacman 10 points when he eats a dot
        score += 10;
    }

    //check if pacman eats a powerpill
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
        playAudio(soundPill);

        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

        pacman.powerPill = true;
        score += 50;

        //clear out old timer with new time
        clearTimeout(powerPillTimer);
        powerPillTimer = setTimeout(
            () => (pacman.powerPill = false),
            POWER_PILL_TIME
        );
    }

    //ghosts are scared from power pill
    if (pacman.powerPill !== powerPillActive) {
        powerPillActive = pacman.powerPill;
        ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
    }

    //check if all dots have been eaten
    if (gameBoard.dotCount === 0) {
        gameWin = true;
        gameOver(pacman, ghosts)
    }

    //show the score
    scoreTable.innerHTML = score;
}

function startGame() {
    playAudio(soundGameStart)
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

    //create ghosts
    const ghosts = [
        new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
        new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
        new Ghost(1, 230, randomMovement, OBJECT_TYPE.INKY),
        new Ghost(8, 251, randomMovement, OBJECT_TYPE.CLYDE)
    ]

    timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED)

}

//initialize game
startButton.addEventListener('click', startGame);












