const {Router} = require('express');
const router = Router();
const Produccion = require('../models/Produccion');
const Productora = require('../models/Productora');


router.post('/', async (req, res) => {
    try {
        const { nombre, resumen, directorId, productoraId, url_produccion} = req.body;

        const nuevaProduccion = new Produccion({
            nombre,
            resumen,
            Director: directorId,
            Productora: productoraId,
            url_produccion
        });
    const produccionGuardada = await nuevaProduccion.save();
    res.status(201).json(produccionGuardada);
    } catch (error) {
        console.error("Error al crear la producción:", error);
        res.status(500).json({ message: "Error al crear la producción" });
    }
});

router.get('/', async (req, res) => {
    try {
        const producciones = await Produccion.find()
        .populate('director', 'nombre')
        .populate('productora', 'nombre');
        res.json(producciones);
    } catch (error) {
        console.error("Error al obtener las producciones:", error);
        res.status(500).json({ message: "Error al obtener las producciones" });
    }
});

module.exports = router;
