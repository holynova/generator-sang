# generator-sang [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> 基于Yeoman的前端脚手架
## 说明
基于Yeoman的前端脚手架
## 安装
```bash
npm install -g yo
npm install -g generator-sang
```
## 使用
1. 创建项目文件夹
2. cd 到项目文件夹
3. 命令行运行 `yo sang` 然后按指令选择模板执行

## 支持的项目类型
1. 移动端Html5 + webpack
2. PC端网页 + webpack
3. 移动端Html5 + gulp
4. PC端网页 + gulp

## 调试命令

### gulp项目命令
```
# 编译生成生产环境文件
npm run build 
```

### webpack项目
```
#启动自动刷新的本地server
npm start 

# 编译生成生产环境文件
npm run build 
```
## 常见错误及解决方法
- webpack 项目 `npm start` 后报错
- 解决: 打开`webpack.dev.js` 文件 修改`port`为一个未被占用的端口

## License

MIT © [ymsang](https://github.com/holynova/generator-sang)


[npm-image]: https://badge.fury.io/js/generator-sang.svg
[npm-url]: https://npmjs.org/package/generator-sang
[travis-image]: https://travis-ci.org/holynova/generator-sang.svg?branch=master
[travis-url]: https://travis-ci.org/holynova/generator-sang
[daviddm-image]: https://david-dm.org/holynova/generator-sang.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/holynova/generator-sang
[coveralls-image]: https://coveralls.io/repos/holynova/generator-sang/badge.svg
[coveralls-url]: https://coveralls.io/r/holynova/generator-sang
