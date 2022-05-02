import Knex from "../database/index";

class StatusController {
    async store(req: any, res: any){
        const response = await Knex('Status');

        return res.json(response);
    }

    async create(req: any, res: any){
        const {status} = req.body;

        if(!status){
            return res.json('OPPS nada foi digitado')
        }

        await Knex('Status').insert({
            status: status
        })

        return res.json('ok');
    }
}

export default new StatusController;