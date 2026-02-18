const express = require("express")

const app = express()

app.use("/hello",(req,res)=>{
    res.send("hello from hello end pointss")
})

app.listen(4000,()=>{
    console.log("listening on prot 4000")
})