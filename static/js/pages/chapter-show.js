var id = location.href.split('?id=').pop();
$.get('/ajax/chapter?id=' + id,function(d){
	console.log(d)
	new Vue({
		el:'#app',
		data:d,
		methods:{
			readBook:function(id,book,index){
				location.href = "/reader?id="+id+'&book='+book+'&index='+index;
            },
            return:function(){
                console.log('aaa')
                window.history.back();
            }
		}
	});
},'json');

