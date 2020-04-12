# JS小技巧s

> 2019.11.24

<tag-part tagName="js"/>

[[toc]]

*** 

【引用】[JS操作小技巧，工作简单了](https://juejin.im/post/5dd4a4015188252a18737535)


## 1 随机生成字母和数组的组合

```js
Math.random().toString(36).substr(2)
```

> `NumberObject.toString(radix)`
> 
> radix	可选。规定表示数字的基数，使 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。但是要注意，如果该参数是 10 以外的其他值，则 ECMAScript 标准允许实现返回任意值。


## 2 幂操作

```js
Math.pow(2,3) // 8
2 ** 3 // 8
```


上述两者相等。

还有一种---移位操作 << (左移）, >>（右移）

```js
2 << 2 // 8  

```

上述即为，二进制2向左移动两位，原来为10=> 1000 即为8

```js
3 << 2 // 11 => 1100  即为12

10 << 2 // 1010  => 101000  即为40

10 >> 3 // 1010 => 1(.010) 即为1

3 >> 2 // 11 => 00(.11) 即为0 
```

## 3 位运算符 |

两个位只要有一个为1，那么结果都为1。否则就为0

> 3 | 2 : 0011 | 0010 = 0011 即为3

|运算符还能进行取整运算

> 3.2 | 0 : 0011 | 0000 = 0011 即为3

即，想要快速将浮点数取整的话，就和0做取整操作

## 4 位运算符 ～

[JS按位非(~)运算符与~~运算符的理解分析](https://www.cnblogs.com/moqiutao/p/6275483.html)

```js
~~10.9 // 10
```

～～浮点数=> 取整

## 5 位运算符 ^ (异或）

```js
var a = 1 ^ 2;
//3
//1 -> 01
//2 -> 10
//1 ^ 2 -> 11 -> 3
```

所以可以实现整数交换：

```js
let a = 10;
let b = 50;
a = a ^ b;
b = a ^ b;
a = a ^ b;
console.log(a, b); // 50 10
```

## 6 整数交换

除了上述的异或位运算，还有：

```js
var a = 2;
var b = 4;
a = a + b;
b = a - b;
a = a - b;
console.log(a, b); // 4 2
```

```js
let a = 10;
let b = 50;
[a,b]=[b,a]
```

## 7  判断变量是否是数组

* 1. instanceof
* 2. array.__proto__.constructor === Array
* 3. array.constructor === Array
* 4. Array.isArray（兼容性问题）
* 5. Object.prototype.toString.call([]) === "[object Array]"（最通用）

## 8 数组去重多重方式

```js
// 法一：
[...new Set(arr)]

// 法二：

Array.prototype.unique = function() {
    const tmp = new Map();
    return this.filter(item => {
        return !tmp.has(item) && tmp.set(item, 1);
    })
}

//法三：
Array.prototype.unique = function() {
    return this.filter((item, index) => {
        return this.indexOf(item) === index;
    })
}

// 法四：
Array.prototype.unique = function() {
    const newArray = [];
    this.forEach(item => {
        if (!newArray.includes(item)) {
            newArray.push(item);
        }
    });
    return newArray;
}


// 法五：
Array.prototype.unique = function() {
    return this.sort().reduce((init, current) => {
        if (init.length === 0 || init[init.length - 1] !== current) {
            init.push(current);
        }
        return init;
    }, []);
}

```

## 9 短路运算(&& ||)

```js
1 && 2 && 3 // 3
1 && 3 && 5 && 1 // 1

0 && null // 0 

null && 0 // null

1 && undefined && null  // undefined

```

&& 都为真的话，取最后一个值，为假的话，取第一个为假的值
 

```js
1 || 2 || 3 // 1
0 || null // null

null || 0 // 0



```
 
|| 为真的话，取第一个为真的值，都为假的话，取最后一个为假的值

## 10 过滤空值（undefined,null,false,'')

```js
[1, 2, 0, undefined, null, false, ''].filter(Boolean) // [1,2]
```

## 11 快速生成一个递增数组

```js
Array.from({length: 10},(val, index)=>index)
```
