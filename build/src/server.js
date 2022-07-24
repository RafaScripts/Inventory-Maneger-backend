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
const express_1 = __importDefault(require("express"));
//import xmlparser from "express-xml-bodyparser";
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./database");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*', credentials: true }));
app.use(express_1.default.json());
//app.use(xmlparser());
app.use(routes_1.default);
(0, database_1.dbConnect)().then(() => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(process.env.PORT || 3333, () => {
        console.log(`Server is running on port ${process.env.PORT || 3333}`);
    });
}));
//# sourceMappingURL=server.js.map