import knex from "../database/index";
import * as yup from "yup";


interface x {
    CFOP: string,

}

class ItensController{
    async index(req: any, res: any){

        const results = await knex('itens')
            .join('vendors', 'vendors.id', '=', 'itens.vendor_id')
            .select('itens.*', 'vendors.VendorName');

        return res.json(results);

    }

    async create(req: any, res: any){

        const {} = req.body;

        const response = await knex('itens').insert({});

        return res.json(response);

    }
}

export default new ItensController;