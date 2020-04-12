# vuepress搭建个人博客填坑
> 2018-06-12
<tag-part tagName="vuepress"/>

[[toc]]

***
[我的博客](https://arieltlm.github.io/my-blog/)
## 1.侧边栏
[官网](http://caibaojian.com/vuepress/guide/)上讲了两种方式：
* 你可以使用对象将侧边栏链接分成多个组：
```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',
        collapsable: false,
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ]
      }
    ]
  }
}
```
* 如果你希望为不同的页面组显示不同的侧边栏，请先将页面组织到目录中：
```javascript
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      // 侧边栏在 /foo/ 上
      '/foo/': [
        '',
        'one',
        'two'
      ],
      // 侧边栏在 /bar/ 上
      '/bar/': [
        '',
        'three',
        'four'
      ]
    }
  }
}
```

**我呢，想如何把两个组合起来使用：**
```javascript
nav: [
    { text: 'Home', link: '/' },
    { text: '前端之路', link: '/frontEnd/' },
    { text: 'one-monent', link: '/life/' },
    { text: 'Github', link: 'https://github.com/arieltlm/' },
],
sidebarDepth: 0,
sidebar:{
    '/frontEnd/':[
        {
            title: 'JavaScript', // 侧边栏名称
            collapsable: true, // 可折叠
            children: [
                '/frontEnd/javascript/', // 你的md文件地址
                '/frontEnd/javascript/one', // 你的md文件地址
            ]
        },
        {
            title: 'css', // 侧边栏名称
            collapsable: true, // 可折叠
            children: [
                '/frontEnd/css/', // 你的md文件地址
                '/frontEnd/css/one', // 你的md文件地址
            ]
        },
    ],
    '/life/':[
        '',
        'one',
        'two'
    ]
}
```
## 2.图片放置位置

在.vuepress 创建public文件夹，图片或者静态文件均可以放在此文件夹下，vuepress在打包时会将此处内容移动到根目录下。


## 3.favicon.ico

config.js中增加：
```javascript
head:[
    ['link',{rel:'shortcut icon',href:'/icons/favicon.ico'}]
],
```

## 4.在vuepress中使用vue组件

在.vuepress下面创建components。然后组件就和平时写vue组件一模一样，要使用sass等的也和平常的vue一样。

在任何一个md文件中都可以直接使用组件，组件名就是文件名。

```html
<tag-part tagName="vuepress"/>
```

可参考[github上myblog中标签的实现](https://github.com/arieltlm/my-blog)
[博客实例](https://arieltlm.github.io/my-blog/)

**踩坑**：

[官网](http://caibaojian.com/vuepress/guide/using-vue.html)上有说明，确保自定义组件的名称包含连字符或符合 PascalCase 命名规则,否则报错。

## 5.部署运行
在根目录下执行`vuepress build docs` 就会在.vuepress目录下生成dist文件夹

进入dist文件夹`cd docs/.vuepress/dist`，执行

```bash
git init
git add -A
git commit -m 'delopy'
git push -f https://github.com/arieltlm/my-blog.git master:gh-pages
```

## 6. vuepress中markdown中git命令行高亮的代码为bash
举例(```bash)：

```bash
git add .
```

## 7. vuepress中增加样式

在config.js`head`中增加

```js
head: [
    ["link", { rel: "shortcut icon", href: "/images/favicon.ico" }],
    ["link", { rel: "stylesheet", href: "/style/style.css" }],
],
```

路径是相对于pubilc，所以将文件只需要放在public文件夹下即可。

或者在override.styl文件中直接添加也可以

# 8. .md文件中添加图片

![md文件中添加图片](../images/img.png)