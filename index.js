const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());


const port = process.env.PORT || 8000


app.listen(port, ()=>{
    console.log(`app is running on ${port} number`);
})