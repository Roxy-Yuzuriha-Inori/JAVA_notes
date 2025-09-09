## Vuex
> 问题：如果一个组件的数据需要被多个其他组件调用，则需要写多个emit发送数据和on接收修改的数据
> 解决：把这种数据放在Vuex里面进行统一保存，方便各个组件进行修改调用，实现多个组件共享数据

# 工作原理
   ![alt Vue工作原理图示](../../image/Vuex.png)
   State：存公共数据的对象

# 搭建开发环境
```js
main.js
1.安装引入  npm i Vuex

  import store from './store'  //引入3创建的store      

  // 问题：创建store要用到Vuex，但Vue.use(Vuex)在下面，就算调整顺序Vue也会将import的东西放在最上面，导致报错
  // 解决：Vue.use(Vuex) 放在./store/index.js中
  // Vue.use(Vuex)      // 效果：vue配置项多一个store

2.vue配置增加store配置项

   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store：store
   })

./store/index.js
3.与组件同级目录创建并配置store

import Vuex from 'vuex'
//将Vue.use(Vuex)放此防止编译报错
import Vue from 'vue'
Vue.use(Vuex)

//准备action-用于存储组件中对数据的动作
const actions = {
  //编写对应的jia函数  context:minstore对象，有store的一些方法   value：传过来的值
  jia(context,value){
    //用ministore（context）上的commit传 mutations 类名 和 数据给mutations
    console.log('context')
    context.commit('JIA',value)
  }
}

//准备mutations-用于实现对数据的操作
const mutations = {
  JIA(state,value){
    //可以直接对state里面的数据进行操作
    state.sum += value
  }
}

//准备state-用于存储公共数据
const state = {
  sum:0
}

//对数据额外公共操作
const getters = {
  bigSum(state){
    return state.sum*10
  }
}

//创建并暴露store，store用来管理上面三个
export defualt new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})

./component/Count.vue
4.组件

methods:{
  increment(){
    //用store上的dispatch传 action类名 和 数据给actions
    this.$store.dispatch('jia',this.n)

    //如果acion里面没有要处理的逻辑，直接commit，可以这里用commit直接到mutations
    this.$store.commit('JIA',this.n)
  }
}
//用map简化method里面的方法
import {mapMutations，mapActions} from 'vuex'
method:{
  ...mapMutations({increment:'JIA'})
}
/*
问题：没有指明this.n，而mapMutations(increment:'JIA') 相当于写的是increment(event){this.$store.commit('JIA',event)}
绑定事件的时候是@click='increment'，没有写括号，默认传递的是event
  解决：绑定事件的时候传递参数@click='increment(n)'
*/
//同样也可以数组形式，保证action里面属性名和method里面属性名一致即可
  ...mapMutations(['JIA'])

模板语法拿到数据
<div>sum为{{$store.state.sum}}</div>

模板语法拿到加工后数据
<div>sum为{{$store.getters.bigSum}}</div>

//简化:写在计算属性，不用在模板语法写长串$store.state.sum
computed:{
  nsum(){
    return this.$store.state.sum
  },
  xuexiao(){
    return this.$store.state.school
  }
}
<div>sum为{{nsum}}</div>
<div>sum为{{school}}</div>

//进一步简化:计算属性每个写nsum(){}重复了  
import {mapState，mapGetters} from 'vuex'
mapState:传nsum和sum就能生成computed的语句

computed(){
//mapState返回的是一个对象{{nsum:function,xuexiao:function}}，用...对其展成键值对，
...mapState({nsum:'sum',xuexiao:'school'})
}

//一般来说nsum是计算属性名，sum是state里面的属性名是一个名字
...mapState({sum:'sum',school:'school'})
//但是因为后面必须是字符串，是字符串才会去state找数据，不然他会在组件解析sum，所以不能简化成...mapState({sum,school})
//但是可以简化成如下，他会先去组件计算属性里找sum，再去state里面去找sum
...mapState(['sum','school'])    数组形式

   ```

# 模块化编码
作用：将actions，mutations,state,getters放在一个对象里，作为一个功能,作为store里面的一个文件夹

```js
const countOptions ={
  //开启命名空间用于下面...mapState(['a']) 模板语法 {{a.sum}} 能简化成 ...mapState('a',['sum','school'])形式
  namespaced:true,
  actions(){},
  mutations(){},
  state(){},
  getters(){}
}
const peopleOptions ={
  actions(){},
  mutations(){},
  state(){},
  getters(){}
}

export defualt new Vuex.Store({
  modules:{
    a:countOptions,
    b:peopleOptions
  }  
})
//由于store多了一层,去store.特定模块（即store.a）中找数据
computed(){
...mapState(['sum','school']) 需要改成 ...mapState('a',['sum','school']) 
this.$store.state.sum 需要改成 this.$store.state.a.sum
//注意getters不太一样
this.$store.getters.sum 需要改成 this.$store.getters[a/sum] 而不是this.$store.getters.a.sum
}

 method:{
...mapMutations(['JIA']) 需要改成 ...mapMutations('a'，['JIA'])
this.$store.commit('JIA',this.n) 需要改成  this.$store.commit('a/JIA',this.n)
this.$store.dispatch('jia',this.n) 需要改成  this.$store.dipatch('a/jia',this.n)
}
```