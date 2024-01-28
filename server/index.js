const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.port ||5000;//make it dynamic for Deployment 
const dbConnect = require("./lib/mongodb");


//middleWares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//connectToDb
dbConnect();
//handle the routes
const apiRoutes = require('./Routes/apiRoutes');
app.use(apiRoutes);

app.listen(port, ()=>{
    console.log(`Server Listening at ${port}`);
})


