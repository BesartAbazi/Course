// Index.js
//====================================================================================
// Define a rooster
Rooster = {};

// Return a morning rooster call
Rooster.announceDawn = () => {
  return 'cock-a-doodle-doo!';
}

// Return hour as string
// Throws Error if hour is not between 0 and 23 inclusive
Rooster.timeAtDawn = (hour) => {
  if (hour < 0 || hour > 23) {
    throw new RangeError;
  } else {
    return hour.toString();
  };
}

module.exports = Rooster;




// Index_test.js
//====================================================================================
const assert = require('assert');
const Rooster = require('../index.js');

describe('Rooster', () => {
  describe('.announceDawn', () => {
    it('returns a rooster call', () => {
      // Setup and Execution
      const execution = Rooster.announceDawn();
      const expected = 'cock-a-doodle-doo!';

      // Verification
      assert.equal(execution, expected);
    });
  });

  describe('.timeAtDawn', () => {
    it('returns its argument as a string', () => {
      // Setup and Execution
      const execution = Rooster.timeAtDawn(10);
      const expected = '10';
      
      // Verification
      assert.strictEqual(execution, expected);
    });

    it('throws an error if passed a number less than 0', () => {
      // Setup and Execution
      hour = -1;

      // Verification
      assert.throws(() => {
        Rooster.timeAtDawn(hour);
      }, RangeError);
    });

    it('throws an error if passed a number greater than 23', () => {
      // Setup and Execution
      hour = 24;

      // Verification
      assert.throws(() => {
        Rooster.timeAtDawn(hour);
      }, RangeError);
    });
  });
});