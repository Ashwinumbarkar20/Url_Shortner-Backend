import * as z from "zod";
import { errorResponse } from "../Utils/index.js";
const urlCheck = z.string().url("Invalid URL format");
const urlmiddleware = {
  validUrl: async (req, res, next) => {
    try {
      urlCheck.parse(req.body.url);
      next();
    } catch (e) {
      errorResponse(res, 404, "Invalid Url");
    }

    
  },
};
export default urlmiddleware;
