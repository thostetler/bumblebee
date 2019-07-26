/**
 * Functional test for search-page__prev-page
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

  await page.goto('http://localhost:8000/search/q=star%20year%3A1910&sort=date%20desc%2C%20bibcode%20desc&p_=1', { waitUntil: 'networkidle2' })

  await page.setViewport({ width, height })

  await page.waitForSelector('.col-xs-6 > nav > .pager > li > .previous-page')
  await page.click('.col-xs-6 > nav > .pager > li > .previous-page')

  await utils.delay(3000);
  await page.evaluate(() => $('li:nth-last-child(-n + 20)', 'ul.results-list').remove());

  await page.screenshot({ path: await utils.getScreenshotName(__dirname) })

  await utils.createDiffAndExit(__dirname);
  await browser.close()
})()

