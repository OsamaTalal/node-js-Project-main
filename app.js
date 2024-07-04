const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/customerSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));
var moment = require('moment');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))






// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
const { CLIENT_RENEG_LIMIT } = require("tls");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// GET Requst
app.get("/", (req, res) => {
  // result ==> array of objects
  console.log("--------------------------------------------")
  User.find()
    .then((result) => {
      console.log(result);
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });


});





















app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});



app.get("/edit/:id", (req, res) => {
  res.render("user/edit");
});

// result ==> Object
app.get("/view/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    })

});

// POST Requst
app.post("/user/:id", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete Requst 
app.delete("/edit/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/");
  })
    .catch((err) => {
      console.log(err);
    })
  console.log("Doneeeeeeeeee")
  res.redirect("/");

});





mongoose
  .connect(
    "mongodb+srv://osamatalal744:o123@cluster0.d2wvcro.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
