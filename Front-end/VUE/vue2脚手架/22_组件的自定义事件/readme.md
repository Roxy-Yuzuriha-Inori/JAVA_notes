## 组件的自定义事件

# 1.父组件给子组件传递函数类型的props实现   

  :即v-bind，解析表达式a，传递函数名b，子组件调用父组件函数时要往形参传递参数，父组件的形参接收到了来自子组件的数据，从而可以对子组件数据进行操作

	``` html 
  <子组件 :b="a"/>
  ```

# 2.父组件给子组件实例对象vc绑定一个自定义事件实现

@即v-on，给子组件vc绑定事件atguigu，事件触发的父组件函数getStudentName，子组件在自己的某个函数操作中可以触发事件atguigu，触发方法 this.$emit.('atguigu'，子组件参数)  即通过子组件函数中的emit触发父组件getStudentName函数。并且在此过程中，可以子组件可以携带子组件参数，父组件可以进行接收getStudentName（接收子组件参数形参）

原生事件需要加.native，否则会当成自定义事件，原生事件相当于给整个子组件最外面包裹的div增加原生（点击）事件
``` html
<子组件 @atguigu="getStudentName"  @click.native='d'/> 
```

# 3.父组件通过ref拿到子组件示例对象vc绑定一个自定义事件实现

refs通过this.$refs.变量名 得到子组件实例对象vc，绑定子组件事件atguigu，父函数getStudentName。相当于2.html操作对子组件实例vc和父组件函数进行绑定，只是mounted中可以实现更多的操作，比如增加定时器等

``` html
<子组件 ref="a" />
<js>
mounted() {
//绑定自定义事件  this.getStudentName直接写回调函数，function的this指向子组件实例对象，箭头函数指向本组件对象，需要箭头函数
  this.$refs.a.$on('atguigu',this.getStudentName) 

// this.$refs.a.$once('atguigu',this.getStudentName) //绑定自定义事件（一次性）
		},
</js>
```

## 解绑自定义事件
  绑定事件是绑在子组件实例对象身上，所以解绑事件和绑定事件一样在子组件中进行操作

# 对于this.$emit.('atguigu'，子组件参数)

  解绑一个：this.$off('atguigu')
  解绑多个：this.$off(['atguigu','demo'])    是数组
  解绑所有：this.$off()
