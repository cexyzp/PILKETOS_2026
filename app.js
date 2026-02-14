const express = require("express");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  const key = req.query.key;

  if (key === "aris") {
    return res.render("result");
  }

  if (key === "gocep") {
    return res.render("admin");
  }

  res.render("closed");
});

module.exports = app;