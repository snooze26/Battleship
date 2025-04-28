export class Battle_Field { 
    bField; 
    attackCords = [];
    ships = {
        shipsAfloat : 0
    }

    constructor(row , col) { 
        this.row = row;
        this.col = col;
        this.bField = this.createBattleField(this.row , this.col);

    }
    // 1. create Battle Field 
    createBattleField(row, col) {
        return [...Array(row)].map(() => Array(col).fill("-"));
    }

    validLocation(position) { 
        const boardLimit = 8; 
        const [x, y] = position; 
        if((x >= 0 && x < boardLimit) && (y >= 0 && y < boardLimit)) return true
        return false 
    }
}


// const testBfieldd = new Battle_Field(10, 10); 
// console.log(testBfieldd);