'use strict';

const path = require('path');
const chalk = require('chalk');

const input = require('./input');
const validate = require('./validate');
const rename = require('./rename');
const install = require('./install');


// 1. Get and validate the project name
const projectName = input.getProjectName();
validate.checkProjectName(projectName);


// 2. Create the directory
const appRoot = path.resolve(projectName);
install.createDir(appRoot);


// 3. Check for file conflicts
validate.checkFileConflicts(appRoot);
console.log(`Creating a new Cloud Block in ${chalk.green(appRoot)}`);


// 4. Copy files from the example
console.log('Copying example files...');
install.copyExample(appRoot);


// 5. Rename the project files
const appName = path.basename(appRoot);
console.log(`Renaming the example to ${chalk.green(appName)}`);

rename.updatePkg(appRoot, projectName);
rename.updateFiles(appRoot, appName);
rename.renameBlock(appRoot, appName);


// 6. Install packages
console.log('Installing packages. This might take a couple of minutes.');
install.runNPM(appRoot);


// 7. Cleanup and finish
console.log(chalk.green('Done!'));
