var assert = require ('chai').assert;

var index = require ('../../src/index');

describe('index', function(){
    it('it should return only number', function (){
        var result = index(1000);
        assert.equal(result, 'string');
    });
});