// const Battle_Field = require(`../classes/battleFieldClass`);
// const Ships = require(`../classes/shipClass.js`);
// const Players = require(`../classes/players.js`);
//EVENTuALLY CHANGE THIS MODULE NAME TO UIUTILS

function getGameBoard(boardId) { 
    const board = document.querySelector(boardId); 
    return board;
}


//creating link to the DOM 
function createBoard(boardId) { 
    const board = getGameBoard(boardId); // creates board 
    for (let y = 0; y < 10; y++) { // row
        for (let x = 0; x < 10; x++) { // columns 
        const cell = document.createElement('div');
        console.log(cell)
        cell.classList.add('cell'); // add cell style to cell 
        //gather cell coords 
        cell.dataset.x = x; 
        cell.dataset.y = y 
        board.appendChild(cell);
        }
    }
}

function setUpCellClick(boardId , callback) { 
    const board = getGameBoard(boardId); 
    
    const cells = board.querySelectorAll('.cell'); 

    cells.forEach(cell => {
        cell.addEventListener("click" , () => { 
            const x = parseInt(cell.dataset.x); // capture's x value 
            const y = parseInt(cell.dataset.y); // capture's y value
 
        if(cell.classList.contains("clicked")) return; // returns if cell has alreadt been clicked 

        cell.classList.add("clicked"); // marks cell as clicked 

        callback(x , y , cell); // passes x, y, and cell into whichever function is using setupClick 
        })
    });
}

function renderHitMiss(cell , isHit) { 
    if(isHit) { 
        cell.classList.add("hit");
        cell.textContent = "H"; 
    } else { 
        cell.classList.add("miss"); 
        cell.textContent = "M"; 
    }
}

function showMessage(message) { 
    const messageBox = document.querySelector("#messageBox");
    const messageText = document.querySelector("#message")
    if(messageBox && messageText) { 
        messageText.textContent = message; 
        messageBox.style.display = "flex"; 
        messageBox.classList.add("visible");

        setTimeout(() => { 
            messageBox.classList.add("hideMessage");
            messageText.style.display = "none"; 
        } , 3000)
    }
}

const testMessage = "HEYA THERE!!!!";




// document.addEventListener("DOMContentLoaded" , () => {
//     const board = getGameBoard("#player1Board"); 
//     console.log(getGameBoard('#player1Board'));

// })
createBoard('#player1Board');
createBoard('#player2Board');
showMessage(testMessage);


//setUpClick DEMO
// setUpCellClick('#player2Board', (x, y, cell) => {
// });
// setUpCellClick('#player1Board', (x, y, cell) => {
// });

//renderhitmiss DEMO
// setUpCellClick('#player2Board', (x, y, cell) => {
//     //live version will have hit = gameManager.attackPlayer(x , y); 
//     renderHitMiss(cell , hit);
// });
// setUpCellClick('#player1Board', (x, y, cell) => {
//     //live version will have hit = gameManager.attackPlayer(x , y)
//     renderHitMiss(cell , hit);
// });
