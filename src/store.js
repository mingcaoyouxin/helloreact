import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { observable, action, autorun } from 'mobx';
import { observer, inject } from 'mobx-react';

//下面看一下store
class TodoStore {
    todos = [];
    get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed === true
        ).length;
    }
    report() {
        if (this.todos.length === 0)
            return "<none>";
        return `Next todo: "${this.todos[0].task}". ` +
            `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }
    addTodo(task) {
        this.todos.push({
            task: task,
            completed: false,
            assignee: null
        });
    }
}

const todoStore = new TodoStore();
todoStore.addTodo("read MobX tutorial");
console.log(todoStore.report());//Next todo: "read MobX tutorial". Progress: 0/1

todoStore.addTodo("try MobX");
console.log(todoStore.report());//Next todo: "read MobX tutorial". Progress: 0/2

todoStore.todos[0].completed = true;
console.log(todoStore.report());//Next todo: "read MobX tutorial". Progress: 1/2

todoStore.todos[1].task = "try MobX in own project";
console.log(todoStore.report());//Next todo: "read MobX tutorial". Progress: 1/2

todoStore.todos[0].task = "grok MobX tutorial";
console.log(todoStore.report()); //Next todo: "grok MobX tutorial".Progress: 1 / 2

/*
到目前为止，这段代码没什么特殊的。但是如果我们不需要明确地调用report，而是生命我们希望它在每次状态的改变时被调用呢？这将使我们不再需要纠结在所有可能影响报告的地方调用 report。我们想要保证最新的报告被打印。但是我们不想纠结于怎么去组织它。
值得庆幸的是，这正是 MobX 可以为你做到的。自动执行完全依赖 state 的代码。因此我们的 report 函数像电子表格中的图表一样自动更新。为了实现这一目标，TodoStore 需要变成可监视的（observable）以保证 MobX 可以追踪到所有改变。让我们一起改改代码来实现它。
进一步，completedTodosCount 属性可以由 todo list 自动推导而来。我们可以使用 @observable 和 @computed 装饰器为一个对象增加 observable 属性：
 */
class ObservableTodoStore {
    @observable todos = [];//搞定啦！我们为 MobX 标记了一些 @observable 属性，这些属性的值可以随时改变。observable 的属性值在其变化的时候 mobx 会自动追踪并作出响应。
    /**
     * 看一下observer的语法  @observable  classProperty = value
     * 当 value 是一个对象类型值的时候，它会默认克隆该对象并且把其中每个属性变为可观察的值，这里默认是深拷贝，也就是说其对象的后代属性都会变成可观察的，
     * 比如 @observable classProperty = { obj: { name: 'q' } } ，当 classProperty.obj.name 改变的时候，在 MobX 中也是可以观察到并响应的；
     * 这里需要注意的是，当定义好其 observable 的对象值后，对象中后来添加的值是不会变为可观察的，这时需要使用 extendObservable 来扩展对象：
     * 在 MobX 中，对于 store 对象中可观察的属性值，在他们改变的时候则会触发观察监听的函数，这里注意两点：该属性必须是定义的可观察属性（@observable）,它的值必须发生改变（和原值是不等的）：
     * */

    @observable pendingRequests = 0;

    constructor() {
        //在构造函数中，我们创建了一个小函数来打印 report 并用 autorun 包裹它。
        //autorun 创建了一个 响应（Reaction） 并执行一次，之后这个函数中任何 observable 数据变更时，响应都会被自动执行。
        //由于 report 使用了 observable todos 属性，所以它将会在所有合适的时刻打印 report。
        mobx.autorun(() => console.log(this.report));//当触发了可观察状态属性的改变后，其变化的监听则是在传入 autorun 函数中作出响应。
        /**
         * autorun 接受一个函数作为参数，在使用 autorun 的时候，该函数会被立即调用一次，之后当该函数中依赖的可观察状态属性（或者计算属性）发生变化的时候，该函数会被调用，注意，该函数的调用取决于其传入的函数中使用了哪些可观察状态属性（或者计算属性）。
         * 这里注意autorun会执行，要有两个条件，1是其传入的函数中使用的变量值发生了改变 2该变量必须是observer的
         * 在实际使用中，autorun 中的函数就是用来操作 Reactions 的，当可观察状态属性的值发生改变的时候，可以在该函数中利用状态值来更新改变 UI 视图（记录日志、持久化），
         * 在 MobX 结合 React 的使用中，mobx-react 库则是封装了 autorun 用来在 store 中的可观察状态属性值发生改变的时候 rerender React 组件。也就是组件的render就是一个autorun
         */
    }

    /**
     * 计算属性值实际上是一类衍生值，它是根据现有的状态或者其他值计算而来，原则上在计算属性中尽可能地不对当前状态做任何修改；同时对于任何可以通过现有状态数据得到的值都应该通过计算属性获取。
     * 同时，当状态改变使得计算属性的值发生改变的时候，其也是可观察到的。
     * */ 
    @computed get completedTodosCount() { //计算值是用 @computed 标记以表示他们可以由 state 推导出来。
        return this.todos.filter(
            todo => todo.completed === true
        ).length;
    }
    //当添加了一个新的todo或者某个todo的 finished 属性发生变化时，MobX 会确保 unfinishedTodoCount 自动更新
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
    @computed get report() {
        if (this.todos.length === 0)
            return "<none>";
        return `Next todo: "${this.todos[0].task}". ` +
            `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }
    /** 
     * 在 MobX 中，其本身并不会对开发者作出任何限制去如何改变可观察对象；
     * 但是，它还是提供了一个可选的方案来组织代码与数据流，@action，其规定对于 store 对象中所有可观察状态属性的改变都应该在 @action 中完成，它使代码可以组织的更好，并且对于数据改变的时机也更加清晰。
     */
    @action addTodo(task) {
        this.todos.push({
            task: task,
            completed: false,
            assignee: null
        });
    }
}


const observableTodoStore = new ObservableTodoStore();
observableTodoStore.addTodo("read MobX tutorial"); //report 自动地打印了，这个过程是自动的且没有中间变量泄露。Next todo: "read MobX tutorial". Progress: 0/1
observableTodoStore.addTodo("try MobX");//Next todo: "read MobX tutorial". Progress: 0/2
observableTodoStore.todos[0].completed = true;//Next todo: "read MobX tutorial". Progress: 1/2
//下面这一行没有生成新的日志行。因为 report 并没有 真正地 因为重命名而改变，尽管底层数据确实变了。
observableTodoStore.todos[1].task = "try MobX in own project";
//而下面这个变更，第0个todo 的名字改变了 report，因为它的 name 被 report 使用了。这充分地说明了autorun 不只监听了 todo 数组，而且还监听了 todo 元素中的个别属性。
observableTodoStore.todos[0].task = "grok MobX tutorial";


//如果你用 React 的话，可以把你的(无状态函数)组件变成响应式组件，方法是在组件上添加 observer 函数/ 装饰器. observer由 mobx-react 包提供的。
//mobx-react 包的 @observer 装饰器通过将 React 组件的 render 方法包裹在 autorun 中解决了这一问题，它自动地保持你的组件和 state 同步。
//下面的例子定义了一些 React 组件。这些组件中只有 @observer 是属于的 MobX 的。但它足以保证所有的组件都可以在相关数据变更时独立地重新渲染。
//你不再需要调用 setState，也不必考虑如何通过配置选择器或高阶组件来订阅应用程序 state 的适当部分。可以说，所有的组件都变得智能化。不过他们是以愚蠢的声明的方式定义的。
//在 React 中使用 MobX 需要用到 mobx-react。其提供了 Provider 组件用来包裹最外层组件节点，并且传入 store（通过）context 传递给后代组件：
//使用 @inject 给组件注入其需要的 store（利用 React context 机制）；
//通过 @observer 将 React 组件转化成响应式组件，它用 mobx.autorun 包装了组件的 render 函数以确保任何组件渲染中使用的数据变化时都可以强制刷新组件：
//mobx - react 包还提供了 Provider 组件，它使用了 React 的上下文(context)机制，可以用来向下传递 stores。 要连接到这些 stores，需要传递一个 stores 名称的列表给 inject，这使得 stores 可以作为组件的 props 使用。
@observer
class TodoView extends React.Component {
    render() {
        const todo = this.props.todo;
        return (
            <li onDoubleClick={this.onRename}>
                <input
                    type='checkbox'
                    checked={todo.completed}
                    onChange={this.onToggleCompleted}
                />
                {todo.task}
                {todo.assignee
                    ? <small>{todo.assignee.name}</small>
                    : null
                }
                <RenderCounter />
            </li>
        );
    }

    onToggleCompleted = () => {
        const todo = this.props.todo;
        todo.completed = !todo.completed;
    }

    onRename = () => {
        const todo = this.props.todo;
        todo.task = prompt('Task name', todo.task) || todo.task;
    }
}

@observer
class TodoList extends React.Component {
    render() {
        const store = this.props.store;
        return (
            <div>
                {store.report}
                <ul>
                    {store.todos.map(
                        (todo, idx) => <TodoView todo={todo} key={idx} />
                    )}
                </ul>
                {store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null}
                <button onClick={this.onNewTodo}>New Todo</button>
                <small> (double-click a todo to edit)</small>
                <RenderCounter />
            </div>
        );
    }

    onNewTodo = () => {
        this.props.store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
    }
}

ReactDOM.render(
    <TodoList store={observableTodoStore} />,
    document.getElementById('reactjs-app')
);

var peopleStore = mobx.observable([
    { name: "Michel" },
    { name: "Me" }
]);
observableTodoStore.todos[0].assignee = peopleStore[0];
observableTodoStore.todos[1].assignee = peopleStore[1];
peopleStore[0].name = "Michel Weststrate";



class Store {
    @observable list = []
    @observable name = '2'
    @observable oo = {
        age: 1
    }
};
const mstore = new Store();
// 触发观察监听的函数
mstore.list.push('1');
// 或者
mstore.name = 'h';
// 或者
mstore.oo.age = 12;
// 这个情况下是不会触发观察，因为 age 属性并不可观察
mstore.age = 10;
// 这个情况下也不会触发观察，因为其值没有发生变化
mstore.oo.age = 1;