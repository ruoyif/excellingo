/*
'/courseInfo'
class_list {
    student_id;
    course_id;
    class_id;
    class_description;

}
*/


var mysql = require('./mysql');
var mysqlpool = require('./mysql_pool');
var ejs = require("ejs");
var express = require('express');

exports.course = function(req, res){
    var student_id = req.session.islogin;
    var course_id = req.query.course_id;
  
    if(student_id == null){
      res.redirect('/login');
    }
    
    var language_to_teach = "English";
	//var courseDetails = "SELECT course_name as course, price as price, description as description FROM course where course_id  = "+course_id+ "; SELECT class_id, video_link, description FROM class where course_id = "+course_id+" Order by created_date";
    var courseDetails = "SELECT course_name as course, price as price, description as course_description FROM course where course_id  = "+course_id+ "; SELECT class_id as class, video_link as video, description as class_description FROM class where course_id = "+course_id+" Order by created_date; SELECT tutor_id as tId, first_name as fName, last_name as lName, native_language as nLanguage, level as levels, teaching_experience as experience FROM exl.tutor where language_to_teach= 'English'";
    console.log("Query is:" + courseDetails);
	mysqlpool.handle_database(function(err,result){
		if(err){
			throw err;
		}
		else 
		{
            var a = JSON.stringify(result[0]['n']);
            var courseName, price, courseDescription;
    
            //get the element from result.
            var classId = [], videoLink = [], classDescription = [];
            courseName =result[0][0].course;
            price =result[0][0].price;
            courseDescription =result[0][0].course_description;

            
            Object.keys(result[1]).forEach(function(key) {
              classId[key] =result[1][key].class;
              videoLink[key] = result[1][key].video;
              classDescription[key] = result[1][key].class_description;
            });

            var tutor_firstName = [], tutor_lastName = [], tutor_idList = [], tutor_nLanguage = [], tutor_levels = [], tutor_experience = [];
            Object.keys(result[2]).forEach(function(key) {
                tutor_idList[key] =result[2][key].tId;
                tutor_firstName[key] = result[2][key].fName;
                tutor_lastName[key] = result[2][key].lName;
                tutor_nLanguage[key] = result[2][key].nLanguage;
                tutor_levels[key] = result[2][key].levels;
                tutor_experience[key] = result[2][key].experience;
              });
            
    
            //create the variable for student infor
            var classView = [
                class_id = classId,
                video_link = videoLink,
                description = classDescription,
                //tutor_id = tutor_idList,
                //first_name = tutor_firstName,
                //last_name = tutor_lastName,
            ]

            var tutorSelectionView =[
                tutor_id = tutor_idList,
                first_name = tutor_firstName,
                last_name = tutor_lastName,
                native_language = tutor_nLanguage,
                level = tutor_levels,
                teaching_experience = tutor_experience
            ]

            //create the data send to front-end
            courseInfoView = [
                myCourseName = courseName,
                myPrice = price,
                myDescription = courseDescription,
                myClassView = classView,
                myCourseId = course_id,
                myStudentId = student_id,
                myTutorSelectionView = tutorSelectionView
            ]

			res.render('pages/course_info', {
                title: 'Express',
                courseInfoView: courseInfoView,
                classView: classView,
                tutorSelectionView : tutorSelectionView
                
              });
		}  
	},courseDetails);	
}



