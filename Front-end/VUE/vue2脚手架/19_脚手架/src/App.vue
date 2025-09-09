<template>
	<div>
		<!-- ref示例 -->
		
		<img src="./assets/logo.png" alt="logo">
		<!-- ref：Vue中类似class和id给改标签打标识，用于获取dom-->
		<h1 v-text="msg" ref="title"></h1>
		<button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
		<School ref='sch'></School>

	</div>
</template>

<script>
	//引入组件
	import School from './components/School'

	export default {
		name:'App',
		components:{
			School,
			Student
		},
		method:{
			showDOM(){
				//通过ref获取dom
				console.log(this.$refs.title)     //app组件实例对象.$refs.打的标签
				console.log(this.$refs.sch)       //通过ref打在组件标签上获取的是对应的组件实例对象，通过id拿到的只有模板
			}
		}
	}
</script>
