/**
 * options:
 * name: name of the test
 * description: description of the test
 * pageOptions: options passed to the `goto` function
 * delayAfterInitialLoad: delay that happens after the page finishes loading
 * actions: an asynchronous function which can be used to run arbitrary dom operations or clicks or whatever on the page/browser
 * forceReloadBaseImage: force the base image to be retaken (no comparison is done)
 * launchOptions: options passed to `browser.launch`
 * keepDiff: keep the `*.diff.png` file for review
 * waitAndEvent: accepts a selector and will wait for and then call event (selector:event)
 * waitAndClick: accepts a selector and waits then clicks it
 * only: if any test has this as true, it will run only those
 */
const blurSearchInput = async (page) => {
  await page.waitForSelector('input[name=q]');
  await page.evaluate(() => document.querySelector('input[name=q]').blur());
}

const tests = [
  {
    name: 'search-page',
    description: 'search page, simple search',
    url: 'http://localhost:8000/search/q=star%20year%3A1910&sort=date%20desc%2C%20bibcode%20desc&p_=0',
    waitAndEvent: 'input[name=q]:blur'
  },

  /* ------ ABSTRACT PAGE ------ */
  {
    name: 'abstract-page',
    description: 'abstract page default view',
    url: 'http://localhost:8000/abs/1910RSPSA..84..426L/abstract',
    waitAndEvent: 'input[name=q]:blur'
  },
  {
    name: 'abstract-page__show-affiliations',
    description: 'abstract page show affiliations view',
    url: 'http://localhost:8000/abs/1976SvA....19..403S/abstract',
    waitAndClick: 'button#toggle-aff'
  },
  /* --------------------------- */

  {
    name: 'landing-page__modern-form',
    description: 'modern form default view',
    url: 'http://localhost:8000',
    waitAndEvent: 'input[name=q]:blur'
  },
  {
    name: 'landing-page__classic-form',
    description: 'classic form default view',
    url: 'http://localhost:8000/classic-form',
  },
  {
    name: 'landing-page__paper-form',
    description: 'paper form default view',
    url: 'http://localhost:8000/paper-form'
  },
  {
    name: 'feedback-form__dropdown',
    description: 'the feedback form drop-down list',
    url: 'http://localhost:8000',
    waitAndClick: 'button[data-toggle=dropdown]'
  }
];

module.exports = tests;
