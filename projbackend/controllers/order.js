const { Order, ProductCart } = require("../models/order");
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');

const sendEmail = (info) => {
    const {email, name} = info;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    transporter.use("compile",hbs({
        viewEngine:{
           partialsDir:"./mail_template/",
           defaultLayout:""
       },
      viewPath:"./mail_template/",
     extName:".hbs"
 }));

    let mailOptions = {
        from: process.env.EMAIL,
        to: `${email}`,
        subject: 'KUstore - Purchase Confirmation',
        text: ' ',
        template: 'regis',
        context: {
            name,
            email
        } // send extra values to template

    }

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log('Error Occurs', err);
        }
    });
}

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "NO order found in DB"
                });
            }
            req.order = order;
            next();
        });
};

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to save your order in DB"
            });
        }
        sendEmail(req.profile);
        res.json(order);
    });
};

exports.getAllOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No orders found in DB"
                });
            }
            res.json(order);
        });
};

exports.getUserOrders = (req, res) => {
    const userId = req.profile._id;
    Order.find({user: {_id: userId}})
        .populate("user", "_id name")
        .exec((err, order) => {
            if(err) {
                return res.status(400).json({
                    error: "No orders found in DB"
                })
            }
            res.json(order);
        })
}

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
    Order.update(
        { _id: req.body.orderId },
        { $set: { status: req.body.status } },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "Cannot update order status"
                });
            }
            res.json(order);
        }
    );
};
