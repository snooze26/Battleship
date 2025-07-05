import Battle_Field from './battleFieldClass.mjs';
import * as Ships from './shipClass.mjs';
import * as AI from './aiStuff.mjs';

class Players {
    constructor(name, difficulty) {
        this.name = name;
        this.difficulty = difficulty;
        this.cellGrid = []; 
        this.score = 0; 
    }

    // place ship on the board 
    placeShip(coords, ship) {
        const result = this.battleField.placeShip(coords, ship);

        if (result) {
            console.log(`${ship.type} has been placed on the board`);
            return result;
        } else {
            console.error(`${ship.type} can't be placed. Check the coordinates`);
            return false;
        }
    }

    // player takes turn 
    takeTurn(opponent, move) {
        opponent.battleField.attack(move);
    }

    updateScore(opponent) { 
        const totalShips = 5; 

        const shipsSunk = totalShips - opponent.battleField.ships.shipsAfloat; 
        
        this.score = shipsSunk; 
    }
}

// create human player
class HumanPlayer extends Players {
    constructor(name) {
        super(name, null);
        this.battleField = new Battle_Field(10, 10);
    }
}

// create computer player
class ComputerPlayer extends Players {
    constructor(difficulty, randomFn = Math.random) {
        super("Computer", difficulty);
        this.battleField = new Battle_Field(10, 10);
        this.randomFn = randomFn;
    }

    async takeTurn(opponent) {
        let move;

        if (this.difficulty === "Easy") {
            move = [
                Math.floor(this.randomFn() * 8),
                Math.floor(this.randomFn() * 8)
            ];
        } else if (this.difficulty === "Hard") {
            const gameState = AI.getStateOfGame(this.battleField);
            const prompt = AI.makeAiPrompt(gameState);
            const nextMove = await AI.getNextMove(prompt);
            move = [nextMove.x, nextMove.y];
        }

        opponent.battleField.attack(move);
    }
}


export {
    Players,
    HumanPlayer,
    ComputerPlayer
};


