import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Staff'
  },
  deviceName: {
    type: String,
    required: [false, "Enter Device Name."],
    unique: false,
  },
  category: {
    type: String,
    required: [false, "Enter Device Category."],
  },
  status: {
    type: String,
    required: [true, "Device Stat."],
  },
  request : {
    type : String,
    required : [true, "Request details."]
  }
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
