import {
  createHasPassword,
  verifyHashPassword,
  DecodedUserData,
  CreateToken,
  errorResponse,
  successResponse,
} from "../Utils/index.js";
import userModel from "../Model/user.model.js";
const authController = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (user) {
        errorResponse(res, 400, "User Already Existes");
      }
      const haspassword = await createHasPassword(password);
      const newUser = new userModel({ name, email, password: haspassword });
      await newUser.save();
      successResponse(res, 201, "User Added Sucessfully", {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } catch (e) {
      errorResponse(res, 500, "Something went Wrong");
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        if (verifyHashPassword(password, existingUser.password)) {
          const {password,...userInfo}=existingUser.toObject()
          console.log("userInfo-->",userInfo)
          const token = CreateToken({userInfo});
         
          if (token) {
            successResponse(res, 200, "Success", {
              id: existingUser._id,
              token,
            });
          }
        } else {
          errorResponse(res, 401, "Credentials are incorrect");
        }
      } else {
        errorResponse(res, 404, "User Not Found");
      }
    } catch (e) {
      console.log("error ",e)
      errorResponse(res, 500, "something went wrong");
    }
  },
};
export default authController;
