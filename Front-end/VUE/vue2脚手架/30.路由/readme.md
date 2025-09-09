## 路由
> 定义：路由就是一组key-value，key是路由器上的接口，value对应设备，路由由路由器进行统一管理
> 前端路由：key是路径，value是组件。
> SPA：单页面应用
> 作用:在单页面展示不同页面的效果，事件触发之后，路由器监听到新的路径进行不同页面的展示

## 基本使用
``` js
main.js
1.安装引入  npm i Vuex

//引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

2.vue配置增加router配置项

   new Vue({
   	el:'#app',
   	render: h => h(App),
   	router
   })

./src/router.js
3.与组件同级目录创建并配置router
//引入路由
import VueRouter from 'vue-router'
//引入组件
import About from '../components/About'
import Home from '../components/Home'
//创建并暴露路由器
export defualt new VueRouter({
  //制定路由规则
  routes:[
    {//如果路径是about，就展示About组件
      path:'/about',
      component:About
    },
    {
      path:'/home',
      component:Home
    }
  ]
})

App.vue
4.app模板
//点击进行跳转组件，修改路径
<router-link  to="/about">About</router-link>
//replace属性，到标记的路径时，该路径会替换之前的路径
<router-link replace to="/home">Home</router-link>
// 指定组件的呈现位置
<router-view></router-view>

```
## 几个注意点

1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
2. 切换路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的```$router```属性获取到。

## 嵌套（多级）路由
``` js
./src/router.js
与组件同级目录创建并配置多级router
export defualt new VueRouter({
//制定多级路由规则
  routes:[
    {
      path:'/home',
      component:Home,
      children:[
        {//多级路由的路径不用加'/'
          path:'news',
          component:News
        },
        {
          path:'msg',
          component:Msg
          children:[
            paths:'details',
            component:Detail
          ]
          
        }
      ]
    }
  ]
})

在home组件配置模板
//点击进行跳转组件，带上父级修改路径
<router-link  to="/home/news">Home</router-link>
<router-link  to="/home/msg">Home</router-link>
// 指定组件的呈现位置
<router-view></router-view>
```

## 路由的query参数(路由传参)
``` html
news组件里问号后面加携带的参数，参数会被携带到detail组件中
<router-link  :to="`/home/news/detail?id=${m.id}&title='携带的参数'`">{{m.title}}</router-link>

to的对象写法
<router-link :to="{
path:'/home/news/detail',
query:{
    id:m.id,
    title:m.title
}
}">
{{m.title}}
</router-link>
```

```js
details组件
export default{
  name:'default'.
  mounted(){
    //可以看到$route上的属性，知道传过来的数据挂载在在哪
    console.log(this.$route)
  }
}
模板语法，使用传过来的数据
{{$route.query.id}}
```

## 命名路由
1. 作用：可以简化路由的跳转。
2. 如何使用
   
   1. 给路由命名：
      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：
      ```html
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

## 路由的params参数

1. 配置路由，声明接收params参数
   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
            //使用占位符声明接收params参数,相当于id："666"，title："你好"
   					path:'detail/:id/:title', 
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```html
   <!-- 跳转并携带params参数，to的字符串写法 可用${m.id}传动态值-->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
    <!--路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！-->
   		name:'xiangqing',
   		params:{
   		   id:666,
         title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```
3. 接收参数：

   ```js
   模板语法
   {{$route.params.id}}
   {{$route.params.title}}
   ```
## 路由的props配置

​	作用：让路由组件更方便的收到参数，简化 ``模板语法{{$route.params.id}}``

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，路由配置props中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props($route){ //$route形参接收$router
		return {
			id:$route.query.id,
			title:$route.query.title
		}
	}
}
//Detail组件用props接收
export defualt{
  props:['id','title']
}

```

## 编程式路由导航
作用：不借助```<router-link> ```实现路由跳转，给标签添加事件

   ```js
   methods: {
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退，通过传入数字进行控制 3前进三步
   }
   ```

 ## 缓存路由组件
  作用：让不展示的路由组件保持挂载，不被销毁。

   ```html
   <!-- include通过写组件名name指明哪些组件挂载，不写include所有组件都被挂载 -->
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   <!-- 缓存多个 -->
   <keep-alive :include="['News','Msg']"> 
       <router-view></router-view>
   </keep-alive>
   ```

## 两个新的生命周期钩子

作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。可用于选择性销毁

```js
activated(){}路由组件被激活时触发
deactivated(){}路由组件失活时触发
```

## 路由守卫
作用：对能否进行路由跳转增加权限限制

1. 全局守卫
   ```js
   //全局前置守卫：初始化时执行、每次路由切换前执行
   //加在唯一的router上面，默认拦截全部跳转
   router.beforeEach((to,from,next)=>{
   	console.log('beforeEach',to,from)

    //判断当前路由是否需要进行权限控制 
    // if(to.name === 'xinwen'||to.name==='xiaoxi') 如果要去xinwen，xiaoxi就先放行，进去之后再判断
    //简化
    //router的路由规则route 里面有属性meta（路由元信息），可存放数据，这里存放isAuth用来判断对该路径是否要进行权限控制  meta:{isAutj:true}
   	if(to.meta.isAuth){ 

      //进去之后浏览器只要有存储school名字是atguigu，就放行
   		if(localStorage.getItem('school') === 'atguigu'){ 
   			next() //放行
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
      //其他的没有特殊检查，让放行
   		next() 
   	}
   })
   
   //全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to,from)=>{
   	console.log('afterEach',to,from)
    //修改网页页签的名字
    document.title = to.meta.title || 'vue_test'
   	/*if(to.meta.title){ 
   		document.title = to.meta.title 
   	}else{
   		document.title = 'vue_test'
   	}*/
   })
   ```

2. 独享守卫:
给一个路由单独加守卫，只有前置没有后置守卫
   ```js
   加在router里的route里面（meta同级）
   beforeEnter(to,from,next){
   	console.log('beforeEnter',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){
   			next()
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next()
   	}
   }
   ```
3. 组件内守卫：
.
   ```js
   加在组件内（method同级）
   //进入守卫：通过路由规则（要有操作行为），进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用（不等同于路由切换后执行）
   beforeRouteLeave (to, from, next) {
   }
   ```

## 路由器的两种工作模式

1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
  > router属性mode更改模式，mode:'history'
3. hash模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。
	 
npm run build 将vue文件转换为html css js