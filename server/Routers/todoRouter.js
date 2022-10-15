import express from "express";
import mongoose from "mongoose";
import Todo from '../models/todoModel.js';

const router = express.Router();

http://localhost:3000/todos/create_todo POST isteği
router.post("/create_todo", async(req,res)=>{
    try {
        const {task, status, deadline, userID } = req.body;
        const todoExists = await Todo.findOne({ task })
        if(todoExists)
            return res.status(400).json({ message: 'Todo already exists.'})
        const createdTodo = await Todo.create({
            
            task,
            status,
            deadline,
            userID
        })
        return res.status(201).json(createdTodo);    

    } catch (error) {
        console.log(error)
        return res.json({message: "create todo failed"})
    }

})
// http://localhost:3000/todos/delete_todo adresine DELETE isteği.
router.delete("/delete_todo", async(req,res) => {
    try {
        const {task} = req.body;
        const todo = await Todo.findOne({task})
        if(!todo)
            return res.status(400).json({message: "todo does not exist"})
        const deletedTodo = await Todo.deleteOne({
            task,
        })
        return res.status(200).json(deletedTodo)

    } catch (error) {
        console.log(error)
        return res.json({message:"to delete todo is failed"})
    }
})

router.put


export default router;