import Knex from '../database/index';

class importXMLcontroller {
    async index(req: any, res: any){
        const response = await Knex('CFOP');

        return res.json(response);
    }
}

export default new importXMLcontroller;