<template>
	<div>
		<h2>学生姓名：{{name}}</h2>
		<h2>学生年龄：{{age}}</h2>
	</div>
</template>

<script>

// props示例

	 export default {
		name:'Student',
		data(){
			return {
				//props上的属性对应的值是不能修改的，可以在data中创建一个属性进行接收，然后模板放myage改myage
				myage:this.age
			}
		},
		//用于接收调用组件时传入的参数
		//第一种接收方式
		props:['name','age'],
		//第二种接收方式(限制类型)
		props:{
			name:String,
			age:Number
		},
		//第三种接收方式(更多限制)
		props:{
			name:{
				type:String,
				required:true
			},
			age:{
				type:Number,
				default:99
			}
		},
	}
</script>
