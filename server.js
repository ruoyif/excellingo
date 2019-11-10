var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session=require('express-session');


var express = require('express');
var app = express();

var indexRouter = require('./routes/index.js');
// var usersRouter = require('./routes/users.js');
var stu_dashRouter = require('./routes/stu_dashboard.js');
var stu_profileRouter = require('./routes/stu_profile.js');
var tutor_profileRouter = require('./routes/tutor_profile.js');
var tutor_rateRouter = require('./routes/rate.js');
var tutorDashBoard = require('./routes/tu_dashboard.js');
var payment = require('./routes/payment.js');
var selectCourse = require('./routes/select_course.js');
var record= require('./routes/recording.js');
var feedback = require('./routes/feedback.js');
var course = require('./routes/course.js');
var recordingList = require('./routes/recording_list.js');
// set the view engine to ejs

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cookieParser("An"));
app.use(session({
  secret:'an',
  resave:false,
  saveUninitialized:true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/studentDashboard', stu_dashRouter);
app.use('/stuProfile', stu_profileRouter);
app.use('/tutorProfile', tutor_profileRouter);
app.use('/rateTutor',tutor_rateRouter);


app.get('/tutor_dashboard', tutorDashBoard.tutorDashboard);
app.get('/pay', payment.buyCourse);
app.get('/pay_success', payment.buySuccess);
app.get('/select_course', selectCourse.tutorSelectCourse);
app.get('/select_success', selectCourse.selectedSuccess);
app.get('/recording',record.recording);
app.get('/save_recording',record.selectedSuccess);
app.get('/give_feedback',feedback.giveFeedback);
app.get('/save_feedback',feedback.feedbackSuccess);
app.get('/course_info',course.course);
app.get('/recording_list',recordingList.recordingList);

app.get('/', function(req, res) {
     res.render('pages/profile');
});

// app.use(function(req, res, next) {
//      next(createError(404));
//    });

var port = 3029;
app.listen(port);

console.log(port + ' is the magic port');