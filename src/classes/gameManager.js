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
    let currentPlayer;

    
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

        currentPlayer = player1; 

    }

        // run placeShip 
        // run runGame 
    function placeShip() { 
        return player1.battleField.placeShip(coords, ship);
    };

    function runGame() { 
        let gameOver = true;
        while(gameOver) { 
            currentPlayer.Players.takeTurn(currentPlayer)
            if(player1.Battle_Field.ships.shipsAfloat === 0) { 
                console.log("Inside of first if statement"); 
                //run endGame here 
                //break
            }else if(player2.Battle_Field.ships.shipsAfloat === 0) { 
                //run endGame here
                //break
            }

            // run switchTurn 
        }
    }

    function switchTurn() { 
        if(currentPlayer === player1) { 
            currentPlayer = player2; 
            console.log("SWITCH TO PLAYER 2", currentPlayer.name);


        } else {
            currentPlayer = player1; 
            console.log("SWITCH TO PLAYER 1", currentPlayer.name);

        }
    }

    function getOpponent(player) { 
        if (player === player1) { 
            return player2; 
        } else if (player === player2){ 
            return player1; 
        }
    }

    function getCurrentPlayer() { 
        return currentPlayer; 
    }

    function restartGame() { 
        const restart = prompt("Restart game?")
        if(restart) { 
            // run init 
        }
    }
    return {
        chooseGameMode, 
        getCurrentPlayer,
        getOpponent, 
        placeShip, 
        runGame, 
        switchTurn

    }
})();


const testGameMode = "PVP"

gameManager.chooseGameMode(testGameMode);

const currentP = gameManager.getCurrentPlayer();
const opponent = gameManager.getOpponent(currentP);


console.log("Current Player:", currentP.name);
console.log("Opponent Player:", opponent.name);



//REMEMBER TO TEST USE NODE not NODEMON 