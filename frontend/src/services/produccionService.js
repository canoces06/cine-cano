import axios from 'axios';

// La URL la traigo del backend, asegurándome de que apunte al puerto correcto donde se ejecuta el servidor
const BASE_URL = 'http://localhost:5000/api/produccion';

export const getProducciones = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener producciones", error);
        throw error;
    }
};

export const crearProduccion = async (produccion) => {
    try {
        const response = await axios.post(BASE_URL, produccion);
        return response.data;
    } catch (error) {
        console.error("Error al crear producción", error);
        throw error;
    }
};