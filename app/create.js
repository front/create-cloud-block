'use strict';

const packageJson = require('../package.json');

const chalk = require('chalk');
const commander = require('commander');
const fs = require('fs-extra');
const path = require('path');


let projectName;

const program = new commander.Command(packageJson.name)
.version(packageJson.version)
.arguments('<project-directory>')
.usage(`${chalk.green('<project-directory>')} [options]`)
.action(name => {
  projectName = name;
})
.allowUnknownOption()
.on('--help', () => {
  console.log(`  Only ${chalk.green('<project-directory>')} is required.`);
  console.log();
})
.parse(process.argv);

if (typeof projectName === 'undefined') {
  console.error('Please specify the project directory:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`);
  console.log();
  console.log('For example:');
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-block')}`);
  console.log();
  console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
  process.exit(1);
}



// 1. Create the directory

const appRoot = path.resolve(projectName);
const appName = path.basename(appRoot);

// TODO: Check and validate the appName

// 1.1 Create the directory
fs.ensureDir(appRoot);

console.log(`Creating a new Cloud Block in ${chalk.green(appRoot)}.`);


// 1.2 Copy files from the example
const exJson = require.resolve('../examples/1-simple-block/package.json');
const exRoot = path.dirname(exJson);

console.log(`Copying files...`);

fs.copySync(exRoot, appRoot);


// 1.3 Rename the project files
console.log(`Renaming the project to ${appName}`);


console.log(chalk.green('Done!'));
