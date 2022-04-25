import Knex from "../database/index";
import api from "../services/api";

export default async (req: any, res: any, next: any) => {
    const token = await Knex('token');

    const id = '14478';

    const key = '';

    let check;

    /*
    do {
        check = api.post(`&ProductId=${id}&Key=${token}`)
    }while(!check)
    */

}