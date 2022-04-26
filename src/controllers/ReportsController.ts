import Knex from '../database/index';
import pdf from 'html-pdf';


class ReportsController {
    async index (req: any, res: any){
        const response = await Knex('orc').where({ status: 2 });

        return res.json(response);
    }
}

export default new ReportsController;