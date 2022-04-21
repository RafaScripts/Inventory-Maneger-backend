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

    async update(req: any, res: any){
        const {id, VendorName} = req.body;

        if(!id){
            return res.json('Id not parse.')
        }

        await knex('vendors').update({ VendorName }).where({id: id});

        return res.json('Ok Vendor Updated');
    }

    async delete(req: any, res: any){
        const { id } = req.params

        const response = await knex('vendors').del().where({
            id: id,
        });

        res.status(200).json(response);

    }

}

export default new VendorController;