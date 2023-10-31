const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const databaseUrl = process.env.DATABASE_URL;

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.connect(
//   "mongodb+srv://admin-Harshal:atlas123@cluster0.7yhjsgh.mongodb.net/websiteDB"
// );

const siteSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  subtype: {
    type: String,
    required: true,
  },
});

const Site = new mongoose.model("site", siteSchema);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Site running on port num ${port}!`);
});

app.post("/submit", (req, res) => {
//   console.log(req.body.link);
//   console.log(req.body.description);
//   console.log(req.body.image);
//   console.log(req.body.type);
//   console.log(req.body.subType);
  const newSite = new Site({
    link : req.body.link,
    description : req.body.description,
    image : req.body.image,
    type : req.body.type,
    subtype : req.body.subType
  });
  newSite.save();
  res.redirect("/");
});
