import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createHasPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

export const verifyHashPassword = async (userInputPassword, hashPassword) => {
  return await bcrypt.compare(userInputPassword, hashPassword);
};

export const DecodedUserData = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const CreateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const errorResponse = (res,statuscode,message)=>{
    return res.status(statuscode).json({message:message})
}

export const successResponse = (res,statuscode,message,data=null)=>{
    return res.status(statuscode).json({message:message,data:data})
}