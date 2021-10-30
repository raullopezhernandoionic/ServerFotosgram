import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';
import { Usuario } from '../models/usuario.model';

const postRoutes = Router();


//OBTENER POST PAGINADOS

postRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip *10;

    const posts = await Post.find()
                .sort({ _id: -1 })
                .skip(skip)
                .limit(10)
                .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });


});


//CREAR POST 
postRoutes.post('/', [verificaToken], (req: any, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;

    //El postDB es el registro ya insertado en la base de datos

    Post.create(body).then(async postDB => {
        //Metodo para cargar la informacion del usuario con todos los datos
        // Con esta funcion conseguimos pasar el objeto de usuario
        await postDB.populate('usuario').execPopulate();
        res.json({
            ok: true,
            post: postDB
        });

    }).catch(err => {
        res.json(err);
    })
})


export default postRoutes;

