var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");

router.get('/', function (req, res, next) {
    var id = 1;
    db.query('select * from tutor where tutor_id = '+id, function (err, rows) {
      console.log('==========');
          if (err) {
              res.render('tutor_profile.ejs', {title: 'Tutor Profile', datas: []}); 
          } else {
              res.render('tutor_profile.ejs', {title: 'Tutor Profile', datas: rows});
          }
      })
  });

  router.get('/toUpdate/:id', function (req, res, next) {
    var id = req.params.id;

    db.query('select * from tutor where tutor_id = '+id, function (err, rows) {
      console.log('==========');
          if (err) {
              res.render('update_tutor.ejs', {title: 'Edit Profile', datas: []}); 
          } else {
              res.render('update_tutor.ejs', {title: 'Edit Profile', datas: rows});
          }
      })
  });

router.post('/update', function (req, res) {
    var id = req.body.id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var language_to_teach = req.body.language_to_teach;
    var native_language = req.body.native_language;
    var level = req.body.level;
    var teaching_experience = req.body.teaching_experience;
    var email = req.body.email;
    var password = req.body.password;

    db.query("update tutor set first_name='" + first_name + "',last_name='" + last_name+ "',language_to_teach='" 
    +language_to_teach+ "',native_language='" + native_language+"',level='" + level+"',email='" + email+"',password='" + password+"',teaching_experience='" + teaching_experience+"' where tutor_id=" + id, function (err, rows) {
        if (err) {
            res.end('修改失败：' + err);
        } else {
            res.redirect('/tutorProfile');
        }
    });
});

module.exports = router;
