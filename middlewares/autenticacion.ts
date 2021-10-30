import { Response, Request, NextFunction } from 'express';
import Token from '../classes/token';
 
//Middleware: Es una funcion que se ejecuta antes de realizar un GET, POST, UPDATE, DELETE 
//Es decir podemos utilizar un middleware antes de realizar cualquier opereacion CRUD


export const verificaToken = ( req: any, res: Response, next: NextFunction  ) => {

    //Recibimos el token personalizado a traves del Header en una propiedad personalizada
    // "x-token"
    const userToken = req.get('x-token') || '';

    //Agregamos a el decoded la informacion del usuario 
    Token.comprobarToken( userToken )
        .then(  (decoded: any) => {
            console.log('Decoded', decoded );
            req.usuario = decoded.usuario;
            //Si se da correctamente la comprobacion del token entonces pasamos a la ruta x mediante el next
            next();
        })
        .catch( err => {

            res.json({
                ok: false,
                mensaje: 'Token no es correcto'
            });

        });




}


