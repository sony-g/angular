
var fs = require("fs");
//Syncronous

var fileContent = fs.readFileSync('sync.js','utf8');
console.log(fileContent);
console.log("something else");

 
// Asyncronous

fs.readFile('async.js','utf8',function(err,data){
    if(!err) {
       console.log(data);
    }
});
console.log("something else Async");



// Asyncronous & Await


function myFunction() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('sony');
    }, 2000);
  });
}

async function msg() {
  const msg = await myFunction();
  console.log('Message:', msg);
}

msg(); 



//Call Back Functions

function fetchData(x,y,z) {
	console.log("Hello");
    const a = x+y+z;
     console.log(a);
}

function addData(x,y,z) {
	console.log("Hello");
    const b = x+y+z;
      console.log(b);
}

function callBackFun(x, ff , gg) {
	console.log("callBackFun");
    fetchData(5,10,10);
    addData(10,10,10);
    
      
    return 1;
}

var res  = callBackFun(10, fetchData , addData)
console.log("msg::",res);







//var fs = require('fs');
//
//var data = {}
//data.table = []
//for (i=0; i <26 ; i++){
//   var obj = {
//       id: i,
//       square: i + i
//   }
//   data.table.push(obj)
//}
//fs.writeFile ("myjsonfile.json", JSON.stringify(data), function(err) {
//    if (err) throw err;
//    console.log(data);
//    var jsonData = data;
//    }
//);








