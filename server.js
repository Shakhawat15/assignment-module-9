const { readdirSync } = require('fs');
const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Application Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(helmet());

// Route Middleware
readdirSync('./routes').map((r) => {
    app.use('/api/v1', require(`./routes/${r}`))
})

// Server Port
const port = process.env.PORT || 8000;

// MongoDB URI
const mongoUri =  process.env.MONGO_URI;

mongoose.connect(mongoUri)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Running on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    });
