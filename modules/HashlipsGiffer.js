const GifEncoder = require('gif-encoder-2');
const { writeFile } = require('fs/promises');

function createGif(_canvas, _ctx, _fileName, _repeat, _quality, _delay) {
	const gifEncoder = new GifEncoder(_canvas.width, _canvas.height);
	gifEncoder.setQuality(_quality);
	gifEncoder.setRepeat(_repeat);
	gifEncoder.setDelay(_delay);

	async function stop() {
		try {
			gifEncoder.finish();
			const buffer = gifEncoder.out.getData();
			await writeFile(_fileName, buffer);
			console.log(`Created gif at ${_fileName}`);
		} catch (error) {
			console.error(`Error creating gif: ${error}`);
		}
	}

	return {
		start: () => gifEncoder.start(),
		add: () => gifEncoder.addFrame(_ctx),
		stop,
	};
}

module.exports = createGif;
