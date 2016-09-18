
var express = require('express');
var router = express.Router();
var url = require('url');
var util = require('util');
var process = require("child_process")
var result = null;
var fileName = null;
var scriptInputPara = null;
var id = null;
var fileData = null;
var socketName = null;
var fs = require('fs');

router.get('/', function(req, res) {
    //获取脚本运行参数和id
	var arg = url.parse(req.url, true).query;
    id = parseInt(arg.id);
    socketName = arg.socketName;
    scriptInputPara = arg.para;
    console.log( id );    
    console.log( scriptInputPara );

    //读取文件获得脚本路径
    var data = fs.readFileSync('setting.conf', 'utf-8');
    fileData = JSON.parse(data);
    fileName = fileData.scriptList[id-1].path;

    //建立websocket连接
    socket = io.connect('http://localhost:3333');
    //收到server的连接确认
    socket.on('open',function(json){
        myName = json.name; 
    });

 //    //脚本运行
 //    process.exec(fileName+" "+scriptInputPara,function(err, stdout , stderr ) {
 //    	result  = stdout;
 //    	console.log( stdout );

 //        socket.emit('message'+socketName,{m:nameI});
 //        // res.end(result);

	// });
    res.end('ok');
});

module.exports = router;
