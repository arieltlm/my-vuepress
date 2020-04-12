# babel走一遍

> 20200405

[[toc]]

> 写在之前：
之前对这块也是掌握了一些，但是总感觉不是那么的清晰通透，这次很神奇的为了验证ES2020的代码然后从`babel6.x`的知识点开始，搜索babel-node为何本地不能使用，然后快速生成了一个简单的ES6代码运行环境，接着理解了`babel`,`babel-node`，然后接着测试ES2020代码的时候，又发现这些插件必须要babel7，然后进行全面升级，又仔细看了babel官网。最后想总结一句————还是应该仔细研读官网，写的非常仔细和全面。

> 这块实践代码在[github es6](https://github.com/arieltlm/basic-practice/tree/master/es6/es-test)

## 1.快速生成一个简单的ES6代码运行环境

项目中局部安装babel-cli（注意在之前最好执行一下npm init -y）
安装了bable-cli后，.node_modules/.bin下面就有可执行的babel转码工具和babel-node工具;


* （babel-node 工具提供了一个支持 ES6 的 REPL 交互式运行环境。在此环境中，我们可以做一些简单的代码调试）

* （babel工具可以进行将es6代码转成es5标准输出）


此时还需要在根目标下添加.babelrc文件,该文件用来设置转码规则和插件：

```js
{
    "presets": [],
    "plugins": []
}
```

不安装转码规则之前，ES6语法无法运行:

```bash
# 局部安装执行：
$ ./node_modules/.bin/babel-node     
> const a = ''

# 全局安装过的话：
$ babel-node
> const a = ''

# 得到结果--报语法错误
$ [SyntaxError: repl: Only `var` variables are supported in the REPL
> const a = ''
...
```

在项目中安装转码规则：`npm install babel-preset-es2015`

同时在.babelrc中添加：

```json
{
    "presets":["es2015"],
    "plugins":[]
}
```
此时代码可执行了；

可以直接执行`babel-node d.js`,此时其中的`import`不会报错

此时最简单的es6代码调试环境已经安装完毕;

## 【扩展运动】

### 1). 转码规则

* ES6转码规则：`npm install --save-dev babel-preset-es2015`
* react转码规则: `npm install --save-dev babel-preset-react`
* ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个: `babel-preset-stage-0, babel-preset-stage-1, babel-preset-stage-2, babel-preset-stage-3`

安装了转码规则之后，`.babelrc`需要更新：

```js
{
    "presets": [
        "es2015",
        "react",
        "stage-3" 
    ],
    "plugins": []
}
```

### 2). babel基本用法

```bash
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件 (--out-file 或 -o 参数指定输出文件)
$ babel example.js --out-file compiled.js
或者
$ babel example.js -o compiled.js

# 整个目录转码 (--out-dir 或 -d 参数指定输出目录)
$ babel src --out-dir lib
或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

### 3). 在package.json中配置
script 启动程序,简化开发

```json
{
    "scripts":{
        "start":"babel demo.js --out-file bunder.js",
        "build":"babel src -d lib",
        "dev":"babel-node d.js"
    },
}
```

### 4). `babel-core`

如果某些代码需要调用Babel的API进行转码，就要使用`babel-core`模块

### 5).`babel-polyfill`

Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。


**知识来源**
[[Babel]代码转码器的使用说明](https://www.jianshu.com/p/5c509e4473c2)
[ES6环境搭建(Node & babel)](https://www.jianshu.com/p/74b0e2014735)
[说说 Babel 的 babel-node 工具](https://www.jianshu.com/p/875765efe686)
[安装了babel-cli之后不能够使用babel-node？](https://segmentfault.com/q/1010000016459717)

## 3.升级babel7

新版本的Babel7中对官方提供的依赖使用了命名空间`@babel`；
所以之后的都需要安装为`@babel/cli`,`@babel/preset-env`，`@babel/preset-react`等等，`@babel/node`需要自行安装了。

目前出来的转化插件都需要Babel7才可用

具体可以查看[babel文档（官方）](https://www.babeljs.cn/docs/)；

转化插件可查看[babel插件列表（官方）](https://www.babeljs.cn/docs/plugins)


实际使用详细查看官网[Usage Guide](https://www.babeljs.cn/docs/usage):

* 最基础安装下面几个包：

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
```



* 将src下面的文件都转码输出到lib下

```bash
./node_modules/.bin/babel src --out-dir lib
```

还可以增加插件

```bash
./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

原文：Just like with plugins, you can create your own presets too to share any combination of plugins you need. For our use case here, there's an excellent preset named env

就如同插件那样，可以配置很多个preset组合起来用，此次就有一个很棒的包`@babel/preset-env`,不再需要像之前那样，增加es7各个阶段的、`babel-preset-react`、`babel-preset-2015`，只需要一个`preset-env`即可

```bash
./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
```

> 原文：Without any configuration, this preset will include all plugins to support modern JavaScript (ES2015, ES2016, etc.). But presets can take options too. Rather than passing both cli and preset options from the terminal, let's look at another way of passing options: configuration files.

* 配置文件babel.config.json

> [Configure Babel](https://www.babeljs.cn/docs/configuration)

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1",
        },
        "useBuiltIns": "usage",
      }
    ]
  ]
}
```

> 原文：Now the env preset will only load transformation plugins for features that are not available in our target browsers. We're all set for syntax. 

`target`对象里面配置了各个浏览器的支持+;

`useBuiltIns`设置成`usage`时，polyfill垫片会自动调整只使用以上浏览器环境的转化即可，不做多余的


> 原文：Now luckily for us, we're using the env preset which has a "useBuiltIns" option that when set to "usage" will practically apply the last optimization mentioned above where you only include the polyfills you need. 
### 升级遇到问题

*  preset-env
`Error: Cannot find module 'babel-preset-preset-env' from '/Users/tlm/Documents/web-front/test/keep-study/es6-test/test1'
- Did you mean "@babel/preset-env"?`

参考[webpack报错：Module build failed (***): Error: Cannot find module 'babel-preset-env' from '***](https://blog.csdn.net/weixin_43190355/article/details/100329605)将`.babelrc`更改：

```json
{
    "presets":[
        "@babel/preset-env"
    ],
}
```

# 记录

我在全局安装了`@babel/core`和`@babel/node`

```bash
npm install @babel/core --global
npm install @babel/node --global
```

然后在控制台可直接执行：

```bash
$ babel-node src/dynamic-import/index.js

```
