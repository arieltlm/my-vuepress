# Immutable使用

<tag-part tagName="immutable"/>

[[toc]]
## 1. 使用groupBy之后，获取数据

```js
const allDatasGroupBy = allDataValues.toList().groupBy(x => x.get('floor'))
```

使用`groupBy`将`List`转为以某个元素分组的“Map”之后，其实得到的是`OrderedMap`，而并不是`Map`，所以获取其某一项值，就需要注意了，如果分组的`key`是`number`的话(只要能转成number，它分组之后就是number，请看第二张图片，即使是-1)，就不能按Map那样的获取用`get(string)`来取值，需要`get(number)`来获取；如果分组的`key`是`string`的话，就按`get(string)`来获取即可

![WX20190905-152443@2x.png](~@alias/immutable/immutable1.png)

![WX20190905-154506@2x.png](~@alias/immutable/immutable2.png)

## 2.Map可以使用merge，或者mergeDeep

更新Map的数据，可以使用merge来做，如果Map内层只是简单类型，就直接使用merge即可;但是如果Map内层复杂类型，就需要使用mergeDeep，否则，merge之后获取内层数据就变成了object而非Map/List，这样就会出现初始值和新merge进去的数据内部获取方式不一样。

> 重现了半天这个问题，也没有重现出来，似乎直接merge也并未出现这个问题。不过当时遇到的问题就是这样的，通过mergeDeep解决了，再不过后面没有采取这个方式来进行处理，所以当时项目中的代码也删掉。后面有时间再仔细研究一下————到底什么时候需要mergeDeep

**挖坑**：merge会改变顺序

## 3.更新update

对List或者Map列表中的每一项进行更新或者设置都可以使用update。

```js
const type = 'add'
// allData 是一个Map
console.log(state.get('allData').toJS())
const newState = state.update('allData', list => list.map(item => item.set('floor', 111111)))
const newStates = state.update('allData', list => list.map((item) => {
    if (type === 'add'){
        return item.set('floor', 11).set('status', 1)
    }
    return item.set('floor', 22).set('status', 2)
}))
console.log(newState.get('allData').toJS())
console.log(newStates.get('allData').toJS())
//======================================================

// allDataArr 是一个List
console.log(state.get('allDataArr').toJS())
const newArrState = state.update('allDataArr', list => list.map(item => item.set('floor', 111111)))

const newArrStates = state.update('allDataArr', list => list.map((item) => {
    if (type === 'add'){
        return item.set('floor', 11).set('status', 1)
    }
    return item.set('floor', 22).set('status', 2)
}))
console.log(newArrState.get('allDataArr').toJS())
console.log(newArrStates.get('allDataArr').toJS())

```
![WX20190905-154506@2x.png](~@alias/immutable/immutable3.png)


**同时数组中更新还可以直接具体到某一项，比如要更新第一个元素:**

```js
const newState0 = state.update('allDataArr', list => list.update(0, li => li.set('value', newName))) 
//[{floor: 1, uuid: "entity", value: "aaaaa"},{floor: 2, uuid: "event"}]
```

**对其中满足某个条件的某一条进行更新：(通过findIndex找到它的索引）**

```js
// 原数据：
const allDatasArrInit = [
    { floor: 1, uuid: 'entity', roles: [1,222] },
    { floor: 2, uuid: 'event', roles: [22] },
]
.....
console.log(state.get('allDataArr').toJS()) // 上面的allDatasArrInit
const newArrState0 = state.update('allDataArr', arr => arr.update( 
    arr.findIndex(item => item.get('floor') === 1), 
    item => item.update('roles', roles => roles.unshift('22'))
))
   
console.log(newArrState0.get('allDataArr').toJS()) 
// [
    { floor: 1, uuid: 'entity', roles: [1,222,'22'] },
    { floor: 2, uuid: 'event', roles: [22] },
]

```

**还可以做某一项某个元素的过滤:**

```js

const newArrState1 = state.update('allDataArr', arr => arr.update( 
    arr.findIndex(item => item.get('floor') === 1), 
    item => item.update('roles', roles => roles.filter(roleId => roleId !== 1))
))

console.log(newArrState1.get('allDataArr').toJS()) 
// [
    { floor: 1, uuid: 'entity', roles: [222] },
    { floor: 2, uuid: 'event', roles: [22] },
]
```

**上述也可以称为做删除：**

```js
// 原数据：
const allDatasArrInit = [
    { floor: 1, uuid: 'entity', roles: [1,222] },
    { floor: 2, uuid: 'event', roles: [22] },
]
// 方法一：使用update和delete
const newArrState1 = state.update('allDataArr', arrs => arrs.delete(arrs.findIndex(item => item.get('floor') === 1)))
// 方法二： 使用update和filter
const newArrState2 = state.update('allDataArr', arr => arr.filter(item => item.get('floor') !== 1))
console.log(newArrState1.get('allDataArr').toJS()) // [{ floor: 2, uuid: 'event', roles: [22] }]
console.log(newArrState2.get('allDataArr').toJS()) // [{ floor: 2, uuid: 'event', roles: [22] }]
```

**更新中还需要注意一点：update最后一个参数处是一个函数**


```js
// 原数据：
const allData = {1:{active:false},2:{active:true}}
// 正确的--------
const activeUuid = 1
const newState = state.updateIn(['allData', activeUuid], val => val.set('active', true))
// 或者
const newState = state.updateIn(['allData', activeUuid, 'active'], () => true)
// 错误的--------
const newState = state.updateIn(['allData', activeUuid,'active'],true)
```

## 4.对List进行添加和删除值

```js
// 原数据
const countParam = [
	levels: [{...}],
	selected: [13,12,14]
]
// 将新值newId = 22加入到selected中，去除
// 方法一：
// 【tlm】笨方法，先判断有无，有删除，再push进去，当然是为了 展示delete和push
const newState = state.updateIn(['countParam', 'selected'], (list) => { 
	const ind = list.findIndex(li => li === newId) 
	if (ind !== -1) { 
		return list.delete(ind) 
	} 
	return list.push(newId)
})

// 方法二：
// 【tlm】当然可能这个方法也不是最优，但说明使用技巧即可
const newState = state.updateIn(['countParam', 'selected'], (list) => {
	const newList = list.push(newId)
	// 如果是newIds = [22,12],则可以使用const newList = [...list,...newIds]
	return [...new Set(newList)]
}
```

***

**观察方法二中的代码，注意一点：**
虽然数组很多的方法和List的相同，但是我们需要注意push方法：

>在数组中： 

```js
const arr = [111,222,333]
const arrNewlen = arr.push(444)// 4
arr // [111,222,333, 444]
```
>在List中：

```js
const arr = List([111,222,333])
const arrNew = arr.push(444)// List([111,222,333,444])
arr.size // 3
arrNew.size // 4
```

## 5. valueSeq

valueSeq对于Map相当于Object.values相对于object一样的效果，取值组成一个Seq.Indexed of the values/数组。