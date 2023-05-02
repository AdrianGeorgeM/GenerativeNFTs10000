const path = require('path');
const { startCreating, buildSetup } = require(path.join(process.cwd(), 'src', 'main.js'));

(() => {
	buildSetup();
	startCreating();
})();
