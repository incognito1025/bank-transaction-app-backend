// Dependencies
const express = require("express")

// Configuration
const app = express()

//Middleware - functions that have access to the request object (req), the response object(res) and middleware functions in request-response cycle
app.use(express.json()) //method to mount middleware functions at a specific path. if no path, then the middleware is mounted to the root path (executed for every incoming request)
//express.json parses incoming requests and handles JSON data

//Controllers
const transactionsController = require("./controllers/transactionsController")

app.use("/transactions", transactionsController) //app.use("/transactions", transactionsController) - this will set up a middleware to handle routes under the /`transactions` path. transactionsController is passed as a middleware function to handle requests that strat with `/transactions`. This controller will help define routes and respective logic for CRUD operations (Create, Read, Update, Delete) on transactions.


// Root/Health Check Route
app.get("/", (request, response) => {
    res.status(200).send("Welcome to Bank Transaction App") //Root route - app.get("/", ...) defines a route handler for GET requests to the root path ("/"). When a GET request is made to /, the callback function (req, res) => {...} is executed. Inside the callback function, res.status(200).send("Welcome to My Bank Transaction App") sends a HTTP status code of 200 (OK) along with the message "Welcome to My Bank Transaction App" as the response body.
})





// Export App
module.exports = app


/*

updated app.js with middleware to parse(analyze data); added show route in transactionControllers to extract `id` from array in transition.js; added 


*/