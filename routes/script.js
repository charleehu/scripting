var express = require('express');
var router = express.Router();

// var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
	var fileData = null;
	//读取配置文件setting.txt
	var data = require('fs').readFileSync('setting.conf', 'utf-8');
	fileData = JSON.parse(data);

    res.render('pages',fileData);
});

module.exports = router;
