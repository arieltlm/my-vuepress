# first与vue亲密接触
挖坑和填坑之路
----------------

>2018-05-28
<tag-part tagName="vue"/>

[[toc]]
## 1. vuex以及本地存储localStorage如何实现登录之后在刷新的时候登录状态仍然在。

> 借鉴这篇回答：[如何使用localStorage结合Vuex来保存用户登录信息?](https://segmentfault.com/q/1010000012065855)

遇到问题——当时是期待根据localStorage中的值的改变在计算属性中随时得到新的值。事实上。vue中的值并不会因为localStorage中值的改变而变化的，触发不了。所以完美的办法就是所有和localStorage相关的都在vuex中处理，这样状态就可以实时改变了。

当时我的问题是——我想每次进入页面后检测现在localStorage中是否有登录的信息，有的话就从localStorage中取，没有的话从vuex中取，这步其实就是等待登录后拿到值，然后在我退出登录时，我清空localStorage里面的值，此时就不能进行一些操作或者一些显示。。。。我是在计算属性中获取的。

后来借鉴上文的回答，一进入页面触发vuex，去把localStorage中的值给vuex中的状态值，然后在组件中只是用状态值就行。所有localStorage的设置值和移除值均在vuex中完成。

整个处理方式就是这样的，很重要，要记住。由于项目在后面改变了方式，所以我又改变了不再使用localStorage来储存值了。

```javascript
//一进入页面
created(){
    this.getLocalData();
},
methods:{
	...mapActions({
	    getLocalData:'getLocalData',
	}),
}
//vuex中
getLocalData({commit}){
    commit(types.GET_LOCALDATA);
},

[types.GET_LOCALDATA] (state){
    if(localStorage.id)
		state.sfz = localStorage.sfz;
		state.user = localStorage.id;
		state.pwd = localStorage.pwd;
		state.loginFlag = false;
	}
	
},
//退出登录
[types.LOGIN_OUT] (state){
	localStorage.removeItem('id');
	localStorage.removeItem('sfz');
	localStorage.removeItem('pwd');
	state.user = '';
	state.sfz ='';
	state.pwd ='';
	state.loginFlag = true;
	
},
```

## 2. Computed property "digitalCert" was assigned to but it has no setter 报错

问题分析： 一个计算属性，如果没有设置 setter,也就是传入的是一个函数，或者传入的对象里没有 set 属性，当你尝试直接该改变这个这个计算属性的值，都会报这个错误。

在此项目中，我写了:

```javascript
mounted() {
var _this = this;
document.onkeydown=function(e) {
    if(e && e.keyCode==81 && e.ctrlKey ){   //同时按下ctrl+q
        _this.digitalCert = false;   
}
           
```

所以更改为以下：

```javascript
computed:{
    digitalCert:{
        get:function(){
            return this.$store.state.login.digitalCert;
        },
        set:function(newValue){
            this.$store.state.login.digitalCert = newValue;
        }
    }
},
```
## 3. 在引入mapState的计算属性时，怎么写普通的计算属性，以及设置getter和setter的计算属性：
**有getter和setter**：

```javascript
computed:{
    digitalCert:{
        get:function(){
            return this.$store.state.login.digitalCert;
        },
        set:function(newValue){
            this.$store.state.login.digitalCert = newValue;
        }
    },
    ...mapState({
        loginBoxFlag: state => state.login.loginBoxshow,
        tipsTxt: state => state.login.tipsTxt,
    }),
},
```
**普通计算属性**：

```javascript
// mapState 辅助函数帮助我们生成计算属
computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,
    // 传字符串参数 'count' 等同于 'state => state.count'
    countAlias: 'count',
    // 为了能使用 'this'获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
        return state.count + this.localCount
    },
    // 常规 computed, 没有使用 store的状态
    localCountAlias () {
        return this.localCount
    }
})
```
## 4.vuex中的请求写成promise格式的好处。
在vuex的action里面的请求要写成promise的形式。举例如我所做的logout。事实上登录的很多状态我也可以不在vuex里面维护的，没有必要，一开始不明白这个道理：

```javascript
//在header.vue中点击按钮触发logout方法
logout() {
	let _this  = this;
	this.$confirm('你确定要注销登录吗?', '提示', {
  		confirmButtonText: '确定',
  		cancelButtonText: '取消',
  		type: 'warning'
    }).then(() => {
    	_this.$store.dispatch('loginOut')
    }).then(() =>{
    	_this.searchValue = '';//就可以这样清除本组件中的值，不需要去vuex中实现
    	_this.$message({
		  	type: 'success',
		  	message: '你已经成功退出登录'
		});
    }).catch((e) => {
      	this.$message({
        	type: 'info',
       		message: '已取消注销登录'
      	});          
    });
  }
```
在vuex中维护：

```javascript
//actions中：
loginOut:({dispatch,commit})=> {
	return new Promise((resolve, reject) => {
		utils.MlTools.ajax({
    		type:'get',
    		url:'/qbeq/userLogOut',
    		success:function(datas){
    			if(datas.code){
					commit(types.LOGIN_OUT)
					resolve(datas)
    			}
    				
    		},
    		error:function(res){
    			console.log(res)
    			reject(datas)
    		}
    	})
		
	})
}

//在mutations中：
[types.LOGIN_OUT] (state){
	state.user = '';
	state.sfz ='';
	state.pwd ='';
	state.loginFlag = true;
	
},

```
重点就想说明在actions中resolve()之后，在vue组件的then之后即为退出成功的处理了。
## 5. 数组初始化在data中而非在computed中；数组的更新必须vue.set
初始化data之后，要在请求中对这个数进行赋值，那么不能在computed中初始化，比如将这个数组的每一个元素都初始化为0；

```javascript
data (){
    return {
        trendValueIn:new Array(10).join(",").split(",").map((item,index) => {return 0;}),
        trendValueOut:new Array(10).join(",").split(",").map((item,index) => {return 0;}),
    }
   
},
computed:{
    // trendValueIn(){
    //     return new Array(10).join(",").split(",").map((item,index) => {return 0;})
    // },
    // trendValueOut(){
    //     return new Array(10).join(",").split(",").map((item,index) => {return 0;})
    // },
},
created(){
    this.reqRrendValue()
},
methods:{
    reqRrendValue(){
        let _this = this;
        this.utils.MlTools.ajax({
            url: '/qbeq/keyperson',
            type: 'post',
            data: {},
            success(data){
                _this.createdtable(data.currDay);
                _this.drawLine(data.totalDay);
            },
            error(err){
                reject(err.message)
            }
        })
    },
    createdtable(data){
        let _this = this;
        
        //今日流入
        let todayDataIn = data.filter((n,m) => {
            if(n.flag == 1){
                return n;
            }
        })
        //今日流出
        let todayDataOut = data.filter((n,m) => {
            if(n.flag == 0){
                return n;
            }
        })
        //总共的
        let totalIn = 0,totalOut = 0;
        todayDataIn.forEach((item,index) => {
            let i = _this.theader.findIndex((value,index) => {
                return value == item.type;
            })
            totalIn += item.num; 
            // _this.trendValueIn[i] = item.num;
            _this.$set(_this.trendValueIn,i-1,item.num)//更新数组需要使用vue.set
        })
        _this.$set(_this.trendValueIn,9,totalIn)
    
        todayDataOut.forEach((item,index) => {
            let i = _this.theader.findIndex((value,index) => {
                return value == item.type;
            })
            totalOut += item.num; 
            // _this.trendValueOut[i] = item.num;
            _this.$set(_this.trendValueOut,i-1,item.num)//更新数组需要使用vue.set
        })
        _this.$set(_this.trendValueOut,9,totalOut)
    },
}
```

## 6. vue中定时器的处理
###（1）一进入页面触发定时器定时发起请求

```javascript
mounted(){
    let _this = this;
    let timeInterval = 10000;//10s
    this.$nextTick(function(){
        _this.timer = setInterval(function(){
            // console.log(new Date())
            _this.reqRrendValue()

        },timeInterval)
        
    })
}
```
### (2) 离开此标签页的时候，清除定时器，返回此标签页时再启动
> 监测 `visibilitychange`事件

```javascript
mounted(){

    window.addEventListener("visibilitychange",()=>{
        // debugger;
        if(document.hidden){
            console.log("我暂时离开页面了");
            clearInterval(_this.timer);
        }else{
            _this.timer = setInterval(function(){
                // console.log(new Date())
                _this.reqRrendValue()

            },timeInterval)
        }
        
   })
    
},
``` 
### （3） 在可视区域时启动定时器，不在时清除定时请求

```javascript
let _this = this;
let timeInterval = 10*1000;//10s

// 由于我的定时器在一进入页面的时候，不在可视区域内，所以不用启动定时器，这块存在无作用
//this.$nextTick(function(){
//     if(isElementInViewport(document.getElementsByClassName("trend")[0])){
//             _this.timer = setInterval(function(){
//                 console.log(11111)
//                 console.log(new Date())
//                 _this.reqRrendValue()

//             },timeInterval) 
//         }else{
//             console.log("不在可视区域，清除定时请求");
//             clearInterval(_this.timer);
//         }
    
// })

window.addEventListener("visibilitychange",() => {
    clearInterval(_this.timer);
    if(document.hidden){
        console.log("我暂时离开页面了");
        clearInterval(_this.timer);
    }else{
       if(isElementInViewport(document.getElementsByClassName("trend")[0])){
            _this.timer = setInterval(function(){
                console.log(2222222)
                console.log(new Date())
                _this.reqRrendValue()

            },timeInterval) 
        }else{
            console.log("不在可视区域,清除定时请求");
            clearInterval(_this.timer);
        }
    }
})

//监测滚动事件
window.addEventListener("scroll",() =>{
    clearInterval(_this.timer);
    console.log(isElementInViewport(document.getElementsByClassName("trend")[0]));
    if(isElementInViewport(document.getElementsByClassName("trend")[0])){
        _this.timer = setInterval(function(){
            console.log(333333)
            console.log(new Date())
            _this.reqRrendValue()

        },timeInterval) 
    }else{
        console.log("不在可视区域，清除定时请求");
        clearInterval(_this.timer);
    }
})

//元素是否在可视区域内
function isElementInViewport (el, offset = 23) {
    const box = el.getBoundingClientRect(),
          top = (box.top >= -25),
          left = (box.left >= 0),
          bottom = (box.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset),
          right = (box.right <= (window.innerWidth || document.documentElement.clientWidth) + offset);

    return (top && bottom&& left  && right);
}
```
### （4）定时器必须在组件生命周期的destory时清除。（必须）
* 在本组件中写的定时器

```javascript
destroyed(){
    console.log("我已经离开页面了");
    clearInterval(this.timer);
},
```

* 引入的js

```javascript
//在mapLoad.js中：

var scrollIntervalStart,scrollInterval;

const mapLoad = {
	....
}

export {mapLoad,scrollIntervalStart,scrollInterval}

//在map.vue中：

import {mapLoad,scrollIntervalStart,scrollInterval} from '@/common/mapLoad';

destroyed(){
	//清除地图上的滚动定时
    console.log("我已经离开页面了");
    clearInterval(scrollIntervalStart);
	clearInterval(scrollInterval);
},
```
## 7.自定义指令
```javascript
/**
 * 注册一个全局自定义指令 v-focus
 */
Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
        // 聚焦元素
        el.focus()
    }
})
/**
 * 注册一个全局自定义指令 v-ctrlq,按下ctrl+q时执行操作
 * 
 */
Vue.directive('ctrlq', {
    bind:function(el,binding,vnode){
        function documentHandler (e) {
            if (e && e.keyCode==81 && e.ctrlKey){
                if (binding.expression) {
                    binding.value(e);
                }
            }
        }
        el.__ctrlq__ = documentHandler;
        document.addEventListener('keydown',documentHandler);
    },
    unbind:function(el,binding){
        document.removeEventListener('keydown',el.__ctrlq__);
        delete el.__ctrlq__;
    }
})

/**
 * 注册一个全局自定义指令 v-clickoutside,在元素之外点击时执行函数，如点击旁边收起下拉框
 * 
 */
Vue.directive('clickoutside',{
    bind:function (el, binding, vnode) {
        function documentHandler (e){
            if (el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click',documentHandler);
    },
    unbind: function (el, binding){
        document.removeEventListener('click',el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    }
})

```
## 8.vue-router 的理解
vue本身起的项目一般为http://localhost:8080,也就是http://localhost:8080/index.html，我们的项目如果是简单的vue单页面应用的话，其本身就只有一个页面——index.html。而路由页就相当于加了几个hash切换，通过js动态加载其他几个页面的，所以其其实是http://localhost:8080/index.html/#/index，http://localhost:8080/index.html/#/list。

同时在服务器上，真实的页面也就只有index.html,所以使用vue-router的mode:history模式就有问题了（这个原理嘛。。。）官网上有处理办法，后端要配合进行配置才可以。


> (官网上)[HTML5 History 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)
vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。
> 如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
>```javascript
> const router = new VueRouter({
>   mode: 'history',
>   routes: [...]
>  })
> ```
> 当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id，也好看！
> 不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。
> 所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。
图片名字也都需要小写。

## 9.vue-router的守卫
本项目中要求在未登录之前，不能进入别的路由页，所以设置全局钩子：

```javascript
const router = new Router({
	base:__dirname,
	routes:routes
})

router.beforeEach((to,from,next) => {
	if(to.meta.requireAuth){
		if(store.state.login.user){
			next()
		}else{
			next({path:'/index'})
			store.commit('LOGIN_BOX',true)
		}
	}else{
		next();
	}
})
```
官网上————[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%AE%88%E5%8D%AB)

**路由单个守卫：**

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```
**组件内的守卫**：

```javascript
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

### 完整的导航解析流程

* 导航被触发。
* 在失活的组件里调用离开守卫。
* 调用全局的 beforeEach 守卫。
* 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
* 在路由配置里调用 beforeEnter。
* 解析异步路由组件。
* 在被激活的组件里调用 beforeRouteEnter。
* 调用全局的 beforeResolve 守卫 (2.5+)。
* 导航被确认。
* 调用全局的 afterEach 钩子。
* 触发 DOM 更新。
* 用创建好的实例调用 beforeRouteEnter 
* 守卫中传给 next 的回调函数。


## 10.vue中获取input的type
聚集时改变type：

```javascript
<input type="text" ref="pwd" v-model="rgform.rgpwd" placeholder="请输入密码" @focus="changeType">

changeType(e){
    e.target.type = 'password';
},

//或者：
this.$refs.pwd.type
```

## 11.vue中实现密码可见不可见

```html
<input type="password" v-model="rgform.rgpwd" ref="rgspwd" placeholder="请输入密码" v-if="viewFlag">
<input type="text" v-model="rgform.rgpwd" ref="rgspwd" placeholder="请输入密码" v-else><i class="el-eye" @click="changeView"></i>

```
```javascript
changeView(){
    this.viewFlag=false;
}
```
## 12.for循环上需要有key标志，标志唯一性，否则报warning。

```html
<el-option  v-for="item in protalOptions" :label="item.name" :key="item.id" :value="item.id"></el-option>
```
## 13.vue中title图标的添加
在webpack.dev.conf.js中：

```javascript
 new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'index.html',
  inject: true,
  favicon:'./favicon.ico'
}),
```
同时生产环境中，在webpack.prod.conf.js中：


```javascript
new HtmlWebpackPlugin({
  filename: config.build.index,
  template: 'index.html',
  inject: true,
  favicon: './favicon.ico',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
    // more options:
    // https://github.com/kangax/html-minifier#options-quick-reference
  },
```

## 14.ie11中打开vue项目页面一片空白
[Vue2.0做的项目在IE11下面打开一片空白？](https://blog.csdn.net/bright2017/article/details/77850525)

安装 "babel-polyfill" 即可。
在入口main.js文件引入：import 'babel-polyfill'
在webpack.base.conf.js中，

```javascript
module.exports = {
	entry: {
		app: ["babel-polyfill", "./src/main.js"]
	}
},
```
## 15.为何vue不支持IE8
（https://blog.csdn.net/csdn_yudong/article/details/78332665）
因为 Vue.js 使用了 IE8 不能模拟的 ECMAScript 5 特性。

但具体是哪些特性呢？

`Object.defineProperty()`
该方法允许精确添加或修改对象的属性。一般情况下，我们为对象添加属性是通过赋值来创建并显示在属性枚举中（for…in 或 Object.keys 方法），但这种方式添加的属性值可以被改变，也可以被删除。而使用 `Object.defineProperty()` 则允许改变这些额外细节的默认设置。例如，默认情况下，使用 `Object.defineProperty() `增加的属性值是不可改变的。
## 16.vue的js中的动态html中的img的src写法

只要在script中的都需要用require()的格式加载图片

```javascript
var contentHtml = `<div class="popWrap">
    <div class="popTop">
        <div class="imgBox">
            <img src=${require("@/images/portait.jpg")}>
        </div>
        <ul class="infoRight">
            <li><label>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</label><span>${cfeature.get('person_name')}</span>
            <div class="hrefs"><a title="到档案" class="popArchives" data-card="${cfeature.get('person_card')}"></a>
            </div>
        </ul>
    </div>
    <div class="closePopup">
        <span>x</span>
    </div>
</div>`;
overlay.setPosition(undefined);
if(overlay.getPosition() == undefined){
    overlay.setPosition(cfeature.get('center'));
    map.getView().setCenter(cfeature.get('center'));
}

map.addOverlay(overlay);
$("#popup").html(contentHtml);
```