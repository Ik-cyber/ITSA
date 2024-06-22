import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const deviceSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  // email: {
  //   type: String,
  //   required: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
  Staff: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Staff'
  },
  deviceName: {
    type: String,
    required: [true, "Enter Device Name."],
    unique: true,
  },
  category: {
    type: String,
    required: [true, "Enter Device Category."],
  },
  deviceStatus: {
    type: String,
    required: [true, "Device Stat."],
  }
});

// staffSchema.pre("save", async function (next) {
//   var user = this;
//   console.log(user.password)
//   console.log("pre");

//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }

//   next();
// });

const Device = mongoose.model("Device", deviceSchema);

export default Device;
