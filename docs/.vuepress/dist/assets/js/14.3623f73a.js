(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{306:function(s,e,n){"use strict";n.r(e);var t=n(0),o=Object(t.a)({},function(){var s=this,e=s.$createElement,n=s._self._c||e;return n("div",{staticClass:"content"},[s._m(0),n("p",[s._v("之前的vue项目启动就报错：\nNode Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime")]),s._m(1),n("p",[s._v("然后查看多个方法，卸了node-sass，清除缓存，再重新安装都不行")]),n("p",[s._v("查看"),n("a",{attrs:{href:"https://github.com/sass/node-sass",target:"_blank",rel:"noopener noreferrer"}},[s._v("node-sass github"),n("OutboundLink")],1),s._v("node 版本16支持的是node-sass6+的版本。那就说明是版本的问题。\n目前我电脑上node版本是16.16.0  那么安装node-sass6+  结果sass-loader版本又低，升级后 10+版本打包报错：")]),n("p",[s._v("const sassResolve = promiseResolve(resolverFactory({ ^ TypeError: resolverFa")]),n("p",[s._v("如此降低版本到sass-loader7+，node-sass又不匹配了。")]),n("p",[s._v("算了，降一下node版本吧。nvm管理node，当前就有三个node版本在用，切换到node12.16.2上，再安装npm install node-sass@4.13.0,然后好了。")])])},[function(){var s=this.$createElement,e=this._self._c||s;return e("h1",{attrs:{id:"x64-os项目启动报错node-sass不对"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#x64-os项目启动报错node-sass不对","aria-hidden":"true"}},[this._v("#")]),this._v(" x64 os项目启动报错node-sass不对")])},function(){var s=this.$createElement,e=this._self._c||s;return e("p",[this._v("然后之前使用"),e("code",[this._v("npm rebuild node-sass")]),this._v("还是可行的，今天却怎么都不可以")])}],!1,null,null,null);e.default=o.exports}}]);