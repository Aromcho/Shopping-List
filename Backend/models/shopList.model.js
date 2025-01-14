import { Schema, model } from 'mongoose';

const collection = 'shopList';

const shopListSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    typeAmount: {
        type: String,
        required: true,
        enum: [ 'mg', 'kg', 'unit']
    }
});

const ShopList = model(collection, shopListSchema);
export default ShopList;