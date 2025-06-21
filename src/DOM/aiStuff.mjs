import Battle_Field from './battleFieldClass.mjs';
import * as Ships from './shipClass.mjs';



function getStateOfGame(playerBoard) {
    const gameFeed = [];

    for (let y = 0; y < playerBoard.row; y++) {
        for (let x = 0; x < playerBoard.row; x++) {
            const cell = playerBoard.bField[x][y];
            if (cell === "H" || cell === "M") {
                gameFeed.push({
                    x,
                    y,
                    result: cell === "H" ? "hit" : "miss"
                });
            }
        }
    }

    return {
        boardSize: playerBoard.row,
        gameHistory: gameFeed
    };
}

function makeAiPrompt(gameState) {
    return `You are playing BattleShip as an AI. The board is gameBoard size x gameBoard. 
Based on the previous moves shown below, suggest the next best move (x and y coords) that hasn't been tried yet.

Previous moves:
${gameState.gameHistory.map(m => `(${m.x},${m.y}) - ${m.result}`).join("\n")}

Your response must be ONLY a JSON object on a single line, like this: {"x": 3, "y": 4}
Do NOT include any explanation or text — just the JSON`;
}

async function getNextMove(prompt) {
    try { 
    const response = await fetch("http://localhost:3000/api/next-move", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

        },
        body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    const match = data.choices[0].message.content.match(/"x":\s*(-?\d+),\s*"y":\s*(-?\d+)/);

    if (match) {
        return { x: parseInt(match[1], 10), y: parseInt(match[2], 10) };
    } else {
        console.error("Invalid AI Response");
        return null;
    }
}catch (error) { 
    console.error("Failed to fetch move from backend: ", error);
    return null; 
}
}

export {
    getStateOfGame,
    makeAiPrompt,
    getNextMove
};

getNextMove(`Previous moves:
(0,0) - miss
(0,1) - hit

Your response must be ONLY a JSON object on a single line, like this: {"x": 3, "y": 4}
Do NOT include any explanation or text — just the JSON`)
.then(move => console.log("AI move:", move));
