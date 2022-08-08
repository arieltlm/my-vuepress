# antd3.x使用
>2019-09-06
<tag-part tagName="react"/>

[[toc]]


## 1.Tooltip的getPopupContainer改变浮层渲染父节点

```js
getPopupContainer={trigger => trigger.parentNode}

// 往上几个父节点的话
getPopupContainer={trigger => trigger.parentNode.parentNode.parentNode.parentNode}
```
## 2. antd中select

* 设置了value之后，defaultValue就不起作用了

* 设置了value并且value不为undefined之后，placeholder就不显示了，所以可以`value=value || undefined`


```
this.state = {
    dataReportType: '',
}

 ....
<Select
    onChange={this.handleChange}
    placeholder="请选择报表类型" 
    value={dataReportType || undefined}
>
```

## 3. antd中的description
对于label和content的宽度，我们想着table中每一行中每一个td可以设置百分比的宽度，总和为100%即可

## 4. ant-table

### 1）.设置table中某个td的宽度
有时设置width不起作用。加上`display:table-cell；`

设置width并超出显示省略号，官网给出讨论[https://github.com/ant-design/ant-design/issues/13825](https://github.com/ant-design/ant-design/issues/13825)

```
 .ant-table-fixed {
	table-layout: fixed;
}

.ant-table-tbody > tr > td {
	word-wrap: break-word;
	word-break: break-all;
}
```

### 2).头根据筛选条件的变化而变化

```js
const columns1 = [{
    title: '客户码',
    dataIndex: 'customerCode',
    key: 'customerCode',
}, {
    // title: '持仓量(买/卖)',
    title: ({filters}) => {
        return (!filters.openInterestCount || filters.openInterestCount.length === 2 ) ? "持仓量(买/卖)"
        :
        <span>持仓量(买/卖){
            (['买', '卖'][filters.openInterestCount[0]]) ? ('-(' + ['买', '卖'][filters.openInterestCount[0]] + ')') : ''
    }</span>},
    dataIndex: 'openInterestCount',
    key: 'openInterestCount',
    filters: [{
        text: '买',
        value: '0',
    }, {
        text: '卖',
        value: '1',
    }],
    filterMultiple: true, //是否多选默认true
    // filterIcon: (filtered) => <Icon type="smile-o" theme="outlined" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
    onFilter: (value, record) => record.openInterestCountFlag == value,
}];
```

### 3). ant design 中table表头进行请求筛选

```js
...
filterPositon = (selectedKeys, confirm) => {
    let titles = selectedKeys;
    confirm();
}
...
const columns11 = [{
    title: '客户码',
    dataIndex: 'customerCode',
    key: 'customerCode',
    width: '55%'
}, {
    title: () => (<span>持仓量{this.state.positionTitle}</span>),
    dataIndex: 'positions',
    key: 'positions',
    width: '45%',
    render: (text, record) => {
        return (
            <span>{text && (isNaN(Number(text))) && mining.utils.forMatMoney(Number(text))}</span>
        )
    },
    filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
    }) => (
        <div className="position-filter">
            <RadioGroup onChange={e => setSelectedKeys(e.target.value)} defaultValue="0">
                <Radio value="0">买/卖</Radio>
                <Radio value="1">买/卖</Radio>
                <Radio value="2">买/卖</Radio>
            </RadioGroup>
            <Button onClick={this.filterPositon(selectedKeys, confirm)}>确定</Button>
        </div>
    )
 }];

```

### 4).点击行，并添加活跃的行样式

```js
activeRow (record, index){
    return this.state.activeRow === index ? 'active-row': '';
}
showCurrentDetails(record, index, e){
    //...
    e.stopPropagation();
}
...

return(
    <div className={'wrapper-trade'}>
        <Table
            dataSource={dataSource}
            columns={columns1}
            pagination={false}
            locale={{emptyText: '没有数据'}}
            rowClassName={(record, index) => this.activeRow(record, index)}
            onRow={(record, index) => {
                return {
                    onClick: (e) => this.showCurrentDetails(record, index, e)
                }
            }}
            scroll={{ y: '90%' }}>
        </Table>
    </div>
)
```

### 5).Tabel上绑定onClick方法不可用，可外加div绑定
### 6).ant-table column设置
当书写render时，当此列没有key值时，render的参数为(record),当有key值时，render的参数为(text,render)
### 7).ant-table点击行选中

[官网给出的行选中](https://codesandbox.io/s/000vqw38rl)

**常用写法：**

```js
this.state={
    selectedRowKeys: [], 
    selectData: [],
}
....

// 选中行
handleCheck = (selectedRowKeys, selectedRows) => {
    this.setState({
        selectedRowKeys,
        selectData: [...selectedRows],
    })
}

// 清除选中的
clearSelectRow =() => {
    this.setState({
        selectData: [],
        selectedRowKeys: []
    })
}
...



<Table
rowSelection= {
    selectedRowKeys,
    onChange: this.handleCheck,
    fixed: true
}
/>

```


单选的时候,可简化handleRowClick：

```js
handleRowClick = (record) => {
    const selectedRowKeys = []
    selectedRowKeys.push(record.key)
    this.setState({ 
        selectedSecondRowKeys: selectedRowKeys,
        stepLastSelected: [record]
    })
}
```


### 8).antd中pagination分页pageSizeOptions

```js
pageSizeOptions: [20, 50, 100],
```
上述选中的可以显示为20，只在下拉选项时添加“页/条”


```js
pageSizeOptions: ['20', '50', '100'],
```
上述选中的可以显示为20页/条

### 9).antd中固定列宽度影响筛选图标显示

问题描述：
最后一列为操作列，固定在最右边，随着项目复杂，从3个操作增加为4个了，然后紧跟在操作列前面的一列筛选列的筛选图标被遮挡了，不明白为啥。。。。？

问题解决：最终发现，是只给操作增加了内容，没有增加操作列的宽度导致的，所以增加操作列的宽度到合适即可。


### 10).ant-table使table占满div进行滚动，有固定列情况

一般都是除了导航和查询的地方，剩下的地方container全部是table的，此时洗完滚动根据container的高度自适应变化而调整，而且不滚动时，分页在页面最底部,此时需要增加样式：

```css
.ant-table-wrapper,
.ant-spin-nested-loading,
.ant-spin-container,
.ant-table,
.ant-table-content,
.ant-table-scroll {
  height: 100%;
}
```

将table配置中`scroll: { y: 'calc(100% - 46px)' }`,46是因为表头高度是46

此时左或右固定时滚动会出现错位，增加样式：

```css
.ant-table-fixed-left,
.ant-table-fixed-right {
  height: calc(100% - 8px);

  .ant-table-body-outer {
    height: 100%;
  }

  .ant-table-body-inner {
    overflow: auto !important;
  }
}

```

### 11). 在时间的见证下，上面的10)是害惨额了，在最后统一样式时，全部进行了修改（捂脸）

上述的滚动高度其实也可以，但是在一种情况下，有横向滚动条时，滚动条会出现在table最大可占据的位置的最底部，第二点，当右固定列，且固定列样式明显时，空表格或者表格没占满的时候，就固定列样式就干巴巴在那拉到底了。

后来统一修改为(自己写了个高阶组件)：

```js
import {React,PureComponent,} from 'framework/Util'
import config from 'conf'

const { 
    constant: { 
        componentHeight: { 
            headerHg, breadCrumbHg, contentPdHg, btnsHg,
            btnMarginHg, tableHeaderHg, tablePaginationHg 
        }
    } 
} = config

const otherHg = headerHg + breadCrumbHg + contentPdHg + btnsHg + btnMarginHg + tableHeaderHg + tablePaginationHg


/**
 * 给table增加滚动高度计算的高阶组件
 * @param {Component} TableComponent 
 * @param {number} extraHgParams 传入的除table以外的高度（需要减去的高度），不传则为otherHg(header,面包屑，一行btn,分页)
 */

const tableScrollYHoc = (TableComponent, extraHgParams = otherHg) => class extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            scrollY: 0
        }
    }

    componentDidMount() {
        this.handleWindowResize()
        window.addEventListener('resize', this.handleWindowResize)
    }


    componentWillUnmount = () => {
        window.removeEventListener('resize', this.handleWindowResize)
    }


    handleWindowResize = () => {
        this.setState({ 
            scrollY: Math.max(100, document.body.clientHeight - extraHgParams) 
        })
    }

    render() {
        const { scrollY } = this.state
        return <TableComponent scrollY={scrollY} {...this.props} />
    }
}

export default tableScrollYHoc
```

### 12).antd table在手动刷新后下面四个警告的问题/奔溃问题

```bash
Warning: The <HeadTable /> component appears to be a function component that returns a class instance. Change HeadTable to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `HeadTable.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React. 
Warning: The <BodyTable /> component appears to be a function component...
Warning: The <ColGroup /> component appears to be a function component...
Warning: The <TableHeader /> component appears to be a function component...

```

只在标准化平台一个项目上见过一手动刷新表格就奔溃的情况，其他好几个项目上都见到了四个warning警告的问题；

事实上都是包版本的问题，我曾经怀疑过`antd`,`rc-table`,最初通过对比，将`rc-table`的版本一降再降，然后就使用6.10.7,6.10.5似乎就没有奔溃的问题了。。。


最终解决办法：

使用`@hot-loader/react-dom`代替`react-dom`启动，所以在`webpack`别名配置的地方加一句：

```js
alias: {
   'react-dom': '@hot-loader/react-dom',
},
```
这个可以解决表格手动刷新就奔溃的问题；

然后四个警告的问题：

将`react`,`react-dom`,`@hot-loader/react-dom`这三个的版本安装一致的就可以了;
此项目中均使用16.12.0

来自[github issue](https://github.com/react-component/table/issues/368)

![WX20200325-175759.png](https://i.loli.net/2020/03/25/wfXzYNoPeHKvFR9.png)

## 5.form校验-一行写多个检验
每个formitem中只能写一个校验
参见例子 一行写两个

`Row一行，Col两个即两列总共24`

```jsx
<Row gutter={8}>
    <Col span={7}>
        <Form.Item label="output:">
            {getFieldDecorator('outputFirstValue', {
                initialValue: ioFisrtSelDef[0],
            })(
                <Select
                    showSearch
                    optionFilterProp="children"
                    onChange={value => this.handleSelectChange(value, -1)}
                    labelInValue
                    disabled={editFlag && !valid}
                >
                    {this.setOptions(ruleOutputCandidates)}
                </Select>
            )}
        </Form.Item>
    </Col>
    <Col span={17}>
        <Form.Item {...addRuleSecondLayout}>
            {getFieldDecorator('outputSecondValue', {
                initialValue: ioSecondSelDef[0],
                rules: ioSecondValueDis[0] && [
                    { required: true, message: '请输入自定义输出!' },
                    { validator: this.validateOutput, }
                ],
            })(
                <Input type="text" className="rule-input" disabled={(editFlag && !valid) || ioSecondValueDis[0] !== 1} /> 
            )}
        </Form.Item>
    </Col>
</Row>
```




## 6.select选中值拿取当前行其他值

描述一个自己思路转不过来的坑-----

问题描述：

```js
const optionDatas = [
	{text:'aaaaa',id:1,params:['aad','bubu'],val: 'dada'},
	{text:'nnnnn',id:2,params:['daf','bubus'],val: 'dsada'},
	....
]


<Select
    value={similarRate}
    className="min-select"
    onChange={this.handleChange}
>
	{optionDatas.map((item, index) => (
	    <Option value={item.id} key={`match${index}`}>
	        {text}
	    </Option>
	))}
</Select>
```

往往optionDatas是一个对象数组，同时，显示的是text，value是一个id之类的值，但是在选中值后，我们某时会需要取得选中的这条数据中的其他值如params，此时，思路需要转坑---value可以改，
`value={index}`,`handleChange`时，选中的`params`为`optionDatas[index].params`;

（复杂(或者多个select时）时可以使用`value={`${item.id}-${index}`}`，此时split('-')可以拿到id和index。）

## 7. Dropdown的menu是一个组件时

Dropdown的menu是一个组件时，点击item之后，下拉框并不会自动收起，解决办法，Dropdown和menu写在一个组件中。


## 8.antd中select选项可远程检索时

如果Select的Option可以检索请求动态生成，需要增加`filterOption={false}`

