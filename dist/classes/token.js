"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    //Constructor no se utiliza para nada porque todo es 'static'
    constructor() { }
    //GENERAMOS TOKEN
    static getJwtToken(payload) {
        return jsonwebtoken_1.default.sign({
            //El payload es lo que queremos que este dentro del token
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });
    }
    //COMPROBAMOS TOKEN
    // Hace falta constrastar el Token con la clave publica para verificar el Token
    static comprobarToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    reject();
                }
                else {
                    //El decoded posee toda la informacion que introducimos en el token
                    // Ejemplo: id , avatar, email ...
                    resolve(decoded);
                }
            });
        });
    }
}
exports.default = Token;
//Clave unica - Para poder firmar y abrir los tokens (Parte de lo que se va a utilizar para firmar los tokens)
Token.seed = 'este-es-el-seed-de-mi-app-secreto';
//Caduca cada 30 dias
Token.caducidad = '30d';
