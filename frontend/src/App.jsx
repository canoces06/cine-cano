import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Media from './pages/Media';
import Director from './pages/Director';
import Productora from './pages/Productora';
import Genero from './pages/Genero';
import Tipo from './pages/Tipo';

const Home = () => (
  <div className="container mt-5 text-center">
    <h1 className="display-4 fw-bold">🎬 Bienvenido a CineCano</h1>
    <p className="lead mt-3">Selecciona un módulo en el menú superior para comenzar a administrar el catálogo de películas y series.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media" element={<Media />} />
        <Route path="/directores" element={<Director />} />
        <Route path="/productoras" element={<Productora />} />
        <Route path="/generos" element={<Genero />} />
        <Route path="/tipos" element={<Tipo />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
