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
  apps: {
    src: 'src/js/apps/**/*.js'
  },
  bugutils: {
    src: 'src/js/bugutils/**/*.js'
  },
  components: {
    src: 'src/js/components/**/*.js'
  },
  mixins: {
    src: 'src/js/mixins/**/*.js'
  },
  modules: {
    src: 'src/js/modules/**/*.js'
  },
  page_managers: {
    src: 'src/js/page_managers/**/*.js'
  },
  services: {
    src: 'src/js/services/**/*.js'
  },
  widgets: {
    src: 'src/js/widgets/**/*.js'
  },
  wraps: {
    src: 'src/js/wraps/**/*.js'
  }
};
