# require.context使用


**语法**：

```js
require.context(directory, useSubdirectories = false, regExp = /^.//);
```

**[require.context函数接受三个参数]**((https://www.jianshu.com/p/c894ea00dfec)：

* 1.directory {String} -读取文件的路径

* 2.useSubdirectories {Boolean} -是否遍历文件的子目录

* 3.regExp {RegExp} -匹配文件的正则

引用[使用require.context实现前端工程自动化](https://www.jianshu.com/p/c894ea00dfec)

值得注意的是require.context函数执行后返回的是**一个函数,并且这个函数有3个属性**

* 1.resolve {Function} -接受一个参数request,request为文件夹下面匹配文件的相对路径,返回这个匹配文件相对于整个工程的相对路径

* 2.keys {Function} -返回匹配成功模块的名字组成的数组

* 3.id {String} -执行环境的id,返回的是一个字符串,主要用在module.hot.accept,应该是热加载?

这三个都是作为函数的属性(注意是作为函数的属性,函数也是对象,有对应的属性)



## 1).文件引用

为适应多主题使用，在组件下写多个针对不同主题的配置方案，此时可以通过require.context引用，从而在需要切换别的主题时，只需要更改外层的theme即可切换所有的相应的echarts的配置：

文件目录如下：

![require.context.echarts](~@alias/require.context.echarts.png)

```js
// theme为从外层注入的dataset，可以切换选择主题[当前为black]
const { theme } = document.getElementById('container').dataset
const requireContext = require.context('./', true, /([a-z])\/$/)
const res = {}
requireContext.keys().forEach(themePath => {
    /**
     * themePath 为./blue,./black,所以通过正则replace只留下blue或black文件名字
     */
    const themeName = themePath.replace(/^\.\//, '').replace(/\/$/, '')
    /**
     * require相应文件地址下的index.js，将文件名作为key,地址作为value,组成对象
     */
    // eslint-disable-next-line import/no-dynamic-require
    res[themeName] = require(`${themePath}index.js`).default
})

/**
 * theme当前是blue
 * res为：{
 *  'blue':{},
 *  'black':{}
 * }
 */
export default {
    theme,
    ...res
}
```

然后在`index.jsx`中使用:

```js
import themes from './themes'
const curConfig = themes[themes.theme] // 为当前主题色的相关配置
```

## 2).图片使用

```js
const req = require.context('@/images/etl-model-dag/', false, /\.png$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const moduleObj = requireAll(req)
console.log('requireAll(req):', requireAll(req))

/**
 * req.keys()是一个数组
 * req.id 是一个字符串，是三个参数的实际值
 */
console.log(req.keys()) // ["./mid-table.png", "./operator-title.png", "./operator.png", "./origin-datasource.png"]
console.log(req.id) // ./src/images/etl-model-dag sync \.png$

const res = {}

req.keys().forEach((imgPath, index) => {
    /**
     * imgPath "./mid-table.png"等，对其进行正则替换只留下图片名字
     * imgName 为mid-table等
     */
    const imgName = imgPath.replace(/^\.\//, '').replace(/\.png/, '')

    /**
     * 我们想像使用配置文件一样取图片require(`${themePath}index.js`).default，此处就需要注意了，由于我们的图片太小，
     * 在webpack打包时进行了配置，所以其打包成了base64，所以就取不到了
     * 此处我们使用了requireAll(req)后的default
     */
    // eslint-disable-next-line import/no-dynamic-require
    res[imgName] = moduleObj[index].default
})

/**
 * {
 *  'mid-table':"data:image/png;base64,....",
 *  'operator-title':"data:image/png;base64,....",
 *  ...
 * }
 */
export default {
    ...res
}
```

`requireAll(req)`执行后得到的是一个数组:

![requireall](~@alias/requireall.png)

最终得到的是一个对象：

![require.context-img](~@alias/require.context-img.png)

然后就可以引入通过`key`值进行获取了；
