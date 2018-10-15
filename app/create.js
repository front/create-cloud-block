'use strict';

const pkg = require('../package.json');
const fs = require('fs-extra');
const path = require('path');

const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const projectName = argv._[0];


// 0. Check input
if(argv.version || argv.v) {
  console.log(pkg.version);
  process.exit(0);
}

if(argv.help || argv.h) {
  console.log(`  Only ${chalk.green('<project-directory>')} is required.`);
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(pkg.name)} ${chalk.green('my-block')}`);
  process.exit(0);
}

if (!projectName) {
  console.error('Please specify the project directory:');
  console.log(`  ${chalk.cyan(pkg.name)} ${chalk.green('<project-directory>')}`);
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(pkg.name)} ${chalk.green('my-block')}`);
  process.exit(1);
}


// 1. Validate the project name
const appRoot = path.resolve(projectName);
const appName = path.basename(appRoot);


// 2. Create the directory
fs.ensureDir(appRoot);
console.log(`Creating a new Cloud Block in ${chalk.green(appRoot)}.`);


// 3. Copy files from the example
const exRoot = path.resolve(__dirname, '../examples/1-simple-block');
console.log(`Copying example files...`);

fs.copySync(exRoot, appRoot);


// 4. Rename the project files
console.log(`Renaming the example to ${appName}`);


// 5. Install packages
console.log('Installing packages. This might take a couple of minutes.');


// 6. Cleanup and finish
console.log(chalk.green('Done!'));
