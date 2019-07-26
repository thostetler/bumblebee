/**
 * Functional test for modern-form
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

  await page.goto('http://localhost:8000/')

  await page.setViewport({ width, height })

  await page.waitForSelector('div > .s-landing-tabs > .active > a > .hidden-xs')
  await page.click('div > .s-landing-tabs > .active > a > .hidden-xs')

  await page.evaluate(() => $('input[name=q]').blur());
  await page.screenshot({ path: await utils.getScreenshotName(__dirname) })

  await browser.close()
  await utils.createDiffAndExit(__dirname);
})()

