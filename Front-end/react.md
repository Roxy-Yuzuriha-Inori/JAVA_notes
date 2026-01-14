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
- state 完全私有于声明它的组件，并且同一组件隔离不影响<br/>
- Hook 只能在组件函数的顶层调用.
```jsx
const [index,setIndex] = useState(0); //设置index初始值为0
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

