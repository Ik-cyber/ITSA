import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const deviceDetailsSchema = new mongoose.Schema({
  deviceName: {
    type : String
  },
  deviceCategory: {
    type : String
  }
})

const staffSchema = new mongoose.Schema({
  subAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SubAdmin'
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
  devices : [deviceDetailsSchema]
});

staffSchema.pre("save", async function (next) {
  var user = this;
  console.log(user.password)
  console.log("pre");

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// staffSchema.pre('findOneAndUpdate', async function (next) {
//   var staff = this
//   try {
//       if (staff.password) {
//           const hashed = await bcrypt.hash(staff.password, 10)
//           staff.password = hashed;
//       }
//       next();
//   } catch (err) {
//       return next(err);
//   }
// });

// userSchema.pre('findOneAndUpdate', async function (next) {
//   try {
//       if (this._update.password) {
//           const hashed = await bcrypt.hash(this._update.password, 10)
//           this._update.password = hashed;
//       }
//       next();
//   } catch (err) {
//       return next(err);
//   }
// });

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
