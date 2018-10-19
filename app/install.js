'use strict';

const fs = require('fs-extra');
const path = require('path');
const spawn = require('cross-spawn');


module.exports = {
  createDir (root) {
    fs.ensureDirSync(root);
  },

  copyExample (root) {
    const example = path.resolve(__dirname, '../examples/1-simple-block');
    fs.copySync(example, root);
  },

  addGitIgnore (root) {
    const data = ['build', 'node_modules', 'package-lock.json', '.DS_Store', ''].join('\n');
    fs.writeFileSync(path.resolve(root, '.gitignore'), data);
  },

  runNPM (root) {
    return spawn.sync(
      'npm',
      ['--prefix', root, 'install'],
      { stdio: 'inherit' }
    );
  }
};
