module.exports = {
  baseUrl: '.',
  appDir: 'src',
  dir: 'build',
  mainConfigFile: 'src/discovery.config.js',
  modules: [
    {
      name: 'main'
    }
  ],
  optimize: 'none',
  writeBuildTxt: false,
  inlineText: true,
  removeCombined: true
};