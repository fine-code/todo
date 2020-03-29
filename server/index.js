const express = require("express")

//connect to environment variables package
require("dotenv").config();

//test the .env package
console.log(process.env);

const app = express(); //to use the library
const cors = require("cors")

//use this connection to write queries to database
const pool = require("./db")

//middleware
app.use(cors());

//get data from client side as json data
app.use(express.json());

//test port to make sure it's listening
app.listen(5432, () => {
    console.log("server has started on port 5432");
});

//ROUTES//

//create a todo

app.post("/todos", async(req, res) => {
    try {
        console.log(req.body)
    }
    catch (err) {
        console.error(err.message);
    }
})

//get all todos

//get a todo

//update a todo

//delete a todo