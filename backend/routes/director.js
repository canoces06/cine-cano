const {Router} = require('express');
const router = Router();
const Director = require('../models/Director');

router.post('/', async (req, res) => {
    try {
        const { nombre, estado } = req.body;
        const nuevoDirector = new Director({
            nombre,
            estado});
        const directorGuardado = await nuevoDirector.save();
        res.status(201).json(directorGuardado);
    } catch (error) {
        console.error("Error al crear el director:", error);
        res.status(500).json({ message: "Error al crear el director" });
    }
});

router.get('/', async (req, res) => {
    try {
        const directores = await Director.find();
        res.json(directores);
    } catch (error) {
        console.error("Error al obtener los directores:", error);
        res.status(500).json({ message: "Error al obtener los directores" });
    }
});

module.exports = router;