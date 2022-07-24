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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../database/index"));
const model_OrcProducts_1 = require("../models/model_OrcProducts");
//import colections from "../configs/firebase/firestore";
const firebase_1 = __importDefault(require("../configs/firebase/firebase"));
class OrcController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ppID } = req.query;
            let { pages } = req.query;
            let page = Number(pages);
            if (!page) {
                page = 1;
            }
            //colections();
            (0, firebase_1.default)();
            //detalhamento de orçamento especifico
            if (ppID) {
                const response4 = yield model_OrcProducts_1.model_OrcProducts.findOne({ _id: ppID });
                return res.json(response4);
            }
            const [count] = yield (0, index_1.default)('orc').count();
            //listagem geral de todos os orçamentos mas não retorna os produtos.
            const response = yield (0, index_1.default)('orc')
                //.join('Users', 'user_id', '=', 'Users.id')
                .join('Status', 'Status.id', '=', 'orc.statuss')
                //.limit(5)
                //.offset((page - 1) * 5)
                .select('orc.*', 'Status.status');
            if (!response) {
                return res.json('Sem orçamentos');
            }
            //const podructs = await model_OrcProducts.find();
            //const teste = podructs[0].podructs;
            return res.json(response);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { produtos } = req.body;
            const { user_id, valor_total, statuss } = req.body;
            if (!produtos) {
                return res.json('orçamento sem produtos');
            }
            //await Knex('orcProducts').insert({products: produtos});
            yield model_OrcProducts_1.model_OrcProducts.create({
                products: produtos,
            });
            const prd = yield model_OrcProducts_1.model_OrcProducts.find();
            const prdReverse = prd.reverse();
            const prdReverseLast = prdReverse[0];
            const prdReverseLastId = prdReverseLast.id;
            //const pID = await Knex('orcProducts').orderBy('created_at', 'desc').select('id');
            //const pcID = pID[0];
            //const products_id = pcID.id
            yield (0, index_1.default)('orc').insert({
                user_id,
                products_id: prdReverseLastId,
                valor_total,
                statuss
            });
            return res.json('ok');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ppID, id } = req.query;
            const { produtos, valor_total, status } = req.body;
            if (!id) {
                return res.json('Orçamento inexistente');
            }
            if (produtos || ppID) {
                yield model_OrcProducts_1.model_OrcProducts.updateOne({ _id: ppID }, { products: produtos });
                yield (0, index_1.default)('orc').where({ id: id }).update({ valor_total });
                const teste = yield model_OrcProducts_1.model_OrcProducts.findOne({ _id: ppID });
                return res.json(teste);
            }
            if (status) {
                yield (0, index_1.default)('orc').update({ status }).where({ id: id });
                return res.json(status);
            }
            return res.json('Atualizado');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { ppID } = req.query;
            if (!id) {
                return res.json('id not parse');
            }
            yield (0, index_1.default)('orc').del().where({ id: id });
            yield model_OrcProducts_1.model_OrcProducts.findOneAndDelete({ _id: ppID });
            return res.json('orçamento deletado');
        });
    }
}
exports.default = new OrcController;
//# sourceMappingURL=OrcController.js.map