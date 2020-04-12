# Cytoscape使用技巧

## 1.添加有图标的label

设置样式时，`node`的`style`中增加了`label`的显示内容：

```js
style:{
	label:'data(label)'
}
```

在数据中，`data`中的label设置时给其中增加字体库中的图标（图标来源于阿里图标库，使用unicdoe编码的）。

```js
// \ue638为此图标，\u00A0为空格
data: {
    id, 
    label: `\ue638\u00A0\u00A0${name}`,
}               
```
在`style`中设置`font-family`:

```js
// cxxx为我的字体的名字
style:{
	label:'data(label)',
	'font-family': 'Microsoft YaHei,cxxx',
}
```

此处注意增加常有的字体在前面，因为在项目中发现，windows电脑上在只设置`cxxx`的时候，label中的下划线不显示。所以设置了常用字体时可以解决这个问题。

## 2.在控制台及时查看cy上的数据

使用`cy.json()`

## 3.更新数据

项目中，盛放cy的dom可以放全屏或缩小或者`resize`时，所以cy中，节点的位置需要随时调整，使用`preset`布局时，在每次重新计算cy节点的`position`后，更新时，使用`cy.json(datas)`来更新数据

## 4.获取节点的渲染位置

此位置为相对于`cy` `dom`的实际位置，使用：

`const {x, y} = cy.nodes(id).renderPosition()`

通过此，可以为`cy`每个节点上增加tooltip显示，`tooltip`的样式中`left=x,top=y`,并在css中增加样式：

```css
position: absolute;
z-index: 9999;
/* ... */
```




