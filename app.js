const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./api/routes/user');
const pictureRoutes = require('./api/routes/picture');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


mongoose.connect( 
    process.env.MONGODB_URI,
    // 'mongodb://author:' +
    // process.env.DB_PASSWORD +
    // '@cluster0-shard-00-00-gifns.mongodb.net:27017,cluster0-shard-00-01-gifns.mongodb.net:27017,cluster0-shard-00-02-gifns.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
);

app.get('/', (req, res) => {
    res.send("it works")
});
app.use('/users', userRoutes);
app.use('/pictures', pictureRoutes);

module.exports = app;