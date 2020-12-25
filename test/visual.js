/**
 * Routes to use for visual (regression) testing
 * Schema:
 * ```
 * {
 *    route: string,
 *    name: string,
 *    pageActions: (page: Page) => Promise<void>
 * }
 * ```
 */

module.exports = [
  {
    route: '/',
    name: 'landing-page',
  },
  {
    route: '/classic-form',
    name: 'classic-form',
  },
  {
    route: '/paper-form',
    name: 'paper-form',
  },
  {
    route:
      '/search/q=((title%3A"supernova"%20REISS)%20AND%20year%3A1996-1997)&sort=date%20desc%2C%20bibcode%20desc&p_=0',
    name: 'search-page',
  },
];
