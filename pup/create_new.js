const fs = require('fs');
const path = require('path');
const name = process.argv[2];

if (!name) {
  throw 'no name entered';
}
const dirPath = path.resolve(__dirname, name);
fs.mkdir(dirPath, { recursive: false }, (err) => {
  if (err) throw err;
  console.log('directory', dirPath, 'created.');
  const indexPath = path.resolve(dirPath, 'index.js');

  const output =
`/**
 * Functional test for ${name}
 * base.png will be created first run,
 * file should be deleted if a new one is needed.
*/
const utils = require('../utils.js')
const width = 1400;
const height = 1600;

// await page.screenshot({ path: await utils.getScreenshotName(__dirname) })
// await utils.createDiffAndExit(__dirname);
`;

  fs.writeFile(indexPath, output, (err) => {
    if (err) throw err;

    console.log(indexPath, 'written.');
  });
});
