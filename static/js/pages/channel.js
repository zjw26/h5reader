var sex = location.href.split('/').pop();
$.get('/ajax/' + sex,function(d){
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