import Knex from '../database/index';
import jwt from 'jsonwebtoken';
import authConfig from "../configs/auth";
import * as Yup from "yup";
import bcrypt from "bcrypt";

class SessionController {
    async store(req: any, res: any){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(8).required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json('dados invalidos');
        }

        const {email, password} = req.body

        const checkOne = await Knex('Users').first('*').where({email});

        if(!checkOne){
            return res.status(404).json('Usuario não existe');
        }

        const valid = await bcrypt.compare(password, checkOne.password_hash);

        if(!valid){
            return res.status(400).json('senha invalida');
        }

        const { id, username, Caixa, Operator, Provider } = checkOne;

        return res.json({
            user: {
                id,
                username,
                Caixa,
                Operator,
                Provider
            },
            token: jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            }),
        })
    }
}

export default new SessionController;