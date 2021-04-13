//Use the express server
const express = require("express");
//assign express to app to make use of methods for sql servers
const app = express();
//make use of the cors library
const cors = require("cors");

//middleware
//Allow access to client side data using req.body
app.use(express.json());
//use the cors library so that front end can interact with backend
app.use(cors());

//ROUTES//

//Register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

//have the app listen on port 5000
app.listen(5000, () => {
  console.log("server is running on port 5000");
});
