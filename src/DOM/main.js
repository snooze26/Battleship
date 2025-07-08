import { gameManager } from './gameManager.mjs';
import uiUtils from './uiUtils.js';
import { Carrier, Battleship, Destroyer, Submarine, Patrol } from './shipClass.mjs';

let currentPhase = 'placement'; // keep track of game (battle or placement) 


document.addEventListener("DOMContentLoaded" , () => {
    // gameManager.init(); 

    // const player1 = gameManager.getPlayer1(); 
    // const player2 = gameManager.getPlayer2(); 

    // player1.cellGrid = uiUtils.createBoard("#player1Board"); 
    // player2.cellGrid = uiUtils.createBoard("#player2Board"); 

    setUpShips(); // add player1 after testing 
})

function setUpShips(player) { 

    const shipMap = { 
        Carrier: new Carrier(),
        Battleship: new Battleship(), 
        Destroyer: new Destroyer(), 
        Submarine: new Submarine(), 
        Patrol: new Patrol()
    };

    const buttons = document.querySelectorAll(".ships"); 

    let selectedShip = null; 
    let orientation = "horizontal"; 

    buttons.forEach(button => {
        button.addEventListener("click" , () => {
            const shipType = button.dataset.ship; 

            selectedShip = shipMap[shipType]; 
            console.log(`Selected: ${shipType}`);
        })
    });
}

// startBattle() { 

// }

// checkGameEnd() { 

// }