import Knex from '../database/index';
// @ts-ignore
import bcrypt from 'bcrypt';

class UserController {
    async index(req: any, res: any) {
        const response = await Knex('Users');

        return res.json(response);
    }

    async create(req: any, res: any) {
        const {username, email, password, Caixa, Operador, Provider} = req.body;

        const {provider} = req.header;

        if (provider === true) {
            const password_hash = bcrypt.hash(password, 8);

            await Knex('Users').insert({username, email, password_hash, Caixa, Operador, Provider});

            return res.status(201).json('ok created');
        } else {
            return res.json('User not Authorized to make this request');
        }

    }

    async update(req: any, res: any) {
    }
}

export default new UserController;