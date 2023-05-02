const GifEncoder = require('gif-encoder-2');
const { writeFile } = require('fs/promises');

function createGif({ width, height }, ctx, fileName, repeat, quality, delay) {
	const gifEncoder = new GifEncoder(width, height);
	gifEncoder.setQuality(quality);
	gifEncoder.setRepeat(repeat);
	gifEncoder.setDelay(delay);

	const start = () => gifEncoder.start();
	const add = () => gifEncoder.addFrame(ctx);

	async function stop() {
		try {
			gifEncoder.finish();
			const buffer = gifEncoder.out.getData();
			await writeFile(fileName, buffer);
			console.log(`Created gif at ${fileName}`);
		} catch (error) {
			console.error(`Error creating gif: ${error}`);
		}
	}

	return {
		start,
		add,
		stop,
	};
}

module.exports = createGif;
