import Battle_Field from './battleFieldClass.mjs';
import * as Ships from './shipClass.mjs';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

console.log("Loaded API key:", OPENAI_API_KEY ? "Yes" : "No"); // Confirm key is loaded (not printing it)

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
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
        })
    });

    const data = await response.json();
    const match = data.choices[0].message.content.match(/"x":\s*(-?\d+),\s*"y":\s*(-?\d+)/);

    if (match) {
        return { x: parseInt(match[1], 10), y: parseInt(match[2], 10) };
    } else {
        console.error("Invalid AI Response");
        return null;
    }
}

export {
    getStateOfGame,
    makeAiPrompt,
    getNextMove
};
