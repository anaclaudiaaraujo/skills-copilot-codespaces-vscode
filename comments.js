// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Create web server
http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname;
    switch (path) {
        case '/':
            fs.readFile(__dirname + '/index.html', function(err, data) {
                if (err) return send404(res);
                res.writeHead(200, { 'Content-Type': path == 'json.js' ? 'text/json' : 'text/html' });
                res.write(data, 'utf8');
                res.end();
            });
            break;
        case '/comments':
            if (req.method == 'POST') {
                var data = '';
                req.on('data', function(chunk) {
                    data += chunk;
                });
                req.on('end', function() {
                    var params = qs.parse(data);
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.write('You\'ve sent: ' + params['message']);
                    res.end();
                });
            }
            break;
        default:
            send404(res);
    }
}).listen(3000);

function send404(res) {
    res.writeHead(404);
    res.write('404');
    res.end();
}

console.log('Server running at http://
