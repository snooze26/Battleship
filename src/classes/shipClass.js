class Ship {
    constructor(type, length, hits=0,sunk=false, id=null, status="Afloat") {
        this.type = type;
        this.length = length; 
        this.hits = hits;
        this.sunk = sunk
        this.id = id
        this.status = status
    }

    hit() { 
        this.hits++
    }

    isSunk() { 
        if(this.hits == this.length) { 
            return true
        }
        return false
    }

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

testC.hits = 5; 

const shipIs = testC.isSunk();

module.exports = {
    Ship, 
    Carrier,
    Battleship, 
    Destroyer, 
    Submarine,
    Patrol
}