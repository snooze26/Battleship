// const Battle_Field = require(`../classes/battleFieldClass`);
// const Ships = require(`../classes/shipClass.js`);
// const Players = require(`../classes/players.js`);



//creating link to the DOM 
function createBoard(boardId) { 
    const board = document.querySelector(boardId);
    for (let y = 0; y < 10; y++) { 
        for (let x = 0; x < 10; x++) {
        const cell = document.createElement('div');
        console.log(cell)
        cell.classList.add('cell');
        //gather cell coords 
        cell.dataset.x = x;
        cell.dataset.y = y
        board.appendChild(cell);
        }
    }
}

createBoard('#player1Board');
createBoard('#player2Board');