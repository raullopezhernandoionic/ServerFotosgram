"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const token_1 = __importDefault(require("../classes/token"));
//Middleware: Es una funcion que se ejecuta antes de realizar un GET, POST, UPDATE, DELETE 
//Es decir podemos utilizar un middleware antes de realizar cualquier opereacion CRUD
const verificaToken = (req, res, next) => {
    //Recibimos el token personalizado a traves del Header en una propiedad personalizada
    // "x-token"
    const userToken = req.get('x-token') || '';
    //Agregamos a el decoded la informacion del usuario 
    token_1.default.comprobarToken(userToken)
        .then((decoded) => {
        console.log('Decoded', decoded);
        req.usuario = decoded.usuario;
        //Si se da correctamente la comprobacion del token entonces pasamos a la ruta x mediante el next
        next();
    })
        .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token no es correcto'
        });
    });
};
exports.verificaToken = verificaToken;
