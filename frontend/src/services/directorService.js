import axios from 'axios';


const BASE_URL = 'http://localhost:5000/api/directores';

export const getDirectores = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener directores", error);
        throw error;
    }
};