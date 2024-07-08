My Setup Steps for Backend app
FYI for myself - must type `npm run dev` or `npx nodemon server.js` to run the server. nodemon will not install globally.

### Project Structure and Setup Instructions
Your setup steps for the backend app are quite comprehensive and cover all necessary aspects. However, there are a few minor adjustments and potential redundancies that could be addressed for clarity and efficiency:

### Setup Steps

Here are your revised setup steps for the backend app, including the additions and adjustments you requested:

### Project Structure/Map

```
bank-transaction-app-backend/
│
├── data/                    // Directory containing data files
│   └── transactions.json    // JSON file for storing transaction data
│
├── controllers/             // Controllers directory
│   └── transactionController.js  // Controller for handling transaction operations
│
├── models/                  // Models directory
│   └── transaction.js       // Transaction model
│
├── .gitignore               // Git ignore file to exclude certain files/directories
├── .env                     // Environment variables file
├── app.js                   // Main application setup file
├── server.js                // Server entry point
├── package.json             // Node.js package configuration file
└── README.md                // Readme file with project description and instructions
```

### Setup Steps

1. **Project Initialization and Structure:**
   - Initialize a Node.js project and create necessary directories and files:

     ```bash
     mkdir bank-transaction-app-backend
     cd bank-transaction-app-backend
     npm init -y
     mkdir data controllers models
     touch data/transactions.json controllers/transactionController.js models/transaction.js .gitignore app.js server.js .env README.md
     ```

2. **Install Dependencies:**
   - Install required Node.js packages:

     ```bash
     npm install express cors dotenv nanoid
     npm install --save-dev nodemon
     ```

3. **Configure `.env` file:**
   - Set up environment variables like port number:

     ```plaintext
     PORT=5173
     ```

4. **Update `package.json` scripts:**
   - Modify scripts for running the server. Note the instruction to use `npm run dev` or `npx nodemon server.js` to run the server:

     ```json
     {
       "name": "bank-transaction-app-backend",
       "version": "1.0.0",
       "description": "Backend practice",
       "main": "server.js",
       "scripts": {
         "test": "echo \"Error: no test specified\" && exit 1",
         "start": "node server.js",
         "dev": "nodemon server.js"
       },
       "keywords": [],
       "author": "Niki K.",
       "license": "ISC",
       "dependencies": {
         "cors": "^2.8.5",
         "dotenv": "^16.4.5",
         "express": "^4.19.2",
         "nanoid": "^3.3.7"
       },
       "devDependencies": {
         "nodemon": "^3.1.4"
       }
     }
     ```

5. **Setup `.gitignore` file:**
   - Specify files and directories to be ignored by Git:

     ```plaintext
     # Node.js dependencies
     /node_modules
     .DS_STORE
     
     # Log files
     npm-debug.log*
     yarn-debug.log*
     yarn-error.log*
     
     # Environment variables
     .env
     
     # Data files
     /data/transactions.json
     ```

6. **Create initial `transactions.json` file:**
   - Initialize the JSON file for storing transaction data:

     ```json
     []
     ```

7. **Create `app.js`:**
   - Set up the main application file to configure Express:

     ```javascript
     require('dotenv').config();
     const express = require("express");
     const app = express();
     
     app.use(express.json());
     
     const transactionsController = require("./controllers/transactionController");
     app.use("/transactions", transactionsController);
     
     app.get("/", (req, res) => {
         res.status(200).send("Welcome to My Bank Transaction App");
     });
     
     module.exports = app;
     ```

8. **Create `server.js`:**
   - Implement the server entry point to start the Express app:

     ```javascript
     const app = require("./app");
     require("dotenv").config();
     const PORT = process.env.PORT || 3000; // Default to port 3000 if PORT is not specified
     
     app.listen(PORT, () => {
         console.log(`Listening on port ${PORT}`);
     });
     ```

9. **Create `controllers/transactionController.js`:**
   - Define the controller for handling transaction operations:

     ```javascript
     const express = require("express");
     const transactionsRouter = express.Router();
     const transactionArray = require("../models/transaction");
     
     transactionsRouter.get("/", (req, res) => {
         res.status(200).send(transactionArray);
     });
     
     module.exports = transactionsRouter;
     ```

### Notes

- **Running the Server:** Remember to use `npm run dev` or `npx nodemon server.js` to start the server, as indicated in setup steps.
  
- **Verification:** After running `npm run dev`, you should see a message indicating the server is listening on the specified port, confirming the setup is correct.

# Things I need to keep in mind, especially in the context of a transaction app:

### HTTP Status Codes

```
200 OK: Request succeeded; the server successfully returned the requested data.
201 Created: Request succeeded; the server has successfully created a new resource as a result of the request (commonly used after a successful POST request).
400 Bad Request: The server could not understand the request due to malformed syntax or other client-side errors.
401 Unauthorized: The request requires user authentication. The user needs to provide valid credentials to access the resource.
403 Forbidden: The server understood the request, but it refuses to authorize it. The user might not have the necessary permissions for the resource.
404 Not Found: The server cannot find the requested resource. This is commonly used when a requested resource does not exist.
405 Method Not Allowed: The method specified in the request (GET, POST, etc.) is not allowed for the resource identified by the request URI.
500 Internal Server Error: A generic error message indicating that something unexpected went wrong on the server side. This is often used for unspecified server-side errors.
503 Service Unavailable: The server is currently unable to handle the request due to temporary overloading or maintenance of the server.

```