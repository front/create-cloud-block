'use strict';

const fs = require('fs-extra');
const chalk = require('chalk');
const validatePkgName = require('validate-npm-package-name');


module.exports = {
  checkProjectName (projectName) {
    const valid = validatePkgName(projectName);
    if(!valid.validForNewPackages) {
      console.error(`Sorry, ${chalk.red(projectName)} is not a valid NPM project name`);
      console.log();
      if(valid.errors) {
        console.log('Error:');
        console.log(`  ${chalk.yellow(valid.errors.join('; '))}`);
        console.log();
      }
      if(valid.warnings) {
        console.log('Warning:');
        console.log(`  ${chalk.yellow(valid.warnings.join('; '))}`);
        console.log();
      }
      process.exit(1);
    }

    return true;
  },

  checkFileConflicts (appRoot) {
    const appFiles = [
      '.babelrc',
      '.eslintrc',
      '.gitignore',
      'README.md',
      'package.json',
      'screenshot.png',
      'src',
      'webpack.config.js',
    ];

    const conflicts = fs.readdirSync(appRoot).filter(file => appFiles.includes(file));
    if(conflicts.length > 0) {
      console.log(`The directory ${chalk.green(appRoot)} contains files that could conflict:`);
      for (const file of conflicts) {
        console.log(`  ${file}`);
      }
      console.log();
      console.log('Either try using a new directory name, or remove the files listed above.');
      process.exit(1);
    }

    return true;
  }
};
