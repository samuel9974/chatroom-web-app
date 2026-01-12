const e = require("express");

exports.getLogin = (req, res) => {
  try {
    const message = req.query.message;
    res.render("login", { message: message || null });
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  }
};
exports.getSignup = (req, res) => {
  try {
    res.render("signup"); 
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  }
};
// Handle signup form submission (POST /register) - go to password page
exports.postRegisterForm = (req, res) => {
  try {
    res.redirect("/signup-password");
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  }
};

// Show password form (GET /signup-password)
exports.getSignupPassword = (req, res) => {
  try {
    res.render("signup-password");
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  }
};

exports.completeRegisterForm = (req, res) => {
  try {
    // Here you would normally handle the registration logic (e.g., save user to DB)      
    res.redirect("/login?message=registered");
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  } 
};  









