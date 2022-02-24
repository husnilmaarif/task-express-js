const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;

// using ejs
app.set("view engine", "ejs");

// third party middleware
app.use(expressLayouts);
app.use(morgan("dev"));

// build in middleware
app.use(express.static("public"));

// application level middleware
app.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

app.get("/", (req, res) => {
  res.render("index", {
    layout: "layouts/main-layout",
    title: "Home Page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "About Page",
  });
});

app.get("/list", (req, res) => {
  const siswa = [
    {
      nama: "Muhammad Husnil",
      asal: "Makassar",
    },
    {
      nama: "Muhammad Isana",
      asal: "Jakarta",
    },
    {
      nama: "Muhammad Fadel",
      asal: "Surabaya",
    },
  ];
  res.render("list", {
    layout: "layouts/main-layout",
    title: "List Page",
    students: "Students at Eduwork",
    siswa: siswa,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("Not Found 404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
