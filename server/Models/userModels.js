// const AuthUtil = require("../util/authentication");
const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
//create the Scheama
const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pin: { type: String, required: true },
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
  const hashedPin = createHmac("sha256", salt).update(this.pin).digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  this.pin = hashedPin;
  next();
});

//password matching function
userSchema.static(
  "matchPassword",
  async function (uniqueUser, password, emailFlag, mobileFlag) {
    //Since Mongoose don't accept dynamic Key change
    //Hence we need to make Querry dynamic

    let querry;
    querry = emailFlag ? {'email':uniqueUser} : {'mobile':uniqueUser};
    const user = await this.findOne(querry);
    console.log("Logging user", user);
    if (!user) return false;

    const salt = user.salt;
    const hashedPasswordInDb = user.password;
    const hashedUserProvidedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");
    // 
    if (hashedPasswordInDb === hashedUserProvidedPassword) {
      //User Authenticated  1st F-A
      return user;
    } else {
      return false;
    }
  }
);

//pin matching function
userSchema.static(
  "matchPin",
  async function (userEmail , userPin) {
    //Since Mongoose don't accept dynamic Key change
    //Hence we need to make Querry dynamic

    const querry = { email: userEmail }; 
    const user = await this.findOne(querry);
    if (!user) return false;

    const salt = user.salt;
    const hashedPinInDb = user.pin;
    const hashedUserProvidedPin = createHmac("sha256", salt)
      .update(userPin)
      .digest("hex");

    if (hashedPinInDb === hashedUserProvidedPin) {
      return user;
    } else {
      return false;
    }
  }
);


// To use This Schema use this as a model
const User = model("usersForLoginProjects", userSchema);

module.exports = User;
