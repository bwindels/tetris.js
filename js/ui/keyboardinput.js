var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

function KeyboardInput(doc) {
	EventEmitter.call(this);
	this.doc = doc;
}

KeyboardInput.prototype = _.extend(Object.create(EventEmitter.prototype), {
	attach: function () {
		var body = this.doc.body,
			self = this;
		body.addEventListener('keydown', function (event) {
			if (event.keyCode === 37) {	//left arrow key
				return self.emit('moveBlockLeft');
			}
			if (event.keyCode === 39) {	//right arrow key
				return self.emit('moveBlockRight');
			}
			if (event.keyCode === 38) {	//up arrow key
				return self.emit('rotateBlock');
			}
			if (event.keyCode === 40) {	//down arrow key
				return self.emit('dropBlock');
			}
		}, false);
	}
});

module.exports = KeyboardInput;