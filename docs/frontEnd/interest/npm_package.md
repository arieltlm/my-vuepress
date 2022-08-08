# 发布自己的npm包
> 2018-08-30
<tag-part tagName="npm"/>

> 主要根据以下几个文章即可完成：

[创建发布自己的npm包](https://www.cnblogs.com/marymei0107/p/6339710.html)

[手把手教你用npm发布一个包](https://www.jianshu.com/p/36d3e0e00157)

[npm发布注意事项](https://blog.csdn.net/gamesdev/article/details/49018629)

[如何制作并发布一个vue的组件的npm包](https://blog.csdn.net/hamupp/article/details/79337643)
>
***

## 发布过程
npm ：

用户名：*

密码：*

邮箱：*

* 要把源（http://registry.npm.taobao.org）切回原npm的源（否则报错403）：

    + 1）修改~/.npmrc中的registry字段（命令：vi ~/.npmrc）

    + 2）直接在命令行修改即可。
    
    ```
    npm set registry http://registry.npmjs.org
    ```
* 内网包需要更改源为内网源，然后需要登陆 `npm login`，与公网登陆名用户名一致
* 登陆：`npm login`
* npm adduser：或在文件夹中使用此登陆
* 发布包：`npm publish`

* 取消发布包：`npm unpublish 包名字@version`

* 发布自己测试的包要删除的话需在24小时之内：
```
npm --force unpublish testxxxxx
```
* package.json中name的名字即包的名字，发布之后等一会会npm网站上自己的首页就可以看到了
* 每次做了修改后，要更改版本号再发布：

    **版本格式**：主版号.次版号.修订号，
    版号递增规则如下：

    + 主版号：当你做了不相容的API 修改，

    + 次版号：当你做了向下相容的功能性新增，

    + 修订号：当你做了向下相容的问题修正。

    先行版号及版本编译资讯可以加到「主版号.次版号.修订号」的后面，作为延伸。
    
```
// 标记版本号
命令：sudo npm publish --tag 0.0.1
```
* 包测试：`npm link`

>cd到模块目录，npm link，进行全局link

>cd到项目目录，npm link 模块名(package.json中的name)

>解除link

>解除项目和模块link，项目目录下，npm unlink 模块名

>解除模块全局link，模块目录下，npm unlink 模块名

## 发布的包：

尝试发布包`vue-amcharts-bar`

发布包`ml-solar-system`

源代码见[github](https://github.com/arieltlm/vue-test/tree/master/vue-npm-packages)