'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        '请先建立文件夹, cd到项目文件夹, 再运行 yo sang ' + chalk.red('generator-sang')
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: '输入项目名(默认为文件夹名)',
        Default: this.appname
      }
    ];
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath('all'), this.destinationPath());
    // This.fs.copy(this.templatePath('all/src'), this.destinationPath('src'));
    this.fs.copy(this.templatePath('all/_.babelrc'), this.destinationPath('all/.babelrc'));
    this.fs.copy(
      this.templatePath('all/_.eslintrc.js'),
      this.destinationPath('all/.eslintrc.js')
    );
    this.fs.copy(
      this.templatePath('all/_.gitignore'),
      this.destinationPath('all/.gitignore')
    );
    // This.fs.copy(this.templatePath('all/.babelrc'), this.destinationPath('all/.babelrc'));
  }

  install() {
    this.installDependencies();
  }
};
