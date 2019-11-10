var mysql = require('./mysql');
var mysqlpool = require('./mysql_pool');
var ejs = require("ejs");
var express = require('express');


//studentid, and tutor name in session
//others in param


exports.recording = function(req, res) {
  var course_id = req.query.course_id;
  var class_id = req.query.class_id;
  var student_id =  req.session.islogin;
  
  if(student_id == null){
    res.redirect('/login');
  }
  console.log(class_id);
  console.log(student_id)
  console.log(course_id);
  if (typeof(class_id) == "undefined") {
     class_id = 23;
  }
  console.log(class_id);
    // console.log(req.query.course_id);
    console.log("hi there!!!!!");
    
    var selectRecording = "Select * from course where course_id = "+ course_id +";SELECT * from class where course_id =" + course_id+"; Select * from recording where class_id = " + class_id +" and student_id = " + student_id+ " ORDER BY recording_id DESC LIMIT 1 ; Select * from class where class_id = " + class_id+"; Select tutor_id from `order`  where student_id = " +student_id+ " and course_id ="+ course_id;
    console.log("query for to recording to select from student:" + student_id );
      mysqlpool.handle_database(function(err,result){
        if(err){
          throw err;
        } else {

        //get the element from result.
        // console.log(result);
        var classId = [], classDes = [];
        var courseName, courseDes;
        courseName = result[0][0].course_name;
        courseDes = result[0][0].description;
        // console.log(courseName);
        Object.keys(result[1]).forEach(function(key) {
             classId[key] =result[1][key].class_id;
             classDes[key] = result[1][key].description;
           
         });
         var recording_id, recording_link, comment, isGraded;
         console.log(result[2][0]);
         console.log(result[2][0])
         if (typeof(result[2][0]) != "undefined") {
          recordingId =  result[2][0].recording_id;
          recordingLink = result[2][0].link;
          comment = result[2][0].comment;
          isGraded = result[2][0].is_graded;
         } else {
           recordingId = "null";
           recordingLink = "Input your recording link here!";
           comment = "No recording yet";
           isGraded = 0;

         }
         var curClassLink = result[3][0].video_link;
         var tutor_id = result[4][0].tutor_id;
         console.log(result[1]);
        //  console.log(result[4]);
        // create the variable for student infor
        
        // //create the data send to front-end
        var courseInfo = {
            course_id: course_id,
            course_name : courseName,
            course_descriotion : courseDes,
            tutor_id: tutor_id
        }
         var classInfo = {
            class_id : classId,
            class_description: classDes,
            
        }
        var recordingInfo = {
            recording_id : recordingId,
            recording_link : recordingLink,
            comment : comment,
            is_graded: isGraded
        }
        var curClassInfo = {
            curClass_link : curClassLink,
            curClass_id : class_id
        }
        // console.log(courseInfo);
        // console.log(classInfo);
        //  console.log(recordingInfo);
        res.render('pages/recording.ejs', {
          title: 'Express',
         courseInfo : courseInfo,
         class_info : classInfo,
        recording_info: recordingInfo,
        curClassInfo: curClassInfo


        });
        console.log('------------------------------------------------------------\n\n');
      }

    },selectRecording);

}

exports.selectedSuccess = function(req, res) {
  var student_id = req.session.islogin;
      var link = req.query.link;
      var course_id= req.query.class_id;
      var tutor_id = req.query.tutor_id;
      console.log('insert records');
      var insertCourse = "Insert recording (class_id, student_id, link, tutor_id) values ("+course_id+","+student_id+","+JSON.stringify(link)+","+tutor_id+")";
        mysqlpool.handle_database(function(err,result){
          if(err){
            throw err;
          } else {          
          console.log('---------------------------Success Insertion---------------------------------\n\n');
        }
  
      },insertCourse);
      res.render('pages/record_success');
  
  }


