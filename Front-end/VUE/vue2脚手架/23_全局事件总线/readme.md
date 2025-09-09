## 全局事件总线：任意组件通信
1.要有一个所有组件的中转站，要求所有组件都能使用到它  ---  Vue原型对象 Vue.prototype
2.所有组件要和Vue.prototype进行绑定，那么在Vue.prototype上增加一个属性名x，即Vue.prototype.x,
对于组件来说，this.x.$on(()=>{}) 那么this会根据原型链去找x属性然后绑定事件函数，问题是什么才能调用$on呢？ 是vm或者vc
所以Vue.prototype.x得给它创建一个vc对象    即具体来说是所有组件要和Vue.prototype.x进行绑定

``` js
# main.js
const Demo = Vue.extend({})
//为什么要new，因为Vue.extend({})是在解析组件名标签的时候才new，所以这里要手动new
const d = new Demo()
Vue.prototype.x = d

# 要收数据的子组件
mounted(){
  //给公共的x绑定了事件  参数（事件名，回调函数（data要接收的数据））
  this.x.$on('事件名',(data)={})
},
//用完记得销毁
beforeDestroy(){
  this.$bus.$off('事件名')
}

# 要传递数据的子组件
method(){
  Myclick(){
  //触发公共的x上的事件  参数（事件名，要传的数据）
    this.x.$emit('事件名'，111)
  }
}
```

改进：不用vc 用 vm

``` js
# main.js
new Vue({
  //在刚创建vm的时候安装全局事件总线，创建完就不能安装了
	beforeCreate() {
		//Vue.prototype.x = this    
		Vue.prototype.$bus = this     //x一般用$bus
	},
})
```
