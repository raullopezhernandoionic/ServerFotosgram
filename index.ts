import Server from './classes/server';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
// import fileUpload from 'express-fileupload';
let fileupload = require("express-fileupload")

const server = new Server();


// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

// Rutas de mi app
server.app.use('/user', userRoutes );
server.app.use('/posts', postRoutes);


//FileUpload - Middleware
server.app.use(fileupload());

// Conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram', 
                { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {

   if ( err ) throw err;

   console.log('Base de datos ONLINE');
})

// Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});