import Knex from '../database/index';

class ReportsController {
    async index (req: any, res: any){
        const response = Knex('orc').where({ status: 2 });

        const total = response.map();

        return res.json(response);
    }
}

export default new ReportsController;