const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Todo = require("./models/todos");

const server = express();
server.use(express.json());
server.use(cors({
  origin:["https://mern-todos-gilt.vercel.app"],
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials:true
}));

mongoose.connect("mongodb+srv://pateljimi2020:pateljimi2020@cluster0.yhvpu71.mongodb.net/?retryWrites=true&w=majority").then((data) => {
  console.log("connected to database");
});

server.post("/addNew", async (req, res) => {
  const data = req.body;
  const todo = await Todo(data);
  await todo.save();
  res.send(todo);
});

server.get('/', async (req, res)=>{
  res.send("<h1>Hello world</h1>")
})

server.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort({ time: -1 });
  // res.send(todos);
  res.json(todos)
});

server.put("/todo", async (req, res) => {
  const [id, obj] = await req.body;
  const todo = await Todo.findByIdAndUpdate(id, obj);
  res.send(todo);
});

server.delete("/:id", async (req, res) => {
  const id = await req.params.id;
  const todo = await Todo.findByIdAndDelete(id);
  res.send(todo);
});

server.listen(process.env.PORT, () => {
  console.log("server started on port 4000");
});
