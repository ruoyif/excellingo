
var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");

router.get('/:id', function (req, res, next) {
    var course_id = req.params.id;
    var student_id = req.session.islogin;
    
    var tutorInfo = "Select * from tutor where tutor_id in (select tutor_id from `order` where course_id ="+ course_id+ " AND student_id ="+ student_id+")";

    db.query(tutorInfo, function (err, rows) {
     
          if (err) {
              res.render('rate.ejs', {title: 'Rate Tutor', datas: []}); 
          } else {
              
              res.render('rate.ejs', {title: 'Rate Tutor', datas: rows});
          }
      })
  });

  router.post('/rated', function (req, res) {
    var id = req.body.tutor_id;
    var rating_value = req.body.rate;
    console.log(id);
    console.log(rating_value);
    var InsertRate = "Insert rating set tutor_id=" + id + ",rating_value=" +rating_value;

    db.query(InsertRate, function (err, rows) {
        if (err) {
            res.end('修改失败：' + err);
        } else {
            console.log('=77777777');
            res.redirect('/studentDashboard');
        }
    });
});

module.exports = router;