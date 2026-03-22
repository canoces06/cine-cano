import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Genero = () => {
    const [producciones, setProducciones] = useState([]);
    const [filtro, setFiltro] = useState('Todos');
    const [loading, setLoading] = useState(true);

    const generos = ['Todos', 'Acción', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficción', 'Suspenso', 'Animación'];

    useEffect(() => {
        const fetchProducciones = async () => {
            setLoading(true);
            try {
                const response = await api.get('/produccion');
                setProducciones(response.data);
            } catch (error) {
                console.error("Error fetching producciones", error);
            }
            setLoading(false);
        };
        fetchProducciones();
    }, []);

    const filtradas = filtro === 'Todos' ? producciones : producciones.filter(p => p.genero === filtro);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">🎭 Explorar por Género</h2>
            
            <div className="mb-4 d-flex align-items-center bg-white p-3 rounded shadow-sm">
                <label className="me-3 fw-bold fs-5 mb-0">Seleccione el género:</label>
                <select className="form-select form-select-lg w-auto border-primary" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    {generos.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
            </div>

            {loading ? (
                <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
            ) : (
                <div className="row">
                    {filtradas.map(p => (
                        <div className="col-md-3 mb-4" key={p._id}>
                            <div className="card border-0 shadow h-100 hover-zoom">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{p.nombre}</h5>
                                    <div className="mb-2">
                                        <span className="badge bg-primary me-2">{p.genero}</span>
                                        <span className="badge bg-secondary">{p.tipo}</span>
                                    </div>
                                    <p className="card-text small text-muted text-truncate">{p.resumen}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filtradas.length === 0 && (
                        <div className="col-12 text-center py-5">
                            <h4 className="text-muted">No se encontraron producciones del género seleccionado.</h4>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default Genero;
