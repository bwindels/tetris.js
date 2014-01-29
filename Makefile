all: target/tetris.js

target/tetris.js:
	@mkdir -p target
	browserify js/tetris.js -o target/tetris.js 

clean:
	@rm -f target/tetris.js

always_run:
	@#empty target that is never satisfied

test: always_run
	@nodeunit test/test-*.js