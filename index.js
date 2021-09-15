const express = require('express');
const { dbConection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// Crear el servidor de express
const app = express();

// Base de datos
dbConection();

//Cors
app.use(cors())

//Directorio Publico
app.use(express.static('public'))

// Lectura y parseo del body
app.use( express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));



// Escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`Corriendo en el puerto ${process.env.PORT}`)
});