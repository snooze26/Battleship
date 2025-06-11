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
    function placeShip(player, coords, ship) { 
        return player.battleField.placeShip(coords, ship);
    };

    function runGame() { 
        let gameOver = false;
        while(!gameOver) { 
            currentPlayer.takeTurn(gameManager.getOpponent(currentPlayer))
            player1.battleField.ships.shipsAfloat = 1; 
            player2.battleField.ships.shipsAfloat = 1; 

            if(player1.battleField.ships.shipsAfloat === 0) { 
                endGame(player2);
                break;
            }else if(player2.battleField.ships.shipsAfloat === 0) { 
                endGame(player1); 
                break; 
            }
                switchTurn(); 
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
        if(restart === "Y" || restart === "y") { 
            init(); 
        }; 
    }

    function endGame(winner) { 
        console
        console.log((`${winner.name} has won this battle.`));
        restartGame(); 
        //showRestartButton() 
    }

    function init() { 
        const mode = prompt("Choose game mode, PVP or PVC");
        chooseGameMode(mode); 
    }


    return {
        chooseGameMode, 
        endGame,
        getCurrentPlayer,
        getOpponent, 
        init, 
        placeShip, 
        restartGame,
        runGame, 
        switchTurn

    }
})();


const testGameMode = "PVP"
const testPlayer = new Players.HumanPlayer("Langdon");
testPlayer.battleField.ships.shipsAfloat = 2; 

gameManager.chooseGameMode(testGameMode);

// gameManager.restartGame();
gameManager.runGame();
//TEST RESTART, ENDGAME, AND INIT 

//REMEMBER TO TEST USE NODE not NODEMON 