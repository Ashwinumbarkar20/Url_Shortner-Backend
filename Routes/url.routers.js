import express from 'express'

import authmiddleWare from '../Middleware/auth.middleware.js' 

const urlrouter =express.Router()
//short the url from long url
urlrouter.post('/shorten',authmiddleWare.validToken,async(req,res)=>{res.status(200).json({message:"shoritng url"})})

//get all urls created by CURRENT User
urlrouter.get('/urls',async(req,res)=>{})

//Redirect to orginal Url
urlrouter.get("/shortCode",async(req,res)=>{})

//Delete the Shorten Url created by CURRENT User
urlrouter.delete("/urls/:id",async(req,res)=>{})
export default  urlrouter
