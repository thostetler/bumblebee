'use strict';
/**
 * Options for the `critical` grunt task
 *
 * @module grunt/critical
 */
module.exports = {
  release: {
    options: {
      css: [
        'src/styles/css/styles.css'
      ],
      penthouse: {
        keepLargerMediaQueries: true
      }
    },
    src: '_tmp/critical/concatenated.html',
    dest: '_tmp/critical/critical.css'
  }
};
