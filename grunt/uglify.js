'use strict';
/**
 * Options for the `uglify` grunt task
 *
 * @module grunt/uglify
 */
module.exports = {
  release: {
    options: {
      mangle: true,
      compress: {
        sequences: true,
        properties: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      output: {
        comments: false
      }
    },
    files: [{
      expand: true,
      cwd: 'build',
      src: '**/*.bundle.js',
      dest: 'build'
    }]
  }
};
