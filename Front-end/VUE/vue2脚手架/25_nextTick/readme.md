## $nextTick
# 作用：下一次dom更新完之后再执行
# 使用场景：当改变数据后，要基于更新后的dom进行某些操作时，要在nextTick的回调函数里面执行

``` js
场景： 点击这个事件会将isEdit = true开启一个输入框，希望能够开启输入框之后获取到焦点
问题： Vue会全部读完再进行渲染，也就是说一开始渲染就走了if上半部分开启了输入框，没有执行到获取焦点
	handleEdit(todo){
		if(todo.hasOwnProperty('isEdit')){
					todo.isEdit = true
				}else{
					// console.log('@')
					this.$set(todo,'isEdit',true)   
      		this.$refs.inputTitle.focus()    
				}
		},
  解决： $nextTick(()=>{})  里面的内容会等这次（这次就是相对之前来说下一次）更新完之后再执行  
        对回调函数里面的内容加一个定时器也能解决，但不推荐
	handleEdit(todo){
		if(todo.hasOwnProperty('isEdit')){
					todo.isEdit = true
				}else{
					// console.log('@')
					this.$set(todo,'isEdit',true)       
				}
				this.$nextTick(function(){
					this.$refs.inputTitle.focus()
				})
		},