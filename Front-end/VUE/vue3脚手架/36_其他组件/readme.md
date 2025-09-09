### 新的组件

## 1.Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

## 2.Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的组件html结构移动到指定位置的技术。

  ```html
  <!-- 移动位置写css选择器 -->
  <teleport to="移动位置">
  	<div v-if="isShow" class="mask">
  		<div class="dialog">
  			<h3>我是一个弹窗</h3>
  			<button @click="isShow = false">关闭弹窗</button>
  		</div>
  	</div>
  </teleport>
  ```

## 3.Suspense

- 等待异步组件时渲染一些准备好的内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件

    ```js
    import {defineAsyncComponent} from 'vue'
    const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
    ```

  - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

    ```vue
    <template>
    	<div class="app">
    		<h3>我是App组件</h3>
        <!-- 由于是异步引入，在准备好的组件中给异步引入的组件留好位置 -->
    		<Suspense>
        <!-- 要加载的组件 -->
    			<template v-slot:default>
    				<Child/>
    			</template>
          <!-- 没加载出来显示的内容 -->
    			<template v-slot:fallback>
    				<h3>加载中.....</h3>
    			</template>
    		</Suspense>
    	</div>
    </template>
    ```

 - 使用Suspense可以让子组件setup返回异步对象
  
<script>
	import {ref} from 'vue'
	export default {
		name:'Child',
		async setup(){
			let sum = ref(0)
			let p = new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve({sum})
				},3000)
			})
			return await p
		}
	}
</script>


