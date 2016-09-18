var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('scriptRunSystem', { title: '脚本运行系统',div: '结果结果结果' });
});

module.exports = router;
