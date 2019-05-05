const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/user');

// app.use((req, res) => {
//     res.status(200).json({
//         message: 'It works'
//     });
// });

app.use('/user', userRoutes);

module.exports = app;