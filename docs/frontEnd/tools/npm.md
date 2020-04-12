# npm相关

[[toc]]

## npm篇

### 修改npm的源
```bash
//设置淘宝源
npm config set registry https://registry.npm.taobao.org

//设置公司的源
npm config set registry http://127.0.0.1:4873

//查看源，可以看到设置过的所有的源
npm config get registry
```
### 临时使用

```bash
//本次从淘宝仓库源下载
npm --registry=https://registry.npm.taobao.org install
```

### 使用cnpm命令代替npm

```bash
// 安装cnpm命令,不会改变npm的源
npm install -g cnpm --registry=https://registry.npm.taobao.org

//使用
cnpm install
```

### 修改npm配置文件

```bash
// 编辑 ~/.npmrc 加入下面内容
registry = https://registry.npm.taobao.org
```
***

## nrm篇

[用nrm一键切换npm源](https://www.cnblogs.com/wangmeijian/p/7072053.html)

### 安装：

```bash
npm install nrm -g --save
```

### 展示所有npm源

```bash
nrm ls 
```

```
  npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
* taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```

### 当前源：

```bash
nrm current
```

### 切换源
http://r.cnpmjs.org/，命令：nrm use 源的别名，即

```bash
nrm use cnpm
```

### 增加源

用nrm add 命令添加公司私有npm源，如http://registry.npm.360.org(随便写的)，起个别名叫qihoo

```bash
nrm add qihoo http://registry.npm.360.org
```

## npx篇

### 介绍

npm v5.2.0引入的一条命令（npx），引入这个命令的目的是为了提升开发者使用包内提供的命令行工具的体验。

举例：使用`create-react-app`创建一个react项目。
老方法：

```bash
npm install -g create-react-app
create-react-app my-app
```

npx方式：

```bash
npx create-react-app my-app
```

这条命令会临时安装 create-react-app 包，命令完成后create-react-app 会删掉，不会出现在 global 中。下次再执行，还是会重新临时安装。
npx 会帮你执行依赖包里的二进制文件。
举例来说，之前我们可能会写这样的命令：

```bash
npm i -D webpack
./node_modules/.bin/webpack -v
```

如果你对 bash 比较熟，可能会写成这样：
npm i -D webpack
`npm bin`/webpack -v

有了 npx，你只需要这样：
```bash
npm i -D webpack
npx webpack -v
```

也就是说 npx 会自动查找当前依赖包中的可执行文件，如果找不到，就会去 PATH 里找。如果依然找不到，就会帮你安装！
npx 甚至支持运行远程仓库的可执行文件：

```bash
npx github:piuccio/cowsay hello
```

再比如 npx http-server 可以一句话帮你开启一个静态服务器！（第一次运行会稍微慢一些）

```bash
npx http-server
```
指定node版本来运行npm scripts：

```bash
npx -p node@8 npm run build
```
### 主要特点：

* 1、临时安装可执行依赖包，不用全局安装，不用担心长期的污染。
* 2、可以执行依赖包中的命令，安装完成自动运行。
* 3、自动加载node_modules中依赖包，不用指定$PATH。
* 4、可以指定node版本、命令的版本，解决了不同项目使用不同版本的命令的问题。

链接：https://www.jianshu.com/p/cee806439865


## node篇

### node管理模版n

首先，你得用npm全局安装一个管理node版本的管理模板n，对就是[n](https://github.com/tj/n)

```bash
npm i -g n
```

### 升级node版本

管理板块n的命令有很多

* 升级到指定的版本

`n 版本号 如 n 10.0.0`

* 安装最新的版本

`n latest`

* 安装最近的稳定版本

`n stable`



