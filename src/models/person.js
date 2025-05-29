const mongoose = require('mongoose');
const schema = mongoose.Schema;

var personSchema = new schema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    edad: {
        type: Number
    },
    email: {
        type: String
    }
},{
    collection: 'personas'
    // personas porque es lo que esta dentro de la base Person
});

module.exports = mongoose.model('Persona', personSchema);