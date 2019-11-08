// MySQL数据库联接配置
var mysql      = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'exl'
});

function query(sql, callback) {
    pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query(sql, function (err, rows) {
            callback(err, rows);
            connection.release();//释放链接
        });
    });
}


exports.query = query;

function connectServer(){

    var client=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'123456',
        database:'exl'
    })

    return client;
}


function tutorLogin(client,email,callback){
    //client为一个mysql连接对象
    client.query('select * from tutor where email="'+email+'"',function(err,results,fields){
        if(err) throw err;

        callback(results);
    });
}

function studentLogin(client,email,callback){
    //client为一个mysql连接对象
    client.query('select * from student where email="'+email+'"',function(err,results,fields){
        if(err) throw err;

        callback(results);
    });
}

function insertStudent(client , email , password,callback){
    client.query('insert into student value(?,?,?,?,?,?,?,?,?,?)', [null,"Your first name","Your last name","native language","language to learn","level",null,null,email, password], function(err,result){
        if( err ){
            console.log( "error:" + err.message);
            return err;
        }
          callback(err);
    });
}

function insertTutor(client , email , password,callback){
    client.query('insert into tutor value(?,?,?,?,?,?,?,?,?,?,?)', [null,"Your first name","Your last name","language to teach","native language","level","teaching experience",null,null,email, password], function(err,result){
        if( err ){
            console.log( "error:" + err.message);
            return err;
        }
          callback(err);
    });
}

exports.connect = connectServer;
exports.studentLogin  = studentLogin;
exports.insertStudent = insertStudent;
exports.insertTutor = insertTutor;
exports.tutorLogin = tutorLogin;

