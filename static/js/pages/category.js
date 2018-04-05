$.get('/ajax/category',function(d){
	new Vue({
	  el: '#app',
		data: d,
		computed:{
			isShowPageLoading(){
					if(d){
							return false;
					}else{
							return true;
					}
			}
		}
	});
},'json');