const Battle_Field = require('../battleFieldClass.js');
const Ships = require('../shipClass.js')
const AI = require('../aiStuff.js');


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
        if(difficulty === "easy") { 
            move = [Math.floor(Math.random() * 8) , Math.floor(Math.random() * 8)];
        }else if (this.difficulty === "hard") { 
            // move smartMove(move)
        }

        opponent.battleField.attack(move)
    }
}

const humanPlayer = new HumanPlayer("Tony the tiger"); 
const computerPlayer = new ComputerPlayer("Tony the bot " , "hard");

const carrier = new Ships.Carrier();
const battleShip = new Ships.Battleship(); 

humanPlayer.placeShip([[0 , 0] , [0 , 1] , [0 , 2] ,  [0 , 3], [0 , 4]] , carrier);
computerPlayer.placeShip([[1 , 0] , [1 , 1] , [1 , 2] ,  [1 , 3]] , battleShip);

module.exports = { 
    Players, 
    HumanPlayer, 
    ComputerPlayer
}
