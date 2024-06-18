import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const newCompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

newCompanySchema.pre("save", async function (next) {
  var company = this;

  if (company.isModified("password")) {
    company.password = await bcrypt.hash(company.password, 8);
  }

  next();
});

newCompanySchema.statics.findByCredentials = async (email, password) => {
  const company = await NewCompany.findOne({ email });

  if (!company) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, company.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return company;
};

const NewCompany = mongoose.model("NewCompany", newCompanySchema);

export default NewCompany;
