import Knex from '../database/index';

interface product {
    id: number,
    name: string,
    quantidade: string,
    value: number,
}

class OrcController {

    async index(req: any, res: any){
        const response = await Knex('orc');

        if(!response){
            return res.json('Sem orçamentos');
        }

        return res.json(response);
    }

    async create(req: any, res: any){
        const { produtos } = req.body
        const {valor_total, status} = req.body

        if(!produtos){
            return res.json('orçamento sem produtos')
        }

        let data = {
            produtos,
            valor_total,
            status
        }

        await Knex('orc').insert({
            produtos,
            valor_total,
            status
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