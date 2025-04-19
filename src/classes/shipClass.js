export class Ship {
    constructor(type, length, hits=0,sunk=false) {
        this.type = type;
        this.length = length; 
        this.hits = hits;
        this.sunk = sunk
    }

    hit() { 
        this.hits++
    }

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

const testC = new Carrier(); 
const testB = new Battleship(); 
const testD = new Destroyer(); 
const testS = new Submarine(); 
const testP = new Patrol(); 

console.log(testC.hits)