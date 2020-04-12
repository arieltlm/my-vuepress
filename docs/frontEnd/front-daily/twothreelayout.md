# 两栏和三栏布局

>2019-07-22
<tag-part tagName="css"/>

[[toc]]

## 1、两栏布局（左侧固定宽度，右侧自适应）

```html
<div class="box">
    <div class="left-box">left</div>
    <div class="right-box">right</div>
</div>
```

```css
*{
    padding:0;
    margin:0;
}
.box{
  	 position: relative;
    width:100%;
    height:300px;
}
.left-box{
    background:pink;
    height:100%;
}
.right-box{
    background: darkcyan;
    height:100%;
}
```

### 1)浮动

#### (1).单浮动

```css
.left-box{
    width:400px;
    float:left;
}
.right-box{
   margin-left:400px;
}
```

#### (2).双浮动

```css
 .left-box{
    width:400px;
    float:left;
}
.right-box{
    float: left;
    width:calc(100% - 400px); /* 此处如果不写宽度的话，宽度就是被内容撑起来的宽度*/
}
```

脱离的文档流，浮动需要在父元素上清除浮动

### 2）绝对定位

```css
.left-box{
    position: absolute;
    width:400px;
}
.right-box{
    margin-left:400px;
}
```

绝对定位和浮动基本一致，其两者都脱离的文档流。

### 3）flex布局

```css
.box{
    display: flex;
}
.left-box{
    width:400px;
}
.right-box{
    flex:1;
}
```

以上是最常用的三种，还有几种其他的：

### 4）[双inline-block方案](https://segmentfault.com/a/1190000010698609)


```css
.box{
    box-sizing: content-box;
    font-size: 0;     /* 消除空格的影响 */
}

.box .left-box,
.box .right-box {
    display: inline-block;
    vertical-align: top;    /*顶端对齐*/
    font-size: 14px;
    box-sizing: border-box;
}

.box .left-box {
    width: 400px;
}
.box .right-box {
    width: calc(100% - 400px);
}
```

### 5) [float+BFC](https://segmentfault.com/a/1190000010698609)

BFC 规则————块格式化上下文

```css
.box {
    overflow: auto;
}

.box .left-box {
    float: left;
    margin-right: 20px; /*两个div之间的间隔*/
}

.box .right-box {
    margin-left: 0;
    overflow: auto;
}
```

这种方法左侧可以不设置宽度，右边也不用计算宽度，左边由内容自动撑起，右侧块状元素自适应宽度

### 6）grid布局

```css
 .box {
    display: grid;
    grid-template-columns: 400px auto;
    /*或者下面这句*/
    grid-template-columns: 400px 1fr;
    align-items: start;
}
```

### 7）[table布局](https://blog.csdn.net/weixin_40122996/article/details/82120331)

```css
 .box{
    display: table;
    width: 100%;
}
.left-box{
    display: table-cell;
    width:400px;
}
.right-box{
    /* width: 100%; */ /*写或者不写都行*/
}
```

## 2、三栏布局（左右固定宽度，中间自适应）

```html
<div class="box">
    <div class="left-box">left</div>
    <div class="middle-box">middle</div>
    <div class="right-box">right</div>
</div>
```

```css
*{
    padding:0;
    margin:0;
}
.box{
    position: relative;
    width:100%;
    height:300px;
}
.left-box{
    background:pink;
    height:100%;
    opacity: 0.5;
}
.middle-box{
    background:rgb(163, 109, 28);
    height:100%;
}
.right-box{
    background: darkcyan;
    height:100%;
}

```

### 1) [grid布局](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

```css
.box{
   display: grid;
   grid-template-columns: 100px auto 240px;
}
```
目前grid布局的兼容性还不是很好。如下图（2019-07-22）：
[![WX20190722-162758.png](https://i.loli.net/2019/07/22/5d3573b0d904b85764.png)](https://i.loli.net/2019/07/22/5d3573b0d904b85764.png)


### 2) flex

```css
.box{
    display: flex;
}
.left-box{
    width:100px;
}
.middle-box{
    flex:1;
}
.right-box{
    width:240px;
}
```


### 3）浮动

#### (1) 每个元素都浮动（父元素要清除浮动）--（圣杯布局）
```css
.left-box{
    float:left;
    width:100px;
}
.middle-box{
    float: left;
    width:calc(100% - 340px); /*此处必须计算中间元素的宽度*/
}
.right-box{
    float:right; /*此处float:left;均可以*/
    width:240px;
}
```


#### (2) 只两边左右浮动

先看下面一个“奇怪”的结果：

```css
.left-box{
    float:left;
    width:100px;
}
.middle-box{ /*中间div不用写宽度*/
    margin-left:100px;
    margin-right:240px; 
}
.right-box{
    float:right;
    width:240px;
}
```

html不动，采用上面的css会产生这样的效果：

[![WX20190722-163812.png](https://i.loli.net/2019/07/22/5d3576135c81a69391.png)](https://i.loli.net/2019/07/22/5d3576135c81a69391.png)

然后将html中中间自适应的div放到左右浮动的两div后面三个div就都可以处于一条线上，且中间div自适应宽度：

```html
<div class="box">
	<div class="left-box">left</div>
	<div class="right-box">right</div>
	<div class="middle-box">middle</div>
</div>
```

这是因为float的元素不占文档流。如果middle-box在第二个的时候，就占了，所以下一个块级元素会被放在下一行



#### (3) [圣杯布局](https://www.jianshu.com/p/3046eb050664)

```html
<div class="box">
    <div class="middle-box">middle</div>
    <div class="left-box">left</div>
    <div class="right-box">right</div>
</div>
```

```css
.box{
    position: relative;
    /* width:100%; */
    height:300px;
}
.left-box{
    background:pink;
    height:100%;
    opacity: 0.5;
}
.middle-box{
    background:rgb(163, 109, 28);
    height:100%;
}
.right-box{
    background: darkcyan;
    height:100%;
}
.box{
    padding-left: 100px;
    padding-right:240px;
}
.left-box{
    float:left;
    width:100px;
    margin-left: -100%;
    position: relative;
    left: -100px;
}
.middle-box{
    float: left;
    width:100%; 
}
.right-box{
    float:left;
    width:240px;
    margin-left: -240px;
    position: relative;
    right: -240px;
}
```

此时中间的元素在最前面。且父元素不能有width:100%;，中间自适应的元素宽度为100%；（太复杂不好用。）

#### (4) [双飞翼布局](https://www.jianshu.com/p/8b308d63fe23)

```css
*{
    padding:0;
    margin:0;
}
.middle-box {
    float: left;
    width: 100%;
}
.content {
    height: 200px;
    margin-left: 110px;
    margin-right: 220px;
    background-color: green;
}
    
.middle-box::after {
    display: block;
    content: '';
    font-size: 0;
    height: 0;
    clear: both;
    zoom: 1;
}
.left-box {
    float: left;
    height: 200px;
    width: 100px;
    margin-left: -100%;
    background-color: red;
}
.right-box {
    width: 200px;
    height: 200px;
    float: left;
    margin-left: -200px;
    background-color: blue;
}  
```

双飞翼布局的前两步和圣杯布局一样，只是处理中间栏部分内容被遮挡问题的解决方案有所不同：

既然main部分的内容会被遮挡，那么就在main内部再加一个content，通过设置其margin来避开遮挡，问题也就可以解决了;(不好用）

### 4）绝对定位

```css
.left-box{
    position: absolute;
    width:100px;
}
.middle-box{
    position: absolute;
    left: 100px;
    right: 240px;
}
.right-box{
    position: absolute;
    right:0;
    width:240px;
}
```

### 5）[table布局](https://www.jianshu.com/p/3046eb050664)

```css
.box{
    display: table;
}
.left-box{
    display: table-cell;
    width:100px;
}
.middle-box{
    display: table-cell;
}
.right-box{
    display: table-cell;
    width:240px;
}
```

这种布局方式能使得三栏的高度是统一的
