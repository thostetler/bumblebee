/**
 * Functional test for search-page
 * base.png will be created first run,
 * file should be deleted if a new one is needed.
*/
const utils = require('../utils.js')
const width = 1400;
const height = 1600;

const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('http://localhost:8000/search/q=bibcode%3A2020APh...114....1Z&sort=date%20desc%2C%20bibcode%20desc&p_=0', { waitUntil: 'networkidle2' })

  await page.setViewport({ width, height })
  await utils.delay(3000);
  await page.screenshot({ path: await utils.getScreenshotName(__dirname) })
  await browser.close()
  await utils.createDiffAndExit(__dirname);
})()

