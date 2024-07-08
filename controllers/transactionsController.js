// Dependencies
const express = require("express");
const { nanoid } = require("nanoid");
const transactionsRouter = express.Router();
const transactionArr = require("../models/transaction");
const fs = require("fs");
const path = require("path");

// Index Route: Retrieve a list of all transactions
// Postman Test GET: http://localhost:8888/transactions
transactionsRouter.get("/", (request, response) => {
    try { 
        response.status(200).send(transactionArr);
    
    // Error handling try/catch block
    } catch (error) {
        response.status(404).json({ error: "Something isn't working correctly!" });
    }
});

// Show Route: Retrieve a specific transaction by its ID
// Postman Test GET: http://localhost:8888/transactions/:id
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

// Create Route: Create one new transaction
// Postman Test POST: http://localhost:8888/transactions  Headers: content-type application/json, then add object data in Body
transactionsRouter.post("/", (request, response) => {
    const singleTrans = { id: nanoid(), ...request.body };
    transactionArr.push(singleTrans);

    // Save the updated transactionArr array to a JSON file
    const filePath = path.join(__dirname, "../models/transaction.json");
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

//Update Route: Update a single transaction
//Postman Test POST: http://localhost:8888/transactions/:id  Headers: content-type application/json, then add object data in Body

transactionsRouter.put("/:id", (request, response) => {  //Route definition at endpoint `/:id`, which is a placeholder for the unique identifier
  const { id } = request.params; //request parameters. Extracts `id` parameter from requests' URL parameters. represents unique identifier for the transaction to be updated
  const updateTransIndex = transactionArr.findIndex((transaction) => transaction.id === id); //searches through transactionArr array to find the index of the transadction object that matches id. findIndex method iterates over each transaction in the array and returns the index of the first transaction that satisfies the provided condition that transaction id is strictly equal to id (includes letters and numbers)
  transactionArr[updateTransIndex] = request.body; // transactionArr[updateTransIndex] is javascript code to access an element in array at a specific index like `array[5]`. once updateTransIndex is found, the code updates the transaction object at the index of transactionArr with the data from request.body. saction object at that index in transactionArr with the data from request.body. This assumes that request.body contains the updated fields of the transaction.

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
        response.status(200).json(transactionArr[updateTransIndex]); //the server responds with a status code of 200 (indicating success) and sends the updated transaction object (transactionArr[updateTransIndex]) as JSON in the response body.
      }
    });
  } else {
    response.status(404).json({error: `Transaction id ${id} not found.`});
  }
   
});





/*
// DELETE
colors.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedColorIndex = colorsArray.findIndex((color) => color.id === Number(id));
  const deletedColor = colorsArray.splice(deletedColorIndex, 1);
  res.status(200).json(deletedColor[0]);
});

//Error handling with delete:
// DELETE
colors.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedColorIndex = colorsArray.findIndex((color) => color.id === Number(id));
  if (deletedColorIndex) {
    const deletedColor = colorsArray.splice(deletedColorIndex, 1);
    res.status(200).json(deletedColor[0]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

///You can instead, choose to redirect after successful delete:
// DELETE
colors.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedColorIndex = colorsArray.findIndex((color) => color.id === Number(id));
  if (deletedColorIndex) {
    const deletedColor = colorsArray.splice(deletedColorIndex, 1);
    res.redirect("/colors");
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

*/


module.exports = transactionsRouter;



/*

Notes and additional explanations for my own reference:

```
Things I need to address for a real-world application when testing `Create Route`:


Assessment of current code: Yes, if there were a million transactions in the array, the newly created transaction would still appear at the end of the array. However, handling such a large number of transactions in a JSON file can lead to performance issues and potential data integrity problems.

My response: "That sounds awful from the client side of things. Normally if I enter a transaction, I usually get a verification that that newly created transaction was successfully entered into the bank system.  If I asked for a copy of my bank transaction statement, the newly created transaction will be the first to appear.  And even if I had a million transaction, the system will only provide a limited number of transaction history to confirm that the new transaction is present. Only when I ask for a full transaction history, will the system provide the entire list, with the newly created on on top of the transaction history. That's what a real banking app would do.""

My solution if I time:
for a real-world application, handling a large number of transactions in a more efficient and user-friendly way is crucial.
Steps to Improve Your System
Database Integration: Instead of using a JSON file to store transactions, use a database (e.g., MongoDB, PostgreSQL, MySQL). Databases are designed to handle large amounts of data efficiently and provide mechanisms for data integrity and concurrent access.

Pagination: Implement pagination for retrieving transactions. This allows you to return a limited number of transactions per request, improving performance and user experience. For example, you can return the 10 most recent transactions first.

Sorting: Ensure that transactions are sorted by date (newest first) when retrieved. This way, the most recent transactions appear at the top.

Efficient Writing: Instead of rewriting the entire file or data set, insert the new transaction directly into the database.

```

// Index Route: Retrieve a list of all transactions. If successful, data retrieved. If unsuccessful, error message displayed
transactionsRouter.get("/", (request, response) => {
    try {  // the try-catch block will handle errors that might occur when sending the response
        request.status(200).send(transactionArr) // send a response with status code 200 and the transactions array as the response body.
    } catch (error) {
        response.status(500).json({ error: "Something isn't working correctly!" }) // if there is an error, send a 500 status code and an error message
    }
})


```
// Index Route: Retrieve a list of all transactions
//Postman Test: http://localhost:1111/transactions
transactionsRouter.get("/", (request, response) => {
    response.status(200).json(transactionArr)
});


```

//HTTP Status Codes:

```
//HTTP Status Codes:
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


FYI

GET - request to read data
POST - request to create data
PUT - request to update data
DELETE - request to destroy data


RESTful Routes

#	Action	    URL	            HTTP Verb	CRUD	    Description
1	Create	    /colors	        POST	    Create	    Create a new color
2	Index	    /colors	        GET	        Read	    Get a list (or index) of all colors
3	Show	    /colors/:id	    GET	        Read	    Get an individual view (show one color)
4	Update	    /colors/:id	    PUT	        Update	    Update a color
5	Destroy	    /colors/:id	    DELETE	    Delete	    Delete a color

/////////////////////////////////////
Show
#	Action	    URL	            HTTP Verb	CRUD	    Description
3	Show	    /colors/:id	    GET	        Read	    Get an individual view (show one color)

The code below will only show one item. An index route would show a list. A show route will show one item with many more details.


// SHOW
colors.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(colorsArray.find((color) => color.id === Number(id)));
});


// SHOW With Error Handling
colors.get("/:id", (req, res) => {
  const { id } = req.params;
  const color = colorsArray.find((color) => color.id === Number(id));
  if (color) {
    res.send(color);
  } else {
    res.send("Cannot find any colors with this id: " + id);
  }
});

URL to access this route:
http://localhost:3333/colors/1
http://localhost:3333/colors/2

////////////////////////////////////////////////////////

Create
#	Action	    URL	            HTTP Verb	CRUD	    Description
1	Create	    /colors	        POST	    Create	    Create a new color

Creating new data will use a new HTTP verb: POST. However, the path name in the URL will stay the same as for the index route. Different HTTP verbs create different routes. You can manipulate the data using different routes, here you will push the new data into the array.

You can choose to either show the entire updated array or show only the new item. The response can change depending on the goal of your application.


// CREATE
colors.post("/", (req, res) => {
  colorsArray.push(req.body);
  res.json(colorsArray[colorsArray.length - 1]);
});


//Post requests
Now that you've created a POST route, how can you access it? The browser URL only lets you make GET requests.

You have a few options:

Build an index.html form, load it into your browser, and test it.
Download and use a program like Postman.
Use a command-line program like cURL.


//For Curl
Next, you can make a POST request. You'll need to add some flags and arguments to do so.

-X (HTTP verb) so you can choose POST (without this, the default is GET)
-d (data) the request body data you want to send
Putting it all together, the command looks like this:

curl -X POST -d 'blanchedalmond' http://localhost:3333/colors
Note: You are likely not getting anything back, despite writing a code that should return the new item you sent. Try to debug it.


// CREATE
colors.post("/", (req, res) => {
  // What's the value of req.body?
  console.log("This is req.body", req.body);
  colorsArray.push(req.body);
  res.json(colorsArray[colorsArray.length - 1]);
});




///////////////////////////////////////////////////////
DELETE
//Delete
Action	    URL	            HTTP Verb	CRUD	    Description
Destroy	    /colors/:id	    DELETE	    Delete	    Delete a color

```
// DELETE
colors.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedColorIndex = colorsArray.findIndex((color) => color.id === Number(id));
  const deletedColor = colorsArray.splice(deletedColorIndex, 1);
  res.status(200).json(deletedColor[0]);
});
```

Let's add delete functionality. Again, this functionality will only be available via an HTML form if you use a browser. So we'll use Postman to test it.
We will use the index position of the array item and splice out the deleted item, which will remove the item at that array position. Then, you will send the deleted color back.
We will use the filter method to filter out the array by the id and .

//Error handling with delete:
// DELETE
colors.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedColorIndex = colorsArray.findIndex((color) => color.id === Number(id));
  if (deletedColorIndex) {
    const deletedColor = colorsArray.splice(deletedColorIndex, 1);
    res.status(200).json(deletedColor[0]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

///You can instead, choose to redirect after successful delete:
// DELETE
colors.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedColorIndex = colorsArray.findIndex((color) => color.id === Number(id));
  if (deletedColorIndex) {
    const deletedColor = colorsArray.splice(deletedColorIndex, 1);
    res.redirect("/colors");
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

////////////////////////////////////////////////////////////////////

//Update
Action	    URL	            HTTP Verb	CRUD	Description
Update	    /colors/:id	    PUT	        Update	Update a color

You will take the array position of the item you want to update. You will set the value as the incoming req.body.
```
// UPDATE
colors.put("/:id", (req, res) => {
  const { id } = req.params;
  const colorToUpdateIndex = colorsArray.findIndex((color) => color.id === Number(id));
  colorsArray[colorToUpdateIndex] = req.body;
  res.status(200).json(colorsArray[colorToUpdateIndex]);
});
```

You can reuse the middleware functionality to check that the updated value has a name key.
```
// UPDATE
colors.put("/:id", checkForColorKey, (req, res) => {
  const { id } = req.params;
  const colorToUpdateIndex = colorsArray.findIndex((color) => color.id === Number(id));
  colorsArray[colorToUpdateIndex] = req.body;
  res.status(200).json(colorsArray[colorToUpdateIndex]);
});

```

//Test with postman
TEST WITH POSTMAN
Update the option to PUT.
http://localhost:3333/colors/0
Choose body.
Choose raw.
Select JSON.
In the text area, create a proper JSON object (double quotes around all the key and value pairs, no trailing commas )


/////////////////////////////////////////////////////////

//Middleware has three callbacks, req(), res() and next().
request's method host and path:

shell
app.use((req, res, next) => {});

functionality
app.use((req, res, next) => {
  console.log(req.method, req.headers.host, req.path);
  return next();
});


change flow of response
app.use((req, res, next) => {
  if (req.query.apikey) {
    // Go to the next matching route
    return next();
  } else {
    // Complete the request-response cycle
    res.send("You must supply an API key");
  }
});


//Limiting Routes
First, move the middleware into the colorsController right above the POST route (make sure POST route is the final route).

```
// Other routes should be above this code

colors.use((req, res, next) => {
  if (req.query.apikey) {
    return next();
  } else {
    res.send("You must supply an API key");
  }
});

// This should be the last route in the file
// CREATE
colors.post("/", (req, res) => {
  colorsArray.push(req.body);
  res.json(colorsArray[colorsArray.length - 1]);
});
```


//Middleware for specific routes

You can also write a named callback function instead of an anonymous callback.
```
function checkForColorKey = (req, res, next) => {
  if (req.body.hasOwnProperty("name")) {
   return next();
  } else {
    res.send("You must supply an object with a key of `name`");
  }
};

```

And include it in the POST route:

```
// CREATE
colors.post("/", checkForColorKey, (req, res) => {
  colorsArray.push(req.body);
  res.json(colorsArray[colorsArray.length - 1]);
});
```



```
app.post(path, callback [, callback ...])
Routes HTTP POST requests to the specified path with the specified callback functions. For more information, see the routing guide.

//app.post
app.post('/', function (req, res) {
  res.send('POST request to homepage')
})

Arguments
Argument	                Description	                                                            Default
path	                    The path for which the middleware function is invoked; can be any of:
                            A string representing a path.
                            A path pattern.
                            A regular expression pattern to match paths.
                            An array of combinations of any of the above.
                            For examples, see Path examples.	                                    '/' (root path)
callback	                Callback functions; can be:
                            A middleware function.
                            A series of middleware functions (separated by commas).
                            An array of middleware functions.
                            A combination of all of the above.
                            You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.

                            Since router and app implement the middleware interface, you can use them as you would any other middleware function.

                            For examples, see Middleware callback function examples.

                                                                                                        None

//app.get
app.get(path, callback [, callback ...])
Routes HTTP GET requests to the specified path with the specified callback functions.


app.get('/', function (req, res) {
  res.send('GET request to homepage')
})

Arguments
Argument	        Description	                                                                Default
path	            The path for which the middleware function is invoked; can be any of:
                    A string representing a path.
                    A path pattern.
                    A regular expression pattern to match paths.
                    An array of combinations of any of the above.
                    For examples, see Path examples.	                                        '/' (root path)
callback	        Callback functions; can be:
                    A middleware function.
                    A series of middleware functions (separated by commas).
                    An array of middleware functions.
                    A combination of all of the above.
                    You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.

                    Since router and app implement the middleware interface, you can use them as you would any other middleware function.

                    For examples, see Middleware callback function examples.

                                                                                                    None


//app.put
app.put(path, callback [, callback ...])
Routes HTTP PUT requests to the specified path with the specified callback functions.  

app.put('/', function (req, res) {
  res.send('PUT request to homepage')
})


Arguments
Argument	                        Description	                                                            Default
path	                            The path for which the middleware function is invoked; can be any of:
                                    A string representing a path.
                                    A path pattern.
                                    A regular expression pattern to match paths.
                                    An array of combinations of any of the above.
                                    For examples, see Path examples.	                                       '/' (root path)
callback	                        Callback functions; can be:
                                        A middleware function.
                                        A series of middleware functions (separated by commas).
                                        An array of middleware functions.
                                    A combination of all of the above.
                                    You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.

                                    Since router and app implement the middleware interface, you can use them as you would any other middleware function.

                                    For examples, see Middleware callback function examples.

                                                                                                            None




```
//app.delete

app.delete('/', function (req, res) {
  res.send('DELETE request to homepage')
})


Arguments
Argument	                              Description	                                                            Default
path	                                  The path for which the middleware function is invoked; can be any of:
                                                A string representing a path.
                                                A path pattern.
                                                A regular expression pattern to match paths.
                                                An array of combinations of any of the above.
                                                For examples, see Path examples.	                                    '/' (root path)
callback	                              Callback functions; can be:
                                                A middleware function.
                                                A series of middleware functions (separated by commas).
                                                An array of middleware functions.
                                                A combination of all of the above.
                                            You can provide multiple callback functions that behave just like middleware, except that these callbacks can invoke next('route') to bypass the remaining route callback(s). You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there is no reason to proceed with the current route.

                                            Since router and app implement the middleware interface, you can use them as you would any other middleware function.

                                            For examples, see Middleware callback function examples.

                                                                                                                            None

                                                                                                                            Request
```
//Request
The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on. In this documentation and by convention, the object is always referred to as req (and the HTTP response is res) but its actual name is determined by the parameters to the callback function in which you’re working.

For example:

app.get('/user/:id', function (req, res) {
  res.send('user ' + req.params.id)
})

But you could just as well have:

app.get('/user/:id', function (request, response) {
  response.send('user ' + request.params.id)
})

    

//Response
The res object represents the HTTP response that an Express app sends when it gets an HTTP request.

In this documentation and by convention, the object is always referred to as res (and the HTTP request is req) but its actual name is determined by the parameters to the callback function in which you’re working.

For example:

app.get('/user/:id', function (req, res) {
  res.send('user ' + req.params.id)
})
But you could just as well have:

app.get('/user/:id', function (request, response) {
  response.send('user ' + request.params.id)
})
The res object is an enhanced version of Node’s own response object and supports all built-in fields and methods.





//Router
A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

A router behaves like middleware itself, so you can use it as an argument to app.use() or as the argument to another router’s use() method.

The top-level express object has a Router() method that creates a new router object.

Once you’ve created a router object, you can add middleware and HTTP method routes (such as get, put, post, and so on) to it just like an application. For example:

// invoked for any requests passed to this router
router.use(function (req, res, next) {
  // .. some logic here .. like any other middleware
  next()
})

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function (req, res, next) {
  // ..
})
You can then use a router for a particular root URL in this way separating your routes into files or even mini-apps.

// only requests to /calendar/* will be sent to our "router"
app.use('/calendar', router)


//update
transactionsRouter.put("/:id", (request, response) => {  //Route definition at endpoint `/:id`, which is a placeholder for the unique identifier
  const { id } = request.params; //request parameters. Extracts `id` parameter from requests' URL parameters. represents unique identifier for the transaction to be updated
  const updateTransIndex = transactionArr.findIndex((transaction) => transaction.id === id); //searches through transactionArr array to find the index of the transadction object that matches id. findIndex method iterates over each transaction in the array and returns the index of the first transaction that satisfies the provided condition that transaction id is strictly equal to id (includes letters and numbers)
  transactionArr[updateTransIndex] = request.body; // transactionArr[updateTransIndex] is javascript code to access an element in array at a specific index like `array[5]`. once updateTransIndex is found, the code updates the transaction object at the index of transactionArr with the data from request.body. saction object at that index in transactionArr with the data from request.body. This assumes that request.body contains the updated fields of the transaction.

  response.status(200).json(transactionArr[updateTransIndex]); //the server responds with a status code of 200 (indicating success) and sends the updated transaction object (transactionArr[updateTransIndex]) as JSON in the response body.
});

*/