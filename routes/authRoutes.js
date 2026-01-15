const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.showLogin);
router.get("/test-db", authController.testDb);
router.get("/login", authController.showLogin);
router.get("/signup", authController.showSignup);
router.post("/login", authController.login);

router.post("/signup", authController.startRegisterForm);
router.get("/signup-password", authController.showSignupPassword);
router.post("/signup-password", authController.completeRegisterForm);

module.exports = router;
