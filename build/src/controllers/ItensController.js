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
class ItensController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { reference, id } = req.query;
            if (reference) {
                const iten = yield (0, index_1.default)('itens').where({ reference: reference });
                return res.json(iten);
            }
            if (id) {
                const iten = yield (0, index_1.default)('itens').where({ id: id });
                return res.json(iten);
            }
            const response = yield (0, index_1.default)('itens');
            return res.json(response);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { reference, name, descricao, quantidade, NCM, cEAN, CEST, IPI, value_cust, Value, vendor_id } = req.body;
            yield (0, index_1.default)('itens').insert({
                reference,
                name, descricao,
                quantidade, NCM,
                cEAN, CEST, IPI,
                value_cust,
                Value, vendor_id
            });
            return res.status(201).json('OK CREATED');
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { reference, name, descricao, quantidade, NCM, cEAN, CEST, IPI, value_cust, Value, vendor_id } = req.body;
            const { id } = req.params;
            yield (0, index_1.default)('itens').update({ reference,
                name, descricao,
                quantidade, NCM,
                cEAN, CEST, IPI,
                value_cust,
                Value, vendor_id }).where({ id: id });
            return res.json('OK UPDATED');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield (0, index_1.default)('itens').delete().where({ id: id });
            return res.json('OK DELETED');
        });
    }
}
exports.default = new ItensController;
//# sourceMappingURL=ItensController.js.map