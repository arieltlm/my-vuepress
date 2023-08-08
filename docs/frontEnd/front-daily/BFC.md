# BFC(块格式化上下文）

[[toc]]

> Block Formatting Context

## 1).定义

[ BFC是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

它是一个独立的渲染区域，只有块级元素参与，它规定了内部的Block level Box如何布局，并且与这个区域外部毫不相干。

[具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。](https://zhuanlan.zhihu.com/p/25321647)

**下列方式会创建块格式化上下文：**

* 根元素(`<html>`)
* 浮动元素（元素的 float 不是 none）
* 绝对定位元素（元素的 position 为 absolute 或 fixed）
* 行内块元素（元素的 display 为 inline-block）
* 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
* 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
* 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
* overflow 值不为 visible 的块元素
* display 值为 flow-root 的元素(一个新的 display 属性的值，它可以创建无副作用的BFC)
* contain 值为 layout、content或 paint 的元素
* 弹性元素（display为 flex 或 inline-flex元素的直接子元素）
* 网格元素（display为 grid 或 inline-grid 元素的直接子元素）
* 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
column-span 为 all 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）

**简单点描述为：**

* 1.根元素或包含根元素的元素
* 2.浮动元素(float不为none)
* 3.绝对定位元素(position为absolute或者fixed)
* 4.display为inline-block,table-cell,table-caption,flow-root
* 5.overflow值不为visible
* 6.弹性元素(flex布局)
* 7.网格元素(grid布局)

## 2).[BFC的约束规则](https://github.com/louzhedong/blog/issues/145)

* 内部的Box会在垂直方向上一个接一个的放置
* 垂直方向上的距离由margin决定。（完整的说法是：属于同一个BFC的两个相邻Box的margin会发生重叠（塌陷），与方向无关。）
* 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明BFC中子元素不会超出他的包含块，而position为absolute的元素可以超出他的包含块边界）
* BFC的区域不会与float的元素区域重叠
* 计算BFC的高度时，浮动子元素也参与计算
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然

## 3).BFC的应用

### (1).防止margin重叠

通常情况下，处于同一个BFC下面的两个元素，两者中间的margin值会发生重叠。

> **【tlm时刻】**：同一个BFC下面—————指的是[这个包括相邻元素，嵌套元素，只要他们之间没有阻挡(例如边框，非空内容，padding等)就会发生margin重叠。](https://github.com/zuopf769/notebook/blob/master/fe/%E6%B8%85%E9%99%A4%E6%B5%AE%E5%8A%A8%E5%92%8CBFC/README.md);通常下，可以认为测试的时候的两个div同在html下面。

```html
 <div class="paras-box">
    <p>hello</p>
    <p>hi</p>
</div>
```

```css
p{
    background:#fcc;
    width:200px;
    margin:20px;
}
```

这两个p元素每个的margin都是20px，所以两者之间应该是40px的margin。但是实际图上可以看出，其两者之间的margin只有20px，发生了重叠。

![image.png](~@alias/review/review31.png)

此时可以通过将两个元素放在不同BFC下面解决：

```html
<div class="paras-box">
    <p>hello</p>
    <div class="wapper">
        <p class='p2'>hi</p>
    </div>
</div>
```

然后触发wapper为一个BFC元素即可，下面的以及上面所列的方式均可，但是有些就会根据自身的属性特点产生一定的副作用（如果没有后代元素的话，下面的都看不出来有什么副作用），推荐一个好用的，没有副作用的`display:flow-root;`

```css
.wapper{
    /* overflow:hidden; */
    /* display:inline-block; */
    display:flow-root; /*没有副作用*/
    /* display:flex; */
    /* position:absolute; */
    /* overflow: auto; */
}
```

> **`display:flow-root`**:该元素生成一个块容器框，并使用流布局布置其内容。它始终为其内容建立新的块格式化上下文
说明这是CSS2新增的专为建立块格式化上下文的一个属性值

> 兼容性问题，一般都是直接Can I use一把梭，会发现，其实除了firefox和chrome（当然还有Opera）对这个属性比较友好外，其他浏览器还不太支持
> [顺便提一下display:flow-root](https://github.com/alianggu/blog/issues/6)



### 2). BFC 可以阻止元素被浮动元素覆盖--实现两列自适应布局

```html
<div class="box">
    <div class="aside"></div>
    <div class="main"></div>
</div>
```

```css
.box{
    width:300px;
    position:relative;
}
.aside{
    width:100px;
    height: 150px;
    float:left;
    background: #f66;
}
.main{
    height:200px;
    background: #fcc;
}
```

![image.png](~@alias/review/review32.png)


由于BFC元素有一个规则是其不会覆盖浮动元素，所以只需要让main触发BFC即可。

```css
.main{
    height:200px;
    background: #fcc;
    
    /* display:flow-root; */
    overflow: hidden;
}
```

![image.png](~@alias/review/review33.png)



### 3).让浮动内容与周围内容等高----【清除浮动】

```html
<div class="box1">
    <div class="child"></div>
</div>
```

```css
.box1{
    border:5px solid yellow;
    width:300px;
}
.child{
    border:5px solid #f66;
    width:100px;
    height:100px;
}          
```

![image.png](~@alias/review/review34.png)

由于BFC计算高度时，会把浮动元素的计算之内，所以可以使box1元素触发BFC即可。

```css
.box1{
    border:5px solid orange;
    width:300px;
    /* overflow:hidden; */
    /* display:inline-block; */
    /* display:flow-root;*/
    /* display:flex; */
    /* position:absolute; */
    /* overflow: auto; */
    /* contain: content; */
    /*display:table;*/
    float:left;
}
```

![image.png](~@alias/review/review35.png)

**BFC清除浮动的后果**:

* 利用float来使父容器形成BFC,父容器高度没有塌陷，但是长度变短了，因为div应用float后会根据内容来改变长度
* overflow属性会影响滚动条
* position会改变元素的定位方式，这是我们不希望的
* display这几种方式依然没有解决低版本IE问题

[清除浮动和BFC](https://github.com/zuopf769/notebook/blob/master/fe/%E6%B8%85%E9%99%A4%E6%B5%AE%E5%8A%A8%E5%92%8CBFC/README.md)这篇文章中还讲到了IE清除浮动的问题---最终得到最佳方案：

```css
.clearfix{
    *zoom:1;
}
.clearfix:after{
    content:"";
    display:table;
    clear:both;
}
```

[CSS清浮动处理（Clear与BFC）](https://www.cnblogs.com/dolphinX/p/3508869.html)这篇文章中详细讲述了clear清除浮动的具体细节：

> clear属性是个什么东东呢？clear 属性规定元素的哪一侧不允许其它之前浮动元素


**参考：**

* [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)
* [块状格式化上下文BFC](https://github.com/alianggu/blog/issues/6)
* [flow-root](https://www.w3cplus.com/css3/display-flow-root.html)
* [BFC原理解析](https://github.com/louzhedong/blog/issues/145)
* [清除浮动和BFC](https://github.com/zuopf769/notebook/blob/master/fe/%E6%B8%85%E9%99%A4%E6%B5%AE%E5%8A%A8%E5%92%8CBFC/README.md)
* [CSS清浮动处理（Clear与BFC）](https://www.cnblogs.com/dolphinX/p/3508869.html)
* [BFC及其原理解析](https://github.com/wlf1112/FE_Interview/issues/2)
* [MDN-块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)