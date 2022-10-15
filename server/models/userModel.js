import mongoose from "mongoose";

const userSchema =mongoose.Schema({

    fullname: 'String',
    email: 'String',
    password: 'String',
    userType: {
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    }
})

export default mongoose.model('User',userSchema)
