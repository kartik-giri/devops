import express from "express";
import { prisma } from "../lib/prisma.js";

const app = express();

app.get("/", async(req,res)=>{
    const getdata = await prisma.user.findMany();
    res.status(200).json({
       getdata
    })
})

app.post("/", async(req,res)=>{
    await prisma.user.create({
        data:{
            username:Math.random.toString(),
            password: Math.random.toString()
        }
    })
    res.status(200).json({
        message:`POST enf point.`
    })
})

app.listen(3000,()=>{
    `Express app listening on port 3000`
})