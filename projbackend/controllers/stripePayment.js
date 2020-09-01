// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const uuid = require('uuid/v4');

// exports.makePayment = (req, res) => {
//     const {products, token} = req.body;

//     const total = products.reduce((sum, current) => sum + current.price, 0);

//     const idempotencyKey = uuid();

//     return stripe.customers.create({
//         email: token.email,
//         source: token.id
//     }).then(customer => {
//         stripe.charges.create({
//             amount: (total * 100),
//             currency: 'usd',
//             customer: customer.id,
//             receipt_email: token.email,
//             shipping: {
//                 name: token.card.name,
//                 address: {
//                     country: token.card.address_country,
//                     line1: token.card.address_line1,
//                     postal_code: token.card.address_zip,
//                     state: token.card.address_state,
//                 },

//             }
//         }, {idempotencyKey})
//             .then(result => res.json(result))
//             .catch(err => console.log(err));
//     });

// }
