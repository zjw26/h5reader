var windowWidth = $(window).width();
   if(windowWidth<320){
   	  windowWidth = 320;
   }
$(document).keydown(function (event) {
	if(event.keyCode===13){
		$('div.search-input__btn').click();
	}
});
if(!localStorage.getItem('tags')){
	localStorage.setItem('tags',JSON.stringify(['我的绝美女神老婆','复仇千金','盗墓笔记','斗破苍穹','诛仙']));
	var tags=JSON.parse(localStorage.getItem('tags'));

}else{
	tags=JSON.parse(localStorage.getItem('tags'));
}

new Vue({
	el: '#app_search',
	data: {
		screen_width:windowWidth,
   	  	double_screen_width:windowWidth*2,
		search:[],
		condition:true,
		empty:false,
		tags:tags
	},
	methods: {
		doSearch: function(e) {
			var keyword = $('#search_box').val();
			if(tags.indexOf(keyword)==-1){
				var li=$('<li class="u-tag"></li>').html(keyword);
				$('#tagList>div>ul').append(li);
				$('#search_box').val('');
				tags[tags.length]=keyword;
				localStorage.setItem('tags',JSON.stringify(tags));
			}
			
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