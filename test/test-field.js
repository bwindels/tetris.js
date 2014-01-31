var TetrisShape = require('../js/core/shape');
var TetrisField = require('../js/core/field');

module.exports = {
    'test isShapeSpaceAvailable': function (test) {
        
        var s = new TetrisShape(4, 'red', [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ]);
        var f = new TetrisField(4, 6);

        test.strictEqual(f.isShapeSpaceAvailable(0, 0, s), true);
        test.strictEqual(f.isShapeSpaceAvailable(-1, -1, s), true);
        test.strictEqual(f.isShapeSpaceAvailable(-2, -1, s), false);
        test.strictEqual(f.isShapeSpaceAvailable(-1, -2, s), false);
        
        test.strictEqual(f.isShapeSpaceAvailable(1, 0, s), true);
        test.strictEqual(f.isShapeSpaceAvailable(2, 0, s), false);
        test.strictEqual(f.isShapeSpaceAvailable(3, 0, s), false);
        
        test.strictEqual(f.isShapeSpaceAvailable(0, 3, s), true);
        test.strictEqual(f.isShapeSpaceAvailable(0, 4, s), false);
        test.strictEqual(f.isShapeSpaceAvailable(0, 5, s), false);

        test.done();
    },
    'test isLineFull': function (test) {
        
        var s = new TetrisShape(3, 'red', [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 1]
        ]);
        var f = new TetrisField(3, 4);

        test.strictEqual(f.isLineFull(2), false);
        test.strictEqual(f.isLineFull(3), false);
        f.setShape(0, 1, s);
        test.strictEqual(f.isLineFull(2), false);
        test.strictEqual(f.isLineFull(3), true);

        test.done();
    }
};