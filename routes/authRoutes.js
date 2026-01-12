const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.getLogin);
router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);

router.post("/signup", authController.postRegisterForm);
router.get("/signup-password", authController.getSignupPassword);
router.post("/signup-password", authController.completeRegisterForm);


module.exports = router;
