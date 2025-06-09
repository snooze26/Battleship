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

    function placeShip() { 
        return player1.Battle_Field.placeShip(coords , ship);
    };

    return {
        chooseGameMode, 
        placeShip
    }
})();

const testGameMode = "PVC";
const testShip = new Ships.Battleship; 
const testPlayer1 = new Players.HumanPlayer("Tom");
testPlayer1.placeShip([4, 4] , [4 , 5] , [4,6], [4 , 7]);

console.log(testPlayer1);
// gameManager.chooseGameMode(testGameMode); 
