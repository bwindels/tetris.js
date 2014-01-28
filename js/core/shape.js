/*jshint indent:4 undef:true node:true strict:false */

function TetrisShape(size, color, blocks) {
    this.size = size;
    this.color = color;
    if (blocks) {
        this.blocks = blocks;
    } else {
        //create an empty block
        this.blocks = this.createBlocks(function (x, y) {
            return false;
        });
    }
    this.nonBlankArea = this.calculateNonBlankArea();
    console.log(this.nonBlankArea);
}

TetrisShape.prototype = {
    rowHasBlocks: function (r) {
        for (var c = 0; c < this.size; ++c) {
            if (this.isSet(c, r)) {
                return true;
            }
        }
        return false;
    },
    columnHasBlocks: function (c) {
        for (var r = 0; r < this.size; ++r) {
            if (this.isSet(c, r)) {
                return true;
            }
        }
        return false;
    },
    calculateNonBlankArea: function () {
        var left = 0,
            top = 0, 
            right = this.size - 1, 
            bottom = this.size - 1;

        while (!this.columnHasBlocks(left)) {
            ++left;
        }
        while (!this.columnHasBlocks(right)) {
            --right;
        }
        while (!this.rowHasBlocks(top)) {
            ++top;
        }
        while (!this.rowHasBlocks(bottom)) {
            --bottom;
        }

        return {
            left: left,
            top: top,
            right: right,
            bottom: bottom
        };
    },
    createBlocks: function (fn) {
        var blocks = [], row;
        for (var y = 0; y < this.size; ++y) {
            row = [];
            for (var x = 0; x < this.size; ++x) {
                row.push(fn(x, y));
            }
            blocks.push(row);
        }
        return blocks;
    },
    clone: function () {
        var self = this;
        return new TetrisShape(this.size, this.color, this.createBlocks(function (x, y) {
            return self.isSet(x, y);
        }));
    },
    rotate: function () {
        var self = this;
        return new TetrisShape(this.size, this.color, this.createBlocks(function (x, y) {
            var rotatedX = self.size - y - 1,
                rotatedY = x;
            return self.isSet(rotatedX, rotatedY);
        }));
    },
    isSet: function (x, y) {
        return !!this.blocks[y][x];
    },
    set: function (x, y, enabled) {
        this.blocks[y][x] = !!enabled;
    }
};

module.exports = TetrisShape;