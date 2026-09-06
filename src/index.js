require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./features/user/user.route.js');
const productRoutes = require('./features/product/product.route.js');
app.use(express.json());
//
app.use('/users', userRoutes);
app.use('/products', productRoutes);
// app.use('/comments', commentRoutes)


/// handle invalid routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Invalid route", success: false });
});

/// handle global errors
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message, success: false });
});

app.listen(3000, () => console.log('🚀 Server running on port 3000'));
