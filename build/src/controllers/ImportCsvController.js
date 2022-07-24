"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const readline_1 = __importDefault(require("readline"));
const index_1 = __importDefault(require("../database/index"));
class importCsvController {
    create(req, res) {
        var e_1, _a, e_2, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // separa do arquivo apenas o buffer
            const { file } = req;
            const { buffer } = file;
            //faz a leitura desse buffer
            const readableFile = new stream_1.Readable();
            readableFile.push(buffer);
            readableFile.push(null);
            // separa linha por linha do buffer
            const productLine = readline_1.default.createInterface({
                input: readableFile
            });
            const products = [];
            try {
                for (var productLine_1 = __asyncValues(productLine), productLine_1_1; productLine_1_1 = yield productLine_1.next(), !productLine_1_1.done;) {
                    let line = productLine_1_1.value;
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
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (productLine_1_1 && !productLine_1_1.done && (_a = productLine_1.return)) yield _a.call(productLine_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                // faz a leitura de cada objeto do array e grava no BD
                for (var products_1 = __asyncValues(products), products_1_1; products_1_1 = yield products_1.next(), !products_1_1.done;) {
                    let { reference, name, descricao, quantidade, NCM, cEAN, CEST, IPI, value_cust, Value } = products_1_1.value;
                    yield (0, index_1.default)('itens').insert({
                        reference, name,
                        descricao, quantidade,
                        NCM, cEAN, CEST, IPI, value_cust, Value
                    });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (products_1_1 && !products_1_1.done && (_b = products_1.return)) yield _b.call(products_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            //retorna o array para o cliente
            return res.json(products);
        });
    }
}
exports.default = new importCsvController;
//# sourceMappingURL=ImportCsvController.js.map