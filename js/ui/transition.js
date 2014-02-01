var when = require('when');

function once(el, eventName) {
	var d = when.defer();
	var fn = function(e) {
		el.removeEventListener(eventName, fn, false);
		d.resolve(e);
	};

	el.addEventListener(eventName, fn, false);
	return d.promise;
}

function applyCSS(el, classOrProps) {
	if(typeof classOrProps === 'string') {
		el.className = classOrProps;
	} else {
		Object.keys(classOrProps).forEach(function (propName) {
			el.style[propName] = classOrProps[propName];
		});
	}
}

function transitionTo(el, classOrProps) {
	var p = once(el, 'transitionend');
	applyCSS(el, classOrProps);
	return p;
}

module.exports = {
	once: once,
	applyCSS: applyCSS,
	transitionTo: transitionTo
};