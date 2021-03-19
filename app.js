var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000
var app = express();

const mercadopago = require("mercadopago");

mercadopago.configurations.setAccessToken("APP_USR-334491433003961-030821-12d7475807d694b645722c1946d5ce5a-725736327"); 

app.use(express.urlencoded({ extended: false})); //old true
app.use(express.json());

	

app.post("/create_preference", (req, res) => {

	

	let preference = {
		items: [{
			id: "1234",
			title: "Livrinho", 
			description: "Celular de Tienda e-commerce",
			picture_url: "https://agenciamoll.com.br/wp-content/uploads/2019/12/O-que-%C3%A9-URL-e-como-ela-Ajuda-na-sua-Estrat%C3%A9gia-Digital.jpg",
			unit_price: 1500,            
			quantity: 1,
		}],
		 payer: {
		 	name: "Lalo",
		 	surname: "Landa",
		 	email: "test_user_92801501@testuser.com",
		 	phone: {
		 			area_code: "55",
		 			number: 985298743
		 	},
		 	identification: {
		 		type: "CPF",
		 		number: "19119119100"
		 	},
		 	address: {
		 			street_name: "Insurgentes Sur",
		 			street_number: 1602,
		 			zip_code: "78134-190"
		 	},
		 },

		back_urls: {
			"success": "http://localhost:8080/feedback",
			"failure": "http://localhost:8080/feedback",
			"pending": "http://localhost:8080/feedback"
		},
		auto_return: 'approved',
		payment_methods: {
				excluded_payment_methods: [
					{
						id: "amex"
					}

				],
				installments: 6
		},
		notification_url: "https://webhook.site/ba74932a-af75-4806-8387-dae771cbe0af",
		external_reference: "leonardojaneis@gmail.com"
	
	


	};
	/*
	mercadopago.configure({
	integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
	});
	*/

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({id :response.body.id})
		}).catch(function (error) {
			console.log(error);
		});
});




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
