import express from "express";

//importação dos Controllers

import VendorController from "./controllers/VendorController";
import ItensController from "./controllers/ItensController";

const Routes = express();

Routes.get('/vendors', VendorController.index)
    .post('/vendors', VendorController.create);

Routes.get('/itens', ItensController.index)
    .post('/itens', ItensController.create);

export default Routes;

