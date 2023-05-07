const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs = require('fs');

const {
	baseUri,
	description,
	namePrefix,
	network,
	solanaMetadata,
} = require(`${basePath}/src/config.js`);

// read json data
const rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`);
const data = JSON.parse(rawdata);

function updateItem(item) {
	item.name = `${namePrefix} #${item.edition}`;
	item.description = description;
	if (network === NETWORK.sol) {
		item.creators = solanaMetadata.creators;
	} else {
		item.image = `${baseUri}/${item.edition}.png`;
	}

	return item;
}

const updatedData = data.map(updateItem);

updatedData.forEach((item) => {
	fs.writeFileSync(
		`${basePath}/build/json/${item.edition}.json`,
		JSON.stringify(item, null, 2)
	);
});

fs.writeFileSync(
	`${basePath}/build/json/_metadata.json`,
	JSON.stringify(updatedData, null, 2)
);

if (network === NETWORK.sol) {
	console.log(`Updated description for images to ===> ${description}`);
	console.log(`Updated name prefix for images to ===> ${namePrefix}`);
	console.log(
		`Updated creators for images to ===> ${JSON.stringify(solanaMetadata.creators)}`
	);
} else {
	console.log(`Updated baseUri for images to ===> ${baseUri}`);
	console.log(`Updated description for images to ===> ${description}`);
	console.log(`Updated name prefix for images to ===> ${namePrefix}`);
}
