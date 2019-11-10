

var mysql = require('./mysql');
var mysqlpool = require('./mysql_pool');
var ejs = require("ejs");
var express = require('express');

exports.recordingList = function(req, res){
    var student_id = 1;
    var recordingLists = "SELECT first_name as surname, last_name as lastname, level as levels from student where student_id ="+student_id+" ; SELECT recording.recording_id as recording, recording.submitted_date as time, class.description as description FROM recording inner join class on recording.class_id = class.class_id where recording.student_id ="+student_id+" and recording.is_graded = 0 order by recording.submitted_date ";
    console.log("Query is:" + recordingLists);
	mysqlpool.handle_database(function(err,result){
		if(err){
			throw err;
		}
		else 
		{
            var a = JSON.stringify(result[0]['n']);
            var firstName, lastName, languageLevel;
    
            //get the element from result.
            var recordingList = [], timeList = [], classDescriptions = [];
            firstName =result[0][0].surname;
            lastName =result[0][0].lastname;
            languageLevel =result[0][0].levels;
            
            Object.keys(result[1]).forEach(function(key) {
              recordingList[key] =result[1][key].recording;
              timeList[key] = result[1][key].time;
              classDescriptions[key] = result[1][key].description;
            });
    
            //create the variable for recordings
            var itemsView = [
                recording_id = recordingList,
                submitted_date = timeList,
                description = classDescriptions
            ]
            
            //create the data send to front-end
            recordingListView = [
                mySurname = firstName,
                myLastname = lastName,
                myLevel = languageLevel,
                myItems = itemsView
            ]

			res.render('pages/recording_list', {
                title: 'Express',
                recordingListView: recordingListView,
                itemsView: itemsView
      
              });
		}  
	},recordingLists);	
}



