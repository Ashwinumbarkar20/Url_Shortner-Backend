import UrlModel from "../Model/url.model.js";
import { DecodedUserData, CreateShortCode } from "../Utils/index.js";

const urlcontroller = {

  shorten: async (req, res) => {
    const token = req.headers.authrization.split(" ")[1];
    const OriginalUrl = req.body.url;
    const user = DecodedUserData(token);

    const shortCode = CreateShortCode();
    const newUrl = new UrlModel({
      originalUrl: req.body.url,
      shortCode: shortCode,
      useId: user.userInfo.id,
      shortUrl: shortCode,
    });
    await newUrl.save();
    successResponse(res, 201, "Url Shortened Successfully", {
      originalUrl: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      shortUrl: newUrl.shortUrl,
    });
  },

  shortCode: async (req, res) => {
    const shortenur = req.params.shortCode;
    const url = await UrlModel.findOne({ shortCode: shortenur });
    if (!url) {
      errorResponse(res, 404, "Url Not Found");
    } else {
      successResponse(res, 200, "Url Found", {
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: url.shortUrl,
      });
    }
  },

  urls: async (req, res) => {
    try {
      const token = req.headers.authrization.split(" ")[1];
      const user = DecodedUserData(token);
      const allUrls = await UrlModel.find({ useId: user.userInfo.id });
      successResponse(res, 200, "Urls Found", {
        allUrls: allUrls,
      });
    } catch (e) {
      errorResponse(res, 500, "Something went Wrong");
    }
  },

  DeleteUrl: async(req,res) => {
try{
    const token = req.headers.authrization.split(" ")[1];
    const user = DecodedUserData(token);
    const url = await UrlModel.findOne({ shortCode: req.params.shortCode });
    if(url.useId !== user.userInfo.id){
      errorResponse(res, 401, "Unauthorized");
    }
    if (!url) {
      errorResponse(res, 404, "Url Not Found");
    } else {
      await url.deleteOne();
      successResponse(res, 200, "Url Deleted Successfully");
    }
}
catch(e){
    errorResponse(res, 500, "Something went Wrong");
}

    
  },


  }


export default urlcontroller;
