// Dependencies
const express = require("express")

const transactionsRouter = express.Router()
const transactionArr = require("../models/transaction")

// Index Route
transactionsRouter.get("/", (request, response) => {
    response.status(200).send(transactionArr)
    try{  //the try catch block will handle errors that might occur when sendign the response
        response.status(200).send(transactionArr) //send a response with status code sends the transactions.js array as the response body.
    }
    catch(error) {
        response.status(404).json({error: `Something is off!`}) //if there is an error hopefully this message will flag it.
    }
})


// Show Route
transactionsRouter.get("/:id", (request, response) => { //defines route handle for GET request with paramater of `:id`

    const { id } = request.params  //extracting parameters: destructure id from request param which holds parameters in the URL path (:id)

    const transaction = transactionArr.find((transaction) => transaction.id === id) // transactionArr represents array in transaction.js. the find rearches for a transaction where the `transaction.id` matches the `id` extracted from the URL

    if (transaction) {
            response.status(200).send(transaction)
    } else {
        // res.status(404).json({error: `Transaction with id ${id} does not exist.`})
        response.send("There is no transaction matching this id: " + id)
    }
})



// Export
module.exports = transactionsRouter;