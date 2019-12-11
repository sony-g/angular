var http = require('http'); // Import Node.js core module

var server = http.createServer(function (req, res) { //create web server
    if (req.url == '/') { //check the URL of the current request

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
  
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();


    } else if (req.url == "/listUsers") {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<html><body><p>This is List users Page.</p></body></html>');
        res.end();

    } 
   
});

server.listen(4100); //6 - listen for any incoming requests

