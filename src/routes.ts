import express from "express";
//import xmlparser from "express-xml-bodyparser";
import multer from 'multer';
const multerConfig = multer();

//importação dos Controllers

import VendorController from "./controllers/VendorController";
import ItensController from "./controllers/ItensController";
import importXMLcontroller from "./controllers/ImportXMLcontroller";
import UserController from "./controllers/UserController";
import OrcController from "./controllers/OrcController";
import ReportsController from "./controllers/ReportsController";
import ImportXMLcontroller from "./controllers/ImportXMLcontroller";
import ImportCsvController from "./controllers/ImportCsvController";
import SessionController from "./controllers/SessionController";
import ActivateController from "./controllers/ActivateController";
import StatusController from "./controllers/StatusController";
import AuthMiddleware from "./midlewares/auth";
import TokenMiddleware from "./midlewares/token";

const Routes = express();

// Actvate
Routes.post('/active', ActivateController.store)
    .get('/tes', ActivateController.test);

// Login
Routes.post('/login', SessionController.store);

//middleware de Tokens
//Routes.use(TokenMiddleware);

//midleware de autenticação
// ativar na proxima atualização
//Routes.use(AuthMiddleware);



// Usuarios
Routes.get('/users', UserController.index)
    .post('/users', UserController.create)
    .put('/users', UserController.update)
    .delete('/users', UserController.delete);

// CFOP
Routes.get('/cfop', importXMLcontroller.index);

// Fornecedores
Routes.get('/vendors', VendorController.index)
    .post('/vendors', VendorController.create)
    .put('/vendors', VendorController.update)
    .delete('/vendors/:id', VendorController.delete);

// Produtos
Routes.get('/itens', ItensController.index)
    .post('/itens', ItensController.create)
    .put('/itens/:id', ItensController.update)
    .delete('/itens/:id', ItensController.delete);

// Orçamentos
Routes.get('/orcamentos', OrcController.index)
    .post('/orcamentos', OrcController.create)
    .put('/orcamentos/:id', OrcController.update)
    .delete('/orcamentos/:id', OrcController.delete);

// Status ORC
Routes.get('/status', StatusController.store)
    .post('/status', StatusController.create);

// Relatorios
Routes.get('/reports', ReportsController.index)
    .post('/reports', ReportsController.create);

// XML
Routes.get('/xml', ImportXMLcontroller.index)
    .post('/xml', ImportXMLcontroller.create);

// CSV
Routes.post('/csv', multerConfig.single('file'), ImportCsvController.create);

// NF-e e NFC-e

export default Routes;

