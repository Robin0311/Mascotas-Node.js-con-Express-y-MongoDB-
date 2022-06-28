const express = require('express');
const router = express.Router();
const mongodb = require('../database/mongodbUtils.js');
const ObjectId = require('mongodb').ObjectId;

//importar la clase pet en el string x2 .. para ir hacia atras
const Pet = require('../models/pet.js');


//manera para enviar los parametros
  router.get('/', function(req, res){
    const page = req.query.page ?? 1;// ?? se utiliza cuando no se menciona nada sobre donde empeazar o terminar
    const limit = req.query.limit ?? 3;//limit es el tamaño o largo

    let pets = mongodb.getPetsCollection();

    pets.find().skip((page -1) * limit).limit(page * limit).toArray((err, result) => {
        if (err) {
            res.sendStatus(500);
        } else if (result.length === 0) {
            res.sendStatus(404);
        } else {
            res.json(result);
        }
    });
   });

   //router es la ruta a seguir
   router.post('/', function(req, res){
    const name = req.body.name;
    const age = req.body.age;
    const species = req.body.species;
    const race = req.body.race;
    const picture = req.body.picture;
    const description = req.body.description;

    const pet = new Pet(name, age, species, race, picture, description);
    
    let pets = mongodb.getPetsCollection();

    pets.insertOne(pet);

    res.sendStatus('/');

   });
//parametros tipo.... ruta :name parametro de ruta
router.get('/:id', function(req, res){
    const id = req.params.id;

    const pets = mongodb.getPetsCollection();

    pets.find({ _id: new ObjectId(id) }).toArray((err, result) =>{
        if (err){
            res.sendStatus(500);
        } else if (result.length === 0) {
            res.sendStatus(404);
        } else {
            res.json(result);
        }
    });
});

router.delete('/:id', function(req, res){
    const id = req.params.id;

    const pets = mongodb.getPetsCollection();

    pets.deleteOne({ _id: new ObjectId(id) });
    res.sendStatus(200);
});

module.exports = router;