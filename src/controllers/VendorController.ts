import knex from "../database/index";
import * as yup from "yup";


class VendorController{
    async index(req: any, res: any){

        const vendors = await knex('vendors');

        return res.json(vendors);
    }
    
    async create(req: any, res: any){
        const Schema = yup.object().shape({
            VendorName: yup.string().required()
        });

        if(!(await Schema.isValid(req.body))){
            return res.status(400).json({ error: "Name is required" });
        }

        const { id, VendorName } = req.body;

        try {
            await knex('vendors').insert({
                VendorName
            });
        }catch(e) {
            return res.status(400).json({ error: "Error insert in database, try again" });
        }

        return res.status(201).json({ id, VendorName });
    }
}

export default new VendorController;