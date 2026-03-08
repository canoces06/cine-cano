const mongoose = require('mongoose');  
const Director = require('./Director');
const Productora = require('./Productora');

const produccionSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    estado: { type: String, default: 'Activo' },
    resumen: { type: String },
    tipo: { type: String},
    genero: { type: String },
    url_produccion: { type: String },
    imagen_portada: { type: String },
    fecha_creacion: { type: Date, default: Date.now },
    fecha_modificacion: { type: Date, default: Date.now },

      Director: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Director',
        required: true
    },

    Productora: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },

},
{
    versionKey: false,
    collection: 'producciones', 
});

module.exports = mongoose.model('Produccion', produccionSchema);