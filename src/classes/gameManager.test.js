const GameManager = require('./gameManager');
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
//get player1 and player2
test("Player 1 and 2 has been retrieved", () => {
    GameManager.gameManager.chooseGameMode("PVP"); 
    const p1 = GameManager.gameManager.getPlayer1();
    const p2 = GameManager.gameManager.getPlayer2();

    expect(p1.name).toBe("Tom");
    expect(p2.name).toBe("Jerry");
})
// // chooseGameMode 
// test("Game Mode is PVP and there are two human players" , () => {
//     const testMode ="PVP"; 

//     GameManager.gameManager.chooseGameMode(testMode); 
//     expect(player1.name).toBe("Tom");
//     expect(player.name).toBe("Jerry");
// }) 
//switchTurn 

//getOpponent 

//endGame

//placeShip

//runGame 