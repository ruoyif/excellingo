var mysql = require('./mysql');
var mysqlpool = require('./mysql_pool');
var ejs = require("ejs");
var express = require('express');


//studentid, and tutor name in session
//others in param
exports.giveFeedback= function(req, res) {
    //  console.log("hi there !!!!!!! " + req.query.tutor_id);
    var recording_id = req.query.recording_id;
    // if (typeof(recording_id) == "undefined") {
    //     recording_id = 16;
    // }
    console.log("hi there!!!!!");
        
    var getRecording = "Select * from recording WHERE recording_id =" + recording_id;
    // console.log("query for to recording to select from student:" + student_id );
          mysqlpool.handle_database(function(err,result){
            if(err){
              throw err;
            } else {
                var recordingId =  result[0].recording_id;
                var recordingLink = result[0].link;
                var comment = result[0].comment;
                res.render('pages/give_feedback' ,{
                    recording_id: recordingId,
                    recording_link: recordingLink,
                    comment: comment
        
                })

          }
    
        },getRecording);

    
    }
    

exports.feedbackSuccess= function(req, res) {
//  console.log("hi there !!!!!!! " + req.query.tutor_id);
var recording_id = req.query.recording_id;
var comment = req.query.comment;
console.log("hi there!!!!!");
    
var saveFeedback = "UPDATE recording SET comment= " +JSON.stringify(comment)+ ", is_graded = 1 WHERE recording_id =" + recording_id;
// console.log("query for to recording to select from student:" + student_id );
      mysqlpool.handle_database(function(err,result){
        if(err){
          throw err;
        } else {
      }

    },saveFeedback);
    res.render('pages/feedback_success');

}

