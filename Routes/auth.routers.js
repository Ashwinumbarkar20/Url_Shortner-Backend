import express from 'express'
const authrouter =express.Router()
import authmiddleWare from '../Middleware/auth.middleware.js'
import authController from '../Controller/auth.controller.js'

authrouter.post('/signUp',authmiddleWare.signup,authController.signup,)
authrouter.post('/login',authmiddleWare.login,authController.login)

export default authrouter