const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const input = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];

app.get('/api/forminput', (req, res) => {
    res.send(input);
});

app.post('/api/forminput', (req, res) => {
    const { error } = validateForm(req.body); 
    if (error) return res.status(400).send(error.details[0]);

    const inputf = {
        id: input.length + 1,
        name: req.body.name
      };
      input.push(inputf);
      res.send(inputf);
});

function validateForm(input){
    const schema = {
        firstName: Joi.string().trim().regex(/^[a-zA-Z]+$/).required()
    };
    return Joi.validate(input, schema);
}

const port = process.env.port || 3000;
app.listen(3000, () => console.log(`Listning on port ${port}....`));
