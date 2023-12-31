# React.js小书学习笔记

<tag-part tagName="react"/>

>[React.js小书](http://huziketang.mangojuice.top/books/react/)写的非常不错，是一本追本溯源的react书籍，值得一读。
>
> [练习题地址ScriptOJ](http://scriptoj.mangojuice.top/problemsGroups/593a2e29b3838c385539fa4f)

***

[[toc]]

## 1、前端组件化-指出React的来由

```js
<div class="wrapper"></div>
<script>
    /* Component */
    class Component {
        constructor (props = {}) {
            this.props = props
        }

        setState (state) {
            const oldEl = this.el
            this.state = state
            this.el = this.renderDOM()
            if (this.onStateChange) this.onStateChange(oldEl, this.el)
        }

        renderDOM () {
            this.el = createDOMFromString(this.render())
            if (this.onClick) {
                this.el.addEventListener('click', this.onClick.bind(this), false)
            }
            return this.el
        }
    }

    const createDOMFromString = (domString) => {
    const div = document.createElement('div')
    div.innerHTML = domString
        return div
    }

    const mount = (component, wrapper) => {
        wrapper.appendChild(component.renderDOM())
        component.onStateChange = (oldEl, newEl) => {
            wrapper.insertBefore(newEl, oldEl)
            wrapper.removeChild(oldEl)
        }
    }

    /* ========================================= */
    class LikeButton extends Component {
        constructor (props) {
            super(props)
            this.state = { isLiked: false }
        }

        onClick () {
            this.setState({
            isLiked: !this.state.isLiked
            })
        }

        render () {
            return `
            <button class='like-btn' style="background-color: ${this.props.bgColor}">
                <span class='like-text'>
                ${this.state.isLiked ? '取消' : '点赞'}
                </span>
                <span>👍</span>
            </button>
            `
        }
    }

    class RedBlueButton extends Component {
        constructor (props) {
            super(props)
            this.state = {
            color: 'red'
            }
        }

        onClick () {
            this.setState({
            color: 'blue'
            })
        }

        render () {
            return `
            <div style='color: ${this.state.color};'>${this.state.color}</div>
            `
        }
    }

    const wrapper = document.querySelector('.wrapper')
    mount(new LikeButton({ bgColor: 'red' }), wrapper)
    mount(new LikeButton(), wrapper)
    mount(new RedBlueButton(), wrapper)
</script>
```
[实现代码](https://github.com/huzidaha/reactjs-in-40)
## 2、JSX到DOM
![jsx-DOM](http://huzidaha.github.io/static/assets/img/posts/44B5EC06-EAEB-4BA2-B3DC-325703E4BA45.png)

**为什么不直接从 JSX 直接渲染构造 DOM 结构，而是要经过中间这么一层呢？**

* 第一个原因是，当我们拿到一个表示 UI 的结构和信息的对象以后，不一定会把元素渲染到浏览器的普通页面上，我们有可能把这个结构渲染到 canvas 上，或者是手机 App 上。所以这也是为什么会要把 react-dom 单独抽离出来的原因，可以想象有一个叫 react-canvas 可以帮我们把 UI 渲染到 canvas 上，或者是有一个叫 react-app 可以帮我们把它转换成原生的 App（实际上这玩意叫 ReactNative）。

* 第二个原因是，有了这样一个对象。当数据变化，需要更新组件的时候，就可以用比较快的算法操作这个 JavaScript 对象，而不用直接操作页面上的 DOM，这样可以尽量少的减少浏览器重排，极大地优化性能。这个在以后的章节中我们会提到。

JSX 在编译的时候会变成相应的 JavaScript 对象描述。

react-dom 负责把这个用来描述 UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上。

## 3、事件监听

在 React.js 不需要手动调用浏览器原生的 addEventListener 进行事件监听。React.js 帮我们封装好了一系列的 on* 的属性，当你需要为某个元素监听某个事件的时候，只需要简单地给它加上 on* 就可以了。而且你不需要考虑不同浏览器兼容性的问题，React.js 都帮我们封装好这些细节了。

[SyntheticEvent（英文）](https://reactjs.org/docs/events.html)

[合成事件(SyntheticEvent)（中文）](http://react.html.cn/docs/events.html)

React.js 将浏览器原生的 event 对象封装了一下，对外提供统一的 API 和属性，这样你就不用考虑不同浏览器的兼容性问题。这个 event 对象是符合 W3C 标准（ W3C UI Events ）的，它具有类似于event.stopPropagation、event.preventDefault 这种常用的方法

## 4、setState

```js
handleClickOnLikeButton () {
	this.setState((prevState) => {
	  return { count: 0 }
	})
	this.setState((prevState) => {
	  return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
	})
	this.setState((prevState) => {
	  return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
	})
	// 最后的结果是 this.state.count 为 3
}
```

上面我们进行了三次 setState，但是实际上组件只会重新渲染一次，而不是三次；这是因为在 React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的 setState 都进行合并以后再重新渲染组件。

深层的原理并不需要过多纠结，你只需要记住的是：在使用 React.js 的时候，并不需要担心多次进行 setState 会带来性能问题。

## 5、默认配置 defaultProps

```js
class LikeButton extends Component {
  static defaultProps = {
    likedText: '取消',
    unlikedText: '点赞'
  }

  constructor () {
    super()
    this.state = { isLiked: false }
  }
  ...
  render () {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked
          ? this.props.likedText
          : this.props.unlikedText} 👍
      </button>
    )
  }
}
```

```js
class Greeting extends React.Component {
  // ...
}

Greeting.defaultProps = {
  name: 'Mary'
};
```

## 6、列表的key
key! key! key!

现在代码运作正常，好像没什么问题。打开控制台看看：

![](http://huzidaha.github.io/static/assets/img/posts/85CA5037-99C1-422C-99A4-AADA978C6801.png)

React.js 报错了。

React.js 的是非常高效的，它高效依赖于所谓的 Virtual-DOM 策略。简单来说，能复用的话 React.js 就会尽量复用，没有必要的话绝对不碰 DOM。对于列表元素来说也是这样，但是处理列表元素的复用性会有一个问题：元素可能会在一个列表中改变位置。例如：

```html
<div>a</div>
<div>b</div>
<div>c</div>
```
假设页面上有这么3个列表元素，现在改变一下位置：

```html
<div>a</div>
<div>c</div>
<div>b</div>
```
c 和 b 的位置互换了。但其实 React.js 只需要交换一下 DOM 位置就行了，但是它并不知道其实我们只是改变了元素的位置，所以它会重新渲染后面两个元素（再执行 Virtual-DOM 策略），这样会大大增加 DOM 操作。但如果给每个元素加上唯一的标识，React.js 就可以知道这两个元素只是交换了位置：

```html
<div key='a'>a</div>
<div key='b'>b</div>
<div key='c'>c</div>
```
这样 React.js 就简单的通过 key 来判断出来，这两个列表元素只是交换了位置，可以尽量复用元素内部的结构。

这里没听懂没有关系，后面有机会会继续讲解这部分内容。现在只需要记住一个简单的规则：对于用表达式套数组罗列到页面上的元素，都要为每个元素加上 key 属性，这个 key 必须是每个元素唯一的标识。一般来说，key 的值可以直接后台数据返回的 id，因为后台的 id 都是唯一的。

在上面的例子当中，每个 user 没有 id 可以用，可以直接用循环计数器 i 作为 key：

```js
...
class Index extends Component {
  render () {
    return (
      <div>
        {users.map((user, i) => <User key={i} user={user} />)}
      </div>
    )
  }
}
...
```
再看看，控制台已经没有错误信息了。但这是不好的做法，这只是掩耳盗铃（具体原因大家可以自己思考一下）。记住一点：在实际项目当中，如果你的数据顺序可能发生变化，标准做法是最好是后台数据返回的 id 作为列表元素的 key。

## 7. 生命周期

我们一般会把组件的 state 的初始化工作放在 constructor 里面去做；在 componentWillMount 进行组件的启动工作，例如 Ajax 数据拉取、定时器的启动；组件从页面上销毁的时候，有时候需要一些数据的清理，例如定时器的清理，就会放在 componentWillUnmount 里面去做。

***

### TEST请求数据用async、await
> 题目
>完成 Post 组件，它可以加载、刷新文章内容。
>
>已有函数 getPostData，它会返回一个 Promise，你可以通过它获取文章的内容。
>
```js
getPostData().then((postContent) => {
  // ...
})
```
>在获取数据的时候，Post 组件的 div.post-content 中显示 数据加载中...，完成加载以后直接显示 getPostData 的返回结果。

>页面有个按钮，点击可以重新加载数据。

答案：

```js
// getPostData 已经可以直接使用
// 小提示：本系统可以直接 async/await

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
    }
    
    this.handleRefresh = this.handleRefresh.bind(this)
  }
  
  async handleRefresh() {
    this.setState({
      content: '数据加载中...'
    })
    const data = await getPostData()
    this.setState({
      content: data
    })
  }
  
  componentWillMount() {
    this.handleRefresh()
  }
  render () {
    return (
      <div>
        <div className='post-content'>{this.state.content}</div>
        <button onClick={this.handleRefresh}>刷新</button>
      </div>
    )
  }
}
```

***

## 挂载阶段的生命周期
* componentWillMount：组件挂载开始之前，也就是在组件调用 render 方法之前调用。
* componentDidMount：组件挂载完成以后，也就是 DOM 元素已经插入页面后调用。
* componentWillUnmount：组件对应的 DOM 元素从页面中删除之前调用。

## 更新阶段的生命周期
* shouldComponentUpdate(nextProps, nextState)：你可以通过这个方法控制组件是否重新渲染。如果返回 false 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
* componentWillReceiveProps(nextProps)：组件从父组件接收到新的 props 之前调用。
* componentWillUpdate()：组件开始重新渲染之前调用。
* componentDidUpdate()：组件重新渲染并且把更改变更到真实的 DOM 以后调用。

## 8. ref

```js
componentDidMount () {
    this.input.focus()
  }

  render () {
    return (
      <input ref={(input) => this.input = input} />
    )
  }
```

可以看到我们给 input 元素加了一个 ref 属性，这个属性值是一个函数。当 input 元素在页面上挂载完成以后，React.js 就会调用这个函数，并且把这个挂载以后的 DOM 节点传给这个函数。在函数中我们把这个 DOM 元素设置为组件实例的一个属性，这样以后我们就可以通过 this.input 获取到这个 DOM 元素。


> 能不用 ref 就不用,能不直接操作dom就不操作dom；

可给组件标签也加上 ref ，例如：

```js
<Clock ref={(clock) => this.clock = clock} />
```
这样你获取到的是这个 Clock 组件在 React.js 内部初始化的实例。但这并不是什么常用的做法，而且也并不建议这么做

## 9.this.props.children

```js
<div className='card-content'>
  {this.props.children}
</div>
```

把 props.children 打印出来，你可以看到它其实是个数组

### TEST 
> 题目：
> 实现一个组件 BlackBorderContianer，它会把作为它的嵌套结构的 每个直接子元素 都用一个黑色边框的 div 包裹起来。例如：
> 
```js
<BlackBorderContainer>
  <div className='name'>My Name：Lucy</div>
  <p className='age'>
    My Age：<span>12</span>
  </p>
</BlackBorderContainer>
```
>最后的 div.name 和 p.age 都具有一层黑色边框（1px solid #000000）外层结构。
>
> 实现：

> 
```js
class BlackBorderContainer extends Component {
  /* TODO */
  constructor(props){
    super(props);
  }
  render() {
    return (<div>
      {this.props.children.map((item, index) => 
        <div className="blackBorder">{item}</div>
      )}
    </div>)
  }
}
```

## 10.覆盖默认样式TEST

> 题目：
> 完成一个函数 getDefaultStyledPost，这个函数接受一个表示样式的对象作为参数，返回一个组件只有 <p> 元素的组件：

>
```js
const Post = getDefaultStyledPost({ color: 'red' })
<Post /> // <p>任意内容</p>，颜色为红色
```
>渲染出来的 <p> 元素要具有 getDefaultStyledPost 所接受对象所表示的样式。此外，返回的 Post 组件还要能够接受一个 style 对象作为 props，这个对象会和原来的样式进行合并显示：

>
```js
const Post = getDefaultStyledPost({ color: 'red' })
<Post style={{ color: 'blue', fontSize: '13px' }} />
<Post style={{ fontSize: '12px' }} />
```

实现：

```js
const getDefaultStyledPost = (defaultStyle) => {
  /* TODO */
  return (props) => {
      const style={...defaultStyle,...props.style};
      return (
        <p style={style}>任意内容</p>
      )
  }
}
```
## 11. dangerouslySetInnerHTML

```js
this.state = {
  content: '<h1>React.js 小书</h1>'
}
...
render () {
    return (
      <div
        className='editor-wrapper'
        dangerouslySetInnerHTML={{__html: this.state.content}} />
    )
}
```
## 12. 组件内部写法顺序

组件的私有方法都用 _ 开头，所有事件监听的方法都用 handle 开头。把事件监听方法传给组件的时候，属性名用 on 开头。例如：

```js
<CommentInput
  onSubmit={this.handleSubmitComment.bind(this)} />
```

这样统一规范处理事件命名会给我们带来语义化组件的好处，监听（on）CommentInput 的 Submit 事件，并且交给 this 去处理（handle）。这种规范在多人协作的时候也会非常方便。

另外，组件的内容编写顺序如下：

* static 开头的类属性，如 defaultProps、propTypes。
* 构造函数，constructor。
* getter/setter（还不了解的同学可以暂时忽略）。
* 组件生命周期。
* _ 开头的私有方法。
* 事件监听方法，handle*。
* render* 开头的方法，有时候 render() 方法里面的内容会分开到不同函数里面进行，这些函数都以 render* 开头。
* render() 方法。
* 如果所有的组件都按这种顺序来编写，那么维护起来就会方便很多，多人协作的时候别人理解代码也会一目了然。

## 13. 实现回车提交

```js
// 为了实现输入完成后，回车即执行查询
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
// 下面这种方法也可行
// onKeyPress={this.handleEnterKey}
// handleEnterKey(e) {
//     if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
//         this.props.handleSearch(this.state.userName)
//     }
// }
```
## 14. 高阶组件

高阶组件就是一个函数，传给它一个组件，它返回一个新的组件。

高阶组件的作用其实不言而喻，其实就是为了组件之间的代码复用。组件可能有着某些相同的逻辑，把这些逻辑抽离出来，放到高阶组件中进行复用。高阶组件内部的包装组件和被包装组件之间通过 props 传递数据。

高阶组件代码复用的方法、形式有很多种，你可以用类继承来做到代码复用，也可以分离模块的方式。但是高阶组件这种方式很有意思，也很灵活。学过设计模式的同学其实应该能反应过来，它其实就是设计模式里面的装饰者模式。它通过组合的方式达到很高的灵活程度。

高阶组件的作用是用于代码复用，可以把组件之间可复用的代码、逻辑抽离到高阶组件当中。新的组件和传入的组件通过 props 传递信息。

### TEST实现加载、刷新数据 - 高阶组件

>题目：
>完成高阶组件 loadAndRefresh，它具有以下功能：

>
```js
class Post extends Component {
  render () {
    return (
      <div>
        <p>{this.props.content}</p>
        <button onClick={() => this.props.refresh()}>刷新</button>
      </div>
    )
  }
}
Post = loadAndRefresh('/post')(Post)
```
>
> 高阶组件 loadAndRefresh 接受一个 url 作为参数，然后返回一个接受组件作为参数的函数，这个新函数返回一个新的组件。新的组件渲染的时候会给传入的组件设置 content 和 refresh 作为 props。

>环境中已经定义好了一个 getData(url) 的返回 Promise 的函数，它会去服务器取一个字符串的文本，你需要通过 content 的 props 把它传给被包裹的组件。组件在第一次加载还有 refresh 的时候会去服务器取数据。

>另外，组件在加载数据的时候，content 显示 数据加载中...。而且，所有传给 loadAndRefresh 返回的组件的 props 要原封不动传给被包裹的组件。
>

**实现：**

```js
// getData(url) 已经可以直接使用
// 本站的环境都可以使用 async/await

const loadAndRefresh = (url) => {
  return (WrappedComponent) => {
    class NewComponent extends Component{
      constructor(props) {
        super(props);
        this.state={
          content: '数据加载中...'
        }
      }
      componentWillMount(){
        this._getData();
      }
      async _getData(){
        this.setState({
          content: '数据加载中...'
        })
        const content = await getData(url);
        this.setState({ content })
      }
      refreshes = () => {
        this._getData();
      }
      render() {
        return (
          <WrappedComponent
          content={this.state.content}
          refresh={this.refreshes}
          {...this.props}/> 
        )
      }
    }
    return NewComponent;
  }
}
```

### TEST 高阶组件 + context
> 题目：
> 完成高阶组件 makeProvider，接受一个任意类型的数据和组件作为参数：
>
`Post = makeProvider({ name: 'Jerry' })(Post)`
>
>Post 下的所有子组件都可以通过 this.context.data 获取到传给 makeProvider 的参数。如上面的 Post 及其子组件的内部可以通过 this.context.data.name 获取到 Jerry。

**实现：**

```js
const makeProvider = (params) => (WrappedComponent) => {
  return class extends Component{
    static childContextTypes = {
      data: PropTypes.object
    }
    constructor(){
      super();
      this.state={
        data:null
      }
    }
    componentWillMount() {
      this.setState({data:params})
    }
    getChildContext() {
      return { data: this.state.data }
    }
    render() {
      return (
        <WrappedComponent />
      )
    }
  }
}
```
> 注意：下面两句的存在即可使其子组件通过this.context.data来获取父组件中的data状态
> 
```js
	static childContextTypes = {
     data: PropTypes.object
  }
  ...
  getChildContext() {
  	return { data: this.state.data }
  }
```
 
**事后诸葛：**
原来这个用法是[旧的用法](https://zh-hans.reactjs.org/docs/legacy-context.html)，就说我读过一遍官网的呀，怎么没有发现这个。

![WX20190905-154506@2x.png](~@alias/react/react-small-book.png)

Context即在需要在组件树中从父组件一直进行向下传递的时候，使用他比较好。
Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据

详细用法——
新用法——[https://zh-hans.reactjs.org/docs/context.html](https://zh-hans.reactjs.org/docs/context.html)

```js
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

// 在组件中使用context
class app extends Component{
    static contextType = ThemeContext;
    ...
    let theme = this.context; //这一句可以在任何地方，你可以在任何生命周期中访问到它，包括 render 函数中。
}
// ThemeContext.Provider可以修改其默认值
<ThemeContext.Provider value={this.state.theme}>
          
</ThemeContext.Provider>
```

ThemeContext.Consumer在ThemeContext.Provider中消耗； 
这里，React 组件也可以订阅到 context 变更。这能让你在函数式组件中完成订阅 context。 这需要函数作为子元素（function as a child）这种做法。这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。 如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。

```js
<ThemeContext.Provider value={this.state.theme}>
    <Toolbar changeTheme={this.toggleTheme} />
    <ThemeContext.Consumer>
        {value=><Consumers theme={value}/>}
    </ThemeContext.Consumer>
</ThemeContext.Provider>
...
function Consumers(props){
    return <div style={{background:props.theme.background,color:props.theme.foreground,width:400,height:200,fontSize:12,margin:10,border:'1px solid blue'}}>
        ThemeContext.Consumer在ThemeContext.Provider中消耗；
    </div>
}
```
实例见[github contextTest](https://github.com/arieltlm/react-test/tree/master/comment-app/src/testBox/contextTest)
  
## 15. 动手实现Redux

上节内容展示了contenxt，其就相当于全局变量，而同时它可以随时随地被获取和修改；随时随地可被获取确实方便很多，但是修改就会引发问题。

context 打破了组件和组件之间通过 props 传递数据的规范，极大地增强了组件之间的耦合性。而且，就如全局变量一样，context 里面的数据能被随意接触就能被随意修改，每个组件都能够改 context 里面的内容会导致程序的运行不可预料。[摘]

由此Redux就规定只能通过某种方式（dispatch)来修改；
学习 React.js 团队的做法，把事情搞复杂一些，提高数据修改的门槛：模块（组件）之间可以共享数据，也可以改数据。但是我们约定，这个数据并不能直接改，你只能执行某些我允许的某些修改，而且你修改的必须大张旗鼓地告诉我。dispatch，它专门负责数据的修改；所有对数据的操作必须通过 dispatch 函数，它接受一个参数 action，这个 action 是一个普通的 JavaScript 对象，里面必须包含一个 type 字段来声明你到底想干什么。dispatch 在 swtich 里面会识别这个 type 字段，能够识别出来的操作才会执行对 state 的修改。

把state和dispatch集中到一个地方，给这个地方起个名字叫做 store，然后构建一个函数 createStore，用来专门生产这种 state 和 dispatch 的集合，这样别的 App 也可以用这种模式了；

```js
function createStore (state, stateChanger) {
  const getState = () => state
  const dispatch = (action) => stateChanger(state, action)
  return { getState, dispatch }
}
```
针对每个不同的 App，我们可以给 createStore 传入初始的数据 appState，和一个描述数据变化的函数 stateChanger，然后生成一个 store。需要修改数据的时候通过 store.dispatch，需要获取数据的时候通过 store.getState。


上面的代码有一个问题，我们每次通过 dispatch 修改数据的时候，其实只是数据发生了变化，如果我们不手动调用 renderApp，页面上的内容是不会发生变化的。但是我们总不能每次 dispatch 的时候都手动调用一下 renderApp，我们肯定希望数据变化的时候程序能够智能一点地自动重新渲染数据，而不是手动调用。加入订阅者模式，可以通过 store.subscribe 订阅数据修改事件，：

```js
function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}
```

```js
const store = createStore(appState, stateChanger)
store.subscribe(() => renderApp(store.getState()))

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
// ...后面不管如何 store.dispatch，都不需要重新调用 renderApp
```

subscribe接收一个方法作为参数，将其放入listeners数组中，定义dipatch时依次执行listeners数组中的方法，那么每次调用dispatch的时候就执行了这个参数方法（即state发生变化就重新render），达到了监听的效果；

作者举例代码学习：

```js
function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}

function renderApp (appState) {
  renderTitle(appState.title)
  renderContent(appState.content)
}

function renderTitle (title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent (content) {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

let appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue'
  }
}

function stateChanger (state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color
      break
    default:
      break
  }
}

const store = createStore(appState, stateChanger)
store.subscribe(() => renderApp(store.getState())) // 监听数据变化

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
```

## 16.Redux 模式
我们从一个简单的例子的代码中发现了共享的状态如果可以被任意修改的话，那么程序的行为将非常不可预料，所以我们提高了修改数据的门槛：你必须通过 dispatch 执行某些允许的修改操作，而且必须大张旗鼓的在 action 里面声明。

这种模式挺好用的，我们就把它抽象出来一个 createStore，它可以产生 store，里面包含 getState 和 dispatch 函数，方便我们使用。

后来发现每次修改数据都需要手动重新渲染非常麻烦，我们希望自动重新渲染视图。所以后来加入了订阅者模式，可以通过 store.subscribe 订阅数据修改事件，每次数据更新的时候自动重新渲染视图。

接下来我们发现了原来的“重新渲染视图”有比较严重的性能问题，我们引入了“共享结构的对象”来帮我们解决问题，这样就可以在每个渲染函数的开头进行简单的判断避免没有被修改过的数据重新渲染。

我们优化了 stateChanger 为 reducer，定义了 reducer 只能是纯函数，功能就是负责初始 state，和根据 state 和 action 计算具有共享结构的新的 state。

createStore 现在可以直接拿来用了，套路就是：

```js
// 定一个 reducer
function reducer (state, action) {
  /* 初始化 state 和 switch case */
}

// 生成 store
const store = createStore(reducer)

// 监听数据变化重新渲染页面
store.subscribe(() => renderApp(store.getState()))

// 首次渲染页面
renderApp(store.getState()) 

// 后面可以随意 dispatch 了，页面自动更新
store.dispatch(...)
```

TEST实现Reducer

> 题目：
> 完成一个符合 Redux 要求的 Reducer usersReducer，它可以支持以下对一个存储用户信息的数组进行增、删、改的需求：
> 
```js
/**
 * 用户的数据包括三部分，姓名（username）、年龄（age）、性别（gender）
 */
/* 增加用户操作 */
dispatch({
  type: 'ADD_USER',
  user: {
    username: 'Lucy',
    age: 12,
    gender: 'female'
  }
})
/* 通过 id 删除用户操作 */
dispatch({
  type: 'DELETE_USER',
  index: 0 // 删除特定下标用户
})
/* 修改用户操作 */
dispatch({
  type: 'UPDATE_USER',
  index: 0,
  user: {
    username: 'Tomy',
    age: 12,
    gender: 'male'
  }
})
```

修改用户数据的时候，可以进行部分地修改，而不是完全地替换。

注意，usersReducer 的 state 就是一个数组，你不需用把它包装到一个对象当中。

**实现：**

```js
const usersReducer = (state = [], action) => {
  switch(action.type){
    case 'ADD_USER':
      return [...state,action.user];
    case 'DELETE_USER':
      return[...state.slice(0,action.index),...state.slice(action.index+1)];
    case 'UPDATE_USER':
      return [...state.map((user, index) => {
       if (index === action.index) {
          return {...user, ...action.user}
        } else {
          return user 
        }
      })]
    default:
      return state
  }
}
```
## 17.动手实现react-redux

对context的使用；

mapStateToProps和mapDispatchToProps都是connect的参数。

connect就是一个高阶组件,输入mapStateToProps和mapDispatchToProps参数，以及组件WrappedComponent，输出一个把context中值转为props的组件:

```js
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    constructor () {
      super()
      this.state = {
        allProps: {}
      }
    }

    componentWillMount () {
      const { store } = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }

    _updateProps () {
      const { store } = this.context
      let stateProps = mapStateToProps
        ? mapStateToProps(store.getState(), this.props)
        : {} // 防止 mapStateToProps 没有传入
      let dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch, this.props)
        : {} // 防止 mapDispatchToProps 没有传入
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }

    render () {
      return <WrappedComponent {...this.state.allProps} />
    }
  }
  return Connect
}
```
***

Provider就是个父组件(最顶层的），其只用于放store，其后代组件均可使用store：

```js
export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
  }

  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}
```

代码实现请见[make-react-redux-app](https://github.com/arieltlm/react-test/tree/master/make-react-redux-app)

## 18.Dumb和Smart
根据是否需要高度的复用性，把组件划分为 Dumb 和 Smart 组件，约定俗成地把它们分别放到 components 和 containers 目录下。

Dumb 基本只做一件事情 —— 根据 props 进行渲染。而 Smart 则是负责应用的逻辑、数据，把所有相关的 Dumb（Smart）组件组合起来，通过 props 控制它们。

Smart 组件可以使用 Smart、Dumb 组件；而 Dumb 组件最好只使用 Dumb 组件，否则它的复用性就会丧失。

要根据应用场景不同划分组件，如果一个组件并不需要太强的复用性，直接让它成为 Smart 即可；否则就让它成为 Dumb 组件。

还有一点要注意，Smart 组件并不意味着完全不能复用，Smart 组件的复用性是依赖场景的，在特定的应用场景下是当然是可以复用 Smart 的。而 Dumb 则是可以跨应用场景复用，Smart 和 Dumb 都可以复用，只是程度、场景不一样。

划分Dumb和Smart——举例：

```js
// 原Header.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Header extends Component {
  static propTypes = {
    themeColor: PropTypes.string
  }

  render () {
    return (
      <h1 style={{ color: this.props.themeColor }}>React.js 小书</h1>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}
Header = connect(mapStateToProps)(Header)

export default Header
```
这个文件其实依赖了 react-redux，别人使用的时候其实会带上这个依赖，所以这个组件不能叫 Dumb 组件。但是你观察一下，这个组件在 connect 之前它却是 Dumb 的，就是因为 connect 了导致它和 context 扯上了关系，导致它变 Smart 了，也使得这个组件没有了很好的复用性。

**新增 `src/components/Header.js`(Dumb)：**

```js
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Header extends Component {
  static propTypes = {
    themeColor: PropTypes.string
  }

  render () {
    return (
      <h1 style={{ color: this.props.themeColor }}>React.js 小书</h1>
    )
  }
}
```

**新增 `src/container/Header.js`(Smart):**

```js
import { connect } from 'react-redux'
import Header from '../components/Header'

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}
export default connect(mapStateToProps)(Header)
```
 