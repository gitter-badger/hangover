var assert = require('assert');
var hangover = require('../bin/package/sys/hangover.js');

describe('app', function() {

    it('should load hangover and return an object', function() {
        assert(typeof hangover, 'object');
    });

    it('should load hangover dependencies #1', function() {
        assert(typeof hangover.requires, 'function');
    });

    it('should load hangover dependencies #2', function() {
        try {
            hangover.requires(['mongoose', 'hapi', 'swig']);
            assert(true);
        } catch(e) {
            assert.throws(e);
        }
    })

    it('should load hangover configuration', function() {
        var config = null;
        try {
            config = hangover.config();
            assert(typeof config, 'object');
        } catch(e) {
            assert.throws(e);
        }
    });

});
