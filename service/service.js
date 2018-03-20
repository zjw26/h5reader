//连通前后端数据，把后端提供的数据进行转换，变成json格式，传递给前端
const fs=require('fs');
console.log('service')
exports.get_test_data=function(){
    let content=fs.readFileSync('./mock/reader/test.json','utf-8');
    return content;
}

exports.get_rank_data = function(channelId) {
	var content = fs.readFileSync('./mock/rank.json', 'utf-8');
	return content;
}

exports.get_index_data=function(){
    let content=fs.readFileSync('./mock/home.json','utf-8');
    return content;
}

exports.get_category_data = function(channelId) {
	var content = fs.readFileSync('./mock/category.json', 'utf-8');
	return content;
}

exports.get_male_data = function(channelId) {
	var content = fs.readFileSync('./mock/channel/male.json', 'utf-8');
	return content;
}

exports.get_female_data = function(channelId) {
	var content = fs.readFileSync('./mock/channel/female.json', 'utf-8');
	return content;
}

// exports.get_book_data = function(id) {
// 	if (!id) {
// 		id = "18218";
//     }
//     console.log(id)
// 	if(fs.existsSync('./mock/book/' + id + '.json')){
// 	 	return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
// 	}else{
// 		return fs.readFileSync('./mock/book/18218.json', 'utf-8');
//     }
    
// }

exports.get_book_data = function(id) {
    //返回一个异步函数，当接收回调时，返回数据
    return new Promise(function(resolve
        , reject) {
        try {
            var request=require('request')
            request('http://127.0.0.1:3000/api/book/'+id, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                     resolve(body);
                }
            })
        } catch (e) {
            console.log(e);
        }
    });
 };

 exports.get_book_reviews = function(id) {
    //返回一个异步函数，当接收回调时，返回数据
    return new Promise(function(resolve
        , reject) {
        try {
            var request=require('request')
            request('http://127.0.0.1:3000/api/post/review/best-by-book?book='+id+'&limit=5', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                     resolve(body);
                }
            })
        } catch (e) {
            console.log(e);
        }
    });
 };

 exports.get_book_recommend = function(id) {
    //返回一个异步函数，当接收回调时，返回数据
    return new Promise(function(resolve
        , reject) {
        try {
            var request=require('request')
            request('http://127.0.0.1:3000/api/book/'+id+'/recommend', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                     resolve(body);
                }
            })
        } catch (e) {
            console.log(e);
        }
    });
 };







exports.get_chapter_id= function(id) {
    return new Promise(function(resolve
        , reject) {
        try {
            var request=require('request')
            request('http://127.0.0.1:8080/api/btoc?view=summary&book='+id, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                     resolve(body);
                }
            })
        } catch (e) {
            console.log(e);
        }
    });
}

exports.get_chapter_data= function(id) {
    return new Promise(function(resolve
        , reject) {
        try {
            var request=require('request')
            request('http://127.0.0.1:8080/api/btoc/'+id+'?view=chapters&channel=mweb', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                     resolve(body);
                }
            })
        } catch (e) {
            console.log(e);
        }
    });
}

exports.get_chapter_content_data= function(id) {
    return new Promise(function(resolve
        , reject) {
        try {
            var request=require('request')
            request('http://127.0.0.1:8080/chapterapi/chapter/'+id+'?cv=1495097622174', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                     resolve(body);
                }
            })
        } catch (e) {
            console.log(e);
        }
    });
}



// exports.get_search_data = function(start, end, keyword) {
//     //返回一个异步函数，当接收回调时，返回数据
//     return new Promise(function(resolve
//         , reject) {
//         try {
//             const http = require('http');
//             // 该模块的作用是把一个object对象，转换为http的查询参数
//             const qs = require('querystring');
//             let data = {
//                 s: keyword,
//                 start: start,
//                 end: end
//             };
//             let query_str = qs.stringify(data);
//             let options = {
//                 hostname: 'dushu.xiaomi.com',
//                 port: 80, //显式指定
//                 path: '/store/v0/lib/query/onebox?' + query_str,
//                 method: 'GET'
//             };
//             //http请求
//             const req_obj = http.request(options, (_res) => {
//                 let content = '';
//                 // let size = 0;
//                 // let chunks = [];
//                 _res.setEncoding('utf8'); //设置返回的数据格式
//                 _res.on('data', (chunk) => {
//                     // console.log(`响应主体: ${chunk}`);
//                     // size += chunk.length;
//                     // chunks.push(chunk);
//                     content += chunk;
//                 });
//                 _res.on('end', (e) => {
//                     // let content = Buffer.concat(chunks, size);
//                     console.log('响应中已无数据。');
//                     console.log('########　内容　 ########');
//                     console.log(content);
//                     console.log('######## 内容　########');
//                     resolve(content);
//                     // cb(null, content); //callback有两个参数err和返回的内容
//                 });
//             });
//             //请求错误处理
//             req_obj.on('error', (e) => {
//                 console.error(`请求遇到问题: ${e.message}`);
//             });
//             // req_obj.write()
//             // 使用 http.request() 必须总是调用 req.end() 来表明请求的结束，即使没有数据被写入请求主体。
//             req_obj.end();
//         } catch (e) {
//             console.log(e);
//         }
//     });
//  };

exports.get_search_data = function( keyword) {
    //返回一个异步函数，当接收回调时，返回数据
    return new Promise(function(resolve
        , reject) {
        try {
            const http = require('http');
            // 该模块的作用是把一个object对象，转换为http的查询参数
            const qs = require('querystring');
            let data = {
                query: keyword
                // start: start,
                // end: end
            };
            let query_str = qs.stringify(data);
            // jQuery.get('http://127.0.0.1:3000/api/book/fuzzy-search?query='+query_str,function(data){
            //     console.log(data);
            // });
            console.log('aaa',query_str)
            var request=require('request')
            let options = {
                hostname: '127.0.0.1:3000/api/',
                path: '/book/fuzzy-search?' + query_str,
                method: 'GET'
            };
            request('http://127.0.0.1:3000/api/book/fuzzy-search?'+query_str, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                     // Show the HTML for the baidu homepage.
                     resolve(body);
                }
            })
            
            // //http请求
            // const req_obj = http.request(options, (_res) => {
            //     let content = '';
            //     console.log(_res)
            //     // let size = 0;
            //     // let chunks = [];
            //     _res.setEncoding('utf8'); //设置返回的数据格式
            //     _res.on('data', (chunk) => {
            //         // console.log(`响应主体: ${chunk}`);
            //         // size += chunk.length;
            //         // chunks.push(chunk);
            //         content += chunk;
            //     });
            //     _res.on('end', (e) => {
            //         // let content = Buffer.concat(chunks, size);
            //         console.log('响应中已无数据。');
            //         console.log('########　内容　 ########');
            //         console.log(content);
            //         console.log('######## 内容　########');
            //         resolve(content);
            //         // cb(null, content); //callback有两个参数err和返回的内容
            //     });
            // });
            // //请求错误处理
            // req_obj.on('error', (e) => {
            //     console.error(`请求遇到问题: ${e.message}`);
            // });
            // // req_obj.write()
            // // 使用 http.request() 必须总是调用 req.end() 来表明请求的结束，即使没有数据被写入请求主体。
            // req_obj.end();
        } catch (e) {
            console.log(e);
        }
    });
 };