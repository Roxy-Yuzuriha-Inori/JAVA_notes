/* 
	该文件是整个项目的入口文件
*/
//引入Vue，相当于之前js引入  
import Vue from 'vue'
//引入App组件，它是所有组件的父组件
import App from './App.vue'
//关闭vue的生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(plugins,调用插件时要传递的其他参数)

/* 
	关于不同版本的Vue：
	
		1.vue.js与vue.runtime.xxx.js的区别：
				(1).vue.js是完整版的Vue，包含：核心功能+模板解析器。
				(2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。

		2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用
			render函数接收到的createElement函数去指定具体内容。
*/

//render示例

new Vue({
	el:'#app',
	//由于引入的是残缺版的Vue，没有模板解析器，下面两行无法执行
	template:`<App></App>`,
	components:{App},

	//解决方案：render
	render(createElement){
		//创建模板
		return createElement('h1','标签内容')
	},
	/*简写 render:function(createElement){return createElement('h1','标签内容')}   render:createElement=>createElement('h1','标签内容')}
 	render:h=>h('h1','标签内容')},	*/

//模板在App变量里面，将App组件放入容器中
  render: h => h(App),
})