import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const subAdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

subAdminSchema.pre("save", async function (next) {
  var subAdmin = this;

  if (subAdmin.isModified("password")) {
    subAdmin.password = await bcrypt.hash(subAdmin.password, 8);
  }

  next();
});

subAdminSchema.statics.findByCredentials = async (email, password) => {
  const subAdmin = await SubAdmin.findOne({ email });

  if (!subAdmin) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, subAdmin.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return subAdmin;
};

const SubAdmin = mongoose.model("subAdmin", subAdminSchema);

export default SubAdmin;
