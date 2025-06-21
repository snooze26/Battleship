export class Ship {
    constructor(type, length, hits=0,sunk=false, id=null) {
        this.type = type;
        this.length = length; 
        this.hits = hits;
        this.sunk = sunk
        this.id = id
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

 export class Carrier extends Ship { 
    constructor() {
        super("Carrier" , 5)
    }
} 

export class Battleship extends Ship { 
    constructor() {
        super("Battleship" , 4)
    }
} 

export class Destroyer extends Ship { 
    constructor() {
        super("Destroyer" , 3)
    }
} 

export class Submarine extends Ship { 
    constructor() {
        super("Submarine" , 3)
    }
} 

export class Patrol extends Ship { 
    constructor() {
        super("Patrol" , 2)
    }
} 

