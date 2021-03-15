var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000
// SDK de Mercado Pago
var mercadopago = require ('mercadopago');

// Configura credenciais
mercadopago.configure({
  access_token: 'APP_USR-6096a634-0b35-452c-94c9-a18adb8ffb15'
});

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.listen(port);
