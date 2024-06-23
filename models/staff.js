import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const deviceDetailsSchema = new mongoose.Schema({
  deviceName: {
    type: String,
  },
  deviceCategory: {
    type: String,
  },
});

const staffSchema = new mongoose.Schema({
  subAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "subAdmin",
  },
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  staffName: {
    type: String,
    required: [true, "Your name is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  devices: [deviceDetailsSchema],
});

staffSchema.virtual("requests", {
  ref: "Request",
  localField: "_id",
  foreignField: "staff",
});


staffSchema.pre("save", async function (next) {
  var user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
