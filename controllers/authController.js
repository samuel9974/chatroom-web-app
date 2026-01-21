// Logout controller
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.status(200).end();
  });
};
const e = require("express");
const db = require("../db");
// Test MySQL connectionf

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email.toLowerCase(),
    ]);
    const user = users[0];

    // Check if user exists
    if (!user) {
      return res.render("login", {
        error: "Invalid email or password",
        message: null,
      });
    }

    // Check if password is correct
    if (user.password !== password) {
      return res.render("login", {
        error: "Invalid email or password",
        message: null,
      });
    }

    req.session.userId = user.id;
    res.redirect("/chat");
  } catch (error) {
    res.render("login", { error: error.message, message: null });
  }
};

exports.showLogin = (req, res) => {
  try {
    const message = req.query.message;
    res.render("login", { message: message || null, error: null });
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  }
};
exports.showSignup = (req, res) => {
  try {
    res.render("signup");
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  }
};
// Handle signup form submission (POST /register// ) - go to password page
exports.startRegisterForm = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    if (!email || !firstName || !lastName) {
      return res.render("signup", { error: "All fields are required." });
    }
    // Check if user exists (raw MySQL)
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [
      email.toLowerCase(),
    ]);
    if (existing.length > 0) {
      return res.render("signup", {
        error: "This email is already in use, please choose another one",
        formData: req.body,
      });
    }
    // Store registration data in session
    req.session.registrationData = {
      email: email.toLowerCase(),
      firstName,
      lastName,
    };
    res.redirect("/signup-password");
  } catch (error) {
    res.render("signup", { error: error.message, formData: req.body });
  }
};

// Show password form (GET /signup-password)
exports.showSignupPassword = (req, res) => {
  try {
    res.render("signup-password");
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  }
};

exports.completeRegisterForm = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const regData = req.session.registrationData;
    if (!regData || !regData.email || !regData.firstName || !regData.lastName) {
      return res.redirect("/signup");
    }
    if (!password || !confirmPassword) {
      return res
        .status(400)
        .render("signup-password", { error: "All fields are required." });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .render("signup-password", { error: "Passwords do not match." });
    }
    // Save user to DB
    await db.query(
      "INSERT INTO users (email, firstName, lastName, password) VALUES (?, ?, ?, ?)",
      [regData.email, regData.firstName, regData.lastName, password],
    );
    // Clear registration data from session
    req.session.registrationData = null;
    res.redirect("/login?message=registered");
  } catch (error) {
    res.status(500).render("signup-password", { error: error.message });
  }
};
