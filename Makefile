all: target/tetris.js

target/tetris.js:
	mkdir -p target
	browserify js/tetris.js -o target/tetris.js 