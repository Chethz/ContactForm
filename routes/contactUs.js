const express = require('express');
const routes = express.Router();

const input = [
    { id: 1, firstname: 'Jam', lastname: 'Brown', email: 'sam@gmail.com' },  
    { id: 2, firstname: 'Joe', lastname: 'Rudex', email: 'joe@gmail.com' },  
    { id: 3, firstname: 'Rex', lastname: 'Kodi', email: 'rex@gmail.com' },  
  ];

routes.get('/', (req, res) => {
    res.send(input);
});

routes.post('/', (req, res) => {
    const { error } = validateForm(req.body); 
    if (error) return res.status(400).send(error.details[0]);

    const inputf = {
        id: input.length + 1,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        emai: req.body.email

      };
      input.push(inputf);
      res.send(inputf);
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