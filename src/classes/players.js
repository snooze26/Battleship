const Battle_Field = require('./battleFieldClass.js');
const Ships = require('./shipClass.js')
const AI = require('./aiStuff.js');


class Players {
    constructor(name , difficulty){ 
        this.name = name;
        this.difficulty = difficulty; 
    }

    // place ship on the board 
    placeShip(coords , ship) { 
        const result = this.battleField.placeShip(coords , ship);

        if(result) { 
            console.log(`${ship.type} has been placed on the board` );
            return result;
        }else {
            console.error(`${ship.type} can't be placed. Check the coordinates`)
            return false; 
        }
    }
    // player takes turn 
    takeTurn(opponent , move) { 
        //assign move to the users click 
        opponent.battleField.attack(move);
    }
}
// create human player
class HumanPlayer extends Players {
    constructor(name) { 
        super(name , null)
        this.battleField = new Battle_Field(10, 10);
    }
}
//create computer player
class ComputerPlayer extends Players {
    constructor(difficulty, randomFn = Math.random) { 
        super("Computer", difficulty); 
        this.battleField = new Battle_Field(10 , 10);
        this.randomFn = randomFn;
    }   

    async takeTurn(opponent) { 
        let move; 
        if(this.difficulty === "Easy") { 
            move = [Math.floor(this.randomFn() * 8) , 
                    Math.floor(this.randomFn() * 8)];
        }else if (this.difficulty === "Hard") { 
            const gameState = AI.getStateOfGame(this.battleField); 
            const prompt = AI.makeAiPrompt(gameState); 
            const nextMove = await AI.getNextMove(prompt);
            move = [nextMove.x , nextMove.y]
        }
        opponent.battleField.attack(move)
    }
}

module.exports = { 
    Players, 
    HumanPlayer, 
    ComputerPlayer
};

const compPlayer = new ComputerPlayer("Hard"); 

console.log(compPlayer);

