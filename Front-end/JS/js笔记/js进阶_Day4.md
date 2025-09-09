# JavaScript 进阶 - 第4天

## 深浅拷贝

### 浅拷贝

首先浅拷贝和深拷贝只针对引用类型

浅拷贝：拷贝的是地址

常见方法：

1. 拷贝对象：Object.assgin(目标对象，源对象) 或者 展开运算符 {...obj} 拷贝对象
2. 拷贝数组：Array.prototype.concat() 或者 [...arr]

>如果是简单数据类型拷贝值，引用数据类型拷贝的是地址 (简单理解： 如果是单层对象，没问题，如果有多层就有问题)
>比如：对象里面包含对象，该对象拷贝的是地址，所有对一个对象中的对象的值进行改变，两个对象中的对象都会发生变化

### 深拷贝

首先浅拷贝和深拷贝只针对引用类型

深拷贝：拷贝的是对象，不是地址

常见方法：

1. 通过递归实现深拷贝
2. lodash/cloneDeep
3. 通过JSON.stringify()实现

#### 递归实现深拷贝

函数递归：

如果一个函数在内部可以调用其本身，那么这个函数就是递归函数

- 简单理解:函数内部自己调用自己, 这个函数就是递归函数
- 递归函数的作用和循环效果类似
- 由于递归很容易发生“栈溢出”错误（stack overflow），所以必须要加退出条件 return

~~~html
<body>
  <script>
    const obj = {
      uname: 'pink',
      age: 18,
      hobby: ['乒乓球', '足球'],
      family: {
        baby: '小pink'
      }
    }
    const o = {}
    // 拷贝函数   
    function deepCopy(newObj, oldObj) {
      debugger  //  k是属性名： uname age    oldObj[k]是属性值：'pink'  18
      for (let k in oldObj) {
  // 处理数组的问题  一定先写数组 再写 对象 不能颠倒  因为数组也属于对象：console.log([1, 23] instanceof Object)  true
        if (oldObj[k] instanceof Array) {             //处理数组
          newObj[k] = []
          deepCopy(newObj[k], oldObj[k])              //newObj[k]设置成[]用来接收hobby数据   oldObj[k]接收['乒乓球', '足球']
        } else if (oldObj[k] instanceof Object) {     //处理对象
          newObj[k] = {}
          deepCopy(newObj[k], oldObj[k])
        }
        else {
          newObj[k] = oldObj[k]                         //处理简单数据
        }
      }
    }
    deepCopy(o, obj) // 函数调用  两个参数 o 新对象  obj 旧对象
    console.log(o)
    o.age = 20
    o.hobby[0] = '篮球'
    o.family.baby = '老pink'
    console.log(obj)

  
    // const obj = {
    //   uname: 'pink',
    //   age: 18,
    //   hobby: ['乒乓球', '足球']
    // }
    // function deepCopy({ }, oldObj) {
    //   // k 属性名  oldObj[k] 属性值
    //   for (let k in oldObj) {
    //     // 处理数组的问题   k 变量
    //     newObj[k] = oldObj[k]
    //    
    //     // newObj.k  = 'pink'  注意：k虽然是属性名，但是是个变量，不能直接newObj.k进行使用  不等于  o.uname = 'pink'
    //   }
    // }
  </script>
</body>
~~~

#### js库lodash里面cloneDeep内部实现了深拷贝

~~~html
<body>
  <!-- 先引用 -->
  <script src="./lodash.min.js"></script>
  <script>
    const obj = {
      uname: 'pink',
      age: 18,
      hobby: ['乒乓球', '足球'],
      family: {
        baby: '小pink'
      }
    }
    const o = _.cloneDeep(obj)   //对obj进行深拷贝
    console.log(o)
    o.family.baby = '老pink'
    console.log(obj)
  </script>
</body>
~~~

#### JSON序列化

~~~html
<body>
  <script>
    const obj = {
      uname: 'pink',
      age: 18,
      hobby: ['乒乓球', '足球'],
      family: {
        baby: '小pink'
      }
    }
    // 把对象转换为 JSON 字符串
    // console.log(JSON.stringify(obj))
    const o = JSON.parse(JSON.stringify(obj))    //先转换为字符串再转换为对象
    console.log(o)
    o.family.baby = '123'
    console.log(obj)
  </script>
</body>
~~~

## 异常处理

> 了解 JavaScript 中程序异常处理的方法，提升代码运行的健壮性。

### throw

异常处理是指预估代码执行过程中可能发生的错误，然后最大程度的避免错误的发生导致整个程序无法继续运行

总结：

1. throw 抛出异常信息，程序也会终止执行
2. throw 后面跟的是错误提示信息
3. Error 对象配合 throw 使用，能够设置更详细的错误信息

```html
<script>
  function counter(x, y) {

    if(!x || !y) {
      // throw '参数不能为空!';
      throw new Error('参数不能为空!')
    }

    return x + y
  }

  counter()
</script>
```

总结：

1. `throw` 抛出异常信息，程序也会终止执行
2. `throw` 后面跟的是错误提示信息
3. `Error` 对象配合 `throw` 使用，能够设置更详细的错误信息

### try ... catch

```html
<script>
   function foo() {
      try {
        // 查找 DOM 节点
        const p = document.querySelector('.p')
        p.style.color = 'red'
      } catch (error) {
        // try 代码段中执行有错误时，会执行 catch 代码段
        // 查看错误信息
        console.log(error.message)
        // 终止代码继续执行
        return

      }
      finally {
          alert('执行')
      }
      console.log('如果出现错误，我的语句不会执行')
    }
    foo()
</script>
```

总结：

1. `try...catch` 用于捕获错误信息
2. 将预估可能发生错误的代码写在 `try` 代码段中
3. 如果 `try` 代码段中出现错误后，会执行 `catch` 代码段，并截获到错误信息


### debugger

断点调试关键字，加在代码中，相当于提前手动打断点

## 处理this

> 了解函数中 this 在不同场景下的默认值，知道动态指定函数 this 值的方法。

`this` 是 JavaScript 最具“魅惑”的知识点，不同的应用场合 `this` 的取值可能会有意想不到的结果，在此我们对以往学习过的关于【 `this` 默认的取值】情况进行归纳和总结。

### 普通函数

**普通函数**的调用方式决定了 `this` 的值，即【谁调用 `this` 的值指向谁】，如下代码所示：

```html
<script>
  // 普通函数
  function sayHi() {
    console.log(this)  
  }
  // 函数表达式
  const sayHello = function () {
    console.log(this)
  }
  // 函数的调用方式决定了 this 的值
  sayHi() // window
  window.sayHi()
	

// 普通对象
  const user = {
    name: '小明',
    walk: function () {
      console.log(this)
    }
  }
  // 动态为 user 添加方法
  user.sayHi = sayHi
  uesr.sayHello = sayHello
  // 函数调用方式，决定了 this 的值
  user.sayHi()
  user.sayHello()
</script>
```

注： 普通函数没有明确调用者时 `this` 值为 `window`，严格模式下没有调用者时 `this` 的值为 `undefined`。

### 箭头函数

**箭头函数**中的 `this` 与普通函数完全不同，也不受调用方式的影响，事实上箭头函数中并不存在 `this` ！箭头函数中访问的 `this` 不过是箭头函数所在作用域的 `this` 变量。

```html
<script>
    
  console.log(this) // 此处为 window
  // 箭头函数
  const sayHi = function() {
    console.log(this) // 该箭头函数中的 this 为函数声明环境中 this 一致
  }
  // 普通对象
  const user = {
    name: '小明',
    // 该箭头函数中的 this 为函数声明环境中 this 一致
    walk: () => {
      console.log(this)
    },
    
    sleep: function () {
      let str = 'hello'
      console.log(this)
      let fn = () => {
        console.log(str)
        console.log(this) // 该箭头函数中的 this 与 sleep 中的 this 一致
      }
      // 调用箭头函数
      fn();
    }
  }

  // 动态添加方法
  user.sayHi = sayHi
  
  // 函数调用
  user.sayHi()
  user.sleep()
  user.walk()
</script>
```

在开发中【使用箭头函数前需要考虑函数中 `this` 的值】，**事件回调函数**使用箭头函数时，`this` 为全局的 `window`，因此DOM事件回调函数不推荐使用箭头函数，如下代码所示：

```html
<script>
  // DOM 节点
  const btn = document.querySelector('.btn')
  // 箭头函数 此时 this 指向了 window
  btn.addEventListener('click', () => {
    console.log(this)
  })
  // 普通函数 此时 this 指向了 DOM 对象
  btn.addEventListener('click', function () {
    console.log(this)
  })
</script>
```

同样由于箭头函数 `this` 的原因，**基于原型的面向对象也不推荐采用箭头函数**，如下代码所示：

```html
<script>
  function Person() {
  }
  // 原型对像上添加了箭头函数
  Person.prototype.walk = () => {
    console.log('人都要走路...')
    console.log(this); // window
  }
  const p1 = new Person()
  p1.walk()
</script>
```

### 改变this指向

以上归纳了普通函数和箭头函数中关于 `this` 默认值的情形，不仅如此 JavaScript 中还允许指定函数中 `this` 的指向，有 3 个方法可以动态指定普通函数中 `this` 的指向：

#### call

使用 `call` 方法调用函数，同时指定函数中 `this` 的值，使用方法如下代码所示：

```html
<script>
  // 普通函数
  function sayHi() {
    console.log(this);
  }

  let user = {
    name: '小明',
    age: 18
  }

  let student = {
    name: '小红',
    age: 16
  }

  // 调用函数并指定 this 的值   （增加.call和指定 this 的参数）
  sayHi.call(user); // this 值为 user
  sayHi.call(student，1，2); // this 值为 student    1，2原本参数

  // 求和函数
  function counter(x, y) {
    return x + y;
  }

  // 调用 counter 函数，并传入参数
  let result = counter.call(null, 5, 10);
  console.log(result);
</script>
```

总结：

1. `call` 方法能够在调用函数的同时指定 `this` 的值
2. 使用 `call` 方法调用函数时，第1个参数为 `this` 指定的值
3. `call` 方法的其余参数会依次自动传入函数做为函数的参数

#### apply

使用 `call` 方法**调用函数**，同时指定函数中 `this` 的值，使用方法如下代码所示：

```html
<script>
  // 普通函数
  function sayHi() {
    console.log(this)
  }

  let user = {
    name: '小明',
    age: 18
  }

  let student = {
    name: '小红',
    age: 16
  }

  // 调用函数并指定 this 的值
  sayHi.apply(user) // this 值为 user
  sayHi.apply(student) // this 值为 student

  // 求和函数
  function counter(x, y) {
    return x + y
  }
  // 调用 counter 函数，并传入参数
  let result = counter.apply(null, [5, 10])    //与call的区别在于剩余参数放在了数组里面
  console.log(result)

  //求数组最大值
  const arr = [3,4,2,9]
  const max = Math.max.apply(Math,arr)         //因为是个数组，所以可以用来进行求最大值
  const max = Math.max(...arr)
  console.log
</script>
```

总结：

1. `apply` 方法能够在调用函数的同时指定 `this` 的值
2. 使用 `apply` 方法调用函数时，第1个参数为 `this` 指定的值
3. `apply` 方法第2个参数为数组，数组的单元值依次自动传入函数做为函数的参数

#### bind

`bind` 方法并**不会调用函数**，而是创建一个指定了 `this` 值的新函数，使用方法如下代码所示：

```html
<script>
  // 普通函数
  function sayHi() {
    console.log(this)
  }
  let user = {
    name: '小明',
    age: 18
  }
  // 调用 bind 指定 this 的值，从window变为user
  let sayHello = sayHi.bind(user);   //不会调用函数
  // 调用使用 bind 创建的新函数
  sayHello()
</script>
```
实例：有一个按钮，点击禁用，两秒后开启
<script>
btn.addEventListener('click',function(){
  this.disabled = true
  //定时器的调用对象是window  
  setTimeout(function(){
  this.disabled = fasle
  }.bind(btn),2000)       //不立马调用定时器的情况前下将this改为btn
})
</script>
注：`bind` 方法创建新的函数，与原函数的唯一的变化是改变了 `this` 的值。

## 防抖（重置）节流（执行完一个才会执行下一个）

1. 防抖（debounce）：频繁触发事件，不会执行每一次，而是只会执行在规定时间内的最后一次操作
所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间
使用场景：手机号邮箱检验，搜索框输入
解决方案：
>1.lodash防抖函数  *_.debounce(fun,时间)*
<script>
  let i = 1
  //鼠标滑过就加一
  function mouseMove(){
    box.innerHTML = i++
  }
  //对函数进行防抖，500ms后只执行一次
  box.addEventListener('mousemove',_.debounce(mouseMove,500))
</script>

>2.手写防抖函数
  思路：1.声明定时器变量  2.每次触发事件判断是否有定时器，有则清除再开，没有开一个  3.定时器里面写函数调用
  <script>
 //防抖函数 参数：要进行防抖的函数，时间
 function debounce(fn，t){
  //1.声明定时器变量 
  let timer
  //2.为什么要return一个匿名函数，鼠标滑动不断执行这个匿名函数 ？
  **因为在addEventListener中第二个参数应该是一个函数fn，而不是函数调用fn（），如果硬传一个函数调用，该函数会立马执行且只会执行一次
   return function(){
    //每次触发事件判断是否有定时器，有则清除
    if(timer) clearTimeout(timer)
    //没有再开
    timer = setTimeout(function(){
    fn()
  },t)
   }
 }
 //对函数进行防抖，500ms后只执行一次
  box.addEventListener('mousemove',debounce(mouseMove,500))

</script>
1. 节流（throttle）
所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数
使用场景：高频输入：页面滚动，鼠标滑动
解决方案：
>1.lodash防抖函数  *_.throttle(fun,时间)*

<script>
  let i = 1
  //鼠标滑过就加一
  function mouseMove(){
    box.innerHTML = i++
  }
  //对函数进行防抖，500ms后只执行一次
  box.addEventListener('mousemove',_.throttle(mouseMove,500))
</script>
>2.手写节流函数
思路：1.声明定时器变量   2.触发事件判断是否存在定时器正在倒计时，有则不开启新的定时器   3.没有定时器开一个定时器   4定时器里面放执行的函数 以及 关闭定时器

<script>
  function throttle(fn,t){
    let timer = null
    return function(){
      if(!timer) {
        timer = setTimeout(()=>{
          fn()
          //为什么要关闭定时器？
          //因为只有关闭了定时器才能在这个定时器执行完之后执行下一个定时器
          //为什么关闭定时器不能用clearTimeout(timer)
          // 将 timer 设为 null 用于表示"当前没有定时器在等待"，可以执行下一个定时器。而定时器执行完是自动关闭，没有必要clearTimeout(timer)
          timer = null
        },t)
      }
    }
  }
  //对函数进行防抖，500ms后只执行一次
  box.addEventListener('mousemove',_.throttle(mouseMove,500))
</script>


