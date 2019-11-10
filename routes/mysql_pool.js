var ejs = require('ejs');
var mysql = require('mysql');


const pool = mysql.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'fanruoyi811',
	database : 'exl',
	multipleStatements: true,
	connectionLimit: 100
});

exports.handle_database = function(callback, sqlQuery) {
   
    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }  

        console.log('connected as id ' + connection.threadId);
		// console.log(sqlQuery);
        connection.query(sqlQuery,function(err,rows){
            console.log(sqlQuery);
            console.log("result!!!!!!!!");
            connection.release();
            // console.log(rows);
            if(!err) {
				callback(err, rows);
                // res.json(rows);
            }    
            // console.log(rows);      
		});
        // console.log(callback);
         console.log("----------");
        connection.on('error', function(err) {      
               res.json({"code" : 100, "status" : "Error in connection database"});
              return;    
        });
  });
}
