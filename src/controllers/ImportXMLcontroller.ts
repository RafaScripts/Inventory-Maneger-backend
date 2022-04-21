import Knex from '../database/index';

class importXMLcontroller {
    async index(req: any, res: any){
        const response = await Knex('CFOP');

        return res.json(response);
    }

    async create(req: any, res: any){

        const {xml} = req.rawBody;

        return res.json(xml);

    }
}

export default new importXMLcontroller;