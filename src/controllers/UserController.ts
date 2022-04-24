import Knex from '../database/index';
// @ts-ignore
import bcrypt from 'bcrypt';
import * as Yup from "yup";
import {number} from "yup";
import knex from "../database/index";

class UserController {
    async index(req: any, res: any) {
        const response = await Knex('Users');

        return res.json(response);
    }

    async create(req: any, res: any) {
        //esquema de verificação
        const schema = Yup.object().shape({
            username: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8)
        });

        //se o esquema não estiver valido retorna o erro ao usuario
        if(!( await schema.isValid(req.body))){
            return res.status(400).json({error: "dados invalidos"});
        }

        //verificação de usuario para não haver duplicação

        const checkOne = await Knex('Users').first().where({email: req.body.email});

        if(checkOne){
            return res.status(400).json({error: "usuario ja cadastrado"});
        }

        const {username, email, password, Caixa, Operator, Provider} = req.body;
        const {provider} = req.query;

        // somente usuarios com provider true podem fazer cadastros de novos usuarios.
        if (provider === "true") {
            const password_hash = await bcrypt.hash(password, 8);

            await Knex('Users').insert({username, email, password_hash, Caixa, Operator, Provider});

            return res.status(201).json('ok created');
        } else {
            return res.json('User not Authorized to make this request');
        }

    }

    async update(req: any, res: any) {

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8)
        });

        if(!( await schema.isValid(req.body))){
            return res.status(400).json({error: "dados invalidos"});
        }


        const checkOne = await Knex('Users').where({id: Number(req.query.id)});

        if(!checkOne){
            return res.json('Usuario não existe');
        }

        const {email, password} = req.body;

        if(req.query.provider === "true"){
            if(password){
                const password_hash = await bcrypt.hash(password, 8);
                await knex('Users').update({password_hash}).where({id: Number(req.query.id)})
            }
            if(email){
                await knex('Users').update({email: email}).where({id: Number(req.query.id)})
            }
        }

        return res.json({email});

    }

    async delete(req: any, res: any){
        const {provider} = req.query;

        if(provider === "true"){
            await Knex('Users').delete().where({id: Number(req.query.id)});
            return res.json('ok deleted')
        }

        return res.json('Usuario não autorizado');
    }
}

export default new UserController;