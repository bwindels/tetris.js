/*jshint indent:4 undef:true node:true strict:false */
/*global document */
var TetrisField = require('./core/field'),
	TetrisGame = require('./core/game'),
	DOMTetrisField = require('./ui/domfield'),
	KeyboardInput = require('./ui/keyboardinput');

var doc = document;
var container = doc.getElementById('tetris').querySelector('.field-container');

var shapes = require('./core/shapes').createShapes();

var field = new TetrisField(10, 20),
	screen = new DOMTetrisField(container, 20, 1, doc),
	input = new KeyboardInput(doc),
	game = new TetrisGame(screen, input, field, shapes);

input.attach();
game.pause();
game.run();