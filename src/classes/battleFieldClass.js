import { error } from "console";

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

    getCell(input) { 
        // check if input is not a string 
        if(typeof input !== "string") return console.error("Please enter a valid location 'x,x");
        
        //split coords into two elements 
        const coords = input.split('-');
        if(!coords.length == 2) return console.error("Please enter a valid location 'x");

        //change coords to numbers
        const xNumber = parseInt(coords[0].trim(), 10);
        const yNumber = parseInt(coords[1].trim(), 10);

        //chech if coords are number 
        if(!Number.isInteger(xNumber)) return console.error('Please list a valid x coordinate');
        if(!Number.isInteger(yNumber)) return console.error('Please list a valid y coordinate');
        
        // return coords
        return [xNumber , yNumber]; 
    }

    noShipsAfloat(){ 
        return this.ships.shipsAfloat === 0;
    }

    howManyShips() { 
        return this.ships.shipsAfloat; 
    }

    getBattleField() { 
        return this.bField;
    }

    isCoordsFree(coords) { 
        const freeCoords = coords.filter(coordinate => {
            sepNums = coords.split("-");
            const [x , y] = sepNums; 
            const cell = this.getCell(x , y); 

            return cell === "-" && cell !== "X";
        });
        return freeCoords.length === coords.length;
    }

    isCoordsFreeAndValid(coords) { 
        return coords.every(coord => {
            const [x , y] = coord.split('-').map(Number);
            return this.validLocation([x ,y]) && this.bField[x][y] === '-'; 
        })
    }
    clearBoard() { 
        this.bField = this.createBattleField(this.row , this.col);
        this.attackCords = []; 
        this.ships.shipsAfloat = 0;
    }
}



// const testBfieldd = new Battle_Field(10, 10); 
// const input = '10-10';

// console.log(testBfieldd.getCoords(input));