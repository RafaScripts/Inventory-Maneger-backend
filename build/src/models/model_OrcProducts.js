"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.model_OrcProducts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OrcProductsSchema = new mongoose_1.default.Schema({
    products: {
        type: Array,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    update_at: {
        type: Date,
        default: Date.now
    }
});
exports.model_OrcProducts = mongoose_1.default.model('OrcProducts', OrcProductsSchema);
//# sourceMappingURL=model_OrcProducts.js.map