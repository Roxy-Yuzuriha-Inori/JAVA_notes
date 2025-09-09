### 同步与异步
同步：顺序执行
异步：不会阻塞代码异步执行 如：定时器，ajax

### 回调地狱
因为不断调用某个信息之前需要知道并调用另外一个信息，所以在axios（）.then（）的then中又不断增加axios（）.then（），在回调函数中前台回调函数    缺点：可读性差，无法捕捉异常，耦合性严重

### Promise链式调用 解决回调地狱
通过promise.then返回一个promise对象
<script>
const = new Promise((resolve,reject)=>{
resolve('成功')
reject(new Error('失败'))
})

cosnt p = p.then(result =>{
  console.log(result)
  //在.then（）方法中创建一个promise对象并返回
  return new Promise ((resolve,reject) => {
    resolve(result + '成功')
  })
}).catch(error =>{
  cosole.log(error)
})

//调用自定义遍历p的then（）方法
p.then (result =>{
  //此时的ressult是 resolve(result + '成功')
  console.log(result)
})
</script>
## axios对Promise链式调用的应用
<script>
 axios({url:''}).then(result => {
  //逻辑处理，获取想要的参数
  return axios({url:'',params:{pname:'先前获取到的参数'}})
  //通过.then获取的是上面return的promise对象（axios返回的是一个promise对象）
 }).then(result =>{   
  //重复逻辑处理，获取第二个参数
  return axios({url:'',params:{pname:'先前获取到的参数'，pid:'第二个参数'}})
  //第二次处理
 }).then(result =>{
  //逻辑处理
 })
</script>

### async和await函数   对promise的进一步简化 
<script>
  //定义async修饰函数
  async function getDate(){
    try(
    //axios返回的是一个promise对象,await获取的是promsie的result对象(成功结果)
    const pObj = await axios({url:''})
    //pObj即是result对象，可对其进行逻辑处理
    const pname = pObj.data.list[0]

    //重复处理
    const cObj = await axios({url:'',params:{pname}})
    const cname = cObj.data.list[0]
    ) catch(error){
      //对promsie的reject对象的处理（错误结果）
      console.dir(error)
    }
  }
</script>

### 事件循环
调用栈：js按顺序执行代码
宿主环境：碰到异步代码放到浏览器的宿主环境当中
任务队列：异步代码时间到了之后放在任务队列当中
          任务队列分微任务队列和宏任务队列，调用栈空闲时先调用微任务队列后宏任务队列

宏任务：由浏览器环境执行的异步代码 
   如：js<script>标签，定时器，ajax请求完成时间，用户时间交互   *放在宏任务队列中执行
微任务：由js引擎环境执行的异步代码
   如：Promise对象.then()    Promise对象是同步的，但他的then和catch是异步的 *放在微任务队列中执行

### Promise.all静态方法   合并多个Promise对象
<script>
  const p = Promise.all([Promise对象，Promise对象])
  p.then(result =>{
  //result是一个包含多个Promise对象成功结果的数组[Promise对象成功结果,Promise对象成功结果...]
  }).catch(error =>{
  //多个Promise对象中只要有一个失败就会捕获异常，并且抛出第一个失败的Promise对象
  })
</script>
