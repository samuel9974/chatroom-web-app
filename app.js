const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View engine setup (using EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const chatRoutes = require("./routes/authRoutes");
app.use("/", chatRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render("404");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
