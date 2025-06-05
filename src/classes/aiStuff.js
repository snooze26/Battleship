const Battle_Field = require('./battleFieldClass.js');
const Ships = require('./shipClass.js')
require('dotenv').config();  // Just require and configure dotenv

const OPENAI_API_KEY =  process.env.OPENAI_API_KEY;
console.log("Loaded API key:", OPENAI_API_KEY ? "Yes" : "No"); // Check if loaded (don't log the key itself)

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

    // line 38 is maping through ganeFeed in getStateOfGame function. 

    return ` You are playing BattleShip as an AI. The board is gameBoard size x gameBoard . 
    Based on the previous moves shown below, suggest the next best move (x and y coords) that hasn't been tried yet. 

    Previous moves:

    ${gameState.gameHistory.map(m => `(${m.x},${m.y}) - ${m.result}`).join("\n")} 

    Your response must be ONLY a JSON object on a single line, like this: {"x": 3, "y": 4}
    Do NOT include any explanation or text — just the JSON`;
}

async function getNextMove(prompt) { 
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST", 
        headers:{
         "Content-Type": "application/json", 
        "Authorization": "Bearer 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",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", 
            messages: [{role: "user" , content: prompt}], 
            temperature: 0.2,
        })
    }); 

    const data = await response.json(); 
    const match = data.choices[0].message.content.match(/"x":\s*(-?\d+),\s*"y":\s*(-?\d+)/);
    // console.log(match);
    if(match) { 
        return {x: parseInt(match[1], 10), y: parseInt(match[2], 10)};
    } else { 
        console.error("Invalid AI Response");
        return null;
    }

}



// mock data 
const bfTest = new Battle_Field(10 , 10); 
const testCoords = [[4 ,3], [4 ,4] , [4 ,5] , [4 ,6] , [4 ,7]]; 
const [x , y] = testCoords[0]; 
const testShip = new Ships.Carrier();
bfTest.placeShip(testCoords , testShip); 
bfTest.attack([4 ,2]);
bfTest.attack([4 ,7]);
bfTest.attack([4 , 1]);

const gameState = getStateOfGame(bfTest);
console.log(gameState);

const aiPrompt = makeAiPrompt(gameState);

const testNextMove = getNextMove(aiPrompt);

module.exports = { 
    getStateOfGame, 
    makeAiPrompt, 
    getNextMove
}


