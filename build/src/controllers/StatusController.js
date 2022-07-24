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
class StatusController {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, index_1.default)('Status');
            return res.json(response);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status } = req.body;
            if (!status) {
                return res.json('OPPS nada foi digitado');
            }
            yield (0, index_1.default)('Status').insert({
                status: status
            });
            return res.json('ok');
        });
    }
}
exports.default = new StatusController;
//# sourceMappingURL=StatusController.js.map