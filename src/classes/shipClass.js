export class Ship {
    constructor(type, length, hits=0,sunk=false) {
        this.type = type;
        this.length = length; 
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



console.log(testC.type , testC.length)
console.log(testB.type , testB.length)
console.log(testD.type , testD.length)
console.log(testS.type , testS.length)
console.log(testP.type , testP.length)