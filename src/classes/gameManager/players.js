class Players {
    constructor(name , difficulty){ 
        this.name = name;
        this.difficulty = difficulty; 
    }
}

class HumanPlayer extends Players {
    constructor(name) { 
        super(name , null)
    }
}

class ComputerPlayer extends Players {
    constructor(name , difficulty) { 
        super(name , difficulty); 
    }

    // add a function that make sure the difficulty is either "hard" or "easy"}
}

const humanPlayer = new HumanPlayer("Tony the tiger"); 
console.log(humanPlayer); 

const computerPlayer = new ComputerPlayer("Tony the bot " , "hard");
console.log(computerPlayer);