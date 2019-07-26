const { readdirSync } = require('fs');
const { spawn } = require('child_process');
const { resolve } = require('path');

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const runningTotal = [];
const procs = [];
const time = +new Date();
getDirectories(__dirname).forEach((dir) => {

  const proc = spawn('node', [ resolve(dir, 'index.js') ]);
  procs.push(1);

  proc.on('close', (diff) => {
    if (diff > 0) {
      runningTotal.push({ result: 'fail', name: dir, diff });
      console.error(dir, '::', diff);
    } else {
      runningTotal.push({ result: 'pass', name: dir, diff });
      console.log(dir, '::', diff);
    }
    procs.pop();
  });
});

const finish = () => {
  const passes = runningTotal.filter((run) => run.result === 'pass');
  const failures = runningTotal.filter((run) => run.result === 'fail');
  console.log(`
  passes: ${ passes.length }
  failures: ${ failures.length }

  total time: ${ (+new Date() - time) / 1000 } seconds
  `);

  if (failures > 0) {
    failures.forEach((fail) => {
      console.error(fail);
    });
  }
}

let check = () => {
  if (procs.length === 0) {
    return finish();
  }
  setTimeout(check, 500);
};

check();
