var windowWidth = $(window).width();
   if(windowWidth<320){
   	  windowWidth = 320;
   }
$(document).keydown(function (event) {
	if(event.keyCode===13){
		$('div.search-input__btn').click();
	}
});
new Vue({
	el: '#app_search',
	data: {
		screen_width:windowWidth,
   	  	double_screen_width:windowWidth*2,
		search:[],
		condition:true,
		empty:false
	},
	methods: {
		doSearch: function(e) {
			var keyword = $('#search_box').val();
			var _this = this;
			$.get('/ajax/search',{
				keyword:keyword
			},function(d){
				_this.condition = false;
				_this.search = d.books;
				if(_this.search.length == 0){
					_this.empty = true;
				}else{
					_this.empty = false;
				}
			},'json')
        },
        toBook:function(id){
			location.href="/book?id="+id;
		}
	}
});