Setup Steps

//Use npm run to start the program

### Project Structure and Setup

```
bank-transaction-app-backend/
│
├── data/
│   └── transactions.json
│
├── src/
│   ├── controllers/
│   │   └── transactionController.js
│   ├── helpers/
│   │   └── fileHelper.js
│  
├── index.js
├── .gitignore
├── package.json
└── README.md

```

```
bank-transaction-app-backend/
│
├── data/                    // Directory containing data files
│   └── transactions.json          // JSON file for storing transaction data
│
├── src/                     // Source code directory
│   ├── controllers/         // Controllers directory
│   │   └── transactionController.js  // Controller for handling transaction operations
│   ├── helpers/             // Helpers directory
│   │   └── fileHelper.js    // Helper functions for file operations
│  
├── index.js                 // Main entry point of the application
├── .gitignore               // Git ignore file to exclude certain files/directories
├── package.json             // Node.js package configuration file
└── README.md                // Readme file with project description and instructions






```
### Setup Steps

1. **Project Initialization:**
   - Initialize a Node.js project with `npm init -y`.
   - Create necessary directories and files:

     ```
     mkdir back-transaction-app-backend
     cd back-transaction-app-backend
     touch .gitignore app.js server.js README.md instructions.md
     npm install nanoid@3
     ```

     ```sh
     mkdir src
     mkdir src/controllers
     touch src/controllers/transactionController.js
     mkdir src/helpers
     touch src/helpers/fileHelper.js
     touch app.jss

     mkdir data
     touch data/transactions.json
    
    npm install cors
    npm install dotenv
    npm install express

    alternate: 
    npm install cors dotenv express

     ```

   - Setup `package.json` with appropriate scripts:
     ```json
     "scripts": {
       "index": "node src/index.js index",
       "create": "node src/index.js create",
       "show": "node src/index.js show",
       "update": "node src/index.js update",
       "destroy": "node src/index.js destroy",
       "vip": "node src/index.js vip"
     }
     ```

    - Setup `.gitignore` with appropriate details:
     ```
     # Node.js dependencies
     /node_modules
     .DS_STORE
     
     #Log files
     npm-debug.log*
     yarn-debug.log*
     yarn-error.log*
     
     # Environment variables
     .env
    
    # Data files
    /data/transactions.json

     ```


   - Setup `.env` file with appropriate details:
     ```sh
     npm install dotenv
     touch .env

     # Example .env file
     # This is where you can put your environment variables
     # e.g., DATABASE_URL, API_KEY, etc.
     # For now, let's leave it empty
     ```



     ```

2. **File Contents and Directories/Dependencies:**

   - **index.js:** Main entry point handling CLI commands.
   - **helpers.js:** Utility functions for reading and writing JSON files.
   - **transactionController.js:** Functions for CRUD operations for transactions
   - **transactions.json:** Stores the transaction list. empty array []
   - **.gitignore:** Specifies files and directories to be ignored by Git.
   - **package.json:** Manages project dependencies and scripts.
   **README.md:** Describes the project and provides instructions.




