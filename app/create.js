'use strict';

const pkg = require('../package.json');
const fs = require('fs-extra');
const path = require('path');
const validatePkgName = require('validate-npm-package-name');

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
const valid = validatePkgName(projectName);
if(!valid.validForNewPackages) {
  console.error(`  Sorry, ${chalk.red(projectName)} is not a valid NPM project name`);
  if(valid.errors) {
    console.log('Error:');
    console.log(`  ${chalk.yellow(valid.errors.join('; '))}`);
  }
  if(valid.warnings) {
    console.log('Warning:');
    console.log(`  ${chalk.yellow(valid.warnings.join('; '))}`);
  }
  process.exit(1);
}


// 2. Create the directory
const appRoot = path.resolve(projectName);
fs.ensureDirSync(appRoot);

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
  console.log(`The directory ${chalk.green(projectName)} contains files that could conflict:`);
  console.log();
  for (const file of conflicts) {
    console.log(`  ${file}`);
  }
  console.log();
  console.log('Either try using a new directory name, or remove the files listed above.');
  process.exit(1);
}
console.log(`Creating a new Cloud Block in ${chalk.green(appRoot)}.`);


// 3. Copy files from the example
const exRoot = path.resolve(__dirname, '../examples/1-simple-block');
console.log(`Copying example files...`);

fs.copySync(exRoot, appRoot);


// 4. Rename the project files
const appName = path.basename(appRoot);
console.log(`Renaming the example to ${chalk.green(appName)}`);

function replaceStringInFile (root, file, oldStr, newStr) {
  let data = fs.readFileSync(path.resolve(root, file)).toString();
  data = data.replace(oldStr, newStr);
  fs.writeFileSync(path.resolve(root, file), data);
}

replaceStringInFile(appRoot, 'package.json', 'simple-block', projectName);
[
  'src/index.js',
  'src/simple-block/index.js',
  'src/simple-block/style.scss',
]
.forEach(file => replaceStringInFile(appRoot, file, 'simple-block', appName));

fs.moveSync(path.resolve(appRoot, 'src/simple-block'), path.resolve(appRoot, `src/${appName}`));


// 5. Install packages
console.log('Installing packages. This might take a couple of minutes.');


// 6. Cleanup and finish
console.log(chalk.green('Done!'));
