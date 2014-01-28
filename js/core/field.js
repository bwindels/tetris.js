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
	dropLines: function (amount) {
		this.blocks.splice(this.blocks.length, amount);
		var args = [0, 0].concat(this.createEmptyBlocks(amount));
		this.blocks.splice.apply(this.blocks, args);
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

		if ((offsetX + shape.nonBlankArea.left) < 0 || offsetX > (this.width - shape.size + shape.nonBlankArea.right)) {
            return false;
        }
        if ((offsetY + shape.nonBlankArea.top) < 0 || offsetY > (this.height - shape.size + shape.nonBlankArea.bottom)) {
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
	}
};

module.exports = TetrisField;