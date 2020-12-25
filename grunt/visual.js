'use strict';
/**
 * Options for the `visual` grunt task
 *
 * @module grunt/visual
 */
module.exports = function(grunt) {
  const BASE_URL = 'http://localhost:8000';
  const SCREENSHOT_DIR = 'test/screenshots';

  grunt.registerMultiTask(
    'visual',
    'screenshots screenshots screenshots',
    async function() {
      const done = this.async();
      const routes = require('../test/visual.js');
      const puppeteer = require('puppeteer');
      const pixelmatch = require('pixelmatch');
      const fs = require('fs');
      const PNG = require('pngjs').PNG;
      const path = require('path');
      const options = this.options({
        launchOptions: {
          headless: true,
          defaultViewport: {
            width: 1400,
            height: 800,
          },
        },
      });

      // clear current screenshots
      const foundScreenshots = grunt.file.expand(`${SCREENSHOT_DIR}/*.png`);
      foundScreenshots.forEach((f) => grunt.file.delete(f));

      const browser = await puppeteer.launch(options.launchOptions);
      let failures = 0;
      await (async () => {
        for (let i = 0; i < routes.length; i++) {
          const { route, name } = routes[i];
          const page = await browser.newPage();
          const url = `${BASE_URL}${route}`;
          const screenshotPath = path.join(SCREENSHOT_DIR, `${name}.png`);
          await page.goto(url, {
            waitUntil: 'networkidle0',
          });

          const baselinePath = `${SCREENSHOT_DIR}/baseline/${name}.png`;
          if (grunt.file.exists(baselinePath)) {
            grunt.verbose.writeln(`Testing ${name}`);
            const baseImage = PNG.sync.read(fs.readFileSync(baselinePath));
            const testImage = PNG.sync.read(
              await page.screenshot({
                fullPage: true,
              })
            );

            const { width, height } = baseImage;
            const diff = new PNG({ width, height });

            const numDiffPixels = pixelmatch(
              baseImage.data,
              testImage.data,
              diff.data,
              width,
              height,
              { threshold: 0.1 }
            );

            if (numDiffPixels > 0) {
              failures++;
              grunt.log.error(
                `${name} is different from baseline by ${numDiffPixels} pixels`
              );
            }

            const diffFilename = screenshotPath.replace(
              `${name}.png`,
              `${name}.diff.png`
            );
            grunt.file.write(diffFilename, PNG.sync.write(diff));
            grunt.verbose.writeln(`diff saved at ${diffFilename}`);
          } else {
            // create a new baseline image
            await page.screenshot({
              path: baselinePath,
              fullPage: true,
            });

            grunt.log.ok(`Created a new baseline image at: ${baselinePath}`);
          }
        }
      })();

      await browser.close();

      if (failures > 0) {
        grunt.fail.fatal(`${failures} screenshots had issues, please fix`);
      }

      grunt.log.ok('No visual regressions found!');

      done();
    }
  );

  return {
    test: {
      options: {},
    },
  };
};
