'use strict';

const chalk = require('chalk');
const minimist = require('minimist');
const pkg = require('../package.json');


module.exports = {
  getProjectName () {
    const argv = minimist(process.argv.slice(2));
    const projectName = argv._[0];

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

    return projectName;
  }
};
