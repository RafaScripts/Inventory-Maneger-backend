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
const yup = __importStar(require("yup"));
class VendorController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vendors = yield (0, index_1.default)('vendors');
            return res.json(vendors);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Schema = yup.object().shape({
                VendorName: yup.string().required()
            });
            if (!(yield Schema.isValid(req.body))) {
                return res.status(400).json({ error: "Name is required" });
            }
            const { id, VendorName } = req.body;
            try {
                yield (0, index_1.default)('vendors').insert({
                    VendorName
                });
            }
            catch (e) {
                return res.status(400).json({ error: "Error insert in database, try again" });
            }
            return res.status(201).json({ id, VendorName });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, VendorName } = req.body;
            if (!id) {
                return res.json('Id not parse.');
            }
            yield (0, index_1.default)('vendors').update({ VendorName }).where({ id: id });
            return res.json('Ok Vendor Updated');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield (0, index_1.default)('vendors').del().where({
                id: id,
            });
            res.status(200).json(response);
        });
    }
}
exports.default = new VendorController;
//# sourceMappingURL=VendorController.js.map