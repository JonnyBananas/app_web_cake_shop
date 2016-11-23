var express = require('express');

var app = express();

app.set("view engine", "html");

app.use(express.static("public"));

app.get("/", function(solicitud, respuesta));
respuesta.render("index");

});

app.listen(3000);
console.log('Servidor listo! por el [puerto: 3000]');