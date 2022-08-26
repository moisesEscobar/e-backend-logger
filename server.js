
const express = require("express");
const InitServerMongo = require("./config/database");
const bodyParser = require("body-parser");

const routes = require("./routes/main.routes");
InitServerMongo();
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ENRUTAMIENTO
app.get("/", (req, res) => {
    res.json({ message: "API working" });
});
app.use(routes);

//SERVIDOR
app.listen(3000,()=>{
    console.log("SERVIDOR EN PUERTO 3000")
});