const express = require("express");

const app = express();

app.get("/", (req,res)=>{
    res.send("Hello world from container app")
})

app.listen(3000, ()=>{
    console.log("Http server is listening on port 3000")
})

console.log("DB ENV VAR");
console.log(process.env.DATABASE_URL)

