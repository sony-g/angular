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

app.get('/getData', function(req, res) {
   // console.log("DB QUery",req);
dbConnection.query('SELECT * FROM stundent', function(err, rows, fields) {
  if (!err){
     console.log('The solution is: ', rows);
    res.send(rows); 
  }
    
  else{
       console.log('Error while performing Query.',err);
    dbConnection.end();
  }
   
});


});



//PUT

app.put('/postData', function (req, res) {
    
// connection.query('UPDATE employee SET id=?, studentName =?, email =?  where `id=?'
    console.log(req);
   dbConnection.query('UPDATE `stundent` SET  `studentName` =?, `email` =?  where `stundent`.`id`=?',[req.body.studentName, req.body.email,req.body.id], 
        function (error, rows, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(rows));
	});
});


//rest api to delete record from mysql database
app.delete('/deleteData', function (req, res) {
   console.log(req.body);
   dbConnection.query('DELETE FROM `stundent` WHERE `id`=?', [req.body.id], function (error, results, fields) {
	  if (error) throw error;
	  res.end('Record has been deleted!');
	});
});





app.post('/insertEmployeeData',(req,res)=>{
    data=req.body
    console.log(req.body);
   
    dbConnection.query('INSERT INTO employee(firstname,isMarried,gender,hobbies,remarks,status) values( ?, ?, ?,?,?,?)',
    [data.firstname, data.isMarried,data.gender,data.checkedArray,data.remarks,data.status],
   function (error, rows, fields) {
        
	  if (error) throw error;
	  res.send(rows);
	});
     
})





//rest api to update record into mysql database
app.put('/updateForEmployeeData', function (req, res) {
    console.log('testing')
   dbConnection.query('UPDATE `employee` SET `firstname`=?,`isMarried`=?,`remarks`=?,`status`=? where `employee`.`id`=?', 
                    [req.body.firstname,req.body.isMarried, req.body.remarks, req.body.status,req.body.id], function (error, rows, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(rows));
	});
});





//rest api to update record into mysql database
app.put('/deleteDataForEmployee', function (req, res) {
    console.log('testing')
   dbConnection.query('UPDATE `employee` SET `status`=? where `employee`.`id`=?', 
                    [req.body.status,req.body.id], function (error, rows, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(rows));
	});
});




// GET for Employee Details

app.get('/getDataForEmployeedetails', function(req, res) {
   // console.log("DB QUery",req);
dbConnection.query('SELECT * FROM employee', function(err, rows, fields) {
  if (!err){
     console.log('The solution is: ', rows);
    res.send(rows); 
  }
    
  else{
       console.log('Error while performing Query.',err);
    dbConnection.end();
  }
   
});


});




// GET for Countries

app.get('/getCountries', function(req, res) {
   // console.log("DB QUery",req);
dbConnection.query('SELECT * FROM countries', function(err, rows, fields) {
  if (!err){
     console.log('The solution is: ', rows);
    res.send(rows); 
  }
    
  else{
       console.log('Error while performing Query.',err);

  }
   
});


});



// GET for States


app.post('/getStates',(req,res)=>{
    data=req.body
    console.log(req.body);
   
    dbConnection.query("SELECT * FROM `states` WHERE `country_id`=?",[data.country_id],                      
   function (error, rows, fields) {
	  if (error) throw error;
	  res.send(rows);
	});
     
})



app.post('/getDistricts',(req,res)=>{
    data=req.body
    console.log(req.body);
   
    dbConnection.query("SELECT * FROM `districts` WHERE `state_id`=?",[data.state_id],                      
   function (error, rows, fields) {
	  if (error) throw error;
	  res.send(rows);
	});
     
})






//save login reactive form



app.post('/saveLoginReactiveForm',(req,res)=>{
    data=req.body
    console.log(req.body);  
    dbConnection.query("SELECT * FROM `reactive_employee` WHERE `email`=? AND `password`=?",[data.email,data.password],                     
	  function (error, rows, fields) {
	  if (error) throw error;
	  res.send(rows);
	});
	
})


app.post('/getUserDetails',(req,res)=>{
    data=req.body
    console.log(req.body);  
    dbConnection.query("SELECT * FROM `reactive_employee` WHERE `email`=?",
                       [data.email],                     
	  function (error, rows, fields) {
	  if (error) throw error;
	  res.send(rows);
	});
	
})
     


//app.post('/saveLoginReactiveForm',(req,res)=>{
//    data=req.body
//    console.log(req.body);
//   
//    dbConnection.query('INSERT INTO login_details(email,password) values( ?, ?)',
//    [data.email,data.password],
//   function (error, rows, fields) {
//	  if (error) throw error;
//	  res.send(rows);
//	});
//     
//})




//GET



//save reactive form
app.post('/saveReactiveForm',(req,res)=>{
    data=req.body
    console.log(req.body);
   
    dbConnection.query("SELECT COUNT(id) As count FROM `reactive_employee` WHERE `email`=?",[data.email],                   
   function (error, rows, fields) {     
        let results=JSON.parse(JSON.stringify(rows));
         res.send(rows);
	    if(results[0].count>0) {
         console.log(results[0].count);     
        }
      	else{         
          dbConnection.query('INSERT INTO reactive_employee(name,email,password,hobbies,country,state,district) values( ?, ?, ?,?,?,?,?)',
    [data.name,data.email,data.password,data.hobbies,data.country,data.state,data.district],
   function (error, rows, fields) {
	
              
	  
	});
       
      }
//	
})
     
})



//rest api to update record into mysql database
app.put('/updateForReactiveEmployee', function (req, res) {
    console.log('testing')
   dbConnection.query('UPDATE `reactive_employee` SET `name`=?,`email`=?,`password`=?,`hobbies`=?,`country`=?,`state`=?,`district`=? where `reactive_employee`.`id`=?', 
    [req.body.name,req.body.email, req.body.password, req.body.hobbies,req.body.country,req.body.state,req.body.district,req.body.id], function (error, rows, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(rows));
	});
});







//GET edit reactive data

app.get('/getreactiveData', function(req, res) {
   // console.log("DB QUery",req);
dbConnection.query('SELECT * FROM reactive_employee', function(err, rows, fields) {
  if (!err){
     console.log('The solution is: ', rows);
    res.send(rows); 
  }
    
  else{
       console.log('Error while performing Query.',err);
    dbConnection.end();
  }
   
});


});



//innerJoint


app.get('/getDataforjoints', function(req, res) {
    console.log("DB QUery",req);
    
dbConnection.query(`SELECT employee.id, employee.firstname, employee_history.remarks
FROM employee INNER JOIN 
employee_history ON employee.id=employee_history.history_id`,
function(err, rows, fields) {
  if (!err){
     console.log('The solution is: ', rows);
    res.send(rows); 
  }
    
  else{
       console.log('Error while performing Query.',err);
    dbConnection.end();
  }
   
});
});


//Left Joint


app.get('/getDataforleftjoints', function(req, res) {
    console.log("DB QUery",req);
    
dbConnection.query(`SELECT employee.id, employee.firstname, employee_history.remarks
FROM employee LEFT JOIN 
employee_history ON employee.id=employee_history.history_id`,
function(err, rows, fields) {
  if (!err){
     console.log('The solution is: ', rows);
    res.send(rows); 
  }
    
  else{
       console.log('Error while performing Query.',err);
    dbConnection.end();
  }
   
});
});



app.get('/getDataforrightjoints', function(req, res) {
    console.log("DB QUery",req);
    
dbConnection.query(`SELECT employee.id, employee.firstname, employee_history.remarks
FROM employee RIGHT JOIN 
employee_history ON employee.id=employee_history.history_id`,
function(err, rows, fields) {
  if (!err){
     console.log('The solution is: ', rows);
    res.send(rows); 
  }
    
  else{
       console.log('Error while performing Query.',err);
    dbConnection.end();
  }
   
});
});


//
//dbConnection.connect(function(err) {
//  if (err) throw err;
//  var sql = "SELECT employee.firstname AS user, employee_history.remarks AS favorite FROM users JOIN products ON users.favorite_product = products.id";
//  con.query(sql, function (err, result) {
//    if (err) throw err;
//    console.log(result);
//  });
//});



app.listen(4100);


