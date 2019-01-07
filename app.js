const Joi = require('joi');
const express = require('express');
const app = express();
const debug = require('debug');

app.use(express.json());

  const input = [
    { id: 1, firstname: 'Jam', lastname: 'Brown', email: 'sam@gmail.com' },  
    { id: 2, firstname: 'Joe', lastname: 'Rudex', email: 'joe@gmail.com' },  
    { id: 3, firstname: 'Rex', lastname: 'Kodi', email: 'rex@gmail.com' },  
  ];

app.get('/api/contactus', (req, res) => {
    res.send(input);
});

app.post('/api/contactus', (req, res) => {
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

const port = process.env.port || 3000;
app.listen(3000, () => console.log(`Listning on port ${port}....`));
