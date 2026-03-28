const { Router } = require('express');
const router = Router();
const Productora = require('../models/Productora');

router.post('/', async (req, res) => {
    try {
        const { nombre, estado, descripcion, slogan, fecha_creacion, fecha_modificacion } = req.body;
        const nuevaProductora = new Productora({
            nombre,
            estado,
            descripcion,
            slogan,
            fecha_creacion,
            fecha_modificacion
        });
        const productoraGuardada = await nuevaProductora.save();
        res.status(201).json(productoraGuardada);
    } catch (error) {
        console.error("Error al crear la productora:", error);
        res.status(500).json({ message: "Error al crear la productora" });
    }
});

router.get('/', async (req, res) => {
    try {
        const productoras = await Productora.find();
        res.json(productoras);
    } catch (error) {
        console.error("Error al obtener las productoras:", error);
        res.status(500).json({ message: "Error al obtener las productoras" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { nombre, estado, descripcion, slogan } = req.body;
        const productoraActualizada = await Productora.findByIdAndUpdate(
            req.params.id,
            { nombre, estado, descripcion, slogan, fecha_modificacion: Date.now() },
            { new: true }
        );
        if(!productoraActualizada) return res.status(404).json({ message: "Productora no encontrada" });
        res.json(productoraActualizada);
    } catch (error) {
        console.error("Error al actualizar la productora:", error);
        res.status(500).json({ message: "Error al actualizar la productora" });
    }
});

module.exports = router;