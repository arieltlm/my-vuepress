# 五个js技巧


<tag-part tagName="js"/>

[[toc]]

原文：【[5 Programming Patterns I Like](https://www.johnstewart.dev/five-programming-patterns-i-like/)】
这篇文章中列举了下面几个比较好的js使用技巧：
## 1.early exits

对一些条件判断，提早做一些返回。这样能够注意到考虑的能更全面，能注意到参数的有效性；代码更好理解和可读；该函数读取更线性;嵌套减少，使功能更容易阅读。If-else构造将更紧密地结合在一起，你将更少地打开和关闭括号;

```js
function transformData(rawData) {
  // check if no data
  if (!rawData) {
    return [];
  }

  // check for specific case
  if (rawData.length == 1) {
    return [];
  }

  // actual function code goes here
  return rawData.map((item) => item);
}
```
***

**[保镖模式（the bouncer pattern）](http://rikschennink.nl/thoughts/the-bouncer-pattern/)：**

```js
function fireZeMissiles(amount) {

    if (amount) {
        // do ze firing!
        for (var i=0; i<amount; i++) {
            console.log('firing missile numéro', i + 1);
        }
    }
    else {
        // fire a minion into ze volcano
        fireMinion();
    }
    
}
```

对以上的代码实行the bouncer pattern进行重构：


```js
function fireZeMissiles(amount) {
    if (!amount) {
        // au revoir mon minion!
        fireMinion();
        return;
    }
    
    // fire ze actual missiles!
    for (var i=0; i<amount; i++) {
        console.log('firing missile numéro', i + 1);
    }
    
}
```
当使用保镖模式时，我们首先测试参数有效性，然后转到实际的功能逻辑。当我们发现一个有争议的腥味时，我们使用该return语句来停止函数执行。


## 2.将switch代码写成object的形式更优

```js
// Switch
let createType = null;
switch (contentType) {
  case "post":
    createType = () => console.log("creating a post...");
    break;
  case "video":
    createType = () => console.log("creating a video...");
    break;
  default:
    createType = () => console.log('unrecognized content type');
}

createType();

// Object literal
const contentTypes = {
  post: () => console.log("creating a post..."),
  video: () => console.log("creatinga  video..."),
  default: () => console.log('unrecognized content type')
};

const createType = contentTypes[contentType] || contentTypes['default'];
createType();
```

作者提出对象方式[Object literal]是因为：
 * 常常在写switch时总会遗忘break（这点tlm不常有）
 * 对象方式更容易读和理解，并且代码写的少

***
[用Object文字替换switch语句](https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals)
这篇文章中提出一些观点：

* 1） **switch有这样的问题：** 
switch从程序控制流程到其处理代码块的非标准方式存在多个问题，其余的JavaScript使用花括号而交换机则不然。从语法上讲，它不是JavaScript的最佳选择，也不是它的设计。我们被迫break;在每个语句中手动添加语句case，如果我们忘记，这可能导致难以调试和嵌套错误！
switch有点陈旧和笨重，并且容易出现调试错误

* 2）**对象方式有这样的好处：** 
对象更灵活，具有更好的可读性和可维护性，我们不需要手动break;每个“案例”。他们对新的JavaScript开发人员也很友好，因为他们是标准对象。
随着“案例”数量的增加，对象（哈希表）的性能优于交换机的平均成本（案例的顺序很重要）。对象方法是哈希表查找，并且交换机必须评估每个案例，直到它遇到匹配和中断。
**对象文字可以包含函数以及任何其他对象类型**，这使它们非常灵活！文字中的每个函数也都有函数作用域，因此我们可以从我们调用的父函数返回闭包。

下面是很好的两段代码：

```js
function getDrink (type) {
  var drink;
  var drinks = {
    'coke': function () {
      drink = 'Coke';
    },
    'pepsi': function () {
      drink = 'Pepsi';
    },
    'lemonade': function () {
      drink = 'Lemonade';
    },
    'default': function () {
      drink = 'Default item';
    }
  };

  // invoke it
  (drinks[type] || drinks['default'])();

  // return a String with chosen drink
  return 'The drink I chose was ' + drink;
}

var drink = getDrink('coke');
// The drink I chose was Coke
console.log(drink);
```

```js
function getSnack (type) {
  var snack;
  function isDrink () {
    return snack = 'Drink';
  }
  function isFood () {
    return snack = 'Food';
  }
  var snacks = {
    'coke': isDrink,
    'pepsi': isDrink,
    'cookies': isFood,
    'crisps': isFood,
  };
  return snacks[type]();
}

var snack = getSnack('coke');
console.log(snack); // 'Drink'
```

**[tlm]时刻：** 
在项目中我经常会使用switch，此后会注意这块这样书写更好。

## 3.嵌套三元
**[tlm]时刻：**
这个东西之前还真没有这样用过，get。

```js
const result = !conditionA
  ? "Not A"
  : conditionB
  ? "A & B"
  : "A";
```
**[tlm]时刻：** 
刚在项目中测试，公司的框架中eslint配置的不让这样使用。。。
## 4. 变量命名的艺术
[The art of naming variables](https://hackernoon.com/the-art-of-naming-variables-52f44de00aad)

汲取：

* Booleans：变量命名时增加“is”, “has”, and “can”前缀
* 对于返回boolean值的函数，可以在前面增加check或者get，如heckHasFruit 
* 函数命名使用动词和名词结合：如getUser，calculateTotal
* 用于转化的函数命名增加to：如toDollar，toUppercase
* 函数参数最好也是用一些有意义的名字：如：`const newFruits = fruits.map(fruit => {
    return doSomething(fruit);
});`
## 5.一个循环把一个数组分成两个数组

```js
const exampleValues = [2, 15, 8, 23, 1, 32];
const [truthyValues, falseyValues] = exampleValues.reduce((arrays, exampleValue) => {
if (exampleValue > 10) {
    arrays[0].push(exampleValue);
    return arrays;
}

arrays[1].push(exampleValue);
return arrays;
}, [[], []]);
console.log(truthyValues); // [15, 23, 32]
console.log(falseyValues); // [2, 8, 1]

```

