# dll的理解和实践
> 20190115

[[toc]]

## 1.dll(动态链接库)打包原理

[彻底解决Webpack打包性能问题——manifest.json](https://blog.csdn.net/suhuaiqiang_janlay/article/details/79715969)

**问题提出：** 
webpack每次打包的时候，无论是改变没改变的都要打包一遍，对于第三方插件或者库来说，打包就做了重复的工作，增加了时间，影响了性能。

**问题试解决：**

```js
module.exports = {
    externals: {
        'react': 'window.React'
    }
    //其它配置忽略......
};

```

使用externals来将react 这个模块就不要打包啦，直接指向 window.React 就好。不过别忘了加载 react.min.js，让全局中有 React 这个变量。

**问题再出现：**

再加入一个react的相关插件库之后，插件中有require('react')后，打包又会把react再打包一遍；

**问题初级解决：**
手工打包这些 module，然后设置 externals ，让 Webpack 不再打包它们。

我们需要这样一个 lib-bundle.js 文件：
```js

window.__LIB["react"] = require("react");
window.__LIB["react-addons-css-transition-group"] = require("react-addons-css-transition-group");
// ...其它依赖包

```
我们在这里把一些第三方库注册到了 window.__LIB 下，这些库可以作为底层的基础库，免于重复打包。

然后执行
```bash
webpack lib-bundle.js lib.js
```
得到打包好的 lib.js。然后去设置我们的 externals ：
```js
var webpack = require('webpack');
module.exports = {
externals: {
        'react': 'window.__LIB["react"]',
        'react-addons-css-transition-group': 'window.__LIB["react-addons-css-transition-group"]',
        // 其它库
    }
    //其它配置忽略...... 
};
```
这时由于 externals 的存在，Webpack 打包的时候就会避开这些模块超多，依赖关系复杂的库，把这些第三方 module 的入口指向预先打包好的 lib.js 的入口 window.__LIB，从而只打包我们的业务代码。
**终极解决方法-dll:**

dll----动态链接库。
dll一个纯净的依赖库，本身不能运行，是用来给你的app或者业务代码引用的；

————webpack.DllPlugin插件

* 1.打包dll包
* 2.引用dll包，打包业务代码

首先我们来打包ddl包，首先配置一个这样的 dll.config.js：
```js
const webpack = require('webpack');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    // ...其它库
];

module.exports = {
    output: {
        path: 'build',
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
};
```
`webpack.DllPlugin` 的选项中：

* path 是 manifest.json 文件的输出路径，这个文件会用于后续的业务代码打包；
* name 是 dll 暴露的对象名，要跟 output.library 保持一致；
* context 是解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。
运行Webpack，会输出两个文件一个是打包好的 lib.js，一个就是 manifest.json，它里面的内容大概是这样的：
```js
{
    "name": "vendor_ac51ba426d4f259b8b18",
    "content": {
        "./node_modules/react/react.js": 1,
        "./node_modules/react/lib/React.js": 2,
        "./node_modules/react/node_modules/object-assign/index.js": 3,
        "./node_modules/react/lib/ReactChildren.js": 4,
        "./node_modules/react/lib/PooledClass.js": 5,
        "./node_modules/react/lib/reactProdInvariant.js": 6,
        // ............
    }
}
```
接下来我们就可以快乐地打包业务代码啦，首先写好打包配置文件 webpack.config.js：

```js
const webpack = require('webpack');
module.exports = {
    output: {
        path: 'build',
        filename: '[name].js',
    },
    entry: {
        app: './src/index.js',
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
        }),
    ],
};
```
`webpack.DllReferencePlugin` 的选项中：

* context 需要跟之前保持一致，这个用来指导 Webpack 匹配 manifest.json 中库的路径；
* manifest 用来引入刚才输出的 manifest.json 文件。
* DllPlugin 本质上的做法和我们手动分离这些第三方库是一样的，但是对于包极多的应用来说，自动化明显加快了生产效率。

引用[彻底解决Webpack打包性能问题——manifest.json](https://blog.csdn.net/suhuaiqiang_janlay/article/details/79715969)