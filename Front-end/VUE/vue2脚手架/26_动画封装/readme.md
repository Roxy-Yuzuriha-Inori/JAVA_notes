## Vue动画封装

   1. 准备好样式：
      - 过渡
      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点
      - 动画
        @keyframes atguigu + v-enter-active + v-leave-active

   2. 使用```<transition>```包裹要过度的元素，里面只能包一个标签,可以嵌套
      如果没配置name属性，对应样式 v-enter    如果配置了name属性，对应样式 hello-enter
      appear 或 :appear='true' 一上来就有动画
      ```html
      <transition name="hello" appear>
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

    3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定唯一key值。
      ```html
      <transition-group name="hello" appear>
      	<h1 v-show="isShow" key='1'>你好啊！</h1>
      	<h1 v-show="isShow" key='2'>你好啊！</h1>
      </transition-group>
      ``` 

    4. 第三方动画库
      比如 import animate.css

