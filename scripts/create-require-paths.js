const fs = require('fs');
const path = require('path');

const CDN_BASE = 'https://ads-assets.pages.dev/';
const LOCAL_BASE = '';
const MODULE_ROOT = path.resolve(__dirname, '../src'); // your actual JS root directory
const ignoreRoots = ['shared', 'node_modules', 'libs'];

function walk(dir, prefix = '') {
  const modules = {};
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const full = path.join(dir, file);
    const rel = path.join(prefix, file).replace(/\\/g, '/');

    // Skip src/shared directory
    if (fs.statSync(full).isDirectory()) {
      if (ignoreRoots.some((root) => rel.startsWith(root))) {
        return;
      }
      Object.assign(modules, walk(full, rel));
    } else if (file.endsWith('.js')) {
      const modName = rel.replace(/\.js$/, '');
      modules[modName] = [CDN_BASE + modName, LOCAL_BASE + '/' + modName];
    }
  });
  return modules;
}

const result = walk(MODULE_ROOT);
fs.writeFileSync('require-paths.json', JSON.stringify(result, null, 2));
console.log('✅ Generated require-paths.json');

const overrides = Object.keys(result).reduce((acc, key) => ({ ...acc, [key]: 'empty:' }), {});
fs.writeFileSync('rjs-overrides.json', JSON.stringify(overrides, null, 2));
console.log('✅ Generated rjs-overrides.json');
