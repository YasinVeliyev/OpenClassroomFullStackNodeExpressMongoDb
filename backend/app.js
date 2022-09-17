const express=require('express')

const app=express()

app.get("/",(req,res)=>{
    res.send("Express App")
})

module.exports=app