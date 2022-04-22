import Knex from '../database/index';
import { Readable } from 'stream';
import readline from 'readline';
//import neatCsv from 'neat-csv';
//import Fs from 'fs';

interface Product {
    reference: string,
    name: string,
    descricao: string,
    quantidade: string,
    NCM: string,
    cEAN: string,
    CEST: string,
    IPI: number,
    value_cust: number,
    value: number
}

class importCsvController {
    async create (req: any, res: any){
        const { file } = req;
        const { buffer } = file;

        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        const productLine = readline.createInterface({
            input: readableFile
        });

        const products: Product[] = [];

        for await (let line of productLine){
            const productLineSplit = line.split(',');

            // @ts-ignore
            products.push({
                reference: productLineSplit[0]
            });
        }
        //console.log(req.file.buffer.toString("utf-8"));

        return res.json();
    }
}

export default new importCsvController;