// Imports
import { Ship, Carrier, Battleship, Destroyer, Submarine, Patrol } from "./shipClass.mjs";
import { gameManager } from "./gameManager.mjs";
import { Players, HumanPlayer, ComputerPlayer } from "./players.mjs";
import { getStateOfGame, makeAiPrompt, getNextMove } from "./aiStuff.mjs";
import Battle_Field from "./battleFieldClass.mjs";

const uiUtils = (() => {
    // ========== DOM Helpers ==========

    function getGameBoard(boardId) {
        return document.querySelector(boardId);
    }

    function createBoard(boardId) {
        const board = getGameBoard(boardId);
        const grid = [];
        for (let y = 0; y < 10; y++) {
            const row = [];
            for (let x = 0; x < 10; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                board.appendChild(cell);
                row.push(cell);
            }
            grid.push(row);
        }
        return grid;
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

    function renderShipToUi(player, ship, coords, boardId) {
        const result = player.placeShip(coords, ship);
        if (result) {
            renderShips(boardId, ship);
        }
    }

    function placeAndRenderShip(player, boardId, coords, ship) {
        const result = player.placeShip(coords, ship);
        if (result) {
            renderShips(boardId, ship);
        }
    }

    function blurOpponent(currentPlayer, player1, player2) {
        if (player1.battleField) player1.battleField.classList.add("hide");
        if (player2.battleField) player2.battleField.classList.add("hide");

        if (currentPlayer.battleField) currentPlayer.battleField.classList.remove("hide");
    }

    function resetBoard(boardId) {
        const board = document.querySelector(boardId);
        if (!board) return;

        const cells = board.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.className = 'cell';
            cell.textContent = '';
        });
    }

    function fullReset(player, boardId) {
        resetBoard(boardId);
        player.battleField.clearBoard();
    }

    function clearShipOverLay(boardId) {
        const board = document.querySelector(boardId);
        const cells = board.querySelectorAll('.ship-preview');
        cells.forEach(cell => {
            cell.classList.remove('ship-preview');
        });
    }

    function showShipOverLay(coords, boardId) {
        const board = document.querySelector(boardId);
        if (!boardId) return;

        clearShipOverLay(boardId);
        coords.forEach(([x, y]) => {
            const cell = board.querySelector(`[data-x="${x}"][data-y="${y}"]`);
            if (cell && !cell.classList.contains('ship')) {
                cell.classList.add('ship-preview');
                cell.textContent = "🚢";
            }
        });
    }

    function updateScoreUI(player1, player2) {
        document.querySelector('#p1Score').textContent = player1.score;
        document.querySelector('#p2Score').textContent = player2.score;
    }

    // ========== Test Bootstrapping ==========

    function initTestData() {
        const testP1 = new HumanPlayer("Tom");
        const testP2 = new HumanPlayer("Jerry");

        testP1.cellGrid = createBoard('#player1Board');
        testP2.cellGrid = createBoard('#player2Board');

        testP1.battleField.ships.shipsAfloat = 2;

        testP2.updateScore(testP1);
        updateScoreUI(testP1, testP2);

        const carrier = new Carrier();
        const battleship = new Battleship();
        const destroyer = new Destroyer();
        const submarine = new Submarine();
        const patrol = new Patrol();

        const testCoords = [[4, 5], [4, 6]];

        // testP1.placeShip(testCoords, patrol);
        // renderShips('#player1Board' , patrol);
        showShipOverLay(testCoords, '#player1Board');
    }

    // ========== Initialize on DOM Ready ==========

    document.addEventListener("DOMContentLoaded", () => {
        initTestData(); // remove or disable in production
    });

    // ========== Public API ==========

    return {
        getGameBoard,
        createBoard,
        setUpCellClick,
        renderHitMiss,
        showMessage,
        renderShips,
        blurOpponent,
        showShipOverLay,
        updateScoreUI,
        renderShipToUi,
        placeAndRenderShip,
        resetBoard,
        fullReset,
        clearShipOverLay
    };
})();

export default uiUtils;
