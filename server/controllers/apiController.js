const UserModel = require("../Models/userModels");
const signupUser = async (req, res) => {
  try {
    const { firstname, lastName, email, mobile, password, pin } = req.body;
    // console.log(firstname, lastName, email, mobile, password, pin);

    const user = await UserModel.create({
      firstname,
      lastName,
      email,
      mobile,
      password,
      pin,
    });
    if (user) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ message: "Failed" });
    }
  } catch (error) {
    res.status(402).json({ message: "Failed", errorMessage: error });
  }
};

const loginUser = async (req, res) => {
  // get the Mobile+password or Email+password
  // if matched correct then go ahead and get the user to Pin page
  try {
    let emailFlag = false;
    let mobileFlag = false;
    let userValidated;
    if ("email" in req.body) {
      //search the userDetails with email
      emailFlag = true;
      const { email, password } = req.body;
      userValidated = await UserModel.matchPassword(
        email,
        password,
        emailFlag,
        mobileFlag
      );
    } else if ("mobile" in req.body) {
      //search the userDetails with mobile
      const { mobile, password } = req.body;
      mobileFlag = true;
      userValidated = await UserModel.matchPassword(
        mobile,
        password,
        emailFlag,
        mobileFlag
      );
    }
    if (userValidated) {
      res.status(200).json({
        s: "ok",
        code: 200,
        data: { firstname: userValidated?.firstname },
        message: "Uservalidated",
      });
    } else {
      res.status(400).json({ s: "", code: 400, message: "User Not validated" });
    }
  } catch (error) {
    res.status(400).json({ s: "", code: 400, message: `${error}` });
  }
};

const validateTokens = (req, res) => {};

const verify_token = (req, res) => {};

const getUserId = (req, res) => {};
module.exports = {
  signupUser,
  loginUser,
  validateTokens,
  verify_token,
  getUserId,
};
