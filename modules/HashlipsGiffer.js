const GifEncoder = require('gif-encoder-2');
const { writeFile } = require('fs');

function createHashLipsGiffer(canvas, ctx, fileName, repeat, quality, delay) {
	const gifEncoder = new GifEncoder(canvas.width, canvas.height);
	gifEncoder.setQuality(quality);
	gifEncoder.setRepeat(repeat);
	gifEncoder.setDelay(delay);

	const start = () => {
		gifEncoder.start();
	};

	const add = () => {
		gifEncoder.addFrame(ctx);
	};

	const stop = () => {
		gifEncoder.finish();
		const buffer = gifEncoder.out.getData();
		writeFile(fileName, buffer, (error) => {});
		console.log(`Created gif at ${fileName}`);
	};

	return {
		start,
		add,
		stop,
	};
}

module.exports = createHashLipsGiffer;
