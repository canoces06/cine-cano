import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/productoras';

export const getProductoras = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener productoras", error);
        throw error;
    }
};

export const crearProductora = async (productora) => {
    try {
        const response = await axios.post(BASE_URL, productora);
        return response.data;
    } catch (error) {
        console.error("Error al crear productora", error);
        throw error;
    }
};