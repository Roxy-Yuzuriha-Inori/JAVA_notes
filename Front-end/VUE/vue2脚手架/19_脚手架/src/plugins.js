// export default obj;和const obj = {xxx}简写成export default{xxx}
const obj = {   
  install(Vue,用形参接收main传过来的其他参数){  //对象里的属性函数详写：install:function(){}
    //Vue该参数是vm构造器原型对象，可以放有关Vue的全局方法，并且vm，vc都可以用这里的方法！！！
    console.log(Vue) 
    //全局过滤器
    Vue.filters()
    //全局指令
    Vue.directives()
    //混入
    Vue.mixins()
    //Vue原型上添加方法
    Vue.prototype.Hello = ()=>{}
  }
}
export default obj;  //在main.js中应用