const express = require("express");
const router = express.Router();
const ApiController = require('../controllers/apiController');

// ORYDxEPlIssCAg5d;
//signup for new Users
router.post('/signupUser',ApiController.signupUser);

//Login existing user
router.post("/loginUser", ApiController.loginUser);
router.post("/verify_pin", ApiController.verifyPin);

//validateTokens (access + refresh)
router.get("/validateTokens", ApiController.validateTokens);

//verify_token (For every further request this needs to b ecalled first)
router.get("/verify_token", ApiController.verify_token);

//User Id for Pin page - 2nd Authentication
router.get("/getUserId", ApiController.getUserId);

module.exports = router;
