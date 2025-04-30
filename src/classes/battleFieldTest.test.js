import {Battle_Field} from "./battleFieldClass.js"
import * as Ships from "./shipClass.js";
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

// TEST ALLSHIPS SUNK
test("There are no ships afloat" , () => { 
    const bfTest = new Battle_Field(8 , 8)
    expect(bfTest.noShipsAfloat()).toBe(true); 
});
