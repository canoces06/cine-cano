const moongoose = require('mongoose');

const productoraSchema = new moongoose.Schema({
    nombre: {type: String, required: true},
    estado: { type: String, default: 'Activo' },
    descripcion: { type: String },
    slogan: { type: String },
    fecha_creacion: { type: Date, default: Date.now },
    fecha_modificacion: { type: Date, default: Date.now },
},
{
    versionKey: false,
    collection: 'productoras', 
});

module.exports = moongoose.model('Productora', productoraSchema);