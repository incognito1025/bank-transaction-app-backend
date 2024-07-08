// Dependencies
const express = require("express");
const { nanoid } = require("nanoid");
const transactionsRouter = express.Router();
const transactionArr = require("../models/transaction");
const fs = require("fs");
const path = require("path");

// Index Route: Retrieve all transactions.
// Postman Test GET: http://localhost:7777/transactions ; includes all data from transaction.js (static), not transaction.json (dynamic - includes updated data.)
transactionsRouter.get("/", (request, response) => {
    try { 
        response.status(200).send(transactionArr);
    
    // Error handling try/catch block
    } catch (error) {
        response.status(404).json({ error: "Something isn't working correctly!" });
    }
});



// Show Route: Retrieve a specific transaction by ID.
// Postman Test GET: http://localhost:7777/transactions/:id ; includes all data from transaction.js (static), not transaction.json (dynamic - includes updated data.)
transactionsRouter.get("/:id", (request, response) => {
    const { id } = request.params;
    const transaction = transactionArr.find(transaction => transaction.id === id);

    // Error handling if/else block
    if (transaction) {
        response.status(200).send(transaction);
    } else {
        response.status(404).json({ error: `Transaction id ${id} not found.` });
    }
});



// Create Route: Create a new transaction
// Postman Test POST: http://localhost:7777/transactions  Headers: content-type application/json, then add object data in Body
transactionsRouter.post("/", (request, response) => {
    const singleTrans = { id: nanoid(), ...request.body };
    transactionArr.push(singleTrans);

    // Save the updated transactionArr array to a JSON file
    const filePath = path.join(__dirname, "../models/transaction.json");

    //const filePath = path.join(__dirname, "../invalid-path/transaction.json"); // Invalid path to force an error

    fs.writeFile(filePath, JSON.stringify(transactionArr), (error) => {

      // Error handling if/else block
        if (error) {
            console.error(error);
            response.status(500).send("Failed to save transaction!");
        } else {
            response.status(201).json(singleTrans); // Respond with the newly added transaction on successful save
        }
    });
});




//Update Route: Update a specific transaction by ID.
//Postman Test PUT: http://localhost:7777/transactions/:id  Headers: content-type application/json, then add object data in Body
transactionsRouter.put("/:id", (request, response) => {  
  const { id } = request.params; 
  const updateTransIndex = transactionArr.findIndex((transaction) => transaction.id === id); 
  transactionArr[updateTransIndex] = request.body; 

  if (updateTransIndex !== -1){
    transactionArr[updateTransIndex] = { id, ...request.body };

    //Save the updated transactionArr array to a JSON file
    const filePath = path.join(__dirname, "../models/transaction.json");
    fs.writeFile(filePath, JSON.stringify(transactionArr), (error) => {

      // Error handling if/else block
      if (error) {
        console.error(error);
        response.status(500).send("Failed to save transaction!");
      } else {
    response.status(200).json(transactionArr[updateTransIndex]); 
      }
    });
  } else {
    response.status(404).json({error: `Transaction id ${id} not found.`});
  }
   
});




//Delete Route: Delete a specific transaction by ID.
//Postman Test DELETE: http://localhost:8888/transactions/:id  Headers: content-type application/json, then add object data in Body
transactionsRouter.delete("/:id", (request, response) => {
  const { id } = request.params;
  const deletedTransIndex = transactionArr.findIndex((transaction) => transaction.id === id);
  
  if (deletedTransIndex !== -1) {
    const deletedTrans = transactionArr.splice(deletedTransIndex, 1)[0];

  //Save the updated transactionArr Array to a JSON file
  const filePath = path.join(__dirname, "../models/transaction.json");
  fs.writeFile(filePath, JSON.stringify(transactionArr), (error) => {

  // Error handling if/else block
  if (error) {
      console.error(error);
      response.status(500).send("Failed to update transaction history!");
  } else {
    response.status(200).json(deletedTrans);
  }
  });
} else {
  response.status(404).json({ error: `Transaction id ${id} not found` });
} 
});


module.exports = transactionsRouter;