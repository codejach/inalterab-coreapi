import fs from 'fs';
const path = require('path');

// Prevent caching of this module so module.parent is always accurate.
delete require.cache[__filename];
const parentFile = module.parent && module.parent.filename;
const parentDirectory = path.dirname(parentFile || '.');

// The default file extensions used by `require()`.
const fileExtensions = new Set(['.js', '.json', '.node']);

module.exports = (directory, options) => {
	directory = path.resolve(parentDirectory, directory || '');

	options = {
		camelize: true,
		fileExtensions,
		...options
	};

  let files;
  try {
	  files = fs.readdirSync(directory);
  } catch (_) {
    return {};
  }

	const done = new Set();
	let returnValue = {};

	for (const fileExtension of options.fileExtensions) {
		for (const file of files) {
			const filenameStem = path.basename(file).replace(/\.\w+$/, '');
			const fullPath = path.join(directory, file);

			if (done.has(filenameStem) ||
				fullPath === parentFile ||
				path.extname(file) !== fileExtension ||
				filenameStem[0] === '_' ||
				filenameStem[0] === '.') {
				continue;
			}

      let tmp = require(fullPath);

			returnValue = Object.assign(returnValue, tmp.default);
			done.add(filenameStem);
		}
	}

	return returnValue;
};
