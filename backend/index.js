require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToMongoDB } = require('./db/mongo_db_connection');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
// con esto quiero ver si me está "escuchando" el servidor, es decir, si está corriendo
app.get('/hola', (req, res) => {
    res.send("El servidor sí me está escuchando");
});

connectToMongoDB();

app.use('/api/directores', require('./routes/director.js'));
app.use('/api/produccion', require('./routes/produccion.js'));
app.use('/api/productoras', require('./routes/productora.js'));

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});


//npm start

// require('dotenv').config(); 
// const express = require('express');
// const cors = require('cors');

// const { getConnection } = require('./db/db-connection-mongo');

// const app = express();
// const port = process.env.PORT || 4000;

// app.use(cors()); 
// app.use(express.json()); 

// getConnection();

// app.listen(port, () => {
//     console.log(`--- 🟢 Servidor corriendo en el puerto ${port} ---`);
// });