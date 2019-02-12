const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const debug = require('debug');
const contactUs = require('./routes/contactUs');

mongoose.connect('mongodb://localhost/contactus')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));


app.use(express.json());
app.use('/api/contactus', contactUs);

const port = process.env.port || 3000;
app.listen(3000, () => console.log(`Listning on port ${port}....`));
