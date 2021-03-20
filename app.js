var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

const PaymentController = require("./controller/PaymentController");
const PaymentService = require("./classServ/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());

app.use(express.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get("/success", (req, res) => {
  res.render("success", req.query);
});

app.get("/error", (req, res) => {
  res.render("error");
});

app.get("/pending", (req, res) => {
  res.render("pending");
});

app.post("/payment/new", (req, res) =>
  PaymentInstance.getMercadoPagoLink(req, res)
);

app.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
