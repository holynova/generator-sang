'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
// Const yosay = require('yosay');
const typeDict = {
  1: { title: '移动端Html5 + webpack', tplPath: 'mobile_webpack' },
  2: { title: 'PC端网页 + webpack', tplPath: 'pc_webpack' },
  3: { title: '移动端Html5 + gulp', tplPath: 'mobile_gulp' },
  4: { title: 'PC端网页 + gulp', tplPath: 'pc_gulp' }
};

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log('请先建立项目文件夹, cd到项目文件夹, 再运行命令: yo sang');
    let message = '选择项目类型:\n';
    let keys = Object.keys(typeDict);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let str = `${key}: ${typeDict[key].title} \n`;
      message += str;
    }

    const prompts = [
      {
        type: 'input',
        name: 'projectType',
        message,
        default: 1
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const type = this.props.projectType;
    // This.log('this.props.projectType' + this.props.projectType)

    let settings = typeDict[type];
    // This.log('settings', settings)
    if (settings) {
      this.fs.copy(this.templatePath(settings.tplPath), this.destinationPath());
    }
  }
  // 复制以点开头的特殊文件
  copyTools() {
    const toolsPath = 'tools';
    const files = [
      { srcName: '_.babelrc', destName: '.babelrc' },
      { srcName: '_.eslintrc.js', destName: '.eslintrc.js' },
      { srcName: '_.gitignore', destName: '.gitignore' }
    ];
    for (let i = 0; i < files.length; i++) {
      let { srcName, destName } = files[i];
      // Let fromPath = path.resolve(toolsPath, srcName)
      let fromPath = path.join(toolsPath, toolsPath);
      //  `${toolsPath}\\${srcName}`;
      this.fs.copy(
        this.templatePath(fromPath),
        this.destinationPath(destName));
    }
  }

  install() {
    this.log('正在安装依赖包, 你可以选择手动中止, 手动用cnpm来安装以加快速度');
    this.npmInstall();
  }
};
