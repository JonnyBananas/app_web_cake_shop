var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var app = express();

// se crea un servidor
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

// se usa el body-Parser
app.use(bodyParser.urlencoded({ extended: false }))

// se declara el puerto
const PORT = 3000;

// se agrega ruta fija /assets en directorio /public
app.use('/', express.static(__dirname + '/public'));

// se agrega un engine llamado 'html', el cual es 'atpl'
app.engine('html', require('atpl').__express);

// se especifica que el 'view engine' es 'html' (declarado previamente)
app.set('view engine', 'html');

app.set('devel', false);

app.listen(PORT, function() {
    console.log('El servidor esta listo [PORT:3000]');

});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/comments', function(req, res) {
    fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        // NOTE: In a real implementation, we would likely rely on a database or
        // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
        // treat Date.now() as unique-enough for our purposes.
        var newComment = {
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        };
        comments.push(newComment);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comments);
        });
    });
});