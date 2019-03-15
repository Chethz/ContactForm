const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const routes = express.Router();                

const Contact = mongoose.model('Contact', ({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}));

routes.get('/', async (req, res) => {
    const contact = await Contact.find().sort('firstName');
    res.send(contact);
});

routes.post('/', async (req, res) => {
    const {error} = validateForm(req.body);
    if (error) return res.status(400).send(error.details[0]);

    let contact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
  });

  contactus = await contact.save();
  res.send(contactus);
});

function validateForm(input){
    const schema = {
        firstName: Joi.string().trim().regex(/^[a-zA-Z]+$/).required(),
        lastName: Joi.string().trim().regex(/^[a-zA-Z]+$/).required(),
        email: Joi.string().trim().email().required()
    };
    return Joi.validate(input, schema);
}

module.exports = routes;