import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Director = () => {
    const [directores, setDirectores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('Activo');
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchDirectores();
    }, []);

    const fetchDirectores = async () => {
        setLoading(true);
        try {
            const response = await api.get('/directores');
            setDirectores(response.data);
        } catch (error) {
            console.error("Error fetching directores", error);
        }
        setLoading(false);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/directores/${editingId}`, { nombre, estado });
                setEditingId(null);
            } else {
                await api.post('/directores', { nombre, estado });
            }
            setNombre('');
            setEstado('Activo');
            fetchDirectores();
        } catch (error) {
            console.error("Error guardando director", error);
            alert("Hubo un error al guardar el director.");
        }
    };

    const handleEditClick = (d) => {
        setEditingId(d._id);
        setNombre(d.nombre);
        setEstado(d.estado);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setNombre('');
        setEstado('Activo');
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">🎬 Gestión de Directores</h2>
            
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">{editingId ? 'Editar Director' : 'Añadir Nuevo Director'}</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleCreate}>
                        <div className="row g-3 align-items-center">
                            <div className="col-md-6">
                                <label className="form-label">Nombre del Director</label>
                                <input type="text" className="form-control" placeholder="Ej. Steven Spielberg" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Estado</label>
                                <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                            <div className="col-md-2 d-flex flex-column gap-2 justify-content-end">
                                <button type="submit" className={`btn ${editingId ? 'btn-warning' : 'btn-guardar'}`}>
                                    {editingId ? 'Actualizar' : 'Guardar'}
                                </button>
                                {editingId && (
                                    <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancelar</button>
                                )}
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
                                <th>Estado</th>
                                <th>Fecha Creación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {directores.length > 0 ? (
                                directores.map(d => (
                                    <tr key={d._id}>
                                        <td className="fw-bold">{d.nombre}</td>
                                        <td>
                                            <span className={`badge ${d.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}`}>{d.estado}</span>
                                        </td>
                                        <td>{new Date(d.fecha_creacion).toLocaleDateString()}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditClick(d)}>Editar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted">No hay directores registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
export default Director;
