"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// @ts-ignore
const bcrypt_1 = __importDefault(require("bcrypt"));
const Yup = __importStar(require("yup"));
const index_2 = __importDefault(require("../database/index"));
class UserController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, index_1.default)('Users');
            return res.json(response);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //esquema de verificação
            const schema = Yup.object().shape({
                username: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().required().min(8)
            });
            //se o esquema não estiver valido retorna o erro ao usuario
            if (!(yield schema.isValid(req.body))) {
                return res.status(400).json({ error: "dados invalidos" });
            }
            //verificação de usuario para não haver duplicação
            const checkOne = yield (0, index_1.default)('Users').first().where({ email: req.body.email });
            if (checkOne) {
                return res.status(400).json({ error: "usuario ja cadastrado" });
            }
            const { username, email, password, Caixa, Operator, Provider } = req.body;
            const { provider } = req.query;
            // somente usuarios com provider true podem fazer cadastros de novos usuarios.
            if (provider === "true") {
                const password_hash = yield bcrypt_1.default.hash(password, 8);
                yield (0, index_1.default)('Users').insert({ username, email, password_hash, Caixa, Operator, Provider });
                return res.status(201).json('ok created');
            }
            else {
                return res.json('User not Authorized to make this request');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
                password: Yup.string().required().min(8)
            });
            if (!(yield schema.isValid(req.body))) {
                return res.status(400).json({ error: "dados invalidos" });
            }
            const checkOne = yield (0, index_1.default)('Users').where({ id: Number(req.query.id) });
            if (!checkOne) {
                return res.json('Usuario não existe');
            }
            const { email, password } = req.body;
            if (req.query.provider === "true") {
                if (password) {
                    const password_hash = yield bcrypt_1.default.hash(password, 8);
                    yield (0, index_2.default)('Users').update({ password_hash }).where({ id: Number(req.query.id) });
                }
                if (email) {
                    yield (0, index_2.default)('Users').update({ email: email }).where({ id: Number(req.query.id) });
                }
            }
            return res.json({ email });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { provider } = req.query;
            if (provider === "true") {
                yield (0, index_1.default)('Users').delete().where({ id: Number(req.query.id) });
                return res.json('ok deleted');
            }
            return res.json('Usuario não autorizado');
        });
    }
}
exports.default = new UserController;
//# sourceMappingURL=UserController.js.map