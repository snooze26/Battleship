import { HumanPlayer, ComputerPlayer } from './players.mjs';

const gameManager = (function () {
    let difficulty;
    let gameMode; 
    let player1; 
    let player2;
    let currentPlayer;
    
    function chooseGameMode(mode) { 
        gameMode = mode; 

        if (gameMode === "PVP") { 
            const p1Name = window.prompt("Player 1 Enter Name:"); 
            player1 = new HumanPlayer(p1Name); 
            
            const p2Name = window.prompt("Player 2 Enter Name:"); 
            player2 = new HumanPlayer(p2Name); 

        } else if (gameMode === "PVC") {
            const p1Name = window.prompt("Player 1 Enter Name:"); 
            player1 = new HumanPlayer(p1Name); 

            difficulty = window.prompt("Select computer's difficulty: Hard or Easy"); 
            player2 = new ComputerPlayer("Computer", difficulty); 
        }

        currentPlayer = player1; 
    }

    function placeShip(player, coords, ship) { 
        return player.battleField.placeShip(coords, ship);
    }

    function runGame() { 
        let gameOver = false;

        while (!gameOver) { 
            currentPlayer.takeTurn(gameManager.getOpponent(currentPlayer));

            if (player1.battleField.ships.shipsAfloat === 0) { 
                endGame(player2);
                break;
            } else if (player2.battleField.ships.shipsAfloat === 0) { 
                endGame(player1); 
                break; 
            }

            if (!gameOver) switchTurn(); 
        }
    }

    function switchTurn() { 
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function getOpponent(player) { 
        return player === player1 ? player2 : player1;
    }

    function getCurrentPlayer() { 
        return currentPlayer; 
    }

    function getPlayer1() { 
        return player1;
    }

    function getPlayer2() { 
        return player2;
    }

    function restartGame() { 
        const restart = window.prompt("Restart game? (Y/N)");
        if (restart === "Y" || restart === "y") { 
            init(); 
        }
    }

    function endGame(winner) { 
        console.log(`${winner.name} has won this battle.`);
        restartGame(); 
    }

    function init() { 
        const mode = window.prompt("Choose game mode: PVP or PVC");
        chooseGameMode(mode); 
    }

    return {
        chooseGameMode, 
        endGame,
        getCurrentPlayer,
        getPlayer1, 
        getPlayer2,
        getOpponent, 
        init, 
        placeShip, 
        restartGame,
        runGame, 
        switchTurn
    };
})();

export { gameManager };