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
}

const testBfieldd = new Battle_Field(10, 10); 


console.log(testBfieldd);