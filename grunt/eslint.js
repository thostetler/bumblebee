'use strict';
/**
 * Options for the `eslint` grunt task
 *
 * @module grunt/curl
 */
module.exports = {
  options: {
    configFile: 'grunt/config/eslint.config.json'
  },
  source: {
    src: [
      'src/**/*.js',
      '!src/libs/**/*'
    ]
  }
};
