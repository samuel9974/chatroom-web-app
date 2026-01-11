exports.getLogin = (req, res) => {
  try {
    res.render("login");
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
    const { email, firstName, lastName } = req.body;
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

// Handle password form submission (POST /signup-password)
exports.postSignupPassword = (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.render("signup-password", { error: "Passwords do not match" });
    }
    res.redirect("/login");
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  }
};






