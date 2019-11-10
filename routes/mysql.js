var mysql  = require('mysql');  
 
exports.connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : 'fanruoyi811',     
//   port: '3306',                   
  database: 'exl',
  multipleStatements: true
  // multipleStatements: true
}); 

