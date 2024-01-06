const express=require("express")
require("dotenv").config()
const cors=require("cors")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const connection = require("./db")

const app=express()

app.use(cors())
app.use(express.json())

app.get("/gettoken",(req,res)=>{
    const {code} =req.query
    try {
        fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`,{
            method:"POST",
            headers:{
                Accept: "application/json"
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>console.log(err.message))
    } catch (error) {
        res.status(200).json({msg:error.message})
    }
})

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to the DB")
        console.log(`Server is running at port :-${process.env.PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})