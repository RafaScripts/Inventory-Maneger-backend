import Knex from '../database/index';
import pdf from 'html-pdf';


class ReportsController {
    async index(req: any, res: any) {
        return res.json({ message: 'Hello World' });
    }

    async create(req: any, res: any) {
        return res.json({ message: 'Hello World' });
    }
}

export default new ReportsController;