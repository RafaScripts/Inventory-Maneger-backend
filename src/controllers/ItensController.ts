import Knex from '../database/index';

class ItensController{
    async index(req: any, res: any){
        const {reference, id} = req.query;

        if(reference){
            const iten = await Knex('itens').where({reference: reference});
            return res.json(iten);
        }

        if(id){
            const iten = await Knex('itens').where({id: id});
            return res.json(iten);
        }

        const response = await Knex('itens');

        return res.json(response);
    }



    async create(req: any, res: any){
        const {reference,
            name, descricao,
            quantidade, NCM,
            cEAN, CEST, IPI,
            value_cust,
            Value, vendor_id} = req.body;

        await Knex('itens').insert({
            reference,
            name, descricao,
            quantidade, NCM,
            cEAN, CEST, IPI,
            value_cust,
            Value, vendor_id
        });

        return res.status(201).json('OK CREATED');
    }

    async update(req: any, res: any){
        const {reference,
            name, descricao,
            quantidade, NCM,
            cEAN, CEST, IPI,
            value_cust,
            Value, vendor_id} = req.body;

        const {id} = req.params

        await Knex('itens').update({reference,
            name, descricao,
            quantidade, NCM,
            cEAN, CEST, IPI,
            value_cust,
            Value, vendor_id}).where({id: id});

        return res.json('OK UPDATED');
    }

    async delete(req: any, res: any){
        const {id} = req.params;

        await Knex('itens').delete().where({id: id});

        return res.json('OK DELETED');
    }

}

export default new ItensController;