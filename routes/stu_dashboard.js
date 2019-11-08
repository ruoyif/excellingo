
var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");

router.get('/', function (req, res, next) {
    var student_id = req.session.islogin;
    var name = req.session.fullName;
    console.log(student_id);
    if(student_id == null){
        res.redirect('/login');
    }
    console.log("8888888");
    var name = req.session.fullName;
    console.log(name);
    var completed_course_num = "SELECT COUNT(*) FROM recording where student_id ="+student_id+" and is_graded = 1";
    var wait_grade_num = "SELECT COUNT(*) FROM recording where student_id ="+student_id+" and is_graded = 0";
    var my_course = "select * from course where course_id in(select course_id from `order` where student_id =" +student_id+");";
    var recommend_courses = "SELECT * FROM course order by course_id desc limit 0,10";
    db.query(completed_course_num,function(err, completed_course_out){
        db.query(wait_grade_num,function(err, wait_grade_num_out){
            db.query(my_course, function (err, my_course_out) {
                db.query(recommend_courses, function (err, recommend_courses_out){
                    console.log('==========');
                    if (err) {
                        res.render('stu_dashboard.ejs', {title: 'Express', name:name, numOfCplt:"Error", numOfWait:'error', myCourse:[], RecommendCourse:[]});  // this renders "views/stu_dashboard.html"
                    } else {
                        var numOfCplt_res = JSON.stringify(completed_course_out);
                        console.log(numOfCplt_res);
                        var numOfWait_res = JSON.stringify(wait_grade_num_out);
                        res.render('stu_dashboard.ejs', {title: 'Express',name:name, numOfCplt:numOfCplt_res, numOfWait:numOfWait_res, myCourse:my_course_out, RecommendCourse:recommend_courses_out});
                    }
                }) 
              })
        })

    })
    
});


module.exports = router;