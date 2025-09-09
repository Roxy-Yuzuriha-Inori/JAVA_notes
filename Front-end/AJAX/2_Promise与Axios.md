### XMLHttpRequest 小型axios
请求数据
<script>
//创建xhr对象
const xhr = new XMLHttpRequest()

//配置请求方法和请求url地址（查询对象放在url地址后面）
xhr.open('GET','url')

//监听请求完成，设置接收结果函数
xhr.addEventListener('loadend',()=>{
  //返回的数据对象
  console.log(xhr.response)
  //将字符串的json数据转为为对象
  cosnt data = JSON.parse(xhr.response)
})

//发起请求
xhr.send()
</script>

提交数据
<script>
//创建xhr对象
const xhr = new XMLHttpRequest()

//配置请求方法和请求url地址（查询对象放在url地址后面）
xhr.open('POST','url')

//监听请求完成，设置接收结果函数
xhr.addEventListener('loadend',()=>{
  //返回的数据对象
  console.log(xhr.response)
  //将字符串的json数据转为为对象
  cosnt data = JSON.parse(xhr.response)
})
//设置要提交的数据类型是json字符串
xhr.setRequestHeader('Content-Type','application/json')

//要提交的数据
const user = {a:'ad'}
consr userstr = JSON.stringify(user)

//发起提交
xhr.send(userstr)

</script>

### Promise管理异步任务
<script>
//创建Promise对象  参数是一个函数，并且该函数的两个参数也是函数
const = new Promise((resolve,reject)=>{
//执行异步代码
//成功调用resolve（）传递成功的结果给promise对像
resolve('成功')
//失败
reject(new Error('失败'))

})

//获取promise对象中的结果,成功的在result中，失败的在error中
p.then(result =>{
  console.log(result)
}).catch(error =>{
  cosole.log(error)
})
</script>

## promise三种状态
1.pending状态：刚创建时的状态
2.fulfilled状态：resolve被调用时改变状态，promise检测到该状态会将result的内容传给.then方法里面的形参
3.rejected状态：同fulfilled兑现状态
注意：fulfilled状态和rejected状态敲之后不会被改变了

### promise + xhr
<script>
//Promise对象
const = new Promise((resolve,reject)=>{
//执行xhr异步代码
const xhr = new XMLHttpRequest()
xhr.open('GET','url')
xhr.addEventListener('loadend',()=>{
  console.log(xhr.response)
  cosnt data = JSON.parse(xhr.response)  
 //根据xhr对象响应的结果判断是否成功失败
 if(xhr.status >= 200 && xhr.status < 300){
  resolve(data)
 }
else{
  reject(new Errror(xhr.response))
}
  })
xhr.send()
})

p.then(result =>{
  console.log(result)
  //对result进行后续处理
}).catch(error =>{
  cosole.dir(error)
})
</script>

### 封装axios
<script>
  //config传递接口的基本信息
  //该函数返回一个promise对象，方便可以调用promise对象的.then()和.catch（）
  function myAxios(config) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      //增加查询参数，多一个param属性，对于xhr来说是放在url后面
      if(config.params) {
        const paramsObj = new URLSearchParams(config.params)   //该函数会将传入的内容转换成地址的形式
        const queryString = paramsObj.toString()               //调用该对象的打印方法进行打印
        //要拼接的查询参数的地址
        config.url += `?${queryString}`
      }
      xhr.open(config.method || 'GET', config.url)
      xhr.addEventListener('loadend', () => {
    const data = JSON.parse(xhr.response)
        //根据xhr对象响应的结果判断是否成功失败
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(data)
        }
        else {
          reject(new Errror(xhr.response))
        }
      })
       //增加要提交的数据，多一个data属性，对于xhr来说是放在send里面
       if (config.data){
        const jsonstr = JSON.stringfy(config.data)
        xhr.setRequestHeader('Content-Type','application/json')
        xhr.send(jsonstr)
       }else {
        //没有data，正常发送
         xhr.send()
       }
    })
  }

  //调用封装函数
    myAxios({
      url: 'url'，
      param:{
        pa:'d'
      }，
      data:{
        pa:'d'
      }  
    }).then(result => {   //因为返回的是promise对象，可以直接调用对象的.then()和.catch（）
      console.log(result)
      //对result进行后续处理
    }).catch(error => {
      cosole.dir(error)
    })
</script>

