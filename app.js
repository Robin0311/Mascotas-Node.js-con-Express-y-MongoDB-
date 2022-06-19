const express = require('express');
const app = express();
const port = 3000;

//para llamar una funcion de otro archivo al server
const home = require('./routes/home.js');
const pets = require('./routes/pets.js');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Mamemela!')
});
//app= configurar  y se usa .use
app.use('/home', home);
app.use('/pets', pets);
app.listen(port, () => {
    console.log(`Example app listening on port $(port)!`)
});