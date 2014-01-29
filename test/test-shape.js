var TetrisShape = require('../js/core/shape');

module.exports = {
    'setUp': function (callback) {
        this.shape = new TetrisShape(4, 'red', [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]);

        callback();
    },
    
    'test nonBlankArea': function (test) {

        test.strictEqual(this.shape.nonBlankArea.top, 1);
        test.strictEqual(this.shape.nonBlankArea.bottom, 3);
        test.strictEqual(this.shape.nonBlankArea.left, 1);
        test.strictEqual(this.shape.nonBlankArea.right, 3);
        
        test.done();
    },

    'test rotate': function (test) {
        
        var s = this.shape.clone();
        s.set(0,0, true);
        //rotates the shape 90 degrees counter clockwise
        s = s.rotate();

        test.deepEqual(s.blocks, [
            [false, false, false, false],
            [false, true , false, false],
            [false, false, true , false],
            [true , false, false, false]
        ]);

        test.done();
    }
};