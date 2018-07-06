import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import FilterableProductTable from './HelloWorld';
import registerServiceWorker from './registerServiceWorker';

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

function getGreeting(user) {
    if (user) {
        return <h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}
function formatDate(date) {
    return date.toLocaleDateString();
}
const user = {
    firstName: 'Harper',
    lastName: 'Perez'
};

//元素用来描述你在屏幕上看到的内容,React 元素都是immutable 不可变的。当元素被创建之后，你是无法改变其内容或属性的。更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法，下面有个定时器的例子
//注意在JSX当中的表达式要包含在大括号里。
const element = (
    //<h1>
    //    Hello, {formatName(user)}! 
    //</h1>
    <div>
        <h1>
            Hello, {formatName(user)}!
        </h1>
        {getGreeting(user)}
        {getGreeting()}
    </div>
);

const element1 = <div tabIndex="0"></div>; //你可以使用引号来定义以字符串为值的属性：
const element2 = <img src={user.avatarUrl}></img>; //也可以使用大括号来定义以 JavaScript 表达式为值的属性：

//你还可以使用 JSX 中的点表示法来引用 React 组件。你可以方便地从一个模块中导出许多 React 组件。例如，有一个名为 MyComponents.DatePicker 的组件，你可以直接在 JSX 中使用它：
const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div>Imagine a {props.color} datepicker here.</div>;
    }
}

function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
}

/*
这里也挺厉害的，运行时选择类型
const components = {
    photo: PhotoStory,
    video: VideoStory
};

function Story(props) {
    // 错误！JSX 标签名不能为一个表达式。
    return <components[props.storyType] story = { props.story } />;
}
*/
function App1() {
    return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
    const props = { firstName: 'Ben', lastName: 'Hector' };
    return <Greeting {...props} />;//如果你已经有了个 props 对象，并且想在 JSX 中传递它，你可以使用 ...作为扩展操作符来传递整个属性对象。上面两个组件是等价的
}



//定义一个组件最简单的方式是使用JavaScript函数：该函数是一个有效的React组件，它接收一个单一的“props”对象并返回了一个React元素。我们之所以称这种类型的组件为函数定义组
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
//也可以使用 ES6 class 来定义一个组件，注意这里如果也用Welcome的名字会报错说重复命名，这也证明两种方式是一样的
//组件名称必须以大写字母开头。例如，<div /> 表示一个DOM标签，但 < Welcome /> 表示一个组件，并且在使用该组件时你必须定义或引入它。
class WelcomeComp extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
//在前面，我们遇到的React元素都只是DOM标签,然而，React元素也可以是用户自定义的组件,当React遇到的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件，这个对象称之为“props”。
const element3 = <Welcome name="Sara" />;
const element4 = <WelcomeComp name="SaraComp" />;

//这下面讲的是组件的组合
function AppFunc() {
    return (
        <div>
            <Welcome name="Sara" />
            <Welcome name="Cahal" />
            <Welcome name="Edite" />
        </div>
    );
}
function Avatar(props) {
    return (
        <img className="Avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
        />

    );
}
function UserInfo(props) {
    return (
        <div className="UserInfo">
            <Avatar user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}

function Comment(props) {
    return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}

//下面将用函数和用组件的state来构造一个计时器
//React 元素都是immutable 不可变的。当元素被创建之后，你是无法改变其内容或属性的。更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法，下面有个定时器的例子
function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}

//通过 setInterval() 方法，每秒钟调用一次 ReactDOM.render().在实际生产开发中，大多数React应用只会调用一次 ReactDOM.render() 。在下一个章节中我们将会详细介绍 有状态组件 实现 DOM 更新方式。
//即便我们每秒都创建了一个描述整个UI树的新元素，React DOM 也只会更新渲染文本节点中发生变化的内容。
//setInterval(tick, 1000); 

//第二种方法
function Clock(props) {
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

function tick() {
    ReactDOM.render(
        <Clock date={new Date()} />,
        document.getElementById('root')
    );
}
//setInterval(tick, 1000);

//第三种方法
function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

//Clock 现在被定义为一个类而不只是一个函数 使用类就允许我们使用其它特性，例如局部状态、生命周期钩子
//可以看到这里跟函数的区别是使用this.props 而不是props
//在 render() 方法中使用 this.state.date 替代 this.props.date，<h2>It is {this.state.date.toLocaleTimeString()}.</h2>  而不是  <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
//添加一个类构造函数来初始化状态 this.state
class ClockComp extends React.Component {
    constructor(props) {
        super(props);//类组件应始终使用props调用基础构造函数。
        this.state = { date: new Date() };
    }
    //每当Clock组件第一次加载到DOM中的时候，我们都想生成定时器，这在React中被称为挂载
    //当组件输出到 DOM 后会执行 componentDidMount() 钩子，这是一个建立定时器的好地方：
    componentDidMount() {
        //我们如何在 this 中保存定时器ID。
        //虽然 this.props 由React本身设置以及this.state 具有特殊的含义，但如果需要存储不用于视觉输出的东西，则可以手动向类中添加其他字段。
        //如果你不在 render() 中使用某些东西，它就不应该在状态中。
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    //同样，每当Clock生成的这个DOM被移除的时候，我们也会想要清除定时器，这在React中被称为卸载。
    componentWillUnmount() {
        clearInterval(this.timerID);//将在 componentWillUnmount()生命周期钩子中卸载计时器：
    }

    //我们实现了每秒钟执行的 tick() 方法。
    //在其中，Clock 组件通过使用包含当前时间的对象调用 setState() 来调度UI更新。 通过调用 setState() ，React 知道状态已经改变，并再次调用 render() 方法来确定屏幕上应当显示什么。
    //注意：构造函数是唯一能够初始化 this.state 的地方。状态更新可能是异步的，因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。
    //我们可以使用setState() 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数：
    //this.setState((prevState, props) => ({counter: prevState.counter + props.increment}));
    tick() {
        this.setState({
            date: new Date()
        });
    }

    //父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。例如这里的FormattedDate子组件，我们并不关心他是函数还是类，有无状态等。
    //FormattedDate 组件将在其属性中接收到 date 值，并且不知道它是来自 Clock 状态、还是来自 Clock 的属性、亦或手工输入：
    //这通常被称为自顶向下或单向数据流。 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                <FormattedDate date={this.state.date} />
            </div>
        );
    }
}

//当 < Clock /> 被传递给 ReactDOM.render() 时，React 调用 Clock 组件的构造函数。 由于 Clock 需要显示当前时间，所以使用包含当前时间的对象来初始化 this.state 。 我们稍后会更新此状态。
//React 然后调用 Clock 组件的 render() 方法。这是 React 了解屏幕上应该显示什么内容，然后 React 更新 DOM 以匹配 Clock 的渲染输出。
//当 Clock 的输出插入到 DOM 中时，React 调用 componentDidMount() 生命周期钩子。 在其中，Clock 组件要求浏览器设置一个定时器，每秒钟调用一次 tick() 。
//浏览器每秒钟调用 tick() 方法。 在其中，Clock 组件通过使用包含当前时间的对象调用 setState() 来调度UI更新。 通过调用 setState() ，React 知道状态已经改变，并再次调用 render() 方法来确定屏幕上应当显示什么。
//这一次，render() 方法中的 this.state.date 将不同，所以渲染输出将包含更新的时间，并相应地更新DOM。
//一旦Clock组件被从DOM中移除，React会调用componentWillUnmount()这个钩子函数，定时器也就会被清除。
//ReactDOM.render(
//    <ClockComp />,
//    document.getElementById('root')
//);










//下面来看下事件
function ActionLink() {
    function handleClick(e) {
        e.preventDefault();//在这里，e 是一个合成事件。React 根据 W3C spec 来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。查看 SyntheticEvent 参考指南来了解更多。
        console.log('The link was clicked.');
    }

    return (
        <a href="#" onClick={handleClick}>
            Click me
    </a>
    );
}
//使用 React 的时候通常你不需要使用 addEventListener 为一个已创建的 DOM 元素添加监听器。你仅仅需要在这个元素初始渲染的时候提供一个监听器。
//当你使用 ES6 class 语法来定义一个组件的时候，事件处理器会成为类的一个方法。例如，下面的 Toggle 组件渲染一个让用户切换开关状态的按钮：
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };
        // This binding is necessary to make `this` work in the callback
        //类的方法默认是不会绑定 this 的。如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。
        //这并不是 React 的特殊行为；它是函数如何在 JavaScript 中运行的一部分。通常情况下，如果你没有在方法后面添加 () ，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。
        //当没有绑定时候在handleclick中，this.setState会报错 TypeError: Cannot read property 'setState' of undefined
        //如果不适用这个绑定方式，可以使用箭头函数，如下面的额loggingbutton组件
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

//使用这个语法有个问题就是每次 LoggingButton 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。
//然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。
class LoggingButton extends React.Component {
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
}

//属性初始化器语法
class LoggingButtonComp extends React.Component {
    // This syntax ensures `this` is bound within handleClick.
    // Warning: this is *experimental* syntax.
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
}

//向事件处理程序传递参数
//上面两个例子中，参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。
//<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>  
//<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
class Popper extends React.Component{
    constructor(){
        super();
        this.state = { name: 'Hello world!' };
    }

    //值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面，例如:
    preventPop(name, e){    //事件对象e要放在最后
        e.preventDefault();
        alert(name);
    }

    render(){
        return (
            <div>
                <p>hello</p>
                {/* Pass params via bind() method. */}
                <a href="https://reactjs.org" onClick={this.preventPop.bind(this, this.state.name)}>Click</a>
            </div>
        );
    }
}











//下面来看一下条件渲染
function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
    </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
    </button>
    );
}
class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: false };
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}

function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
        </div>
    );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
//在下面的例子中，<WarningBanner /> 根据属性 warn 的值条件渲染。如果 warn 的值是 false，则组件不会渲染：
function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }

    return (
        <div className="warning">
            Warning!
    </div>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showWarning: true }
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

//渲染多个组件,使用map函数
const numbers = [1, 2, 3, 4, 5];
const listItemsConst = numbers.map((number) =>
    <li>{number}</li>
);

//这里封装到一个组件中
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        //<li>{number}</li>
        //这里给li元素一个key值
        <li key={number.toString()}>
            {number}
        </li>
    );
    return (
        <ul>{listItems}</ul>
    );
}







//下面讲一下keys
//Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。
const listItems = numbers.map((number) =>
    <li key={number.toString()}>
        {number}
    </li>
);
const todos =[]
//一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的id作为元素的key:
const todoItems = todos.map((todo) =>
    <li key={todo.id}>
        {todo.text}
    </li>
);
//当元素没有确定的id时，你可以使用他的序列号索引index作为key
//如果列表可以重新排序，我们不建议使用索引来进行排序，因为这会导致渲染变得很慢。
const todoItemsWithIndex = todos.map((todo, index) =>
    // Only do this if items have no stable IDs
    <li key={index}>
        {todo.text}
    </li>
);

//元素的key只有在它和它的兄弟节点对比时才有意义。
//比方说，如果你提取出一个ListItem组件，你应该把key保存在数组中的这个 < ListItem /> 元素上，而不是放在ListItem组件中的 < li > 元素上。
function ListItem(props) {
    // 对啦！这里不需要指定key:
    return <li>{props.value}</li>;
}
function NumberListWithKey(props) {
    const numbers = props.numbers;
    //当你在map()方法的内部调用元素时，你最好随时记得为每一个元素加上一个独一无二的key。
    const listItems = numbers.map((number) =>
        // 又对啦！key应该在数组的上下文中被指定
        <ListItem key={number.toString()}
            value={number} />

    );
    return (
        <ul>
            {listItems}
        </ul>
    );
}
//JSX允许在大括号中嵌入任何表达式，所以我们可以在map()中这样使用,比较一下这个和上面的区别
function NumberListUseKuohao(props) {
    const numbers = props.numbers;
    return (
        <ul>
            {numbers.map((number) =>
                <ListItem key={number.toString()}
                    value={number} />

            )}
        </ul>
    );
}


const posts = [
    { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
    { id: 2, title: 'Installation', content: 'You can install React from npm.' }
];

function Post(props) {
    return <li>{props.key}</li>;
}
//数组元素中使用的key在其兄弟之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的键
//例如这里的content 与 sidebar
function Blog(props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    );
    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
    
    const post = posts.map((post) =>
        <Post
            key={post.id} //key会作为给React的提示，但不会传递给你的组件。如果您的组件中需要使用和key相同的值，请将其作为属性传递,可以看到在post组件中使用props.key读值是 是没有值的
            id={post.id}
            title={post.title} />
    );
    return (
        <div>
            {sidebar}
            <hr />
            {content}
            <hr />
            {post}
        </div>
    );
}









//下面看一下表单
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //使用”受控组件”, 每个状态的改变都有一个与之相关的处理函数。这样就可以直接修改或验证用户输入。例如，我们如果想限制输入全部是大写字母，我们可以将handleChange 写为如下：this.setState({value: event.target.value.toUpperCase()});
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    //由于 value 属性是在我们的表单元素上设置的，因此显示的值将始终为 React数据源上this.state.value 的值。由于每次按键都会触发 handleChange 来更新当前React的state，所展示的值也会随着不同用户的输入而更新。
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
//在大多数情况下，我们推荐使用 受控组件 来实现表单。 在受控组件中，表单数据由 React 组件处理。如果让表单数据由 DOM 处理时，替代方案为使用非受控组件。
//什么情况下使用受控组件，什么情况下使用非受控组件，这个待整理
//在 React 的生命周期中，表单元素上的 value 属性将会覆盖 DOM 中的值。使用非受控组件时，通常你希望 React 可以为其指定初始值，但不再控制后续更新。要解决这个问题，你可以指定一个 defaultValue 属性而不是 value。
//<input defaultValue = "Bob" type = "text" ref = {(input) => this.input = input} />
class NameFormUncontrolled extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.input.value);
        event.preventDefault();
    }
    //可以看到，如果我们使用非受控组件，可以 使用 ref 从 DOM 获取表单值。
    //由于非受控组件将真实数据保存在 DOM 中，因此在使用非受控组件时，更容易同时集成 React 和非 React 代码。如果你想快速而随性，这样做可以减小代码量。否则，你应该使用受控组件。
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" ref={(input) => this.input = input} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
//在React中，<input type="file" /> 始终是一个不受控制的组件，因为它的值只能由用户设置，而不是以编程方式设置。
class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        alert(
            `Selected file - ${this.fileInput.files[0].name}`
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input
                        type="file"
                        ref={input => {
                            this.fileInput = input;
                        }}

                    />

                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        );
    }
}


//下面继续讲几种受控组件
//TextArea
class EssayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Please write an essay about your favorite DOM element.'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <textarea value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
//select
class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        //请注意，Coconut选项最初由于selected属性是被选中的。在React中，并不使用之前的selected属性，而在根select标签上用value属性来表示选中项。这在受控组件中更为方便，因为你只需要在一个地方来更新组件。例如：
        this.state = { value: 'coconut' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your favorite La Croix flavor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
//当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么。
class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        //由于 setState() 自动将部分状态合并到当前状态，因此我们只需要使用发生变化的部分调用它。
        this.setState({
            [name]: value
            //注意我们如何使用ES6当中的计算属性名语法来更新与给定输入名称相对应的状态键：相当于如下ES5语法
            //var partialState = {};
            //partialState[name] = value;
            //this.setState(partialState);
        });
    }

    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        );
    }
}

//使用 react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。我们来看一下具体如何操作吧。
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>水会烧开</p>;
    }
    return <p>水不会烧开</p>;
}
class CalculatorSimple extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { temperature: '' };
    }

    handleChange(e) {
        this.setState({ temperature: e.target.value });
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>输入一个摄氏温度</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange} />

                <BoilingVerdict
                    celsius={parseFloat(temperature)} />

            </fieldset>
        );
    }
}
//添加第二个输入框现在我们有了一个新的需求，在提供摄氏度输入的基础之上，再提供一个华氏温度输入，并且它们能保持同步.
//我们可以通过从 Calculator 组件中抽离一个 TemperatureInput 组件出来。我们也会给它添加一个值为 c 或 f 的表示温度单位的 scale 属性。
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { temperature: '' };
    }

    handleChange(e) {
        this.setState({ temperature: e.target.value });
    }

    render() {
        const temperature = this.state.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}
 class Calculator extends React.Component {
    render() {
        return (
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        );
    }
}
//我们要保持两个组件的同步，但是现在到这一步为止，两个TemperatureInput组件都是在自己的 state 中独立保存数据。
//但是，我们想要的是这两个输入能保持同步。当我们更新摄氏输入（Celsius）时，华氏度（Fahrenheit ）这个框应该能显示转换后的的温度数值，反之亦然。
//我们改一下，这里把state从子组件中移到父组件中
//在React应用中，对应任何可变数据理应只有一个单一“数据源”。通常，状态都是首先添加在需要渲染数据的组件中。
//此时，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的父组件中。你应该在应用中保持 自上而下的数据流，而不是尝试在不同组件中同步状态。
class TemperatureInputNew extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);//这里有个修改
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>在{scaleNames[scale]}:中输入温度数值</legend>
                <input value={temperature}
                    onChange={this.handleChange} />
            </fieldset>
        );
    }
}
//在React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。我们会将 TemperatureInput 组件自身保存的 state 移到 Calculator 中。
//如果 Calculator 组件拥有了提升上来共享的状态数据，那它就会成为两个温度输入组件的“数据源”。它会传递给下面温度输入组件一致的数据。\
//由于两个 TemperatureInput 温度组件的props属性都是来源于共同的父组件 Calculator，它们的数据也会保持同步。
class CalculatorNew extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = { temperature: '', scale: 'c' };
    }

    handleCelsiusChange(temperature) {
        this.setState({ scale: 'c', temperature });
    }

    handleFahrenheitChange(temperature) {
        this.setState({ scale: 'f', temperature });
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInputNew
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />

                <TemperatureInputNew
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />

                <BoilingVerdict
                    celsius={parseFloat(celsius)} />

            </div>
        );
    }
}









//ref
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建 ref 存储 textInput DOM 元素
    this.textInput = React.createRef();//当 ref 属性被用于一个自定义类组件时，ref 对象将接收该组件已挂载的实例作为它的 current 。
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：通过 "current" 取得 DOM 节点
    this.textInput.current.focus();//直接调用子组件（元素）的方法
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到构造器里创建的 `textInput` 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
          
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

//如果我们想要包装上面的 CustomTextInput ，来模拟挂载之后立即被点击的话，我们可以使用 ref 来访问自定义输入，并手动调用它的 focusTexInput 方法：父组件调用子组件通过ref
class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount() {
        this.textInput.current.focusTextInput();//这里相当于直接调用子组件的方法
    }

    render() {
        return (
            <CustomTextInput ref={this.textInput} />
        );
    }
}






//下面是一个小demo
/*
FilterableProductTable
    SearchBar
    ProductTable
        ProductCategoryRow
        ProductRow
*/
class ProductCategoryRow extends React.Component {
    render() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
}

class ProductRow extends React.Component {
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{ color: 'red' }}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        console.log(this.props.inStockOnly)
        this.props.products.forEach((product) => {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    handleInStockInputChange(e) {
        this.props.onInStockInput(e.target.checked);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockInputChange}
                    />
                    {' '}
                    Only show products in stock
        </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleInStockInput = this.handleInStockInput.bind(this);
    }

    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockInput(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextInput={this.handleFilterTextInput}
                    onInStockInput={this.handleInStockInput}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}







//你可以放心地在 JSX 当中使用用户输入： React DOM 在渲染之前默认会 过滤 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击。
//const title = response.potentiallyMaliciousInput; 
// 直接使用是安全的：
//const element = <h1>{title}</h1>;



//要将React元素element渲染到根DOM节点中，我们通过把它们都传递给 ReactDOM.render() 的方法来将其渲染到页面上：
ReactDOM.render(
    element,
    document.getElementById('root')
);

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);




ReactDOM.render(
    element4,
    document.getElementById('root')
);
//我们对 < Welcome name = "Sara" /> 元素调用了ReactDOM.render()方法。
//React将{ name: 'Sara' } 作为props传入并调用Welcome组件。
//Welcome组件将 < h1 > Hello, Sara</h1 > 元素作为结果返回。
//React DOM将DOM更新为 < h1 > Hello, Sara</h1 >。


ReactDOM.render(
    <AppFunc />,
    document.getElementById('root')
);


const comment = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
        name: 'Hello Kitty',
        avatarUrl: 'http://placekitten.com/g/64/64'
    }
};

ReactDOM.render(
    <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author} />,
    document.getElementById('root')
);

//从 < Clock /> 元素移除 date 属性：
ReactDOM.render(
    <ClockComp />,
    document.getElementById('root')
);

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
);

ReactDOM.render(
    // Try changing to isLoggedIn={true}:
    <Greeting isLoggedIn={false} />,
    document.getElementById('root')
);

ReactDOM.render(
    <LoginControl />,
    document.getElementById('root')
);


ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
);

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);


ReactDOM.render(
    <ul>{listItemsConst}</ul>,
    document.getElementById('root')
);

ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);

ReactDOM.render(
    <NumberListWithKey numbers={numbers} />,
    document.getElementById('root')
);

ReactDOM.render(
    <Blog posts={posts} />,
    document.getElementById('root')
);

ReactDOM.render(
    <NameForm />,
    document.getElementById('root')
);
ReactDOM.render(
    <Reservation />,
    document.getElementById('root')
);
ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);
ReactDOM.render(
    <CalculatorNew />,
    document.getElementById('root')
);

var PRODUCTS = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];
ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root')
);
registerServiceWorker();
