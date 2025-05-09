const Battle_Field = require('./battleFieldClass.js');
const Ships = require('./shipClass.js')
// TESTS FOR VALIDLOCATION 
// test("Location is valid" , () => {
//     const bfTest = new Battle_Field(8 , 8);
//     const testPosition = [6 , 7];
//     expect(bfTest.validLocation(testPosition)).toBe(true); 
// });


// test("Location is inValid" , () => {
//     const bfTest = new Battle_Field(8 , 8);
//     const testPosition = [9 , 9];
//     expect(bfTest.validLocation(testPosition)).toBe(false); 
// });

// TEST GETCELL
// test("Retrieve coordinates" , () => {
//     const bfTest = new Battle_Field(8 , 8);
//     const input = '7-8';
//     const coords = bfTest.getCell(input); 
    
//     expect(coords).toStrictEqual([7, 8]); 

// }) 

// TEST NO SHIPS AFLOAT
// test("There are no ships afloat" , () => { 
//     const bfTest = new Battle_Field(8 , 8)
//     expect(bfTest.noShipsAfloat()).toBe(true); 
// });

// test("There are is 2 ships afloat" , () => { 
//     const bfTest = new Battle_Field(8 , 8)
//     bfTest.ships.shipsAfloat = 2
//     expect(bfTest.noShipsAfloat()).toBe(false); 
// })
// TEST HOW MANY SHIPS ARE ON BATTLE FIELD
// test("How many ships are on the battle field?" , () => {
//     const bfTest = new Battle_Field(8 , 8)
//     bfTest.ships.shipsAfloat = 2
//     expect(bfTest.howManyShips()).toStrictEqual(2);
// })

// TEST RETURN THE BATTL EFIELD 
// test("Get the battle field" , () => {
//     const bfTest = new Battle_Field(8 , 8)

//     expect(bfTest.getBattleField()).toStrictEqual(bfTest.bField); 
// });
// Test isCoordsFree
// test("Get the free coordinates " , () => { 
//     const bfTest = new Battle_Field(8 , 8)
//     const testCoords = ["5-6" , "4-5"];
    
//     expect(bfTest.isCoordsFree(testCoords)).toBe(true);
// });

// test("Get the free coordinates " , () => { 
//     const bfTest = new Battle_Field(8 , 8)
//     const testCoords = ["5-9" , "4-5"];
    
//     expect(bfTest.isCoordsFree(testCoords)).toBe(false);
// });

// TEST isCoordsFreeAnd
// test("Get the free coordinates " , () => { 
//     const bfTest = new Battle_Field(8 , 8)
//     bfTest.bField[7][5] = "-";
//     bfTest.bField[5][5] = "-"; 
//     const testCoords = ["7-5" , "5-5"];
    
//     expect(bfTest.isCoordsFreeAndValid(testCoords)).toBe(true);
// });

// test("Coords are not free " , () => { 
//     const bfTest = new Battle_Field(8 , 8)
//     bfTest.bField[7][5] = "X";
//     bfTest.bField[5][5] = "-"; 
//     const testCoords = ["7-5" , "5-5"];
    
//     expect(bfTest.isCoordsFreeAndValid(testCoords)).toBe(false);

// });

// test("Coords are not free " , () => { 
//     const bfTest = new Battle_Field(8 , 8)
//     const testCoords = ["8-5" , "5-5"];
    
//     expect(bfTest.isCoordsFreeAndValid(testCoords)).toBe(false);

// });
//  Testing clearBoard function 
// test("battleField is clear", () => { 
//     const bfTest = new Battle_Field(8,8);
//     bfTest.bField[4][5] = 'X-X'; 
//     bfTest.bField[7][7] = "X-X";
//     bfTest.ships.shipsAfloat = 5; 
//     bfTest.attackCords = [5,5]
//     bfTest.clearBoard();
//     expect(bfTest.bField[4][5] && bfTest.bField[7][7]).toBe('-');
//     expect(bfTest.ships.shipsAfloat).toBe(0);
//     expect(bfTest.attackCords).toHaveLength(0);
// })

// test("Get surrounding cells" , () => { 
//     const bfTest = new Battle_Field(8 ,8); 
//     const testCoords = [4 , 4]; 
//     const expected = [
//         [3, 3], [3, 4], [3, 5],
//         [4, 3],        [4, 5],
//         [5, 3], [5, 4], [5, 5]
//       ];
//     const res = bfTest.retrieveSurroundingBlockCells(testCoords);
//     expect(res).toEqual(expect.arrayContaining(expected));
// })

// test("Surrounding cells are blocked", () => { 
//     const bfTest = new Battle_Field(8, 8); 
//     const testCoords = [4, 4]; 
//     const blockedCoords = bfTest.blockOffShip(testCoords);

//     for (const coord of blockedCoords) {
//         // if coord is an array return coord if not return numbers split numbers
//         const [x, y] = Array.isArray(coord) ? coord : coord.split('-').map(Number);
//         expect(bfTest.bField[x][y]).toEqual("X");
//     }
// });

test("Ship has been placed", () => { 
    const bfTest = new Battle_Field(8 , 8); 
    const testCoords = [[4 ,3] , [4 , 4] , [4 ,5] , [4 , 6] , [4 ,7]]; 
    const [x , y] = testCoords[0]; 
    const testShip = new Ships.Carrier();
    const blockedCoords = bfTest.blockOffShip(testCoords);

    bfTest.placeShip(testCoords , testShip); 
     expect(bfTest.bField[x][y]).toEqual(testShip.id); 
     expect(bfTest.ships.shipsAfloat).toEqual(1); 
     expect(bfTest.ships[testShip.id].shipCoords).toEqual(testCoords);
     expect(bfTest.ships[testShip.id].blockedCells).toEqual(blockedCoords);
    });




