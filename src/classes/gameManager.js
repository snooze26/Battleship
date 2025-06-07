const Battle_Field = require('./battleFieldClass.js');
const Ships = require('./shipClass.js')
const Players = require('./players.js')
const prompt = require('prompt-sync')({ sigint: true });

const gameManager = (function () {
    //variables 
    let difficulty;
    let gameMode; 
    let player1; 
    let player2;
    
    function chooseGameMode(mode) { 
        gameMode = mode; 
        if (gameMode === "PVP") { 
            let p1Name = prompt("Player 1 Enter Name: "); 
            player1 = new Players.HumanPlayer(p1Name); 
            
            let p2Name = prompt("Player 2 Enter Name: "); 
            player2 = new Players.HumanPlayer(p2Name); 

        } else if ( gameMode === "PVC") {
            let p1Name = prompt("Player 1 Enter Name: "); 
            player1 = new Players.HumanPlayer(p1Name); 

            difficulty = prompt("Select computer's difficulty: Hard or Easy "); 
            player2 = new Players.ComputerPlayer("Computer" , difficulty); 
         }

         let currentPlayer = player1;
         // run placeShip
         // run runGame 
    }

    return {
        chooseGameMode
    }
})();

const testGameMode = "PVC";

gameManager.chooseGameMode(testGameMode); 
