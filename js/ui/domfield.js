/*jshint indent:4 undef:true node:true strict:false */

var _ = require('underscore');

function DOMTetrisShape(el, size, padding, doc) {
    this.fieldElement = el;
    this.size = size;
    this.padding = padding;
    this.doc = doc;
    this.width = null;
}

DOMTetrisShape.prototype = {
    setSize: function (width, height) {
        var rowIndex;

        this.width = width;
        this.fieldElement.innerHTML = '';

        for (rowIndex = 0; rowIndex < height ; ++rowIndex) {
            this.fieldElement.appendChild(this.createRowNode());
        }

        this.fieldElement.style.width = this.getPixelWidth(width) + 'px';
        this.fieldElement.style.height = this.getPixelHeight(height) + 'px';
    },
    createRowNode: function () {
        var columnIndex,
            blockElement,
            rowContainer;

        rowContainer = this.doc.createElement('div');
        rowContainer.style.height = (this.size + this.padding) + 'px';

        for (columnIndex = 0; columnIndex < this.width ; ++columnIndex) {

            blockElement = this.createBlock(columnIndex);
            rowContainer.appendChild(blockElement);

        }

        return rowContainer;
    },
    getPixelWidth: function (width) {
        return ((this.size * width) + ((width - 1) * this.padding));
    },
    getPixelHeight: function (height) {
        return ((this.size * height) + ((height - 1) * this.padding));
    },
    createBlock: function (x) {
        var block = this.doc.createElement('div');

        block.style.left = this.cssPx(x);
        block.style.width = (this.size) + 'px';
        block.style.height = (this.size) + 'px';

        return block;
    },
    fillBlock: function (x, y, color) {
        this.fieldElement.children[y].children[x].className = color;
    },
    fillShape: function (offsetX, offsetY, shape) {
        var x, y;

        for (y = 0; y < shape.size; ++y) {
            for (x = 0; x < shape.size; ++x) {
                if (shape.isSet(x, y)) {
                    this.fillBlock(offsetX + x, offsetY + y, shape.color);
                }
            }
        }
    },
    pixelOffset: function (n) {
        return (this.size + this.padding) * n;
    },
    cssPx: function (n) {
        return this.pixelOffset(n) + 'px';
    }
};

function DOMTetrisField(container, size, padding, doc) {
    var field = doc.createElement('div');
    container.appendChild(field);
    DOMTetrisShape.call(this, field, size, padding, doc);
    this.container = container;
}

DOMTetrisField.prototype = _.extend(Object.create(DOMTetrisShape.prototype), {
    dropLine: function (lineIndex) {
        var row = this.fieldElement.children[lineIndex];

        this.fieldElement.removeChild(row);
        this.fieldElement.insertBefore(this.createRowNode(), this.fieldElement.firstChild);
    },
    setSize: function (width, height) {
        DOMTetrisShape.prototype.setSize.call(this, width, height);
        this.container.style.width = this.getPixelWidth(width) + 'px';
        this.container.style.height = this.getPixelHeight(height) + 'px';
    },
    convertShape: function (shape) {
        var rowIndex, columnIndex;

        var domShape = new DOMTetrisShape(
            this.doc.createElement('div'),
            this.size,
            this.padding,
            this.doc
        );

        domShape.setSize(shape.size, shape.size);
        domShape.fillShape(0, 0, shape);

        return domShape;
    },
    setActiveShape: function (shape) {
        if (this.shape) {
            this.container.removeChild(this.shape.fieldElement);
            this.shape = null;
        }
        if (shape) {
            this.shape = this.convertShape(shape);
            this.setShapePosition(this.shapeX, this.shapeY);
            this.container.appendChild(this.shape.fieldElement);
        }
    },
    setShapePosition: function (x, y) {
        var shapeStyle = this.shape.fieldElement.style;

        if (this.shape) {
            this.shapeX = x;
            this.shapeY = y;
            shapeStyle.top = this.cssPx(y);
            shapeStyle.left = this.cssPx(x);
        }
    },
    setPaused: function (paused) {

    },
    updateScore: function (score) {

    },
    updateNextBlock: function (block) {

    }
});

module.exports = DOMTetrisField;