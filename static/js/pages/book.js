var id = location.href.split('?id=').pop();
console.log(id);
$.get('/ajax/book?id=' + id,function(d){
	console.log(d)
	new Vue({
		el:'#app',
		data:d,
		computed: {
			cover() {
				return "http://statics.zhuishushenqi.com" + this.data.cover;
			},
			wordCount() {
				return this.data.wordCount > 10000 ? parseInt(this.data.wordCount / 10000) + '万' : this.data.wordCount;
			},
			serializeWordCount() {
				return this.data.serializeWordCount < 0 ? 0 : this.data.serializeWordCount;
			}
		},
		filters: {
			cover(cover){
				return "http://statics.zhuishushenqi.com" + cover;
			},
			setAvatar(avatar) {
				return "http://statics.zhuishushenqi.com" + avatar;
			},
			time(time){
				return time.split('T')[0];
			}
		},
		methods:{
			readBook:function(){
				location.href = "/reader"
			},
			menu:function(id){
				location.href="/menu?id="+id;
			},
			readNow:function(){
				var id = location.href.split('?id=').pop();
				$.get('/ajax/chapter?id=' + id,function(d){
					var bookId=d.book;
					var chapterId=d.chapters[0].id;
					location.href = "/reader?id="+chapterId+"&book="+bookId+"&index="+0;
				},'json');
				
			}
		}
	});
},'json');

