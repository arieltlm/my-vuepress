# x64 os项目启动报错node-sass不对

之前的vue项目启动就报错：
Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime

然后之前使用`npm rebuild node-sass`还是可行的，今天却怎么都不可以

然后查看多个方法，卸了node-sass，清除缓存，再重新安装都不行

查看[node-sass github](https://github.com/sass/node-sass)node 版本16支持的是node-sass6+的版本。那就说明是版本的问题。
目前我电脑上node版本是16.16.0  那么安装node-sass6+  结果sass-loader版本又低，升级后 10+版本打包报错：

const sassResolve = promiseResolve(resolverFactory({ ^ TypeError: resolverFa

如此降低版本到sass-loader7+，node-sass又不匹配了。

算了，降一下node版本吧。nvm管理node，当前就有三个node版本在用，切换到node12.16.2上，再安装npm install node-sass@4.13.0,然后好了。