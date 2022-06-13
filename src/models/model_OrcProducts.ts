import mongoose from 'mongoose';

interface OrcProducts extends mongoose.Document {
    products: any;
    created_at: Date;
    update_at: Date;
}


const OrcProductsSchema = new mongoose.Schema({
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

export const model_OrcProducts = mongoose.model('OrcProducts', OrcProductsSchema);
