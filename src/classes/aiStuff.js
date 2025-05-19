function getStateOfGame(playerBoard) { 
    const gameFeed = []; 

    for(let y = 0; y < playerBoard.length; y++) {
        for(let x = 0; x < playerBoard.length; x++) { 
            const cell = playerBoard[x][y]; 

            if(cell === "H" || cell === "M" ) { 
                gameFeed.push({
                    x, 
                    y, 
                    result: cell === "H" ? "hit" : "miss"
                })
            }
        }
    }

    return { 
        boardSize : playerBoard.length;
        gameHistory : gameFeed;
    }
}