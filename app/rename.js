'use strict';

const fs = require('fs-extra');
const path = require('path');

const example = 'simple-block';
const exFiles = [
  'src/index.js',
  'src/simple-block/index.js',
  'src/simple-block/style.scss',
];


function replaceStringInFile (root, file, oldStr, newStr) {
  let data = fs.readFileSync(path.resolve(root, file)).toString();
  data = data.replace(oldStr, newStr);
  fs.writeFileSync(path.resolve(root, file), data);
}


module.exports = {
  updatePkg (root, project, includeEditor = true) {
    const pkg = require(path.resolve(root, 'package.json'));
    pkg.name = project;
    pkg.files = ['build/', 'screenshot.png'];
    if(!includeEditor) {
      delete pkg.devDependencies['@frontkom/g-editor'];
      delete pkg.scripts.start;
    }
    fs.writeFileSync(path.resolve(root, 'package.json'), JSON.stringify(pkg, null, 2));
  },

  updateFiles (root, app) {
    exFiles.forEach(file => replaceStringInFile(root, file, example, app));
  },

  renameBlock (root, app) {
    fs.moveSync(path.resolve(root, `src/${example}`), path.resolve(root, `src/${app}`));
  },
};
