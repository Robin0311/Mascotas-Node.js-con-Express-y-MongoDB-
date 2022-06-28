const { MongoClient } = require('mongodb');
const url = "mongodb+srv://petsUser:petsPassword@atlascluster.3gtxdqr.mongodb.net/PETS?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true});

let pets;

function connect(callback) {
    client.connect(err => {
        console.log('MongoDB successfuly connected!');
        pets = client.db('PETS').collection('pets');
        return callback(err);
    });
}

function disconect(callback) {
    client.close();
    callback();
}

function getPetsCollection() {
    return pets;
}

module.exports = {
    connect,
    disconect,
    getPetsCollection,
};