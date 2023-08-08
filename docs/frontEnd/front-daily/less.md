# less回顾记录

<tag-part tagName="css"/><tag-part tagName="less"/>


[[toc]]

> 项目中一直使用scss，现在新框架出来，推荐使用less了，所以再过一遍已经忘掉的less语法

## 0.less与scss比较

* less比scss的编辑环境简单

scss需要ruby环境，是在服务器端处理；
less基于js，需要引入less.js来编译；

* scss设置了四种输出设置——（less没有）
    + nested：嵌套缩进的css代码；
    + expanded：展开的多行css代码；
    + compact：简洁格式的css代码；
    + compressed：压缩后的css代码


* scss中有if/else,for这些语法，less中是when

* scss的工具库是compass，less网上查是bootstrap(还未用)

* 引入文件不同

* 其他语法上的不同

tlm总结基本就是：要使用这两个的话，scss比less对环境要求高，所以单纯开发一上来，如果之前用户没有装ruby，还得装ruby费点时间；less比较简单；scss比less功能更强大些。实际上在平时开发中，对css预编译器没有很高的要求，大部分人只是简单使用变量，多使用嵌套，少使用mixins等功能，二者均可以达成，所以目前看来less可以达到更快的进入项目的目的——所以，公司新框架也就切换了吧。

[在线转css](https://www.matools.com/less)

[less文档](http://lesscss.cn/features/#features-overview-feature)

[less教程W3C](https://www.w3cschool.cn/less/less_variables_interpolation.html)

## 1.变量使用的是@

```less
@link-color:#428bca; 
```

less使用变量不在乎顺序，即声明的变量在使用之前不是必须的

## 2.不想用转义

~后面的内容不会被转，原封不动的处理成css:

```less
.weird-element {
  content: ~"^ some horrible but needed css hack";
}
//输出
.weird-element {
  content: ^ some horrible but needed css hack;
}
```

## 3.命名空间

封装一个"对象"，直接取其中的一个样式使用：

```less
#bundle {
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white
    }
  }
  .tab { ... }
  .citation { ... }
}
```

```less
#header a {
  color: orange;
  #bundle > .button; /*只使用其中的button样式*/
}
```

## 4.作用域

```less
@var: red;

#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```

## 5.引入less文件

可不加后缀

```less
@import "library"; // library.less
@import "typo.css";
```

## 6.变量插值

```less
// class名
@my-selector: banner;

// Usage
.@{my-selector} {
  margin: 0 auto;
}
// 输出：
.banner {
  margin: 0 auto;
}

```

```less
// 值-图片路径
@images: "../img";

// Usage
body {
  color: #444;
  background: url("@{images}/white-sand.png");
}
```

```less
// 引用路径
@themes: "../../src/themes";

// Usage
@import "@{themes}/tidal-wave.less";
```

```less
// 属性名
@property: color;

.widget {
  @{property}: #0ee;
  background-@{property}: #999;
}
```

```less
// 变量用变量
@fnord:  "I am fnord.";
@var:    "fnord";
content: @@var;
// 输出
content: "I am fnord.";
```

```less
// 如果你希望在 media query 中使用 Less 变量，你可以直接使用普通的变量方式。 因为“~”后面的值是不被编译的，所以可以用作 media query 的参数
@singleQuery: ~"(max-width: 480px)";
@media screen, @singleQuery { 
    div { 
      width:2000px; 
    } 
} 
```

```less
// 属性值拼接
.mixin (@b: 0) when (isnumber(@b)) {
  width:e('@{b}px');
}

.class {
  .mixin(40); 
}
// 输出
.class {
  width: 40px;
}
```



## 7.Extend（复制）

extend必须在最后面

**非常准确复制(extend里面的类名必须和已有的一模一样)**：

```less
nav ul {
  &:extend(.inline); // 只扩展.inline的
  background: blue;
}
.inline {
  color: red;
}

//输出
nav ul {
  background: blue;
}
.inline,
nav ul {
  color: red;
}
```

**所有带有这个样式的都复制：**

```less
nav ul {
  &:extend(.inline all); // extends all instances of ".d" e.g. ".x.d" or ".d.x"
  background: blue;
}
.inline {
  color: red;
  
  a{
    color:blue;
  }
}

.box{
  .inline{
    color:yellow;
  }
}
// 输出
nav ul {
  background: blue;
}
.inline,
nav ul {
  color: red;
}
.inline a,
nav ul a {
  color: blue;
}
.box .inline,
.box nav ul {
  color: yellow;
}

```

**一次复制多个**：

```less
// 可扩展多个
.e:extend(.f, .g) {}
```

### extend的用处：

* 1.样式意义上的继承：

  ```html
  <a class="animal bear">Bear</a>
  <a class="bear">Bear</a>
  ```

  ```less
  .animal {
    background-color: black;
    color: white;
  }
  .bear {
    &:extend(.animal);
    background-color: brown;
  }
  ```

* 2.缩小css大小

  ```less
  .my-inline-block() {
      display: inline-block;
    font-size: 0;
  }
  .thing1 {
    .my-inline-block; // mixin写法
  }
  .thing2 {
    .my-inline-block; // mixin写法
  }
  
  // 输出
  .thing1 {
    display: inline-block;
    font-size: 0;
  }
  .thing2 {
    display: inline-block;
    font-size: 0;
  }
  ```

  ```less
  .my-inline-block {
    display: inline-block;
    font-size: 0;
  }
  .thing1 {
    &:extend(.my-inline-block);
  }
  .thing2 {
    &:extend(.my-inline-block);
  }
  
  // 输出
  .my-inline-block,
  .thing1,
  .thing2 {
    display: inline-block;
    font-size: 0;
  }
  ```

  

## 8.能反向嵌套

```less
.bucket {
  tr & { // nested ruleset with target selector
    color: blue;
  }
}
// 输出
tr .bucket {
  color: blue;
}
```

## 9.mixins

### 1.基础的Mixins（单纯的复制）

直接继承，不需要特殊字段引入

```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered;
}

.post a {
  color: red;
  .bordered();
}
```

后面带不带圆括号都可以，等价；



如果不想让此样式输出，其后增加圆括号，相当于scss中的%名定义的：

```less
.my-mixin {
  color: black;
}
.my-other-mixin() {
  background: white;
}
.class {
  .my-mixin;
  .my-other-mixin;
}
// 输出
.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}
```

**命名空间**：

在使用上，以下的是同一个意思：

```less
// all do the same thing
#outer > .inner;
#outer > .inner();
#outer .inner;
#outer .inner();
#outer.inner;
#outer.inner();
```



**受保护的命名空间 **：

```less
#namespace when (@mode=huge) {
  .mixin() { /* */ }
}

#namespace {
  .mixin() when (@mode=huge) { /* */ }
}
```

上面的两个虽然是相同的意思，但是在使用上还是存在区别：

```less
// 这个变量必须在#namespace的同层空间定义，否则报错
@bg:red;
#namespace when (@bg=red) {
  .mixin() {
  	color:red;
  }
}

.box{
  @bg:red; // 此处定义的不起作用
   #namespace .mixin()
}

.box1{
  @bg:yellow;
   #namespace .mixin()
}

// 输出：
.box {
  color: red;
}
.box1 {
  color: red;
}
```



```less
// 这个@bg在#namespace下的空间定义，即.mixin曾可用
#namespace {
  .mixin() when (@bg=red) { 
  	font-size:14px;
  }
}

.box{
  @bg:red;
   #namespace .mixin()
}

.box1{
  @bg:yellow;
   #namespace .mixin()
}

// 输出：
.box {
  font-size:14px;
}
```



```less
// 一次定义两个，匹配到哪个变量拿那个
#namespace {
  .mixin() when (@bg=red) { 
  	font-size:14px;
  }
  .mixin() when (@bg=yellow){
  	font-size:20px;
  }
}

.box{
  @bg:red;
  #namespace .mixin();
 
}

.box1{
  @bg:yellow;
  #namespace .mixin();
}


// 输出：
.box {
  font-size: 14px;
}
.box1 {
  font-size: 20px;
}
```



**给复制的样式后面直接添加`!important`**:

```less
.foo (@bg: #f5f5f5, @color: #900) {
  background: @bg;
  color: @color;
}

.important {
  .foo() !important;
}
```

### 2. 传递参数的Mixins：

此用法和scss一致，可用默认值，也可以传递：

```less
.border-radius(@radius: 5px) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}

#header {
  .border-radius;
}
.button {
  .border-radius(6px);
}
```

**多个参数的时候**：

一旦分隔符中出现封号，就使用封号作为整体的分隔符，就不看逗号了;

如果就是单个的，使用逗号分隔也没有问题；

```less
.mixin(@color) {
  color-1: @color;
}
.mixin(@color; @padding: 2) {
  color-2: @color;
  padding-2: @padding;
}
.mixin(@color; @padding; @margin: 2) {
  color-3: @color;
  padding-3: @padding;
  margin: @margin @margin @margin @margin;
}

.some .selector div1 {
  .mixin(#008000); // 只传一个就会匹配上两个，第二个有默认值
}
.some .selector div2 {
  .mixin(#008000,5px); // 只传两个就会匹配上三个，第三个有默认值
}
.some .selector div3 {
  .mixin(#008000,5px,4px);
}
.some .selector div4 {
  .mixin(#008000;5px;4px);
}
.some .selector div5 {
  .mixin(#008000;5px 4px);
}
.some .selector div6 {
  .mixin(#008000,5px 4px;2px);
}
// 输出：
.some .selector div1 {
  color-1: #008000;
  color-2: #008000;
  padding-2: 2;
}
.some .selector div2 {
  color-2: #008000;
  padding-2: 5px;
  color-3: #008000;
  padding-3: 5px;
  margin: 2 2 2 2;
}
.some .selector div3 {
  color-3: #008000;
  padding-3: 5px;
  margin: 4px 4px 4px 4px;
}
.some .selector div4 {
  color-3: #008000;
  padding-3: 5px;
  margin: 4px 4px 4px 4px;
}
.some .selector div5 {
  color-2: #008000;
  padding-2: 5px 4px;
  color-3: #008000;
  padding-3: 5px 4px;
  margin: 2 2 2 2;
}
.some .selector div6 {
  color-2: #008000, 5px 4px;
  padding-2: 2px;
  color-3: #008000, 5px 4px;
  padding-3: 2px;
  margin: 2 2 2 2;
}
```



**既可以按顺序依次传递参数，也可以使用属性值的方式传递**：

```less
.mixin(@color: black; @margin: 10px; @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}

// 输出
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```



**还可以使用`@arguments`:**

```less
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px,5px);
  //.box-shadow(2px;5px); 同上
}
.block{
  .box-shadow(2px 5px); 
  //.box-shadow(2px 5px;);同上
}

// 输出
.big-block {
  box-shadow: 2px 5px 1px #000;
}
.block {
  box-shadow: 2px 5px 0 1px #000;
}

```



**rest参数（...）：**

```less
.mixin(@a; @rest...) { 
	color:@a;
  padding:@rest...;
}
.box{
  .mixin(@a:red;2px;3px;4px;);
}

// 输出
.box {
  color: red;
  padding: 2px 3px;
}

```

**模式匹配**：

```less
.mixin(dark; @color) { // 需要第一个参数是dark
  color: darken(@color, 10%);
}
.mixin(light; @color) { // 需要第一个参数是light
  color: lighten(@color, 10%);
}
.mixin(@_; @color) {  // 需要第一个参数是任意的
  display: block;
}

@switch: light;

.class {
  .mixin(@switch; #888); // 匹配了第二个和第三个
}
// 输出
.class {
  color: #a2a2a2;
  display: block;
}
```



```less
.mixin(@a) {
  color: @a;
}
.mixin(@a; @b) {
  color: lighten(@a, @b);;
}

.box{
  .mixin(red);
}
.box1{
  .mixin(red,10%);
}
// 输出：
.box {
  color: red;
}
.box1 {
  color: #ff3333;
}
```

### 3.mixins用作函数

**可以在mixins里面定义变量直接引用使用**：

常用适配时的媒体查询可以这么分别写：

```less
.mixinsless1440(){
  @width:400px;
  @fontSize:12px;
 }
.mixinsbig1440(){
  @width:300px;
  @fontSize:20px;
 }

@media screen and (max-width:1400px){
  .mixinsless1440();
  width:@width;
  font-size: @fontSize;
}

@media screen and (min-width:1401px){
  .mixinsbig1440();
   width:@width;
  font-size: @fontSize;
}

// 输出
@media screen and (max-width: 1400px) {
  width: 400px;
  font-size: 12px;
}
@media screen and (min-width: 1401px) {
  width: 300px;
  font-size: 20px;
}
```



根据某个宽度及其他计算其中的margin值时，可以在代码中直接体现：

```less
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}

div {
  .average(16px, 50px); // "call" the mixin
  margin: @average;    // use its "return" value
}

// 输出
div {
  margin: 33px;
}
```

### 4.可以一次一个集合（属性，mixins)

```less
.desktop-and-old-ie(@rules) {
  @media screen and (min-width: 1200) { @rules(); }
  html.lt-ie9 &                       { @rules(); }
}

header {
  background-color: blue;

  // 一次传递n个不确定的属性和值
  .desktop-and-old-ie({
    background-color: red;
    font-size:14px;
  });
}

// 输出
header {
  background-color: blue;
}
@media screen and (min-width: 1200) {
  header {
    background-color: red;
    font-size: 14px;
  }
}
html.lt-ie9 header {
  background-color: red;
  font-size: 14px;
}

```



**思考：此写法和mixin定义实现。。。**：

```less
@my-ruleset: {
    .my-selector {
      background-color: black;
    }
  };

@media (orientation:portrait) {
    @my-ruleset();
}
// 输出
@media (orientation: portrait) {
  .my-selector {
    background-color: black;
  }
}
```

mixin在媒体查询下不能直接写，否则报错：

```less
.my-mixin(){
  .my-bg{
  	background:red;
  }
}

@media (max-width:1440px){
   	.my-mixin() // 报错
}
// 修正
@media (max-width:1440px){
  .ddd{
   	.my-mixin() // 可行
  }
}

// 输出
@media (max-width: 1440px) {
  .ddd .my-bg {
    background: red;
  }
}

一般mixin定义一个类样式不会多个嵌套？
.my-mixin(){
  	background:red;
}
```

[Passing Rulesets to Mixins](http://lesscss.cn/features/#mixins-parametric-feature)的使用作用就像是定义了一个公用的对象那样吗？

其中不止可以是属性和选择器还可以是mixin:

```less
// detached ruleset with a mixin
@detached-ruleset: { 
    .mixin() {
        color:blue;
    }
};
// call detached ruleset
.caller {
    @detached-ruleset(); 
    .mixin();
}
// 输出
.caller {
  color: blue;
}
```



## 10.import

* less中可以随意在任何地方引入文件

* less中引入文件，如果有.css后缀就认为是css文件；如果有.less或者无后缀或其他后缀都认为是less文件

* 【@import (keyword) "filename"】keyword可以配置选项：

  > * `reference`: use a Less file but do not output it
  > * `inline`: include the source file in the output but do not process it
  > * `less`: treat the file as a Less file, no matter what the file extension
  > * `css`: treat the file as a CSS file, no matter what the file extension
  > * `once`: only include the file once (this is default behavior)
  > * `multiple`: include the file multiple times
  > * `optional`: continue compiling when file is not found

  * **reference**:引入一个文件但是不会输出这个文件，只在其中的样式被extend或者混合复杂的mixins中使用的时候才会输出；通常我们在引入某个插件库时，只使用其中之一的样式就可以使用这个配置项；例如对bootstrap样式的引用，此时navbar的样式只被输出：

  ```less
  @import (reference) "bootstrap.less"
    
  .navbar:extend(.navbar all) {}
  ```

  * **inline**：引入的文件的css不做处理

  * **less**:文件后缀为less，作为less处理
  * **css**：文件后缀为css，作为css处理
  * **once**： 只引入一次（平常的就是这样）
  * **multiple**:可以在一个文件中多次引入（也不知道多次引用能有什么用？）
  * **optional**:平时不加此参数，引入的文件不存在的话会报错，但添加此参数后，存在时引入，不存在时不引入



## 11.when（if/else的效果）

连续写几个可以形成if/else的效果；

when后面的值为真才能匹配上

```less
.mixin (@a) when (lightness(@a) >= 50%) {
  background-color: black;
}
.mixin (@a) when (lightness(@a) < 50%) {
  background-color: white;
}
.mixin (@a) {
  color: @a;
}
```

**比较的操作符**包括： `>`, `>=`, `=`, `=<`, `<`

除了true以后其他的值都是假值（这个和js不同）：

```less
.truth (@a) when (@a) { 
	color:blue;
}
.truth (@a) when (@a = true) { 
	color:red;
}
.class {
  .truth(40); // 匹配不上，40为假值
}
.class1{
  .truth(true);
}

// 输出
.class1 {
  color: blue;
  color: red;
}
```

**逻辑操作符**： `and`，`,`，not

```less
.mixin (@a) when (isnumber(@a)) and (@a > 0) { ... }
.mixin (@a) when (@a > 10), (@a < -10) { ... }
.mixin (@b) when not (@b > 0) { ... }
```

**类型检查**：

- `iscolor`
- `isnumber`
- `isstring`
- `iskeyword`
- `isurl`
- `ispixel`
- `ispercentage`
- `isem`
- `isunit`

If/else中有一个可用的default()：

```less
.mixin (@a: 0) when not (ispixel(@a)) {
  width:e('@{a}px');
}

.mixin (@a) when (default()) {
  width:@a;
}
.class {
  .mixin(40); 
}

.class1{
  .mixin(30px)
}

// 输出
.class {
  width: 40px;
}
.class1 {
  width: 30px;
}
```

**css中也可以直接用**：

```less
.class1{
	@myoption:true;
    & when (@myoption = true) {
      button {
        color: white;
      }
  	}
}
// 输出
.class1 button {
  color: white;
}
```

```less
@my-option:true;
button when (@my-option = true) {
  color: white;
}

// 输出
button {
  color: white;
}
```



## 12.循环

```less
@i:8;
.loop(@i)when(@i>0){
  .loop((@i - 1));
  .cell-bg@{i} {background: url('../images/cell-bg@{i}.png') no-repeat;}
}
.loop(@i);

// 输出
.cell-bg1 {
  background: url('../images/cell-bg1.png') no-repeat;
}
.cell-bg2 {
  background: url('../images/cell-bg2.png') no-repeat;
}
.cell-bg3 {
  background: url('../images/cell-bg3.png') no-repeat;
}
.cell-bg4 {
  background: url('../images/cell-bg4.png') no-repeat;
}
.cell-bg5 {
  background: url('../images/cell-bg5.png') no-repeat;
}
```



```less
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}
// 输出
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```

## 13 合并

这个感觉一般很少用

```less
// +号是逗号连接
.mixin() {
  box-shadow+: inset 0 0 10px #555;
}
.myclass {
  .mixin();
  box-shadow+: 0 0 20px black; 
}
// 输出
.myclass {
  box-shadow: inset 0 0 10px #555, 0 0 20px black;
}
```

```less
// +_号是空格连接
.mixin() {
  transform+_: scale(2);
}
.myclass {
  .mixin();
  transform+_: rotate(15deg);
}
// 输出
.myclass {
  transform: scale(2) rotate(15deg);
}
```

