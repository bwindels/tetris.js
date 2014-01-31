/*jshint indent:4 undef:true node:true strict:false */

function TetrisField(width, height) {
    this.width = width;
    this.height = height;
    this.blocks = this.createEmptyBlocks(height);
}

TetrisField.prototype = {
    createEmptyBlocks: function (rows) {
        var x, y, blocks = [], row;
        for (y = 0 ; y < rows; ++y) {
            row = [];
            for (x = 0 ; x < this.width; ++x) {
                row.push(false);
            }
            blocks.push(row);
        }
        return blocks;
    },
    dropLine: function (lineIndex) {
        //remove line
        this.blocks.splice(lineIndex, 1);
        //and add empty line on top
        this.blocks.splice(0, 0, this.createEmptyBlocks(1)[0]);
    },
    iterateShapeBlocks: function (offsetX, offsetY, shape, it) {
        var localX, localY, globalX, globalY, validPosition;
        for (localY = 0 ; localY < shape.size; ++localY) {
            for (localX = 0 ; localX < shape.size; ++localX) {
                
                globalX = localX + offsetX;
                globalY = localY + offsetY;
                validPosition = globalX >= 0 && globalX < this.width && globalY >= 0 && globalY < this.height;
                
                if (validPosition && it(localX, localY, globalX, globalY)) {
                    return true;
                }
            }
        }
        return false;
    },
    isShapeSpaceAvailable: function (offsetX, offsetY, shape) {
        var self = this;

        if ((offsetX + shape.nonBlankArea.left) < 0 || offsetX > (this.width - shape.nonBlankArea.right)) {
            return false;
        }
        if ((offsetY + shape.nonBlankArea.top) < 0 || offsetY > (this.height - shape.nonBlankArea.bottom)) {
            return false;
        }

        return !this.iterateShapeBlocks(offsetX, offsetY, shape, function (x, y, globalX, globalY) {
            return shape.isSet(x, y) && !!self.blocks[globalY][globalX];
        });
    },
    setShape: function (offsetX, offsetY, shape) {
        var self = this;
        this.iterateShapeBlocks(offsetX, offsetY, shape, function (x, y, globalX, globalY) {
            if (shape.isSet(x, y)) {
                self.blocks[globalY][globalX] = true;
            }
        });
    },
    isLineFull: function (y) {
        return this.blocks[y].every(function (v) { return v; });
    },
    dropFullLines: function (callback) {
        var lineIndex = this.height - 1;
        while (lineIndex > 0) {
            if (this.isLineFull(lineIndex)) {
                this.dropLine(lineIndex);
                callback(lineIndex);
                //don't decrease lineIndex here so we
                //can retry lineIndex since it now points
                //to the line that used to be above
            } else {
                --lineIndex;
            }
        }
    },
    reset: function () {
        this.blocks = this.createEmptyBlocks(this.height);
    }
};

module.exports = TetrisField;