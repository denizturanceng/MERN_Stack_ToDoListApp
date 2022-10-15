import mongoose from "mongoose";
const todoSchema =mongoose.Schema({

    task: 'String',
    status: 'String',
    deadline: 'String',
    userID: 'String'
})

export default mongoose.model('Todo',todoSchema)