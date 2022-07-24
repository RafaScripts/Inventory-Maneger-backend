"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import xmlparser from "express-xml-bodyparser";
const multer_1 = __importDefault(require("multer"));
const multerConfig = (0, multer_1.default)();
//importação dos Controllers
const VendorController_1 = __importDefault(require("./controllers/VendorController"));
const ItensController_1 = __importDefault(require("./controllers/ItensController"));
const ImportXMLcontroller_1 = __importDefault(require("./controllers/ImportXMLcontroller"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const OrcController_1 = __importDefault(require("./controllers/OrcController"));
const ReportsController_1 = __importDefault(require("./controllers/ReportsController"));
const ImportXMLcontroller_2 = __importDefault(require("./controllers/ImportXMLcontroller"));
const ImportCsvController_1 = __importDefault(require("./controllers/ImportCsvController"));
const SessionController_1 = __importDefault(require("./controllers/SessionController"));
const ActivateController_1 = __importDefault(require("./controllers/ActivateController"));
const StatusController_1 = __importDefault(require("./controllers/StatusController"));
const auth_1 = __importDefault(require("./midlewares/auth"));
const admin_Check_1 = __importDefault(require("./midlewares/admin_Check"));
const Routes = (0, express_1.default)();
// Actvate
Routes.post('/active', ActivateController_1.default.store)
    .get('/tes', ActivateController_1.default.test);
// Login
Routes.post('/login', SessionController_1.default.store);
//middleware de Tokens
//Routes.use(TokenMiddleware);
//midleware de autenticação
// ativar na proxima atualização
Routes.use(auth_1.default);
// GET, POST, PUT, DELETE - HTTP METHODS
// Usuarios
Routes.get('/users', UserController_1.default.index)
    .post('/users', admin_Check_1.default, UserController_1.default.create)
    .put('/users', admin_Check_1.default, UserController_1.default.update)
    .delete('/users', admin_Check_1.default, UserController_1.default.delete);
// CFOP
Routes.get('/cfop', ImportXMLcontroller_1.default.index);
// Fornecedores
Routes.get('/vendors', VendorController_1.default.index)
    .post('/vendors', VendorController_1.default.create)
    .put('/vendors', VendorController_1.default.update)
    .delete('/vendors/:id', VendorController_1.default.delete);
// Produtos
Routes.get('/itens', ItensController_1.default.index)
    .post('/itens', ItensController_1.default.create)
    .put('/itens/:id', ItensController_1.default.update)
    .delete('/itens/:id', ItensController_1.default.delete);
// Orçamentos
Routes.get('/orcamentos', OrcController_1.default.index)
    .post('/orcamentos', OrcController_1.default.create)
    .put('/orcamentos', OrcController_1.default.update)
    .delete('/orcamentos/:id', OrcController_1.default.delete);
// Status ORC
Routes.get('/status', StatusController_1.default.store)
    .post('/status', StatusController_1.default.create);
// Relatorios
Routes.get('/reports', ReportsController_1.default.index)
    .post('/reports', ReportsController_1.default.create);
// XML
Routes.get('/xml', ImportXMLcontroller_2.default.index)
    .post('/xml', ImportXMLcontroller_2.default.create);
// CSV
Routes.post('/csv', multerConfig.single('file'), ImportCsvController_1.default.create);
// NF-e e NFC-e
exports.default = Routes;
//# sourceMappingURL=routes.js.map