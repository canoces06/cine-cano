const {Router} = require('express');
const router = Router();
const Produccion = require('../models/Produccion');
const Productora = require('../models/Productora');

router.post('/', async (req, res) => {
    try {
        const { nombre, resumen, tipo, genero, directorId, productoraId, url_produccion, imagen_portada } = req.body;

        const nuevaProduccion = new Produccion({
            nombre,
            resumen,
            tipo,
            genero,
            Director: directorId,
            Productora: productoraId,
            url_produccion,
            imagen_portada
            
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
        .populate('Director', 'nombre')
        .populate('Productora', 'nombre');
        res.json(producciones);
    } catch (error) {
        console.error("Error al obtener las producciones:", error);
        res.status(500).json({ message: "Error al obtener las producciones" });
    }
});

router.put('/:produccionId', async (req, res) => {
    try {
        const { nombre, resumen, tipo, genero, directorId, productoraId, url_produccion, imagen_portada } = req.body;

        const produccionActualizada = await Produccion.findByIdAndUpdate(
            req.params.produccionId,
            {
                nombre,
                resumen,
                tipo,
                genero,
                url_produccion,
                fecha_modificacion: Date.now(),
                Director: directorId,
                Productora: productoraId,
                imagen_portada
            },
            { new: true }
        );

        if(!produccionActualizada) {
            return res.status(404).json({ message: "Producción no encontrada" });
        }
        res.json(produccionActualizada);
    } catch (error) {
        console.error("Error al actualizar la producción:", error);
        res.status(500).json({ message: "Error al actualizar la producción" });
    }
});

router.delete('/:produccionId', async (req, res) => {
    try {
        const produccionEliminada = await Produccion.findByIdAndDelete(req.params.produccionId);

        if(!produccionEliminada) {
            return res.status(404).json({ message: "Producción no encontrada" });
        }
        res.json({ message: "Producción eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la producción:", error);
        res.status(500).json({ message: "Error al eliminar la producción" });
    }
});

module.exports = router;
