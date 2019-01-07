const Joi = require('joi');
const express = require('express');
const app = express();
const debug = require('debug');
const contactUs = require('./routes/contactUs');

app.use(express.json());
app.use('/api/contactus', contactUs);

const port = process.env.port || 3000;
app.listen(3000, () => console.log(`Listning on port ${port}....`));
