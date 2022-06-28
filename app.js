const express = require('express');//intalar express
const path = require('path');
const mongodb = require('./database/mongodbUtils.js');
const app = express();
const port = 3000;

//para llamar una funcion de otro archivo al server
const home = require('./routes/home.js');
const pets = require('./routes/pets.js');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));//parcel para leer los datos del boy extended acepta todos los cambios 

mongodb.connect(err => {
    if (err) console.error(err);
    });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/home.html'));
});
//app= configurar  y se usa .use API
app.use('/home', home);
app.use('/pets', pets);

app.listen(port, () => {
    console.log(`Example app listening on port $(port)!`)
});//lo ultimo para q diga q si funciona