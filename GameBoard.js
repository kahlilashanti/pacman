import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from './setup';

class GameBoard {
    constructor(DOMGrid) {
        this.dotCount = 0;
        this.grid = [];
        this.DOMGrid = DOMGrid;
    }

    showGameStatus(gameWin) {
        const div = document.createElement('div');
        div.classList.add('game-status');
        div.innerHTML = `${gameWin ? 'YOU WON!' : 'GAME OVER!'}`;
        this.DOMGrid.appendChild(div);
    }

    createGrid(level) {
        this.dotCount = 0;
        this.grid = [];
        this.DOMGrid.innerHTML = '';
        this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px)`;
    }
}