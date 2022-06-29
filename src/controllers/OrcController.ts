import Knex from '../database/index';
import {model_OrcProducts} from "../models/model_OrcProducts";

interface product {
    id: number,
    name: string,
    quantidade: string,
    value: number,
}

class OrcController {

    async index(req: any, res: any){
        const {ppID} = req.query;

        //detalhamento de orçamento especifico
        if(ppID){

            const response4 = await model_OrcProducts.findOne({_id: ppID});

            return res.json(response4);
        }

        //listagem geral de todos os orçamentos mas não retorna os produtos.
        const response = await Knex('orc')
            //.join('Users', 'user_id', '=', 'Users.id')
            .join('Status', 'Status.id', '=', 'orc.statuss')
            .select('orc.*', 'Status.status');

        if(!response){
            return res.json('Sem orçamentos');
        }

        const podructs = await model_OrcProducts.find();
        //const teste = podructs[0].podructs;

        const data = {
            response,
            podructs
        }

        return res.json(data);
    }

    async create(req: any, res: any){
        const { produtos } = req.body
        const {user_id ,valor_total, statuss} = req.body

        if(!produtos){
            return res.json('orçamento sem produtos')
        }

        //await Knex('orcProducts').insert({products: produtos});


        await model_OrcProducts.create({
            products: produtos,
        })

        const prd = await model_OrcProducts.find();

        const prdReverse = prd.reverse();

        const prdReverseLast = prdReverse[0];

        const prdReverseLastId = prdReverseLast.id;

        //const pID = await Knex('orcProducts').orderBy('created_at', 'desc').select('id');

        //const pcID = pID[0];

        //const products_id = pcID.id

        await Knex('orc').insert({
            user_id,
            products_id: prdReverseLastId,
            valor_total,
            statuss
        })



        return res.json('ok');

    }

    async update(req: any, res: any){
        const {id} = req.params;
        const {ppID} = req.query;
        const {produtos, valor_total, status} = req.body;

        if (!id) {
            return res.json('Orçamento inexistente')
        }

        if(produtos || ppID){
            await model_OrcProducts.findOneAndUpdate({_id: ppID}, {products: produtos});
            await Knex('orc').where({id: id}).update({valor_total});

            return res.json(produtos);
        }

        if(status){
            await Knex('orc').update({status}).where({id: id});

            return res.json(status)
        }

        return res.json('Atualizado')
    }

    async delete(req: any, res: any){
        const {id} = req.params;
        const {ppID} = req.query;

        if(!id){
            return res.json('id not parse')
        }

        await Knex('orc').del().where({id: id});
        await model_OrcProducts.findOneAndDelete({_id: ppID});

        return res.json('orçamento deletado')
    }
}

export default new OrcController;
