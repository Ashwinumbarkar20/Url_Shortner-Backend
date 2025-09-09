import * as z from "zod";
import { DecodedUserData, errorResponse } from "../Utils/index.js";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const authmiddleWare = {
  signup: async (req, res, next) => {
    try {
      console.log(signUpSchema.parse(req.body));
      next();
    } catch (e) {
      res.status(404).json({ error: "Requested data is incorrect" });
    }
  },

  login: async (req, res, next) => {
    try {
      loginSchema.parse(req.body);
      next();
    } catch (e) {
      res.status(401).json({ error: "Incorrect credentials" });
    }
  },

  validToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user=await DecodedUserData(token);
      console.log(user)
      if(user.userInfo){
        next()
      }
    } catch (e) {
        console.o
      errorResponse(res, 401, "Invalid Token");
    }
  },
};
export default authmiddleWare;
