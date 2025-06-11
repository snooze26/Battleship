const gameManager = require('./gameManager');
const Players = require('./players');

jest.mock('prompt-sync' , () => { 
    return () => { 
        return (question) => { 
            if(question.includes("Player 1")) return "Tom";
            if(question.includes("Player 2")) return "Jerry"; 
            if(question.includes("difficulty")) return "Easy";
            return ""; 
        }
    }
})

// chooseGameMode 
test("Game Mode is PVP and there are two human players" , () => {

}) 
//switchTurn 

//getOpponent 

//endGame

//placeShip

//runGame 