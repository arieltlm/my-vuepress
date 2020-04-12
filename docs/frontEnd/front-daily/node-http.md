
# node http/express
> 20190115

[[toc]]

## 1. node http起服务
### http起本地文件服务

新建文件夹，然后`npm init`

```bash
npm install http;
npm install fs;
```

```js
var http = require('http');
var fs = require('fs'); //引入文件读取模块
const request = require('request');

var documentRoot = '/Users/tlm/Documents/web-front/test/keep-study/node-test/';
//需要访问的文件的存放目录（项目所在位置的文件夹路径）

var server = http.createServer(function (req, res) {

    var url = req.url;
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html 

    var file = documentRoot + url;


    fs.readFile(file, function (err, data) {
        /*
            一参为文件路径
            二参为回调函数
                回调函数的一参为读取错误返回的信息，返回空就没有错误
                二参为读取成功返回的文本内容
        */
        if (err) {
            res.writeHeader(404, {
                'content-type': 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        } else {
            res.writeHeader(200, {
                'content-type': 'text/html;charset="utf-8"'
            });
            res.write(data); //将index.html显示在客户端
            res.end();

        }

    });



}).listen(8010);
console.log('服务器开启成功');

```
在项目目录下运行
```bash
node server.js
```
然后就可以像sublime text插件起的服务，或者是vscode中live-server起的服务一样了。
打开页面http://localhost:8010/index.html可用

### http代理服务

如果直接去访问`http://news-at.zhihu.com/api/4/news/before/20190115`接口就会报错，跨域，如此我们使用创建http代理（当然nginx代理也可以实现）:

安装http和request。

```js
//server.js
var http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 8010;

// 创建一个 API 代理服务
const apiServer = http.createServer((req, res) => {
    const url = 'http://news-at.zhihu.com/api/4' + req.url;
    const options = {
        url: url
    };

    function callback(error, response, body) {
        if (!error && response.statusCode === 200) {
            // 设置编码类型，否则中文会显示为乱码
            res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
            // 设置所有域允许跨域
            res.setHeader('Access-Control-Allow-Origin', '*');
            // 返回代理后的内容
            res.end(body);
        }
    }
    request.get(options, callback);
});
// 监听 8010 端口
apiServer.listen(port, hostname, () => {
    console.log(`接口代理运行在 http://${hostname}:${port}/`);
});
```

在项目目录下运行
```bash
node server.js
```

此时就有一个代理接口可用了，此时发起请求可用。

```js
// jquery发起ajax请求
$.ajax({
    url:'http://127.0.0.1:8010/news/before/20190115',
    success:function(res){
        console.log(res);
    },
    error:function(){

    }
})
```

> 说明:这两个服务一个是本地的文件，一个是代理接口，所以同时可同时写在一个server.js。同时启动服务可用。

***
> 疑问： 如果代理接口监听的是localhost就请求不存在（404）。而hostname为127.0.0.1的时候就可以用，是不能和本地服务一个端口吗？
> 果然，换了代理监听的端口不论是localhost还是127.0.0.1都可以请求成功。`url:'http://localhost:8011/news/before/20190115'`

***

>**疑问：** 为何我用express起的后台服务，代理转接却请求不到呢？要不404，要不就一直pending到fail。

> 问题解决：之前一直express一直用的8081，换了8088后，就可以了，（端口已经被占用了？）；
本地文件服务为`localhost:8010/index.html`, express起服务为`localhost:8080/list_user`,代理转接监听接口为`http://127.0.0.1:8011/list_user`,ajax请求时，url为`http://127.0.0.1:8011/list_user`,请求成功。（node server.js;node express/express_demo2.js)

### 基础知识补充
node http server中有个函数`http.createServer(function(req,res)){}`；
第一个参数是请求，第二个是响应。

一个非常简单的http服务：
```js
const apiServer = http.createServer((req, res) => {
   res.writeHead(200, {'Content-type' : 'text/html'});
   res.write('1414124');
   res.end('<p>Hello World</p>')
}).listen(8010);
```

请求头没有进行设置，只有响应，http状态码为200，{'Content-Type':'text-plain'}这个是个MIME标准的格式描述。 内容直接输出到页面上。

读取文件输出需要fs:
```js
var fs = require('fs'); //引入文件读取模块

const apiServer = http.createServer((req, res) => {
    fs.readFile('data1.js', function readData(err, data) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(data);
    });
}).listen(8010);
```

发送请求http.request(options[, callback])：
第一个参数为请求头选项，既主机名、域名、端口、请求方式、资源路径等等；

第二个参数为请求成功的回调函数；

> 这个节奏怎么成了node的http了，暂停，以后学习node时再继续研究吧。

## 3. express起服务

参考：[Node.js Express 框架](http://www.runoob.com/nodejs/nodejs-express-framework.html)

Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。

使用 Express 可以快速地搭建一个完整功能的网站。

Express 框架核心特性：

* 可以设置中间件来响应 HTTP 请求。

* 定义了路由表用于执行不同的 HTTP 请求动作。

* 可以通过向模板传递参数来动态渲染 HTML 页面。

```bash
npm install express --save

npm install body-parser --save //node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
npm install cookie-parser --save // 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
npm install multer --save // node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据
```

整篇实例都借鉴于菜鸟教程中的：


#### 基本写法：

```js
//express_demo.js 文件
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
```

#### 可以配置不同的路由来实现不同的接口url：`app.get('/list'...`

#### 静态文件调用使用`app.use(express.static('public'));`pubilc目录下面的图片、页面等静态文件就可以访问了

> 此时在public中的index.html中的请求，就可以不使用代理来访问express起的服务的接口了。当然代理转接也可以成功

```js
// http://localhost:8088/index.html
$.ajax({
    // url:'http://127.0.0.1:8011/list_user',
    url:'http://localhost:8088/list_user',
    type:'get',
    data: {a:11},
    success:function(res){
        console.log(res);
    },
    error:function(){

    }
})
```

图片目录为`/public/images/dog.jpg`
访问图片及`http://localhost:8088/images/dog.jpg`

#### 获取客户端请求的参数是`req.query`
#### 需注意在根目录下启动express，否则pubilc中的内容起不起来`node express/express_server.js`
#### app.get(),app.post()
post请求需要：

```js
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/process_post', urlencodedParser, function (req, res) {})
```

// 实践证明下面这句代码不写也是可以的
```js
app.get('/indexpost.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "indexpost.htm" );
})
```

#### 文件上传
```js
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

app.post('/file_upload', function (req, res) {

   console.log(req.files[0]);  // 上传的文件信息

   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully',
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})

```

#### cookie管理

```js
//  获取客户端的cookie信息
var express      = require('express')
var cookieParser = require('cookie-parser')
var util = require('util');

var app = express()
app.use(cookieParser())

app.get('/', function(req, res) {
    console.log("Cookies: " + util.inspect(req.cookies));
})

app.listen(8081)
```

> 后言： 由于在vue或者react的项目中都有webpack搭建的服务，所以转而想看一下这些服务稍微往前一点的使用，所以就进行了简单的查询，并跟着实践一遍，理解还不透彻，但是也算了解了。后面有时间深入node。。。