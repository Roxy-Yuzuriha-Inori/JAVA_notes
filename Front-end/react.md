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
- 因为state是一起更新完再去对真实dom做修改，用 flushSync 可以立即同步更新 state
```jsx
flushSync(() => {
  setTodos([ ...todos, newTodo]);
});
```

vite,ts,react,umi
