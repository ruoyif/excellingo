
var express = require('express');
var router = express.Router();
//引入数据库包
var db = require("./db.js");

router.get('/', function (req, res, next) {
    var student_id = req.session.islogin;
    var name = req.session.fullName;
    if(student_id == null){
        res.redirect('/login');
    }
    var completed_course_num = "SELECT COUNT(*) as course_num FROM recording where student_id ="+student_id+" and is_graded = 1";
    var wait_grade_num = "SELECT COUNT(*) as grade_num FROM recording where student_id ="+student_id+" and is_graded = 0";
    var my_course = "select * from course where course_id in(select course_id from `order` where student_id =" +student_id+");";
    var recommend_courses = "select * from course where course_id not in(select course_id from `order` where student_id =" +student_id+");";

    db.query(completed_course_num,function(err, completed_course_out){
        db.query(wait_grade_num,function(err, wait_grade_num_out){
            db.query(my_course, function (err, my_course_out) {
                db.query(recommend_courses, function (err, recommend_courses_out){
                    console.log('==========');
                    if (err) {
                        res.render('stu_dashboard.ejs', {title: 'Express', name:name, numOfCplt:"Error", numOfWait:'error', myCourse:[], RecommendCourse:[]});  // this renders "views/stu_dashboard.html"
                    } else {
                        var numOfCplt_res = completed_course_out[0].course_num;
                        console.log(completed_course_out[0].course_num);
                        var numOfWait_res = wait_grade_num_out[0].grade_num;
                        res.render('stu_dashboard.ejs', {title: 'Express',name:name, numOfCplt:numOfCplt_res, numOfWait:numOfWait_res, myCourse:my_course_out, RecommendCourse:recommend_courses_out});
                    }
                }) 
              })
        })

    })
    
});


module.exports = router;