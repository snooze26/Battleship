import * as Ships from "./shipClass.js";

test('Add 1 hit to the ships hit' , () => {
    const testC = new Carrier(); 
    testC.hit()
    expect(hit(testC.hits)).toBe(1);
});



