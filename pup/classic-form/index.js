/**
 * Functional test for classic-form
 * base.png will be created first run,
 * file should be deleted if a new one is needed.
*/
const puppeteer = require('puppeteer');
const utils = require('../utils.js');
const width = 1400;
const height = 1600;

(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto('http://localhost:8000/')

  await page.setViewport({ width, height })

  await page.waitForSelector('#content-container > .dynamic-container > div > #landing-page-layout > .s-search-bar-row')
  await page.click('#content-container > .dynamic-container > div > #landing-page-layout > .s-search-bar-row')

  await page.waitForSelector('.nav-container > div > .s-landing-tabs > .landing-tab:nth-child(1) > a')
  await page.click('.nav-container > div > .s-landing-tabs > .landing-tab:nth-child(1) > a')
  await utils.delay(500);
  await page.screenshot({ path: await utils.getScreenshotName(__dirname) })
  await browser.close()
  utils.createDiffAndExit(__dirname)
})()
