const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const uuid = require('uuid/v4');

exports.makePayment = (req, res) => {
    const {products, token} = req.body;
    // console.log("PRODUCTS", products);

    const total = products.reduce((sum, current) => sum + current.price, 0);

    const idempotencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
                amount: (total * 100),
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                // shipping: {
                //     name: token.card.name
                // }
        }, {idempotencyKey})
            .then(result => res.json(result))
            .catch(err => console.log(err));
    });

}
