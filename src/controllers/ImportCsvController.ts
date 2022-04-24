import Knex from '../database/index';
import { Readable } from 'stream';
import readline from 'readline';
import knex from "../database/index";
//import neatCsv from 'neat-csv';
//import Fs from 'fs';

interface Product {
    reference: string,
    name: string,
    descricao: string,
    quantidade: number,
    NCM: string,
    cEAN: string,
    CEST: string,
    IPI: number,
    value_cust: number,
    Value: number
}

class importCsvController {
    async create (req: any, res: any){
        // separa do arquivo apenas o buffer
        const { file } = req;
        const { buffer } = file;

        //faz a leitura desse buffer
        const readableFile = new Readable();
        readableFile.push(buffer);
        readableFile.push(null);

        // separa linha por linha do buffer
        const productLine = readline.createInterface({
            input: readableFile
        });

        const products: Product[] = [];


        for await (let line of productLine){
            //separa cada item pelo separador ',' comum de um arquivo .CSV
            const productLineSplit = line.split(',');

            //aloca todos os dados em um array de objetos
            products.push({
                reference: productLineSplit[0],
                name: productLineSplit[1],
                descricao: productLineSplit[2],
                quantidade: Number(productLineSplit[3]),
                NCM: productLineSplit[4],
                cEAN: productLineSplit[5],
                CEST: productLineSplit[6],
                IPI: Number(productLineSplit[7]),
                value_cust: Number(productLineSplit[8]),
                Value: Number(productLineSplit[9])
            });
        }

        // faz a leitura de cada objeto do array e grava no BD
        for await (let {reference, name,
            descricao, quantidade,
            NCM, cEAN, CEST, IPI, value_cust, Value} of products){
            await knex('itens').insert({
                reference, name,
                descricao, quantidade,
                NCM, cEAN, CEST, IPI, value_cust, Value});
        }

        //retorna o array para o cliente
        return res.json(products);
    }
}

export default new importCsvController;