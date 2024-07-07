// Dependencies
const express = require("express")

const transactionsRouter = express.Router()
const transactionArr = require("../models/transaction")

// Index Route
transactionsRouter.get("/", (req, res) => {
    res.status(200).send(transactionArr)
})

// Export
module.exports = transactionsRouter;