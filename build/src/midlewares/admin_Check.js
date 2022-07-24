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
//importação das blibiotecas e configuração da secret JWT
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../configs/auth"));
const util_1 = require("util");
const index_1 = __importDefault(require("../database/index"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    // se o token não estiver sendo enviado retornar erro
    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }
    // separação do token
    const [, token] = authHeader.split(' ');
    try {
        // @ts-ignore
        // decodifica o token e compara para saber se bate com a secret
        const decoded = yield (0, util_1.promisify)(jsonwebtoken_1.default.verify)(token, auth_1.default.secret);
        let admin_check = yield (0, index_1.default)('users').where({ id: decoded[0].id });
        if (admin_check[0].provider === true) {
            return next();
        }
        // @ts-ignore
        req.userId = decoded.id;
        return res.json({ error: "você não tem permissão para acessar essa rota" });
    }
    catch (err) {
        // se o token não bater retorna um erro
        return res.status(401).json({ error: "token invalid!" });
    }
});
//# sourceMappingURL=admin_Check.js.map