import Knex from '../database/index';

class ActivateController {
    async store(req: any, res: any){
        const {token} = req.body

        await Knex('token').insert({token});

        return res.json('token add to database');
    }

    async test(req:any, res: any){
        const response = await Knex('token');

        response.map(function (val: any, index: any){
            console.log(val.token);
            return res.json(val.token);
        });


        return res.json();
    }
}

export default new ActivateController;