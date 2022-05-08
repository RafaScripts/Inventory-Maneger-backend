import Knex from '../database/index';

interface product {
    id: number,
    name: string,
    quantidade: string,
    value: number,
}

class OrcController {

    async index(req: any, res: any){
        const {ppID} = req.query;

        let pID = Number(ppID);

        //detalhamento de orçamento especifico
        if(pID){

            const response4 = await Knex('orcProducts').where({id: pID}).select('products');

            return res.json(response4);
        }

        //listagem geral de todos os orçamentos mas não retorna os produtos.
        const response = await Knex('orc')
            .join('Users', 'user_id', '=', 'Users.id')
            .join('Status', 'Status.id', '=', 'orc.statuss')
            .join('orcProducts', 'orcProducts.id', '=', 'orc.products_id')
            .select('orc.*', 'Users.username', 'Status.status');

        if(!response){
            return res.json('Sem orçamentos');
        }

        return res.json(response);
    }

    async create(req: any, res: any){
        const { produtos } = req.body
        const {user_id ,valor_total, statuss} = req.body

        if(!produtos){
            return res.json('orçamento sem produtos')
        }

        let data = {
            user_id,
            valor_total,
            statuss
        }

        await Knex('orcProducts').insert({products: produtos});

        const pID = await Knex('orcProducts').orderBy('created_at', 'desc').select('id');

        const pcID = pID[0];

        const products_id = pcID.id

        await Knex('orc').insert({
            user_id,
            products_id,
            valor_total,
            statuss
        })



        return res.json('ok');

    }

    async update(req: any, res: any){
        const {id} = req.params
        const {produtos, valor_total, status} = req.body;

        if (!id) {
            return res.json('Orçamento inexistente')
        }

        if(produtos){
            await Knex('orc').update({produtos, valor_total}).where({id: id});

            return res.json(produtos);
        }

        if(status){
            await Knex('orc').update({status}).where({id: id});

            return res.json(status)
        }

        return res.json('Atualizado')
    }

    async delete(req: any, res: any){
        const {id} = req.params

        if(!id){
            return res.json('id not parse')
        }

        await Knex('orc').del().where({id: id});

        return res.json('orçamento deletado')
    }
}

export default new OrcController;
