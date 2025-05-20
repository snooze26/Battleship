const Battle_Field = require('./battleFieldClass.js');
const Ships = require('./shipClass.js')

function getStateOfGame(playerBoard) { 
    const gameFeed = []; 
    

    for(let y = 0; y < playerBoard.row; y++) {
        for(let x = 0; x < playerBoard.row; x++) { 
            const cell = playerBoard.bField[x][y]; 
            if(cell === "H" || cell === "M" ) { 
                gameFeed.push({
                    x, 
                    y, 
                    result: cell === "H" ? "hit" : "miss"
                })
            }
        }
    }

    // console.log(gameFeed);
    return { 
        boardSize : playerBoard.row,
        gameHistory : gameFeed
    }
    
}

function makeAiPrompt(gameState) { 

    return ` You are playing BattleShip as an AI. The board is gameBoard size x gameBoard . 
    Based on the previous moves shown below, suggest the next best move (x and y coords) that hasn't been tried yet. 

    Previous moves:

    ${gameState.gameHistory.map(m => `(${m.x},${m.y}) - ${m.result}`).join("\n")}

    Respond with JSON in this formate: { "x": number, "y" : number }`;
}



// mock data 
const bfTest = new Battle_Field(10 , 10); 
const testCoords = [[4 ,3], [4 ,4] , [4 ,5] , [4 ,6] , [4 ,7]]; 
const [x , y] = testCoords[0]; 
const testShip = new Ships.Carrier();
bfTest.placeShip(testCoords , testShip); 
bfTest.attack([4 ,3]);
bfTest.attack([4 ,5]);
bfTest.attack([4 , 1]);

const gameState = getStateOfGame(bfTest);

const aiPrompt = makeAiPrompt(gameState);
console.log(aiPrompt);

