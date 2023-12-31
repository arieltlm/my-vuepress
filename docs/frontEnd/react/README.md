# immutable.js学习笔记


<tag-part tagName="react"/><tag-part tagName="immutable"/>
***
[[toc]]
> 参考：
>
>[Immutable.js 以及在 react+redux 项目中的实践](https://juejin.im/post/5948985ea0bb9f006bed7472?utm_source=tuicool&utm_medium=referral)(推荐)
> 
> [Immutable 详解及 React 中实践](https://blog.csdn.net/yczz/article/details/50687736)
> 等等

***

::: tip
[immutable Api文档](http://facebook.github.io/immutable-js/docs/#/)

[官方github](https://github.com/facebook/immutable-js/)
:::

## 一、js是引用数据类型，是可变的（mutable）
> **优点：**
> 频繁的操作数据都是在原对象的基础上修改，不会创建新对象，从而可以有效的利用内存，不会浪费内存


> **缺点：**
> 过于灵活多变在复杂数据的场景下也造成了它的不可控性，假设一个对象在多处用到，在某一处不小心修改了数据，其他地方很难预见到数据是如何改变的

**原生js产生的坑：**

```js
// 场景一
var obj = {a:1, b:{c:2}};
func(obj);
console.log(obj)  //输出什么？？

// 场景二
var obj = ={a:1};
var obj2 = obj;
obj2.a = 2;
console.log(obj.a);  // 2
console.log(obj2.a);  // 2

```
一般的做法是使用 shallowCopy（浅拷贝）或 deepCopy（深拷贝）来避免被修改，但这样做造成了 CPU 和内存的浪费
## 二、immutable不可变数据结构介绍

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。
Immutable.js 使用了 结构共享（Structure Sharing）会尽量复用内存，甚至以前使用的对象也可以再次被复用。没有被引用的对象会被垃圾回收。

immutable.js主要有三大特性：

* Persistent data structure （持久化数据结构）
* structural sharing （结构共享）（先进的tries(字典树)技术实现结构共享）
* support lazy operation （惰性操作）

![img](https://lc-gold-cdn.xitu.io/3a7a2cd51b6fb6850e00.gif)

Immutable 本身就是函数式编程中的概念，纯函数式编程比面向对象更适用于前端开发。因为只要输入一致，输出必然一致，这样开发的组件更易于调试和组装

## 三、immutable.js的优缺点
**优点：**

+ 降低mutable带来的复杂度
+ 节省内存
+ 历史追溯性（时间旅行）：时间旅行指的是，每时每刻的值都被保留了，想回退到哪一步只要简单的将数据取出就行，想一下如果现在页面有个撤销的操作，撤销前的数据被保留了，只需要取出就行，这个特性在redux或者flux中特别有用
+ 拥抱函数式编程：immutable本来就是函数式编程的概念，纯函数式编程的特点就是，只要输入一致，输出必然一致，相比于面向对象，这样开发组件和调试更方便

**缺点：**

+ 需要重新学习api
+ 资源包大小增加（源码5000行左右）
+ 容易与原生对象混淆：由于api与原生不同，混用的话容易出错。

## 四、immutable.js使用

```bash
npm i immutable
```

```js
const { Map } = require('immutable');
const map1 = Map({a:1, b:1, c:1});

import Immutable, {Map, Seq} from 'immutable';
const map1 = Map({a:1, b:1, c:1});
// 或者
const map1 = Immutable.Map({a:1, b:1, c:1});
```
## 五、使用注意事项

### 1. immutable对象直接可以转JSON.stringify(),不需要显式手动调用toJS()转原生、

```js
let a = Map({
    select: 'users',
    filter: Map({ name: 'Cam' })
})
console.log(JSON.stringify(a)); // '{select: "people", filter: {name: 'Cam'}}'
```

### 2. 所有针对immutable变量的增删改必须左边有赋值，因为所有操作都不会改变原来的值，只是生成一个新的变量

```js
let arr = Immutable.fromJS([1,2,3,4])
console.log(arr);// List[1,2,3,4]
arr.push(5);
console.log(arr);// List[1,2,3,4]
arr = arr.push(5);
console.log(arr);// List[1,2,3,4,5]
```
### 3. 获取深层深套对象的值时不需要做每一层级的判空

```js
//javascript
const obj = {a:1}
try {
    const res = obj.a.b.c   //error
    console.log(res);
} catch {
}
//immutable
const immutableData=Immutable.fromJS({a:1})
const res1 = immutableData.getIn(['a', 'b', 'c'])  //undefined
console.log(res1); //undefined
```

### 4. 惰性操作

```js
var oddSquares = Seq([1,2,3,4,5,6,7,8])
    .filter(function(x) {
        console.log('immutable对象的filter执行' + x);
        return x % 2;
    }).map(x => x * x);
console.log(oddSquares.get(1)); // 执行8次

var jsSquares = [1,2,3,4,5,6,7,8]
    .filter(x => {
        console.log('原生数组的filter执行' + x);
        return x % 2;
    }).map(x => x * x);
console.log(jsSquares[1]); // 执行3次
```

### 5. fromJS和toJS会深度转换数据，随之带来的开销较大，尽可能避免使用，单层数据转换使用Map()和List()

```js
// 数据量小的时候，差别不大
var a1 = Map({name:'danny', children: {name: 'Tom'}, age:18})
var a2;
console.time();
for (let i = 0; i< 10000000; i++ ) {
    a2 = Map(a1)
}
console.timeEnd(); // default: 342.76904296875ms
var c;
console.time();
for (let i = 0; i< 10000000; i++ ) {
    c = Immutable.fromJS(a1)
}
console.timeEnd(); // 544.850830078125ms
```

### 6. js是弱类型，但Map类型的key必须是string！

```js
let oj = {1: 'one'};
console.log(oj['1']); // 'one'
console.log(oj[1]); // 'one'

let ojmap = Map(oj);
console.log(ojmap.get('1')); // 'one'
console.log(ojmap.get(1)); // undefined
```

### 7. 比较

```js
// 使用 === 来比较内存地址，性能最好。但即使两个对象的值是一样的，也会返回 false
const map1 = Map({a:1, b:1, c:1});
const map2 = Map({a:1, b:1, c:1});
console.log(map1 === map2);// false

// 直接比较值，immutable.js 提供了 Immutable.is 来做『值比较』
console.log(Immutable.is(map1, map2)); // true
```

### 8. 将对象转为归类对象数组（immutable）

```js
var a = {b:{x:1122,y:123},c:{x:123,m:2342},d:{x:123,j:1111},f:{x:123,k:1111}}
var b = Immutable.fromJS(a).toList().groupBy(x=>x.get('x'))
```

![immutable-object-array.png](@alias/react/immutable-object-array.png)

## 六、 react+redux+immutable

此处还未实践，实践后再做补充；
## 七、 基础语法练习

```js
import Immutable, {Map, Seq} from 'immutable';

// Immutable.js 使用了 结构共享（Structure Sharing）会尽量复用内存，甚至以前使用的对象也可以再次被复用。没有被引用的对象会被垃圾回收。
let a = Map({
    select: 'users',
    filter: Map({ name: 'Cam' })
})
let b = a.set('select', 'people');

console.log(a === b); // false
console.log(a.get('filter') === b.get('filter')); // true
console.log(Immutable.is(a, b)); // false
console.log(a.toJS()); // {select: "users", filter: {name: 'Cam'}}
console.log(b.toJS()); // {select: "people", filter: {name: 'Cam'}}
    
// 判断对象是否是空可以直接用size
console.log(a.size); // 2

// 如果要获取的KEY 不存在，则提供一个默认值
const testsMap = Immutable.Map({
    name: 'Tom',
    child: 'Jack sen'
  });
// Get child
var blackW1 = testsMap.get('age');
var blackW = testsMap.get('age', '23');
console.log(blackW1); // undefined
console.log(blackW); // 23

// 获取深层次嵌套中的值
const tests = Immutable.fromJS({
    hero1: {
        name: {
            heroName: 'Iron Man'
        }
    }
});
tests.getIn(['hero1', 'name', 'heroName']) // Iron Man

// 获取第一个和最后一个值
console.log(testsMap.first()); // Tom
console.log(testsMap.last()); // Jack sen

// Map中是否有此key
console.log(testsMap.has('age')); // false
// Map中深层是否有此key
console.log(tests.hasIn(['hero1', 'name', 'heroName'])); // true

// 列举key
const akeys = testsMap.keys(); 
console.log(akeys); // MapIterator数据类型
// key的三种列举方式
for (let i of testsMap.keys()) {
    console.log(i); // name, child
}
console.log(akeys.next()); // {value: "name", done: false}
console.log(akeys.next()); // {value: "child", done: false}
console.log(akeys.next()); // {value: undefined, done: true}

const [...akeys1] = testsMap.keys(); 
console.log(akeys1); // ["name", "child"]

// 列举value
const [...testsValues] = testsMap.values();
console.log(testsMap.values()); // MapIterator数据类型
console.log(testsValues); // ["Tom", "Jack sen"]

// 使用entries()从Map中获取键和值
const [...testsEntries] = testsMap.entries();
console.log(testsEntries); //[["name", "Tom"],["child", "Jack sen"]]

// 使用set（）将新的键/值对添加到Map；如果密钥已经存在，其值将被更新为新的值。
const moretests = testsMap.set('age', 'Natasha Romanov');
const moretests1 = testsMap.set('name', 'zhang');
console.log(testsMap.toJS()); // {name: "Tom", child: "Jack sen"}
console.log(moretests.toJS()); // {name: "Tom", child: "Jack sen", age: "Natasha Romanov"}
console.log(moretests1.toJS()); // {name: "zhang", child: "Jack sen"}

// 使用setIn（）方法向深度嵌套的Map中的现有键添加新值
// 与Map.set（）不同的是，Map.setIn（）将一个新的键/值对添加到Map中，替换了现有键的值。如果要在深度嵌套的Map中添加新的键/值对，则需要使用Map.updateIn（）或Map.mergeIn
const updatedname = tests.setIn(['hero1', 'name', 'realName'], 'Anthony Stark');  // 替换了之前的heroName
console.log(updatedname.toJS());  // {hero1:{name: {heroName: "Iron Man", realName: "Anthony Stark"}}}

// update作用于整个Map
const updatedtests = testsMap.update((tests) => {
    return tests.set('name', 'is Tom');
});
console.log(updatedtests.toJS()); //  {name: "is Tom", child: "Jack sen"}

// update用于简单的键/值 对
const updatedtests1 = testsMap.update('name', (nameValue) => {
    return nameValue + ' is name';
});
console.log(updatedtests1.toJS()); // {name: "Tom is name", child: "Jack sen"}
    
// update作用于在单个键/值对上，并且如果该键不存在则提供默认值
const updatedtests2 = testsMap.update('theHulk', 'Bruce Banner', (theHulkValue) => {
    return theHulkValue + ' Smash!';
});
console.log(updatedtests2.toJS()); // {name: "Tom", child: "Jack sen", theHulk: "Bruce Banner Smash!"}

// 删除
const lonelyname = testsMap.delete('name');  
console.log(lonelyname.toJS()); // {child: "Jack sen"}
// 深层次删除
const lonelyname1 = tests.deleteIn(['hero1', 'name', 'heroName']); 
console.log(lonelyname1.toJS()); // {hero1:{name: {}}}
// 全部清除
const emptyname = tests.clear(); 
console.log(emptyname.toJS()); // {}

// 合并 
const original = { x: 123, y: 456 };
const t = { y: 789, z: 'abc' };
const newV = Immutable.merge(original,t);
console.log(newV); // {x: 123, y: 789, z: "abc"} (js对象merge后是js对象)
console.log(original); // {x: 123, y: 456}
const newImmutableV = Immutable.merge(Map(original), Map(t));
console.log(newImmutableV.toJS()); // {x: 123, y: 789, z: "abc"} 

// mergeWith可对旧值和新值进行操作
console.log(Immutable.mergeWith(
    (oldVal, newVal) => oldVal + newVal,
    original,
    t
)) // { x: 123, y: 1245, z: 'abc' }

// mergeDeep可操作深层合并
const original1 = { x: { y: 123 }}
console.log(Immutable.mergeDeep(original1, { x: { z: 456 }})) // { x: { y: 123, z: 456 }}
console.log(original) // { x: { y: 123 }}

// mergeDeepWith可操作深层合并计算
console.log(Immutable.mergeDeepWith(
    (oldVal, newVal) => oldVal + newVal,
    original1,
    { x: { y: 456 }}
)) // { x: { y: 579 }}



```
