import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const subAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  adminName: {
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
});

subAdminSchema.pre("save", async function (next) {
  var subAdmin = this;

  if (subAdmin.isModified("password")) {
    subAdmin.password = await bcrypt.hash(subAdmin.password, 8);
  }

  next();
});

subAdminSchema.virtual("staffs", {
  ref: "Staff",
  localField: "_id",
  foreignField: "subAdmin",
});

const SubAdmin = mongoose.model("subAdmin", subAdminSchema);

export default SubAdmin;
