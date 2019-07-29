const puppeteer = require('puppeteer');
const tests = require('./manifest');
const path = require('path');
const fs = require('fs');
const pixelmatch = require('pixelmatch');
const PNG = require('pngjs').PNG;
const width = 1400;
const height = 1600;
const baseUrl = 'http://localhost:8000';
const results = {
  successes: [],
  failures: [],
  time: +new Date()
};

const delay = (timeout) => new Promise((resolve) => {
  if (timeout === 0) { return resolve(); }
  setTimeout(resolve, timeout)
});

const getImagePath = (name, force = false) => {
  if (!name) throw 'no name!'
  const basePath = path.resolve(__dirname, `${ name }.base.png`);
  const tmpPath = path.resolve(__dirname, `${ name }.tmp.png`);
  return new Promise((resolve) => {
    if (force) {

      // force, override the base path
      return resolve(basePath);
    }

    fs.stat(basePath, fs.constants.F_OK, async (err) => {
      err ? resolve(basePath) : resolve(tmpPath);
    });
  });
}

const compareImages = (name, keepDiff = false) => {
  const basePath = path.resolve(__dirname, `${ name }.base.png`);
  const tmpPath = path.resolve(__dirname, `${ name }.tmp.png`);
  try {
    fs.statSync(tmpPath, fs.constants.F_OK);
  } catch (e) {
    console.log(`base image created for ${ name }`);
    return;
  }
  const a = PNG.sync.read(fs.readFileSync(basePath));
  const b = PNG.sync.read(fs.readFileSync(tmpPath));
  const { width, height } = a;
  const diff = new PNG({ width, height });
  const numDiffPixels = pixelmatch(a.data, b.data, diff.data, width, height, { threshold: 0.4 });

  if (keepDiff || numDiffPixels > 0) {
    const diffPath = path.resolve(__dirname, `${ name }.diff.png`);
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
  }

  // check the diff
  numDiffPixels > 0 ? results.failures.push(name) : results.successes.push(name);

  // delete tmp file
  fs.unlinkSync(tmpPath);

  console.log(numDiffPixels > 0 ? '(FAIL)': '(PASS)', '::', name, numDiffPixels > 0 ? `--- ${ numDiffPixels } pixels different (diff image saved)` : '');
};

const test = async ({
  name,
  path,
  pageOptions = {},
  forceReloadBaseImage = false,
  delayAfterInitialLoad = 0,
  delayBeforeScreenshot = 0,
  keepDiff = false,
  launchOptions = {},
  waitAndClick = false,
  waitAndEvent = false,
  actions = () => {}
}) => {
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(baseUrl + path, { waitUntil: 'networkidle2', ...pageOptions });
  await delay(delayAfterInitialLoad);
  if (typeof waitAndClick === 'string') {
    await page.waitForSelector(waitAndClick);
    await page.click(waitAndClick);
  }
  if (typeof waitAndEvent === 'string') {
    const [ selector, event ] = waitAndEvent.split(':');
    await page.waitForSelector(selector);
    await page.evaluate((selector, event) => {
      document.querySelector(selector)[event]();
    }, selector, event);
  }
  await actions({ page, browser, delay });
  await delay(delayBeforeScreenshot);
  await page.screenshot({
    path: await getImagePath(name, forceReloadBaseImage),
    fullPage: true
  });
  await browser.close();
  await compareImages(name, keepDiff);
}

const displayResults = () => {
  console.log(`
  Results:
  --------------------------------
  Passes: ${ results.successes.length }
  Fails: ${ results.failures.length }
  Time: ${ (+ new Date() - results.time) / 1000 } seconds
  `);

  if (results.failures.length > 0) {
    results.failures.forEach((f) => {
      console.log(f, 'FAIL');
    });
  }
  process.exit(results.failures.length);
}

const restrictedSet = tests.filter((t) => t.only);
if (restrictedSet.length > 0) {
  Promise.all(restrictedSet.map(test)).then(displayResults);
} else {
  Promise.all(tests.map(test)).then(displayResults);
}
