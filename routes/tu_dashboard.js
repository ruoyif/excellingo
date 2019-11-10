var mysql = require('./mysql');
var mysqlpool = require('./mysql_pool');
var ejs = require("ejs");
var express = require('express');


//studentid, and tutor name in session
//others in param


exports.tutorDashboard = function(req, res) {


//  console.log("hi there !!!!!!! " + req.query.tutor_id);
    var tutor_id =  req.session.islogin;
    var name = req.session.fullName;
    if(tutor_id == null){
      res.redirect('/login');
  }
    var searchStudentsNum = "SELECT COUNT(distinct student_id) as num FROM `order` where tutor_id  = "+tutor_id +"; SELECT COUNT(*) as num FROM recording where tutor_id  = "+tutor_id+ " and is_graded =" + 0 +"; SELECT COUNT(*) as num FROM recording where tutor_id  = "+tutor_id+ " and is_graded =" + 1 + ";SELECT AVG(rating_value) as rate FROM rating where tutor_id  = "+tutor_id + ";SELECT o.tutor_id as tutor_id, s.student_id as stu_id, s.first_name as first_name, s.last_name as last_name, c.course_id as course_id, c.course_name  as course_name FROM student as s inner join `order` as o on o.tutor_id = "+ tutor_id +" and s.student_id = o.student_id inner join course as c on c.course_id = o.course_id";
    var tutorDashBoardInfo = [];
    console.log("query for to get students num from tutor:" + tutor_id );
      mysqlpool.handle_database(function(err,result){
        if(err){
          throw err;
        } else {
        var a = JSON.stringify(result[0]['n']);
        var stuNum, unCompleted, completed, rate;

        //get the element from result.
        var firstName = [], lastName = [], stuId = [], courseName = [], courseId = [];
        stuNum =result[0][0].num;
        unCompleted =result[1][0].num;
        completed =result[2][0].num;
        rate =result[3][0].rate;
        if (typeof(rate) == undefined || rate == null) {
          rate = 0;
        }
        console.log(rate);
        
        Object.keys(result[4]).forEach(function(key) {
          firstName[key] =result[4][key].first_name;
          lastName[key] = result[4][key].last_name;
          stuId[key] = result[4][key].stu_id;
          courseId[key] = result[4][key].course_id;
          courseName[key] = result[4][key].course_name;
        });

        //create the variable for student infor
        var stuInfo = [
          first_name= firstName,
          last_name = lastName,
          stu_Id = stuId,
          course_name = courseName,
          course_Id = courseId
        ]
        
        //create the data send to front-end
        tutorDashBoardInfo = [
          myStudentNum = stuNum,
          unCompletedNum = unCompleted,
          completedNum = completed,
          myRate = rate,
          myStuInfo = stuInfo,
        ]
        res.render('pages/tutor_dashboard', {
          title: 'Express',
          tutorDashBoardInfo: tutorDashBoardInfo,
          stuInfo : stuInfo

        });
        console.log(first_name[1]);
        console.log('------------------------------------------------------------\n\n');
      }

    },searchStudentsNum);

}

