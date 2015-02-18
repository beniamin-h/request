var http = require('http');


http.createServer(function (req, res) {
  console.log(req.method, req.url);
  req.on('data', function(chunk){ });
  req.on('end', function(){ console.log('end'); res.end('') })
}).listen(9615);

