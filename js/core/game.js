/*jshint indent:4 undef:true node:true strict:false */
/*global window alert */

function TetrisGame(screen, input, field, shapes) {
    this.screen = screen;
    this.field = field;
    this.shapes = shapes;
    this.shapeOffset = {
        x: 0,
        y: 0
    };
    this.lowerBlockTime = 500;

    input.on('rotateBlock', this.rotateBlock.bind(this));
    input.on('moveBlockLeft', this.moveBlockLeft.bind(this));
    input.on('moveBlockRight', this.moveBlockRight.bind(this));
    input.on('dropBlock', this.dropBlock.bind(this));
}

TetrisGame.prototype = {
    run: function () {
        this.screen.setSize(this.field.width, this.field.height);
        this.selectNewShape();
    },
    pause: function (paused) {

    },
    step: function () {
        if (this.lowerBlock()) {
            window.setTimeout(this.step.bind(this), this.lowerBlockTime);
        } else {
            this.selectNewShape();
        }
    },
    lowerBlock: function () {
        if (this.checkPosition(0, 1)) {
            this.shapeOffset.y += 1;
            this.screen.setShapePosition(this.shapeOffset.x, this.shapeOffset.y);
            return true;
        } else {
            this.solidifyShape();
            this.screen.setActiveShape(null);
            this.checkFullLines();
            return false;
        }
    },
    /* make the shape part of the field */
    solidifyShape: function () {
        this.field.setShape(this.shapeOffset.x, this.shapeOffset.y, this.shape);
        this.screen.fillShape(this.shapeOffset.x, this.shapeOffset.y, this.shape);
    },
    checkFullLines: function () {

    },
    dropBlock: function () {
        while (this.lowerBlock()) {}
    },
    moveBlockLeft: function () {
        if (this.checkPosition(-1, 0)) {
            this.shapeOffset.x -= 1;
            this.screen.setShapePosition(this.shapeOffset.x, this.shapeOffset.y);
        }
    },
    moveBlockRight: function () {
        if (this.checkPosition(1, 0)) {
            this.shapeOffset.x += 1;
            this.screen.setShapePosition(this.shapeOffset.x, this.shapeOffset.y);
        }
    },
    rotateBlock: function () {
        var rotatedShape = this.shape.rotate();
        if (this.checkPosition(0, 0, rotatedShape)) {
            this.shape = rotatedShape;
            this.screen.setActiveShape(rotatedShape);
        }
    },
    gameOver: function () {
        alert('game over');
    },
    checkPosition: function (x, y, shape) {
        if (!shape) {
            shape = this.shape;
        }
        x += this.shapeOffset.x;
        y += this.shapeOffset.y;
        //check fields bounds, should maybe go in TetrisField itself? Probably
        if (x < 0 || x >= (this.field.width - shape.size)) {
            return false;
        }
        if (y < 0 || y >= (this.field.height - shape.size)) {
            return false;
        }
        return !this.field.isShapeSet(x, y, shape);
    },
    selectNewShape: function () {
        var shapeIndex = Math.floor(Math.random() * this.shapes.length);
        this.shape = this.shapes[shapeIndex].clone();
        this.shapeOffset.y = 0;
        //center the shape
        this.shapeOffset.x = Math.floor((this.field.width - this.shape.size) / 2);
        //update ui
        this.screen.setActiveShape(this.shape);
        this.screen.setShapePosition(this.shapeOffset.x, this.shapeOffset.y);

        if (!this.checkPosition(0, 0)) {
            return this.gameOver();
        }

        window.setTimeout(this.step.bind(this), this.lowerBlockTime);
    }
};

module.exports = TetrisGame;