import jwt from 'jsonwebtoken';


export default class Token {

    //Clave unica - Para poder firmar y abrir los tokens (Parte de lo que se va a utilizar para firmar los tokens)
    private static seed: string = 'este-es-el-seed-de-mi-app-secreto';

    //Caduca cada 30 dias
    private static caducidad: string = '30d';

    //Constructor no se utiliza para nada porque todo es 'static'
    constructor() { }

    //GENERAMOS TOKEN
    static getJwtToken( payload: any ): string {
        return jwt.sign({
            //El payload es lo que queremos que este dentro del token
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });

    }

    //COMPROBAMOS TOKEN
    // Hace falta constrastar el Token con la clave publica para verificar el Token
    static comprobarToken( userToken: string ) {

        return new Promise( (resolve, reject ) => {

            jwt.verify( userToken, this.seed, ( err, decoded ) => {
    
                if ( err ) {
                    reject();
                } else {
                    //El decoded posee toda la informacion que introducimos en el token
                    // Ejemplo: id , avatar, email ...
                    resolve( decoded );
                }
    
    
            })

        });


    }


}


