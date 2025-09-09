## setup
App.vue中
```js
import {h} from 'Vue'
export default{
  //数据
	let name = '张三'
	let age = 18
	let a = 20

	//方法
	function sayHello(){
	alert(`我叫${name}，我${age}岁了，你好啊！`)
			
	//setup返回一个对象（常用） 返回的数据可以直接在模板中使用  
	return {
			age,test2,		
	}

	//返回一个函数（渲染函数）类似render
	// return ()=> h('h1','尚硅谷') 
  }
}	
模板中使用
{{name}}
```

## ref和reactive函数
App.vue中
```js
import {ref，,reactive} from 'Vue'
export default{
  //把数据交给ref函数实现响应式，函数返回值是个引用对象RefImpl
	let name = ref('张三')
	//通过ref里面的reactive函数,返回的是一个代理对象proxy
	let age = ref({
		old:'18'
	})
	//直接使用reactive函数，返回的是一个代理对象proxy
	let age = reactive({
		old:'18'
	})
	//reactive实现对数组的响应式
		let age = reactive(['11','22'])


  //改变数据   
  function change(){
		//ref传数值
    name.value = '李四'
		//ref传对象
		age.value.old='15'
		//reactive传对象
		age.old='15'
		//reactive传数组
		age[0]='22'
  }
}
模板中使用，不用name.value，Vue3会自动添加
{{name}}   {{age.old}}
```

## reactive响应式原理
```js
			let person = {
				name:'张三',
				age:18
			}
			//proxy是挂载在windows上的构造函数
			const p = new Proxy(person,{

				//有人读取p的某个属性时调用
				//p是代理对象  person是源数据，target接收person    prorpName读取代理对象时要的属性名			
				get(target,propName){
					console.log(`有人读取了p身上的${propName}属性`)

					//propName是个变量,所以不是用target.propName
					//return target[propName]
					//通过Reflect实现，报错会以返回结果呈现，而不是中断程序
					return Reflect.get(target,propName)
				},

				//有人修改p的某个属性、或给p追加某个属性时调用
				set(target,propName,value){
					console.log(`有人修改了p身上的${propName}属性，我要去更新界面了！`)

					//修改值
					//target[propName]=value
					Reflect.set(target,propName,value)
				},
				//有人删除p的某个属性时调用
				deleteProperty(target,propName){
					console.log(`有人删除了p身上的${propName}属性，我要去更新界面了！`)
					//return delete target[propName]
					return Reflect.deleteProperty(target,propName)
				}
			})
```

## 6.setup的两个注意点

- setup执行的时机
  - 在第一个生命周期beforeCreate之前执行一次，this是undefined。
  
- setup的参数
  ```js
	export default {
		name: 'Demo',
		props:['msg','school'],
		emits:['hello'],
		setup(props,context){

		}
	}
	```
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象(里面包含attrs.slots,emit)
  - 
  - context.attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
  - context.slots: 收到的插槽内容, 相当于 ```this.$slots```。
  - context.emit: 分发自定义事件的函数, 相当于 ```this.$emit```,Vue3可加emit配置项去除警告
