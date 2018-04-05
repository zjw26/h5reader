var params = location.href.split('?id=').pop();
var id=params.split('&book=')[0];
var book=params.split('&book=')[1].split('&index=')[0];
var index=params.split('&book=')[1].split('&index=')[1];
console.log(book,id,index);
var data;
$.get('ajax/chapter_data?id=' + id,function(d){
	console.log(d);
	data={
		data:d,
		bookId:book,
		isAdded:false
	}
	let shelf=JSON.parse(localStorage.getItem('shelf'))?JSON.parse(localStorage.getItem('shelf')):[];
	for(let i=0;i<shelf.length;i++){
		if(shelf[i].bookId==book){
			data.isAdded=true;
		}
	}
	new Vue({
		el:'#app',
		data:data,
		methods:{
			readBook:function(id){
				location.href = "/reader?id="+id;
            },
            rt:function(){
				if(this.isAdded==true){
					let ind;
					let shelf=JSON.parse(localStorage.getItem('shelf'));
					for(let i=0;i<shelf.length;i++){
						if(shelf[i].bookId==this.bookId){
							ind=i;
							console.log(ind);
						}
					}
					shelf[ind].chapterIndex=index;
					shelf[ind].chapterId=id;
					localStorage.setItem('shelf',JSON.stringify(shelf));
				}
                location.href="/";
			},
			menu:function(){
				location.href="/menu?id="+this.bookId;
			},
			next:function(){
				console.log('next');
				$.get('/ajax/chapter?id=' + book,function(d){
					var bookId=d.book;
					var chapterId=d.chapters[parseInt(index)+1].id;
					location.href = "/reader?id="+chapterId+"&book="+bookId+"&index="+(parseInt(index)+1);
				},'json');
			},
			prev:function(){
				console.log('prev');
				$.get('/ajax/chapter?id=' + book,function(d){
					var bookId=d.book;
					var chapterId=d.chapters[parseInt(index)-1].id;
					location.href = "/reader?id="+chapterId+"&book="+bookId+"&index="+(parseInt(index)-1);
				},'json');
			},
			addShelf:function(){
				this.isAdded=true;
			}
		},
		watch:{
			isAdded:function(newVal,oldVal){
				if(newVal==true){
					if(localStorage.getItem('shelf')!==null){
						var shelf=JSON.parse(localStorage.getItem('shelf'));
						shelf[shelf.length]={chapterId:id,bookId:book,chapterIndex:index}
						localStorage.setItem('shelf',JSON.stringify(shelf));
						console.log('aaa');
					}else{
						localStorage.setItem('shelf',JSON.stringify([{chapterId:id,bookId:book,chapterIndex:index}]))
					}
				}
			}
		}
	});
},'json');
setTimeout(function(){
	var txts = $('#fiction_container').html();
	console.log(data.data.chapter.isVip)
	var content=$('#fiction_container');
	if(data.data.chapter.isVip){
		content.html('该章节为付费内容，请到追书神器app进行阅读。');
	}else{
		txts=txts.replace(/\n+/g,'<br>&nbsp&nbsp');
		content.html(txts);	
	}
},800)

