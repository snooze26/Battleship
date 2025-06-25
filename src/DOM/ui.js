// Import all relevant ESM modules
import { Ship, Carrier, Battleship, Destroyer, Submarine, Patrol } from "./shipClass.mjs";
import { gameManager } from "./gameManager.mjs";
import { Players, HumanPlayer, ComputerPlayer } from "./players.mjs";
import { getStateOfGame, makeAiPrompt, getNextMove } from "./aiStuff.mjs";
import Battle_Field from "./battleFieldClass.mjs";


// DOM Utilities
function getGameBoard(boardId) {
    return document.querySelector(boardId);
}

function createBoard(boardId) {
    const board = getGameBoard(boardId);
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dataset.y = y;
            board.appendChild(cell);
        }
    }
}

function setUpCellClick(boardId, callback) {
    const board = getGameBoard(boardId);
    const cells = board.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const x = parseInt(cell.dataset.x);
            const y = parseInt(cell.dataset.y);

            if (cell.classList.contains("clicked")) return;

            cell.classList.add("clicked");
            callback(x, y, cell);
        });
    });
}

function renderHitMiss(cell, isHit) {
    if (isHit) {
        cell.classList.add("hit");
        cell.textContent = "H";
    } else {
        cell.classList.add("miss");
        cell.textContent = "M";
    }
}

function showMessage(message) {
    const messageBox = document.querySelector("#messageBox");
    const messageText = document.querySelector("#message");

    if (messageBox && messageText) {
        messageText.textContent = message;
        messageBox.style.display = "flex";
        messageBox.classList.add("visible");

        setTimeout(() => {
            messageBox.classList.add("hideMessage");
            messageText.style.display = "none";
        }, 3000);
    }
}

function renderShips(boardId, ship) {
    const coords = ship.shipCoords;
    const board = document.querySelector(boardId);

    coords.forEach(([x, y]) => {
        const cell = board.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (cell) {
            cell.classList.add("ship");
            cell.classList.add(`ship-${ship.type.toLowerCase()}`);
            cell.dataset.shipType = ship.type;
        }
    });
}

function blurOpponent(currentPlayer, player1, player2) {
    console.log(player2);
    console.log(player1)
    if(player1.battleField) player1.battleField.classList.add("hide");
    if(player2.battleField) player2.battleField.classList.add("hide");

    if (currentPlayer.battleField) currentPlayer.battleField.classList.remove("hide"); 
}


// ======== TEMPORARY TEST LOGIC BELOW ========

document.addEventListener("DOMContentLoaded"  ,() => { 
const testP1 = new HumanPlayer("Tom")
const testP2 = new HumanPlayer("Jerry"); 

const p1Board = "#player1Board"; 
const p2Board = "#player2Board"; 

testP1.battleField = document.querySelector("#player1Board");
testP2.battleField = document.querySelector("#player2Board"); 

createBoard(p1Board);
createBoard(p2Board);


blurOpponent(testP1, testP1, testP2);
})





// EXPORTS (if you want to use this as a module)
export {
    getGameBoard,
    createBoard,
    setUpCellClick,
    renderHitMiss,
    showMessage,
    renderShips,
    blurOpponent
};
