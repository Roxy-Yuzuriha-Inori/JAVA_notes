
## 插槽
被时使用的组件通过slot占位，等着父组件放东西

1. 默认插槽：

      ```vue
      父组件中：在子组件标签里面放要放在插槽里面的内容
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 通过slot标记父组件额外内容要放的位置-->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      ```vue
      父组件中：通过slot属性指明要放哪个插槽
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
                   <!--用template包裹整体时，可以用 v-slot:footer 代替 slot="footer" -->
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>    //没有默认放 <div>html结构1</div>
                     <slot name="footer">插槽默认内容...</slot>    //没有默认放 <div>html结构2</div>
                  </div>
              </template>
      ```

   3. 作用域插槽：

    上面两个数据在父组件里，而这个数据在子组件里面，父组件决定要插入的结构但没法获得数据？
    子组件加上:game=game(:自定义的名字=子组件data里面的变量名)
    父组件加上<template scope="a">（a是接收数据的形参名,是一个对象，里面存子组件准备的数据:game=game msg='111'）

         ```vue
         父组件中：
         		<Category>
            <!-- 父组件要用template包裹 -->
         			<template scope="scopeData">
         				<!--父组件要插入的结构 -->
         				<ul>
                <!-- 通过scopeData.games获得数据 -->
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
          es6改进
         		<Category>
            <!-- 结构赋值-->
         			<template scope="{games}">
         				<ul>
                <!-- 直接用games获得数据 -->
         					<li v-for="g in games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         子组件中：
                 <template>
                     <div>
                         <slot :games="games" msg='111'></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         <!-- 数据在子组件自身 -->
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```
