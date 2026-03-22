import React, {useState, useEffect} from "react";
import { getProducciones, crearProduccion } from "../services/produccionService";
import { getDirectores } from "../services/directorService";
import { getProductoras  } from "../services/productoraService";

const ProduccionPage = () => {
    const [producciones, setProducciones] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [loading, setLoading] = useState(true);

    const [nuevaProduccion, setNuevaProduccion] = useState({
        nombre: '',
        tipo: '',
        genero: '',
        directorId: '',
        productoraId: '',
        resumen: ''
    });

    const listarProducciones = async () => {
        try {
            const [produccionesData, directoresData, productorasData] = await Promise.all([
                getProducciones(),
                getDirectores(),
                getProductoras()
            ]);
            setProducciones(produccionesData);
            setDirectores(directoresData);
            setProductoras(productorasData);
        } catch (error) {
            console.error("Error al listar producciones", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        listarProducciones();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearProduccion(nuevaProduccion);
            alert("Producción creada exitosamente");
            setNuevaProduccion({
                nombre: '',
                tipo: '',
                genero: '',
                directorId: '',
                productoraId: '',
                resumen: ''
            });
        } catch (error) {
            console.error("Error al crear producción", error);
        }
    };


    if (loading) {
        return <p>Cargando producciones...</p>;
    }

    return (
        <div className="container mt-4">
            {/* <h2>Lista de Películas y Series</h2> */}
            <button className="btn btn-success btn-crear-produccion" data-bs-toggle="modal" data-bs-target="#crearProduccionModal">
                Agregar Producción
            </button>
            <table className="table table-striped"> 
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Género</th>
                        <th>Estado</th>
                        <th>Director</th>
                        <th>Productora</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {producciones.map((p) => (
                        <tr >
                            <td>{p._id}</td>
                            <td>{p.nombre}</td>
                            <td>{p.tipo}</td>
                            <td>{p.genero}</td>
                            <td>{p.estado}</td>
                            <td>{p.Director?.nombre || 'N/A'}</td>
                            <td>{p.Productora?.nombre || 'N/A'}</td>
                            <td>
                                <button className="btn btn-primary btn-sm me-2">Editar</button>
                                <button className="btn btn-sm btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para crear nueva producción */}
            <div className="modal fade" id="crearProduccionModal" tabIndex="-1" aria-labelledby="crearProduccionModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="crearProduccionModalLabel">Crear Nueva Producción</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" value={nuevaProduccion.nombre} onChange={(e) => setNuevaProduccion({...nuevaProduccion, nombre: e.target.value})} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tipo" className="form-label">Tipo</label>
                                    <input type="text" className="form-control" id="tipo" value={nuevaProduccion.tipo} onChange={(e) => setNuevaProduccion({...nuevaProduccion, tipo: e.target.value})} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="directorId" className="form-label">Director</label>
                                    <select className="form-control" id="directorId" value={nuevaProduccion.directorId} onChange={(e) => setNuevaProduccion({...nuevaProduccion, directorId: e.target.value})} required>
                                        <option value="">Seleccionar Director</option>
                                        {directores.map((d) => (
                                            <option key={d._id} value={d._id}>{d.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productoraId" className="form-label">Productora</label>
                                    <select className="form-control" id="productoraId" value={nuevaProduccion.productoraId} onChange={(e) => setNuevaProduccion({...nuevaProduccion, productoraId: e.target.value})} required>
                                        <option value="">Seleccionar Productora</option>
                                        {productoras.map((p) => (
                                            <option key={p._id} value={p._id}>{p.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="resumen" className="form-label">Resumen</label>
                                    <textarea className="form-control" id="resumen" value={nuevaProduccion.resumen} onChange={(e) => setNuevaProduccion({...nuevaProduccion, resumen: e.target.value})} required />
                                </div>
                                <button type="submit" className="btn-sbmt-produccion">Crear Producción</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}



export default ProduccionPage;
