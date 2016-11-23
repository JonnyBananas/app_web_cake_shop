var express = require('express');
var bodyParser = require('body-parser');

// se crea un servidor
var app = express();

// se usa el body-Parser
app.use(bodyParser.urlencoded({ extended: false }))

// se declara el puerto
const PORT = 8090;

// se agrega ruta fija /assets en directorio /public
app.use('/', express.static(__dirname + '/public'));

// se agrega un engine llamado 'html', el cual es 'atpl'
app.engine('html', require('atpl').__express);

// se especifica que el 'view engine' es 'html' (declarado previamente)
app.set('view engine', 'html');

app.set('devel', false);

app.listen(PORT, function() {
    console.log('El servidor esta listo [PORT:8090]');

});