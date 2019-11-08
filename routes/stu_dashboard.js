
var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");

var completed_course_num = "SELECT COUNT(*) FROM recording where student_id  = 1 and is_graded = 1";
var wait_grade_num = "SELECT COUNT(*) FROM recording where student_id  = 1 and is_graded = 0";
var my_course = "select * from course where course_id in(select course_id from `order` where student_id = 1);";
var recommend_courses = "SELECT * FROM course order by course_id desc limit 0,10";

router.get('/', function (req, res, next) {
    db.query(completed_course_num,function(err, completed_course_out){
        db.query(wait_grade_num,function(err, wait_grade_num_out){
            db.query(my_course, function (err, my_course_out) {
                db.query(recommend_courses, function (err, recommend_courses_out){
                    console.log('==========');
                    if (err) {
                        res.render('stu_dashboard.ejs', {title: 'Express', numOfCplt:"Error", numOfWait:'error', myCourse:[], RecommendCourse:[]});  // this renders "views/stu_dashboard.html"
                    } else {
                        var numOfCplt_res = JSON.stringify(completed_course_out);
                        var numOfWait_res = JSON.stringify(wait_grade_num_out);
                        res.render('stu_dashboard.ejs', {title: 'Express', numOfCplt:numOfCplt_res, numOfWait:numOfWait_res, myCourse:my_course_out, RecommendCourse:recommend_courses_out});
                    }
                }) 
              })
        })

    })
    
});


module.exports = router;