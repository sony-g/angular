var app = require('express')();
var https = require('https');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
var mysql = require('mysql');


var dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
 database : 'student_db'
    
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


dbConnection.connect(function(err){
                     
if(!err){
    console.log('db is connected')
} else{
    console.log('error')
}
});
                     


//GET






//
//dbConnection.query("SELECT employee.id,employee.firstname,employee.isMarried,employee_history.gender,employee_history .status FROM employee INNER JOIN employee_history ON employee.id =employee_history.history_id
//                   function (error, results, fields) {
//				if (!!error) {
//					console.log('erreur');
//				} else {
//					console.log(results);
//					// res.json(results);
//				};
//			});

//PUT

//app.put('/postData', function (req, res) {
//    
//    console.log(req);
//   dbConnection.query('UPDATE `stundent` SET  `studentName` =?, `email` =?  where `stundent`.`id`=?',[req.body.studentName, req.body.email,req.body.id], 
//        function (error, rows, fields) {
//	  if (error) throw error;
//	  res.end(JSON.stringify(rows));
//	});
//});












app.listen(4100);


