import {Battle_Field} from "./battleFieldClass.js"

test("Location is valid?" , () => {
    const bfTest = new Battle_Field(8 , 8);
    const testPosition = [6 , 7];
    expect(bfTest.validLocation(testPosition)).toBe(true); 
});
