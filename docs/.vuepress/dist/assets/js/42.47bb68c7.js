(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{233:function(t,e,n){"use strict";n.r(e);var r=n(0),s=Object(r.a)({},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[t._m(0),n("blockquote",[n("p",[t._v("2018-08-30\n"),n("tag-part",{attrs:{tagName:"npm"}})],1)]),t._m(1),n("p",[n("a",{attrs:{href:"https://www.cnblogs.com/marymei0107/p/6339710.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("创建发布自己的npm包"),n("OutboundLink")],1)]),n("p",[n("a",{attrs:{href:"https://www.jianshu.com/p/36d3e0e00157",target:"_blank",rel:"noopener noreferrer"}},[t._v("手把手教你用npm发布一个包"),n("OutboundLink")],1)]),n("p",[n("a",{attrs:{href:"https://blog.csdn.net/gamesdev/article/details/49018629",target:"_blank",rel:"noopener noreferrer"}},[t._v("npm发布注意事项"),n("OutboundLink")],1)]),n("p",[n("a",{attrs:{href:"https://blog.csdn.net/hamupp/article/details/79337643",target:"_blank",rel:"noopener noreferrer"}},[t._v("如何制作并发布一个vue的组件的npm包"),n("OutboundLink")],1)]),n("blockquote"),n("hr"),t._m(2),n("p",[t._v("npm ：")]),n("p",[t._v("用户名：*")]),n("p",[t._v("密码：*")]),n("p",[t._v("邮箱：*")]),t._m(3),t._m(4),t._m(5),t._m(6),t._m(7),t._m(8),t._m(9),t._m(10),t._m(11),t._m(12),t._m(13),t._m(14),t._m(15),n("p",[t._v("源代码见"),n("a",{attrs:{href:"https://github.com/arieltlm/vue-test/tree/master/vue-npm-packages",target:"_blank",rel:"noopener noreferrer"}},[t._v("github"),n("OutboundLink")],1)])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"发布自己的npm包"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#发布自己的npm包","aria-hidden":"true"}},[this._v("#")]),this._v(" 发布自己的npm包")])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("主要根据以下几个文章即可完成：")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"发布过程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#发布过程","aria-hidden":"true"}},[this._v("#")]),this._v(" 发布过程")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("p",[t._v("要把源（http://registry.npm.taobao.org）切回原npm的源（否则报错403）：")]),n("ul",[n("li",[n("p",[t._v("1）修改~/.npmrc中的registry字段（命令：vi ~/.npmrc）")])]),n("li",[n("p",[t._v("2）直接在命令行修改即可。")])])]),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("npm set registry http://registry.npmjs.org\n")])]),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br")])])]),n("li",[n("p",[t._v("内网包需要更改源为内网源，然后需要登陆 "),n("code",[t._v("npm login")]),t._v("，与公网登陆名用户名一致")])]),n("li",[n("p",[t._v("登陆："),n("code",[t._v("npm login")])])]),n("li",[n("p",[t._v("npm adduser：或在文件夹中使用此登陆")])]),n("li",[n("p",[t._v("发布包："),n("code",[t._v("npm publish")])])]),n("li",[n("p",[t._v("取消发布包："),n("code",[t._v("npm unpublish 包名字@version")])])]),n("li",[n("p",[t._v("发布自己测试的包要删除的话需在24小时之内：")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("npm --force unpublish testxxxxx\n")])]),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[this._v("1")]),e("br")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("p",[t._v("package.json中name的名字即包的名字，发布之后等一会会npm网站上自己的首页就可以看到了")])]),n("li",[n("p",[t._v("每次做了修改后，要更改版本号再发布：")]),n("p",[n("strong",[t._v("版本格式")]),t._v("：主版号.次版号.修订号，\n版号递增规则如下：")]),n("ul",[n("li",[n("p",[t._v("主版号：当你做了不相容的API 修改，")])]),n("li",[n("p",[t._v("次版号：当你做了向下相容的功能性新增，")])]),n("li",[n("p",[t._v("修订号：当你做了向下相容的问题修正。")])])]),n("p",[t._v("先行版号及版本编译资讯可以加到「主版号.次版号.修订号」的后面，作为延伸。")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("// 标记版本号\n命令：sudo npm publish --tag 0.0.1\n")])]),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[this._v("1")]),e("br"),e("span",{staticClass:"line-number"},[this._v("2")]),e("br")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("包测试："),e("code",[this._v("npm link")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("cd到模块目录，npm link，进行全局link")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("cd到项目目录，npm link 模块名(package.json中的name)")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("解除link")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("解除项目和模块link，项目目录下，npm unlink 模块名")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("blockquote",[e("p",[this._v("解除模块全局link，模块目录下，npm unlink 模块名")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"发布的包："}},[e("a",{staticClass:"header-anchor",attrs:{href:"#发布的包：","aria-hidden":"true"}},[this._v("#")]),this._v(" 发布的包：")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("尝试发布包"),e("code",[this._v("vue-amcharts-bar")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("发布包"),e("code",[this._v("ml-solar-system")])])}],!1,null,null,null);e.default=s.exports}}]);