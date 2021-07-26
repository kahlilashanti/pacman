import { DIRECTIONS, OBJECT_TYPE, } from "./setup";

//random movement
export function randomMovement(position, direction, objectExist) {
    let dir = direction;
    let nextMovePos = position + dir.movement;

    //create array from the directions object keys
    const keys = Object.keys(DIRECTIONS);

    while (
        objectExist(nextMovePos, OBJECT_TYPE.WALL) || objectExist(nextMovePos, OBJECT_TYPE.GHOST)
    ) {
        //get a random key from the array
        const key = keys[Math.floor(Math.random() * keys.length)];
        //set the next move
        dir = DIRECTIONS[key];
        //set the next move
        nextMovePos = position + dir.movement;
    }
    return { nextMovePos, direction: dir };
}