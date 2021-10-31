import { Schema, Document, model } from 'mongoose';

const postSchema = new Schema({

    created: {
        type: Date,
    },

    mensaje: {
        type: String
    },

    imgs: [{
        type: String
    }],

    coords: {
        type: String
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia/relacion a un usuario']
    }
})

//La fecha debera crearse automaticamente cuando haga una insercion
//El pre viene a ser como un Trigger que se dispara desde la base de datos
// antes de la grabacion del post

postSchema.pre<Ipost>('save', function (next) {
    this.created = new Date();
    next();
})

//Definimos mediante un interface el tipado de cada uno de los elementos
//El Ipost tendra esos elementos con ese tipado y extendera de Document

interface Ipost extends Document {
    created: Date,
    mensaje: string,
    img: String[],
    coords: String,
    usuario: String
}

export const Post = model<Ipost>('Post', postSchema);