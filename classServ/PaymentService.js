const axios = require("axios");

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token:
          "APP_USR-334491433003961-030821-12d7475807d694b645722c1946d5ce5a-725736327"
      }
    };
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
  }

  async createPaymentMercadoPago(name, price, unit, img) {
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;
    img= 'https://leojaneis-mp-ecommerce-nodejs.herokuapp.com/'+img.substring(1);
    const items = [
      {
        id: 1234,
        title: name,
        description: "Celular de Tienda e-commerce",
        picture_url: img,
        quantity: 1,
        unit_price: parseFloat(price)
      }
    ];

    const preferences = {
      items,
      external_reference: "leonardojaneis@gmail.com",
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_92801501@testuser.com",
        phone: {
          area_code: "55",
          number: "9852-98743"
        },
        identification: {
        type: "CPF",
        number: "19119119100"
      },
        address: {
          zip_code: "78134-190",
          street_name: "Insurgentes Sur",
          street_number: "1602"
        }
      },
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex"
          }
        ],
        installments: 6,
      },
      back_urls: {
        success: "https://leojaneis-mp-ecommerce-nodejs.herokuapp.com/success",
        pending: "https://leojaneis-mp-ecommerce-nodejs.herokuapp.com/pending",
        failure: "https://leojaneis-mp-ecommerce-nodejs.herokuapp.com/error"
      },
      notification_url: "https://webhook.site/ba74932a-af75-4806-8387-dae771cbe0af",
      auto_return: "approved"
    };

    try {
      const request = await axios.post(url, preferences, {
        headers: {
          "Content-Type": "application/json",
          "x-integrator-id": "dev_24c65fb163bf11ea96500242ac130004"
        }
      });
      return request.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = PaymentService;