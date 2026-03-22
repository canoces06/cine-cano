import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Media = () => {
    const [producciones, setProducciones] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    
    // Form state
    const [nombre, setNombre] = useState('');
    const [resumen, setResumen] = useState('');
    const [tipo, setTipo] = useState('Película'); 
    const [genero, setGenero] = useState('Acción');
    const [directorId, setDirectorId] = useState('');
    const [productoraId, setProductoraId] = useState('');
    const [url_produccion, setUrl] = useState('');
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodRes, dirRes, prodctRes] = await Promise.all([
                api.get('/produccion'),
                api.get('/directores'),
                api.get('/productoras')
            ]);
            setProducciones(prodRes.data);
            setDirectores(dirRes.data);
            setProductoras(prodctRes.data);
            
            if (dirRes.data.length > 0) setDirectorId(dirRes.data[0]._id);
            if (prodctRes.data.length > 0) setProductoraId(prodctRes.data[0]._id);
        } catch (error) {
            console.error("Error fetching data", error);
        }
        setLoading(false);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/produccion', { 
                nombre, resumen, tipo, genero, directorId, productoraId, url_produccion 
            });
            setNombre(''); setResumen(''); setUrl('');
            fetchData();
        } catch (error) {
            console.error("Error creando producción", error);
            alert("Error al crear la producción.");
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("¿Seguro que deseas eliminar esta producción?")) {
            try {
                await api.delete(`/produccion/${id}`);
                fetchData();
            } catch (error) {
                console.error("Error deleting", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">🎬 Gestión de Películas y Series</h2>
            
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">Añadir Nueva Producción</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleCreate}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Tipo</label>
                                <select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                    <option value="Película">Película</option>
                                    <option value="Serie">Serie</option>
                                    <option value="Documental">Documental</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Género</label>
                                <select className="form-select" value={genero} onChange={(e) => setGenero(e.target.value)}>
                                    <option value="Acción">Acción</option>
                                    <option value="Comedia">Comedia</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Terror">Terror</option>
                                    <option value="Ciencia Ficción">Ciencia Ficción</option>
                                    <option value="Suspenso">Suspenso</option>
                                    <option value="Animación">Animación</option>
                                </select>
                            </div>
                            
                            <div className="col-md-6">
                                <label className="form-label">Director</label>
                                <select className="form-select" value={directorId} onChange={(e) => setDirectorId(e.target.value)} required>
                                    {directores.map(d => <option key={d._id} value={d._id}>{d.nombre}</option>)}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Productora</label>
                                <select className="form-select" value={productoraId} onChange={(e) => setProductoraId(e.target.value)} required>
                                    {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                                </select>
                            </div>

                            <div className="col-md-12">
                                <label className="form-label">Resumen</label>
                                <textarea className="form-control" value={resumen} onChange={(e) => setResumen(e.target.value)} rows="2"></textarea>
                            </div>
                            
                            <div className="col-md-12">
                                <label className="form-label">URL (Trailer o poster)</label>
                                <input type="url" className="form-control" value={url_produccion} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." />
                            </div>

                            <div className="col-12 mt-3 text-end">
                                <button type="submit" className="btn btn-guardar px-4">Guardar Producción</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {loading ? (
                <div className="text-center"><div className="spinner-border text-primary" role="status"></div></div>
            ) : (
                <div className="row">
                    {producciones.map(p => (
                        <div className="col-md-4 mb-4" key={p._id}>
                            <div className="card h-100 shadow-sm border-0 bg-light">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold text-primary">{p.nombre}</h5>
                                    <h6 className="card-subtitle mb-2">
                                        <span className="badge bg-secondary me-2">{p.tipo}</span>
                                        <span className="badge bg-info text-dark">{p.genero}</span>
                                    </h6>
                                    <p className="card-text small text-muted fst-italic">{p.resumen}</p>
                                    <hr />
                                    <ul className="list-unstyled small mb-3">
                                        <li><strong>🎬 Director:</strong> {p.Director?.nombre || 'Desconocido'}</li>
                                        <li><strong>🏢 Productora:</strong> {p.Productora?.nombre || 'Desconocida'}</li>
                                    </ul>
                                </div>
                                <div className="card-footer bg-transparent border-top-0 pt-0 text-end">
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p._id)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {producciones.length === 0 && <p className="text-center text-muted col-12">No hay producciones registradas.</p>}
                </div>
            )}
        </div>
    );
};

export default Media;
