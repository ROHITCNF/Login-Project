const UserModel = require("../Models/userModels");
const signupUser = async (req, res) => {
  try {
    const { firstname, lastName, email, mobile, password, pin } = req.body;
    console.log(firstname, lastName, email, password, pin);

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

const loginUser = (req, res) => {};

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
