# 使用bus实现父子兄弟跨级间传值
>2018-06-12
<tag-part tagName="vue"/>
[[toc]]

## 1.直接创建vue实例

```javascript
//Bus.js
import Vue from "vue";

const Bus = new Vue();

export default Bus;
```
**在main.js中引入:**

```javascript
import Bus from './Bus'

Vue.prototype.Bus = Bus;
```
**使用：**
```javascript
created() {
    this.Bus.$on('setMsg',content =>{
        this.msg = content;
    })
}
////////////////
methods:{
    sendEvent(){
            this.Bus.$emit('setMsg','Hi Vue(brother)我是来自同级组件的')
    }
},
```
## 2.仿效vue-rooter或者vuex插件那样制造bus插件使用

```javascript
//vue-bus.js
const install = function(Vue) {
    const Bus = new Vue({
        methods: {
            emit (event,...args){
                this.$emit(event,...args);
            },
            on (event,callback){
                this.$on(event,callback);
            },
            off(event,callback){
                this.$off(event,callback);
            }
        }
    });
    Vue.prototype.$bus = Bus;

};

export default install;

```

**在main.js中引入:**

```javascript
import VueBus from './vue-bus';
Vue.use(VueBus)
```
**使用**
```javascript
created() {
    this.$bus.on('setMsgBus',content =>{
        this.msg1 = content;
    })
}
//////////////
methods:{
    setEvent(){
        this.$bus.emit('setMsgBus','say Hi bus 插件(brother)我是来自同级组件的')
    }
}
```

>参考代码见[github上代码](https://github.com/arieltlm/vue-test/tree/master/vue-small-project/my-first-vue-project)