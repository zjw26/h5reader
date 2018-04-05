const koa=require('koa');
const route = require('koa-route');
const koa_static = require('koa-static-server');
const path = require('path');
const serve = require('koa-static');
const querystring=require('querystring');
const service=require('./service/service.js');

const app=new koa();
var views = require('co-views');
var render = views('./view', {
  map: { html: 'ejs' }
  //模板渲染类型
});

const about =ctx=>{
    ctx.response.body = 'Hello World';
  };

app.use(route.get('/about', about));

//获取静态资源
const main = serve(path.join(__dirname));
app.use(main);

//使用代理
var proxy=require('koa-proxies');
const httpsProxyAgent = require('https-proxy-agent')
app.use(proxy('/api', {
  target: 'http://api.zhuishushenqi.com',    
  changeOrigin: true,
  // agent: new httpsProxyAgent('http://1.2.3.4:88'),
  rewrite: path => path.replace(/^\/api/, ''),
  logs: true
}))

app.use(proxy('/chapterapi', {
  target: 'http://chapter2.zhuishushenqi.com/chapter/http://vip.zhuishushenqi.com',    
  changeOrigin: true,
  // agent: new httpsProxyAgent('http://1.2.3.4:88'),
  rewrite: path => path.replace(/^\/chapterapi/, ''),
  logs: true
}))




//ejs模板加载
app.use(route.get('/ejs_test',async function(ctx){
  ctx.response.body = await render('test',{title:'title_test'});
  console.log('aa')
}));

app.use(route.get('/api_test',function(ctx){
  ctx.response.body=service.get_test_data();
}))

//模板
app.use(route.get('/',async function(ctx){
  ctx.response.set('Cache-Control','no-cache');
  ctx.response.body=await render('index');
}));

app.use(route.get('/female',async function(ctx){
  ctx.response.set('Cache-Control','no-cache');
  ctx.response.body=await render('female');
}))

app.use(route.get('/male',async function(ctx){
  ctx.response.set('Cache-Control','no-cache');
  ctx.response.body=await render('male');
}))

app.use(route.get('/category',async function(ctx){
  ctx.response.set('Cache-Control','no-cache');
  ctx.response.body=await render('category');
}))

app.use(route.get('/rank',async function(ctx){
  ctx.response.set('Cache-Control','no-cache');
  ctx.response.body=await render('rank');
}))

app.use(route.get('/search',async function(ctx){
  ctx.response.set('Cache-Control','no-cache');
  ctx.response.body=await render('search');
}))

app.use(route.get('/book',async function(ctx){
  console.log("book")
  ctx.response.set('Cache-Control','no-cache');
  let params=querystring.parse(this.req._parsedUrl.query);
  let bookId=params.bookId;
  ctx.response.body=await render('book',{bookId:bookId});
}))

app.use(route.get('/menu',async function(ctx){
  ctx.response.set('Cache-Control','no-cache');
  let params=querystring.parse(this.req._parsedUrl.query);
  let bookId=params.bookId;
  ctx.response.body=await render('chapter-show',{bookId:bookId});
}))


app.use(route.get('/reader',async function(){
	this.set('Cache-Control', 'no-cache');
	this.body = await render('reader');
}));

app.use(route.get('/more',async function(){
	this.set('Cache-Control', 'no-cache');
	this.body = await render('more');
}));
//接口
app.use(route.get('/ajax/category', function(ctx){
	ctx.response.set('Cache-Control', 'no-cache');
	ctx.response.body = service.get_category_data();
}));

app.use(route.get('/ajax/rank', function(ctx){
	ctx.response.set('Cache-Control','no-cache');
	ctx.response.body = service.get_rank_data();
}));

app.use(route.get('/ajax/index',async function(ctx){
  ctx.response.set('Cache-Control','no-cache');
  console.log('aa')
  var data={};
  var female=await service.female_data();
  var male=await service.male_data();
  var index=await service.get_index_data();
  console.log('222')
  data.female=JSON.parse(female);
  data.index=JSON.parse(index);
  data.male=JSON.parse(male);
  ctx.response.body=data;
}))

// app.use(route.get('/ajax/male',function(ctx){
//   ctx.response.set('Cache-Control','no-cache');
//   ctx.response.body=service.get_male_data();
// }))

// app.use(route.get('/ajax/female',function(ctx){
//   ctx.response.set('Cache-Control','no-cache');
//   ctx.response.body=service.get_female_data();
// }))

app.use(route.get('/ajax/search',async function(ctx){
  ctx.response.set('Cache-Control','no-cache');
  let params=querystring.parse(this.req._parsedUrl.query);
  console.log(params)
  let start=params.start;
  let end=params.end;
  let keyword=params.keyword;
  console.log(keyword)
  ctx.response.body=await service.get_search_data(keyword);
}))

app.use(route.get('/ajax/male',async function(ctx){
  ctx.response.set('Cache-Control', 'no-cache');
  console.log('male')
  var one=await service.get_male_one();
  var two= await service.get_male_two();
  var three=await service.get_male_three();
  var four=await service.get_male_four();
  var male={};
  male.one=JSON.parse(one);
  male.two=JSON.parse(two);
  male.three=JSON.parse(three);
  male.four=JSON.parse(four);
	ctx.response.body =male;
}));

app.use(route.get('/ajax/female',async function(ctx){
  ctx.response.set('Cache-Control', 'no-cache');
  var one=await service.get_female_one();
  var two= await service.get_female_two();
  var three=await service.get_female_three();
  var four=await service.get_female_four();
  var female={};
  female.one=JSON.parse(one);
  female.two=JSON.parse(two);
  female.three=JSON.parse(three);
  female.four=JSON.parse(four);
	ctx.response.body =female;
}));

app.use(route.get('/ajax/book',async function(ctx){
	ctx.response.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
	   id = "";
  }
  var data=await service.get_book_data(id);
  var reviews= await service.get_book_reviews(id);
  var recommend=await service.get_book_recommend(id);
  var book_data={};
  book_data.data=JSON.parse(data);
  book_data.reviews=JSON.parse(reviews);
  book_data.recommend=JSON.parse(recommend);
	ctx.response.body =book_data;
}));


app.use(route.get('/ajax/chapter',async function(ctx){
  ctx.response.set('Cache-Control', 'no-cache');
  var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
  var summary = await service.get_chapter_id(id);
  var chapter_id=JSON.parse(summary)[0]._id;

  ctx.response.body=await service.get_chapter_data(chapter_id);
}));

app.use(route.get('/ajax/chapter_data', async function(ctx){
	ctx.response.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
	   id = "";
  }
  
	ctx.response.body = await service.get_chapter_content_data(id);
}));


app.listen(3000);
console.log('koa start');