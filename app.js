require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const postesRouter = require("./routes/postes");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use((req,res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, UPDATE, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    next();
})

app.use("/api/user", authRouter);
app.use("/api", postesRouter);


app.listen(port, ()=>{console.log(`The server is started on ${port}...`)});