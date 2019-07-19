# getDerivedStateFromProps相关理解和记录
> 2019-07-19
<tag-part tagName="react"/>


# 1.getDerivedStateFromProps

## 初识
* **存在目的：**  （React16.3）让组件在props发生变化时更新state
* **初始：**  getDerivedStateFromProps和componentWillReceiveProps是几乎一致的，只在父亲组件重新渲染时子组件接收了新的props，此时此生命周期起作用。。。
* **改进：**（React16.4）为了确保与React即将推出的[异步呈现模式](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)的兼容性，所以做了调整————无论更新的原因如何，每次呈现组件时都会调用它；
* **疑问：** 为何要取消componentWillReceiveProps（React17会废弃）这个生命周期？

	[更新异步渲染](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html)官网上这篇文章解释了为何弃用之前的几个生命周期（componentWillMount、componentWillReceiveProps、componentWillUpdate）

* **注意：** 旧方法componentWillReceiveProps和新getDerivedStateFromProps方法都会增加组件的复杂性。这通常会导致错误。考虑更简单的派生状态替代方案，以使组件可预测和可维护。

## 知识点
* getDerivedStateFromProps中不能进行副作用操作
* 在getDerivedStateFromProps实例化组件之后以及在重新呈现组件之前调用新的静态生命周期。它可以返回要更新的对象state，或null指示新对象props不需要任何state更新
* 此方法无权访问组件实例

* 派生状态会导致代码冗余，并使组件难以维护。 确保你已熟悉这些简单的替代方案：

	* 如果你需要执行副作用（例如，数据提取或动画）以响应 props 中的更改，请改用 componentDidUpdate。
	
	* 如果只想在 prop 更改时重新计算某些数据，请使用 memoization helper 代替。
	
	* 如果你想在 prop 更改时“重置”某些 state，请考虑使组件完全受控或使用 key 使组件完全不受控 代替。


## 尝试使用

父组件中,请求获取formData，填充子组件的description表格

```js
state = {isGetData: false}
// 请求数据
getInfoData({ data })
.then((datas) => {
    if (datas.statusCode === 200) {
        if (flag) {
            const { data: { cityName, lineName, carid } } = datas
            const reqData = {
                cityName,
                lineName
            }
            this.setState({
                formData: datas.data,
                reqData
            }, () => {
                this.getYearList()
            })
        } else {
            this.setState({
                formData: datas.data
            })
        }
        this.setState({ isGetData: true })
    }
})
getedDataStatus = () => {
    this.setState({ isGetData: false })
}

....


<div className="event-info-details">
    <EventForm
        formData={formData}
        onChangeEdit={this.onChangeEdit}
        isFlushData={isGetData}
       getedStatus={this.getedDataStatus}
    />
</div>
```

而在子组件中，用户可以对description表格中两个字段进行修改


```js
class DescriptionForm extends PureComponent {
    static getDerivedStateFromProps(props) {
        const { formData, isFlushData, getedStatus } = props
        if (formData) {
            const { imadec, faumod } = formData
            
            if (isFlushData) {
                getedStatus()
                return { faumodValue: faumod, imadecValue: imadec }
            }
            return null
        }
        return null
    }

    constructor(props) {
        super(props)
        this.state = {
            faumodValue: '',
            imadecValue: ''
        }
    }

    changeValue = (field, e) => {
        this.setState({ [field]: e.target.value })
    }

    onChangeEdit = (field, e) => {
        const { onChangeEdit } = this.props
        const { formData: { faumodValue, imadecValue } } = this.props
        if ((field === 'faumod' && (faumodValue !== e.target.value))
         || ((field === 'imadec') && (imadecValue !== e.target.value))){
            onChangeEdit({ [field]: e.target.value })
        }
    }

    render() {
        const { formData } = this.props
        const { faumodValue, imadecValue } = this.state

        return (
            <React.Fragment>
                <div className="form-descprition clearfix">
                    <Descriptions bordered column={3} className="form-desc-bottom">
                        <Item label="车号">{formData.carnum}</Item>
                        <Item label="故障模式">
                            <Input
                                type="text" 
                                value={faumodValue}
                                onChange={e => this.changeValue('faumodValue', e)}
                                onBlur={e => this.onChangeEdit('faumod', e)}
                            />
                        </Item>
                        <Item label="现象描述">
                            <TextArea
                                onChange={e => this.changeValue('imadecValue', e)}
                                onBlur={e => this.onChangeEdit('imadec', e)}
                                value={imadecValue}
                            />
                        </Item>
                    </Descriptions> 
                </div>
            </React.Fragment>
            
        )
    }
}

```

其实上面的组件处理方式，并不是很好的，给人感觉不好理解，实际上官方更推荐的是下面两个内容所讲到的，使用受控组件，或者使用key值的非受控组件：

# 2.扩展-受控和非受控组件

名词“受控”和“非受控”通常用来指代表单的 inputs，但是也可以用来描述数据频繁更新的组件。用 props 传入数据的话，组件可以被认为是受控（因为组件被父级传入的 props 控制）。数据只保存在组件内部的 state 的话，是非受控组件（因为外部没办法直接控制 state）。

**表单的受控**：

在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）之类的表单元素通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源。由于 handlechange 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

对于受控组件来说，每个 state 突变都有一个相关的处理函数。这使得修改或验证用户输入变得简单。

# 3.扩展-派生状态

**【tlm时刻】（个人理解，或有不对之处）** ： 派生状态———即数据来源不止一处，比如有的state初始受props定义，后面又能在子组件中通过用户行为更改。

官网上有篇文章[你可能不需要使用派生 state](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state)涵盖了所有的内容

### 这篇文章提到的第一个方法——
**使组件成为受控组件（这是一个简单易懂的好办法）：**

比如，我们子组件中`select`的初始值由父组件请求回来的数据`dataOption`的第一个值作为默认值，此时`select`的选中值`selectedValue`为`props.dataOption[0]`，而在子组件中用户会进行重新选中`select`值来切换子组件中相关的显示，此时`selectedValue`必须重新更改`handelChange`，如果`selectedValue`作为`state`维护在子组件中，就需要在子组件中触发`handelChange = () => {this.setState({selectedValue:e.target.value})}`，那此`state`就为派生state，数据来源不止一处。父组件一旦更新渲染，`selectedValue`也会跟着更新。

这种情况就使子组件完全可控是是个好办法，即将`selectedValue`作为state在父组件中维护，`handleChange`函数也在父组件中，向下传递`selectedValue`和`handleChange`函数，在子组件中取`props.selectedValue`,以及使用`props.handleChange`来对应`onChange`事件。子组件的数据总是来源于父组件。即可控

就如同上面的修改那两个字段的例子，使用此方法也可，清晰明了

### 第二个方法： 
**有key的非受控组件：**

```js
// 子组件
class EmailInput extends Component {
  state = { email: this.props.defaultEmail };

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }
}
// 父组件
<EmailInput
  defaultEmail={this.props.user.email}
  key={this.props.user.id}
/>
```
巧妙之处正在于父组件中。

为了在不同的页面切换不同的值，我们可以使用 key 这个特殊的 React 属性。当 key 变化时， React 会创建一个新的而不是更新一个既有的组件。 Keys 一般用来渲染动态列表，但是这里也可以使用。

**每次 ID 更改，都会重新创建 EmailInput ，并将其状态重置为最新的 defaultEmail 值。**使用此方法，不用为每次输入都添加 key，在整个表单上添加 key 更有位合理。每次 key 变化，表单里的所有组件都会用新的初始值重新创建。

关于第二个方法，有些情况下这不好使，有选项可以替换：

#### 用 prop 的 ID 重置非受控组件

如果某些情况下 key 不起作用（可能是组件初始化的开销太大），一个麻烦但是可行的方案是在 getDerivedStateFromProps 观察 userID 的变化：

```js
class EmailInput extends Component {
  state = {
    email: this.props.defaultEmail,
    prevPropsUserID: this.props.userID
  };

  static getDerivedStateFromProps(props, state) {
    // 只要当前 user 变化，
    // 重置所有跟 user 相关的状态。
    // 这个例子中，只有 email 和 user 相关。
    if (props.userID !== state.prevPropsUserID) {
      return {
        prevPropsUserID: props.userID,
        email: props.defaultEmail
      };
    }
    return null;
  }

  // ...
}
```

如果你乐意，你也可以只重置一小部分 state

#### 使用实例方法重置非受控组件

更少见的情况是，即使没有合适的 key，我们也想重新创建组件。一种解决方案是给一个随机值或者递增的值当作 key，另外一种是用示例方法强制重置内部状态

```js
class EmailInput extends Component {
  state = {
    email: this.props.defaultEmail
  };

  resetEmailForNewUser(newEmail) {
    this.setState({ email: newEmail });
  }

  // ...
}
```

然后父级组件可以使用 ref 调用这个方法。[(点击查看这个模式的演示)](https://codesandbox.io/s/l70krvpykl)

refs 在某些情况下很有用，比如这个。但通常我们建议谨慎使用。即使是做一个演示，这个命令式的方法也是非理想的，因为这会导致两次而不是一次渲染。


**总结：**

设计组件时，重要的是确定组件是受控组件还是非受控组件。

不要直接复制（mirror） props 的值到 state 中，而是去实现一个受控的组件，然后在父组件里合并两个值。比如，不要在子组件里被动的接受 props.value 并跟踪一个临时的 state.value，而要在父组件里管理 state.draftValue 和 state.committedValue，直接控制子组件里的值。这样数据才更加明确可预测。

对于不受控的组件，当你想在 prop 变化（通常是 ID ）时重置 state 的话，可以选择一下几种方式：

建议: 重置内部所有的初始 state，使用 key 属性
选项一：仅更改某些字段，观察特殊属性的变化（比如 props.userID）。
选项二：使用 ref 调用实例方法。

### 还有一种方法 是[使用memoization](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state),后面再研究


