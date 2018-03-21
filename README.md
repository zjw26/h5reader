# h5reader
基于h5的书城WebApp.使用 node.js 模拟后台数据，无实际后台，完全的前后端分离开发。调用第三方api（http://api.zhuishushenqi.com） 追书神器api抓取数据到页面上进行渲染。

## 技术栈
vue.js + zepto.js + ejs +  node.js + koa2 + ES5/6 + css

## 源码地址
[https://github.com/zjw26/h5reader](https://github.com/zjw26/h5reader) 

## 书城地址
[http://120.79.254.18/](http://120.79.254.18/)

电脑端推荐用新版谷歌或火狐浏览器，手机端建议用17年后的浏览器版本。


## 项目运行

```   
cd 项目目录

npm install 或 cnpm install（淘宝镜像）

node app.js

项目将运行在 127.0.0.1:3000
```

## 说明

- 还存在一些需要进行优化的细节问题，今后会做一下优化。
- 如果觉得做的还行，对您有所帮助，欢迎“star”一下。

## 开发中遇到的问题


- #### 使用localstorage存数组
```
localstorage只能存字符串，存数组需要用JSON.stringify()方法转成字符串。
拿出数据是用JSON.parse（）方法转成数组
```
    
- #### 调用第三方api接口时跨域的问题
```
1. 本地使用koa-proxies
//使用代理
  var proxy=require('koa-proxies');
  const httpsProxyAgent = require('https-proxy-agent')  
  app.use(proxy('/api', {
  target: 'http://api.zhuishushenqi.com',    
  changeOrigin: true,
  rewrite: path => path.replace(/^\/api/, ''),
  logs: true
}))
2.在服务器端用nginx进行反向代理
在nginx配置文件中加
 location /api/ {
        proxy_pass http://api.zhuishushenqi.com/;
 }

2. 调用接口时只需要以`/api`开头就可以
```
        

## 部分截图


![书架](https://github.com/zjw26/h5reader/blob/master/static/img/shelf.png)
![首页](https://github.com/zjw26/h5reader/blob/master/static/img/index.png)
![搜索](https://github.com/zjw26/h5reader/blob/master/static/img/search.png)
![书籍详情](https://github.com/zjw26/h5reader/blob/master/static/img/bookInfo.png)
![阅读器](https://github.com/zjw26/h5reader/blob/master/static/img/reader.png)
![阅读器2](https://github.com/zjw26/h5reader/blob/master/static/img/reader2.png)




















