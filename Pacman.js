import { OBJECT_TYPE, DIRECTIONS } from './setup';

class Pacman {
    constructor(speed, startPos) {
        this.pos = startPos;
        this.speed = speed;
        this.dir = null;
        this.timer = 0;
        this.powerPill = false;
        this.rotation = true;

    }

    //is Pacman ready to move or not
    shouldMove() {
        if (!this.dir) return false;

        //this tells us if we should move or not
        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++
    }

    //calculate the next move for PacMan
    getNextMove(objectExist) {
        let nextMovePos = this.pos + this.dir.movement;

        if (
            objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
            objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)
        ) {
            //if pacman collides with a wall or ghost nothing happens
            nextMovePos = this.pos;
        }
        return { nextMovePos, direction: this.dir }
    }

    makeMove() {
        const classesToRemove = [OBJECT_TYPE.PACMAN];
        const classesToAdd = [OBJECT_TYPE.PACMAN];

        return { classesToRemove, classesToAdd }
    }

    setnewPos(nextMovePos) {
        this.pos = nextMovePos;
    }

    handleKeyInput(e, objectExist) {
        //check to see if key input is working
        console.log(e)
        let dir;

        if (e.keyCode >= 37 && e.keyCode <= 40) {
            //if it is up, down, left or right 
            //change direction to the corresponding key
            dir = DIRECTIONS[e.key];
        } else {
            return;
        }

        //pacman should only be able to change directions at an intersection in the grid
        const nextMovePos = this.pos + dir.movement;
        //check to see if pacman hits a wall
        if (objectExist(nextMovePos, OBJECT_TYPE.WALL)) return
        //do nothing
        //otherwise set the direction
        this.dir = dir;

    }
}

export default Pacman;