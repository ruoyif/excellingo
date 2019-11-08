var express = require('express');
var router = express.Router();
var usr=require('./db.js');

/* GET home page. */
router.get('/', function(req, res) {
  if(req.cookies.islogin){
      req.session.islogin=req.cookies.islogin;
  }
if(req.session.islogin){
  res.locals.islogin=req.session.islogin;
}
res.render('index', { title: 'HOME',test:res.locals.islogin});
});


router.route('/login')
  .get(function(req, res) {
      if(req.session.islogin){
          res.locals.islogin=req.session.islogin;
      }

      if(req.cookies.islogin){
          req.session.islogin=req.cookies.islogin;
      }
      res.render('login', { title: 'User login' ,test:res.locals.islogin});
  })
  .post(function(req, res) {
      client=usr.connect();
      
      if(req.body.identity=="tutor"){
          result=null;
          usr.tutorLogin(client,req.body.username, function (result) {
              if(result[0]===undefined){
                  res.send('NO Such a user');
              }else{
                  if(result[0].password===req.body.password){
                      req.session.islogin=result[0].tutor_id;
                      res.locals.islogin=req.session.islogin;
                      res.cookie('islogin',res.locals.islogin,{maxAge:60000});
                      res.redirect('/home');
                  }else
                  {
                      res.redirect('/login');
                  }
                 }
          });
      }else{
          result=null;
          usr.studentLogin(client,req.body.username, function (result) {
              if(result[0]===undefined){
                  res.send('No such a user');
              }else{
                  if(result[0].password===req.body.password){
                      req.session.islogin=result[0].student_id;
                      res.locals.islogin=req.session.islogin;
                      res.cookie('islogin',res.locals.islogin,{maxAge:60000});
                      res.redirect('/home');
                  }else
                  {
                      res.redirect('/login');
                  }
                 }
          });

      }
      
  });

router.get('/logout', function(req, res) {
  res.clearCookie('islogin');
  req.session.destroy();
  res.redirect('/');
});

router.get('/home', function(req, res) {
  if(req.session.islogin){
      res.locals.islogin=req.session.islogin;
  }
  if(req.cookies.islogin){
      req.session.islogin=req.cookies.islogin;
  }
  res.render('home', { title: 'Home', user: res.locals.islogin });
});

router.route('/reg')
  .get(function(req,res){
      res.render('reg',{title:'Register'});
  })
  .post(function(req,res) {
      client = usr.connect();
      if(req.body.identity=="tutor"){
          usr.insertTutor(client,req.body.username ,req.body.password2, function (err) {
              if(err) throw err;
              res.send('Sign up successful');})
      }else{
          usr.insertStudent(client,req.body.username ,req.body.password2, function (err) {
              if(err) throw err;
              res.send('Sign up successful');
        });
      }
      
  });

module.exports = router;

