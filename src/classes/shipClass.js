class Ship {
    constructor(type, length, hits=0,sunk=false, id=null) {
        this.type = type;
        this.length = length; 
        this.hits = hits;
        this.sunk = sunk;
        this.id = id;
        this.shipCoords = [];
    }

    hit() { 
        this.hits++
        if(this.isSunk()) { 
            this.sunk = true 
        }
    }

    isSunk() { 
        if(this.hits == this.length) { 
            return true
        }
        return false
    }

    getStatus() { 
        const percentNum = this.length - this.hits; 
        const res = percentNum / this.length
        const percentage = (res * 100).toFixed(0);
        return `${percentage}% health`; 
    }

    get status() { 
        return this.getStatus();
    };

}

 class Carrier extends Ship { 
    constructor() {
        super("Carrier" , 5)
    }
} 

 class Battleship extends Ship { 
    constructor() {
        super("Battleship" , 4)
    }
} 

 class Destroyer extends Ship { 
    constructor() {
        super("Destroyer" , 3)
    }
} 

 class Submarine extends Ship { 
    constructor() {
        super("Submarine" , 3)
    }
} 

 class Patrol extends Ship { 
    constructor() {
        super("Patrol" , 2)
    }
} 

const testC = new Carrier(); 
const testB = new Battleship(); 
const testD = new Destroyer(); 
const testS = new Submarine(); 
const testP = new Patrol(); 

testC.hits = 0; 


module.exports = {
    Ship, 
    Carrier,
    Battleship, 
    Destroyer, 
    Submarine,
    Patrol
}