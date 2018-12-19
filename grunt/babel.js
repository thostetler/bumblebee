'use strict';
/**
 * Options for the `babel` grunt task
 *
 * @module grunt/babel
 */
module.exports = {
  release: {
    files: [{
      expand: true,
      cwd: 'dist/js',
      src: '**/*.js',
      dest: 'dist/js'
    }]
  },
  build: {
    files: [{
      src: 'build/app.built.js',
      dest: 'build/app.built.js'
    }]
  }
};
