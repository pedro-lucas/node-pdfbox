'use strict';

const fs = require('fs');

module.exports = {

  toBeInstanceOf: function(util, customEqualityTesters, negativeCompare) {
    return {
      compare: function(actual, expected) {
        let result = {};
        result.pass = actual instanceof expected;
        if(result.pass) {
          result.message = 'Expected ' + actual.constructor.name + ' not to be an instance of ' + expected.prototype.constructor.name;
        }else{
          result.message = 'Expected ' + actual.constructor.name + ' to be an instance of ' + expected.prototype.constructor.name;
        }
        return result;
      }
    };
  },

  toHasFile: function(util, customEqualityTesters, negativeCompare) {
    return {
      compare: function(actual, expected) {
        let result = {};
        result.pass = true;
        try {
          fs.accessSync(actual, fs.F_OK); 
        } catch(e) {
          result.pass = false;
        }
        if(result.pass) {
          result.message = 'Expected ' + actual + ' was not a file';
        }else{
          result.message = 'Expected ' + actual + ' was a file';
        }
        return result;
      }
    };
  }

};
