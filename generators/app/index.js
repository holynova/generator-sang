'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  // Init() {
  //   this.log(this.fs.copy);
  //   this.log(this.fs.mkdir);
  // }
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

  // MakeFolders() {
  //   const name = this.props.projectName;
  //   this.fs.mkdir(name);
  //   this.fs.mkdir(name + '/src');
  //   this.fs.mkdir(name + '/src/images');
  //   this.fs.mkdir(name + '/src/styles');
  //   this.fs.mkdir(name + '/src/scripts');
  // }

  writing() {
    this.fs.copy(this.templatePath('all'), this.destinationPath());
    // This.fs.copy(this.templatePath('all/src'), this.destinationPath('src'));
    // This.fs.copy(this.templatePath(''), this.destinationPath('src'));
  }

  install() {
    this.installDependencies();
  }
};