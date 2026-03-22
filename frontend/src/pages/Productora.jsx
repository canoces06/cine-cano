import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Productora = () => {
    const [productoras, setProductoras] = useState([]);
    const [nombre, setNombre] = useState('');
    const [slogan, setSlogan] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductoras();
    }, []);

    const fetchProductoras = async () => {
        setLoading(true);
        try {
            const response = await api.get('/productoras');
            setProductoras(response.data);
        } catch (error) {
            console.error("Error fetching productoras", error);
        }
        setLoading(false);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/productoras', { nombre, slogan, descripcion, estado });
            setNombre('');
            setSlogan('');
            setDescripcion('');
            setEstado('Activo');
            fetchProductoras();
        } catch (error) {
            console.error("Error creating productora", error);
            alert("Hubo un error al crear la productora.");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">🏢 Gestión de Productoras</h2>
            
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">Añadir Nueva Productora</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleCreate}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" placeholder="Ej. Warner Bros" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Slogan</label>
                                <input type="text" className="form-control" placeholder="Slogan de la empresa" value={slogan} onChange={(e) => setSlogan(e.target.value)} required />
                            </div>
                            <div className="col-md-8">
                                <label className="form-label">Descripción</label>
                                <input type="text" className="form-control" placeholder="Breve descripción..." value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Estado</label>
                                <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                            <div className="col-12 mt-3 text-end">
                                <button type="submit" className="btn btn-guardar px-4">Guardar Productora</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover table-striped mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Slogan</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productoras.length > 0 ? (
                                productoras.map(p => (
                                    <tr key={p._id}>
                                        <td className="fw-bold">{p.nombre}</td>
                                        <td>{p.slogan}</td>
                                        <td>{p.descripcion}</td>
                                        <td>
                                            <span className={`badge ${p.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>{p.estado}</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted">No hay productoras registradas.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Productora;
