/*
	If you need to compare the values within two objects, you can use assert.deepEqual(). 
	This method compares the values of each object using loose (==) equality.
*/

const assert = require('assert');

describe('+', () => {
  it('returns the sum of two values', () => {
    // Setup
		let expected = {a: 3, b: 4, result: 7};
		let sum = {a: 3, b: 4};

    // Exercise
		sum.result = sum.a + sum.b;

    // Verify
    assert.deepEqual(sum, expected);
  });
});
