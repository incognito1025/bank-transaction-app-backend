//transactionsController.js
// Dependencies
const express = require("express")

const transactionsRouter = express.Router()
const transactionArr = require("../models/transaction")

// Index Route
transactionsRouter.get("/", (req, res) => {
    try {  // the try-catch block will handle errors that might occur when sending the response
        res.status(200).send(transactionArr) // send a response with status code 200 and the transactions array as the response body.
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!" }) // if there is an error, send a 500 status code and an error message
    }
})

// Show Route
transactionsRouter.get("/:id", (req, res) => { // defines route handler for GET request with parameter of `:id`
    const { id } = req.params // extracting parameters: destructure id from request param which holds parameters in the URL path (:id)
    const transaction = transactionArr.find((transaction) => transaction.id === parseInt(id)) // transactionArr represents array in transaction.js. The find method searches for a transaction where the `transaction.id` matches the `id` extracted from the URL

    if (transaction) {
        res.status(200).send(transaction) // send the transaction if found
    } else {
        res.status(404).json({ error: `Transaction with id ${id} does not exist.` }) // send 404 if the transaction is not found
    }
})

// Export
module.exports = transactionsRouter
