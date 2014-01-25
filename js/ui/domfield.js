/*jshint indent:4 undef:true node:true strict:false */

var _ = require('underscore');

function DOMTetrisShape(el, size, padding, doc) {
    this.fieldElement = el;
    this.size = size;
    this.padding = padding;
    this.doc = doc;
}

DOMTetrisShape.prototype = {
    setSize: function (width, height) {
        var rowIndex,
            columnIndex,
            blockElement,
            rowContainer;

        this.fieldElement.innerHTML = '';

        for (rowIndex = 0; rowIndex < height ; ++rowIndex) {

            rowContainer = this.doc.createElement('div');
            rowContainer.style.height = (this.size + this.padding) + 'px';


            for (columnIndex = 0; columnIndex < width ; ++columnIndex) {

                blockElement = this.createBlock(columnIndex);
                rowContainer.appendChild(blockElement);

            }
            
            this.fieldElement.appendChild(rowContainer);
        }

        this.fieldElement.style.width = ((this.size * width) + ((width - 1) * this.padding)) + 'px';
        this.fieldElement.style.height = ((this.size * height) + ((height - 1) * this.padding)) + 'px';
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
    dropLines: function (amount) {
        var rowIndex,
            columnIndex,
            rowContainer,
            firstLine;

        while (amount > 0) {
            this.fieldElement.removeChild(this.fieldElement.children.lastChild);
            ++amount;
        }

        firstLine =  this.fieldElement.children[0];
        for (rowIndex = 0; rowIndex < amount ; ++rowIndex) {

            rowContainer = this.doc.createElement('div');
            if (firstLine) {
                this.fieldElement.insertBefore(rowContainer, firstLine);
            } else {
                this.fieldElement.appendChild(rowContainer);
            }

        }
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