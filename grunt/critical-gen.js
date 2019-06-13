'use strict';
/**
 * Options for the `critical-gen` grunt task
 *
 * @module grunt/critical-gen
 */
module.exports = function (grunt) {

  grunt.registerMultiTask('critical-gen', 'create temporary html files for critical css generation', async function () {
    const done = this.async();
    const fs = require('fs');
    const path = require('path');
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const prefix = 'http://localhost:8000';
    const pages = [
      '/',
      '/abstract',
      '/search/q=star&sort=date desc,bibcode desc',
      '/public-libraries/d9O0aqd2SreUVeK67XX8rw'
    ];
    const output = pages.reduce(async (out, p) => {
      await page.goto(prefix + p, { waitUntil: 'networkidle0' });
      out += await page.evaluate(() => document.querySelector('body').innerHTML);
      return out;
    }, '');

    fs.writeFile(path.resolve(__dirname, '../_tmp/out.html'), output, () => {
      console.log('file written');
    });
    await browser.close();
    done();
  });

  return {
    options: {},
    dev: {}
  }
};
