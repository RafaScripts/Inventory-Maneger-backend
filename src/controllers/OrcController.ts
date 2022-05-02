import Knex from '../database/index';

interface product {
    id: number,
    name: string,
    quantidade: string,
    value: number,
}

class OrcController {

    async index(req: any, res: any){
        const {id} = req.query;

        var orc_id = Number(id);

        if(orc_id){
            const response2 = await Knex('orc')
                .where('orc.id', '=', orc_id)
                .join('Users', 'Users.id', '=', 'orc.user_id')
                .join('Status', 'Status.id', '=', 'orc.statuss')
                .select('orc.*', 'Users.username', 'Status.*');

            return res.json(response2);
        }

        const response = await Knex('orc')
            .join('Users', 'user_id', '=', 'Users.id')
            .join('Status', 'Status.id', '=', 'orc.statuss')
            .select('orc.*', 'Users.username', 'Status.*');

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
            produtos,
            valor_total,
            statuss
        }

        await Knex('orc').insert({
            user_id,
            produtos,
            valor_total,
            statuss
        })


        return res.json(data);

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