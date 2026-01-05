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
1. 作为子组件的形参，写在子组件的形参<br/>
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
## 
