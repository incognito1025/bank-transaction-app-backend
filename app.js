// Dependencies
const express = require("express")

// Configuration
const app = express()

//Controllers
const transactionsController = require("./controllers/transactionsController")

app.use("/transactions", transactionsController) //app.use("/transactions", transactionsController) - this will set up a middleware to handle routes under the /`transactions` path. transactionsController is passed as a middleware function to handle requests that strat with `/transactions`. This controller will help define routes and respective logic for CRUD operations (Create, Read, Update, Delete) on transactions.




// Root/Health Check Route
app.get("/", (req, res) => {
    res.status(200).send("Welcome to Bank Transaction App")
})

// Export App
module.exports = app


/*




*/