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
      '/classic-form',
      '/paper-form',
      '/abs/2014A%26A...569A.111B/abstract',
      '/search/q=star&sort=date desc,bibcode desc',
      '/public-libraries/d9O0aqd2SreUVeK67XX8rw'
    ];
    let output = '<html><head></head><body>';
    for(let p of pages) {
      await page.goto(prefix + p, { waitUntil: 'networkidle0' });
      output += await page.evaluate(() => document.querySelector('body').innerHTML);
      console.log('route: [', p, '] DONE');
    }
    output += '</body></html>';

    grunt.file.write(path.resolve(__dirname, '../_tmp/critical/concatenated.html'), output);
    await browser.close();
    done();
  });

  return {
    options: {},
    dev: {}
  }
};
