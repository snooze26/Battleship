// dynamic answers for tests prompts 
let answers = { 
    restart: "Y",
    player1: "Tom",
    player2: "Jerry", 
    difficulty: "Easy"
};

jest.mock('prompt-sync' , () => { 
    return () => { 
        return (question) => { 
            if(question.includes("Restart")) return answers.restart;
            if(question.includes("Player 1")) return answers.player1;
            if(question.includes("Player 2")) return answers.player2;
            if(question.includes("difficulty")) return answers.difficulty;
            return ""; 
        }
    }
})

const GameManager = require('./gameManager');
const Players = require('./players');
const Ships = require('./shipClass.js')


//get player1 and player2 and chooseGameMode
// test("Player 1 and 2 has been retrieved", () => {
//     GameManager.gameManager.chooseGameMode("PVP"); 
//     const p1 = GameManager.gameManager.getPlayer1();
//     const p2 = GameManager.gameManager.getPlayer2();

//     expect(p1.name).toBe("Tom");
//     expect(p2.name).toBe("Jerry");
// })
// // get player 1 and computer player chooseGameMode 
// test("Game Mode is PVC and there are two human players" , () => {
//     GameManager.gameManager.chooseGameMode("PVC"); 
//     const p1 = GameManager.gameManager.getPlayer1();
//     const p2 = GameManager.gameManager.getPlayer2();

//     expect(p1.name).toBe("Tom");
//     expect(p2.name).toBe("Computer")
// });
//switchTurn/getCurrentPLayer
// test("Current Player Switchers from p1 to p2 " , () => {
//     GameManager.gameManager.chooseGameMode("PVP"); 
//     const p1 = GameManager.gameManager.getPlayer1();
//     const p2 = GameManager.gameManager.getPlayer2();

//     let currentP = GameManager.gameManager.getCurrentPlayer();
//     expect(currentP.name).toBe("Tom");

//     GameManager.gameManager.switchTurn(); 

//     currentP = GameManager.gameManager.getCurrentPlayer(); 
//     expect(currentP.name).toBe("Jerry");

//     GameManager.gameManager.switchTurn(); 

//     currentP = GameManager.gameManager.getCurrentPlayer(); 
//     expect(currentP.name).toBe("Tom");

// });
// //getOpponent 
//     test("Get the opponent" , () => { 
//         GameManager.gameManager.chooseGameMode("PVP"); 
//         const p1 = GameManager.gameManager.getPlayer1();
//         const p2 = GameManager.gameManager.getPlayer2();

//         let opponent = GameManager.gameManager.getOpponent(p1); 
//         expect(opponent.name).toBe("Jerry"); 

//         opponent = GameManager.gameManager.getOpponent(p2); 
//         expect(opponent.name).toBe("Tom");
//     })


//endGame
    // test("Get the opponent" , () => { 
    //     GameManager.gameManager.chooseGameMode("PVP"); 
    //     const p1 = GameManager.gameManager.getPlayer1();
       
    //     const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

    //     GameManager.gameManager.endGame(p1);

    //     expect(spy).toHaveBeenCalledWith("Tom has won this battle.")

    //     spy.mockRestore();
    // });


// //placeShip
//     test("Place the ship" , () => {
//         GameManager.gameManager.chooseGameMode("PVP"); 
//         const p1 = GameManager.gameManager.getPlayer1();
//         const p2 = GameManager.gameManager.getPlayer2();
//         const testCoords = [[4,5] , [4,6] , [4,7]]
//         const [x , y] = testCoords[0];
//         const testShip = new Ships.Submarine();
        
//         GameManager.gameManager.placeShip(p1, testCoords, testShip);

//         // make sure spots are being filled 
//         expect(p1.battleField.bField[x][y]).toEqual(testShip.id);
//         //checks to see if shipsAfloat is being tracked 
//         expect(p1.battleField.ships.shipsAfloat).toEqual(1);
//         //checks to see if coords are being captured
//         expect(p1.battleField.ships[testShip.id]).not.toEqual(0);

//     })
//runGame 
//         test("Run the game" , () => { 
//         GameManager.gameManager.chooseGameMode("PVP"); 
//         const p1 = GameManager.gameManager.getPlayer1();
//         const p2 = GameManager.gameManager.getPlayer2();

//         const testCoords = [[4,5] , [4,6] , [4,7]]
//         const testShip = new Ships.Submarine();

//         const spy = jest.spyOn(console, 'log').mockImplementation(() => {});

//         //place ship for player 1 making the shipsAfloat 1 while player 2 is at 0 
//         GameManager.gameManager.placeShip(p1, testCoords, testShip);
//         //player two should lose and game should end since player 2 has no ships afloat 
//         GameManager.gameManager.runGame(); 
//         //game should be logging the winner 
//         expect(spy).toHaveBeenCalledWith("Tom has won this battle.")
//         })

