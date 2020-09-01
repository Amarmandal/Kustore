require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

//Port
const port = process.env.PORT || 8000;

//Requiring routes from routes folder
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
// const stripeRoutes = require('./routes/stripePayment');
const paymentBRoutes = require('./routes/payment');

//DB Connections
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('DB CONNECTED');
})

//Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

//My Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
// app.use('/api', stripeRoutes);
app.use('/api', paymentBRoutes);

//Starting Server
app.listen(port, () => console.log(`App running at ${port}`));
