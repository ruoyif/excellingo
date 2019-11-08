var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");

router.get('/', function (req, res, next) {
    var id = 1;

    db.query('select * from student where student_id = '+id, function (err, rows) {
      console.log('==========');
          if (err) {
              res.render('stu_profile.ejs', {title: 'Student Profile', datas: []}); 
          } else {
              res.render('stu_profile.ejs', {title: 'Student Profile', datas: rows});
          }
      })
  });

  router.get('/toUpdate/:id', function (req, res, next) {
    var id = req.params.id;

    db.query('select * from student where student_id = '+id, function (err, rows) {
      console.log('==========');
          if (err) {
              res.render('update_stu.ejs', {title: 'Student Profile', datas: []}); 
          } else {
              res.render('update_stu.ejs', {title: 'Student Profile', datas: rows});
          }
      })
  });

router.post('/update', function (req, res) {
    var id = req.body.id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var native_language = req.body.native_language;
    var language_to_learn = req.body.language_to_learn;
    var level = req.body.level;
    var email = req.body.email;
    var password = req.body.password;

    db.query("update student set first_name='" + first_name + "',last_name='" + last_name+ "',native_language='" 
    +native_language+ "',language_to_learn='" + language_to_learn+"',level='" + level+"',email='" + email+"',password='" + password+"' where student_id=" + id, function (err, rows) {
        if (err) {
            res.end('修改失败：' + err);
        } else {
            res.redirect('/stuProfile');
        }
    });
});

module.exports = router;
