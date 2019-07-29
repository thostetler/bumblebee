/**
 * options:
 * name: name of the test
 * path: path, including anything passed the base url
 * pageOptions: options passed to the `goto` function
 * delayAfterInitialLoad: delay that happens after the page finishes loading
 * delayBeforeScreenshot: delay that happens just before screenshot is taken
 * actions: an asynchronous function which can be used to run arbitrary dom operations or clicks or whatever on the page/browser
 * forceReloadBaseImage: force the base image to be retaken (no comparison is done)
 * launchOptions: options passed to `browser.launch`
 * keepDiff: keep the `*.diff.png` file for review
 * waitAndEvent: accepts a selector and will wait for and then call event (selector:event)
 * waitAndClick: accepts a selector and waits then clicks it
 * only: if any test has this as true, it will run only those
 */

const tests = [

  /* ------ SEARCH PAGE ------ */
  {
    name: 'search-page',
    path: '/search/q=star%20year%3A1910&sort=date%20desc%2C%20bibcode%20desc&p_=0',
    waitAndEvent: 'input[name=q]:blur'
  },
  {
    name: 'search-page__next-page',
    path: '/search/q=star%20year%3A1910&sort=date%20desc%2C%20bibcode%20desc&p_=0',
    waitAndClick: '.col-xs-6 > nav > .pager > li > .next-page',
    delayBeforeScreenshot: 1000
  },
  {
    name: 'search-page__prev-page',
    path: '/search/q=star%20year%3A1910&sort=date%20desc%2C%20bibcode%20desc&p_=3',
    waitAndClick: '.col-xs-6 > nav > .pager > li > .previous-page',
    delayBeforeScreenshot: 1000
  },
  {
    name: 'search-page__show-highlights',
    path: '/search/q=star%20year%3A1910&sort=date%20desc%2C%20bibcode%20desc&p_=3',
    waitAndClick: '#main-content > div:nth-child(1) > div > div > div.row.s-list-controls > div > div.col-xs-11 > div > button.btn.btn-primary.btn-sm.show-highlights',
    delayBeforeScreenshot: 10000
  },
  {
    name: 'search-page__show-abstracts',
    path: '/search/q=star%20year%3A1910&sort=date%20desc%2C%20bibcode%20desc&p_=3',
    waitAndClick: '#main-content > div:nth-child(1) > div > div > div.row.s-list-controls > div > div.col-xs-11 > div > button.btn.show-abstract.btn-sm.btn-inverse.btn-primary',
    delayBeforeScreenshot: 3000
  },
  {
    name: 'search-page__hide-sidebars',
    path: '/search/q=star%20year%3A1910&sort=date%20desc%2C%20bibcode%20desc&p_=3',
    waitAndClick: '#main-content > div:nth-child(1) > div > div > div.row.s-list-controls > div > div.col-xs-11 > div > button.btn.btn-sm.btn-inverse.btn-primary.toggle-sidebars.hidden-xs.hidden-sm'
  },
  {
    name: 'search-page__years-graph',
    path: '/search/q=star&sort=date%20desc%2C%20bibcode%20desc&p_=0',
    actions: async ({ page }) => {
      const leftInput = await page.waitForSelector('#year-graph > div:nth-child(4) > div.graph-controls.row > div > input.show-slider-data-first');
      const rightInput = await page.waitForSelector('#year-graph > div:nth-child(4) > div.graph-controls.row > div > input.show-slider-data-second');
      const applyBtn = await page.waitForSelector('#year-graph > div:nth-child(4) > div.graph-controls.row > div > button');
      await page.evaluate((left, right, apply) => {
        left.value = 1910;
        right.value = 1950;
        apply.click();
      }, leftInput, rightInput, applyBtn);
    },
    delayBeforeScreenshot: 3000
  },
  {
    name: 'search-page__selection',
    path: '/search/q=star&sort=date%20desc%2C%20bibcode%20desc&p_=0',
    waitAndClick: '#select-all-docs'
  },
  /* --------------------------- */

  /* ------ ABSTRACT PAGE ------ */
  {
    name: 'abstract-page',
    path: '/abs/1910RSPSA..84..426L/abstract',
    waitAndEvent: 'input[name=q]:blur'
  },
  {
    name: 'abstract-page__show-affiliations',
    path: '/abs/1976SvA....19..403S/abstract',
    waitAndClick: 'button#toggle-aff'
  },
  /* --------------------------- */

  {
    name: 'landing-page__modern-form',
    path: '/',
    waitAndEvent: 'input[name=q]:blur'
  },
  {
    name: 'landing-page__classic-form',
    path: '/classic-form',
    waitAndEvent: 'input:blur'
  },
  {
    name: 'landing-page__paper-form',
    path: '/paper-form',
    waitAndEvent: 'input:blur'
  },
  {
    name: 'feedback-form__dropdown',
    path: '/',
    waitAndClick: 'button[data-toggle=dropdown]'
  }
];

module.exports = tests;
