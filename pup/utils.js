const path = require('path');
const fs = require('fs');
const pixelmatch = require('pixelmatch');
const PNG = require('pngjs').PNG;

const getScreenshotName = function (dir) {
  const basePath = path.resolve(dir, 'base.png');
  const tmpPath = path.resolve(dir, 'tmp.png');
  return new Promise((resolve) => {
    fs.stat(basePath, fs.constants.F_OK, async (err) => {
      err ? resolve(basePath) : resolve(tmpPath);
    });
  })
}

const createDiffAndExit = function (dir, cb) {
  const basePath = path.resolve(dir, 'base.png');
  const tmpPath = path.resolve(dir, 'tmp.png');

  try {
    fs.statSync(tmpPath, fs.constants.F_OK);
  } catch (e) {
    console.log('base image created');
    process.exit(0);
  }
  const a = PNG.sync.read(fs.readFileSync(basePath));
  const b = PNG.sync.read(fs.readFileSync(tmpPath));
  const { width, height } = a;
  const diff = new PNG({ width, height });

  if (typeof cb === 'function') {
    cb({ a, b, diff, basePath, tmpPath });
  }

  const numDiffPixels = pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.4 });

  if (process.argv[2] === '--save-diff') {
    fs.writeFileSync(path.resolve(dir, 'diff.png'), PNG.sync.write(diff));
  }

  // delete tmp file
  fs.unlinkSync(tmpPath);

  console.log('comparing:', dir.split(path.sep).pop(), ' --- ', numDiffPixels, 'pixels different');
  process.exit(numDiffPixels);
}

const delay = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));

module.exports = {
  getScreenshotName,
  createDiffAndExit,
  delay,
};
