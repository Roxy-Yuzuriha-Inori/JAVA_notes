<template>
	<div class="demo">
		<h2>学校名称：{{name}}</h2>
		<!-- School组件调用Student组件 -->
		<!-- age传的是字符串   :age传的是值18（因为他会自动解析‘’里面的表达式返回一个结果） -->
		<Student name='唉唉' :age='18'></Student> 
	</div>
</template>

<script>
	import Student from './components/Student'

	//mixin示例
	
	//1.引入mixin,引入的属性值和data重复以data为主,但如果是生命周期钩子，都会显示,mixin里面的先显示
	import {mixin,mixin2} from '../mixin'
	 export default {
		name:'School',
		data(){
			return {
				name:'尚硅谷',
			}
		},
		components:{
			Student
		},
		//2.混合使用,相当于增加一些公共的部分
		mixins:[mixin,mixin2]
	}
</script>
<style>
	.demo{
		background-color: orange;
	}
</style>