import Knex from '../database/index';
//import neatCsv from 'neat-csv';
//import Fs from 'fs';

class importCsvController {
    async create(req: any, res: any){
        /*
        Fs.readFile('../csv.csv', async (err, data) => {
            if (err) {
                return console.error(err)
            }

            console.log(await neatCsv(data));

        });
         */
        return res.json()
    }
}

export default new importCsvController;