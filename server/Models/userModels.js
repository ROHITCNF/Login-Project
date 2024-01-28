// const AuthUtil = require("../util/authentication");
const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
//create the Scheama
const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  mobile:{type:Number , required:true,unique:true},
  password: { type: String, required: true },
  pin: { type: Number, required: true },
  salt: { type: String },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!this.isModified("password")) return;

  //Get a salt and make the Hash Password and update the salt and passord to user existing object
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");
  const hashedPin = createHmac("sha256", salt)
    .update(this.pin)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  this.pin = hashedPin;
  console.log('Password' , hashedPassword);
  console.log("Pin", hashedPin);
  next();
});

// To use This Schema use this as a model
const User = model("usersForLoginProjects", userSchema);

module.exports = User;
