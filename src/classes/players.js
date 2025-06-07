const Battle_Field = require('./battleFieldClass.js');
const Ships = require('./shipClass.js')


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
        this.battleField = new Battle_Field(10 , 10);
    }
}
//create computer player
class ComputerPlayer extends Players {
    constructor(name , difficulty) { 
        super(name , difficulty); 
        this.battleField = new Battle_Field(10 , 10);
    }

    takeTurn(opponent) { 
        let move; 
        if(difficulty === "Easy") { 
            move = [Math.floor(Math.random() * 8) , Math.floor(Math.random() * 8)];
        }else if (this.difficulty === "Hard") { 
            // move smartMove(move)
        }

        opponent.battleField.attack(move)
    }
}

module.exports = { 
    Players, 
    HumanPlayer, 
    ComputerPlayer
}
