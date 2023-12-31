# 感受不一样的官网[React]
————学习笔记
> 2019-08-16

<tag-part tagName="react"/>

> 课程来自Yaqi Guo，[课程地址](https://www.youtube.com/watch?v=9l9ZIpF-hjY)
***

[[toc]]

## 1. 事件绑定

### 1）课程简述

#### （1）07节

直接在dom上写事件e=>{},（1情况），其实是每次点击都会把这段代码`(e) => handleClick('message')`触发执行一下，每次都需要创建一下。而放在变量（2情况）中，其在内容中已经引用了，点击时只是调用一下。

```js
// 1
const message1 = <div onClick={(e) => handleClick1('message1')}>message1</div>
function handleClick1(param){
    console.log(param)
}

// 2
const message2 = <div onClick={handleClick2('message2')}>message2</div>
function handleClick2(param){
    return (e) => {
        console.log(param)
    }
}
```

如上述代码 message1和message2是一样的效果。

***

```js
const message1 = <div onClick={handleClick1('message1')}>message1</div>
function handleClick1(param){
    console.log(param)
}
```

此代码在加载过程中就会自动执行。

***

```js
let handleClick= (param) => (e) =>{
    console.log(param)
}
const message1 = <div onClick={handleClick1('message1')}>message1</div>
```

#### （2） 21节事件

```js
<script type="text/babel">
    class App extends React.Component{
        constructor(props){
            super(props);
            this.handleClick3 = this.handleClick3.bind(this);
            this.handleClick7 = this.handleClick7.bind(this, '点我7');
        }

        handleClick2() {
            console.log(2);
        }

        handleClick3() {
            console.log(3, this);
        }
        handleClick4() {
            console.log(4, this);
        }
        handleClick5(msg) {
            return (e) => {
                console.log(5, msg)
            }
        }
        handleClick6(msg) {
            console.log(6, msg)
        }
        handleClick7(msg) {
            console.log(7, msg)
        }
        handleClick8 = (e) => {
            console.log(8, this)
        }
        handleClick9 = (msg) => (e) => {
            console.log(9)
        }
        render() {
            return (
                <div>
                    {/*一个项目中，关注大家的写法，尽量保持一致*/}
                    {/*不传参数时 ，推荐3和8*/}
                    <div onClick={() => console.log(1)}>点我1</div> {/*直接pass，通常情况下没人这样写*/}
                    <div onClick={() => this.handleClick2()}>点我2</div> {/*每次onClick时，都会把这个箭头函数先执行一遍，造成性能冗余（测试2——未缓存）*/}
                    <div onClick={this.handleClick3}>点我3</div> {/*优先选择此*/}
                    <div onClick={this.handleClick4.bind(this)}>点我4</div>{/*3，4可以关注测试3，4；（测试3——已缓存。测试4——未缓存）*/}
                    <div onClick={this.handleClick8}>点我8</div> {/*ES7的新写法，可用，与3类似*/}
                    {/*传参数时 (只要传参数，肯定不会被缓存）,推荐5和9*/}
                    <div onClick={this.handleClick5('点我5')}>点我5</div>
                    <div onClick={this.handleClick6.bind(this, '点我6')}>点我6</div>{/*相对于5来说，不用在里面嵌套return函数，但是6拿不到event*/}
                    <div onClick={this.handleClick7}>点我7</div> {/*（已缓存）pass，通常情况下没人这样写，参数写在contructor中实在是不方便*/}
                    <div onClick={this.handleClick9('点我9')}>点我9</div> {/*简洁清晰明了*/}

                    <div onClick={(() => this.handleClick2()) === (() => this.handleClick2()) ? console.log('已缓存') : console.log('未缓存')}>测试2</div>
                    <div onClick={this.handleClick3 === this.handleClick3 ? console.log('已缓存') : console.log('未缓存')}>测试3</div>
                    <div onClick={this.handleClick4.bind(this) === this.handleClick3.bind(this) ? console.log('已缓存') : console.log('未缓存')}>测试4</div>
                </div>
            )
        }
    } 
    ReactDOM.render(<App />, document.getElementById('root'))
</script>
```

***
### 2） 官网学习
#### （1）官网学习-绑定this指到组件实例上


通常情况下，如果你没有在方法后面添加 () ，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。即this.handleClick = this.handleClick.bind(this);

除了bind(this)，还有两种方法：

* (1) 如果你正在使用实验性的属性初始化器语法，你可以使用属性初始化器来正确的绑定回调函数(这个语法在 Create React App 中默认开启);

```js
handleClick = () => {
    console.log('this is:', this);
}

render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
}
```

* (2)在回调函数中使用 箭头函数

>使用这个语法有个问题就是每次此组件渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。

```js
handleClick() {
    console.log('this is:', this);
}

render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
}
```
#### （2）官网学习-向事件处理程序传递参数

以下两种方式：

* `<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>`
* `<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>`

通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

bind方式的e要在参数的最后一个

作者提供的还有一个写法：

```js
deleteRow = (id) => (e) => {
    // 逻辑处理
}
render() {
    <button onClick={this.deleteRow(id)}>Delete Row</button>
}
```

**总结一下**：
* 1）不传递参数时，尽量都写上`this.handleClick = this.handleClick.bind(this);`
* 2) 传递参数时，推荐`deleteRow = (id) => (e) => {}`或者`onClick={(e) => this.deleteRow(id, e)}>`(这个是ES6和ES7)

## 2. JSX与React

```js
// JSX
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

```
进过babel转换成原生react api

```js
const element = React.createElement(
  'h1', // 元素
  {className: 'greeting'}, // props
  'Hello, world!' // children（后面的都是children
);
```
***

```js

<script type="text/babel">
    const list = (
        <ul>
            <li className="activeLi">1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    )

    //相当于

    const lists = React.createElement(
        'ul',
        null,
        React.createElement('li', {className: 'activeLi'},, '1'),
        React.createElement('li', null, '1'),
        React.createElement('li', null, '1'),
    )
</script>

```
## 3. React.Fragment

```js
const msg = (
    <div className="title">title</div>
    <div className="content">content</div>
)

React.render(msg, document.getElementById('App'));
```
对于上面这段代码，react会报错，其不允许直接跟两个同级元素。即用React.createElement时，两个同级元素，无法书写（需父子包含）。

***

**通常我会这样写**：

```js
const msg = (
	<div>
	    <div className="title">title</div>
	    <div className="content">content</div>
   </div>
)

```
>这种情况确实可行，但是会造成一个冗余，在App的div父和div.title、div.content直接加一个div，使其二者无法构成父子关系，而成了爷孙关系,嵌套深度增加。在大型项目中，太多的此类写法，会占用一定的带宽和流量，影响性能。

***
视频中作者提供了一种数组的方法，但是不常用：

```js
const msg = (
    [<div className="title">title</div>,
    <div className="content">content</div>]
)
// 或者
const msg1 = (） => {
	return (
	    [<div className="title">title</div>,
	    <div className="content">content</div>]
	)
}
// babel转后为
var msg = [React.createElement(
    "div",
    { className: "title" },
    "title"
), React.createElement(
    "div",
    { className: "content" },
    "content"
)];
```
![babel-react-array.png](~@alias/react/babel-react-array.png)

*** 

**在react中，采用的方法是React.Fragment**：

```js
const msg = (
	 <React.Fragment>
	    <div className="title">title</div>
	    <div className="content">content</div>
    </React.Fragment>
)
```

## 4. React的render

作者用下面的代码说明了render只是对变化的部分进行渲染，大大节省了资源————react的虚拟dom。

```html
<body>
    <div id="App1"></div>
    <div id="App"></div>
    <script id="template" type="text/template">
        <div className="title">title</div>
        <div className="content">content</div>
    </script>
    <script type="text/babel">
        setInterval(() => {
            document.getElmentById('App1').innerHTML = document.getElmentById('template').innerHTML;
        }, 1000);

        let count = 0;
        setInterval(() => {
            const msg = (
                <React.Fragment>
                    <div className="title">title</div>
                    <div className="content">content</div>
                </React.Fragment>
            )
            ReactDOM.render(msg, document.getElmentById('App'));
            count++;
        },1000)
    </script>
</body>
```
>用chrome控制台rendering中paint falshing可以看到，原生js写的整个dom都在重绘，而react只用count部分在重绘（绿色部分为变动的），如下图：

![react-repaint.png](~@alias/react/react-repaint.png)

## 5. component

组件中有两种写法：

* function 
* class

如果比较简单，没有生命周期等的，能用function就用function。（函数式编程）

React中的props不可改变，而普通函数中传入参数可改变；

***

引入bootstrap，封装alert组件：

```js
function Alerts(props) {
    return (
        <div className={'alert alert-' + props.type} role="alert">
            {props.children}
        </div>
    )
}

function App() {
    return (
        <React.Fragement>
            <Alerts type="primary"> this is primary </Alerts>
            <Alerts type="secondary"> this is secondary </Alerts>
            <Alerts type="warning"> this is warning </Alerts>
            <Alerts type="danger"> this is danger </Alerts>
        </React.Fragement>
    )
}

ReactDOM.render(<App />, document.getElementById('App'))
```


## 6.state

> component：
> 
>* class: contianer component

>* function: presentational component

***

state在刚进行this.setState改变之后，同级下直接拿不到其值，(由于this.setState它是异步实现的),需要callback回调函数：

```js
componentDidMount() {
    this.setState({
        count: 1
    }, () => {
        console.log(this.state.count)
    })
}
```

***
状态更新可能是异步的
React 可以将多个setState() 调用合并成一个调用来提高性能。

因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

例如，此代码可能无法更新计数器：

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
要修复它，请使用第二种形式的 setState() 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数：

```js
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

```js
componentDidMount() {
    this.setState({
        count: this.state.count + 1
    })
    this.setState({
        count: this.state.count + 1
    })
    this.setState({
        count: count: this.state.count + 1
    }, () => {
        console.log(this.state.count); // 1
    })
}
```

```js
componentDidMount() {
    this.setState((state) => ({
        count: state.count + 1
    }));
    this.setState((state) => ({
        count: state.count + 1
    }));
    this.setState((state) => ({
        count: state.count + 1
    }), () => {
        console.log(this.state.count); // 3
    })
}
```

## 7.class事件bind

```js
class App extends React.Component{ // 注意此处Component的c要大写，否则报错Super expression must either be null or a function, not undefined
    constructor(props){
        super(props);
        this.name= 'wang';
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log('1111'); 
        console.log(this.name);
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}></button>
            </div>
        )
    }
}
```
假如`handleClick`中不会用到`this`的相关内容其实不进行绑定`this`，也是可行的，即`this.handleClick = this.handleClick.bind(this)`这句可省略，而在handleClick用到this（指向组件的实例）相关的就需要绑定；

把原型方法handleClick( )改变为实例方法handleClick( ),并且强制指定这个方法中的this指向当前的实例。

## 8.search github's user 例子

### 1) 取得github api

bing上搜github api，点第一个链接“GitHub API v3 | GitHub Developer Guide”

找到右边列表最下方的users，

点击Get a single user

![github-api.png](~@alias/react/github-api.png)

access_token需要在自己的github中获取，

在Settings/Developer settings/Personal access tokens 然后generate new token

此时名字可以随便填一个，下面的可以全选。
生成的token记录在某一个地方。

请求user的接口为：
`'https://api.github.com/users/'+ userName +'?access_token=154402ec3b538161c012aadd869cb678ec69d15a')`

username是你的用户名

### 2）实现input回车时查询

一般是在input中输入后点击查询按钮进行查询，还有一种就是直接回车进行查处。但是react中，onChange事件是获取input的值的。所以要实现回车查询，可以有以下两种方式：

* (1) e.nativeEvent.keyCode === 13

```js
handleChange(e) {
    this.setState({
        userName: e.target.value
    })
}
handleEnterKey(e) {
    if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
         this.props.handleSearch(this.state.userName)
     }
}
...

<input type="text" onChange={this.handleChange} onKeyPress={this.handleEnterKey}/>
```

* （2）addEventListener

```js
componentDidMount(){ 
    //组件挂载时候，注册keypress事件
    document.addEventListener('keypress',this.handleEnterKey)
}
componentWillUmount(){
    //组件卸载时候，注销keypress事件
    document.removeEventListener("keypress",this.handleEenterKey)
}
handleEnterKey(e) {
    if(e.keyCode === 13){ //e.nativeEvent获取原生的事件对像
        this.props.handleSearch(this.state.userName)
    }
}
...

constructor(props) {
	super(props);
	this.myRef = React.createRef();
}

<input type="text" onChange={this.handleChange} ref={this.myRef}/>
```

### 3）react某些报错

* (1) react中项img，input这些必须闭合，必须写`<input />`. bootstrap中约定都不写/
* (2) class App extends React.Component，这里的Component一定是大写，否则报TypeError

***
实践例子见[github](https://github.com/arieltlm/react-test/tree/master/yaqi-officialTutorial)
***
