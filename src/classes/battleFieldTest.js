import * as Battle_Field from "./battleFieldClass.js"

test("Location is valid?" , () => {
    const testBfieldd = new Battle_Field(8, 8);
    const testPosition = [6 , 7];
    expect(validLocation(testPosition)).toBe(true); 
});