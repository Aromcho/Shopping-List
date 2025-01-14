import { Schema, model} from 'mongoose';

const collection = 'users';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim:true
    }
});

const User = model(collection, userSchema);
export default User;