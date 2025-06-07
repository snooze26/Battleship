const Battle_Field = require('./battleFieldClass.js'); 
const Ships = require('./shipClass.js')
const Players = require('./players.js')


// test("Ship has been attacked by player and marked as 'H' " , () => {

// const humanPlayer = new Players.HumanPlayer("Tony the tiger"); 
// const computerPlayer = new Players.ComputerPlayer("Tony the bot " , "easy");

// const testPatrol = new Ships.Patrol(); 
// const testPatrolCoords = [[4,4] , [4 , 5]]; 

// // place ships on computer player's board 
// computerPlayer.battleField.placeShip( testPatrolCoords , testPatrol);

// const attackCoords = [4,4];

// //human player attacks 
// humanPlayer.takeTurn(computerPlayer, attackCoords);

// const resultCell = computerPlayer.battleField.getBattleField()[4][4]

// expect(resultCell).toBe("H")

// })

// test("Ship has been attacked by player and marked as 'M' " , () => {

//     const humanPlayer = new Players.HumanPlayer("Tony the tiger"); 
//     const computerPlayer = new Players.ComputerPlayer("Tony the bot " , "easy");
    
//     const testPatrol = new Ships.Patrol(); 
//     const testPatrolCoords = [[4,4] , [4 , 5]]; 
      
//     // place ships on computer player's board 
//     computerPlayer.battleField.placeShip( testPatrolCoords , testPatrol);
    
//     const attackCoords = [4,6];
    
//     //human player attacks 
//     humanPlayer.takeTurn(computerPlayer, attackCoords);
    
//     const resultCell = computerPlayer.battleField.getBattleField()[4][6]
    
//     expect(resultCell).toBe("M")
// })

// test("Computer ship has been attacked by the computer player and marked as 'H' " , async () => {

//     const mockRandom = jest.fn()
//     .mockReturnValueOnce(0.25) // x = floor(0.1 * 8) = 8
//     .mockReturnValueOnce(0.15); // y = floor(0.2 * 8) = 1 

//     const humanPlayer = new Players.HumanPlayer("Tony the tiger"); 
//     const computerPlayer = new Players.ComputerPlayer("Tony the bot " , "easy", mockRandom);
    
//     humanPlayer.battleField = new Battle_Field(5, 5); 
//     const testD1 = new Ships.Destroyer(); 
//     const testD1Coords = [[2 , 0] , [2 , 1] , [2 , 2]]; 

//     // place ships on computer player's board 
//     humanPlayer.battleField.placeShip( testD1Coords , testD1);

//     // console.log(humanPlayer.battleField()[0][1])
//     //human player attacks 
//     await computerPlayer.takeTurn(humanPlayer);
    
//     const resultCell1 = humanPlayer.battleField.getBattleField()[2][1]

//     expect(resultCell1).toBe("H")
//     // expect(resultCell3).toBe("H")

// })

test("Computer ship has been attacked by the computer player and marked as 'M' " , async () => {

    const mockRandom = jest.fn()
    .mockReturnValueOnce(0.25) // x = floor(0.1 * 8) = 8
    .mockReturnValueOnce(0.15); // y = floor(0.2 * 8) = 1 

    const humanPlayer = new Players.HumanPlayer("Tony the tiger"); 
    const computerPlayer = new Players.ComputerPlayer("Tony the bot " , "easy", mockRandom);
    
    humanPlayer.battleField = new Battle_Field(5, 5); 
    const testD1 = new Ships.Destroyer(); 
    const testD1Coords = [[3 , 3] , [3 , 2] , [3 , 1]]; 

    // place ships on computer player's board 
    humanPlayer.battleField.placeShip( testD1Coords , testD1);

    // console.log(humanPlayer.battleField()[0][1])
    //human player attacks 
    await computerPlayer.takeTurn(humanPlayer);
    
    const resultCell1 = humanPlayer.battleField.getBattleField()[2][1]

    expect(resultCell1).toBe("M")

})