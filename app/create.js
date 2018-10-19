'use strict';

const path = require('path');
const chalk = require('chalk');

const input = require('./input');
const validate = require('./validate');
const rename = require('./rename');
const install = require('./install');


// 1. Get and validate the project name
const { projectName, includeEditor } = input.getProjectName();
validate.checkProjectName(projectName);


// 2. Create the directory
const appRoot = path.resolve(projectName);
install.createDir(appRoot);


// 3. Check for file conflicts
validate.checkFileConflicts(appRoot);
console.log(`Creating a new Cloud Block in ${chalk.green(appRoot)}`);


// 4. Copy files from the example
console.log('Extracting example files');
install.copyExample(appRoot);
install.addGitIgnore(appRoot);


// 5. Rename the project files
const appName = path.basename(appRoot);

rename.updatePkg(appRoot, projectName, includeEditor);
rename.updateFiles(appRoot, appName);
rename.renameBlock(appRoot, appName);


// 6. Install packages
console.log('Installing packages. This might take a couple of minutes.');
install.runNPM(appRoot);


// 7. Cleanup and finish
console.log(`Success! Created ${chalk.green(projectName)} at ${appRoot}`);
console.log(`Inside that directory, you can run several commands:`);
if(includeEditor) {
  console.log();
  console.log(`  ${chalk.cyan('npm start')}`);
  console.log(`    Starts the development editor (no live reload currently).`);
}
console.log();
console.log(`  ${chalk.cyan('npm run build')}`);
console.log(`    Bundles the app into static files for production.`);
console.log();
console.log(`  ${chalk.cyan('npm publish')}`);
console.log(`    Publish the production static files to NPM.`);
console.log();
console.log(`You can start by typing:`);
console.log(`  ${chalk.cyan('cd')} ${chalk.green(projectName)}`);
if(includeEditor) {
  console.log(`  ${chalk.cyan('npm start')}`);
}
console.log();
console.log('🚀');
