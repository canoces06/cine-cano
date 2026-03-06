const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    estado: { type: String, default: 'Activo' }, 
    fecha_creacion: { type: Date, default: Date.now },
    fecha_modificacion: { type: Date, default: Date.now },
},
{
    versionKey: false,
    collection: 'directores',

});    

module.exports = mongoose.model('Director', directorSchema);