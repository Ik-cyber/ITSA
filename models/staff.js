import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const staffSchema = new mongoose.Schema({
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
});

staffSchema.pre("save", async function (next) {
  var user = this;
  console.log("pre");

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new Error("Unable to login");
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     throw new Error("Unable to login");
//   }

//   return user;
// };

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
