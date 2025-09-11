import express from 'express'

import authmiddleWare from '../Middleware/auth.middleware.js' 
import urlcontroller from '../Controller/url.controller.js'
import urlmiddleware from '../Middleware/url.middleware.js'

const urlrouter =express.Router()
//short the url from long url
urlrouter.post('/shorten',authmiddleWare.validToken,urlmiddleware.validUrl,urlcontroller.shorten)

//get all urls created by CURRENT User
urlrouter.get('/urls',authmiddleWare.validToken,urlcontroller.urls)

//Redirect to orginal Url
urlrouter.get("/:shortCode",authmiddleWare.validToken,urlcontroller.shortCode)

//Delete the Shorten Url created by CURRENT User
urlrouter.delete("/urls/:id",authmiddleWare.validToken,urlcontroller.DeleteUrl)
export default  urlrouter
