const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use((req, res) => {
  const key = req.query.key;

  if (key === "gocep") {
    return res.render("result");
  }
  if (key == "aris") {
    return res.render("admin");
  }
  res.render("vote");
});

module.exports = app;