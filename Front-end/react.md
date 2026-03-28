# 描述UI
## 使用JSX书写标签语言
1. 组件要首字母大写，html标签首字母小写<br/>
2. return的语句必须是一个闭合标签<br/>

```jsx
function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>了不起的科学家</h1>
      <Profile />
    </section>
  );
}

```
3. JSX的{{}}代表{}里面放了一个对象<br/>
4. 在 JSX 里，属性值写法一：字符串字面量，用引号 " 包裹；写法二：JavaScript 表达式，用花括号 {} 包裹<br/>
任何不是纯字符串的东西（数字、布尔值、数组、对象、函数调用、变量、条件表达式等），都属于 JavaScript 表达式，必须用 {}。
```jsx
//使用驼峰命名法编写<ul style="background-color: black">
<ul style={{ backgroundColor: 'black' }}>
```

## 组件的导入与导出
### 默认导入导出
1. 导出：export default function Button() {}<br/>
2. 导入：import Button from './Button.js'<br/>
3. 导入的名字可以自定义<br/>

### 具名导入导出
1. 导出：export function Button() {}<br/>
2. 导入：import { Button } from './Button.js'<br/>
3. 导入和导出的名字必须一致<br/>

## Props
1. 作为子组件的形参<br/>
2. 当其他组件调用组件时，传入参数
```js
//utils.js
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```
```js
//Avatar.js
import { getImageUrl } from './utils.js';
//解构props
export default function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      //调用子组件的返回值
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
```
```js
//App.js
import Avatar from './Avatar.js';
//形参是组件的组件，也可以是props,然后通过props.children调用
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    //App.js调用Card子组件，组件形参是Avatar组件
    <Card>
    //card调用Avatar组件，组件形参是一些参数
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```
3. 需要组件为双标签，标签夹的是其他组件，可以在定义组件时传入{children}
```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <div className="card-content">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <div>
      <Card title="Photo">
        <img
          className="avatar"
          src="https://i.imgur.com/OKS67lhm.jpg"
          alt="Aklilu Lemma"
          width={100}
          height={100}
        />
      </Card>
      <Card title="About">
        <p>Aklilu Lemma was a distinguished Ethiopian scientist who discovered a natural treatment to schistosomiasis.</p>
      </Card>
    </div>
  );
}
```
## 条件渲染
- 与运算符（&&）
  - isPacked为true就渲染后面的
```jsx
return (
  <li className="item">
    {name} {isPacked && '✅'}
  </li>
);
```
## 列表渲染
- 数组就用map等方法进行遍历
- map里面的回调函数的函数体最外层写key
- 什么时候用{} ？ 属性赋值；双标签内；单开表达式
```jsx
export const recipes = [
  {
    id: 'greek-salad',
    name: '希腊沙拉',
    ingredients: ['西红柿', '黄瓜', '洋葱', '油橄榄', '羊奶酪'],
  },
  {
    id: 'hawaiian-pizza',
    name: '夏威夷披萨',
    ingredients: ['披萨饼皮', '披萨酱', '马苏里拉奶酪', '火腿', '菠萝'],
  },
  {
    id: 'hummus',
    name: '鹰嘴豆泥',
    ingredients: ['鹰嘴豆', '橄榄油', '蒜瓣', '柠檬', '芝麻酱'],
  },
];
export default function RecipeList() {
  return (
    <div>
      <h1>菜谱</h1>
      // 单开表达式用{}
      {recipes.map(recipe =>
      //最外层div写key
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>
          <ul>
            {recipe.ingredients.map(ingredient =>
            //最外层li写key
              <li key={ingredient}>
                {ingredient}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

//将里面做成组件
import { recipes } from './data.js';
function Recipe({ id, name, ingredients }) {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {ingredients.map(ingredient =>
          <li key={ingredient}>
            {ingredient}
          </li>
        )}
      </ul>
    </div>
  );
}

export default function RecipeList() {
  return (
    <div>
      <h1>菜谱</h1>
      {recipes.map(recipe =>
        <Recipe {...recipe} key={recipe.id} />
      )}
    </div>
  );
}

```

# 添加交互
## 响应事件
- 可以将函数名作为props传入组件调用函数
```jsx
export default function Button() {
  function handleClick() {
    alert('你点击了我！');
  }

  return (
    //写handleClick（）会在渲染时立即执行
    <button onClick={handleClick}>
      点我
    </button>
  );
}
```
- 直接写箭头函数
```jsx
<button onClick={() => {
  alert('你点击了我！');
}}>
```
- 阻止事件传播e.stopPropagation();
```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('你点击了 toolbar ！');
    }}>
      <Button onClick={() => alert('正在播放！')}>
        播放电影
      </Button>
      <Button onClick={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}

```
- 阻止默认行为
```jsx
export default function Signup() {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      alert('提交表单！');
    }}>
      <input />
      <button>发送</button>
    </form>
  );
}
```
## state
- State 变量 用于保存上次渲染的数据。<br/>
- State setter 函数更新变量并触发 React 再次渲染组件,在return的jsx中调用<br/>
- set函数行为是根据这次渲染的值准备下次渲染的值，不是直接赋值<br/>
- state 完全私有于声明它的组件，并且同一组件隔离不影响<br/>
- Hook 只能在组件函数的顶层调用.
```jsx
const [index,setIndex] = useState(0); //设置index初始值为0

<button onClick={() => {
  //这次渲染的值为0，准备下次渲染的值为1
  setNumber(number + 1);
  //这次渲染的值为0，准备下次渲染的值为1
  setNumber(number + 1);
  //这次渲染的值为0，准备下次渲染的值为1
  setNumber(number + 1);
}}>+3</button>


//一个 state 变量的值永远不会在一次渲染的内部发生变化
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        //触发渲染 number为 0 + 5
        setNumber(number + 5);
        setTimeout(() => {
          //一个 state 变量的值永远不会在一次渲染的内部发生变化，number还是0
          alert(number);   // 0
        }, 3000);
      }}>+5</button>
    </>
  )
}


//虽然number不会发生变化，但可以通过更新函数让react统一处理
export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        //发现是更新函数，加入队列
        setNumber(n => n + 1);
        //发现是更新函数，加入队列
        setNumber(n => n + 1);
        //发现是更新函数，加入队列
        setNumber(n => n + 1);
        //渲染时，第二个函数的n直接获得第一个函数的返回值，number不参与
        // 0 -> 3
      }}>+3</button>   
    </>
  )
}

//例一 
<button onClick={() => {
  //React 将 “替换为 5” 添加到其队列中。
  setNumber(number + 5);
  //下一次渲染期间，获取上一个函数返回值进行计算
  setNumber(n => n + 1);     //0 -> 6
}}>

//例二
<button onClick={() => {
  //准备给number赋值为1
  setNumber(n => n + 1); 
  //获取快照number0，准备给number赋值为5
  setNumber(number + 5);    //0 -> 5
}}>

```
- set函数更新算法
```jsx
/**
 * 非函数式：获取number快照给number赋值
 * 函数式：获取队列中上一个的值给number赋值
 **/

//两个参数：baseState 是初始状态（例如：0），queue 是一个既包含数字（例如：5）也包含更新函数（例如：n => n + 1）的数组
//初始 state：0
//队列：[5, n => n+1]
export function getFinalState(baseState, queue) {
  let finalState = baseState;

  for (let update of queue) {
    if (typeof update === 'function') {
      // 调用更新函数
      finalState = update(finalState);
    } else {
      // 替换下一个 state
      finalState = update;
    }
  }

  return finalState;
}

```
## 渲染与提交
- 初渲染
```jsx
import { createRoot } from 'react-dom/client';
//获取根节点
const root = createRoot(document.getElementById('root'))
//触发渲染
root.render(<Image />);
//自动执行commit阶段  
/*
初次渲染（mount）：通常会创建整棵 DOM 子树，并在 commit 阶段使用 appendChild/insertBefore 把它们挂到容器（#root）上。
后续更新（update）：不会整棵重建，而是根据 diff 只做必要的 DOM 操作（属性更新、节点插入/删除/移动），仍旧在 commit 阶段完成。
*/
```
## 更新state中的对象
- 改变对象中的值，但对象的地址不会发生改变，从而不会触发React重新渲染，所以要传新的对象
```jsx
//使用...展开运算符赋值
  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

//...是浅拷贝，拷贝不了嵌套对象，要在嵌套的对象中也使用...
setPerson({
  ...person, // 复制其它字段的数据 
  artwork: { // 替换 artwork 字段 
    ...person.artwork, // 复制之前 person.artwork 中的数据
    city: 'New Delhi' // 但是将 city 的值替换为 New Delhi！
  }
});

//嵌套对象应看作多个对象，然后通过地址指向
let obj = {
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
};
//实际上
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj2 = {
  name: 'Niki de Saint Phalle',
  artwork: obj1
};
```

- 动态赋值 []
```jsx
//使用[]动态赋值
import { useState } from 'react';

export default function Form() {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });
  //非动态赋值要写三个handleChange，对应修改三个不同的对象属性值
  function handleChange(e) {
    setPerson({
      ...person,
      //动态赋值
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          //修改firstName
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          //修改lastName
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          name="email"
          value={person.email}
          //修改email
          onChange={handleChange}
        />
      </label>
      <p>
        {person.firstName}{' '}
        {person.lastName}{' '}
        ({person.email})
      </p>
    </>
  );
}
```
- 使用 Immer修改嵌套对象的值
   - 运行 npm install use-immer 添加 Immer 依赖
   - 用 import { useImmer } from 'use-immer' 替换掉 import { useState } from 'react' 
- 由 Immer 提供的 draft 是一种特殊类型的对象，被称为 Proxy，它会记录你用它所进行的操作。这就是你能够随心所欲地直接修改对象的原因所在！从原理上说，Immer 会弄清楚 draft 对象的哪些部分被改变了，并会依照你的修改创建出一个全新的对象
```jsx
//参数必须是draft,draft是原对象的代理，只需修改对应的属性值，immer会创建一个新的对象
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```
## 更新state中的数组
- 推荐使用能返回新数组的数组方法，避免使用会改变原始数组的方法
```jsx
//添加元素concat，[...arr]
setArtists( // 使用set函数改变值，不直接替换 state
//传入一个新数组
  [ 
    ...artists, // 新数组包含原数组的所有元素
    { id: nextId++, name: name } // 并在末尾添加了一个新的元素
  ]
);

//删除元素filter，slice
setArtists(
  artists.filter(a => a.id !== artist.id)
);

//替换元素map
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // 递增被点击的计数器数值
        return c + 1;
      } else {
        // 其余部分不发生变化
        return c;
      }
    })

//插入元素（将原数组分片再前后展开，中间放要插入的元素）
    const insertAt = 1; // 可能是任何索引
    const nextArtists = [
      // 插入点之前的元素：
      ...artists.slice(0, insertAt),
      // 新的元素：
      { id: nextId++, name: name },
      // 插入点之后的元素：
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);

//排序 reverse，sort改变的原数组 可以先copy一个新数组
  function handleClick() {
    //copy一个新数组
    const nextList = [...list];
    //对新数组反转
    nextList.reverse();
    //传新数组
    setList(nextList);
  }
```
- 数组用...也是浅拷贝，数组元素如果是对象，对象的地址也会被拷贝过来，从而是同一个地址
```jsx
//问题：
//修改了state值
  function handleToggleMyList(artworkId, nextSeen) {
    //copy数组
    const myNextList = [...myList];
    //找到目标对象
    const artwork = myNextList.find(
      a => a.id === artworkId
    );
    //直接修改数组对象的值
    artwork.seen = nextSeen;
    setMyList(myNextList);
  }

//解决：
//map遍历修改数组中每个对象，返回新的对象
  function handleToggleMyList(artworkId, nextSeen) {
    setMyList(myList.map(artwork => {
      if (artwork.id === artworkId) {
        // 创建包含变更的*新*对象
        return { ...artwork, seen: nextSeen };
      } else {
        // 没有变更
        return artwork;
      }
    }));
  }

//用immer:

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }
```
# 状态管理
## 用state响应输入
- 用state给几种状态情形取名字，然后通过改state改名字切换情形
```jsx
//例题1：用状态控制显示不同的css样式
//第一种状态：外部'background' 图片 'picture picture--active'
//第二种状态：外部'background background--active' 图片 'picture'
import { useState } from 'react';

export default function Picture() {
  //用isActive表示两种状态
  const [isActive, setIsActive] = useState(false);

  let backgroundClassName = 'background';
  let pictureClassName = 'picture';
  //描述不同的状态，通过isActive控制
  if (isActive) {
    pictureClassName += ' picture--active';
  } else {
    backgroundClassName += ' background--active';
  }

  return (
    <div
      className={backgroundClassName}
      //改变isActive从而改变状态
      onClick={() => setIsActive(false)}
    >
      <img
        onClick={e => {
          //阻止冒泡触发div的onClick
          e.stopPropagation();
          setIsActive(true);
        }}
        className={pictureClassName}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
  );
}

```
## 选择State结构
- state在组件内部被传值只有初始化时有用
```jsx
import { useState } from 'react';
export default function Clock(props) {
  //多次传值不会更新color, state 仅在第一次渲染期间初始化
  const [color, setColor] = useState(props.color);
  //正确做法：直接用变量接收即可
  const color = props.color
  return (
    <h1 style={{ color: color }}>
      {props.time}
    </h1>
  );
}

```

- 去掉冗余的State,比如可由其他State派生出的变量
```jsx
//三个State
let nextId = 3;
const initialItems = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
];

export default function TravelPlan() {
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(3);
  const [packed, setPacked] = useState(1);
}

//total,packed可由initialItems派生
let nextId = 3;
const initialItems = [
  { id: 0, title: 'Warm socks', packed: true },
  { id: 1, title: 'Travel journal', packed: false },
  { id: 2, title: 'Watercolors', packed: false },
];

export default function TravelPlan() {
  const [items, setItems] = useState(initialItems);

  const total = items.length;
  const packed = items
    .filter(item => item.packed)
    .length;
}
```
数组方法
```java
const arr = [ {id: 1}, {id: 2}, {id: 2} ];

// filter：返回“所有匹配项”的数组
const a = arr.filter(x => x.id === 2); // => [ {id:2}, {id:2} ]（数组）
a.length;       // 2
Array.isArray(a); // true

// find：返回“第一个匹配项”的对象
const b = arr.find(x => x.id === 2);   // => {id:2}（对象）
```
- 尽量不要用对象作比较，因为触发渲染后前后对象不一样
- 例子：https://zh-hans.react.dev/learn/choosing-the-state-structure#challenges 挑战三

## 在组件间共享状态
- 将子组件的状态提升到父组件，状态改变函数等全写在父组件，子组件只需接受参数即可

## 对state进行保留和重置
- UI树相同位置的相同组件会将state保留下来
- 如何在相同位的相同组件重置 state
```jsx
//组件在相同位置
export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter person="Taylor" />
      ) : (
        <Counter person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        下一位玩家！
      </button>
    </div>
  );
}


//方法一：将组件渲染在不同的位置 
export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        下一位玩家！
      </button>
    </div>
  );
}


//方法二：使用 key 来重置 state
export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        下一位玩家！
      </button>
    </div>
  );
}
//指定 key 之后，如果组件没有被卸载，并且渲染出来的组件类型和 key 保持一致，React 会复用该组件实例，从而保留 state
```
- 相同位置不同组件会重置，比如div变成section包裹，内部组件会重置
- 组件定义不能嵌套，外部组件更新会导致内部组件不是同一个组件，不会保留state

## 迁移状态逻辑至 Reducer 中
- 对于一个state不同的更新行为，可以统一整合到Reducer中
```jsx
export default function TaskApp() {
 //1.引入钩子
 //1.1 tasks : 相当于state，当前的状态
 //1.2 initialTasks ： 相当于给state赋初值
 //1.3 dispatch函数 ：接收action对象（存放状态变更信息，type用于区分），里面调用set函数和Reducer函数，返回下一个值
 //1.4 tasksReducer：统一处理修改tasks值,修改后的值从dispatch传来，返回下一个值
 const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

//2. 写包含dispatch的函数
  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        //3.调用含dispatch的函数，dispatch调用tasksReducer传action对象和tasks
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
//4.通过switch来决定对tasks实现哪种修改
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: '参观卡夫卡博物馆', done: true},
  {id: 1, text: '看木偶戏', done: false},
  {id: 2, text: '打卡列侬墙', done: false}
];

```
- 用immer进行简化，即不要求tasksReducer中返回的是一个新对象
```jsx
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

```
- 修改state的结构，只需再reducer中修改赋值结构
```jsx
//App.js
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import { initialState, messengerReducer } from './messengerReducer';

export default function Messenger() {
  const [state, dispatch] = useReducer(messengerReducer, initialState);
  //对于对象，当属性名固定时 用.
  //对于对象，当属性名是表达式时 用[]
  const message = state.messages[state.selectedId];
  //找到contacts中与state中selectedId相同的contact
  const contact = contacts.find((c) => c.id === state.selectedId);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedId={state.selectedId}
        dispatch={dispatch}
      />
      <Chat
        key={contact.id}
        message={message}
        contact={contact}
        dispatch={dispatch}
      />
    </div>
  );
}

const contacts = [
  {id: 0, name: 'Taylor', email: 'taylor@mail.com'},
  {id: 1, name: 'Alice', email: 'alice@mail.com'},
  {id: 2, name: 'Bob', email: 'bob@mail.com'},
];
```
```jsx
//messagerReducer.js
export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello, Taylor',
    1: 'Hello, Alice',
    2: 'Hello, Bob',
  },
};

export function messengerReducer(state, action) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      };
    }
    case 'edited_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      };
    }
    case 'sent_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '',
        },
      };
    }
    default: {
      throw Error('未知 action：' + action.type);
    }
  }
}

```
```jsx
//ContactList.js
export default function ContactList({contacts, selectedId, dispatch}) {
  return (
    <section className="contact-list">
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <button
              onClick={() => {
                dispatch({
                  type: 'changed_selection',
                  contactId: contact.id,
                });
              }}>
              {selectedId === contact.id ? <b>{contact.name}</b> : contact.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```
```jsx
//Chat.js
import { useState } from 'react';

export default function Chat({contact, message, dispatch}) {
  return (
    <section className="chat">
      <textarea
        value={message}
        placeholder={'和 ' + contact.name + ' 聊天'}
        onChange={(e) => {
          dispatch({
            type: 'edited_message',
            message: e.target.value,
          });
        }}
      />
      <br />
      <button
        onClick={() => {
          alert(`正在发送 "${message}" 到 ${contact.email}`);
          dispatch({
            type: 'sent_message',
          });
        }}>
        发送到 {contact.email}
      </button>
    </section>
  );
}
```
### useReducer实现
```jsx
import { useState } from 'react';

//传入reducer函数和初始值，返回目前的状态和dispatch函数
export function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

//dispatch函数：接收action对象（存将变值），返回下一个状态
function dispatch(action) {
  //通过setState变化值
  //setState中，reducer函数接受目前的状态和action(存变化数据)，返回下一个状态
  setState((s) => reducer(s, action));
}
  return [state, dispatch];
}

```
## 使用Context深层传递参数
- 创建context，相当于创一个context标签并导出createContext()
```jsx
import { createContext } from 'react';
export const LevelContext = createContext(1);
```
- 子组件引入并创建参数useContext()
```jsx
import { LevelContext } from './LevelContext.js';
export default function Heading({ children }) {
  //子组件的level值会找上层最近父组件的LevelContext标签的value，如果没有，用createContext(1)的默认值1
  const level = useContext(LevelContext);
   switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    default:
      throw Error('未知的 level：' + level);
  }
}
```
- 父组件用LevelContext将子组件包裹
```jsx
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
    // 需要调用section的父组件传值 或者 在该组件加上 const level = useContext(LevelContext)获取默认值
  return (
    <section className="section">
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </section>
  );
}

```
- app.js调用section
```jsx
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>主标题</Heading>
      <Section level={2}>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Heading>副标题</Heading>
        <Section level={3}>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Heading>子标题</Heading>
          <Section level={4}>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
            <Heading>子子标题</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

```
### 总结
context能代替props的参数传递，深层可用hook找到外层的值

## 使用 Reducer 和 Context 拓展你的应用
https://zh-hans.react.dev/learn/scaling-up-with-reducer-and-context#recap

# 脱围机制
## 使用 ref 引用值
- 当希望组件“记住”某些信息，但又不想让这些信息 触发新的渲染 时，可以使用 ref 

```jsx
//1.引用ref
import { useRef } from 'react';
//react在首次渲染时会创建一个对象，并且修改是通过ref.current也不会影响到对象本身的地址
const ref = useRef(0);

//useRef()会返回对象，ref本质是一个对象
{ 
  current: 0 // 向 useRef 传入的值
}

//访问或修改值
ref.current
```

### 注意
- let无法做到跨渲染保留，只用于本次渲染过程的临时变量<br/>
- ref用于跨渲染保留以及修改它不需要触发 UI 更新<br/>
- state用于值变化需要反映到 UI 上

## 使用 ref 操作 DOM
- 给 标签属性ref 传递定义的ref，该标签的dom就能通过ref.current进行获取
```jsx
import { useRef } from 'react';

export default function Form() {
  //定义组件inputRef
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }
  return (
    <>
      <input ref={inputRef} />  //获取到input的dom
      <button onClick={handleClick}>
        聚焦输入框
      </button>
    </>
  );
}
```
- Hook 只能在组件的顶层被调用，即不受任何条件、循环、嵌套函数影响的那一层。如果Hook 可能不执行，或者执行顺序可能改变，就不是在顶层<br/>

- ref回调 
```jsx
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef(null);
  const [catList, setCatList] = useState(setupCatList);
  //传入map的key即cat对象，获取到map的value即dom元素
  function scrollToCat(cat) {
    //获取持久存在的map
    const map = getMap();
    //通过map对应关系得到dom元素
    const node = map.get(cat);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // 首次运行时初始化 Map。
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Neo</button>
        <button onClick={() => scrollToCat(catList[5])}>Millie</button>
        <button onClick={() => scrollToCat(catList[8])}>Bella</button>
      </nav>
      <div>
        <ul>
          //为列表中的每一项都绑定 ref
          {catList.map((cat) => (
            <li
              key={cat.id}
              ref={(node) => {
                //获取持久性map
                const map = getMap();
                //map中存储cat和对应dom的键值对
                map.set(cat, node);
                //如果渲染前后dom树前后diff不一样，执行删除map中的键值对，不会让 Map 一直持有旧对象/旧 DOM 引用
                return () => {
                  map.delete(cat);
                };
              }}
            >
              <img src={cat.imageUrl} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
//初始化catlist
function setupCatList() {
  const catCount = 10;
  const catList = new Array(catCount)
  for (let i = 0; i < catCount; i++) {
    let imageUrl = '';
    if (i < 5) {
      imageUrl = "https://placecats.com/neo/320/240";
    } else if (i < 8) {
      imageUrl = "https://placecats.com/millie/320/240";
    } else {
      imageUrl = "https://placecats.com/bella/320/240";
    }
    catList[i] = {
      id: i,
      imageUrl,
    };
  }
  return catList;
}

```
- 使用命令句柄暴露一部分 API 
```jsx
import { useRef, useImperativeHandle } from "react";
//子组件
function MyInput({ ref }) {
  //存子组件dom
  const realInputRef = useRef(null);
  //父组件传来的ref只能得到子组件useImperativeHandle中暴露的方法
  useImperativeHandle(ref, () => ({
    // 只暴露 focus，没有别的
    focus() {
      realInputRef.current.focus();
    },
  }));
  //
  return <input ref={realInputRef} />;
};
//父组件
export default function Form() {
  //父组件的子组件dom形参
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <MyInput ref={inputRef} />
      <button onClick={handleClick}>聚焦输入框</button>
    </>
  );
}
```
- 使分开的组件中的搜索域获得焦点 
```jsx
import SearchButton from './SearchButton.js';
import SearchInput from './SearchInput.js';
import {useRef} from 'react'
export default function Page() {
  //定义公共ref
  const appRef = useRef(null)
  return (
    <>
      <nav>
        <SearchButton onClick = {()=> appRef.current.focus()}/>
      </nav>
      <SearchInput ref={appRef}/>
    </>
  );
}

```
- 因为state是一起更新完再去对真实dom做修改，用 flushSync 可以立即同步更新 state
```jsx
import { flushSync } from 'react-dom';
flushSync(() => {
  setTodos([ ...todos, newTodo]);
});
//滚动
//ref.current.lastChild.scrollIntoView()
```

## 使用Effect进行同步
- React 总是在执行下一轮渲染的 Effect 之前清理上一轮渲染的 Effect
```jsx
useEffect(() => {
  // 这里的代码会在每次渲染后运行
});

useEffect(() => {
  // 这里的代码只会在组件挂载（首次出现）时运行
}, []);

useEffect(() => {
  // 这里的代码不但会在组件挂载时运行，而且当 a 或 b 的值自上次渲染后发生变化后也会运行
}, [a, b]);


```
- 记得要释放资源，如关闭连接等
```jsx
//定时器
//effect返回函数才执行clean，不能直接返回函数里的执行结果
useEffect(() => {
  return clearInterval(intervalId) //错误
  return () => clearInterval(intervalId); //正确
});

//异步请求
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';
export default function Page() {
  const [person, setPerson] = useState('Alice');
  const [bio, setBio] = useState(null);
  useEffect(() => {
    //ignore标志位
    let ignore = false;
    setBio(null);
    fetchBio(person).then(result => {
      if (!ignore) {
        setBio(result);
      }
    });
  //在异步请求来之前就把不要的清理掉，设置ignore为true，这样不会之前的不会执行setBio进行展示
    return () => {
      ignore = true;
    }
  }, [person]);

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alice">Alice</option>
        <option value="Bob">Bob</option>
        <option value="Taylor">Taylor</option>
      </select>
      <hr />
      <p><i>{bio ?? '加载中……'}</i></p>
    </>
  );
}

```
## 你可能不需要Effect
- 如果一个值可以基于现有的 props 或 state 计算得出，不要把它作为一个 state，而是在渲染期间直接计算这个值
```jsx
//错误
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');

  // 🔴 避免：多余的 state 和不必要的 Effect
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);

}

//正确
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ 非常好：在渲染期间进行计算
  const fullName = firstName + ' ' + lastName;
  // ...
}
```

- 缓存昂贵的计算
```jsx
import { useMemo, useState } from 'react';

function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  //将getFilteredTodos(todos, filter)复杂的计算结果缓存到visibleTodos
  const visibleTodos = useMemo(() => {
    // ✅ 除非 todos 或 filter 发生变化，否则不会重新执行
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);
  // ...
}
```
- 每次应用加载时执行一次，而不是在 每次组件挂载时执行一次
```jsx
//法一
let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ 只在每次应用加载时执行一次
      loadDataFromLocalStorage();
      checkAuthToken();
    }
  }, []);
  // ...
}

//法二
if (typeof window !== 'undefined') { // 检测我们是否在浏览器环境
   // ✅ 只在每次应用加载时执行一次
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}
```
- 订阅外部store：useSyncExternalStore
https://zh-hans.react.dev/reference/react/useSyncExternalStore

- 建立父子组件并加key实现切换重新渲染代替effect
```jsx
import { useState, useEffect } from 'react';

export default function EditContact({ savedContact, onSave }) {
  const [name, setName] = useState(savedContact.name);
  const [email, setEmail] = useState(savedContact.email);

  useEffect(() => {
    setName(savedContact.name);
    setEmail(savedContact.email);
  }, [savedContact]);

//将上面改写成两个组件
export default function EditContact(props) {
  return (
    <EditForm
      {...props}
      key={props.savedContact.id}
    />
  );
}

function EditForm({ savedContact, onSave }) {
  const [name, setName] = useState(savedContact.name);
  const [email, setEmail] = useState(savedContact.email);

//--------------------------------------------------
  return (
    <section>
      <label>
        姓名：{' '}
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        邮箱：{' '}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <button onClick={() => {
        const updatedData = {
          id: savedContact.id,
          name: name,
          email: email
        };
        onSave(updatedData);
      }}>
        保存
      </button>
      <button onClick={() => {
        setName(savedContact.name);
        setEmail(savedContact.email);
      }}>
        重置
      </button>
    </section>
  );
}

```
### 例题
```jsx
//App.js
import { useState, useEffect } from 'react';
import { initialTodos, createTodo, getVisibleTodos } from './todos.js';

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [showActive, setShowActive] = useState(false);
  const [text, setText] = useState('');

  //1.用useEffect去更新肯定不对的，因为它会先做一遍旧数据的渲染再执行effect里面的内容，里面再用新数据去渲染，会多做一遍旧数据的渲染
  // useEffect(() => {
  //   setVisibleTodos(getVisibleTodos(todos, showActive));
  // }, [todos, showActive]);

  //2.问题在于text,当用户输入时，setText会进行渲染，从而导致重复计算visibleTodos，而visibleTodos只依赖于todos, showActive，所以可用Memo进行缓存
  // const visibleTodos = getVisibleTodos(todos, showActive);

 //3.用Memo进行缓存，当todos, showActive变化进行更新，text变化时导致的重新渲染不会改变visibleTodos，可用之前的缓存值
 //visibleTodos是可以靠todos, showActive计算出来的结果，当todos, showActive变化都会触发渲染，页面展示的visibleTodos也会重新渲染，所以不用再声明为一个state
const visibleTodos = useMemo(
    () => getVisibleTodos(todos, showActive),
    [todos, showActive]
  );


  function handleAddClick() {
    setText('');
    setTodos([...todos, createTodo(text)]);
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={showActive}
          onChange={e => setShowActive(e.target.checked)}
        />
        只显示未完成的事项
      </label>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>
        添加
      </button>
      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            {todo.completed ? <s>{todo.text}</s> : todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}

```
```jsx
//todo.js
let nextId = 0;
let calls = 0;

export function getVisibleTodos(todos, showActive) {
  console.log(`getVisibleTodos() 被调用了 ${++calls} 次`);
  //activeTodos 存 completed为false的
  const activeTodos = todos.filter(todo => !todo.completed);
  //true展示activeTodos ； false展示todos
  const visibleTodos = showActive ? activeTodos : todos;
  return visibleTodos;
}
//初始化数据函数，completed不传默认为false
export function createTodo(text, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}
//初始化数据
export const initialTodos = [
  createTodo('买苹果', true),
  createTodo('买橘子', true),
  createTodo('买胡萝卜'),
];

```
## 响应式 Effect 的生命周期
- 在组件保持挂载状态的同时，可能还需要 多次开始和停止同步<br/>
- CharRoom组件
   - ChatRoom 组件挂载，roomId 设置为 "general"<br/>
   - ChatRoom 组件更新，roomId 设置为 "travel"<br/>
   - ChatRoom 组件更新，roomId 设置为 "music"<br/>
   - ChatRoom 组件卸载 
- Effect操作
   - Effect 连接到了 "general" 聊天室<br/>
   - Effect 断开了与 "general" 聊天室的连接，并连接到了 "travel" 聊天室<br/>
   - Effect 断开了与 "travel" 聊天室的连接，并连接到了 "music" 聊天室<br/>
   - Effect 断开了与 "music" 聊天室的连接
```jsx
function ChatRoom({ roomId /* "general" */ }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // 连接到 "general" 聊天室
    connection.connect();
    return () => {
      connection.disconnect(); // 断开与 "general" 聊天室的连接
    };
  }, [roomId]);
}
```

- 依赖项
  - 没有变的依赖项不需要添加

## 将事件从 Effect 中分开
- 事件处理函数：除非有类似点击行为的触发，不然不会执行，属于非响应式<br/>
- Effect ：基于依赖项是否发生变化，只要发生变化就会执行，属于响应式<br/>
- 目的：将非响应式代码从Effect中分开<br/>
- 什么时候用：依赖项的变化对整体effect的功能不产生影响。比如访问页面与添加物品的参数，添加物品的参数完全可以由事件来触发
```jsx
import { useEffect, useEffectEvent } from 'react';
//useEffectEvent非响应式函数，用于在effect中使用
function ChatRoom({ roomId, theme }) {

//可通过effect调用时传参决定用最新值还是旧值
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      //这里可传  先前定义的值
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 声明所有依赖项
}
```
## 移除 Effect 依赖
- 用更新函数，移除依赖
```jsx
useEffect(() => {
    console.log('创建定时器');
    const id = setInterval(() => {
      console.log('Interval');
      //setCount(c+1)
      setCount(c => c + 1);
    }, 1000);
    return () => {
      console.log('清除定时器');
      clearInterval(id);
    };
  }, []);
```
- 不要用对象或者函数作为依赖，对象在每次渲染之后都是新的
```jsx
//静态对象放effect外面，动态对象放里面，在外面提前从函数中获取值
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

//参数为对象
export default function ChatRoom({ roomId, serverUrl }) {
  useEffect(() => {
    //Effect里必须创建一个新对象
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

  return <h1>欢迎来到 {roomId} 房间！</h1>;
}
```
- 传函数的解决方法
```jsx
//非响应式函数放在外面的effectEvent里.响应式函数传递参数，在Effect里编写该函数
import { useState, useEffect } from 'react';
import { useEffectEvent } from 'react';
import {
  createEncryptedConnection,
  createUnencryptedConnection,
} from './chat.js';

export default function ChatRoom({ roomId, isEncrypted, onMessage }) {
  //onMessage是非响应式函数，里面参数为dark,不希望dark变化引起effect中重新连接的执行，所以用useEffectEvent包裹作为非响应式函数
  const onReceiveMessage = useEffectEvent(onMessage);

  useEffect(() => {
    //createConnection是响应式函数，每次渲染要重新执行
    function createConnection() {
      const options = {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
      if (isEncrypted) {
        return createEncryptedConnection(options);
      } else {
        return createUnencryptedConnection(options);
      }
    }

    const connection = createConnection();
    connection.on('message', (msg) => onReceiveMessage(msg));
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, isEncrypted]);

  return <h1>欢迎来到 {roomId} 房间！</h1>;
}

```
## 使用自定义 Hook 复用逻辑
- 可将公共逻辑放入use开头的函数自定义hook
```jsx
function useOnlineStatus() {
  //state独立于函数，只作为功能逻辑共享，不共享状态
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}
```
- 自定义hook中可将标签属性值做成一个对象
```jsx
//useFormInput.js
import { useState } from 'react';

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  //每当输入框的值改变时，触发onChange事件,执行handleChange函数中的setValue，导致重新渲染，自定义hook也会重新渲染，接收最新的参数（接受的参数可包含事件）
  function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  };

  return inputProps;
}

//App.js
import { useFormInput } from './useFormInput.js';

export default function Form() {
  //获取对象
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');

  return (
    <>
      <label>
        First name:
        //解构对象，拿到value和onChange属性
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p><b>Good morning, {firstNameProps.value} {lastNameProps.value}.</b></p>
    </>
  );
}

```

vite,ts,react,umi
