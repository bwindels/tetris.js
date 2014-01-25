/*jshint indent:4 undef:true node:true strict:false */

var TetrisShape = require('./shape');

module.exports = {
    createShapes: function () {
        var line_shape = [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ];

        var rev_l_shape = [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ];

        var l_shape = [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ];

        var t_shape = [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ];

        var squiggly_shape = [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
        ];

        var rev_squiggly_shape = [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ];

        var square_shape = [
            [1, 1],
            [1, 1]
        ];

        var shapes = [
            new TetrisShape(4, 'cyan', line_shape),
            new TetrisShape(3, 'blue', rev_l_shape),
            new TetrisShape(3, 'orange', l_shape),
            new TetrisShape(3, 'magenta', t_shape),
            new TetrisShape(3, 'green', squiggly_shape),
            new TetrisShape(3, 'red', rev_squiggly_shape),
            new TetrisShape(2, 'yellow', square_shape)
        ];

        return shapes;
    }
};