const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const port = process.env.PORT || 3000;

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs"); // Set the view engine to EJS

const databaseUrl = process.env.DATABASE_URL;

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

const Site = mongoose.model("Site", siteSchema); // Use mongoose.model directly

app.get("/", (req, res) => {
  res.render("index"); // Render the "index.ejs" template
});

app.listen(port, () => {
  console.log(`Site running on port number ${port}!`);
});

app.post("/submit", (req, res) => {
  const { link, description, image, type, subType } = req.body;

  const newSite = new Site({
    link,
    description,
    image,
    type,
    subtype: subType, // Correct the field name here
  });

  newSite.save()
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.error("Error saving the site:", error);
      res.status(500).send("Internal Server Error");
    });
});
