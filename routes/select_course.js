var mysql = require('./mysql');
var mysqlpool = require('./mysql_pool');
var ejs = require("ejs");
var express = require('express');


//studentid, and tutor name in session
//others in param


exports.tutorSelectCourse = function(req, res) {

  var tutor_id =  req.session.islogin;
  var name = req.session.fullName;

  if(tutor_id == null){
    res.redirect('/login');
}
    var selectCourse =  "SELECT * from course where course_id not in ( select course_id from tutor_courses where tutor_id =" + tutor_id+"); SELECT * from course where course_id in ( select course_id from tutor_courses where tutor_id =" + tutor_id+")";
    console.log("query for to get courses to select from tutor:" + tutor_id );
      mysqlpool.handle_database(function(err,result){
        if(err){
          throw err;
        } else {

        //get the element from result.
        console.log(result);
        var courseId = [], courseName = [], courseDes = [];
        Object.keys(result[0]).forEach(function(key) {
             courseId[key] =result[0][key].course_id;
             courseDes[key] = result[0][key].description;
            courseName[key] = result[0][key].course_name;
         });
         console.log(courseId);
         var courseId_already = [], courseName_already = [], courseDes_already = [];
         Object.keys(result[1]).forEach(function(key) {
              courseId_already[key] =result[1][key].course_id;
              courseName_already[key] = result[1][key].course_name;
              courseDes_already[key] = result[1][key].description;
          });
          console.log(courseId);

        //create the variable for student infor
        var to_select = {
          course_id : courseId,
          description : courseDes,
          course_name : courseName
        }
        var selected = {
          course_id : courseId_already,
          description : courseDes_already,
          course_name : courseName_already
        }
        //create the data send to front-end
        res.render('pages/select_course', {
          title: 'Express',
          to_select: to_select,
          selected: selected


        });
        console.log('------------------------------------------------------------\n\n');
      }

    },selectCourse);

}

exports.selectedSuccess = function(req, res) {

        var tutor_id =  req.session.islogin;
  
        var course_id= req.query.course_id;
        var insertCourse = "Insert tutor_courses (course_id, tutor_id) values (" +course_id +"," + tutor_id +")";
        console.log("query for to insert course from tutor:" + tutor_id );
          mysqlpool.handle_database(function(err,result){
            if(err){
              throw err;
            } else {

                
            //get the element from result.
            console.log('------------------------------------------------------------\n\n');
          }
    
        },insertCourse);
        res.render('pages/select_success');
    
    }


