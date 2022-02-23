import knex from "../database/index";
import * as yup from "yup";

class ItensController{
    async index(req: any, res: any){

        const results = await knex('itens')
            .join('vendors', 'vendors.id', '=', 'itens.vendor_id')
            .select('itens.*', 'vendors.VendorName');


        return res.json(results);

    }

    async create(req: any, res: any){

        const Schema = yup.object().shape({
            name: yup.string().required(),
            total: yup.string().required(),
            vendor_id: yup.number().required()
        });

        if(!( Schema.isValid(req.body))){
            return res.status(401).json({ error: "All camps is required" });
        }

        const { id, name, total, vendor_id } = req.body;

        try {
            await knex('itens').insert({
                name,
                total,
                vendor_id
            });
        } catch (e) {
            return res.status(400).json({ error: "Error insert in database, try again" });
        }

        return res.status(201).json({ id, name, total, vendor_id });
    }

    async delete(req: any, res: any){
        const { id } = req.params

        const response = await knex('itens').del().where({
            id: id,
        });

        res.status(200).json(response);

    }

}

export default new ItensController;