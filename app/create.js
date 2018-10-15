'use strict';

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const input = require('./input');
const validate = require('./validate');
const rename = require('./rename');


// 0. Check input
const projectName = input.getProjectName();


// 1. Validate the project name
validate.checkProjectName(projectName);


// 2. Create the directory
const appRoot = path.resolve(projectName);
fs.ensureDirSync(appRoot);


// 3. Check for file conflicts
validate.checkFileConflicts(appRoot);
console.log(`Creating a new Cloud Block in ${chalk.green(appRoot)}`);


// 4. Copy files from the example
const example = path.resolve(__dirname, '../examples/1-simple-block');
console.log('Copying example files...');

fs.copySync(example, appRoot);


// 5. Rename the project files
const appName = path.basename(appRoot);
console.log(`Renaming the example to ${chalk.green(appName)}`);

rename.updatePkg(appRoot, projectName);
rename.updateFiles(appRoot, appName);
rename.renameBlock(appRoot, appName);


// 6. Install packages
console.log('Installing packages. This might take a couple of minutes.');


// 7. Cleanup and finish
console.log(chalk.green('Done!'));
