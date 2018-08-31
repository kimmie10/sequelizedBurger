//Dependencies
const express = require("express");
const bodyParser = require("body-parser");


//Set the port of app
const PORT = process.env.PORT || 8080;

//set up express in here
const app = express();

//Serve static content from public directory
app.use(express.static("public"));

//Parse using complex algorithm for deep parsing
app.use(bodyParser.urlencoded({ extended: true }));

//Parse using json
app.use(bodyParser.json());

//Set up handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//Import routes and give access to server
const routes = require("./controllers/burgers_controller");

app.use(routes);

//Start Server to listen for client requests
app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});






