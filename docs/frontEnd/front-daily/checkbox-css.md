# 更换`<input type="checkbox">`的样式
>2018-01-02
<tag-part tagName="css"/>

[[toc]]

> 通常情况下，各个浏览器对·<input type="checkbox">·的样式不一致，并且不那么美观。所以有时候设计需要我们更换原有的样式：
**html**：

```html
<span>
    <input type="checkbox" class="input_check" id="check3" value="123">
    <label for="check1"></label>
</span>
```
**css**:

```css
span{
	position: relative;
	}
.input_check {
	position: absolute;
	visibility: hidden;
	cursor:pointer;
}
.input_check+label {
	display: inline-block;
	width: 14px;
	height: 14px;
	border: 2px solid #677795;
} 
.input_check:checked+label:after {
	content: "";
	position: absolute;
	left: 2px;
	bottom: 12px;
	width: 9px;
	height: 4px; 
	border: 2px solid #677795;
	border-top-color: transparent;
	border-right-color: transparent;
	-ms-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-webkit-transform: rotate(-45deg); 
	transform: rotate(-45deg);
}
```
***
其中必须注意，**input的id必须和label的for一致**，这是为了点击label联动点击了此checkbox。:after 实现的是对号的样式，方框旋转45度实现。


效果如下：
![327ea443-cb56-48b6-a332-89b68b132f28.png](~@alias/input-checkbox.png)