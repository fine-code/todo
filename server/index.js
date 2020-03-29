const express = require("express")

//connect to environment variables package
const config = require("./config");

const app = express(); //to use the express library
const cors = require("cors")

//use this connection to write queries to database
const pool = require("./db")

//middleware
app.use(cors());

//get data from client side as json data
app.use(express.json());

//test port to make sure it's listening
app.listen(5000, () => {
    console.log("server has started on port 5000");
});

//ROUTES//


//create a todo
app.post("/todos", async(req, res) => {
    try {
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description)" + 
            "VALUES ($1)" +
             "RETURNING *", //return the data back
        [description]);
        res.json(newTodo.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
})

//get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        
        const { id } = req.params;
        console.log(id);

        const todos = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1", 
            [id]);
        res.json(todos.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const { description } = req.body;
        const { id } = req.params;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", 
            [description, id]
            );
            res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
})


//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1", 
            [id]
            );
            res.json("Todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
})



