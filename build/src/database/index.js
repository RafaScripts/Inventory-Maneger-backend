"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
// @ts-ignore
const knexfile_1 = __importDefault(require("../../knexfile"));
const mongoose_1 = __importDefault(require("mongoose"));
const knex = require("knex")(knexfile_1.default.development);
const mongoDB_URL = "mongodb+srv://main:032211@geral.el57i.mongodb.net/sysposDev?retryWrites=true&w=majority";
const dbConnect = () => {
    return new Promise((resolve) => {
        mongoose_1.default.Promise = require(`bluebird`);
        // mongoose.set('debug', true)
        //mongoose.set('useCreateIndex', true)
        //mongoose.set('useFindAndModify', false);
        mongoose_1.default.connect(mongoDB_URL);
        mongoose_1.default.connection.on(`connected`, () => {
            console.log(`Mongoose connected to ${mongoDB_URL}`);
            resolve();
        });
        const db = mongoose_1.default.connection;
        mongoose_1.default.connection.on(`error`, (error) => {
            console.log(`MongoDB error => `, error);
        });
        db.on('error', console.error.bind(console, 'connection error:'));
        db.on('connected', resolve);
    });
};
exports.dbConnect = dbConnect;
exports.default = knex;
//# sourceMappingURL=index.js.map