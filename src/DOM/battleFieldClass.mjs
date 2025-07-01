import * as Ships from './shipClass.mjs';

class Battle_Field {
    bField;
    attackCords = [];
    ships = {
        shipsAfloat: 0
    };

    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.bField = this.createBattleField(this.row, this.col);
    }

    // 1. create Battle Field 
    createBattleField(row, col) {
        return [...Array(row)].map(() => Array(col).fill("-"));
    }

    validLocation(position) {
        if (!Array.isArray(position) || position.length !== 2) {
            console.error("Invalid position", position);
            return false;
        }

        const [x, y] = position;
        const boardLimit = 8;
        if ((x >= 0 && x < boardLimit) && (y >= 0 && y < boardLimit)) return true;
        return false;
    }

    getCell(input) {
        // check if input is not a string 
        if (typeof input !== "string") return console.error("Please enter a valid location 'x,x");

        //split coords into two elements 
        const coords = input.split('-');
        if (!(coords.length === 2)) return console.error("Please enter a valid location 'x");

        //change coords to numbers
        const xNumber = parseInt(coords[0].trim(), 10);
        const yNumber = parseInt(coords[1].trim(), 10);

        //check if coords are number 
        if (!Number.isInteger(xNumber)) return console.error('Please list a valid x coordinate');
        if (!Number.isInteger(yNumber)) return console.error('Please list a valid y coordinate');

        // return coords
        return [xNumber, yNumber];
    }

    noShipsAfloat() {
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
            const [xNumber, yNumber] = coordinate.split('-');
            const x = parseInt(xNumber, 10);
            const y = parseInt(yNumber, 10);

            if (!this.validLocation([x, y])) return false;

            const cell = this.bField[x][y];
            return cell === '-';

        });
        return freeCoords.length === coords.length;
    }

    isCoordsFreeAndValid(coords) {
        return coords.every(coord => {
            let x, y;

            if (typeof coord === 'string') {
                [x, y] = coord.split("-").map(Number);
            } else if (Array.isArray(coord)) {
                [x, y] = coord;
            } else {
                return false;
            }
            return this.validLocation([x, y]) && this.bField[x][y] === '-';
        });
    }

    clearBoard() {
        this.bField = this.createBattleField(this.row, this.col);
        this.attackCords = [];
        this.ships.shipsAfloat = 0;
    }

    retrieveSurroundingBlockCells(coords) {
        // create surround cells intervals 
        const surroundingCells = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], /* skip center */ [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];
        // create and assign x/y coords 
        let x, y;
        if (typeof coords === 'string') {
            const coord = coords.split('-');
            x = parseInt(coord[0], 10);
            y = parseInt(coord[1], 10);
        } else {
            x = coords[0];
            y = coords[1];
        }

        // create to take in valid coords 
        const validSurroundingCoords = [];

        // adding the intervals to the x and y coordinates 
        for (const [dx, dy] of surroundingCells) {
            const newX = x + dx;
            const newY = y + dy;
            //checking if the surrounding coords are valid 
            if (this.validLocation([newX, newY])) {
                //add surrounding coords to valid coords array 
                validSurroundingCoords.push([newX, newY]);
            }
        }

        //return the array
        return validSurroundingCoords;
    }

    blockOffShip(coords) {
        // get surrounding cells 
        const surroundingCells = this.retrieveSurroundingBlockCells(coords);
        const blockedCells = [];
        for (const cell of surroundingCells) {
            let x, y;
            // if cell is a string convert it to an array of numbers 
            if (typeof cell === 'string') {
                const coord = coords.split('-');
                x = parseInt(coord[0], 10);
                y = parseInt(coord[1], 10);
            } else {
                // if cell is array already just assign 
                [x, y] = cell;
            }

            if (this.validLocation([x, y])) {
                this.bField[x][y] = "X";
                blockedCells.push([x, y]);
            }
        }
        return blockedCells;
    }

    placeShip(coords, ship) {
        // check if coords length is equal to the length of ship 
        if (coords.length !== ship.length) {
            console.error(`The ${ship.type} does not fit there.`);
            return false;
        }
        //check if the coords are free and valid 
        if (!this.isCoordsFreeAndValid(coords)) {
            console.error(`These are not valid coordinates : ${coords}`);
            return false;
        }
        // place ship on board 
        //block of surround cells 
        let blockedCells = [];
        for (const coord of coords) {
            const cells = this.blockOffShip(coord);
            blockedCells.push(...cells);
        }

        for (const [x, y] of coords) {
            this.bField[x][y] = ship.id;
        }
        // update ship tracking 
        ship.shipCoords = coords;
        ship.blockedCells = blockedCells;
        this.ships.shipsAfloat++;
        this.ships[ship.id] = ship;

        return { shipCoords: coords, blockedCells: blockedCells };
    };

    attack(coords) {
        if (!this.validLocation(coords)) return false;
        // assigning x and y to coords 
        // can change to getCell(coords)
        const [x, y] = coords;
        const coordKey = `${x}-${y}`;
        //check if the cell has been attacked already 
        if (this.attackCords.includes(coordKey)) return false;
        //register attack 
        this.attackCords.push(coordKey);

        const cell = this.bField[x][y];
        // MISS
        if (cell === '-' || cell === 'X') {
            this.bField[x][y] = "M";
            return "Enemy avoided contact.";
        }

        // HIT
        const shipId = cell;
        const ship = this.ships[shipId];
        ship.hit();
        this.bField[x][y] = "H";

        // SHIP SUNK
        if (ship.isSunk()) {
            --this.ships.shipsAfloat;
            return `${ship.type} has been destroyed!`;
        }

        return `${ship.type} has been hit.`;
    }

    // Helper function to visualize battlefield
    printBattleField(field) {
        console.log('\nBattlefield:');
        console.log('   0 1 2 3 4 5 6 7 8 9');
        console.log('  ----------------');
        field.forEach((row, rowIndex) => {
            const rowStr = row.map(cell => {
                if (cell === '-' || cell === 'X') return '.';
                return cell;
            }).join(' ');
            console.log(`${rowIndex} | ${rowStr}`);
        });
    }
}

export default Battle_Field;
