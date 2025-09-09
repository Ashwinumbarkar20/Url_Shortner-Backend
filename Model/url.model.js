import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true, // must be unique for each short link
    },
    shortUrl: {
      type: String,
    },
    useId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel", 
        required: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

const Url = mongoose.model("Url", urlSchema);

export default Url;
