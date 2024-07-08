# Bank Transaction App Backend

This is the backend for a budgeting application. It is built using Express.js and includes basic CRUD operations for managing transactions. 

## FinanceTrack App

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Wireframe](#wireframe)

## Installation

1. DO NOT clone the repository. Create from scratch:

   ```bash
   //Web URL
   https://github.com/incognito1025/bank-transaction-app-backend.git
   ```


2. Initialize a Node.js project and create necessary directories and files: :

   ```bash
     mkdir bank-transaction-app-backend
     cd bank-transaction-app-backend
     npm init -y
     mkdir data controllers models
     touch data/transactions.json controllers/transactionController.js models/transaction.js .gitignore app.js server.js .env README.md
     ```


3. Install Dependencies:

     ```bash
     npm install express cors dotenv nanoid
     npm install --save-dev nodemon
     ```


4. Create a `.env` file and set the port:

   ```
   PORT=7777
   ```


5. Update .gitignore file:

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


6. Update `package.json` scripts:

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


4. Start the server:
   ```bash
   npm run dev
   ```
   or 

   ```bash
   npx nodemon server.js
   ```


## Usage

Once the server is running, you can access the following endpoints to manage your transactions.

## API Endpoints

- **GET** `/transactions` - Retrieve all transactions.
- **GET** `/transactions/:id` - Retrieve a specific transaction by ID.
- **POST** `/transactions` - Create a new transaction.
- **PUT** `/transactions/:id` - Update a specific transaction by ID.
- **DELETE** `/transactions/:id` - Delete a specific transaction by ID.


## Wireframe

```
bank-transaction-app-backend/
│
├── controllers/
│   └── transactionsController.js    # Controller for handling transactions
│
├── models/
│   ├── transactions.js             # Transaction model defining a static array of transaction objects
│   └── transactions.json           # JSON file to store dynamic transaction data
│
├── node_modules/                   # Node.js modules (generated, not typically stored in Git)
│
├── .env                            # Environment variables configuration file
├── .gitignore                      # Git ignore file to exclude certain files/directories
├── app.js                          # Main application setup file
├── package-lock.json               # Exact version lock of dependencies for reproducibility
├── package.json                    # Project metadata and dependencies
├── server.js                       # Server configuration and entry point
└── README.md                       # Project documentation
└── notes.md                        # To store numerous function comments, reference materials etc.

```

## Detailed Explanation

### app.js
Sets up the Express application, enabling CORS, JSON parsing, and defines the main routes.


### server.js
Loads environment variables using `dotenv`, sets the application to listen on the port defined in the `.env` file.


### .env
Contains environment-specific variables such as the port number.


### models/transactions.js
Stores static array of transaction data in JavaScript format.


### models/transactions.json
Stores dynamic transaction data in JSON format.


### controllers/transactionsController.js
Handles CRUD operations for transactions, including GET, POST, PUT, and DELETE requests.


### .gitignore
Specifies files and directories to be ignored by Git, such as `node_modules` and `.env`.


### package.json
Defines the project dependencies and scripts.


### package-lock.json
Exact version locking of dependencies ensures consistent and reproducible builds.


### README.md
Serves as documentation for the project, including description, setup instructions, usage guidelines, API document, and other relevant details.


### notes.md
Serves as personal or team-specific document used primarily for jotting down informal notes, reminders, ideas, references, or any other information relevant to the project. 


## Links

[Live Site](add netifly/)
[Frontend Repo](https://github.com/incognito1025/bank-transaction-app-frontend.git)