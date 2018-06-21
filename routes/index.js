var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '心の石 Heart Stone-遊戲官網' , header: '系統主題'});
});

router.get('/system', function(req, res, next) {
  res.render('system', { title: '心の石 Heart Stone-遊戲官網' , header: '系統分析與設計'});
});

router.get('/technology', function(req, res, next) {
  res.render('technology', { title: '心の石 Heart Stone-遊戲官網' , header: '使用技術介紹'});
});

router.get('/tools', function(req, res, next) {
  res.render('tools', { title: '心の石 Heart Stone-遊戲官網' , header: '使用工具'});
});

router.get('/source', function(req, res, next) {
  res.render('source', { title: '心の石 Heart Stone-遊戲官網' , header: '資料來源'});
});

router.get('/code', function(req, res, next) {
  res.render('code', { title: '心の石 Heart Stone-遊戲官網' , header: '程式碼'});
});

router.get('/team', function(req, res, next) {
  res.render('team', { title: '心の石 Heart Stone-遊戲官網' , header: '組員及分工'});
});

/*router.get('/login', function(req, res, next) {
  res.render('login', { title: '心の石 Heart Stone'});
});*/

router.get('/game', function(req, res, next) {
  res.render('game', { title: '心の石 Heart Stone'});
});

module.exports = router;
