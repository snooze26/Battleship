const Battle_Field = require('../battleFieldClass.js');
const Ships = require('../shipClass.js')
const AI = require('../aiStuff.js');
const Players = require('./players.js')


test("Ship has been attacked by player and marked as 'H' " , () => {

const humanPlayer = new Players.HumanPlayer("Tony the tiger"); 
const computerPlayer = new Players.ComputerPlayer("Tony the bot " , "easy");

const testPatrol = new Ships.Patrol(); 
const testPatrolCoords = [[4,4] , [4 , 5]]; 


// place ships on computer player's board 
computerPlayer.battleField.placeShip( testPatrolCoords , testPatrol);

const carrier = new Ships.Carrier();
const battleShip = new Ships.Battleship(); 

const attackCoords = [4,4];

//human player attacks 
humanPlayer.takeTurn(computerPlayer, attackCoords);

const resultCell = computerPlayer.battleField.getBattleField()[4][4]

expect(resultCell).toBe("H")

})
