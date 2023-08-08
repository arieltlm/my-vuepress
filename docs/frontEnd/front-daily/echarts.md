# echarts分享

## echarts 基础概念概览
![e1](~@alias/echarts/e1.png)
![e2](~@alias/echarts/e2.png)
![e3](~@alias/echarts/e3.png)
## echarts中的样式简介
* 颜色主题（Theme）
* 调色盘
* 直接样式设置（itemStyle、lineStyle、areaStyle、label、...）
* 视觉映射（visualMap）
## 异步数据加载和更新
* 加载—myChart.setOption(option)
* loading 动画:
```js 
    myChart.showLoading();
    myChart.setOption(...);
```
* ECharts 由数据驱动,动态更新—setOpption
## 使用dataset管理数据
ECharts 4 提供了 数据集（dataset）组件来单独声明数据，它带来了这些效果：
能够贴近这样的数据可视化常见思维方式：基于数据（dataset 组件来提供数据），指定数据到视觉的映射（由 encode 属性来指定映射），形成图表。
数据和其他配置可以被分离开来，使用者相对便于进行单独管理，也省去了一些数据处理的步骤。
数据可以被多个系列或者组件复用，对于大数据，不必为每个系列创建一份。
支持更多的数据的常用格式，例如二维数组、对象数组等，一定程度上避免使用者为了数据格式而进行转换。

## 图表中加入交互组件
* 图例组件 legend
* 标题组件 title
* 视觉映射组件 visualMap
* 数据区域缩放组件 dataZoom
* 时间线组件 timeline
## echarts中的事件和行为
```js
myChart.on('click', function (params) { 
    // 控制台打印数据的名称 
    console.log(params.name); 
});
```


ECharts 支持常规的鼠标事件类型: 'click'、'dblclick'、'mousedown'、'mousemove'、'mouseup'、'mouseover'、'mouseout'、'globalout'、'contextmenu'


```js
{ 
// 当前点击的图形元素所属的组件名称， 
// 其值如 'series'、'markLine'、'markPoint'、'timeLine' 等。 
componentType: string, // 系列类型。值可能为：'line'、'bar'、'pie' 等。当 componentType 为 'series' 时有意义。
seriesType: string, // 系列在传入的 option.series 中的 index。当 componentType 为 'series' 时有意义。 
seriesIndex: number, // 系列名称。当 componentType 为 'series' 时有意义。 
seriesName: string, // 数据名，类目名 
name: string, // 数据在传入的 data 数组中的 index 
dataIndex: number, // 传入的原始数据项 
data: Object, // sankey、graph 等图表同时含有 nodeData 和 edgeData 两种 data， // dataType 的值会是 'node' 或者 'edge'，表示当前点击在 node 还是 edge 上。 // 其他大部分图表中只有一种 data，dataType 无意义。 
dataType: string, // 传入的数据值 
value: number|Array // 数据图形的颜色。当 componentType 为 'series' 时有意义。 
color: string 
}

```

```js
myChart.dispatchAction({ type: '' }) 触发图表行为
```
## 富文本标签

几乎凡是可以定义字的地方都可以用rich;
一类如title,用text定义文字,text:'{a|这是个title}',此时可以textStyle中有rich;
一类如legend,用formatter定义特殊的文字,rich中定义样式,还有:tooltip,坐标轴中的label相关中也有formatter无论是text还是formatter其值都必须是string


echarts 提供了丰富的文本标签配置项，包括：
字体基本样式设置：fontStyle、fontWeight、fontSize、fontFamily。
文字颜色：color。
文字描边：textBorderColor、textBorderWidth。
文字阴影：textShadowColor、textShadowBlur、textShadowOffsetX、textShadowOffsetY。
文本块或文本片段大小：lineHeight、width、height、padding。
文本块或文本片段的对齐：align、verticalAlign。
文本块或文本片段的边框、背景（颜色或图片）：backgroundColor、borderColor、borderWidth、borderRadius。
文本块或文本片段的阴影：shadowColor、shadowBlur、shadowOffsetX、shadowOffsetY。
文本块的位置和旋转：position、distance、rotate。


```js
formatter:'{a|value} kg'
// 或者下面的
formatter(name) {
	return `{a|${name}}`
},
rich: {
    a: {
    fontSize: 12,
        color: '#7e7f7f', 
    },
}
```