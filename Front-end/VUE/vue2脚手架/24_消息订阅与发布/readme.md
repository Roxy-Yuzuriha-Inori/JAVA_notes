## 消息订阅与发布
npm i pubsub-js

``` js
# 要收数据的子组件
import pubsub from 'pubsub-js'
mounted(){
//接收特定（事件名指明）消息的发布   a事件名，b要接受的数据
this.pubid = pubsub.subscribe('事件名'，(a,b)=>{})
},
//销毁
beforeDestroy(){
  //需要对应的变量名
  pubsub.unsubscribe(this.pubid)
}


# 要传递数据的子组件
import pubsub from 'pubsub-js'
method(){
  Myclick(){
pubsub.publish('事件名'，666)
  }
}
```
